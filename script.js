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

  // Romantic Canon-in-D style chord progression (frequencies in Hz)
  const romanticMelody = [
    // D Major / Soft Warm Intro
    [293.66, 370.00, 440.00, 587.33],
    // A Major
    [220.00, 277.18, 329.63, 440.00],
    // B Minor (Emotional)
    [246.94, 293.66, 370.00, 493.88],
    // F# Minor
    [185.00, 220.00, 277.18, 370.00],
    // G Major (Warm Heartfelt)
    [196.00, 246.94, 293.66, 392.00],
    // D Major Low
    [146.83, 220.00, 293.66, 370.00]
  ];

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  // Plays a lush arpeggiated piano/celeste phrase
  function playRomanticPhrase() {
    if (!audioCtx || !isPlaying) return;

    const chord = romanticMelody[phraseIndex % romanticMelody.length];
    phraseIndex++;

    chord.forEach((freq, noteIndex) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      // Sine + gentle filter creates a warm piano feel
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + (noteIndex * 0.22));

      const startTime = audioCtx.currentTime + (noteIndex * 0.22);
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.045, startTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 3.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 3.2);
    });

    // Loop smoothly every 2.6 seconds
    musicTimeout = setTimeout(playRomanticPhrase, 2600);
  }

  function startMusic() {
    initAudio();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (!isPlaying) {
      isPlaying = true;
      if (musicIcon) musicIcon.textContent = 'SOUND OFF';
      playRomanticPhrase();
    }
  }

  function stopMusic() {
    if (isPlaying) {
      isPlaying = false;
      if (musicIcon) musicIcon.textContent = 'SOUND ON';
      clearTimeout(musicTimeout);
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
