import { checkCollisionBoundaries, checkGhostCollision} from './collision.js';
import { boundaries } from "./map.js";
import { Character } from "./character.js";

export class Ghost extends Character {
    constructor(elementId, position, speed, ghosts) {
        super(elementId, position, speed);
        this.ghost = this.element;
        this.ghosts = ghosts || [];
        this.id = elementId
        this.startMoving();
    }

    startMoving() {
        this.setRandomDirection();
        this.move();
    }

    reverseDirection() {
        this.direction.x = -this.direction.x;
        this.direction.y = -this.direction.y;
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

        if (checkCollisionBoundaries(nextX, nextY, this.ghost, boundaries, )) {
            this.setRandomDirection();
        } else {
            this.position.x = nextX;
        this.position.y = nextY;
        this.updatePosition(this.position.x, this.position.y);
        }

        if (checkGhostCollision(nextX, nextY, this.ghost, this.ghosts)) {
            this.reverseDirection();
        }

        requestAnimationFrame(this.move);
    };
}

export function createGhosts() {
    const ghosts = [];
    ghosts.push(new Ghost("ghost1", { x: 309, y: 315 }, { x: 1, y: 1 }, ghosts));
    ghosts.push(new Ghost("ghost2", { x: 180, y: 510 }, { x: 1, y: 1 }, ghosts));
    ghosts.push(new Ghost("ghost3", { x: 405, y: 318 }, { x: 1, y: 1 }, ghosts));
    ghosts.push(new Ghost("ghost4", { x: 180, y: 200 }, { x: 1, y: 1 }, ghosts));

    return ghosts;
}


    export const ghosts = createGhosts();
    console.log(ghosts); 
