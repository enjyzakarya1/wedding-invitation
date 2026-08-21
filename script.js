document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const bgOverlay = document.getElementById('bg-overlay');
  const detailsSection = document.getElementById('details-section');
  const music = document.getElementById('wedding-music');
  const musicBtn = document.getElementById('music-btn');
  const musicIcon = document.getElementById('music-icon');
  
  let isPlaying = false;

  function playAudio() {
    if (music) {
      music.play().then(() => {
        isPlaying = true;
        if (musicIcon) musicIcon.textContent = 'SOUND OFF';
      }).catch(err => {
        console.log('Autoplay blocked:', err);
      });
    }
  }

  function pauseAudio() {
    if (music) {
      music.pause();
      isPlaying = false;
      if (musicIcon) musicIcon.textContent = 'SOUND ON';
    }
  }

  if (musicBtn) {
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isPlaying) {
        pauseAudio();
      } else {
        playAudio();
      }
    });
  }

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

      // Unlock and play audio on user interaction
      if (isOpen && !isPlaying) {
        playAudio();
      }
    });
  }
});
