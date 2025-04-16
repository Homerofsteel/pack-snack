import score from "./score"

export class EndScore {
    finalScore;
    constructor() {
        this.finalScore = score.value;
    }

    draw(ctx) {
        ctx.font = "40px Arial";
        ctx.fillStyle = "white";
        ctx.fillText("Final Score: " + this.finalScore, 20, 50);
    }
    reset() {
        score.reset();
    }
}