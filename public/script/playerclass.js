import { checkCollisionBoundaries, checkCollisionPellets, checkGhostCollision } from './collision.js';
import {boundaries} from "./map.js";
import {pellets} from "./map.js";
import {ghosts} from "./ghostclass.js"
import { Character} from "./character.js"

class Pacman extends Character {
    constructor(elementId, position, speed, pacmanLife) {
        super(elementId, position, speed);
        this.pacman = document.getElementById(elementId);
        this.init();
        this.life=pacmanLife;
    }

    init() {
        document.addEventListener("keydown", (event) => {
            switch(event.key) {
                case 'ArrowRight': 
                keys.right.pressed = true;
                lastKey='right';
                break;
                case 'ArrowLeft': 
                keys.left.pressed = true;
                lastKey='left';
                break;
                case 'ArrowUp': 
                keys.up.pressed = true;
                lastKey='up';
                break;
                case 'ArrowDown': 
                keys.down.pressed = true;
                lastKey='down';
                break;

            }
        });
        document.addEventListener("keyup", (event) => {
            switch(event.key) {
                case 'ArrowRight': 
                keys.right.pressed = false;
                break;
                case 'ArrowLeft': 
                keys.left.pressed = false;
                break;
                case 'ArrowUp': 
                keys.up.pressed = false;
                break;
                case 'ArrowDown': 
                keys.down.pressed = false;
                break;

            }
        });
        this.move()
    } 

    move() {

        let left = parseInt(this.pacman.style.left, 10);
        let top = parseInt(this.pacman.style.top, 10);


        let nextLeft = left;
        let nextTop = top;

        if (keys.right.pressed && lastKey=='right') {
            nextLeft += this.speed.x;
        } else if (keys.left.pressed && lastKey=='left') {
            nextLeft -= this.speed.x;
        } else if (keys.up.pressed && lastKey=='up') {
            nextTop -= this.speed.y;
        } else if (keys.down.pressed && lastKey=='down')  {
            nextTop += this.speed.y;
        }

        if (!checkCollisionBoundaries(nextLeft, nextTop, this.pacman, boundaries)) {
            this.pacman.style.left = nextLeft + "px";
            this.pacman.style.top = nextTop + "px";
        }

        checkCollisionPellets(nextLeft, nextTop, this.pacman, pellets)
        
        if (checkGhostCollision(nextLeft,nextTop, this.pacman, ghosts)) {
            this.updatePosition(45,45)
            this.life--
        }

        if (this.life==0) {
            open("index.html")
        }
        
        requestAnimationFrame(() => this.move());

    }
    
}


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

const player = new Pacman("pacman", { x: 45, y: 45 }, { x: 5, y: 5 },3);




