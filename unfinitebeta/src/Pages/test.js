import React from 'react';
import getRoadmap from '../Functions/getRoadmap';

const API_HOST = 'http://localhost:8000';

async function Test() {

    const response = await getRoadmap('python for web development');
    console.log(response);

    return (
        <div>
            <p>asdsad</p>
        </div>
    );

}

export default Test;
// function getCookieValue(name) {
//     const cookies = document.cookie.split('; ');
//     console.log(document.cookie);
//     for (let i = 0; i < cookies.length; i++) {
//       const cookie = cookies[i];
//       const [cookieName, cookieValue] = cookie.split('=');
//       if (cookieName === name) {
//         console.log(`Found cookie ${name} with value ${cookieValue}`);
//         return cookieValue;
//       }
//     }
//     console.log(`Could not find cookie ${name}`);
//     return '';
//   }  

// const Test = () => {

//   getCookieValue("csrftoken");

//   return (
//     <div>
//       <p>asdsad</p>
//     </div>
//   );
// }

// export default Test;
