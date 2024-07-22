const express = require('express');
const router = express.Router();

const wordsRouter = require('./words');

// Utiliser le routeur des mots
router.use('/words', wordsRouter);

module.exports = router;
