document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const bgOverlay = document.getElementById('bg-overlay');

  if (envelope) {
    envelope.addEventListener('click', () => {
      // Toggle envelope opening animation
      envelope.classList.toggle('open');
      
      // Reveal painted background overlay step when envelope opens
      if (bgOverlay) {
        bgOverlay.classList.toggle('active');
      }
    });
  }
});
