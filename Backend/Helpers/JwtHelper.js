const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        aud: userId,
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: "12h",
        issuer: "localhost",
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          return reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  SignRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {
        aud: userId,
      };
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: "1y",
        issuer: "localhost",
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          return reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  VerifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) {
            return reject(createError.Unauthorized());
          }
          const userId = payload.aud;
          resolve(userId);
        }
      );
    });
  },
};
