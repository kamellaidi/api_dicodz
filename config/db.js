const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();

// Construire l'URI de connexion
const mongoDB = `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
console.log(mongoDB); // Affiche l'URI de connexion MongoDB

// Configurer la connexion mongoose
mongoose.connect(mongoDB);

// Obtenir la connexion par défaut
console.log('État de la connexion par défaut :', mongoose.connection.readyState); // Affiche l'état de la connexion par défaut

// Configurer la connexion mongoose
MongoClient.connect(mongoDB, (err, client) => {
    if (err) {
        console.error('Erreur de connexion MongoDB :', err); // Affiche l'erreur de connexion MongoDB
        if (client) {
            client.close();
        }
    } else {
        console.log('Connexion MongoDB réussie'); // Affiche la réussite de la connexion MongoDB
        client.close();
    }
});

// Lier la connexion à l'événement d'erreur (pour recevoir les notifications d'erreur de connexion)
mongoose.connection.on('error', console.error.bind(console, 'Erreur de connexion MongoDB :')); // Affiche l'erreur de connexion MongoDB avec Mongoose
mongoose.connection.on('open', () => {
    console.log('Connexion MongoDB réussie avec Mongoose'); // Affiche la réussite de la connexion MongoDB avec Mongoose
});

// Exporter la connexion à la base de données
module.exports = mongoose.connection;
