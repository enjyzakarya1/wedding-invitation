document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const bgOverlay = document.getElementById('bg-overlay');
  const detailsSection = document.getElementById('details-section');
  const music = document.getElementById('wedding-music');
  const musicBtn = document.getElementById('music-btn');
  const musicIcon = document.getElementById('music-icon');

  let audioUnlocked = false;

  function playAudio() {
    if (music) {
      music.play().then(() => {
        if (musicIcon) musicIcon.textContent = 'SOUND OFF';
      }).catch(err => {
        console.log('Audio playback prevented:', err);
      });
    }
  }

  function pauseAudio() {
    if (music) {
      music.pause();
      if (musicIcon) musicIcon.textContent = 'SOUND ON';
    }
  }

  // Toggle button logic
  if (musicBtn) {
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (music.paused) {
        playAudio();
      } else {
        pauseAudio();
      }
    });
  }

  // Envelope tap logic
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

      // Force play on first tap
      if (isOpen) {
        if (!audioUnlocked && music) {
          music.load(); // Preload sound buffer
          audioUnlocked = true;
        }
        playAudio();
      }
    });
  }
});
