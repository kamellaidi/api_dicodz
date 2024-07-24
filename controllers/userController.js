const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Route POST pour créer un nouvel utilisateur
const createUser = async (req, res) => {
  const { username, password, email, role } = req.body;

  // Validation des données
  if (!username || !password || !email) {
    return res
      .status(400)
      .send('Tous les champs (username, password, email) sont requis');
  }

  try {
    // Vérifier si l'utilisateur existe déjà en fonction de l'email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('Un utilisateur avec cet e-mail existe déjà');
    }
    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création d'une nouvelle instance du modèle User
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      role,
    });

    // Sauvegarde du nouvel utilisateur dans la base de données
    const savedUser = await newUser.save();

    res.status(201).json(savedUser); // Retourne l'utilisateur créé en réponse
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'ajout de l'utilisateur");
  }
};

// Route POST pour connecter un utilisateur
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validation des données
  if (!email || !password) {
    return res.status(400).send('Email et mot de passe sont requis');
  }

  try {
    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).send('Email ou mot de passe incorrect');
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Email ou mot de passe incorrect');
    }

    // Générer un token JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: '1h',
      }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la connexion de l'utilisateur");
  }
};

// Route GET pour récupérer un utilisateur spécifique par son ID
const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId); // Récupère le document "user" par son ID
    if (!user) {
      return res.status(404).send('Utilisateur non trouvé');
    }
    res.json(user); // Envoie l'utilisateur au format JSON
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de la récupération de l'utilisateur");
  }
};

// Route GET pour récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Récupère tous les documents "user"
    res.json(users); // Envoie les utilisateurs au format JSON
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des utilisateurs');
  }
};

const updateUser = (req, res) => {
  // Logic to update a user by ID
};

const deleteUser = (req, res) => {
  // Logic to delete a user by ID
};

// Export your controller functions
module.exports = {
  createUser,
  loginUser,
  getUserById,
  updateUser,
  deleteUser,
  getAllUsers,
};
