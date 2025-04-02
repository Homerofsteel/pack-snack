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
        document.addEventListener("keydown", (key) => {
            switch(key) {
                case 'ArrowRight': 
                keys.right.pressed = true
                lastKey='right'
                break
                case 'ArrowLeft': 
                keys.left.pressed = true
                lastKey='left'
                break
                case 'ArrowUp': 
                keys.up.pressed = true
                lastKey='up'
                break
                case 'ArrowDown': 
                keys.down.pressed = true
                lastKey='down'
                break

            }
        });
        document.addEventListener("keyup", (key) => {
            switch(key) {
                case 'ArrowRight': 
                keys.right.pressed = false
                break
                case 'ArrowLeft': 
                keys.left.pressed = false
                break
                case 'ArrowUp': 
                keys.up.pressed = false
                break
                case 'ArrowDown': 
                keys.down.pressed = false
                break

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

        if (key.right.pressed && lastKey=='right') {
            nextLeft += this.speed.x;
        } else if (key.left.pressed && lastKey=='left') {
            nextLeft -= this.speed.x;
        } else if (key.up.pressed && lastKey=='up') {
            nextTop -= this.speed.y;
        } else if (key.down.pressed && lastKey=='down')  {
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

const keys = {
    down: {
        pressed: false
    },
    up: {
        pressed: false
    },
    left: {
        pressed: false
    },
    right: {
        pressed: false
    },
}


let lastKey=''