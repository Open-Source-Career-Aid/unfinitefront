import getCookie from "./getCookie";
import getCSRF from "./getCSRF";
import { API_URL } from "../API_URL";

async function getSummaryStream(id, topicid, questionid, answertype) {

    await getCSRF();
    const csrfToken = getCookie('csrftoken');
  
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
  
    const readStream = async () => {
        const { done, value } = await reader.read();
        if (done) {
            return JSON.parse(data);
        }
        data += decoder.decode(value);
        console.log(data);
        // Split the received data by newline character
        let messages = data.split('\n');
        // Process each message
        for (let message of messages) {
            if (message.trim()) {
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
