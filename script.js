document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const bgOverlay = document.getElementById('bg-overlay');
  const detailsSection = document.getElementById('details-section');
  const music = document.getElementById('wedding-music');
  const musicBtn = document.getElementById('music-btn');
  const musicIcon = document.getElementById('music-icon');
  
  let isPlaying = false;

  // Toggle Music Function
  function toggleMusic() {
    if (isPlaying) {
      music.pause();
      musicIcon.textContent = '🔇';
    } else {
      music.play().then(() => {
        musicIcon.textContent = '🎵';
      }).catch(err => {
        console.log('Audio playback prevented:', err);
      });
    }
    isPlaying = !isPlaying;
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMusic();
    });
  }

  // Envelope Tap Interaction
  if (envelope) {
    envelope.addEventListener('click', () => {
      envelope.classList.toggle('open');
      
      const isOpen = envelope.classList.contains('open');

      if (bgOverlay) {
        bgOverlay.classList.toggle('active', isOpen);
      }

      if (detailsSection) {
        detailsSection.classList.toggle('active', isOpen);
      }

      // Automatically start background music on first tap if paused
      if (isOpen && !isPlaying && music) {
        toggleMusic();
      }
    });
  }
});
