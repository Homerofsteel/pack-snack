import score from "./score";
import { EndScore } from "./endScore";

document.addEventListener("DOMContentLoaded", function() {
    EndScore.finalscore(score.value);
    document.getElementById("final-score")
    document.getElementById("retry-button").addEventListener("click", function() {
        window.location.href = "game.html";
    });

    document.getElementById("home-button").addEventListener("click", function() {
        window.location.href = "index.html"; 
    });
});
