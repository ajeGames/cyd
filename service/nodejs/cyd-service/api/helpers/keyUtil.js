const crypto = require('crypto');
const base64url = require('base64url');

exports.randomString = size => {
  return base64url(crypto.randomBytes(size));
};
