const http = require('http');

const server = http.createServer((req, res) => {
  res.end(JSON.stringify(process.versions, null, 2));
});
server.listen(process.env.PORT);
