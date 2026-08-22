document.addEventListener("DOMContentLoaded", () => {
  const envelopeWrapper = document.getElementById("envelope-wrapper");
  const bgMusic = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-btn");
  let isPlaying = false;

  // Toggle Enhanced Envelope Motion & Play Music
  envelopeWrapper.addEventListener("click", () => {
    envelopeWrapper.classList.toggle("open");

    // Play music on tap if not already playing
    if (!isPlaying) {
      bgMusic.play().then(() => {
        isPlaying = true;
      }).catch(err => console.log("Autoplay blocked by browser policy:", err));
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
