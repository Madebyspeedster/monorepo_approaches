const express = require("express");

const dayjs = require("dayjs");
const { getAccessToken } = require("../utils/auth0");

const auth0Route = express.Router();

auth0Route.post("/v1/auth0/save-refresh-token", (req, res) => {
  //TODO: check on authorized user.
  res.cookie("secureCookie", JSON.stringify(req.body.token), {
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    expires: dayjs().add(7, "days").toDate(),
  });
  res.send("Cookie have been saved successfully");
});

auth0Route.get("/v1/auth0/get-token-silently", async (req, res) => {
  const { refresh_token, access_token } = await getAccessToken(
    req.cookies.secureCookie
  );
  res
    .status(200)
    .cookie("secureCookie", JSON.stringify(refresh_token), {
      secure: process.env.NODE_ENV !== "development",
      httpOnly: true,
      expires: dayjs().add(7, "days").toDate(),
    })
    .json({
      token: access_token,
    });
});

module.exports = auth0Route;
