const express = require('express');
const app = express();

const { getPlayerByEmail, passwordOk } = require('../player/player.controller');
const { missingParameters } = require('../utils/errors');
const { generateToken } = require('./login.controller');

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json(missingParameters({ email, password }));
  } else {
    const player = await getPlayerByEmail(email);
    if (player) {
      if (passwordOk(password, player.password)) {
        const { email, username, roles, teams } = player;
        const user = {
          email,
          username,
          roles,
          teams
        };
        const token = generateToken(user);
        if (token) {
          res.status(200).json(token);
        } else {
          res.status(500).json(`Something fail with the token`);
        }
      } else {
        res.status(400).json(`Incorret password`);
      }
    } else {
      res.status(404).json(`User ${email} not found`);
    }
  }
});

module.exports = app;
