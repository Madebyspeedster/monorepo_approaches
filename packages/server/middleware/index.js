const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

module.exports = (app) => {
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(cookieParser());
  app.use(cors());
  app.use(helmet.frameguard());
};
