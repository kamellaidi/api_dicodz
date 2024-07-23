const express = require('express');
const router = express.Router();
const wordsController = require('../controllers/wordsController'); // Importez le contrôleur Word

// Route GET pour récupérer tous les mots
router.get('/', wordsController.getAllWords);

// Route PUT pour mettre à jour un mot spécifique
router.put('/:id', wordsController.updateWord);

// Route DELETE pour supprimer un mot spécifique
router.delete('/:id', wordsController.deleteWord);
// Route POST pour créer un nouveau mot
router.post('/', wordsController.createWord);

// Route POST pour créer plusieurs mots
router.post('/multiple', wordsController.createMultipleWords);

// Route DELETE pour supprimer plusieurs mots 
router.delete('/multiple', wordsController.deleteMultipleWords);

module.exports = router;

