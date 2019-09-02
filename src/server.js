const http = require('http');
const url = require('url');

const router = require('./router');
const {idFreeUrl, id, param} = require('./helpers/url-id');

const startServer = port => {
  const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url); // products
    const params = parsedUrl.search; // ?ids=
    // Get router function using url without id and id as a argument
    (idFreeUrl(router, parsedUrl.pathname, params) || router.default)(req, res, id(parsedUrl.pathname, params), param(params));
  });

  server.listen(port, (err) => {
    if (err) return console.log('Something is going wrong:', err);
    console.log(`Server is listening on ${port}`);
  });

};


module.exports = startServer;