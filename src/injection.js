const PostMessageStream = require("post-message-stream");

//@TODO check cross-domain safety
const stream = new PostMessageStream({name: 'injection', target: 'content-script'});
let responses = [];
const timeout = (ms) => new Promise(resolve => setTimeout(resolve, ms));
//@TODO infinity
const waitResponse = async (requestId) => {
  for (let i = responses.length - 1; i >= 0; i--) {
    if (responses[i].requestId === requestId) {
      const response = responses[i];
      responses.splice(i, 1);
      if (0 !== response.code) {
        throw new Error(response.error);
      } else {
        return response.data;
      }
    }
  }
  await timeout(500);
  return await waitResponse(requestId);
}
const request = async (method) => {
  const requestId = Math.random().toString(36).substring(7);
  const data = {requestId, method};
  stream.write(data);
  return await waitResponse(requestId);
};
stream.on('data', (data) => responses.push(data));

window.freeton = {
  getNetwork() {
    request('getNetwork')
      .then((response) => console.log(response))
      .catch((error) => console.error(error));
  }
};
