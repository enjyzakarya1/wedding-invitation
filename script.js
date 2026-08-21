document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const bgOverlay = document.getElementById('bg-overlay');
  const detailsSection = document.getElementById('details-section');
  const musicBtn = document.getElementById('music-btn');
  const musicIcon = document.getElementById('music-icon');

  let audioCtx = null;
  let isPlaying = false;
  let chimeInterval = null;

  // Web Audio API Synthesizer (Generates soft, ambient chime melody)
  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playSoftChime() {
    if (!audioCtx) return;

    // Pentatonic scale notes for a gentle sound (Hz)
    const notes = [523.25, 659.25, 783.99, 1046.50, 1174.66];
    const freq = notes[Math.floor(Math.random() * notes.length)];

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    // Soft fade-in and fade-out envelope
    gain.gain.setValueAtTime(0, audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.5);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 2.5);
  }

  function startMusic() {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (!isPlaying) {
      isPlaying = true;
      if (musicIcon) musicIcon.textContent = 'SOUND OFF';
      playSoftChime();
      chimeInterval = setInterval(playSoftChime, 1800); // Plays a soft note every 1.8 seconds
    }
  }

  function stopMusic() {
    if (isPlaying) {
      isPlaying = false;
      if (musicIcon) musicIcon.textContent = 'SOUND ON';
      clearInterval(chimeInterval);
    }
  }

  // Toggle button click
  if (musicBtn) {
    musicBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (isPlaying) {
        stopMusic();
      } else {
        startMusic();
      }
    });
  }

  // Envelope click trigger
  if (envelope) {
    envelope.addEventListener('click', () => {
      envelope.classList.toggle('open');
      const isOpen = envelope.classList.contains('open');

      if (bgOverlay) {
        bgOverlay.classList.toggle('active', isOpen);
      }

      if (detailsSection) {
        detailsSection.classList.toggle('active', isOpen);
      }

      if (isOpen) {
        startMusic();
      } else {
        stopMusic();
      }
    });
  }
});
