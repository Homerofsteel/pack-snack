// Ce script permet de gérer l'affichage du score et les actions des boutons
document.addEventListener("DOMContentLoaded", function() {
    // Simulation du score final. Remplace ce score par la variable réelle de ton jeu.
    const finalScore = 1500;  // Exemple de score
    document.getElementById("final-score").innerText = finalScore;

    // Réinitialiser ou redémarrer le jeu
    document.getElementById("retry-button").addEventListener("click", function() {
        // Rediriger vers la page de jeu, ajuster selon la structure de ton jeu
        window.location.href = "index.html";  // Assure-toi de définir la bonne page de jeu
    });

    // Retourner à la page d'accueil
    document.getElementById("home-button").addEventListener("click", function() {
        // Rediriger vers la page d'accueil
        window.location.href = "accueil.html";  // Assure-toi de définir la bonne page d'accueil
    });
});
