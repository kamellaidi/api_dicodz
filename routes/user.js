const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Importez le contrôleur Word

// Route POST pour créer un user
router.post('/create', userController.createUser);
// Route POST pour connecter un user
router.post('/login', userController.loginUser);
// Route GET pour avoir tous les users
router.get('/', userController.getAllUsers);
// Route GET pour récupérer un utilisateur spécifique par son ID
router.get('/:id', userController.getUserById);

module.exports = router;

