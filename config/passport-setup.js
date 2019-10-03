const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const config = require("../config");

passport.use(
  new GoogleStrategy({
    clientId: config.get("client_id"),
    clientSecret: config.get("client_secret")
  })
);
