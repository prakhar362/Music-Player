document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('orange-sidebar');
    const contentArea = document.querySelector('.background');

    toggleButton.addEventListener('click', function() {
        sidebar.classList.toggle('hidden');
        contentArea.classList.toggle('expanded');
        adjustContentWidth(); // Call a function to adjust content area width
    });

    // Function to adjust content area width based on sidebar visibility
    function adjustContentWidth() {
        if (sidebar.classList.contains('hidden')) {
            // Sidebar is hidden, expand content area
            contentArea.style.marginLeft = '0';
            contentArea.style.width = '100%';
        } else {
            // Sidebar is visible, leave space for sidebar
            contentArea.style.marginLeft = '5.5rem';
            contentArea.style.width = 'calc(100% - 5.5rem)';
        }
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Retrieve album details from localStorage
    const albumImage = localStorage.getItem('albumImage');
    const albumTitle = localStorage.getItem('albumTitle');
    const albumSubtitle = localStorage.getItem('albumSubtitle');

    // Update album section
    const albumImageElem = document.querySelector('.album img');
    const albumTitleElem = document.querySelector('.album h2');
    const albumSubtitleElem = document.querySelector('.album h4');

    albumImageElem.src = albumImage;
    albumTitleElem.textContent = albumTitle;
    albumSubtitleElem.textContent = albumSubtitle;

    let songs = [];

    if (albumTitle === "HINDI") {
        songs = [
            { title: "Age", artist: "Artist 1", path: "../songs/HINDI/age.mp3" },
            { title: "Groove", artist: "Artist 2", path: "../songs/HINDI/groove.mp3" },
            { title: "Instrumental", artist: "Artist 3", path: "../songs/HINDI/instrumental.mp3" }
        ];
    } else if (albumTitle === "NCS") {
        songs = [
            { title: "Cartoon", artist: "Artist 4", path: "../songs/NCS/Cartoon.mp3" },
            { title: "Mortals", artist: "Artist 5", path: "../songs/NCS/Mortals.mp3" },
            { title: "Royalty", artist: "Artist 6", path: "../songs/NCS/Royalty.mp3" }
        ];
    } else if (albumTitle === "Party") {
        songs = [
            { title: "Neki", artist: "Artist 7", path: "../songs/Party/neki.mp3" },
            { title: "Saanjh", artist: "Artist 8", path: "../songs/Party/saanjh.mp3" },
            { title: "Tere Sang", artist: "Artist 9", path: "../songs/Party/teresang.mp3" }
        ];
    } else if (albumTitle === "POP") {
        songs = [
            { title: "Song 1", artist: "Artist 10", path: "../songs/POP/song1.mp3" },
            { title: "Song 2", artist: "Artist 11", path: "../songs/POP/song2.mp3" },
            { title: "Song 3", artist: "Artist 12", path: "../songs/POP/song3.mp3" }
        ];
    } else if (albumTitle === "PUNJABI") {
        songs = [
            { title: "Song 1", artist: "Artist 13", path: "../songs/PUNJABI/kalinka.mp3" },
            { title: "Song 2", artist: "Artist 14", path: "../songs/PUNJABI/life.mp3" },
            { title: "Song 3", artist: "Artist 15", path: "../songs/PUNJABI/party.mp3" }
        ];
    }

    // Initialize Doubly Linked List for songs
    class Node {
        constructor(song) {
            this.song = song;
            this.next = null;
            this.prev = null;
        }
    }

    class DoublyLinkedList {
        constructor() {
            this.head = null;
            this.tail = null;
            this.current = null;
        }

        append(song) {
            const newNode = new Node(song);
            if (!this.head) {
                this.head = newNode;
                this.tail = newNode;
                this.current = newNode;
            } else {
                this.tail.next = newNode;
                newNode.prev = this.tail;
                this.tail = newNode;
            }
        }

        playNext() {
            if (this.current && this.current.next) {
                this.current = this.current.next;
                return this.current.song;
            }
            return null;
        }

        playPrevious() {
            if (this.current && this.current.prev) {
                this.current = this.current.prev;
                return this.current.song;
            }
            return null;
        }

        getCurrentSong() {
            return this.current ? this.current.song : null;
        }
    }

    const songList = new DoublyLinkedList();
    songs.forEach(song => songList.append(song));

    const audioElement = new Audio();
    const songNameElem = document.querySelector('.text h2');
    const artistNameElem = document.querySelector('.text p');
    const progressBar = document.querySelector('.progress-bar');

    let isPlaying = false;

    // Function to update player UI
    function updatePlayerUI(song) {
        songNameElem.textContent = song.title;
        artistNameElem.textContent = song.artist; // Replace with actual artist data if available
        audioElement.src = song.path;
        audioElement.play();
        isPlaying = true;

        // Update progress bar
        audioElement.addEventListener('timeupdate', function() {
            const progress = (audioElement.currentTime / audioElement.duration) * 100;
            progressBar.value = progress;
        });
    }

    // Initial load
    const initialSong = songList.getCurrentSong();
    if (initialSong) {
        updatePlayerUI(initialSong);
    }

    document.querySelector('.next').addEventListener('click', () => {
        const nextSong = songList.playNext();
        if (nextSong) {
            updatePlayerUI(nextSong);
        }
    });

    document.querySelector('.prev').addEventListener('click', () => {
        const prevSong = songList.playPrevious();
        if (prevSong) {
            updatePlayerUI(prevSong);
        }
    });

    document.querySelector('.pause').addEventListener('click', () => {
        if (isPlaying) {
            audioElement.pause();
            isPlaying = false;
        } else {
            audioElement.play();
            isPlaying = true;
        }
    });

    // Update the "Up Next" section
    const upNextElem = document.querySelector('.up-next');
    const upNextSongs = songs.slice(1);
    upNextElem.innerHTML = '<h1>UP-NEXT</h1>';
    upNextSongs.forEach((song, index) => {
        const songElem = document.createElement('h3');
        songElem.id = index + 1;
        songElem.textContent = song.title;
        upNextElem.appendChild(songElem);
    });
});
