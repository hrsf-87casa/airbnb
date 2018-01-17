const connection = require('../config.js');

const getAllReservations = userId =>
  connection.queryAsync(
    'SELECT bookings.* FROM bookings RIGHT OUTER JOIN listings ON bookings.listing_id = listings.id WHERE bookings.user_id = ?',
    [userId],
  );

const cancelReservation = bookingId =>
  connection.queryAsync('DELETE FROM bookings WHERE id = ?', [bookingId]);

const makeReservation = (userId, listingId, startDate, endDate) =>
  connection
    .queryAsync(
      'INSERT INTO bookings (user_id, listing_id, startDate, endDate) VALUES (?, ?, ?, ?)',
      [userId, listingId, startDate, endDate],
    )
    .then(data => data[0]);

module.exports = {
  getAllReservations,
  cancelReservation,
  makeReservation,
};
