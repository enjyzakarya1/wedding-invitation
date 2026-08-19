document.addEventListener("DOMContentLoaded", function () {
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const waxSeal = document.getElementById("waxSeal");
  const bgMusic = document.getElementById("bgMusic");

  if (envelopeWrapper) {
    envelopeWrapper.addEventListener("click", function () {
      envelopeWrapper.classList.toggle("open");
      
      // Play music on tap if present
      if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(() => {});
      }
    });
  }
});
