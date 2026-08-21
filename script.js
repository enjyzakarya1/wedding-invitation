const envelope = document.getElementById('envelope');

if (envelope) {
  envelope.addEventListener('click', function() {
    envelope.classList.toggle('open');
  });
}
