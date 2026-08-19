document.addEventListener('DOMContentLoaded', () => {
  const envelopeWrapper = document.getElementById('envelopeWrapper');
  const waxSeal = document.getElementById('waxSeal');
  const invitationContent = document.getElementById('invitationContent');
  const tapHint = document.getElementById('tapHint');
  const bgMusic = document.getElementById('bg-music');

  let isOpen = false;

  const openEnvelope = () => {
    if (isOpen) return;
    isOpen = true;

    envelopeWrapper.classList.add('open');
    if (tapHint) tapHint.style.opacity = '0';

    if (bgMusic) {
      bgMusic.play().catch(() => {});
    }

    setTimeout(() => {
      invitationContent.classList.add('show');
      invitationContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 800);
  };

  if (waxSeal) waxSeal.addEventListener('click', openEnvelope);
  if (envelopeWrapper) envelopeWrapper.addEventListener('click', openEnvelope);
});
