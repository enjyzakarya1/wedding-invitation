document.addEventListener("DOMContentLoaded", () => {
  const envelopeWrapper = document.getElementById("envelope-wrapper");
  const bgMusic = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-btn");
  const musicIcon = document.getElementById("music-icon");
  
  let isPlaying = false;

  // Force-preload audio element
  if (bgMusic) {
    bgMusic.load();
  }

  function toggleAudio() {
    if (!bgMusic) return;

    if (bgMusic.paused) {
      bgMusic.play().then(() => {
        isPlaying = true;
        if (musicIcon) musicIcon.textContent = "🎵";
      }).catch(err => {
        console.warn("Playback prevented or audio file missing:", err);
      });
    } else {
      bgMusic.pause();
      isPlaying = false;
      if (musicIcon) musicIcon.textContent = "🔇";
    }
  }

  // Tap envelope to toggle open animation & start music
  if (envelopeWrapper) {
    envelopeWrapper.addEventListener("click", () => {
      envelopeWrapper.classList.toggle("open");

      // Auto-start music on initial open tap
      if (bgMusic && bgMusic.paused) {
        toggleAudio();
      }
    });
  }

  // Floating button toggle
  if (musicBtn) {
    musicBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Avoid triggering envelope click
      toggleAudio();
    });
  }
});
