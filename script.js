document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const bgOverlay = document.getElementById('bg-overlay');
  const detailsSection = document.getElementById('details-section');
  const music = document.getElementById('wedding-music');
  const musicBtn = document.getElementById('music-btn');
  const musicIcon = document.getElementById('music-icon');

  let isPlaying = false;

  // Toggle Music Function
  if (musicBtn && music) {
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (music.paused) {
        music.play();
        isPlaying = true;
        if (musicIcon) musicIcon.textContent = 'SOUND OFF';
      } else {
        music.pause();
        isPlaying = false;
        if (musicIcon) musicIcon.textContent = 'SOUND ON';
      }
    });
  }

  // Envelope Open Interaction
  if (envelope) {
    envelope.addEventListener('click', () => {
      envelope.classList.toggle('open');
      const isOpen = envelope.classList.contains('open');

      // Toggle background and details visibility
      if (bgOverlay) {
        bgOverlay.classList.toggle('active', isOpen);
      }

      if (detailsSection) {
        detailsSection.classList.toggle('active', isOpen);
      }

      // Direct user-gesture audio play (Bypasses mobile autoplay block)
      if (isOpen && music && music.paused) {
        music.play().then(() => {
          isPlaying = true;
          if (musicIcon) musicIcon.textContent = 'SOUND OFF';
        }).catch(err => {
          console.log('Audio wait for explicit tap:', err);
        });
      }
    });
  }
});
