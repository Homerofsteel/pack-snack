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
// Exemple d'utilisation
    if (collision(Pacman, ghost1, ghost2)) {
        console.log("Collision detectée");
        
    }
    