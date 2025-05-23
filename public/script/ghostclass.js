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

    //réinitialise la position des fantomes
    resetPosition(x, y) {
        this.position = { x, y };
        this.updatePosition(x, y); 
    }

    //démarre les méthodes de mouvement des fantomes
    startMoving() {
        this.setRandomDirection();
        this.move();
    }

    //inverse la direction
    reverseDirection() {
        this.direction.x = -this.direction.x;
        this.direction.y = -this.direction.y;
    }

    //récupére les directions légales
    getAvailableDirections() {
        return [
            { x: this.speed.x, y: 0 },
            { x: -this.speed.x, y: 0 },
            { x: 0, y: this.speed.y },
            { x: 0, y: -this.speed.y }
        ];
    }

    //gére le cas du fantome se trouvant à une intersection
    isAtIntersection(position) {
        const validDirections = this.getAvailableDirections().filter(dir => {
            const nextX = position.x + dir.x;
            const nextY = position.y + dir.y;
            return !checkCollisionBoundaries(nextX, nextY, this.ghost, boundaries);
        });
        return validDirections.length > 2;
    }

    //donne une direction aléatoire au fantome
    setRandomDirection() {
        const directions = this.getAvailableDirections();
        const filtered = this.lastDirection
            ? directions.filter(dir => !(dir.x === -this.lastDirection.x && dir.y === -this.lastDirection.y))
            : directions;

        this.direction = filtered[Math.floor(Math.random() * filtered.length)];
        this.lastDirection = this.direction;
    }

    //modifie les images pour simuler le godmod de pacman
    SwitchImages() {
        switch (this.id) {
            case "ghost1":
                this.ghost.src = "../Images/deadboo.png";
                break;
            case "ghost2":
                this.ghost.src = "../Images/deadpeepa.png";
                break;
            case "ghost3":
                this.ghost.src = "../Images/deadghost.png";
                break;
            case "ghost4":
                this.ghost.src = "../Images/deadduskull.png";
                break;
            default:
                console.warn("ID inconnu pour le fantôme :", this.id);
                break;
        }
    }

    //réinitialise les images après la fin de l'effet godmod
    restoreImage() {
        switch (this.id) {
            case "ghost1":
                this.ghost.src = "../Images/boo.png";
                break;
            case "ghost2":
                this.ghost.src = "../Images/peepa.png";
                break;
            case "ghost3":
                this.ghost.src = "../Images/ghost.png";
                break;
            case "ghost4":
                this.ghost.src = "../Images/duskull.png";
                break;
        }
    }
    
    
    //méthode pour se déplacer avec gestion des collisions
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

//Initialisation de fantomes
export function createGhosts() {
    const ghosts = [];
    ghosts.push(new Ghost("ghost1", { x: 720, y: 230 }, { x: 1, y: 1 }, ghosts));
    ghosts.push(new Ghost("ghost2", { x: 225, y: 360 }, { x: 1, y: 1 }, ghosts));
    ghosts.push(new Ghost("ghost3", { x: 720, y: 360 }, { x: 1, y: 1 }, ghosts));
    ghosts.push(new Ghost("ghost4", { x: 225, y: 225 }, { x: 1, y: 1 }, ghosts));
    return ghosts;
}

export const ghosts = createGhosts();
console.log(ghosts);
