document.addEventListener("DOMContentLoaded", function() {
    const finalScore = localStorage.getItem("pacmanScore");
    const scoreElement = document.getElementById("score");

    if (scoreElement && finalScore !== null) {
        scoreElement.textContent = `Score final : ${finalScore}`;
    }

    document.getElementById("retry-button").addEventListener("click", function() {
        localStorage.removeItem("pacmanScore");
        window.location.href = "../html/game.html";
    });

    document.getElementById("home-button").addEventListener("click", function() {
        localStorage.removeItem("pacmanScore");
        window.location.href = "../html/index.html"; 
    });
});
