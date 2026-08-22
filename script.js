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

  // Rich romantic chord progression
  const romanticMelody = [
    [293.66, 370.00, 440.00, 587.33], // D Major
    [220.00, 277.18, 329.63, 440.00], // A Major
    [246.94, 293.66, 370.00, 493.88], // B Minor
    [185.00, 220.00, 277.18, 370.00], // F# Minor
    [196.00, 246.94, 293.66, 392.00], // G Major
    [146.83, 220.00, 293.66, 370.00]  // D Major Low
  ];

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  function playRomanticPhrase() {
    if (!audioCtx || !isPlaying) return;

    const chord = romanticMelody[phraseIndex % romanticMelody.length];
    phraseIndex++;

    chord.forEach((freq, noteIndex) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle'; // Warm acoustic tone
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + (noteIndex * 0.22));

      const startTime = audioCtx.currentTime + (noteIndex * 0.22);
      
      // Increased gain volume from 0.045 to 0.18 for significantly louder sound
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 3.0);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(startTime);
      osc.stop(startTime + 3.0);
    });

    musicTimeout = setTimeout(playRomanticPhrase, 2400);
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
