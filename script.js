document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const bgOverlay = document.getElementById('bg-overlay');
  const detailsSection = document.getElementById('details-section');
  const musicBtn = document.getElementById('music-btn');
  const musicIcon = document.getElementById('music-icon');

  let audioCtx = null;
  let isPlaying = false;
  let musicTimeout = null;
  let phraseIndex = 0;

  // Quiet, soothing ambient romance chord progression
  const romanticMelody = [
    [261.63, 329.63, 392.00], // C Major Soft
    [220.00, 261.63, 329.63], // A Minor Soft
    [174.61, 220.00, 261.63], // F Major Soft
    [196.00, 246.94, 293.66]  // G Major Soft
  ];

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playQuietRomance() {
    if (!audioCtx || !isPlaying) return;

    const chord = romanticMelody[phraseIndex % romanticMelody.length];
    phraseIndex++;

    chord.forEach((freq, noteIndex) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sine'; // Soft, pure tone
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + (noteIndex * 0.3));

      const startTime = audioCtx.currentTime + (noteIndex * 0.3);
      
      // Quiet, gentle volume profile
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.035, startTime + 0.4);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 3.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 3.5);
    });

    musicTimeout = setTimeout(playQuietRomance, 3200);
  }

  function startMusic() {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (!isPlaying) {
      isPlaying = true;
      if (musicIcon) musicIcon.textContent = 'SOUND OFF';
      playQuietRomance();
    }
  }

  function stopMusic() {
    if (isPlaying) {
      isPlaying = false;
      if (musicIcon) musicIcon.textContent = 'SOUND ON';
      clearTimeout(musicTimeout);
    }
  }

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
