class Pacman {
    constructor(elementId, position, speed) {
        this.pacman = document.getElementById(elementId);
        this.position = position;
        this.speed = speed;
        this.direction = null;
        this.interval = setInterval(() => this.move(), 30); 

        this.pacman.style.position = "absolute";
        this.pacman.style.left = this.position.x + "px";
        this.pacman.style.top = this.position.y + "px";

        this.init();
    }

    init() {
        document.addEventListener("keydown", (event) => {
            if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(event.key)) {
                this.direction = event.key; 
            }
        });
    }

    move() {
        if (!this.direction) return; 

        let left = parseInt(this.pacman.style.left);
        let top = parseInt(this.pacman.style.top);

        let nextLeft = left;
        let nextTop = top;

        if (this.direction === "ArrowRight") {
            nextLeft += this.speed.x;
        } else if (this.direction === "ArrowLeft") {
            nextLeft -= this.speed.x;
        } else if (this.direction === "ArrowUp") {
            nextTop -= this.speed.y;
        } else if (this.direction === "ArrowDown") {
            nextTop += this.speed.y;
        }

        if (nextLeft < 0 || nextLeft > window.innerWidth - this.pacman.offsetWidth ||
            nextTop < 0 || nextTop > window.innerHeight - this.pacman.offsetHeight) {
            this.direction = null; 
            return;
        }

        this.pacman.style.left = nextLeft + "px";
        this.pacman.style.top = nextTop + "px";
    }
}

const player = new Pacman("pacman", { x: 100, y: 100 }, { x: 5, y: 5 });
