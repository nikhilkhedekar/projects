const jwt = require('jsonwebtoken');
const crypto = require("crypto");

const createJWT = ({ payload }) => {
  const JWT_SECRET = "q4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D";
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

const isTokenValid = (token) => {
  console.log("token", token);
  const JWT_SECRET = "q4t7w!z%C*F-JaNdRgUkXp2r5u8x/A?D";
  const resp = jwt.verify(token, JWT_SECRET)
  console.log("jwtResp", resp);
  return resp;
};

const attachCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

  console.log("accessTokenJWT", accessTokenJWT);
  const oneDay = 1000 * 60 * 60 * 24;
  const longerExp = 1000 * 60 * 60 * 24 * 30;

  const NODE_ENV = "development";

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true, // used to get on http request
    secure: NODE_ENV === 'development',//it should be secured so not get exposed to anywhere
    signed: true,
    // expires: new Date(Date.now() + oneDay),
  });

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    secure: NODE_ENV === 'development',
    signed: true,
    // expires: new Date(Date.now() + longerExp),
  });
  
  return { accessToken: accessTokenJWT, refreshToken: refreshTokenJWT }
};
// const attachSingleCookieToResponse = ({ res, user }) => {
//   const token = createJWT({ payload: user });

//   const oneDay = 1000 * 60 * 60 * 24;

//   res.cookie('token', token, {
//     httpOnly: true,
//     expires: new Date(Date.now() + oneDay),
//     secure: process.env.NODE_ENV === 'production',
//     signed: true,
//   });
// };

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
