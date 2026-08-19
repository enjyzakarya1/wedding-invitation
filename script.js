document.addEventListener("DOMContentLoaded", function () {
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const waxSeal = document.getElementById("waxSeal");
  const detailsWrapper = document.getElementById("detailsWrapper");
  const bgMusic = document.getElementById("bgMusic");

  if (envelopeWrapper) {
    envelopeWrapper.addEventListener("click", function (e) {
      // Toggle pop-out letter animation
      envelopeWrapper.classList.add("open");

      // Play background music if file exists
      if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(() => {});
      }

      // Smooth scroll down to details after animation finishes
      setTimeout(() => {
        detailsWrapper.scrollIntoView({ behavior: "smooth" });
      }, 700);
    });
  }
});
