document.getElementById('toggle-sidebar').addEventListener('click', function () {
    const sidebar = document.getElementById('orange-sidebar');
    const background = document.querySelector('.background');
    sidebar.classList.toggle('hidden');
    background.classList.toggle('expanded');
  });
  

document.addEventListener('DOMContentLoaded', function() {
    const playButtons = document.querySelectorAll('.play-button');

    playButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            // Get album details
            const card = button.closest('.playlist-card');
            const albumImage = card.querySelector('.playlist-image').src;
            const albumTitle = card.querySelector('.playlist-title').textContent;
            const albumSubtitle = card.querySelector('.playlist-subtitle').textContent;

            // Store album details in localStorage
            localStorage.setItem('albumImage', albumImage);
            localStorage.setItem('albumTitle', albumTitle);
            localStorage.setItem('albumSubtitle', albumSubtitle);

            // Navigate to play.html
            window.location.href = button.parentElement.href;
        });
    });
});
