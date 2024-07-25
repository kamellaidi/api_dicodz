const express = require('express');
const db = require('./config/db'); // Assurez-vous que le chemin est correct
const routes = require('./routes');
const cors = require('cors');  // Importer le middleware CORS


const app = express();
const port = 3000; // Définissez le port que vous souhaitez utiliser
// Middleware pour traiter les requêtes JSON
app.use(express.json());

// Configuration de CORS
app.use(cors({
  origin: 'http://localhost:3001', // Remplacez par l'origine de votre front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Méthodes HTTP autorisées
  allowedHeaders: ['Content-Type', 'Authorization'] // En-têtes autorisés
}));

// Utiliser le routeur pour les mots
app.use('/api', routes);

// Route de test pour vérifier la connexion à la base de données
app.get('/', async (req, res) => {
  try {
    // Vérifier si la connexion est ouverte et opérationnelle
    //await db.connect(); // Establish the database connection
    console.log('Database connection state:', db.readyState);
    if (db.readyState === 1) {
      res.status(200).send('Connexion à la base de données réussie !');
    } else {
      console.error('Erreur de connexion à la base de données:', db.readyState);
      res.status(500).send('Erreur de connexion à la base de données.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur de connexion à la base de données.');
  }
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
