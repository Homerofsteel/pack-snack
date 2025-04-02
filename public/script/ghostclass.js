import { boundaries } from "./map.js";
import { pellets } from "./map.js";

export class Ghost {
    constructor(elementId, position, speed) {
        this.ghost = document.getElementById(elementId);
        if (!this.ghost) {
            console.error(`L'élément avec l'id '${elementId}' n'existe pas.`);
            return;
        }
        this.position = position;
        this.speed = speed;
        this.direction = null;

        this.ghost.style.position = "absolute";
        this.ghost.style.left = this.position.x + "px";
        this.ghost.style.top = this.position.y + "px";

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

    checkCollision(nextX, nextY) {
        for (const boundary of boundaries) {
            if (boundary.id !== "no collision") {
                const ghostLeft = nextX, ghostRight = nextX + this.ghost.offsetWidth, 
                      ghostTop = nextY, ghostBottom = nextY + this.ghost.offsetHeight;
                const boundaryLeft = boundary.position.x, boundaryRight = boundary.position.x + (boundary.image ? boundary.image.width : boundary.width), 
                      boundaryTop = boundary.position.y, boundaryBottom = boundary.position.y + (boundary.image ? boundary.image.height : boundary.height);

                if (ghostLeft < boundaryRight && ghostRight > boundaryLeft && ghostTop < boundaryBottom && ghostBottom > boundaryTop) {
                    return true;
                }
            }
        }
        return false; 
    }

    move = () => {
        let nextX = this.position.x + this.direction.x;
        let nextY = this.position.y + this.direction.y;

        if (this.checkCollision(nextX, nextY)) {
            this.setRandomDirection();
        } else {
            this.position.x = nextX;
            this.position.y = nextY;
            this.ghost.style.left = this.position.x + "px";
            this.ghost.style.top = this.position.y + "px";
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
