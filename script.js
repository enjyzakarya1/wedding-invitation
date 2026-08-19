document.addEventListener('DOMContentLoaded', () => {
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const invitationContent = document.getElementById('invitationContent');
  const tapHint = document.getElementById('tapHint');

  if (envelopeWrapper) {
    envelopeWrapper.addEventListener('click', () => {
      // Open the envelope animation
      envelopeWrapper.classList.add('open');

      // Hide the tap hint
      if (tapHint) {
        tapHint.style.display = 'none';
      }

      // Show and unroll the invitation content
      if (invitationContent) {
        invitationContent.classList.add('show');
        setTimeout(() => {
          invitationContent.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      }
    });
  }
});
