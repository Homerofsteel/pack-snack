import {boundaries} from "./map.js";
import {pellets} from "./map.js";

class Pacman {
    constructor(elementId, position, speed) {
        this.pacman = document.getElementById(elementId);
        this.position = position;
        this.speed = speed;
        this.direction = null;
        this.interval = setInterval(() => this.move(), 30); 

        this.pacman.style.position = "absolute";
        this.pacman.style.left = this.position.x + "px";
        this.pacman.style.top = this.position.y +"px";

        this.init();
    }

    init() {
        document.addEventListener("keydown", (event) => {
            if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(event.key)) {
                this.direction = event.key; 
            }
        });
    }
    

    checkCollision(nextX, nextY) {
        
        // Vérification des collisions avec les boundaries
        for (const boundary of boundaries) {
            if (boundary.id !== "no collision") {
                const pacmanLeft = nextX, pacmanRight = nextX + this.pacman.offsetWidth, pacmanTop = nextY, pacmanBottom = nextY + this.pacman.offsetHeight;
                const boundaryLeft = boundary.position.x, boundaryRight = boundary.position.x + (boundary.image ? boundary.image.width : boundary.width), boundaryTop = boundary.position.y, boundaryBottom = boundary.position.y + (boundary.image ? boundary.image.height : boundary.height);
    
                if (pacmanLeft < boundaryRight && pacmanRight > boundaryLeft && pacmanTop < boundaryBottom && pacmanBottom > boundaryTop) {
                    return true; 
                }
            }
        }
    
        // Vérification des collisions avec les pellets
        for (const pellet of pellets) {
            const pelletLeft = pellet.position.x, pelletRight = pellet.position.x + (pellet.image ? pellet.image.width : pellet.width), pelletTop = pellet.position.y, pelletBottom = pellet.position.y + (pellet.image ? pellet.image.height : pellet.height);
            if (nextX < pelletRight && nextX + this.pacman.offsetWidth > pelletLeft && nextY < pelletBottom && nextY + this.pacman.offsetHeight > pelletTop) {
                return false; 
            }
        }
    
        return false; // Pas de collision
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

        if (this.checkCollision(nextLeft, nextTop)) {
            this.direction = null; 
            return;
        } else {
        this.pacman.style.left = nextLeft + "px";
        this.pacman.style.top = nextTop + "px";
        }
    }
}

const player = new Pacman("pacman", { x: 45, y: 45 }, { x: 5, y: 5 });
