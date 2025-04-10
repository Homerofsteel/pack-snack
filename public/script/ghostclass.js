import { checkCollisionBoundaries} from './collision.js';
import { boundaries } from "./map.js";
import { Character } from "./character.js";

export class Ghost extends Character {
    constructor(elementId, position, speed) {
        super(elementId, position, speed);
        this.ghost = this.element;
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

        if (checkCollisionBoundaries(nextX, nextY, this.ghost, boundaries)) {
            this.setRandomDirection();
        } else {
            this.position.x = nextX;
        this.position.y = nextY;
        this.updatePosition(this.position.x, this.position.y);
        }

        requestAnimationFrame(this.move);
    };
}

export function createGhosts() {
    return [
        new Ghost("ghost1", { x: 330, y: 310 }, { x: 1.5, y: 1.5 }),
        new Ghost("ghost2", { x: 200, y: 510 }, { x: 1.5, y: 1.5 }),
        new Ghost("ghost3", { x: 420, y: 300 }, { x: 1.5, y: 1.5 }),
        new Ghost("ghost4", { x: 195, y: 200 }, { x: 1.5, y: 1.5 })
    ];
}

    export const ghosts = createGhosts();
    console.log(ghosts); 
