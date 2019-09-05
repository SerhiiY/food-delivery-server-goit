const {port} = require('./config/config');
const cors = require('cors');
const express = require('express');
const app = express();

const myRouter = require('./src/router');

app.use(cors());                // Use cross origin resourses sharing
app.use(express.urlencoded({extended: true}));  // Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.json());        // Parse JSON bodies (as sent by API clients)
app.use('/', myRouter);

app.listen(port, (err) => {
  if (err) {
      return console.log('Something was going wrond!', err)
  }
  console.log(`Server is listening on ${port}`)
});

