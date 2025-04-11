import { pellets } from "./map.js";
import { boundaries, canvas } from "./map.js";
import { ghosts } from "./ghostclass.js";

function getCanvasOffset() {
    const canvasRect = canvas.getBoundingClientRect();
    return {
        x: canvasRect.left ,
        y: canvasRect.top,
    };
}

export function checkCollisionBoundaries(nextX, nextY, pacman, boundaries) {
    const canvasOffset = getCanvasOffset();  // Récupérer l'offset du canevas

    for (const boundary of boundaries) {
        const pacmanLeft = nextX + canvasOffset.x;  // Ajouter l'offset pour Pacman
        const pacmanRight = pacmanLeft + pacman.offsetWidth;
        const pacmanTop = nextY + canvasOffset.y;   // Ajouter l'offset pour Pacman
        const pacmanBottom = pacmanTop + pacman.offsetHeight;

        const boundaryLeft = boundary.position.x + canvasOffset.x;  // Ajouter l'offset pour les limites
        const boundaryRight = boundaryLeft + boundary.width;
        const boundaryTop = boundary.position.y + canvasOffset.y;   // Ajouter l'offset pour les limites
        const boundaryBottom = boundaryTop + boundary.height;

        if (
            pacmanLeft < boundaryRight &&
            pacmanRight > boundaryLeft &&
            pacmanTop < boundaryBottom &&
            pacmanBottom > boundaryTop
        ) {
            return true; // Collision détectée
        }
    }
    return false; // Pas de collision
}




export function checkCollisionPellets(nextX, nextY, pacman, pellets) {
    const canvasOffset = getCanvasOffset();  // Récupérer l'offset du canevas

    for (let i = pellets.length - 1; i >= 0; i--) { 
        const pellet = pellets[i];
        const pelletLeft = pellet.position.x + canvasOffset.x;  // Ajouter l'offset pour les pellets
        const pelletRight = pelletLeft + pellet.width;
        const pelletTop = pellet.position.y + canvasOffset.y;    // Ajouter l'offset pour les pellets
        const pelletBottom = pelletTop + pellet.height;

        if (
            nextX < pelletRight &&
            nextX + pacman.offsetWidth > pelletLeft &&
            nextY < pelletBottom &&
            nextY + pacman.offsetHeight > pelletTop
        ) {
            if (pellet.image && pellet.image.parentNode) {
                pellet.image.parentNode.removeChild(pellet.image);
            }

            pellets.splice(i, 1); 
            return true; 
        }
    }
    return false; 
}


export function checkGhostCollision(nextX, nextY, character, ghosts) {
    for (const ghost of ghosts) {
        if (!ghost || !ghost.ghost || ghost.id === character.id) continue;

        const ghostLeft = ghost.position.x;
        const ghostRight = ghost.position.x + ghost.ghost.offsetWidth;
        const ghostTop = ghost.position.y;
        const ghostBottom = ghost.position.y + ghost.ghost.offsetHeight;

        if (
            nextX + character.offsetWidth > ghostLeft &&
            nextX < ghostRight &&
            nextY + character.offsetHeight > ghostTop &&
            nextY < ghostBottom
        ) {
            console.log(`Collision avec le fantôme : ${ghost.id}`);
            return true;
        }
    }
    return false;
}


