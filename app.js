/**
 * FOR SABARI ⚽ — ANIMATED DIGITAL STORY
 * Messi Cartoon Character, Physics Football Engine, and 9 Cinematic Scenes
 */

// ==========================================
// ADD SABARI'S PEOPLE HERE
// Easily add or edit friends and their messages below:
// ==========================================
const supporters = [
  {
    image: "images/WhatsApp Image 2026-09-16 at 11.23.12 AM.jpeg", // Path to image (e.g., "photos/person1.jpg") or uploaded directly
    name: "Friend 1",
    message: "Always cheering for you. No matter what."
  },
  {
    image: "images/WhatsApp Image 2026-09-16 at 11.23.13 AM.jpeg",
    name: "Friend 2",
    message: "National Winner! So proud of you."
  },
  {
    image: "images/WhatsApp Image 2026-09-16 at 11.23.15 AM.jpeg",
    name: "Friend 3",
    message: "Keep going, champion. You earned this."
  },
  {
    image: "images/WhatsApp Image 2026-09-16 at 11.24.27 AM (1).jpeg",
    name: "Friend 4",
    message: "We've got you, bro. Always in your corner."
  },
  {
    image: "images/WhatsApp Image 2026-09-16 at 11.24.27 AM (2).jpeg",
    name: "Friend 5",
    message: "You made us so unbelievably proud."
  },
  {
    image: "images/WhatsApp Image 2026-09-16 at 11.29.37 AM.jpeg",
    name: "Friend 6",
    message: "Keep being you. The journey continues."
  },
  {
    image: "images/WhatsApp Image 2026-07-17 at 9.34.23 AM.jpeg",
    name: "Friend 7",
    message: "Your whole squad is right behind you."
  },
  {
    image: "images/WhatsApp Image 2026-09-11 at 12.40.55 PM.jpeg",
    name: "Friend 8",
    message: "Certified GOAT energy. Head high always!"
  },
  {
    image: "images/WhatsApp Image 2026-09-16 at 11.23.04 AM.jpeg",
    name: "Friend 9",
    message: "National level talent, world class friend."
  },
  {
    image: "images/WhatsApp Image 2026-09-16 at 11.23.06 AM.jpeg",
    name: "Friend 10",
    message: "Celebrating you today and every single day."
  },
  {
    image: "images/WhatsApp Image 2026-09-16 at 11.23.08 AM.jpeg",
    name: "Friend 11",
    message: "Don't stop smiling, legend!"
  },
  {
    image: "images/WhatsApp Image 2026-09-16 at 11.23.09 AM (1).jpeg",
    name: "Friend 12",
    message: "In your corner for every chapter."
  },
  {
    image: "images/WhatsApp Image 2026-09-16 at 11.23.09 AM.jpeg",
    name: "Friend 13",
    message: "True champion in all of our hearts."
  },
  {
    image: "images/WhatsApp Image 2026-09-16 at 11.23.15 AM.jpeg",
    name: "Friend 14",
    message: "More football, more joy, more VAMOS."
  },
  {
    image: "images/WhatsApp Image 2026-09-16 at 11.23.12 AM (1).jpeg",
    name: "Friend 15",
    message: "Proud to have you as our No.10!"
  }
];

// ================= SUBTLE AUDIO ENGINE (Web Audio API) =================
class StoryAudio {
  constructor() {
    this.ctx = null;
    this.muted = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  playTap() {
    if (this.muted) return;
    try {
      this.init();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(70, now + 0.1);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) { }
  }

  playKick() {
    if (this.muted) return;
    try {
      this.init();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.18);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
    } catch (e) { }
  }

  playTink() {
    if (this.muted) return;
    try {
      this.init();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(2400, now + 0.25);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } catch (e) { }
  }

  playPop() {
    if (this.muted) return;
    try {
      this.init();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(420, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) { }
  }

  playBounce() {
    if (this.muted) return;
    try {
      this.init();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.15);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } catch (e) { }
  }

  playCelebration() {
    if (this.muted) return;
    try {
      this.init();
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.1, now + idx * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.5);
      });
    } catch (e) { }
  }
}

const audio = new StoryAudio();

// ================= SCREEN SHAKE HELPER =================
function shakeScreen() {
  document.body.style.animation = 'screenShake 0.35s ease-in-out';
  setTimeout(() => { document.body.style.animation = ''; }, 350);
}

// Inject screen shake keyframes dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
@keyframes screenShake {
  0% { transform: translate(0, 0); }
  20% { transform: translate(-6px, 4px); }
  40% { transform: translate(6px, -4px); }
  60% { transform: translate(-4px, -2px); }
  80% { transform: translate(4px, 2px); }
  100% { transform: translate(0, 0); }
}
`;
document.head.appendChild(shakeStyle);

// ================= FULLSCREEN CANVAS PHYSICS & PARTICLES =================
class CinemaCanvasSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.balls = [];
    this.particles = [];
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.loop();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  drawFootball(x, y, radius, rotation) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);

    // Ball outer gradient
    const grad = ctx.createRadialGradient(-radius * 0.25, -radius * 0.25, radius * 0.1, 0, 0, radius);
    grad.addColorStop(0, '#FFFFFF');
    grad.addColorStop(0.85, '#F2F5F9');
    grad.addColorStop(1, '#CBD6E2');

    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = Math.max(1.8, radius * 0.08);
    ctx.strokeStyle = '#172B4D';
    ctx.stroke();

    // Center pentagon
    ctx.fillStyle = '#172B4D';
    ctx.beginPath();
    const pentR = radius * 0.38;
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const px = Math.cos(angle) * pentR;
      const py = Math.sin(angle) * pentR;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();

    // Radial seam lines
    ctx.lineWidth = Math.max(1.2, radius * 0.06);
    for (let i = 0; i < 5; i++) {
      const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
      const px = Math.cos(angle) * pentR;
      const py = Math.sin(angle) * pentR;
      const ex = Math.cos(angle) * radius;
      const ey = Math.sin(angle) * radius;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(ex, ey);
      ctx.stroke();
    }

    ctx.restore();
  }

  // Ball flying straight toward screen (Scene 1 & Scene 7)
  kickTowardScreen(onBoom = null) {
    audio.playKick();
    const w = this.width || window.innerWidth;
    const h = this.height || window.innerHeight;
    this.screenKick = {
      radius: 24,
      x: w * 0.46,
      y: h * 0.62,
      rotation: 0,
      maxRadius: w * 0.82,
      onBoom: onBoom
    };
  }

  // Ball burst (10-15 balls)
  burst(x = this.width / 2, y = this.height / 2, count = 12) {
    audio.playPop();
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 5;
      this.balls.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        radius: Math.random() * 8 + 18,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.25,
        gravity: 0.38,
        life: 1,
        decay: 0.008
      });
    }

    // Confetti particles
    const colors = ['#74B9E6', '#FFFFFF', '#F5B041', '#172B4D'];
    for (let i = 0; i < 25; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 4;
      this.particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1,
        decay: 0.015,
        isStar: Math.random() > 0.5
      });
    }
  }

  // Mega celebration (20-25 footballs)
  megaExplosion(x = this.width / 2, y = this.height * 0.4) {
    audio.playCelebration();
    this.burst(x, y, 22);
    setTimeout(() => this.burst(x - 90, y - 40, 10), 200);
    setTimeout(() => this.burst(x + 90, y - 40, 10), 400);
  }

  loop() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Render screen kick if active
    if (this.screenKick) {
      this.screenKick.radius += 20;
      this.screenKick.rotation += 0.22;
      this.drawFootball(this.screenKick.x, this.screenKick.y, this.screenKick.radius, this.screenKick.rotation);

      if (this.screenKick.radius >= this.screenKick.maxRadius) {
        const cb = this.screenKick.onBoom;
        this.screenKick = null;
        shakeScreen();
        audio.playTap();
        if (cb) cb();
      }
    }

    // Render & Update Footballs
    for (let i = this.balls.length - 1; i >= 0; i--) {
      const b = this.balls[i];
      b.x += b.vx;
      b.y += b.vy;
      b.vy += b.gravity;
      b.rotation += b.vRot;
      b.life -= b.decay;

      // Bounce at bottom
      if (b.y + b.radius >= this.height - 15) {
        b.y = this.height - 15 - b.radius;
        b.vy *= -0.55;
        b.vx *= 0.8;
      }

      if (b.life <= 0) {
        this.balls.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, b.life);
      this.drawFootball(b.x, b.y, b.radius, b.rotation);
      this.ctx.restore();
    }

    // Render & Update Confetti / Stars
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2;
      p.life -= p.decay;

      if (p.life <= 0 || p.y > this.height + 20) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.life);
      this.ctx.fillStyle = p.color;

      if (p.isStar) {
        this.ctx.font = `${p.size * 2}px sans-serif`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText('⋆', p.x, p.y);
      } else {
        this.ctx.fillRect(p.x, p.y, p.size, p.size * 0.7);
      }
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.loop());
  }
}

const canvas = document.getElementById('cinemaCanvas');
const cinema = new CinemaCanvasSystem(canvas);

// ================= SPEECH BUBBLE MANAGER =================
const speechBubble = document.getElementById('actorSpeechBubble');
const speechText = document.getElementById('actorSpeechText');

function showSpeech(text, targetEl, duration = 2000, onDone = null) {
  speechText.textContent = text;
  speechBubble.classList.remove('hidden');
  audio.playPop();

  if (targetEl) {
    const rect = targetEl.getBoundingClientRect();
    speechBubble.style.top = `${Math.max(20, rect.top - 75)}px`;
    speechBubble.style.left = `${Math.min(window.innerWidth - 300, Math.max(20, rect.left - 40))}px`;
  } else {
    speechBubble.style.top = '30%';
    speechBubble.style.left = '50%';
    speechBubble.style.transform = 'translate(-50%, -50%)';
  }

  setTimeout(() => {
    speechBubble.classList.add('hidden');
    if (onDone) onDone();
  }, duration);
}

// ================= SCENE CONTROLLER =================
let currentSceneIndex = 1;

function goToScene(sceneNum) {
  audio.playTap();

  document.querySelectorAll('.full-scene').forEach(sc => {
    sc.classList.remove('active');
  });

  const nextScene = document.getElementById(`scene${sceneNum}`);
  if (nextScene) {
    nextScene.classList.add('active');
    currentSceneIndex = sceneNum;
    const stepLabels = {
      1: "1 / 5: The Call ⚽",
      2: "2 / 5: Ready? 🐐",
      8: "3 / 5: Football Game ⚽",
      5: "4 / 5: The Squad 📸",
      6: "5 / 5: We're Proud 🏆",
      9: "Vamos! 🐐"
    };
    document.getElementById('sceneProgressDot').textContent = stepLabels[sceneNum] || `Scene ${sceneNum}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Scene setup hooks
    if (sceneNum === 1) startScene1Animation();
    if (sceneNum === 2) startScene2Animation();
    if (sceneNum === 3) startScene3Animation();
    if (sceneNum === 4) startScene4Animation();
    if (sceneNum === 5) startScene5PhotoWall();
    if (sceneNum === 6) startScene6Crowd();
    if (sceneNum === 8) startScene8Game();
    if (sceneNum === 9) startScene9Final();
  }
}

// Safe element event listener helper
function safeAddListener(id, event, handler) {
  const el = typeof id === 'string' ? document.getElementById(id) : id;
  if (el) {
    el.addEventListener(event, handler);
  }
}

// ================= SCENE 1: THE EMPTY STADIUM ANIMATION =================
function startScene1Animation() {
  const ball = document.getElementById('s1Ball');
  const messi = document.getElementById('s1Messi');
  const narrative = document.getElementById('s1Narrative');
  if (!ball || !messi) return;

  // Clear any existing animation and reset state
  ball.classList.remove('hidden');
  if (narrative) narrative.classList.add('hidden');

  // Initial off-screen positions
  ball.style.transition = 'none';
  messi.style.transition = 'none';
  ball.style.left = '-60px';
  messi.style.left = '-140px';
  messi.style.transform = 'none';

  // Force reflow
  void ball.offsetWidth;

  // Smoothly roll ball into field
  ball.style.transition = 'left 1.2s cubic-bezier(0.25, 1, 0.5, 1), transform 1.2s linear';
  ball.style.left = '48%';
  ball.style.transform = 'rotate(720deg)';

  // Cartoon Messi runs in chasing the ball
  setTimeout(() => {
    messi.style.transition = 'left 1.1s cubic-bezier(0.25, 1, 0.5, 1)';
    messi.style.left = '38%';
  }, 250);

  // Messi catches up and kicks toward screen!
  setTimeout(() => {
    ball.classList.add('hidden');
    cinema.kickTowardScreen(() => {
      // Messi looks at viewer
      messi.style.transition = 'all 0.3s ease';
      messi.style.left = '42%';
      messi.style.transform = 'scale(1.15)';

      // Speech bubble sequence
      setTimeout(() => {
        showSpeech("“Uh… hi.”", messi, 1500, () => {
          setTimeout(() => {
            showSpeech("“I was told Sabari is here.” 😂", messi, 1800, () => {
              setTimeout(() => {
                showSpeech("“Where is he?”", messi, 1500, () => {
                  if (narrative) narrative.classList.remove('hidden');
                  audio.playPop();
                });
              }, 300);
            });
          }, 300);
        });
      }, 400);
    });
  }, 1500);
}

// ================= SCENE 1: "I AM HERE!" HANDLER =================
safeAddListener('btnIAmHere', 'click', () => {
  audio.playKick();
  const messi = document.getElementById('s1Messi');
  showSpeech("“Oh! There you are! 😂”", messi, 1400, () => {
    cinema.burst(window.innerWidth / 2, window.innerHeight * 0.6, 6);
    setTimeout(() => goToScene(2), 350);
  });
});

// ================= SCENE 2: MESSI ASKS & RUNAWAY NO BUTTON =================
let noDodgeCount = 0;
const dodgeMessages = [
  "Nope! 😂",
  "Nice try! You literally cannot say no.",
  "Just click YES bro!",
  "Error 404: 'No' not found! ❌",
  "Stop running from the squad! 😂",
  "Messi disapproves of this 'No'! 🐐"
];

function startScene2Animation() {
  noDodgeCount = 0;
  const noBtn = document.getElementById('btnChoiceNo');
  const hint = document.getElementById('noDodgeHint');
  if (noBtn) {
    noBtn.style.transform = 'translate(0px, 0px) rotate(0deg)';
  }
  if (hint) {
    hint.classList.add('hidden');
  }
  setTimeout(() => {
    cinema.burst(window.innerWidth / 2, window.innerHeight * 0.35, 4);
  }, 400);
}

// Runaway NO Button Mechanic
const btnChoiceNo = document.getElementById('btnChoiceNo');
const noDodgeHint = document.getElementById('noDodgeHint');

function dodgeNoButton(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  audio.playTap();

  // Calculate random displacement so it runs away all over the screen
  const maxX = Math.min(220, window.innerWidth * 0.35);
  const maxY = 130;
  const randX = (Math.random() - 0.5) * 2 * maxX;
  const randY = (Math.random() - 0.5) * 2 * maxY;
  const rot = (Math.random() - 0.5) * 45;

  btnChoiceNo.style.transform = `translate(${randX}px, ${randY}px) rotate(${rot}deg) scale(1.05)`;

  noDodgeHint.textContent = dodgeMessages[noDodgeCount % dodgeMessages.length];
  noDodgeHint.classList.remove('hidden');
  noDodgeCount++;

  // Small football pop near the fleeing button
  const rect = btnChoiceNo.getBoundingClientRect();
  cinema.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 2);
}

if (btnChoiceNo) {
  btnChoiceNo.addEventListener('mouseenter', dodgeNoButton);
  btnChoiceNo.addEventListener('mouseover', dodgeNoButton);
  btnChoiceNo.addEventListener('touchstart', dodgeNoButton, { passive: false });
  btnChoiceNo.addEventListener('pointerdown', dodgeNoButton);
  btnChoiceNo.addEventListener('click', dodgeNoButton);
}

// YES Button Clicked -> Direct transition to the Football Game!
safeAddListener('btnChoiceYes', 'click', () => {
  audio.playKick();
  cinema.burst(window.innerWidth / 2, window.innerHeight * 0.5, 12);

  cinema.kickTowardScreen(() => {
    goToScene(8);
  });
});

// ================= SCENE 3: NATIONAL WINNER REVEAL =================
function startScene3Animation() {
  const tinyTrophy = document.getElementById('s3TinyTrophy');
  const tinkSound = document.getElementById('s3TinkSound');
  const poster = document.getElementById('s3CelebratoryPoster');
  const tinyStage = document.getElementById('s3TinyStage');

  // Single ball rolls in and hits tiny trophy
  setTimeout(() => {
    if (tinkSound) tinkSound.classList.remove('hidden');
    audio.playTink();
    shakeScreen();

    // 10-15 footballs burst outward + confetti + trophy grows into celebratory poster!
    setTimeout(() => {
      if (tinyStage) tinyStage.classList.add('hidden');
      if (poster) poster.classList.remove('hidden');
      cinema.burst(window.innerWidth / 2, window.innerHeight * 0.35, 15);
      audio.playCelebration();
    }, 900);
  }, 1200);
}

safeAddListener('btnScene3Celebrate', 'click', () => {
  cinema.megaExplosion(window.innerWidth / 2, window.innerHeight * 0.35);
  setTimeout(() => goToScene(4), 500);
});

// ================= SCENE 4: TROPHY PARTY =================
function startScene4Animation() {
  cinema.burst(window.innerWidth * 0.3, window.innerHeight * 0.3, 8);
  setTimeout(() => {
    cinema.burst(window.innerWidth * 0.7, window.innerHeight * 0.3, 8);
  }, 350);
}

safeAddListener('btnScene4', 'click', () => {
  audio.playKick();
  goToScene(5);
});

// ================= SCENE 5: THE PHOTO WALL (CENTERPIECE) =================
// Clear any legacy uploaded photos from localStorage so supporters array in code is pure source of truth
try {
  localStorage.removeItem('sabari_story_photos');
} catch (e) { }

function startScene5PhotoWall() {
  const pinboard = document.getElementById('polaroidsPinboard');
  const status = document.getElementById('messiWallStatus');
  if (!pinboard) return;
  pinboard.innerHTML = '';

  const total = supporters.length;
  const tilts = [-3, 2.5, -2, 3, -1.5, 2, -2.5, 1.5, -3, 2, -1.5, 2.5, -2, 3, -2];

  function createCardElement(i) {
    const data = supporters[i] || { image: '', name: `Friend ${i + 1}`, message: "Always cheering for you." };

    const card = document.createElement('div');
    card.className = 'polaroid-pin-card';
    card.style.transform = `rotate(${tilts[i % tilts.length]}deg)`;

    const imgContent = data.image
      ? `<img src="${data.image}" alt="${data.name}">`
      : `<div class="pin-placeholder">${['🫂', '✨', '⚽', '💪', '🏆', '🔥'][i % 6]}</div>`;

    card.innerHTML = `
      <div class="pin-washi-tape"></div>
      <div class="pin-photo-frame">${imgContent}</div>
      <div class="pin-friend-name">${data.name}</div>
      <p class="pin-caption">“${data.message}”</p>
    `;

    return card;
  }

  // Sequential reveal: Messi kicks ball -> POP! Photo appears!
  let idx = 0;
  function revealNextPhoto() {
    if (idx >= total) {
      if (status) status.textContent = "“Okay… That’s a pretty good team.” 😂";
      audio.playCelebration();
      return;
    }

    const card = createCardElement(idx);
    pinboard.appendChild(card);
    audio.playPop();

    const rect = card.getBoundingClientRect();
    cinema.burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 2);

    idx++;
    setTimeout(revealNextPhoto, 280);
  }

  setTimeout(revealNextPhoto, 350);
}

safeAddListener('btnScene5Next', 'click', () => {
  goToScene(6);
});

// ================= SCENE 6: THE CROWD =================
function startScene6Crowd() {
  const strip = document.getElementById('crowdPhotoStrip');
  if (!strip) return;
  strip.innerHTML = '';
  const count = Math.min(10, Math.max(supporters.length, customUserPhotos.length));
  for (let i = 0; i < count; i++) {
    const thumb = document.createElement('div');
    thumb.className = 'crowd-thumb-circle';
    if (customUserPhotos[i]) {
      thumb.style.backgroundImage = `url(${customUserPhotos[i]})`;
    } else {
      thumb.textContent = ['🫂', '✨', '⚽', '💪', '🏆'][i % 5];
    }
    strip.appendChild(thumb);
  }
}

safeAddListener('btnScene6Next', 'click', () => {
  goToScene(9);
});

// ================= SCENE 7: MESSI RUINS THE EMOTION =================
safeAddListener('btnScene7Next', 'click', () => {
  // Messi kicks ball straight toward viewer
  cinema.kickTowardScreen(() => {
    goToScene(8);
  });
});

// ================= SCENE 8: INTERACTIVE FOOTBALL GAME ENGINE =================
let gameRound = 1;
let isCharging = false;
let chargePower = 0;
let chargeInterval = null;
let isBallInMotion = false;
let aimAngle = -Math.PI / 2; // Default aim straight up
let missStreak = 0;
let idleTimer = null;
let assistActive = false;
let assistWindow = false;
let assistPassInterval = null;

const pitchArena = document.getElementById('gamePitch');
const pitchBall = document.getElementById('gamePitchBall');
const aimTrajectory = document.getElementById('aimTrajectory');
const powerFill = document.getElementById('powerMeterFill');
const powerText = document.getElementById('powerText');
const gameMessiText = document.getElementById('gameMessiText');
const gameMessiActor = document.getElementById('gameMessiActor');
const gameRoundBadge = document.getElementById('gameRoundBadge');
const overthinkingKeeper = document.getElementById('overthinkingKeeper');
const timingAssistBox = document.getElementById('timingAssistBox');
const retryArea = document.getElementById('gameRetryArea');
const btnRetryKick = document.getElementById('btnRetryKick');
const hatTrickModal = document.getElementById('hatTrickModal');

function startScene8Game() {
  gameRound = 1;
  missStreak = 0;

  // Initial entrance speech sequence as requested
  setMessiGameSpeech("“Okay No.10…”");
  setTimeout(() => {
    setMessiGameSpeech("“Your turn.”");
    setTimeout(() => {
      setMessiGameSpeech("“Kick the ball.”");
      setTimeout(() => {
        setMessiGameSpeech("“Please don't overthink the angle. 😂”");
        setupRound(1);
      }, 1400);
    }, 1300);
  }, 1300);
}

function setupRound(r) {
  gameRound = r;
  isBallInMotion = false;
  isCharging = false;
  chargePower = 0;
  assistActive = false;
  assistWindow = false;
  clearInterval(chargeInterval);
  clearInterval(assistPassInterval);
  updatePowerUI(0);
  resetBallPosition();
  retryArea.classList.add('hidden');
  hatTrickModal.classList.add('hidden');

  // Reset Messi classes
  if (gameMessiActor) {
    gameMessiActor.className = 'game-messi-character';
  }
  if (overthinkingKeeper) {
    overthinkingKeeper.className = 'goalkeeper-actor';
  }
  if (pitchArena) {
    pitchArena.classList.remove('stadium-bright');
  }

  if (r === 1) {
    gameRoundBadge.textContent = "ROUND 1: WARM-UP ⚽";
    overthinkingKeeper.classList.add('hidden');
    timingAssistBox.classList.add('hidden');
    aimTrajectory.classList.remove('hidden');
    setMessiGameSpeech("“Come on. You've got this.”");
  } else if (r === 2) {
    gameRoundBadge.textContent = "ROUND 2: MESSI ASSIST ⚡";
    overthinkingKeeper.classList.add('hidden');
    timingAssistBox.classList.remove('hidden');
    aimTrajectory.classList.add('hidden');
    startMessiAssistFlow();
  } else if (r === 3) {
    gameRoundBadge.textContent = "ROUND 3: THE FINAL SHOT 🧠";
    overthinkingKeeper.classList.remove('hidden');
    timingAssistBox.classList.add('hidden');
    aimTrajectory.classList.remove('hidden');
    if (pitchArena) pitchArena.classList.add('stadium-bright');
    if (gameMessiActor) gameMessiActor.classList.add('behind-player');

    setMessiGameSpeech("“Final shot.”");
    setTimeout(() => {
      setMessiGameSpeech("“Don't think.”");
      setTimeout(() => {
        setMessiGameSpeech("“JUST KICK. 😂”");
      }, 1200);
    }, 1200);
  }

  resetIdleTimer();
}

// Round 2 Messi Assist flow
function startMessiAssistFlow() {
  assistActive = true;
  setMessiGameSpeech("“Watch me! I'm coming in for the assist! ⚽”");
  if (gameMessiActor) gameMessiActor.classList.add('dribbling');

  // Messi passes the ball towards Sabari
  pitchBall.style.transition = 'none';
  pitchBall.style.left = '18%';
  pitchBall.style.bottom = '80px';

  setTimeout(() => {
    audio.playKick();
    pitchBall.style.transition = 'all 1.2s cubic-bezier(0.2, 0.8, 0.4, 1)';
    pitchBall.style.left = '50%';
    pitchBall.style.bottom = '40px';
    pitchBall.style.transform = 'translateX(-50%) rotate(720deg)';

    // Timing window opens
    setTimeout(() => {
      assistWindow = true;
      // Close window after 1.4s if missed
      setTimeout(() => {
        if (assistActive && !isBallInMotion) {
          assistWindow = false;
          handleAssistMiss();
        }
      }, 1400);
    }, 600);
  }, 600);
}

function handleAssistMiss() {
  assistActive = false;
  if (gameMessiActor) gameMessiActor.className = 'game-messi-character';
  audio.playBounce();
  setMessiGameSpeech("“I passed it right to you.”");
  setTimeout(() => {
    setMessiGameSpeech("“WHAT HAPPENED? 😂”");
    retryArea.classList.remove('hidden');
  }, 1200);
}

function handleAssistHit() {
  assistActive = false;
  assistWindow = false;
  isBallInMotion = true;
  timingAssistBox.classList.add('hidden');
  if (gameMessiActor) {
    gameMessiActor.className = 'game-messi-character celebrating';
  }

  audio.playKick();
  setMessiGameSpeech("“ONE-TWO! ⚽”");

  // Rocket ball straight into goal
  pitchBall.style.transition = 'all 0.5s cubic-bezier(0.2, 1, 0.3, 1)';
  pitchBall.style.transform = 'translateX(-50%) translateY(-270px) scale(0.6) rotate(1080deg)';

  setTimeout(() => {
    audio.playCelebration();
    shakeScreen();
    cinema.burst(window.innerWidth / 2, window.innerHeight * 0.42, 12);
    setMessiGameSpeech("“What a finish! Messi approved. 🔥”");
    setTimeout(() => {
      setupRound(3);
    }, 1800);
  }, 500);
}

function setMessiGameSpeech(msg) {
  if (gameMessiText) gameMessiText.textContent = msg;
}

function resetIdleTimer() {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    if (!isBallInMotion && gameRound !== 2) {
      setMessiGameSpeech("“Bro is calculating.”");
      setTimeout(() => {
        setMessiGameSpeech("“Just kick the ball. 😂”");
      }, 1200);
    }
  }, 10000);
}

function resetBallPosition() {
  pitchBall.style.transition = 'none';
  pitchBall.style.transform = 'translateX(-50%)';
  pitchBall.style.bottom = '40px';
  pitchBall.style.left = '50%';
}

function updatePowerUI(val) {
  powerFill.style.width = `${val}%`;
  powerText.textContent = `${Math.round(val)}%`;
}

// Mouse / Touch Aiming Trajectory
function handleAimMove(clientX, clientY) {
  if (isBallInMotion || gameRound === 2) return;
  const ballRect = pitchBall.getBoundingClientRect();
  const ballCenterX = ballRect.left + ballRect.width / 2;
  const ballCenterY = ballRect.top + ballRect.height / 2;

  const dx = clientX - ballCenterX;
  const dy = clientY - ballCenterY;

  // Calculate angle (restricted to forward hemisphere)
  aimAngle = Math.atan2(dy, dx);
  if (aimAngle > -0.2) aimAngle = -0.2;
  if (aimAngle < -Math.PI + 0.2) aimAngle = -Math.PI + 0.2;

  const deg = (aimAngle * 180) / Math.PI + 90;
  aimTrajectory.style.transform = `rotate(${deg}deg)`;
}

// Power Charge Handlers
function startCharging(e) {
  if (isBallInMotion) return;

  // If in Round 2 (Assist timing), check assist hit directly on tap/click
  if (gameRound === 2) {
    if (assistWindow) {
      handleAssistHit();
    } else if (assistActive) {
      handleAssistMiss();
    }
    return;
  }

  isCharging = true;
  chargePower = 15;
  updatePowerUI(chargePower);

  clearInterval(chargeInterval);
  chargeInterval = setInterval(() => {
    if (!isCharging) return;
    chargePower = Math.min(100, chargePower + 4);
    updatePowerUI(chargePower);
    if (chargePower % 20 === 0) audio.playTap();
  }, 40);
}

function releaseKick(e) {
  if (gameRound === 2 || !isCharging || isBallInMotion) return;
  isCharging = false;
  clearInterval(chargeInterval);
  isBallInMotion = true;
  aimTrajectory.classList.add('hidden');
  clearTimeout(idleTimer);

  audio.playKick();

  // Execute Ball Flight Physics
  const distance = (chargePower / 100) * 290 + 70;
  const travelX = Math.cos(aimAngle) * distance;
  const travelY = Math.sin(aimAngle) * distance;

  pitchBall.style.transition = 'all 0.65s cubic-bezier(0.25, 1, 0.5, 1)';
  pitchBall.style.transform = `translateX(-50%) translate(${travelX}px, ${travelY}px) scale(0.65) rotate(${travelX * 4}deg)`;

  // Round 3 Goalkeeper reacts with dynamic dive
  if (gameRound === 3 && overthinkingKeeper) {
    setTimeout(() => {
      if (travelX < -20) {
        overthinkingKeeper.className = 'goalkeeper-actor diving-left';
      } else if (travelX > 20) {
        overthinkingKeeper.className = 'goalkeeper-actor diving-right';
      }
    }, 150);
  }

  // Evaluate shot outcome after ball flight
  setTimeout(() => {
    evaluateShot(travelX, travelY, chargePower);
  }, 650);
}

// Attach Aim & Kick Controls to Pitch Arena
if (pitchArena) {
  pitchArena.addEventListener('mousemove', (e) => handleAimMove(e.clientX, e.clientY));
  pitchArena.addEventListener('mousedown', startCharging);
  window.addEventListener('mouseup', releaseKick);

  // Mobile Touch Support
  pitchArena.addEventListener('touchmove', (e) => {
    if (e.touches.length) handleAimMove(e.touches[0].clientX, e.touches[0].clientY);
  }, { passive: true });
  pitchArena.addEventListener('touchstart', startCharging, { passive: true });
  window.addEventListener('touchend', releaseKick);
}

// Shot Evaluation & Target Detection
function evaluateShot(tx, ty, power) {
  const ballRect = pitchBall.getBoundingClientRect();
  const goalRect = document.getElementById('goalFrame').getBoundingClientRect();

  // Miss 4: Weak power
  if (power < 25) {
    handleMiss("Did you forget to charge it? 😂");
    return;
  }

  // Miss 3: Sky pass (high power + high trajectory)
  if (ty < -320 && power > 88) {
    if (gameMessiActor) gameMessiActor.className = 'game-messi-character';
    handleMiss("Nice pass to the sky. 😂");
    return;
  }

  // Round 3 Goalkeeper Collision Check
  if (gameRound === 3 && overthinkingKeeper && !overthinkingKeeper.classList.contains('hidden')) {
    const keeperRect = overthinkingKeeper.getBoundingClientRect();
    const keeperIntercepted = Math.abs(ballRect.left - keeperRect.left) < 38;
    if (keeperIntercepted && power < 75) {
      overthinkingKeeper.className = 'goalkeeper-actor celebrating';
      handleMiss("Overthinking FC blocked it! Don't think, JUST KICK! 😂");
      return;
    }
  }

  // Check if ball arrived inside the goal
  const insideGoalX = ballRect.left >= goalRect.left - 15 && ballRect.right <= goalRect.right + 15;
  const insideGoalY = ballRect.top <= goalRect.bottom + 10 && ballRect.bottom >= goalRect.top - 15;

  if (insideGoalX && insideGoalY) {
    // Determine which target zone was hit (PROUD, HAPPY, VAMOS)
    const goalWidth = goalRect.width;
    const relX = (ballRect.left + ballRect.width / 2) - goalRect.left;

    let hitTarget = 'happy';
    if (relX < goalWidth * 0.38) {
      hitTarget = 'proud';
    } else if (relX > goalWidth * 0.62) {
      hitTarget = 'vamos';
    }

    handleGoalSuccess(hitTarget);
  } else {
    // Miss 2: Wide miss
    if (Math.abs(tx) > 130) {
      handleMiss("Bro… WHERE ARE YOU AIMING? 😂");
    } else {
      // Miss 1: Close
      handleMiss("Close. Very close. 😂");
    }
  }
}

function handleMiss(reactionQuote) {
  missStreak++;
  audio.playBounce();
  setMessiGameSpeech(`“${reactionQuote}”`);
  retryArea.classList.remove('hidden');
}

safeAddListener('btnRetryKick', 'click', () => {
  setupRound(gameRound);
});

function handleGoalSuccess(targetType = 'proud') {
  audio.playCelebration();
  shakeScreen();
  cinema.burst(window.innerWidth / 2, window.innerHeight * 0.45, 15);

  if (gameMessiActor) {
    gameMessiActor.className = 'game-messi-character celebrating';
  }

  // Custom Target Reactions as required
  if (targetType === 'proud') {
    setMessiGameSpeech("“🏆 GOOOOOAL! Correct answer. Your people are already proud of you. +1 GOAL”");
  } else if (targetType === 'happy') {
    setMessiGameSpeech("“THAT'S WHAT WE WANTED. +1 SMILE 😂”");
  } else {
    setMessiGameSpeech("“VAMOOOOOSSSSS ⚽🐐 MESSI APPROVED.”");
  }

  if (gameRound === 1) {
    setTimeout(() => {
      setMessiGameSpeech("“Nice.”");
      setTimeout(() => {
        setMessiGameSpeech("“Okay, that was suspiciously easy. 😂”");
        setTimeout(() => setupRound(2), 1600);
      }, 1200);
    }, 1200);
  } else if (gameRound === 3) {
    // HAT-TRICK REACHED! Major celebration!
    setTimeout(() => {
      cinema.megaExplosion(window.innerWidth / 2, window.innerHeight * 0.4);
      setTimeout(() => {
        hatTrickModal.classList.remove('hidden');
      }, 700);
    }, 800);
  }
}

// Click after Hat-trick (3 goals) -> Reveal the people photos!
safeAddListener('btnToCrowdFinale', 'click', () => {
  goToScene(5);
});

// ================= SCENE 9: FINAL CINEMATIC & CONNECTED CROWD =================
function startScene9Final() {
  const crowdCircle = document.getElementById('finalCrowdCircle');
  if (!crowdCircle) return;
  crowdCircle.innerHTML = '';
  const total = Math.min(12, Math.max(supporters.length, customUserPhotos.length));
  for (let i = 0; i < total; i++) {
    const thumb = document.createElement('div');
    thumb.className = 'pin-photo-frame';
    if (customUserPhotos[i]) {
      thumb.innerHTML = `<img src="${customUserPhotos[i]}">`;
    } else {
      thumb.innerHTML = `<div class="pin-placeholder">${['🫂', '✨', '⚽', '💪', '🏆'][i % 5]}</div>`;
    }
    crowdCircle.appendChild(thumb);
  }
}

safeAddListener('btnFinalVamosKick', 'click', () => {
  cinema.kickTowardScreen(() => {
    const pre = document.getElementById('finalPreCelebration');
    const overlay = document.getElementById('finalCelebrationOverlay');
    if (pre) pre.classList.add('hidden');
    if (overlay) overlay.classList.remove('hidden');

    // Grand explosion: 25 footballs, stars, Argentina confetti!
    cinema.megaExplosion(window.innerWidth / 2, window.innerHeight * 0.4);
    setTimeout(() => cinema.burst(window.innerWidth * 0.25, window.innerHeight * 0.5, 10), 300);
    setTimeout(() => cinema.burst(window.innerWidth * 0.75, window.innerHeight * 0.5, 10), 600);
  });
});

safeAddListener('btnRestartStory', 'click', () => {
  const pre = document.getElementById('finalPreCelebration');
  const overlay = document.getElementById('finalCelebrationOverlay');
  if (pre) pre.classList.remove('hidden');
  if (overlay) overlay.classList.add('hidden');
  goToScene(1);
});

// Sound Toggle in HUD
safeAddListener('soundToggleBtn', 'click', () => {
  const isMuted = audio.toggleMute();
  const icon = document.getElementById('soundIcon');
  if (icon) icon.textContent = isMuted ? '🔇' : '🔊';
  if (!isMuted) audio.playPop();
});

// Initial unlock of Web Audio context on user click
window.addEventListener('click', () => {
  audio.init();
}, { once: true });

// Start Scene 1 when loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    goToScene(1);
  });
} else {
  goToScene(1);
}
