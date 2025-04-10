document.addEventListener("DOMContentLoaded", function() {
    const finalScore = 1500;
    document.getElementById("final-score")
    document.getElementById("retry-button").addEventListener("click", function() {
        window.location.href = "game.html";
    });

    document.getElementById("home-button").addEventListener("click", function() {
        window.location.href = "index.html"; 
    });
});
