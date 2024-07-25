const Word = require('../models/word'); // Importez le modèle Word

// Route GET pour récupérer tous les mots
const getAllWords = async (req, res) => {
  try {
    const mots = await Word.find(); // Récupère tous les documents "mot"
    res.json(mots); // Envoie les mots au format JSON
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la récupération des mots');
  }
};

// Route PUT pour mettre à jour un mot spécifique
const updateWord = async (req, res) => {
  const wordId = req.params.id;
  const updateData = req.body;

  try {
    const updatedWord = await Word.findByIdAndUpdate(wordId, updateData, {
      new: true,
    });
    if (!updatedWord) {
      return res.status(404).send('Mot non trouvé');
    }
    res.json(updatedWord);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la mise à jour du mot');
  }
};

// Route DELETE pour supprimer un mot spécifique
const deleteWord = async (req, res) => {
  const wordId = req.params.id;

  try {
    const deletedWord = await Word.findByIdAndDelete(wordId);
    if (!deletedWord) {
      return res.status(404).send('Mot non trouvé');
    }
    res.json(deletedWord);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la suppression du mot');
  }
};

// Route POST pour créer un nouveau mot
const createWord = async (req, res) => {
  const { wordfr, worddz, type } = req.body;

  // Validation des données
  if (!wordfr || !worddz || !type) {
    return res
      .status(400)
      .send('Tous les champs (wordfr, worddz, type) sont requis');
  }

  try {
    // Création d'une nouvelle instance du modèle Word
    const newWord = new Word({ wordfr, worddz, type });

    // Sauvegarde du nouveau mot dans la base de données
    const savedWord = await newWord.save();

    res.status(201).json(savedWord); // Retourne le mot créé en réponse
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'ajout du mot");
  }
};

// Route POST pour créer plusieurs mots
const createMultipleWords = async (req, res) => {
  const words = req.body.words;
  console.log(words);

  // Validation des données
  if (!Array.isArray(words) || words.length === 0) {
    return res.status(400).send('Une liste de mots est requise');
  }

  try {
    // Sauvegarde des nouveaux mots dans la base de données
    const savedWords = await Word.insertMany(words);

    res.status(201).json(savedWords); // Retourne les mots créés en réponse
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'ajout des mots");
  }
};

// Route DELETE pour supprimer plusieurs mots

// Route DELETE pour supprimer plusieurs mots
const deleteMultipleWords = async (req, res) => {
  const wordIds = req.body.wordIds;

  // Validation des données
  if (!Array.isArray(wordIds) || wordIds.length === 0) {
    return res.status(400).send('Une liste d\'IDs de mots est requise');
  }

  try {
    // Suppression des mots dans la base de données
    const deletedWords = await Word.deleteMany({ _id: { $in: wordIds } });

    res.status(200).json(deletedWords); // Retourne les informations des mots supprimés
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la suppression des mots');
  }
};

// Route GET pour rechercher des mots en fonction d'une requête de recherche
const searchWords = async (req, res) => {
  const searchQuery = req.query.q || ''; // Récupère la requête de recherche depuis les paramètres de la requête

  try {
    // Recherche des mots en fonction de la requête
    const mots = await Word.find({
      $or: [
        { wordfr: { $regex: searchQuery, $options: 'i' } }, // Recherche insensible à la casse dans le champ wordfr
        { worddz: { $regex: searchQuery, $options: 'i' } }, // Recherche insensible à la casse dans le champ worddz
        { type: { $regex: searchQuery, $options: 'i' } } // Recherche insensible à la casse dans le champ type
      ]
    });

    res.json(mots); // Envoie les mots trouvés en réponse
  } catch (error) {
    console.error(error);
    res.status(500).send('Erreur lors de la recherche des mots');
  }
};



module.exports = {
  getAllWords,
  updateWord,
  deleteWord,
  createWord,
  createMultipleWords,
  deleteMultipleWords,
  searchWords
};
