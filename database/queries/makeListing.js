const connection = require('../config.js');

const getListings = userId =>
  connection.queryAsync('SELECT * FROM listings WHERE host_id = ?', [userId]);

module.exports = {
  getListings,
};
