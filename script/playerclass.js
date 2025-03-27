class Pacman {
    constructor(position, speed, direction, interval) {
        this.position=position;
        this.speed=speed;
        this.direction = direction;
        this.interval = interval;

        this.init()
    }

    init() {
        document.addEventListener("keydown", (event) => {
            if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(event.key)) {
                this.direction = event.key;
                if (!this.interval) {
                    this.interval = setInterval(() => this.move(), 30);
                }
            }
        });

        document.addEventListener("keyup", () => {
            clearInterval(this.interval);
            this.interval = null;
        });
    }

    move() {
        if (!this.direction) return;

        let left = parseInt(this.pacman.style.left) || this.position.x;
        let top = parseInt(this.pacman.style.top) || this.position.y;

        if (this.direction === "ArrowRight" && left + this.step < window.innerWidth - this.pacman.offsetWidth) {
            this.pacman.style.left = left + this.step + "px";
        } else if (this.direction === "ArrowLeft" && left - this.step > 0) {
            this.pacman.style.left = left - this.step + "px";
        } else if (this.direction === "ArrowUp" && top - this.step > 0) {
            this.pacman.style.top = top - this.step + "px";
        } else if (this.direction === "ArrowDown" && top + this.step < window.innerHeight - this.pacman.offsetHeight) {
            this.pacman.style.top = top + this.step + "px";
        }
    }
}

const player = new Pacman ({
    position: {x:40,y:40},
    speed: {x: 40,y:40}
})