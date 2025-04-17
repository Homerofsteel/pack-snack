//gestion du score

class Score {
  constructor() {
      this.value = -10; 
  }

  reset() {
      this.value = -10; 
      this.updateScoreDisplay(); 
  }

  add(points) {
    if (this.value+points<0){
        this.value=0
    } else {
        this.value += points;
    }
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