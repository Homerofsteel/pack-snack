        const pacman = document.getElementById("pacman");
        const step = 5;
        let direction = null;
        let interval = null;

        function movePacman() {
            if (!direction) return;

            const left = parseInt(pacman.style.left) || 100;
            const top = parseInt(pacman.style.top) || 100;

            if (direction === "ArrowRight" && left + step < globalThis.innerWidth - pacman.offsetWidth) {
                pacman.style.left = left + step + "px";
            } else if (direction === "ArrowLeft" && left - step > 0) {
                pacman.style.left = left - step + "px";
            } else if (direction === "ArrowUp" && top - step > 0) {
                pacman.style.top = top - step + "px";
            } else if (direction === "ArrowDown" && top + step < globalThis.innerHeight - pacman.offsetHeight) {
                pacman.style.top = top + step + "px";
            } else {
                clearInterval(interval);
                interval = null;
            }
        }

        document.addEventListener("keydown", function(event) {
            console.log(parseInt(pacman.style.left))
            if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(event.key)) {
                direction = event.key;
                if (!interval) {
                    interval = setInterval(movePacman, 30); 

                }
            }
        });