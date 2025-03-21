console.log("Le script JavaScript est bien chargé !");

        let pacman = document.getElementById("pacman");
        let step = 5;
        let direction = null;
        let interval = null;

        function movePacman() {
            if (!direction) return;

            let left = parseInt(pacman.style.left) || 100;
            let top = parseInt(pacman.style.top) || 100;

            if (direction === "ArrowRight") {
                pacman.style.left = left + step + "px";
            } else if (direction === "ArrowLeft") {
                pacman.style.left = left - step + "px";
            } else if (direction === "ArrowUp") {
                pacman.style.top = top - step + "px";
            } else if (direction === "ArrowDown") {
                pacman.style.top = top + step + "px";
            } else {
                clearInterval(interval); 
                interval = null;
            }
        }

        document.addEventListener("keydown", function(event) {
            if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(event.key)) {
                direction = event.key;

                if (!interval) {
                    interval = setInterval(movePacman, 30); 
                }
            }
        });