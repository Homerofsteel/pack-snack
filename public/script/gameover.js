document.addEventListener("DOMContentLoaded", () => {
    const scoredraw = document.getElementById("score");
    const storedScore = localStorage.getItem("score");

    if (scoredraw) {
        if (storedScore !== null) {
            scoredraw.textContent = `Score: ${storedScore}`;
        } else {
            scoredraw.textContent = "Score: 0"; 
        }
    } else {
        console.error("Élément #score introuvable sur la page HTML !");
    }

    document.getElementById("retry-button").addEventListener("click", function() {
        localStorage.removeItem("score");
        window.location.href = "../html/game.html";
    });

    document.getElementById("home-button").addEventListener("click", function() {
        localStorage.removeItem("score");
        window.location.href = "../html/index.html"; 
    });
});
