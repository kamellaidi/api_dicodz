const express = require('express');
const router = express.Router();

const wordsRouter = require('./words');
const usersRouter = require('./user');

// Utiliser le routeur des mots
router.use('/words', wordsRouter);
// Utiliser le routeur des users
router.use('/users', usersRouter);

module.exports = router;
