const envelope = document.getElementById('envelope');
const bgMusic = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-toggle');
let isPlaying = false;

// Toggle Music Manually
function toggleMusic() {
  if (isPlaying) {
    bgMusic.pause();
    musicBtn.textContent = '🎵 Play Music';
  } else {
    bgMusic.play();
    musicBtn.textContent = '⏸ Pause Music';
  }
  isPlaying = !isPlaying;
}

musicBtn.addEventListener('click', toggleMusic);

// Open Envelope & Trigger Music Automatically on First Click
envelope.addEventListener('click', () => {
  envelope.classList.toggle('open');

  if (!isPlaying) {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicBtn.textContent = '⏸ Pause Music';
    }).catch(err => {
      console.log("Autoplay restricted by browser:", err);
    });
  }
});
