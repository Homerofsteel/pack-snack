import { ghosts } from "./ghostclass.js";
import { player } from "./playerclass.js"
import {score} from "./score.js";

let pelletremaining=130;

// Vérifie les collisions avec les murs
export function checkCollisionBoundaries(nextX, nextY, pacman, boundaries) {
    for (const boundary of boundaries) {
        const pacmanLeft = nextX;
        const pacmanRight = pacmanLeft + pacman.offsetWidth;
        const pacmanTop = nextY;
        const pacmanBottom = pacmanTop + pacman.offsetHeight;

        const boundaryLeft = boundary.position.x;
        const boundaryRight = boundaryLeft + boundary.width;
        const boundaryTop = boundary.position.y;
        const boundaryBottom = boundaryTop + boundary.height;

        if (
            pacmanLeft < boundaryRight &&
            pacmanRight > boundaryLeft &&
            pacmanTop < boundaryBottom &&
            pacmanBottom > boundaryTop
        ) {
            return true;
        }
    }
    return false;
}

// Vérifie les collisions avec les pastilles
export function checkCollisionPellets(nextX, nextY, pacman, pellets) {
    for (let i = pellets.length - 1; i >= 0; i--) {
        const pellet = pellets[i];
        const pelletLeft = pellet.position.x;
        const pelletRight = pelletLeft + pellet.width;
        const pelletTop = pellet.position.y;
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
            if (pellet.id === "no collision") {
                score.add(10);
                pellets.splice(i, 1);
                pelletremaining--;
                console.log(pelletremaining)
                if (pelletremaining==0) {
                    window.location.href = "../html/victory.html"; 
                }
                
                


            } else if (pellet.id === "gun") {
                pellets.splice(i, 1);
                player.setGodMod();
                ghosts.forEach(ghost => {
                    ghost.SwitchImages(); 
                });
                if (player.godmodTimer) {
                    clearTimeout(player.godmodTimer);
                }
                pacman.godmodTimer = setTimeout(() => {
                    player.resetGodMod();
                    ghosts.forEach(ghost => {
                        ghost.restoreImage();
                    });
                }, 10000);
            }
        }
    }
    return false;
}


// Renvoie le fantôme en collision avec Pacman, ou null s’il n’y en a pas
export function checkGhostCollision(nextX, nextY, character, ghosts) {
    for (const ghost of ghosts) {
        if (!ghost || !ghost.ghost || ghost.id === character.id) continue;

        const ghostLeft = ghost.position.x;
        const ghostRight = ghostLeft + ghost.ghost.offsetWidth;
        const ghostTop = ghost.position.y;
        const ghostBottom = ghostTop + ghost.ghost.offsetHeight;

        if (
            nextX + character.offsetWidth > ghostLeft &&
            nextX < ghostRight &&
            nextY + character.offsetHeight > ghostTop &&
            nextY < ghostBottom
        ) {
            console.log(`Collision avec le fantôme : ${ghost.id}`);
            return ghost;
        }
    }
    return null; 
}
