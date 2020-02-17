
// passport and jwt authentication
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const repository = require('../repository');

const SECRET_KEY = 'SECRET_KEY';

async function verify(username, password, done) {
  const user = await repository.users.findUser(username);

  if (!user) {
    return done(null, false, { message: 'User not found' });
  }

  if (await repository.users.verifyPassword(user, password)) {
    return done(null, user);
  } else {
    return done(null, false, { message: 'Incorrect password' });
  }
}

passport.use(new BasicStrategy(verify));

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET_KEY,
};

passport.use(new JwtStrategy(jwtOpts, async (payload, done) => {
  const user = await repository.users.findUser(payload.username);

  if (user) {
    return done(null, user);
  } else {
    return done(null, false, { message: 'User not found' });
  }
}));

module.exports = passport;
