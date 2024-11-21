const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccessToken: (userId, role) => {
    return new Promise((resolve, reject) => {
      if (!process.env.ACCESS_TOKEN_SECRET) {
        return reject(
          createError.InternalServerError("ACCESS_TOKEN_SECRET not configured")
        );
      }

      const payload = {
        aud: userId,
        role: role,
      };
      const secret = process.env.ACCESS_TOKEN_SECRET;
      const options = {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "12h",
        issuer: process.env.JWT_ISSUER || "eventify-backend-jbco.onrender.com",
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.error("Access token signing error:", err.message);
          return reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  SignRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      if (!process.env.REFRESH_TOKEN_SECRET) {
        return reject(
          createError.InternalServerError("REFRESH_TOKEN_SECRET not configured")
        );
      }

      const payload = {
        aud: userId,
      };
      const secret = process.env.REFRESH_TOKEN_SECRET;
      const options = {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "1y",
        issuer: process.env.JWT_ISSUER || "eventify-backend-jbco.onrender.com",
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.error("Refresh token signing error:", err.message);
          return reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },

  VerifyRefreshToken: (refreshToken) => {
    return new Promise((resolve, reject) => {
      if (!process.env.REFRESH_TOKEN_SECRET) {
        return reject(
          createError.InternalServerError("REFRESH_TOKEN_SECRET not configured")
        );
      }

      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, payload) => {
          if (err) {
            console.error("Token verification error:", err.message);
            return reject(createError.Unauthorized());
          }
          const userId = payload.aud;
          resolve(userId);
        }
      );
    });
  },
};
