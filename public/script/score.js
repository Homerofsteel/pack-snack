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
    const scoreValue = document.getElementById("score-value");
    if (scoreValue) {
        scoreValue.textContent = this.value;
    } else {
        console.error("Élément #score-value introuvable sur la page HTML !");
    }
}

showScoreAdded(value) {
    const scoreAdded = document.getElementById("score-added");
    if (!scoreAdded) return;

    scoreAdded.textContent = value > 0 ? `+${value}` : `${value}`;
    scoreAdded.style.color = value > 0 ? 'green' : 'red';
    
    scoreAdded.classList.add("show");

    setTimeout(() => {
        scoreAdded.classList.remove("show");
    }, 800);
}

}

document.addEventListener("DOMContentLoaded", () => {
  score.updateScoreDisplay();
});


export const score = new Score();