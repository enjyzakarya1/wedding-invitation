document.addEventListener('DOMContentLoaded', () => {
  const envelope = document.getElementById('envelope');
  const bgOverlay = document.getElementById('bg-overlay');
  const detailsSection = document.getElementById('details-section');
  const musicBtn = document.getElementById('music-btn');
  const musicIcon = document.getElementById('music-icon');

  let audioCtx = null;
  let isPlaying = false;
  let musicInterval = null;
  let step = 0;

  // Soft romantic wedding chords (Frequency progressions in Hz)
  const chords = [
    [261.63, 329.63, 392.00, 523.25], // C Major (Warm Soft)
    [220.00, 261.63, 329.63, 440.00], // A Minor (Elegant Romantic)
    [174.61, 220.00, 261.63, 349.23], // F Major (Sweet Soft)
    [196.00, 246.94, 293.66, 392.00]  // G Major (Warm Harmony)
  ];

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playWeddingHarmony() {
    if (!audioCtx) return;

    const currentChord = chords[step % chords.length];
    step++;

    currentChord.forEach((freq, index) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      // Soft triangle wave for piano/string hybrid tone
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + (index * 0.15));

      const startTime = audioCtx.currentTime + (index * 0.15);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.04, startTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.8);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 2.8);
    });
  }

  function startMusic() {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (!isPlaying) {
      isPlaying = true;
      if (musicIcon) musicIcon.textContent = 'SOUND OFF';
      playWeddingHarmony();
      musicInterval = setInterval(playWeddingHarmony, 2400);
    }
  }

  function stopMusic() {
    if (isPlaying) {
      isPlaying = false;
      if (musicIcon) musicIcon.textContent = 'SOUND ON';
      clearInterval(musicInterval);
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
