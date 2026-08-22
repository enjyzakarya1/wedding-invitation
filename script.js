document.addEventListener("DOMContentLoaded", () => {
  const envelopeWrapper = document.getElementById("envelope-wrapper");
  const bgMusic = document.getElementById("bg-music");
  const musicBtn = document.getElementById("music-btn");
  const musicIcon = document.getElementById("music-icon");
  
  let isPlaying = false;

  // Helper to play music smoothly
  function playAudio() {
    bgMusic.play().then(() => {
      isPlaying = true;
      musicIcon.textContent = "🎵";
    }).catch(err => {
      console.log("Browser blocked initial audio start:", err);
    });
  }

  // Helper to pause music
  function pauseAudio() {
    bgMusic.pause();
    isPlaying = false;
    musicIcon.textContent = "🔇";
  }

  // Envelope Tap: Toggle open class & trigger music
  envelopeWrapper.addEventListener("click", () => {
    envelopeWrapper.classList.toggle("open");

    if (!isPlaying) {
      playAudio();
    }
  });

  // Music Button: Explicit Toggle
  musicBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Avoid triggering envelope click
    if (isPlaying) {
      pauseAudio();
    } else {
      playAudio();
    }
  });
});
