const express = require('express');

const authRouter = express.Router({ mergeParams: true });

const repository = require('../repository');

// passport and jwt authentication
const jwt = require('jsonwebtoken');
const passport = require('../utils/passport');

const SECRET_KEY = 'SECRET_KEY';

authRouter.all('/',
  passport.authenticate('basic', { session: false }),
  async (req, res) => {
    const { username } = req.user;
    let userData;

    const opts = { expiresIn: 6000 }; // token expires in 100min
    const token = jwt.sign({ username }, SECRET_KEY, opts);

    if (token) {
      userData = await repository.users.findUser(username);
      delete userData.passwordHash;
    }

    return res.status(200).json({ message: 'Auth Passed', token, userData });
  });

module.exports = authRouter;
