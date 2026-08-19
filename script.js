document.addEventListener('DOMContentLoaded', () => {
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const invitationContent = document.getElementById('invitationContent');
  const tapHint = document.getElementById('tapHint');
  const bgMusic = document.getElementById('bgMusic');

  if (envelopeWrapper) {
    envelopeWrapper.addEventListener('click', () => {
      // 1. Trigger envelope opening animation
      envelopeWrapper.classList.add('open');

      // 2. Hide hint text
      if (tapHint) {
        tapHint.style.opacity = '0';
      }

      // 3. Play background music upon interaction
      if (bgMusic) {
        bgMusic.play().catch(err => {
          console.log("Music play blocked by browser settings:", err);
        });
      }

      // 4. Reveal invitation details card beneath
      if (invitationContent) {
        setTimeout(() => {
          invitationContent.classList.add('show');
          invitationContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 400);
      }
    });
  }
});
