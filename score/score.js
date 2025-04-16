class Score {
    constructor() {
      this.value = 0;
    }
  
    add(points) {
      this.value += points;
    }
  
    reset() {
      this.value = 0;
    }
  
    draw(ctx) {
      ctx.font = "20px Arial";
      ctx.fillStyle = "white";
      ctx.fillText("Score: " + this.value, 20, 30);
    }
  }
  
  const score = new Score();
  export default score;