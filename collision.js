
//fonction pour la collision entre pacman et les fantomes
function collision(Pacman, ghost1, ghost2) {
    return(
        Pacman.x < ghost1.x + ghost1.width &&
        Pacman.x + Pacman.width > ghost1.x &&
        Pacman.y < ghost1.y + ghost1.height &&
        Pacman.y + Pacman.height > ghost1.y ||

        Pacman.x < ghost2.x + ghost2.width &&
        Pacman.x + Pacman.width > ghost2.x &&
        Pacman.y < ghost2.y + ghost2.height &&
        Pacman.y + Pacman.height > ghost2.y
    );
}

// decection de la colision entre pacman et les pellets, puisqu'ils sont plus petits que pacman on utilise un radius 
function detecterCollisionPellet(pacman, pellet) {
    let dx = pacman.x - pellet.x;
    let dy = pacman.y - pellet.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    return distance < (pacman.radius + pellet.size);
}

//fonction pour vérifier si la collision a bien eu lieu et retirer le pellet
function verifierCollisionsPellets() {
    for (let i = 0; i < pellets.length; i++) {
        if (detecterCollisionPellet(pacman, pellets[i])) {
            pellets.splice(i, 1);
            i--;
        }
    }
}
    if (collision(Pacman, ghost1, ghost2)) {
        console.log("Collision detectée");
        PacmanLife--;        
    }
    