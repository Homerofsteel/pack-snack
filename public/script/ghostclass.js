import {boundaries} from "./map.js";
import {pellets} from "./map.js";

export class Ghost {
    constructor(elementId, position, speed) {
        this.ghost = document.getElementById(elementId);
        this.position = position ;
        this.speed = speed ;
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
        
        // Vérification des collisions avec les boundaries
        for (const boundary of boundaries) {
            if (boundary.id !== "no collision") {
                const ghostLeft = nextX, ghostRight = nextX + this.ghost.offsetWidth, ghostTop = nextY, ghostBottom = nextY + this.ghost.offsetHeight;
                const boundaryLeft = boundary.position.x, boundaryRight = boundary.position.x + (boundary.image ? boundary.image.width : boundary.width), boundaryTop = boundary.position.y, boundaryBottom = boundary.position.y + (boundary.image ? boundary.image.height : boundary.height);
    
                if (ghostLeft < boundaryRight && ghostRight > boundaryLeft && ghostTop < boundaryBottom && ghostBottom > boundaryTop) {
                    return true; 
                }
            }
        }
    
        // Vérification des collisions avec les pellets
        for (const pellet of pellets) {
            const pelletLeft = pellet.position.x, pelletRight = pellet.position.x + (pellet.image ? pellet.image.width : pellet.width), pelletTop = pellet.position.y, pelletBottom = pellet.position.y + (pellet.image ? pellet.image.height : pellet.height);
            if (nextX < pelletRight && nextX + this.ghost.offsetWidth > pelletLeft && nextY < pelletBottom && nextY + this.ghost.offsetHeight > pelletTop) {
                return false; 
            }
        }
    
        return false; // Pas de collision
    }  

    move = () => {

        let nextX = this.position.x + this.direction.x;
        let nextY = this.position.y + this.direction.y;



        if (this.checkCollision(nextLeft, nextTop) || (ghostcollision(ghostlist))) {
            this.setRandomDirection();
        } else {
            this.position.x = nextX;
            this.position.y = nextY;
            this.ghost.style.left = this.position.x + "px";
            this.ghost.style.top = this.position.y + "px";
        }

        requestAnimationFrame(this.move);
    }

    createghosts() {
        const ghostlist=[
            new Ghost("ghost1", { x: 500, y: 300 }, { x: 2, y: 2 }),
            new Ghost("ghost2", { x: 200, y: 600 }, { x: 2, y: 2 }),
            new Ghost("ghost3", { x: 500, y: 300 }, { x: 2, y: 2 }),
            new Ghost("ghost4", { x: 700, y: 200 }, { x: 2, y: 2 })
        ]

        return ghostlist;
    }
    
}

