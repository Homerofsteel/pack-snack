import { pellets } from "./map.js";
import { boundaries } from "./map.js";
import { ghosts } from "./ghostclass.js";

// Vérification des collisions avec les boundaries
export function checkCollisionBoundaries(nextX, nextY, pacman, boundaries) {
    for (const boundary of boundaries) {
        if (boundary.id !== "no collision") {
            const pacmanLeft = nextX, pacmanRight = nextX + pacman.offsetWidth, pacmanTop = nextY, pacmanBottom = nextY + pacman.offsetHeight;
            const boundaryLeft = boundary.position.x, boundaryRight = boundary.position.x + (boundary.image ? boundary.image.width : boundary.width), boundaryTop = boundary.position.y, boundaryBottom = boundary.position.y + (boundary.image ? boundary.image.height : boundary.height);
    
            if (pacmanLeft < boundaryRight && pacmanRight > boundaryLeft && pacmanTop < boundaryBottom && pacmanBottom > boundaryTop) {
                return true;
            }
        }
    }
    return false;
}

// Vérification des collisions avec les pellets
export function checkCollisionPellets(nextX, nextY, pacman, pellets) {
    for (let i = 0; i < pellets.length; i++) {
        const pellet = pellets[i];
        const pelletLeft = pellet.position.x;
        const pelletRight = pellet.position.x + (pellet.image ? pellet.image.width : pellet.width);
        const pelletTop = pellet.position.y;
        const pelletBottom = pellet.position.y + (pellet.image ? pellet.image.height : pellet.height);

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

// Vérification des collisions avec les fantômes
export function checkGhostCollision(nextX, nextY, pacman, ghosts) {
    for (const ghost of ghosts) {
        if (!ghost || !ghost.ghost) continue;

        const ghostLeft = ghost.position.x;
        const ghostRight = ghost.position.x + ghost.ghost.offsetWidth;
        const ghostTop = ghost.position.y;
        const ghostBottom = ghost.position.y + ghost.ghost.offsetHeight;

        if (
            nextX + pacman.offsetWidth > ghostLeft &&
            nextX < ghostRight &&
            nextY + pacman.offsetHeight > ghostTop &&
            nextY < ghostBottom
        ) {
            console.log("Collision detected!");
            return true;
        }
    }
    return false;
}
