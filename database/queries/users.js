const connection = require('../config');

const get = username =>
  connection
    .queryAsync('SELECT * FROM users WHERE name = ?', [username])
    .then(data => data[0]);

const create = (username, password, phoneNumber, email) =>
  connection.queryAsync(
    'INSERT INTO users (name, password, phoneNumber, email) VALUES (?, ?, ?, ?)',
    [username, password, phoneNumber, email],
  );

const getById = id =>
  connection
    .queryAsync('SELECT * FROM users WHERE id = ?', [id])
    .then(data => data[0]);

const getAllUserInfo = id =>
  connection
    .queryAsync('SELECT * FROM users WHERE id = ?', [id])
    .then(data => data[0]);

const uploadPicture = (id, profilePicture) => {
  connection.queryAsync('UPDATE users SET picture = ? WHERE id = ?', [
    profilePicture,
    id,
  ]);
};

const updateProfile = (id, displayName, location, tagline, bio) => {
  connection.queryAsync(
    'UPDATE users SET displayName = ?, location = ?, tagline =?, bio = ? WHERE id = ?',
    [displayName, location, tagline, bio, id],
  );
};

module.exports = {
  get,
  create,
  getById,
  getAllUserInfo,
  uploadPicture,
  updateProfile,
};
