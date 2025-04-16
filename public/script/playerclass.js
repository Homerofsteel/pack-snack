import { checkCollisionBoundaries, checkCollisionPellets, checkGhostCollision } from './collision.js';
import { boundaries } from "./map.js";
import { pellets } from "./map.js";
import { ghosts } from "./ghostclass.js";
import { Character } from "./character.js";
import { score } from './score.js';

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
        this.moveSound.volume = 0.25;
        this.moveSoundPlaying = false;
        this.damageSound = new Audio('../Audio/damage.mp3');
        this.damageSoundPlaying = false;
        this.PowerUpSound = new Audio('../Audio/powerup.mp3');
        this.music = new Audio('../Audio/music.mp3');
        this.music.play();
        this.bite = new Audio('../Audio/bite.mp3')
        this.isPaused = false;
        this.godmod=false;
        this.init();
    }

    init() {

        document.addEventListener("keydown", (event) => {
            if (!this.isPaused) {
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
            
                }    }
        });

        document.addEventListener("keyup", (event) => {
            if (!this.isPaused) {
            switch (event.key) {
                case 'ArrowRight':
                case 'ArrowLeft':
                case 'ArrowUp':
                case 'ArrowDown':
                    this.startDirectionTimeout();
                    break;
            }
        }
        });

        this.move();
        this.updateLivesDisplay();

    }

    setGodMod() {
            this.godmod = true;
            this.PowerUpSound.play()
            this.music.pause()
            this.pacman.classList.add("godmod");
    }

    resetGodMod() {
        this.godmod=false
            this.PowerUpSound.pause()
            this.music.play()
            this.pacman.classList.remove("godmod");
    }
    

    updateLivesDisplay() {
        const livesContainer = document.getElementById("pacman-lives");
        livesContainer.innerHTML = "";
    
        for (let i = 0; i < this.life; i++) {
            const img = document.createElement("img");
            img.src = "../Images/standing-rick.png";
            img.alt = "pacman-life";
            img.style.width = "30px";
            img.style.marginRight = "5px"; 
            livesContainer.appendChild(img);
        }
    }
    

    resetCharacters() {
        this.updatePosition(45, 45);
        this.currentDirection = null;
    
        if (this.moveSoundPlaying) {
            this.moveSound.pause();
            this.moveSound.currentTime = 0; 
            this.moveSoundPlaying = false;
        }
    
        ghosts.forEach(ghost => {
            console.log(`Réinitialisation du fantôme ${ghost.id}`);
            if (ghost.id === "ghost1") {
                ghost.resetPosition(720, 230);
            } else if (ghost.id === "ghost2") {
                ghost.resetPosition(225, 360);
            } else if (ghost.id === "ghost3") {
                ghost.resetPosition(720, 360);
            } else if (ghost.id === "ghost4") {
                ghost.resetPosition(225, 225);
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

    updateImage() {
        if (this.isPaused) {
            this.pacman.src = "../Images/drunk-rick.png";
        } else {
            this.pacman.src = "../Images/standing-rick.png"; 
        }
    }
    
    

    move() {
        let left = parseInt(this.pacman.style.left, 10);
        let top = parseInt(this.pacman.style.top, 10);
    
        const direction = {
            right: { x: this.speed.x, y: 0},
            left: { x: -this.speed.x, y: 0 },
            up: { x: 0, y: -this.speed.y },
            down: { x: 0, y: this.speed.y },
        };
    
        if (!this.isPaused) {
            if (this.nextDirection) {
                const offset = direction[this.nextDirection];
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
    
                if (!this.moveSoundPlaying && this.currentDirection !== null) {
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
    
            checkCollisionPellets(nextLeft, nextTop, this.pacman, pellets)


                
            const collidedGhost = checkGhostCollision(nextLeft, nextTop, this.pacman, ghosts);

            console.log(this.godmod)

if (collidedGhost) {
    if (!this.godmod) {
        this.moveSound.pause();
        this.moveSound.currentTime = 0;
        this.moveSoundPlaying = false;
        this.damageSound.play();

        this.isPaused = true;
        this.updateImage();

        setTimeout(() => {
            this.resetCharacters();
            this.life--;

            if (this.life === 0) {
                open("gameover.html", "_self");
            } else {
                this.isPaused = false;
                this.updateImage();
            }

            this.updateLivesDisplay();
        }, 1000);
    } else {
        this.bite.play()
        score.add(50);
        switch (collidedGhost.id) {
            case "ghost1":
                collidedGhost.resetPosition(309, 315);
                break;
            case "ghost2":
                collidedGhost.resetPosition(180, 490);
                break;
            case "ghost3":
                collidedGhost.resetPosition(405, 318);
                break;
            case "ghost4":
                collidedGhost.resetPosition(180, 225);
                break;
        }
    }
}
        }
    
        requestAnimationFrame(() => this.move());
    }
    
}

export const player = new Pacman("pacman", { x: 45, y: 45 }, { x: 1, y: 1 }, 3);
