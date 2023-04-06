import getCookie from "./getCookie";
import getCSRF from "./getCSRF";
import { API_URL } from "../API_URL";

async function getSummaryStream(id, topicid, questionid, answertype, setText, setSummaryLoading) {

    await getCSRF();
    const csrfToken = getCookie('csrftoken');
    // let text = '';
  
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
    const decoder = new TextDecoder();
    let text = '';
    let prefix = '';

    const readStream = async () => {
      let incompleteMessage = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('Stream complete');
          if (text === '') {
            console.log('No data received');
            setSummaryLoading(false);
            return null; // or throw an error or do something else
          } else {
            console.log('Final message:', text);
            setSummaryLoading(false);
            return text;
          }
        }
        const chunk = decoder.decode(value, { stream: true });
        const messages = (incompleteMessage + chunk).split('\n');
        incompleteMessage = messages.pop(); // last message may be incomplete
        for (let i = 0; i < messages.length; i++) {
          const message = messages[i];
          if (message.trim()) {
            try {
              if (message.endsWith('}')) {
                // console.log('Received message:', message);
                const json = JSON.parse(message);
                // console.log('Parsed message:', json);
                text += json.choices[0].delta.content;
                setText(text);
              } else {
                incompleteMessage += message + '\n';
              }
            } catch (err) {
              console.log('Error parsing message:', err);
            }
          }
        }
      }
    };
  
    return readStream();
}
  
export default getSummaryStream;
