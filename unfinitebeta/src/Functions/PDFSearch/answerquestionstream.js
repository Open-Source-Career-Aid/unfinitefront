import getCSRF from "../getCSRF";
import { API_URL } from "../../API_URL";
import getCookie from "../getCookie";

async function answerquestionstream( question, docids, threadid , answer , setAnswer ) {

    let specialText = null;
    let specialID = null;

    // finr the text followed by sr: in the question and set it to specialText and modify the question to be just the question. If it includes multiple sr: then it will just take the last one.
    if (question.includes("sr:")) {
        specialText = question.split("sr:")[1];
        question = question.split("sr:")[0].trim();
    }

    console.log("specialText:", specialText);

    if (specialText==='Simplify') {
        specialID = 1;
    }
    else if (specialText==='Analogify') {
        specialID = 4;
    }
    else if (specialText==='Comprehensify') {
        specialID = 3;
    }

    await getCSRF();
    const csrfToken = getCookie('csrftoken');
    // let text = '';
  
    const response = await fetch(`${API_URL}summarize_document_stream/`, {
      method: 'POST',
      headers: {
        'X-CSRFToken': csrfToken,
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      crossDomain: true,
      body: JSON.stringify({
        'question': question,
        'docids': JSON.stringify(docids),
        'threadid': threadid,
        'specialID': specialID,
      })
    });
  
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let text = '';
    let toreturn = '';

    const readStream = async () => {
      let incompleteMessage = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          console.log('Stream complete');
          if (text === '') {
            // console.log('No data received');
            // setAnswerLoading(false);
            return null; // or throw an error or do something else
          } else {
            // console.log('Final message:', text);
            // setAnswerLoading(false);
            return text;
          }
        }
        const chunk = decoder.decode(value, { stream: true });
        const messages = (incompleteMessage + chunk).split('\n');
        incompleteMessage = messages.pop(); // last message may be incomplete
        for (let i = 0; i < messages.length; i++) {
          const message = messages[i];
          // console.log('Received message:', message);
          if (message.trim()) {
            try {
              if (message.endsWith('}')) {
                // console.log('Received message:', message);
                const json = JSON.parse(message);
                // console.log('Parsed message:', json);
                if (json.finalresponse===4) {
                  text += '\n'
                  toreturn += '\n'
                  text += json.detail
                  toreturn += json.detail
                  setAnswer(text);
                  return toreturn
                }
                if (json.finalresponse===3) {
                  text += json.data.choices[0].delta.content;
                  toreturn += json.data.choices[0].delta.content;
                  setAnswer(text);
                  continue
                }
                if (json.finalresponse===2) {
                  // console.log('Final response received', json.data);
                  console.log('URLs received', json.urls);
                  // for each url in the list json.urls add it to the answer
                  text += '\n'
                  toreturn += '\n'
                  for (let i = 0; i < json.urls.length; i++) {
                    const url = json.urls[i];
                    if (json.urls[i]==='>>>PART<<<') {
                      text += url + '\n'
                      toreturn += url + '\n'
                      setAnswer(text);
                      continue
                    }
                    text += '<url>' + url + '</url>';
                    toreturn += '<url>' + url + '</url>';
                    setAnswer(text);
                  }
                  continue
                }
                if (json.finalresponse===1) {
                  // console.log('Final response received', json.data);
                  setAnswer(json.data)
                  continue
                }
                text += json.data.choices[0].delta.content;
                toreturn += json.data.choices[0].delta.content;
                setAnswer(text);
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
  
export default answerquestionstream;
