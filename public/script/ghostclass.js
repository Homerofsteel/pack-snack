import { checkCollisionBoundaries, checkGhostCollision } from './collision.js';
import { boundaries } from "./map.js";
import { Character } from "./character.js";

export class Ghost extends Character {
    constructor(elementId, position, speed, ghosts) {
        super(elementId, position, speed);
        this.ghost = document.getElementById(elementId); 
        this.ghosts = ghosts || [];
        this.id = elementId;
        this.lastDirection = null;
        this.startMoving();
    }

    resetPosition(x, y) {
        this.position = { x, y };
        this.updatePosition(x, y); 
    }

    startMoving() {
        this.setRandomDirection();
        this.move();
    }

    reverseDirection() {
        this.direction.x = -this.direction.x;
        this.direction.y = -this.direction.y;
    }

    getAvailableDirections() {
        return [
            { x: this.speed.x, y: 0 },
            { x: -this.speed.x, y: 0 },
            { x: 0, y: this.speed.y },
            { x: 0, y: -this.speed.y }
        ];
    }

    isAtIntersection(position) {
        const validDirections = this.getAvailableDirections().filter(dir => {
            const nextX = position.x + dir.x;
            const nextY = position.y + dir.y;
            return !checkCollisionBoundaries(nextX, nextY, this.ghost, boundaries);
        });
        return validDirections.length > 2;
    }

    setRandomDirection() {
        const directions = this.getAvailableDirections();
        const filtered = this.lastDirection
            ? directions.filter(dir => !(dir.x === -this.lastDirection.x && dir.y === -this.lastDirection.y))
            : directions;

        this.direction = filtered[Math.floor(Math.random() * filtered.length)];
        this.lastDirection = this.direction;
    }

    move = () => {
        const nextX = this.position.x + this.direction.x;
        const nextY = this.position.y + this.direction.y;

        if (checkCollisionBoundaries(nextX, nextY, this.ghost, boundaries)) {
            this.setRandomDirection();
        } else {
            this.position = { x: nextX, y: nextY };
            this.updatePosition(nextX, nextY);

            if (this.isAtIntersection(this.position)) {
                this.setRandomDirection();
            }
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
    ghosts.push(new Ghost("ghost2", { x: 180, y: 490 }, { x: 1, y: 1 }, ghosts));
    ghosts.push(new Ghost("ghost3", { x: 405, y: 318 }, { x: 1, y: 1 }, ghosts));
    ghosts.push(new Ghost("ghost4", { x: 180, y: 225 }, { x: 1, y: 1 }, ghosts));
    return ghosts;
}

export const ghosts = createGhosts();
console.log(ghosts);
