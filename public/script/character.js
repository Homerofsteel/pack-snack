export class Character {
    constructor(elementId, position, speed) {
        this.element = document.getElementById(elementId);
        if (!this.element) {
            console.error(`L'élément avec l'id '${elementId}' n'existe pas.`);
            return;
        }
        
        this.position = position;
        this.speed = speed;
        this.direction = null;

        this.element.style.position = "absolute";
        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;
    }

    updatePosition(x, y) {
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
    }
}

class Character {
    constructor(elementId, position, speed) {
        
    }
}