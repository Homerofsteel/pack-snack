import { checkCollisionBoundaries, checkCollisionPellets, checkGhostCollision } from './collision.js';
import { boundaries } from "./map.js";
import { pellets } from "./map.js";
import { ghosts } from "./ghostclass.js";
import { Character } from "./character.js";

class Pacman extends Character {
    constructor(elementId, position, speed, pacmanLife) {
        super(elementId, position, speed);
        this.pacman = document.getElementById(elementId);
        
        this.life = pacmanLife;
        this.currentDirection = null;
        this.nextDirection = null;
        this.directionTimeout = null;
        this.init();
    }

    init() {
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case 'ArrowRight':
                    this.nextDirection = 'right';
                    break;
                case 'ArrowLeft':
                    this.nextDirection = 'left';
                    break;
                case 'ArrowUp':
                    this.nextDirection = 'up';
                    break;
                case 'ArrowDown':
                    this.nextDirection = 'down';
                    break;
            }
        });

        document.addEventListener("keyup", (event) => {
            switch (event.key) {
                case 'ArrowRight':
                case 'ArrowLeft':
                case 'ArrowUp':
                case 'ArrowDown':
                    this.startDirectionTimeout();
                    break;
            }
        });

        this.move();
    }

    resetCharacters() {
        this.updatePosition(45, 45);

        ghosts.forEach(ghost => {
            switch (ghost.id) {
                case "ghost1":
                    ghost.updatePosition(330, 310);
                    break;
                case "ghost2":
                    ghost.updatePosition(200, 510);
                    break;
                case "ghost3":
                    ghost.updatePosition(420, 300);
                    break;
                case "ghost4":
                    ghost.updatePosition(195, 200);
                    break;
            }
        });

        console.log("Positions reset!");
    }

    setNextDirection(direction) {
        this.nextDirection = direction;
    
        // Annule le timer précédent pour éviter une réinitialisation prématurée
        if (this.directionTimeout) {
            clearTimeout(this.directionTimeout);
            this.directionTimeout = null;
        }
    }
    
    startDirectionTimeout() {
        // Réinitialise la direction après 0,5 seconde
        this.directionTimeout = setTimeout(() => {
            this.nextDirection = null;
            console.log("Next direction reset due to timeout");
        }, 500); // 500 ms
    }
    

    move() {
        let left = parseInt(this.pacman.style.left, 10);
        let top = parseInt(this.pacman.style.top, 10);

        const directionOffsets = {
            right: { x: this.speed.x, y: 0 },
            left: { x: -this.speed.x, y: 0 },
            up: { x: 0, y: -this.speed.y },
            down: { x: 0, y: this.speed.y },
        };

        if (this.nextDirection) {
            const offset = directionOffsets[this.nextDirection];
            const testLeft = left + offset.x;
            const testTop = top + offset.y;

            if (!checkCollisionBoundaries(testLeft, testTop, this.pacman, boundaries)) {
                this.currentDirection = this.nextDirection;
                this.nextDirection = null;
            }
        }

        let nextLeft = left;
        let nextTop = top;

        if (this.currentDirection === 'right') nextLeft += this.speed.x;
        else if (this.currentDirection === 'left') nextLeft -= this.speed.x;
        else if (this.currentDirection === 'up') nextTop -= this.speed.y;
        else if (this.currentDirection === 'down') nextTop += this.speed.y;

        if (!checkCollisionBoundaries(nextLeft, nextTop, this.pacman, boundaries)) {
            this.pacman.style.left = nextLeft + "px";
            this.pacman.style.top = nextTop + "px";
        }

        checkCollisionPellets(nextLeft, nextTop, this.pacman, pellets);

        if (checkGhostCollision(nextLeft, nextTop, this.pacman, ghosts)) {
            this.resetCharacters();
            this.life--;
        }

        if (this.life === 0) {
            open("gameover.html", "_self");
        }

        requestAnimationFrame(() => this.move());
    }
}

const player = new Pacman("pacman-container", { x: 45, y: 45 }, { x: 1, y: 1 }, 3);
