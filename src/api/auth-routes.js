const express = require("express");
const router = express.Router();

const AuthService = require("../services/auth-service");
const authService = new AuthService();

router.post("/register", (req, res) => {
  authService
    .register(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(400).json({ msg: err.message });
    });
});

router.post("/login", (req, res) => {
  authService
    .login(req.body)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(400).json({ msg: err.message });
    });
});

module.exports = router;