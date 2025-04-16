document.addEventListener("DOMContentLoaded", function() {
    var music = new Audio('../Audio/main.mp3');

    document.getElementById('musicToggle').addEventListener('change', function() {
        if (this.checked) {
            music.play(); 
        } else {
            music.pause(); 
        }
    });

    function toggleOptions() {
        var optionsDiv = document.getElementById('optionsDiv');
        var buttonLinks = document.getElementById('buttonLinks');

        if (optionsDiv.style.display === 'none' || optionsDiv.style.display === '') {
            optionsDiv.style.display = 'block';
            buttonLinks.classList.add('hidden');
        } else {
            optionsDiv.style.display = 'none';
            buttonLinks.classList.remove('hidden');
        }
    }

    document.querySelector('.button-link a[href="javascript:void(0);"]').onclick = toggleOptions;
    document.querySelector('#optionsDiv button').onclick = toggleOptions;
});
