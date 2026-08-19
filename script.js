document.addEventListener("DOMContentLoaded", function () {
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const waxSeal = document.getElementById("waxSeal");
  const detailsWrapper = document.getElementById("detailsWrapper");
  const bgMusic = document.getElementById("bgMusic");

  if (waxSeal && envelopeWrapper) {
    waxSeal.addEventListener("click", function (e) {
      e.stopPropagation(); // Prevents multiple triggers
      
      // 1. Toggle pop-out letter animation
      envelopeWrapper.classList.add("open");

      // 2. Play background music if included
      if (bgMusic && bgMusic.paused) {
        bgMusic.play().catch(() => {});
      }

      // 3. Smooth scroll down to the invitation details after animation
      setTimeout(() => {
        detailsWrapper.scrollIntoView({ behavior: "smooth" });
      }, 700);
    });
  }
});
