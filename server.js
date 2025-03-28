const express = require('express');
const app = express();

// Définir "public" comme dossier contenant tous les fichiers statiques
app.use(express.static('public'));

// Rediriger vers index.html par défaut
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/html/index.html');
});

app.listen(3000, () => {
    console.log('Serveur en écoute sur http://localhost:3000');
});
