const express = require('express');

const signupRouter = express.Router();

const repository = require('../repository');

signupRouter.post('/', async (req, res) => {
  const newUser = req.body;
  const { firstname, username, email, password } = newUser;

  if (!firstname || !username || !email || !password) {
    res.status(400).send('Fill required fields  correctly');
  } else {
    const findUser = await repository.users.findUser(username, email);

    if (!findUser) {
      newUser.role = 'publisher';
      await repository.users.addUser(newUser);
      delete newUser.passwordHash;
      res
        .status(200)
        .json({ message: 'User successfully registered', newUser });
    } else if (findUser.username === username) {
      res.status(400).send('Username already exists');
    } else {
      res.status(400).send('Email already exists');
    }
  }
});

module.exports = signupRouter;
