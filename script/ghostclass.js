class Ghost {
    constructor(elementId, position, speed) {
        this.ghost = document.getElementById(elementId);
        this.position = position ;
        this.speed = speed ;
        this.direction = null;

        this.ghost.style.position = "absolute";
        this.ghost.style.left = this.position.x + "px";
        this.ghost.style.top = this.position.y + "px";

        this.startMoving();
    }

    startMoving() {
        
        this.setRandomDirection();
        this.move();
    }

    setRandomDirection() {
        const directions = [
            { x: this.speed.x, y: 0 },  
            { x: -this.speed.x, y: 0 }, 
            { x: 0, y: this.speed.y }, 
            { x: 0, y: -this.speed.y }  
        ];
        this.direction = directions[Math.floor(Math.random() * directions.length)];
    }

    move = () => {

        let nextX = this.position.x + this.direction.x;
        let nextY = this.position.y + this.direction.y;

        if (nextX < 0 || nextX > window.innerWidth - this.ghost.offsetWidth ||
            nextY < 0 || nextY > window.innerHeight - this.ghost.offsetHeight) {
            this.setRandomDirection();
            if (
                nextX < ghost1.position.x + ghost1.ghost.offsetWidth &&
                nextX + this.ghost.offsetWidth > ghost1.position.x &&
                nextY < ghost1.position.y + ghost1.ghost.offsetHeight &&
                nextY + this.ghost.offsetHeight > ghost1.position.y
            ) {
                this.setRandomDirection();
            }
        } else {
            this.position.x = nextX;
            this.position.y = nextY;
            this.ghost.style.left = this.position.x + "px";
            this.ghost.style.top = this.position.y + "px";
        }

        requestAnimationFrame(this.move);
    }
}

const ghost1 = new Ghost("ghost1", { x: 500, y: 300 }, { x: 2, y: 2 });
const ghost2 = new Ghost("ghost2", { x: 200, y: 600 }, { x: 3, y: 1 });
