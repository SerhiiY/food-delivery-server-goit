const { port } = require('./config/config');

const cors = require('cors');
const express = require('express');
const app = express();

const router = require('./src/routers/router');

app.use(cors());                // Use cross origin resourses sharing
app.use(express.urlencoded());  // Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.json());        // Parse JSON bodies (as sent by API clients)
app.use('/', router);

app.listen(port, (err) => {
  if (err) {
      return console.log('Something was going wrond!', err)
  }
  console.log(`Server is listening on ${port}`)
});