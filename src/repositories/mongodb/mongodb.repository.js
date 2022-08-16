const mongoose = require('mongoose');
const dbConfig = require('../../config/db.config');
const logger = require('../../helpers/logger');
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
  // useCreateIndex: true,
  // useFindAndModify: false,
  // autoIndex: false, // Don't build indexes
  // reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
  // reconnectInterval: 500, // Reconnect every 500ms
  // poolSize: 10, // Maintain up to 10 socket connections
  // // If not connected, return errors immediately rather than waiting for reconnect
  // bufferMaxEntries: 0,
  // connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
  // socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  // family: 4 // Use IPv4, skip trying IPv6
};

/**
 * Opens the connection to database and saves the connection in 'db' variable.
 * @returns {Promise} A promise that will be resolved to the database connection if successful
 */
const connect = () => {
  mongoose.connect(`mongodb+srv://${dbConfig.user}:${dbConfig.password}@${dbConfig.host}/${dbConfig.database}?retryWrites=true&w=majority`, options, (err) => {
    if (err) {
      logger.error('Unable to connect to the server. Please start the server. Error:', err)
    } 
    else {
      db = mongoose;
      logger.debug('Connected to DB Server successfully! ')
    }
  });
}

module.exports = {
  connect
};
