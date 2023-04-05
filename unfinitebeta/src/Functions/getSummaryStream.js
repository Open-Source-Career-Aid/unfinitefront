import getCookie from "./getCookie";
import getCSRF from "./getCSRF";
import { API_URL } from "../API_URL";

async function getSummaryStream(id, topicid, questionid, answertype, setText) {

    await getCSRF();
    const csrfToken = getCookie('csrftoken');
    let text = '';
  
    const response = await fetch(`${API_URL}summary_stream/`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      crossDomain: true,
      body: JSON.stringify({
        id: id,
        topic: topicid,
        answertype: answertype,
        question: questionid,
      })
    });
  
    const reader = response.body.getReader();
    let decoder = new TextDecoder();
    let data = '';
  
    let prefix = '';
    const readStream = async () => {
        const { done, value } = await reader.read();
        if (done) {
            return JSON.parse(data);
        }
        data += decoder.decode(value);
        // console.log(data);
        // Split the received data by newline character
        let messages = data.split('\n');
        // Process each message
        // let prefix = '';
        for (let message of messages) {
            if (message.trim()) {
                if (prefix !== '') {
                    message = prefix + message;
                    prefix = '';
                }
                if (message.endsWith('}')) {
                    console.log('Received message:', JSON.parse(message).choices[0].delta.content);
                    data = JSON.parse(message);
                    text = text + data.choices[0].delta.content;
                    setText(text);
                }
                else {
                    prefix = message;
                    continue;
                }
                // console.log('Received message:', message);
                // process the received message as needed
            }
        }
        // Clear the data buffer
        data = '';
        // Continue reading the stream
        return readStream();
    }
  
    return readStream();
}
  
export default getSummaryStream;
