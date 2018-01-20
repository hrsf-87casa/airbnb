const { users } = require('../database');

const getAllUserInfo = userId => users.getAllUserInfo(userId);
const uploadPicture = (userId, profilePicture) =>
  users.uploadPicture(userId, profilePicture);

const updateProfile = (userId, displayName, location, tagline, bio) =>
  users.updateProfile(userId, displayName, location, tagline, bio);

module.exports = { getAllUserInfo, uploadPicture, updateProfile };
