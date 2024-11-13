import * as React from "react";

export function getAnswerAndEmotion(url, apiJson) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(apiJson)
  })
    .then(response => {
      console.log(response);
      return response.json();
    })
    .then(trainJsonOut => {
      const answer = trainJsonOut['answer'];
      const emotion = trainJsonOut['emotion'];
      console.log(`Response: ${answer}`);
      console.log(`Emotion: ${emotion}`);
      return { answer, emotion };
    })
    .catch(error => {
      console.error('Error:', error);
      return { error: 'Request failed' };
    });
}
// const url = 'http://dr-hiro-service-test-1505102764.us-east-1.elb.amazonaws.com:80/test';
// const apiJson = { 'question': 'What is the news on bitcoin ?', 'message_id': 1234, 'user_id': 1234, 'platform': 'streamlit', 'model': "assistants", 'media': "text" };
// getAnswerAndEmotion(url, apiJson)
//   .then(result => {
//     if (result.error) {
//       console.error('Error:', result.error);
//     } else {
//       console.log('Answer:', result.answer);
//       console.log('Emotion:', result.emotion);
//     }
//   });