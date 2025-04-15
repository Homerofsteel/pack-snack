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
        this.moveSound = new Audio('../Audio/move.wav');
        this.moveSound.loop = true;
this.moveSoundPlaying = false;
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
        this.currentDirection=null
    
        ghosts.forEach(ghost => {
            console.log(`Réinitialisation du fantôme ${ghost.id}`);
            if (ghost.id === "ghost1") {
                ghost.resetPosition(309, 315);
            } else if (ghost.id === "ghost2") {
                ghost.resetPosition(180, 510);
            } else if (ghost.id === "ghost3") {
                ghost.resetPosition(405, 318);
            } else if (ghost.id === "ghost4") {
                ghost.resetPosition(180, 200);
            }
        });
    
        console.log("Positions réinitialisées !");
    }
    
    
    

    setNextDirection(direction) {
        this.nextDirection = direction;
    
        if (this.directionTimeout) {
            clearTimeout(this.directionTimeout);
            this.directionTimeout = null;
        }
    }
    
    startDirectionTimeout() {
        this.directionTimeout = setTimeout(() => {
            this.nextDirection = null;
            console.log("Next direction reset due to timeout");
        }, 500); 
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
            if (!this.moveSoundPlaying) {
                this.moveSound.play();
                this.moveSoundPlaying = true;
            }
        } else {
            if (this.moveSoundPlaying) {
                this.moveSound.pause();
                this.moveSound.currentTime = 0;
                this.moveSoundPlaying = false;
            }
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
