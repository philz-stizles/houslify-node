const crypto = require('crypto');

exports.encryptPassword = (password, salt) => crypto
  .createHmac('sha1', salt)
  .update(password)
  .digest('hex');