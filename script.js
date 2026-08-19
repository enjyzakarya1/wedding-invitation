document.addEventListener('DOMContentLoaded', () => {
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const invitationContent = document.getElementById('invitationContent');
  const tapHint = document.getElementById('tapHint');
  const bgMusic = document.getElementById('bgMusic');

  if (envelopeWrapper) {
    envelopeWrapper.addEventListener('click', () => {
      // 1. Open the envelope animation
      envelopeWrapper.classList.add('open');

      // 2. Hide the tap hint
      if (tapHint) {
        tapHint.style.display = 'none';
      }

      // 3. RE-INTEGRATE MUSIC: Play background music
      if (bgMusic) {
        // Many browsers block autoplay unless user interacts. 
        // A click on the envelope is the necessary interaction.
        bgMusic.play().catch(error => {
          console.log("Music play prevented, click elsewhere:", error);
        });
      }

      // 4. Show and unroll the invitation content
      if (invitationContent) {
        invitationContent.classList.add('show');
        setTimeout(() => {
          invitationContent.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    });
  }
});
