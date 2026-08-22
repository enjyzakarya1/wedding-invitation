document.addEventListener("DOMContentLoaded", () => {
  const envelopeWrapper = document.getElementById("envelope-wrapper");
  const bgMusic = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-btn");
  let isPlaying = false;

  // Enhanced Envelope Open Motion & Auto-play Audio
  envelopeWrapper.addEventListener("click", () => {
    envelopeWrapper.classList.toggle("open");

    if (!isPlaying) {
      bgMusic.play().then(() => {
        isPlaying = true;
      }).catch(err => console.log("Autoplay prevented:", err));
    }
  });

  // Music Button Manual Toggle
  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Avoid re-triggering envelope click
    if (isPlaying) {
      bgMusic.pause();
      isPlaying = false;
    } else {
      bgMusic.play();
      isPlaying = true;
    }
  });
});
