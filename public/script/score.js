class Score {
  constructor() {
      this.value = 0; 
  }

  reset() {
      this.value = 0; 
      this.updateScoreDisplay(); 
  }

  add(points) {
      this.value += points;
      console.log(`Score actuel : ${this.value}`); 
      this.updateScoreDisplay(); 
      localStorage.setItem("score", this.value);
  }

  updateScoreDisplay() {
      const scoredraw = document.getElementById("score");
      if (scoredraw) {
          scoredraw.textContent = `Score: ${this.value}`;
      } else {
          console.error("Élément #score introuvable sur la page HTML !");
      }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  score.updateScoreDisplay();
});


export const score = new Score();
