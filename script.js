document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');

  if (envelope) {
    envelope.addEventListener('click', () => {
      envelope.classList.toggle('open');
    });
  }
});
