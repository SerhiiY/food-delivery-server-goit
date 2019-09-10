const {port, dbURL} = require('./config/config');
const startServer = require('./src/server');
const connectDB = require('./src/db/connect-db');

startServer(port);
connectDB(dbURL);

