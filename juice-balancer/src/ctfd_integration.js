const http = require('http');

function getCTFdTeams(apiUrl, apiKey) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: apiUrl,
      path: '/api/v1/teams',
      method: 'GET',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data).data);
        } else {
          reject(`Error: ${res.statusCode} ${data}`);
        }
      });
    });

    req.on('error', (e) => {
      reject(`Problem with request: ${e.message}`);
    });

    req.end();
  });
}

module.exports = { getCTFdTeams };
