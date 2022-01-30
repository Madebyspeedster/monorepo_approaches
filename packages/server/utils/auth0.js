const axios = require("axios");

const getAccessToken = (user_refresh_token) => {
  return axios
    .post(`https://${process.env.AUTH0_CLIENT_DOMAIN}/oauth/token`, {
      grant_type: "refresh_token",
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: `${process.env.AUTH0_CLIENT_SECRET}`,
      refresh_token: JSON.parse(user_refresh_token),
    })
    .then((response) => Promise.resolve(response.data))
    .catch((e) => {
      console.log(e);
    });
};

module.exports = {
  getAccessToken,
};
