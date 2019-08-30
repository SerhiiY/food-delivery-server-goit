const http = require('http');
const url = require('url');

const router = require('./db/router');
const {idFreeUrl, id} = require('./helpers/url-id');

const startServer = port => {
  const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url); // products
    const params = parsedUrl.search; // ?ids=
    // Get router function using url without id and id as a argument
    (idFreeUrl(router, parsedUrl.pathname, params) || router.default)(req, res, id(parsedUrl.pathname, params));
  });

  // server.on('request', (req, res) => {
    

  //   if(req.method === 'GET'){
  //     if(req.url === '/products/:id') {
  //     } else

  //     { 
  //       res.writeHead(404, {"Content-type": "application/json"});
  //       res.end('Route is not found!');
  //     };
  //   } //GET
  // }); //server.on

  server.listen(port, (err) => {
    if (err) return console.log('Something is going wrong:', err);
    console.log(`Server is listening on ${port}`);
  });

};


module.exports = startServer;