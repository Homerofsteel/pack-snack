class Ghost {
    constructor(elementId, position, speed) {
        this.ghost = document.getElementById(elementId);
        this.position = position;
        this.speed = speed;
        this.direction = null;
        this.interval = setInterval(() => this.move(), 30); 

        this.ghost.style.position = "absolute";
        this.ghost.style.left = this.position.x + "px";
        this.ghost.style.top = this.position.y + "px";

        this.init();
    }


    move() {

        let left = parseInt(this.ghost.style.left);
        let top = parseInt(this.ghost.style.top);

        let nextLeft = left;
        let nextTop = top;

        let randomnumber=Math.random(1,4)

        setTimeout(function () {

        if (randomnumber==1) {
            nextLeft += this.speed.x;
        } else if (randomnumber==2) {
            nextLeft -= this.speed.x;
        } else if (randomnumber==3) {
            nextTop -= this.speed.y;
        } else if (randomnumber==4) {
            nextTop += this.speed.y;
        }
    }, 60000);

        if (nextLeft < 0 || nextLeft > window.innerWidth - this.pacman.offsetWidth ||
            nextTop < 0 || nextTop > window.innerHeight - this.pacman.offsetHeight) {
            this.direction = null; 
            return;
        }

        this.pacman.style.left = nextLeft + "px";
        this.pacman.style.top = nextTop + "px";
    }
}

const ghost = new Ghost("ghost", { x: 500, y: 300 }, { x: 3, y: 3 });
// const ghost2 = new Ghost("ghost2", { x: 200, y: 150 }, { x: 4, y: 2 });
