const bcrypt = require('bcrypt');
const db = require('../../database');

const addUser = async (username, password, phoneNumber, email) =>
  db.addUser(username, bcrypt.hash(password, 1), phoneNumber, email);

const checkUser = async (username, password) => {
  const passwordHashed = await (db.getUser(username)).password;
  return passwordHashed ? bcrypt.compare(password, passwordHashed) : false;
};

module.exports = {
  addUser,
  checkUser,
};
