/**
 * ====================================================================
 * SABARI — THE CHAMPION'S JOURNEY ⚽ • MASTER APPLICATION CONTROLLER
 * ====================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const config = window.SABARI_CONFIG;
  const audio = window.soundEngine;

  /* ====================================================================
     1. THREE.JS 3D STADIUM & ATMOSPHERIC PITCH ENGINE
     ==================================================================== */
  class Stadium3D {
    constructor() {
      this.canvas = document.getElementById('webgl-canvas');
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.FogExp2(0x060e22, 0.015);

      this.camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 4, 14);

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true
      });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      this.initWorld();
      this.initEvents();
      this.animate();
    }

    initWorld() {
      this.ambientLight = new THREE.AmbientLight(0x1a2e56, 0.65);
      this.scene.add(this.ambientLight);

      this.floodlight1 = new THREE.SpotLight(0xa5cbf5, 1.8);
      this.floodlight1.position.set(-25, 30, 20);
      this.floodlight1.angle = Math.PI / 4;
      this.floodlight1.penumbra = 0.6;
      this.scene.add(this.floodlight1);

      this.floodlight2 = new THREE.SpotLight(0xfff0b3, 1.4);
      this.floodlight2.position.set(25, 30, 20);
      this.floodlight2.angle = Math.PI / 4;
      this.floodlight2.penumbra = 0.6;
      this.scene.add(this.floodlight2);

      this.centerSpotlight = new THREE.SpotLight(0xffffff, 0.2);
      this.centerSpotlight.position.set(0, 20, 0);
      this.centerSpotlight.target.position.set(0, 0, 0);
      this.centerSpotlight.angle = Math.PI / 6;
      this.scene.add(this.centerSpotlight);
      this.scene.add(this.centerSpotlight.target);

      // (3D ground plane and giant sphere removed for sleek, clean mobile stadium atmosphere)
    }

    rollBallIn(onComplete) {
      gsap.to(this.centerSpotlight, { intensity: 2.2, duration: 1.2 });
      gsap.to(this.ambientLight, { intensity: 0.8, duration: 1.2 });
      if (onComplete) {
        setTimeout(onComplete, 600);
      }
    }

    setCameraForScene(sceneName) {
      if (sceneName === 'intro') {
        gsap.to(this.ambientLight, { intensity: 0.8, duration: 1.5 });
        gsap.to(this.camera.position, { x: 0, y: 3.5, z: 10, duration: 1.5 });
      } else if (sceneName === 'tunnel') {
        gsap.to(this.camera.position, { x: 0, y: 2, z: 14, duration: 1.5 });
      } else if (sceneName === 'match') {
        gsap.to(this.camera.position, { x: 0, y: 15, z: 25, duration: 1.8 });
      } else if (sceneName === 'aftermath') {
        gsap.to(this.camera.position, { x: 0, y: 4, z: 12, duration: 1.5 });
      } else if (sceneName === 'slideshow') {
        gsap.to(this.ambientLight, { intensity: 0.25, duration: 1.5 });
        gsap.to(this.camera.position, { x: 0, y: 5, z: 16, duration: 1.8 });
      } else if (sceneName === 'promise') {
        gsap.to(this.ambientLight, { intensity: 0.08, duration: 2.0 });
        gsap.to(this.camera.position, { x: 0, y: 3, z: 11, duration: 2.0 });
      } else if (sceneName === 'finalscreen') {
        gsap.to(this.ambientLight, { intensity: 1.4, duration: 1.8 });
        gsap.to(this.camera.position, { x: 0, y: 8, z: 20, duration: 2.2 });
      }
    }

    igniteStadiumLights() {
      gsap.to(this.ambientLight, { intensity: 1.6, duration: 1.0 });
      gsap.to(this.floodlight1, { intensity: 2.5, duration: 0.8 });
      gsap.to(this.floodlight2, { intensity: 2.2, duration: 0.8 });
      gsap.to(this.centerSpotlight, { intensity: 3.0, duration: 0.8 });
    }

    initEvents() {
      window.addEventListener('resize', () => {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
      });
    }

    animate() {
      requestAnimationFrame(() => this.animate());
      if (this.ball) this.ball.rotation.y += 0.005;
      this.renderer.render(this.scene, this.camera);
    }
  }

  /* ====================================================================
     2. PLAYABLE FOOTBALL ENGINE (SABARI & MESSI VS RONALDO)
     ==================================================================== */
  /* ====================================================================
     2. PLAYABLE FOOTBALL ENGINE (SABARI & MESSI VS RONALDO)
     ==================================================================== */
  class MatchGameEngine {
    constructor(onMatchFinished) {
      this.onMatchFinished = onMatchFinished;
      this.canvas = document.getElementById('footballPitchCanvas');
      this.ctx = this.canvas.getContext('2d');

      this.scoreSabariEl = document.getElementById('scoreSabari');
      this.scoreRonaldoEl = document.getElementById('scoreRonaldo');
      this.timerEl = document.getElementById('matchTimer');
      this.momentBanner = document.getElementById('matchMomentBanner');
      this.momentTitle = document.getElementById('momentTitle');
      this.momentSub = document.getElementById('momentSub');

      // Key Badges for tactile visual feedback
      this.badgeMove = document.getElementById('badgeMove');
      this.badgeShoot = document.getElementById('badgeShoot');
      this.badgePass = document.getElementById('badgePass');
      this.badgeTackle = document.getElementById('badgeTackle');
      this.badgeSprint = document.getElementById('badgeSprint');

      this.scoreSabari = 0;
      this.scoreRonaldo = 0;
      this.matchTime = 60;
      this.isRunning = false;
      this.timerInterval = null;
      this.goalCooldown = 0;
      this.keys = {};

      this.ball = {
        x: 450,
        y: 220,
        vx: 0,
        vy: 0,
        radius: 8,
        owner: null,
        lastKicker: null,
        kickingCooldown: 0
      };

      this.sabari = {
        name: "SABARI",
        number: 10,
        x: 320,
        y: 220,
        facingX: 1,
        facingY: 0,
        speed: 1.8,
        sprintSpeed: 2.5,
        color: "#1e3a8a",
        radius: 14,
        isUser: true
      };

      this.messi = {
        name: "MESSI",
        number: 10,
        x: 370,
        y: 150,
        facingX: 1,
        facingY: 0,
        speed: 1.45,
        color: "#75aadb",
        radius: 14
      };

      this.gkSabari = { x: 42, y: 220, vy: 1.0, color: "#059669", radius: 13 };

      this.ronaldo = {
        name: "RONALDO",
        number: 7,
        x: 560,
        y: 220,
        facingX: -1,
        facingY: 0,
        speed: 1.2,
        color: "#dc2626",
        radius: 14
      };

      this.gkRonaldo = { x: 840, y: 220, vy: 0.85, color: "#d97706", radius: 13 };
      this.kickoffGrace = 120;
      this.ronaldoTackleTimer = 0;

      // Auto-detect if user is on mobile screen in portrait orientation
      this.isVertical = (window.innerWidth <= 768 && window.innerHeight > window.innerWidth);

      this.initEvents();
    }

    toggleOrientation() {
      this.isVertical = !this.isVertical;
      this.updateOrientationBtn();
      this.resize();
      this.resetPositions('sabari');
      const mode = this.isVertical ? "Vertical Pitch View ↕️ (Mobile Arcade)" : "Horizontal Pitch View ↔️ (Stadium)";
      this.showMoment(`SWITCHED TO ${mode}`, "Goals and controls perfectly aligned!");
    }

    updateOrientationBtn() {
      const text = document.getElementById('orientationBtnText');
      if (text) {
        text.textContent = this.isVertical ? 'Horizontal View ↔️' : 'Vertical View ↕️';
      }
      const wrapper = document.querySelector('.match-arena-wrapper');
      if (wrapper) {
        wrapper.classList.toggle('vertical-pitch-mode', this.isVertical);
      }
    }

    initEvents() {
      window.addEventListener('keydown', (e) => {
        this.keys[e.key.toLowerCase()] = true;
        this.keys[e.code] = true;

        if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) {
          if (this.badgeMove) this.badgeMove.classList.add('pressed');
        }
        if (e.code === 'Space' || e.key.toLowerCase() === 'j') {
          if (this.badgeShoot) this.badgeShoot.classList.add('pressed');
          const btn = document.getElementById('mobShootBtn');
          if (btn) btn.classList.add('active');
        }
        if (e.key.toLowerCase() === 'k') {
          if (this.badgePass) this.badgePass.classList.add('pressed');
          const btn = document.getElementById('mobPassBtn');
          if (btn) btn.classList.add('active');
        }
        if (e.key.toLowerCase() === 'l') {
          if (this.badgeTackle) this.badgeTackle.classList.add('pressed');
          const btn = document.getElementById('mobTackleBtn');
          if (btn) btn.classList.add('active');
        }
        if (e.key.toLowerCase() === 'shift') {
          if (this.badgeSprint) this.badgeSprint.classList.add('pressed');
        }

        if (this.isRunning && this.goalCooldown <= 0) {
          if (e.code === 'Space' || e.key.toLowerCase() === 'j') {
            e.preventDefault();
            this.playerShoot();
          }
          if (e.key.toLowerCase() === 'k') {
            e.preventDefault();
            this.playerPassToMessi();
          }
          if (e.key.toLowerCase() === 'l') {
            e.preventDefault();
            this.playerTackle();
          }
        }
      });

      window.addEventListener('keyup', (e) => {
        this.keys[e.key.toLowerCase()] = false;
        this.keys[e.code] = false;

        if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(e.key.toLowerCase())) {
          if (this.badgeMove) this.badgeMove.classList.remove('pressed');
        }
        if (e.code === 'Space' || e.key.toLowerCase() === 'j') {
          if (this.badgeShoot) this.badgeShoot.classList.remove('pressed');
          const btn = document.getElementById('mobShootBtn');
          if (btn) btn.classList.remove('active');
        }
        if (e.key.toLowerCase() === 'k') {
          if (this.badgePass) this.badgePass.classList.remove('pressed');
          const btn = document.getElementById('mobPassBtn');
          if (btn) btn.classList.remove('active');
        }
        if (e.key.toLowerCase() === 'l') {
          if (this.badgeTackle) this.badgeTackle.classList.remove('pressed');
          const btn = document.getElementById('mobTackleBtn');
          if (btn) btn.classList.remove('active');
        }
        if (e.key.toLowerCase() === 'shift') {
          if (this.badgeSprint) this.badgeSprint.classList.remove('pressed');
        }
      });

      // Mobile Touch & Click Virtual D-Pad
      document.querySelectorAll('.dpad-btn').forEach((btn) => {
        const dir = btn.dataset.dir;
        const startMove = (e) => {
          if (e && e.cancelable) e.preventDefault();
          this.keys[dir] = true;
          btn.classList.add('active');
        };
        const endMove = (e) => {
          if (e && e.cancelable) e.preventDefault();
          this.keys[dir] = false;
          btn.classList.remove('active');
        };
        btn.addEventListener('touchstart', startMove, { passive: false });
        btn.addEventListener('touchend', endMove, { passive: false });
        btn.addEventListener('touchcancel', endMove, { passive: false });
        btn.addEventListener('mousedown', startMove);
        btn.addEventListener('mouseup', endMove);
        btn.addEventListener('mouseleave', endMove);
      });

      const bindTouchAction = (id, action) => {
        const el = document.getElementById(id);
        if (el) {
          el.addEventListener('touchstart', (e) => {
            if (e && e.cancelable) e.preventDefault();
            action();
          }, { passive: false });
          el.onclick = (e) => {
            if (e && e.cancelable) e.preventDefault();
            action();
          };
        }
      };

      bindTouchAction('mobShootBtn', () => this.playerShoot());
      bindTouchAction('mobPassBtn', () => this.playerPassToMessi());
      bindTouchAction('mobTackleBtn', () => this.playerTackle());

      const orientationBtn = document.getElementById('toggleOrientationBtn');
      if (orientationBtn) {
        orientationBtn.onclick = (e) => {
          if (e && e.cancelable) e.preventDefault();
          audio.playClick();
          this.toggleOrientation();
        };
      }

      const finishBtn = document.getElementById('finishMatchEarlyBtn');
      if (finishBtn) {
        finishBtn.onclick = () => {
          audio.playClick();
          this.finishMatch();
        };
      }

      // Direct Touch & Drag Steering & Aiming on Football Pitch Canvas
      const getCanvasCoords = (e) => {
        const rect = this.canvas.getBoundingClientRect();
        const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
        const x = (clientX - rect.left) * (this.canvas.width / rect.width);
        const y = (clientY - rect.top) * (this.canvas.height / rect.height);
        return { x, y };
      };

      let lastTapTime = 0;

      const handlePitchTouch = (e) => {
        if (!this.isRunning) return;
        if (e && e.cancelable) e.preventDefault();
        const coords = getCanvasCoords(e);
        this.touchTarget = coords;

        // Double-tap on canvas to shoot towards tapped point
        const now = performance.now();
        if (now - lastTapTime < 320 && this.ball.owner === this.sabari) {
          this.playerShootAt(coords.x, coords.y);
          this.touchTarget = null;
        }
        lastTapTime = now;
      };

      const handlePitchTouchMove = (e) => {
        if (!this.isRunning) return;
        if (e && e.cancelable) e.preventDefault();
        this.touchTarget = getCanvasCoords(e);
      };

      const handlePitchEnd = () => {
        this.touchTarget = null;
      };

      this.canvas.addEventListener('touchstart', handlePitchTouch, { passive: false });
      this.canvas.addEventListener('touchmove', handlePitchTouchMove, { passive: false });
      this.canvas.addEventListener('touchend', handlePitchEnd, { passive: false });
      this.canvas.addEventListener('touchcancel', handlePitchEnd, { passive: false });

      this.canvas.addEventListener('mousedown', (e) => {
        handlePitchTouch(e);
        const moveHandler = (ev) => handlePitchTouchMove(ev);
        const upHandler = () => {
          handlePitchEnd();
          window.removeEventListener('mousemove', moveHandler);
          window.removeEventListener('mouseup', upHandler);
        };
        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('mouseup', upHandler);
      });

      window.addEventListener('resize', () => {
        if (this.isRunning) {
          this.resize();
        }
      });
    }

    start() {
      this._lastTime = performance.now();
      this.resize();
      this.resetPositions('sabari');
      this.isRunning = true;
      this.goalCooldown = 0;

      audio.playWhistle();
      audio.playCrowdRoar(2.0);

      if (this.timerInterval) clearInterval(this.timerInterval);
      this.timerInterval = setInterval(() => {
        if (!this.isRunning) return;
        this.matchTime--;
        if (this.timerEl) this.timerEl.textContent = `${this.matchTime}s`;
        if (this.matchTime <= 0) {
          this.finishMatch();
        }
      }, 1000);

      this.gameLoop();
    }

    resize() {
      const parent = this.canvas.parentElement;
      const isMobile = window.innerWidth <= 768;

      if (this.isVertical) {
        const parentW = (parent && parent.clientWidth) || window.innerWidth;
        const w = Math.min(640, Math.max(320, parentW));
        // Fill the vertical space nicely so there is no large empty bottom gap
        const availableH = window.innerHeight - 240;
        const h = Math.min(540, Math.max(390, availableH));
        this.canvas.width = Math.max(280, Math.floor(w));
        this.canvas.height = Math.max(360, Math.floor(h));
        this.canvas.style.height = `${Math.floor(h)}px`;
      } else {
        const w = (parent && parent.clientWidth) || window.innerWidth || 800;
        let h = 380;
        if (isMobile) {
          h = Math.min(320, Math.max(240, window.innerHeight * 0.36));
        }
        this.canvas.width = Math.max(300, Math.floor(w));
        this.canvas.height = Math.max(220, Math.floor(h));
        this.canvas.style.height = `${Math.floor(h)}px`;
      }
    }

    resetPositions(whoStarts = 'sabari') {
      const midX = this.canvas.width / 2;
      const midY = this.canvas.height / 2;

      this.ball.vx = 0;
      this.ball.vy = 0;
      this.ball.lastKicker = null;
      this.ball.kickingCooldown = 0;
      this.kickoffGrace = 120;
      this.ronaldoTackleTimer = 0;

      if (this.isVertical) {
        const spreadY = Math.min(65, this.canvas.height * 0.16);

        // Sabari (Team Argentina) starts bottom half, attacks UPWARDS
        this.sabari.x = midX;
        this.sabari.y = midY + spreadY;
        this.sabari.facingX = 0;
        this.sabari.facingY = -1;

        // Messi flanks to the left/upper
        this.messi.x = Math.max(45, midX - Math.min(70, this.canvas.width * 0.25));
        this.messi.y = midY + spreadY * 0.45;
        this.messi.facingX = 0;
        this.messi.facingY = -1;

        // Ronaldo starts top half, attacks DOWNWARDS
        this.ronaldo.x = midX;
        this.ronaldo.y = midY - spreadY;
        this.ronaldo.facingX = 0;
        this.ronaldo.facingY = 1;

        if (whoStarts === 'sabari') {
          this.ball.owner = this.sabari;
          this.ball.x = this.sabari.x;
          this.ball.y = this.sabari.y - 14;
        } else {
          this.ball.owner = this.ronaldo;
          this.ball.x = this.ronaldo.x;
          this.ball.y = this.ronaldo.y + 14;
        }

        // GK Sabari guards bottom net
        this.gkSabari.x = midX;
        this.gkSabari.y = this.canvas.height - 28;
        this.gkSabari.vx = 1.0;
        this.gkSabari.vy = 0;

        // GK Ronaldo guards top net
        this.gkRonaldo.x = midX;
        this.gkRonaldo.y = 28;
        this.gkRonaldo.vx = 0.85;
        this.gkRonaldo.vy = 0;
      } else {
        const spreadX = Math.min(80, this.canvas.width * 0.2);

        this.sabari.x = midX - spreadX;
        this.sabari.y = midY;
        this.sabari.facingX = 1;
        this.sabari.facingY = 0;

        this.messi.x = midX - spreadX * 0.55;
        this.messi.y = Math.max(35, midY - Math.min(60, this.canvas.height * 0.28));
        this.messi.facingX = 1;
        this.messi.facingY = 0;

        this.ronaldo.x = midX + spreadX;
        this.ronaldo.y = midY;
        this.ronaldo.facingX = -1;
        this.ronaldo.facingY = 0;

        if (whoStarts === 'sabari') {
          this.ball.owner = this.sabari;
          this.ball.x = this.sabari.x + 14;
          this.ball.y = this.sabari.y;
        } else {
          this.ball.owner = this.ronaldo;
          this.ball.x = this.ronaldo.x - 14;
          this.ball.y = this.ronaldo.y;
        }

        this.gkSabari.x = Math.max(26, Math.min(38, this.canvas.width * 0.08));
        this.gkSabari.y = midY;
        this.gkSabari.vy = 1.0;

        this.gkRonaldo.x = this.canvas.width - Math.max(26, Math.min(38, this.canvas.width * 0.08));
        this.gkRonaldo.y = midY;
        this.gkRonaldo.vy = 0.85;
      }
    }

    playerShoot() {
      if (this.isVertical) {
        const w = this.canvas.width;
        const targetX = (this.sabari.x < w / 2) ? (w / 2 + 25) : (w / 2 - 25);
        this.playerShootAt(targetX, 15);
      } else {
        const h = this.canvas.height;
        const targetY = (this.sabari.y < h / 2) ? (h / 2 + 30) : (h / 2 - 30);
        this.playerShootAt(this.canvas.width - 15, targetY);
      }
    }

    playerShootAt(targetX, targetY) {
      if (this.ball.owner === this.sabari) {
        audio.playKick();
        this.ball.owner = null;

        const w = this.canvas.width;
        const h = this.canvas.height;

        let tx = targetX;
        let ty = targetY;

        if (this.isVertical) {
          if (tx === null || tx === undefined) {
            if (this.keys['a'] || this.keys['arrowleft'] || this.keys['left']) {
              tx = w / 2 - 30;
            } else if (this.keys['d'] || this.keys['arrowright'] || this.keys['right']) {
              tx = w / 2 + 30;
            } else {
              tx = (this.sabari.x < w / 2) ? (w / 2 + 25) : (w / 2 - 25);
            }
          }
          if (ty === null || ty === undefined) ty = 15;
        } else {
          if (tx === null || tx === undefined) tx = w - 15;
          if (ty === null || ty === undefined) {
            if (this.keys['w'] || this.keys['arrowup'] || this.keys['up']) {
              ty = h / 2 - 32;
            } else if (this.keys['s'] || this.keys['arrowdown'] || this.keys['down']) {
              ty = h / 2 + 32;
            } else {
              ty = (this.sabari.y < h / 2) ? (h / 2 + 28) : (h / 2 - 28);
            }
          }
        }

        const dx = tx - this.sabari.x;
        const dy = ty - this.sabari.y;
        const dist = Math.hypot(dx, dy) || 1;

        this.ball.vx = (dx / dist) * 5.8;
        this.ball.vy = (dy / dist) * 5.8;
        this.ball.lastKicker = this.sabari;
        this.ball.kickingCooldown = 25;

        this.showMoment("SABARI POWER SHOT! ⚽🚀", "Targeting the corner of Ronaldo's net!");
      }
    }

    playerPassToMessi() {
      if (this.ball.owner === this.sabari) {
        audio.playPass();
        this.ball.owner = null;

        // Lead pass: aim ahead of Messi's movement direction so he can run onto it
        const leadDistance = 28;
        const targetX = this.messi.x + (this.messi.facingX || 0) * leadDistance;
        const targetY = this.messi.y + (this.messi.facingY || 0) * leadDistance;
        const dx = targetX - this.sabari.x;
        const dy = targetY - this.sabari.y;
        const dist = Math.hypot(dx, dy) || 1;

        // Higher pass speed so it reaches Messi before Ronaldo can intercept
        this.ball.vx = (dx / dist) * 5.8;
        this.ball.vy = (dy / dist) * 5.8;
        this.ball.lastKicker = this.sabari;
        this.ball.kickingCooldown = 18;

        this.showMoment("SABARI PASSES TO MESSI! ⚽✨", "Tiki-taka connection with the Argentine maestro!");
      }
    }

    playerTackle() {
      audio.playTackle();
      const boostX = this.isVertical ? (this.sabari.facingX * 6) : (this.sabari.facingX * 8);
      const boostY = this.isVertical ? (this.sabari.facingY * 8) : (this.sabari.facingY * 8);
      this.sabari.x = Math.max(30, Math.min(this.canvas.width - 30, this.sabari.x + boostX));
      this.sabari.y = Math.max(30, Math.min(this.canvas.height - 30, this.sabari.y + boostY));

      const dist = Math.hypot(this.sabari.x - this.ronaldo.x, this.sabari.y - this.ronaldo.y);
      if (dist < 65 && this.ball.owner === this.ronaldo) {
        this.ball.owner = this.sabari;
        this.ball.lastKicker = this.sabari;
        this.ball.kickingCooldown = 0;
        this.ronaldoTackleTimer = 0;
        audio.playCrowdRoar(1.5);
        this.showMoment("CLEAN SLIDE TACKLE BY SABARI! 🛡️⚡", "Dispossesses Ronaldo in style!");
      }
    }

    showMoment(title, sub) {
      if (!this.momentTitle || !this.momentSub || !this.momentBanner) return;
      this.momentTitle.textContent = title;
      this.momentSub.textContent = sub;
      this.momentBanner.classList.add('show');
      clearTimeout(this._momentTimeout);
      this._momentTimeout = setTimeout(() => {
        this.momentBanner.classList.remove('show');
      }, 1600);
    }

    update(step = 1) {
      if (!this.isRunning) return;

      const w = this.canvas.width;
      const h = this.canvas.height;

      // Handle goal celebration freeze
      if (this.goalCooldown > 0) {
        this.goalCooldown -= step;
        if (this.goalCooldown <= 0) {
          this.goalCooldown = 0;
          this.resetPositions('sabari');
        }
        return;
      }

      // Decrement kicking cooldown
      if (this.ball.kickingCooldown > 0) {
        this.ball.kickingCooldown -= step;
      }
      if (this.kickoffGrace > 0) {
        this.kickoffGrace -= step;
      }

      // User Player (Sabari) Movement
      const isSprinting = this.keys['shift'] || this.keys['ShiftLeft'] || this.keys['ShiftRight'];
      const speed = (isSprinting ? this.sabari.sprintSpeed : this.sabari.speed);

      let moveX = 0;
      let moveY = 0;

      if (this.touchTarget) {
        const dx = this.touchTarget.x - this.sabari.x;
        const dy = this.touchTarget.y - this.sabari.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 8) {
          moveX = dx / dist;
          moveY = dy / dist;
        }
      } else {
        if (this.keys['w'] || this.keys['arrowup'] || this.keys['up']) moveY -= 1;
        if (this.keys['s'] || this.keys['arrowdown'] || this.keys['down']) moveY += 1;
        if (this.keys['a'] || this.keys['arrowleft'] || this.keys['left']) moveX -= 1;
        if (this.keys['d'] || this.keys['arrowright'] || this.keys['right']) moveX += 1;

        if (moveX !== 0 && moveY !== 0) {
          moveX *= 0.707;
          moveY *= 0.707;
        }
      }

      if (moveX !== 0 || moveY !== 0) {
        this.sabari.facingX = moveX > 0 ? 1 : (moveX < 0 ? -1 : 0);
        this.sabari.facingY = moveY > 0 ? 1 : (moveY < 0 ? -1 : 0);
      }

      this.sabari.x = Math.max(30, Math.min(w - 30, this.sabari.x + moveX * speed * step));
      this.sabari.y = Math.max(30, Math.min(h - 30, this.sabari.y + moveY * speed * step));

      // MESSI AI PARTNER
      if (this.isVertical) {
        const messiShootY = Math.max(50, Math.min(110, h * 0.26));
        if (this.ball.owner === this.messi) {
          this.messi.facingX = 0;
          this.messi.facingY = -1;
          this.messi.y -= 1.3 * step;

          if (this.messi.y < messiShootY) {
            audio.playKick();
            this.ball.owner = null;
            const targetX = w / 2 + (Math.random() > 0.5 ? -25 : 25);
            const dx = targetX - this.messi.x;
            const dy = 16 - this.messi.y;
            const dist = Math.hypot(dx, dy) || 1;
            this.ball.vx = (dx / dist) * 5.2;
            this.ball.vy = (dy / dist) * 5.2;
            this.ball.lastKicker = this.messi;
            this.ball.kickingCooldown = 25;
            this.showMoment("MESSI CURLER! GOLAZO THREAT! 🇦🇷🔥", "Unbelievable finesse from the Argentine GOAT!");
          } else if (this.sabari.y < this.messi.y - 40 && this.sabari.y > 60 && this.messi.y > h * 0.45) {
            // Only pass back if Sabari is well ahead AND Messi is not yet in shooting range
            audio.playPass();
            this.ball.owner = null;
            const dx = this.sabari.x - this.messi.x;
            const dy = (this.sabari.y - 12) - this.messi.y;
            const dist = Math.hypot(dx, dy) || 1;
            this.ball.vx = (dx / dist) * 4.8;
            this.ball.vy = (dy / dist) * 4.8;
            this.ball.lastKicker = this.messi;
            this.ball.kickingCooldown = 18;
            this.showMoment("MESSI PASS TO SABARI! ⚽✨", "Take the shot, Sabari! The goal is in sight!");
          }
        } else if (this.ball.owner === this.sabari) {
          const targetX = this.sabari.x < w / 2 ? w * 0.75 : w * 0.25;
          const targetY = Math.max(65, this.sabari.y - Math.min(65, h * 0.18));
          this.messi.x += (targetX - this.messi.x) * 0.03 * step;
          this.messi.y += (targetY - this.messi.y) * 0.03 * step;
          this.messi.facingY = -1;
        } else {
          const dx = this.ball.x - this.messi.x;
          const dy = this.ball.y - this.messi.y;
          const dist = Math.hypot(dx, dy) || 1;
          this.messi.x += (dx / dist) * 1.35 * step;
          this.messi.y += (dy / dist) * 1.35 * step;
          this.messi.facingY = dy <= 0 ? -1 : 1;
        }
      } else {
        const messiShootX = Math.min(w - 65, Math.max(w - 120, w * 0.72));
        if (this.ball.owner === this.messi) {
          this.messi.facingX = 1;
          this.messi.facingY = 0;
          this.messi.x += 1.3 * step;

          if (this.messi.x > messiShootX) {
            audio.playKick();
            this.ball.owner = null;
            const targetY = h / 2 + (Math.random() > 0.5 ? -28 : 28);
            const dx = (w - 18) - this.messi.x;
            const dy = targetY - this.messi.y;
            const dist = Math.hypot(dx, dy) || 1;
            this.ball.vx = (dx / dist) * 5.2;
            this.ball.vy = (dy / dist) * 5.2;
            this.ball.lastKicker = this.messi;
            this.ball.kickingCooldown = 25;
            this.showMoment("MESSI CURLER! GOLAZO THREAT! 🇦🇷🔥", "Unbelievable finesse from the Argentine GOAT!");
          } else if (this.sabari.x > this.messi.x + 40 && this.sabari.x < w - 60 && this.messi.x < w * 0.55) {
            // Only pass back if Sabari is well ahead AND Messi is not yet in shooting range
            audio.playPass();
            this.ball.owner = null;
            const dx = (this.sabari.x + 12) - this.messi.x;
            const dy = this.sabari.y - this.messi.y;
            const dist = Math.hypot(dx, dy) || 1;
            this.ball.vx = (dx / dist) * 4.8;
            this.ball.vy = (dy / dist) * 4.8;
            this.ball.lastKicker = this.messi;
            this.ball.kickingCooldown = 18;
            this.showMoment("MESSI PASS TO SABARI! ⚽✨", "Take the shot, Sabari! The goal is in sight!");
          }
        } else if (this.ball.owner === this.sabari) {
          const targetX = Math.min(w - 85, this.sabari.x + Math.min(75, w * 0.22));
          const targetY = this.sabari.y < h / 2 ? h * 0.72 : h * 0.28;
          this.messi.x += (targetX - this.messi.x) * 0.03 * step;
          this.messi.y += (targetY - this.messi.y) * 0.03 * step;
          this.messi.facingX = 1;
        } else {
          const dx = this.ball.x - this.messi.x;
          const dy = this.ball.y - this.messi.y;
          const dist = Math.hypot(dx, dy) || 1;
          this.messi.x += (dx / dist) * 1.35 * step;
          this.messi.y += (dy / dist) * 1.35 * step;
          this.messi.facingX = dx >= 0 ? 1 : -1;
        }
      }

      // CRISTIANO RONALDO AI OPPONENT
      if (this.isVertical) {
        const ronaldoShootY = Math.min(h - 50, Math.max(h - 110, h * 0.74));
        if (this.kickoffGrace > 0) {
          this.ronaldo.facingY = 1;
        } else if (this.ball.owner === this.ronaldo) {
          this.ronaldo.facingX = 0;
          this.ronaldo.facingY = 1;
          this.ronaldo.y += 1.0 * step;

          if (this.ronaldo.y > ronaldoShootY) {
            audio.playKick();
            this.ball.owner = null;
            const targetX = w / 2 + (Math.random() * 40 - 20);
            const dx = targetX - this.ronaldo.x;
            const dy = (h - 16) - this.ronaldo.y;
            const dist = Math.hypot(dx, dy) || 1;
            this.ball.vx = (dx / dist) * 4.5;
            this.ball.vy = (dy / dist) * 4.5;
            this.ball.lastKicker = this.ronaldo;
            this.ball.kickingCooldown = 25;
            this.showMoment("RONALDO STRIKE! 🇵🇹💥", "Ronaldo shoots! Defend the goal!");
          }
        } else {
          const dx = this.ball.x - this.ronaldo.x;
          const dy = this.ball.y - this.ronaldo.y;
          const dist = Math.hypot(dx, dy) || 1;
          this.ronaldo.x += (dx / dist) * 1.15 * step;
          this.ronaldo.y += (dy / dist) * 1.15 * step;
          this.ronaldo.facingY = dy <= 0 ? -1 : 1;

          if (dist < 26 && this.ball.owner === this.sabari) {
            this.ronaldoTackleTimer += step;
            if (this.ronaldoTackleTimer > 120) {
              this.ball.owner = this.ronaldo;
              this.ball.lastKicker = this.ronaldo;
              this.ball.kickingCooldown = 0;
              this.ronaldoTackleTimer = 0;
              this.showMoment("RONALDO INTERCEPTION!", "Watch out! Ronaldo on the counter!");
            }
          } else {
            this.ronaldoTackleTimer = Math.max(0, this.ronaldoTackleTimer - step * 0.5);
          }
        }
      } else {
        const ronaldoShootX = Math.max(50, Math.min(95, w * 0.22));
        if (this.kickoffGrace > 0) {
          this.ronaldo.facingX = -1;
        } else if (this.ball.owner === this.ronaldo) {
          this.ronaldo.facingX = -1;
          this.ronaldo.facingY = 0;
          this.ronaldo.x -= 1.0 * step;

          if (this.ronaldo.x < ronaldoShootX) {
            audio.playKick();
            this.ball.owner = null;
            const targetY = h / 2 + (Math.random() * 40 - 20);
            const dx = 18 - this.ronaldo.x;
            const dy = targetY - this.ronaldo.y;
            const dist = Math.hypot(dx, dy) || 1;
            this.ball.vx = (dx / dist) * 4.5;
            this.ball.vy = (dy / dist) * 4.5;
            this.ball.lastKicker = this.ronaldo;
            this.ball.kickingCooldown = 25;
            this.showMoment("RONALDO STRIKE! 🇵🇹💥", "Ronaldo shoots! Defend the goal!");
          }
        } else {
          const dx = this.ball.x - this.ronaldo.x;
          const dy = this.ball.y - this.ronaldo.y;
          const dist = Math.hypot(dx, dy) || 1;
          this.ronaldo.x += (dx / dist) * 1.15 * step;
          this.ronaldo.y += (dy / dist) * 1.15 * step;
          this.ronaldo.facingX = dx >= 0 ? 1 : -1;

          if (dist < 26 && this.ball.owner === this.sabari) {
            this.ronaldoTackleTimer += step;
            if (this.ronaldoTackleTimer > 120) {
              this.ball.owner = this.ronaldo;
              this.ball.lastKicker = this.ronaldo;
              this.ball.kickingCooldown = 0;
              this.ronaldoTackleTimer = 0;
              this.showMoment("RONALDO INTERCEPTION!", "Watch out! Ronaldo on the counter!");
            }
          } else {
            this.ronaldoTackleTimer = Math.max(0, this.ronaldoTackleTimer - step * 0.5);
          }
        }
      }

      // If Sabari runs close to Ronaldo while Ronaldo has the ball, Sabari auto-wins it!
      if (this.ball.owner === this.ronaldo) {
        const distSabariToRonaldo = Math.hypot(this.sabari.x - this.ronaldo.x, this.sabari.y - this.ronaldo.y);
        if (distSabariToRonaldo < 28) {
          this.ball.owner = this.sabari;
          this.ball.lastKicker = this.sabari;
          this.ball.kickingCooldown = 0;
          this.ronaldoTackleTimer = 0;
          audio.playCrowdRoar(1.2);
          this.showMoment("SABARI WINS THE BALL! ⚽⚡", "Brilliant ball retrieval by Sabari!");
        }
      }

      // GOALKEEPERS
      if (this.isVertical) {
        const gkSabariTargetX = Math.max(w / 2 - 35, Math.min(w / 2 + 35, this.ball.x));
        this.gkSabari.x += (gkSabariTargetX - this.gkSabari.x) * 0.05 * step;

        const gkRonaldoTargetX = Math.max(w / 2 - 35, Math.min(w / 2 + 35, this.ball.x));
        this.gkRonaldo.x += (gkRonaldoTargetX - this.gkRonaldo.x) * 0.045 * step;
      } else {
        const gkSabariTargetY = Math.max(h / 2 - 35, Math.min(h / 2 + 35, this.ball.y));
        this.gkSabari.y += (gkSabariTargetY - this.gkSabari.y) * 0.05 * step;

        const gkRonaldoTargetY = Math.max(h / 2 - 35, Math.min(h / 2 + 35, this.ball.y));
        this.gkRonaldo.y += (gkRonaldoTargetY - this.gkRonaldo.y) * 0.045 * step;
      }

      // BALL PHYSICS & DRIBBLE CONTROL
      if (this.ball.owner) {
        const p = this.ball.owner;
        const facingX = p.facingX !== undefined ? p.facingX : 0;
        const facingY = p.facingY !== undefined ? p.facingY : 0;
        const lead = p.radius + 6;
        this.ball.x = p.x + facingX * lead;
        this.ball.y = p.y + facingY * lead;
        this.ball.vx = 0;
        this.ball.vy = 0;
      } else {
        this.ball.x += this.ball.vx * step;
        this.ball.y += this.ball.vy * step;
        const friction = Math.pow(0.978, step);
        this.ball.vx *= friction;
        this.ball.vy *= friction;

        // Ball Pickup Check: Generous magnet margin for Sabari (22px), good for Messi (18px)
        const players = [this.sabari, this.messi, this.ronaldo];
        for (const p of players) {
          if (p === this.ball.lastKicker && this.ball.kickingCooldown > 0) {
            continue;
          }
          const pickupMargin = (p === this.sabari) ? 22 : (p === this.messi) ? 18 : 4;
          const d = Math.hypot(p.x - this.ball.x, p.y - this.ball.y);
          if (d < p.radius + this.ball.radius + pickupMargin) {
            this.ball.owner = p;
            this.ball.lastKicker = null;
            this.ball.kickingCooldown = 0;
            this.ball.vx = 0;
            this.ball.vy = 0;
            break;
          }
        }

        // Goalkeeper Parries / Saves
        if (this.isVertical) {
          if (Math.hypot(this.gkRonaldo.x - this.ball.x, this.gkRonaldo.y - this.ball.y) < 24) {
            audio.playSave();
            this.ball.vy = 3.8;
            this.ball.vx = (Math.random() * 2.5 - 1.25);
            this.ball.lastKicker = this.gkRonaldo;
            this.ball.kickingCooldown = 15;
            this.showMoment("GOALKEEPER PUSHES IT AWAY! 🧤", "Keep pressing, Sabari!");
          }
          if (Math.hypot(this.gkSabari.x - this.ball.x, this.gkSabari.y - this.ball.y) < 24) {
            audio.playSave();
            this.ball.vy = -3.8;
            this.ball.vx = (Math.random() * 2.5 - 1.25);
            this.ball.lastKicker = this.gkSabari;
            this.ball.kickingCooldown = 15;
            this.showMoment("SABARI GK SAVE! 🧤", "Great goalkeeping!");
          }

          // GOAL DETECTION (Vertical: Sabari attacks Top Net, Ronaldo attacks Bottom Net)
          const goalXMin = w / 2 - Math.min(50, w * 0.22);
          const goalXMax = w / 2 + Math.min(50, w * 0.22);

          if (this.ball.y <= 24 && this.ball.x > goalXMin && this.ball.x < goalXMax) {
            this.scoreSabari++;
            if (this.scoreSabariEl) this.scoreSabariEl.textContent = this.scoreSabari;
            audio.playNetGoal();
            audio.playCrowdRoar(3.5);
            if (window.confetti) {
              window.confetti({ particleCount: 90, spread: 90, origin: { y: 0.5 } });
            }
            this.showMoment("GOLAZO! SABARI & MESSI SCORE! ⚽🔥", "Unbelievable strike into the top net!");
            this.goalCooldown = 85;
          }

          if (this.ball.y >= h - 24 && this.ball.x > goalXMin && this.ball.x < goalXMax) {
            this.scoreRonaldo++;
            if (this.scoreRonaldoEl) this.scoreRonaldoEl.textContent = this.scoreRonaldo;
            audio.playNetGoal();
            this.showMoment("RONALDO SCORES!", "Don't back down, Sabari! We fight back!");
            this.goalCooldown = 85;
          }
        } else {
          if (Math.hypot(this.gkRonaldo.x - this.ball.x, this.gkRonaldo.y - this.ball.y) < 24) {
            audio.playSave();
            this.ball.vx = -3.8;
            this.ball.vy = (Math.random() * 2.5 - 1.25);
            this.ball.lastKicker = this.gkRonaldo;
            this.ball.kickingCooldown = 15;
            this.showMoment("GOALKEEPER PUSHES IT AWAY! 🧤", "Keep pressing, Sabari!");
          }
          if (Math.hypot(this.gkSabari.x - this.ball.x, this.gkSabari.y - this.ball.y) < 24) {
            audio.playSave();
            this.ball.vx = 3.8;
            this.ball.vy = (Math.random() * 2.5 - 1.25);
            this.ball.lastKicker = this.gkSabari;
            this.ball.kickingCooldown = 15;
            this.showMoment("SABARI GK SAVE! 🧤", "Great goalkeeping!");
          }

          const goalYMin = h / 2 - Math.min(52, h * 0.25);
          const goalYMax = h / 2 + Math.min(52, h * 0.25);

          if (this.ball.x >= w - 24 && this.ball.y > goalYMin && this.ball.y < goalYMax) {
            this.scoreSabari++;
            if (this.scoreSabariEl) this.scoreSabariEl.textContent = this.scoreSabari;
            audio.playNetGoal();
            audio.playCrowdRoar(3.5);
            if (window.confetti) {
              window.confetti({ particleCount: 90, spread: 90, origin: { y: 0.6 } });
            }
            this.showMoment("GOLAZO! SABARI & MESSI SCORE! ⚽🔥", "Unbelievable strike! Lusail stadium erupts in celebration!");
            this.goalCooldown = 85;
          }

          if (this.ball.x <= 24 && this.ball.y > goalYMin && this.ball.y < goalYMax) {
            this.scoreRonaldo++;
            if (this.scoreRonaldoEl) this.scoreRonaldoEl.textContent = this.scoreRonaldo;
            audio.playNetGoal();
            this.showMoment("RONALDO SCORES!", "Don't back down, Sabari! We fight back!");
            this.goalCooldown = 85;
          }
        }

        // Pitch Boundary Rebounds — skip goal mouth areas so the ball can enter the net
        if (this.isVertical) {
          const goalXMin = w / 2 - Math.min(50, w * 0.22);
          const goalXMax = w / 2 + Math.min(50, w * 0.22);
          // Top/bottom walls: allow ball to pass through the goal mouth
          if (this.ball.y < 15 && (this.ball.x < goalXMin || this.ball.x > goalXMax)) this.ball.vy *= -0.65;
          if (this.ball.y > h - 15 && (this.ball.x < goalXMin || this.ball.x > goalXMax)) this.ball.vy *= -0.65;
          // Left/right sidelines always bounce
          if (this.ball.x < 15 || this.ball.x > w - 15) this.ball.vx *= -0.65;
        } else {
          const goalYMin = h / 2 - Math.min(52, h * 0.25);
          const goalYMax = h / 2 + Math.min(52, h * 0.25);
          // Left/right walls: allow ball to pass through the goal mouth
          if (this.ball.x < 15 && (this.ball.y < goalYMin || this.ball.y > goalYMax)) this.ball.vx *= -0.65;
          if (this.ball.x > w - 15 && (this.ball.y < goalYMin || this.ball.y > goalYMax)) this.ball.vx *= -0.65;
          // Top/bottom sidelines always bounce
          if (this.ball.y < 15 || this.ball.y > h - 15) this.ball.vy *= -0.65;
        }
      }
    }

    render() {
      const ctx = this.ctx;
      const w = this.canvas.width;
      const h = this.canvas.height;

      // Realistic Turf Grass
      ctx.fillStyle = '#15803d';
      ctx.fillRect(0, 0, w, h);

      if (this.isVertical) {
        // Horizontal pitch grass striping
        ctx.fillStyle = '#166534';
        for (let i = 0; i < h; i += 50) {
          if ((i / 50) % 2 === 0) ctx.fillRect(0, i, w, 50);
        }

        // Pitch White Lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 3;
        ctx.strokeRect(20, 20, w - 40, h - 40);

        // Center Line & Center Circle (Horizontal across midY)
        ctx.beginPath();
        ctx.moveTo(20, h / 2);
        ctx.lineTo(w - 20, h / 2);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 45, 0, Math.PI * 2);
        ctx.stroke();

        // Top Penalty Box (Ronaldo's goal)
        ctx.strokeRect(w / 2 - 65, 20, 130, 75);
        // Bottom Penalty Box (Sabari's goal)
        ctx.strokeRect(w / 2 - 65, h - 95, 130, 75);

        // Top Goal Net
        ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
        ctx.fillRect(w / 2 - 45, 2, 90, 18);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.strokeRect(w / 2 - 45, 2, 90, 18);

        // Bottom Goal Net
        ctx.fillStyle = 'rgba(255, 255, 255, 0.28)';
        ctx.fillRect(w / 2 - 45, h - 20, 90, 18);
        ctx.strokeRect(w / 2 - 45, h - 20, 90, 18);
      } else {
        // Vertical pitch grass striping
        ctx.fillStyle = '#166534';
        for (let i = 0; i < w; i += 60) {
          if ((i / 60) % 2 === 0) ctx.fillRect(i, 0, 60, h);
        }

        // Pitch White Lines
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 3;
        ctx.strokeRect(20, 20, w - 40, h - 40);

        // Center Line & Center Circle
        ctx.beginPath();
        ctx.moveTo(w / 2, 20);
        ctx.lineTo(w / 2, h - 20);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 50, 0, Math.PI * 2);
        ctx.stroke();

        // Penalty Boxes
        ctx.strokeRect(20, h / 2 - 70, 90, 140);
        ctx.strokeRect(w - 110, h / 2 - 70, 90, 140);

        // Goal Nets
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fillRect(0, h / 2 - 50, 20, 100);
        ctx.fillRect(w - 20, h / 2 - 50, 20, 100);
      }

      // Helper to draw players with shadows, numbers, direction indicators, and badges
      const drawPlayer = (p, label, isUser) => {
        ctx.save();

        // Player Drop Shadow
        ctx.beginPath();
        ctx.arc(p.x, p.y + 4, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0,0,0,0.45)';
        ctx.fill();

        // Direction indicator pointer
        const facingX = p.facingX || 1;
        const facingY = p.facingY || 0;
        ctx.beginPath();
        ctx.moveTo(p.x + facingX * (p.radius + 3), p.y + facingY * (p.radius + 3));
        ctx.lineTo(p.x + facingX * (p.radius + 8), p.y + facingY * (p.radius + 8));
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Player Circle Body
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Jersey Number
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.number || '', p.x, p.y);

        // Player Label
        ctx.font = 'bold 10px sans-serif';
        ctx.fillStyle = isUser ? '#fde047' : '#ffffff';
        ctx.fillText(label, p.x, p.y - 18);

        // User Selection Ring (Pulsing / Dashed)
        if (isUser) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 6, 0, Math.PI * 2);
          ctx.strokeStyle = '#fbbf24';
          ctx.lineWidth = 2.5;
          ctx.setLineDash([4, 4]);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        ctx.restore();
      };

      drawPlayer(this.sabari, "SABARI (YOU)", true);
      drawPlayer(this.messi, "MESSI 🇦🇷", false);
      drawPlayer(this.ronaldo, "RONALDO 🇵🇹", false);
      drawPlayer(this.gkSabari, "GK", false);
      drawPlayer(this.gkRonaldo, "GK", false);

      // Render Ball with 3D shadow and texture
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.ball.x, this.ball.y + 3, this.ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.fill();

      ctx.beginPath();
      ctx.arc(this.ball.x, this.ball.y, this.ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#0f172a';
      ctx.lineWidth = 1.8;
      ctx.stroke();

      // Ball pattern
      ctx.beginPath();
      ctx.arc(this.ball.x, this.ball.y, this.ball.radius * 0.45, 0, Math.PI * 2);
      ctx.fillStyle = '#1e293b';
      ctx.fill();
      ctx.restore();
    }

    gameLoop(timestamp) {
      if (!this.isRunning) return;
      if (!this._lastTime) this._lastTime = timestamp || performance.now();
      const now = timestamp || performance.now();
      const dt = Math.min((now - this._lastTime) / 1000, 0.05);
      this._lastTime = now;
      const step = Math.max(0.4, Math.min(1.5, dt * 60));

      this.update(step);
      this.render();
      requestAnimationFrame((t) => this.gameLoop(t));
    }

    finishMatch() {
      this.isRunning = false;
      if (this.timerInterval) clearInterval(this.timerInterval);

      audio.playWhistle();
      audio.playTrophyFanfare();
      audio.playCrowdRoar(3.0);

      if (this.onMatchFinished) {
        this.onMatchFinished(this.scoreSabari, this.scoreRonaldo);
      }
    }
  }

  /* ====================================================================
     3. MASTER STORY & SCENE MANAGER
     ==================================================================== */
  class StoryManager {
    constructor() {
      this.stadium3D = new Stadium3D();
      this.matchEngine = null;
      this.activeScene = 'intro';
      this.currentSlideIdx = 0;

      // Sequential labels for the HUD tracker
      this.sceneSteps = {
        'intro': 'Scene 1 of 5 • The Meeting',
        'tunnel': 'Scene 2 of 5 • Tunnel & Match Intro',
        'match': 'Scene 3 of 5 • Play Match',
        'slideshow': 'Scene 4 of 5 • Photo Memories & Squad',
        'promise': 'Scene 5 of 5 • Messi\'s Personal Promise',
        'finalscreen': 'Final Screen • Always a Champion'
      };

      this.loadStoredCustomPhotos();
      this.initHUD();
      this.initLoadingScreen();
      this.initPhotoUploadSystem();
    }

    initHUD() {
      const soundBtn = document.getElementById('soundToggleBtn');
      const soundIcon = document.getElementById('soundIcon');
      const soundText = document.getElementById('soundText');

      soundBtn.addEventListener('click', () => {
        const isMuted = audio.toggleMute();
        soundIcon.textContent = isMuted ? '🔇' : '🔊';
        soundText.textContent = isMuted ? 'Muted' : 'Sound On';
      });

      document.getElementById('replayBtn').addEventListener('click', () => {
        audio.playClick();
        audio.stopEmotionalPiano();
        this.switchScene('intro');
      });

      const hudUploadBtn = document.getElementById('uploadPhotoHudBtn');
      if (hudUploadBtn) {
        hudUploadBtn.addEventListener('click', () => {
          this.openPhotoUploadModal();
        });
      }

      const goToFinalBtn = document.getElementById('goToFinalScreenBtn');
      if (goToFinalBtn) {
        goToFinalBtn.addEventListener('click', () => {
          audio.playClick();
          this.switchScene('finalscreen');
        });
      }

      const finalReplayBtn = document.getElementById('finalScreenReplayBtn');
      if (finalReplayBtn) {
        finalReplayBtn.addEventListener('click', () => {
          audio.playClick();
          audio.stopEmotionalPiano();
          this.switchScene('intro');
        });
      }

      const finalCheerBtn = document.getElementById('finalScreenCheerBtn');
      if (finalCheerBtn) {
        finalCheerBtn.addEventListener('click', () => {
          audio.playCrowdRoar(2.5);
          audio.playSabariChant(3);
          if (window.confetti) {
            window.confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
          }
        });
      }
    }

    initLoadingScreen() {
      const progressFill = document.getElementById('progressFill');
      const startBtn = document.getElementById('startExperienceBtn');
      const statusText = document.getElementById('loadingStatusText');

      let progress = 0;
      const loadInterval = setInterval(() => {
        progress += 12;
        progressFill.style.width = `${progress}%`;
        if (progress === 48) statusText.textContent = "Summoning Lionel Messi & Cristiano Ronaldo...";
        if (progress === 84) statusText.textContent = "Preparing Stadium Turf for Sabari...";

        if (progress >= 100) {
          clearInterval(loadInterval);
          statusText.textContent = "Stadium Ready for the Match!";
          gsap.to(startBtn, { display: 'inline-block', opacity: 1, duration: 0.5 });
        }
      }, 100);

      startBtn.addEventListener('click', () => {
        audio.init();
        audio.playWhistle();
        audio.startStadiumAtmosphere();
        audio.startCinematicMusic();

        const loadingScreen = document.getElementById('loading-screen');
        gsap.to(loadingScreen, {
          opacity: 0,
          duration: 1.0,
          onComplete: () => {
            loadingScreen.style.display = 'none';
            this.playScene1();
          }
        });
      });
    }

    switchScene(sceneName) {
      // If aftermath is requested, bypass directly to memories/slideshow
      if (sceneName === 'aftermath') {
        this.switchScene('slideshow');
        return;
      }

      this.activeScene = sceneName;

      // Update non-clickable HUD sequential step pill
      const hudStepEl = document.getElementById('hudStoryStep');
      if (hudStepEl && this.sceneSteps[sceneName]) {
        hudStepEl.textContent = this.sceneSteps[sceneName];
      }

      document.querySelectorAll('.scene').forEach((s) => s.classList.remove('active'));
      const targetScene = document.getElementById(`scene-${sceneName}`);
      if (targetScene) targetScene.classList.add('active');

      this.stadium3D.setCameraForScene(sceneName);

      if (sceneName === 'intro') this.playScene1();
      if (sceneName === 'tunnel') this.playScene2();
      if (sceneName === 'match') this.playScene3();
      if (sceneName === 'slideshow') this.playScene5Slideshow();
      if (sceneName === 'promise') this.playScene6Promise();
      if (sceneName === 'finalscreen') this.playScene7FinalScreen();
    }

    /* ------------------------------------------------------------------
       LIP-SYNC & ANIMATED CUTOUT SPEECH HELPER
       ------------------------------------------------------------------ */
    setMessiSpeaking(speaking) {
      const ids = [
        'promiseMessiStage', 'promiseMessiCutout', 'blackoutMessiCutoutSvg',
        'mascotMascot', 'tunnelMessiCutout', 'aftermathMessiCutout',
        'preambleMessiCartoon', 'hugMessiCutout', 'finalMessiCutout'
      ];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          if (speaking) el.classList.add('speaking');
          else el.classList.remove('speaking');
        }
      });
      document.querySelectorAll('.messi-cutout-svg, .messi-cartoon, #messiVoiceEqualizer, #tunnelEqualizer, #aftermathEqualizer, #hugEqualizer').forEach((el) => {
        if (speaking) el.classList.add('speaking');
        else el.classList.remove('speaking');
      });
    }

    setRonaldoSpeaking(speaking) {
      const el = document.getElementById('tunnelRonaldoCutout');
      const eq = document.getElementById('tunnelRonaldoEqualizer');
      if (el) {
        if (speaking) el.classList.add('speaking');
        else el.classList.remove('speaking');
      }
      if (eq) {
        if (speaking) eq.classList.add('speaking');
        else eq.classList.remove('speaking');
      }
    }

    /* ------------------------------------------------------------------
       SCENE 1: MESSI ARRIVES
       ------------------------------------------------------------------ */
    playScene1() {
      const textEs = document.getElementById('introTextEs');
      const subEn = document.getElementById('introSubEn');
      const optionsBox = document.getElementById('introOptions');

      if (subEn) subEn.textContent = `"${config.dialogues.scene1.messiGreeting.en}"`;
      if (textEs) textEs.textContent = `"${config.dialogues.scene1.messiGreeting.es}"`;

      audio.speakSpanish(
        config.dialogues.scene1.messiGreeting.es,
        () => this.setMessiSpeaking(true),
        () => this.setMessiSpeaking(false)
      );

      optionsBox.innerHTML = `
        <button type="button" class="dialogue-btn primary" id="optLove">
          "¡Sí! I love football!" ⚽❤️
        </button>
        <button type="button" class="dialogue-btn" id="optReally">
          "Wait... Is that Messi?!" 😲
        </button>
      `;

      const proceedToPlay = () => {
        if (subEn) subEn.textContent = `"${config.dialogues.scene1.messiResponse.en}"`;
        if (textEs) textEs.textContent = `"${config.dialogues.scene1.messiResponse.es}"`;

        audio.speakSpanish(
          config.dialogues.scene1.messiResponse.es,
          () => this.setMessiSpeaking(true),
          () => this.setMessiSpeaking(false)
        );

        optionsBox.innerHTML = `
          <button type="button" class="dialogue-btn primary" id="btnGoTunnel">
            LET'S PLAY WITH MESSI! ⚽🔥
          </button>
        `;
        document.getElementById('btnGoTunnel').onclick = () => {
          audio.playClick();
          this.switchScene('tunnel');
        };
      };

      document.getElementById('optLove').onclick = () => {
        audio.playClick();
        proceedToPlay();
      };

      document.getElementById('optReally').onclick = () => {
        audio.playClick();
        proceedToPlay();
      };

      this.stadium3D.rollBallIn();
    }

    /* ------------------------------------------------------------------
       SCENE 2: THE STADIUM TUNNEL
       ------------------------------------------------------------------ */
    playScene2() {
      const textEs = document.getElementById('tunnelTextEs');
      const subEn = document.getElementById('tunnelSubEn');
      const speakerName = document.getElementById('tunnelSpeakerName');

      if (subEn) subEn.textContent = `"${config.dialogues.scene2.messiInvite.en}"`;
      if (textEs) textEs.textContent = `"${config.dialogues.scene2.messiInvite.es}"`;

      audio.speakSpanish(
        config.dialogues.scene2.messiInvite.es,
        () => this.setMessiSpeaking(true),
        () => this.setMessiSpeaking(false)
      );

      setTimeout(() => {
        if (speakerName) speakerName.textContent = "CRISTIANO RONALDO";
        if (subEn) subEn.textContent = `"${config.dialogues.scene2.ronaldoChallenge.en}"`;
        if (textEs) textEs.textContent = `"${config.dialogues.scene2.ronaldoChallenge.es}"`;
        audio.speakSpanish(
          config.dialogues.scene2.ronaldoChallenge.es,
          () => this.setRonaldoSpeaking(true),
          () => this.setRonaldoSpeaking(false)
        );
      }, 3500);

      document.getElementById('startMatchPitchBtn').onclick = () => {
        audio.playClick();
        this.switchScene('match');
      };
    }

    /* ------------------------------------------------------------------
       SCENE 3: PLAYABLE FOOTBALL MATCH
       ------------------------------------------------------------------ */
    playScene3() {
      if (!this.matchEngine) {
        this.matchEngine = new MatchGameEngine((scoreSabari, scoreRonaldo) => {
          // Directly move to memories/slideshow without the intermediate aftermath dialogue
          this.switchScene('slideshow');
        });
      }
      this.matchEngine.start();
    }

    /* ------------------------------------------------------------------
       SCENE 4: AFTER THE MATCH (BYPASSED)
       ------------------------------------------------------------------ */
    playScene4() {
      this.switchScene('slideshow');
    }

    /* ------------------------------------------------------------------
       SCENE 5: FULL-PAGE CINEMATIC SLIDESHOW (ALL PHOTOS IN ONE PLACE)
       ------------------------------------------------------------------ */
    playScene5Slideshow() {
      const photos = config.slideshowPhotos;
      const imgEl = document.getElementById('slideshowMainImg');
      const tagEl = document.getElementById('slideshowTag');
      const titleEl = document.getElementById('slideshowTitle');
      const msgEl = document.getElementById('slideshowMsg');
      const counterEl = document.getElementById('slideshowCounter');
      const dotsContainer = document.getElementById('slideshowDotsContainer');

      if (window.confetti) {
        window.confetti({ particleCount: 75, spread: 80, origin: { y: 0.4 } });
      }

      // Populate dot indicators
      dotsContainer.innerHTML = '';
      photos.forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = `slide-dot ${idx === 0 ? 'active' : ''}`;
        dot.onclick = () => {
          audio.playClick();
          this.renderSlide(idx);
        };
        dotsContainer.appendChild(dot);
      });

      if (!photos || photos.length === 0) {
        imgEl.style.opacity = '0';
        tagEl.textContent = 'Memories';
        titleEl.textContent = 'No Photos in Slideshow';
        msgEl.textContent = '"Click Add Photo above to add memories for Sabari, or restore default photos!"';
        counterEl.textContent = '0 Photos';
        const deleteBtn = document.getElementById('deleteCurrentPhotoBtn');
        if (deleteBtn) deleteBtn.style.display = 'none';
        return;
      }

      this.renderSlide = (index) => {
        if (!photos || photos.length === 0) return;
        this.currentSlideIdx = (index + photos.length) % photos.length;
        const current = photos[this.currentSlideIdx];

        // Smooth image crossfade
        imgEl.style.opacity = '0';
        setTimeout(() => {
          imgEl.src = current.image;
          tagEl.textContent = current.tag || 'Forever Squad';
          titleEl.textContent = current.title || 'Special Memory';
          msgEl.textContent = `"${current.message}"`;
          counterEl.textContent = `Photo ${this.currentSlideIdx + 1} of ${photos.length}`;
          imgEl.style.opacity = '1';

          // Prominent delete button: allows deleting ANY photo from the slideshow!
          const deleteBtn = document.getElementById('deleteCurrentPhotoBtn');
          if (deleteBtn) {
            deleteBtn.style.display = 'inline-flex';
            deleteBtn.onclick = () => {
              audio.playClick();
              this.deletePhoto(current.id);
            };
          }

          // Update active dot
          document.querySelectorAll('.slide-dot').forEach((d, i) => {
            d.classList.toggle('active', i === this.currentSlideIdx);
          });
        }, 180);
      };

      this.renderSlide(this.currentSlideIdx || 0);

      // Prev & Next Buttons
      document.getElementById('slidePrevBtn').onclick = () => {
        audio.playClick();
        this.renderSlide(this.currentSlideIdx - 1);
      };

      document.getElementById('slideNextBtn').onclick = () => {
        audio.playClick();
        this.renderSlide(this.currentSlideIdx + 1);
      };

      // Keyboard arrow keys for slideshow
      window.onkeydown = (e) => {
        if (this.activeScene === 'slideshow') {
          if (e.key === 'ArrowLeft') this.renderSlide(this.currentSlideIdx - 1);
          if (e.key === 'ArrowRight') this.renderSlide(this.currentSlideIdx + 1);
        }
      };

      document.getElementById('openUploadFromSlideshowBtn').onclick = () => {
        this.openPhotoUploadModal();
      };

      document.getElementById('goToPromiseFromSlideshowBtn').onclick = () => {
        audio.playClick();
        this.switchScene('promise');
      };
    }

    /* ------------------------------------------------------------------
       SCENE 6: FINAL ENDING — PERSONAL PROMISE (IN MESSI'S VOICE!)
       ------------------------------------------------------------------ */
    playScene6Promise() {
      const preambleStage = document.getElementById('promisePreambleStage');
      const blackoutScreen = document.getElementById('promiseBlackoutScreen');
      const returnStage = document.getElementById('stadiumReturnStage');

      preambleStage.style.display = 'flex';
      blackoutScreen.classList.remove('active');
      returnStage.style.display = 'none';

      // Soft emotional piano begins
      audio.startEmotionalPiano();
      audio.speakSpanish(
        config.dialogues.promise.messiStandBeside.es,
        () => this.setMessiSpeaking(true),
        () => this.setMessiSpeaking(false)
      );

      document.getElementById('startBlackoutPromiseBtn').onclick = () => {
        audio.playClick();
        preambleStage.style.display = 'none';
        blackoutScreen.classList.add('active');

        const promiseLines = config.dialogues.promise.lines;

        const activeSubEn = document.getElementById('activeSubTextEn');
        const activeSubEs = document.getElementById('activeSubTextEs');
        const subCounterBadge = document.getElementById('subCounterBadge');

        // Sequential Voice Playback & Line Reveals
        let lineIdx = 0;
        const playNextVoiceLine = () => {
          if (lineIdx >= promiseLines.length) {
            // All 8 lines spoken! Pause for a few seconds to let it sink in
            this.setMessiSpeaking(false);
            setTimeout(() => {
              gsap.to(blackoutScreen, {
                opacity: 0,
                duration: 1.2,
                onComplete: () => {
                  blackoutScreen.classList.remove('active');
                  blackoutScreen.style.opacity = '1';

                  // BRING BACK STADIUM LIGHTS WITH ROARING CROWD!
                  returnStage.style.display = 'flex';
                  this.stadium3D.igniteStadiumLights();
                  audio.playCrowdRoar(3.5);
                  audio.playSabariChant(4);

                  // Messi hugs Sabari and speaks farewell
                  setTimeout(() => {
                    audio.speakSpanish(
                      config.dialogues.promise.messiHugFarewell.es,
                      () => this.setMessiSpeaking(true),
                      () => this.setMessiSpeaking(false)
                    );
                  }, 1200);

                  if (window.confetti) {
                    window.confetti({ particleCount: 140, spread: 100, origin: { y: 0.5 } });
                  }
                }
              });
            }, 3200);
            return;
          }

          const currentLine = promiseLines[lineIdx];

          // Update Active Subtitle Cinema Box
          if (subCounterBadge) subCounterBadge.textContent = `PROMISE ${lineIdx + 1} OF ${promiseLines.length}`;
          if (activeSubEn) activeSubEn.textContent = currentLine.en;
          if (activeSubEs) activeSubEs.textContent = `"${currentLine.es}"`;

          // Speak line in Messi's Argentine Spanish voice with synchronized lip-sync
          audio.speakSpanish(
            currentLine.es,
            () => this.setMessiSpeaking(true),
            () => {
              this.setMessiSpeaking(false);
              lineIdx++;
              setTimeout(playNextVoiceLine, 500); // Gentle breathing pause between lines
            }
          );
        };

        // Start speaking line 0
        setTimeout(playNextVoiceLine, 800);
      };

      document.getElementById('goToFinalScreenBtn').onclick = () => {
        audio.playClick();
        this.switchScene('finalscreen');
      };
    }

    /* ------------------------------------------------------------------
       SCENE 7: THE FINAL SCREEN (UNTIL WE MEET, CHAMPION)
       ------------------------------------------------------------------ */
    playScene7FinalScreen() {
      audio.playTrophyFanfare();
      audio.playCrowdRoar(4.0);

      const replayBox = document.getElementById('finalReplayActionsBox');
      replayBox.style.display = 'none';

      // Confetti rain
      if (window.confetti) {
        const end = Date.now() + 5 * 1000;
        const colors = ['#fbbf24', '#75aadb', '#ffffff', '#3b82f6'];
        (function frame() {
          window.confetti({ particleCount: 3, angle: 60, spread: 55, origin: { x: 0 }, colors: colors });
          window.confetti({ particleCount: 3, angle: 120, spread: 55, origin: { x: 1 }, colors: colors });
          if (Date.now() < end) requestAnimationFrame(frame);
        }());
      }

      // Visible for AT LEAST 8 seconds before revealing actions
      setTimeout(() => {
        replayBox.style.display = 'flex';
        gsap.fromTo(replayBox, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 1.0 });
      }, 8500);

      document.getElementById('finalScreenReplayBtn').onclick = () => {
        audio.playClick();
        audio.stopEmotionalPiano();
        this.switchScene('intro');
      };

      document.getElementById('finalScreenCheerBtn').onclick = () => {
        audio.playCrowdRoar(2.5);
        audio.playSabariChant(3);
        if (window.confetti) {
          window.confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
        }
      };
    }

    /* ------------------------------------------------------------------
       PHOTO PERSISTENCE & TOAST NOTIFICATION HELPERS
       ------------------------------------------------------------------ */
    async loadStoredCustomPhotos() {
      if (!this._initialDefaultPhotos) {
        this._initialDefaultPhotos = JSON.parse(JSON.stringify(config.slideshowPhotos));
      }
      this.deletedDefaultIds = [];

      // 1. Read deleted defaults from localStorage
      try {
        const rawDel = localStorage.getItem('sabari_deleted_defaults_v1');
        if (rawDel) this.deletedDefaultIds = JSON.parse(rawDel) || [];
      } catch (e) {}

      // 2. Fetch deleted defaults from server disk API
      try {
        const resDel = await fetch('/api/deleted-defaults');
        if (resDel.ok) {
          const jsonDel = await resDel.json();
          if (jsonDel.success && Array.isArray(jsonDel.deletedIds)) {
            jsonDel.deletedIds.forEach((id) => {
              if (!this.deletedDefaultIds.includes(id)) this.deletedDefaultIds.push(id);
            });
          }
        }
      } catch (e) {}

      // Filter out deleted defaults from slideshow
      if (this.deletedDefaultIds.length > 0) {
        config.slideshowPhotos = config.slideshowPhotos.filter(
          (p) => !this.deletedDefaultIds.includes(p.id)
        );
      }

      // 3. Read custom photos from server disk API (permanent storage!)
      let serverCustomPhotos = [];
      try {
        const resPhotos = await fetch('/api/photos');
        if (resPhotos.ok) {
          const jsonPhotos = await resPhotos.json();
          if (jsonPhotos.success && Array.isArray(jsonPhotos.photos)) {
            serverCustomPhotos = jsonPhotos.photos;
          }
        }
      } catch (e) {}

      // 4. Read custom photos from localStorage fallback
      let localCustomPhotos = [];
      try {
        const rawLocal = localStorage.getItem('sabari_custom_photos_v1');
        if (rawLocal) localCustomPhotos = JSON.parse(rawLocal) || [];
      } catch (e) {}

      const mergedCustom = [...serverCustomPhotos];
      localCustomPhotos.forEach((lp) => {
        if (!mergedCustom.some((sp) => sp.id === lp.id)) {
          mergedCustom.push(lp);
        }
      });

      mergedCustom.forEach((cp) => {
        if (!config.slideshowPhotos.some((p) => p.id === cp.id)) {
          cp.isCustom = true;
          config.slideshowPhotos.unshift(cp);
        }
      });

      this.saveCustomPhotos();
      this.renderManagePhotosGrid();
    }

    saveCustomPhotos() {
      try {
        const customPhotos = config.slideshowPhotos.filter((p) => p.isCustom);
        localStorage.setItem('sabari_custom_photos_v1', JSON.stringify(customPhotos));
      } catch (err) {
        console.warn('Unable to save custom photos to localStorage:', err);
      }
    }

    async saveCustomPhotoToServer(newPhoto) {
      this.saveCustomPhotos();
      try {
        const res = await fetch('/api/photos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPhoto)
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.photo) {
            const live = config.slideshowPhotos.find((p) => p.id === newPhoto.id);
            if (live) {
              live.image = json.photo.image;
              this.saveCustomPhotos();
            }
          }
        }
      } catch (err) {
        console.warn('Network issue saving to server API, saved in localStorage:', err);
      }
      this.renderManagePhotosGrid();
    }

    async deletePhoto(photoId) {
      const idx = config.slideshowPhotos.findIndex((p) => p.id === photoId);
      if (idx === -1) return;
      const targetPhoto = config.slideshowPhotos[idx];

      config.slideshowPhotos.splice(idx, 1);

      if (targetPhoto.isCustom) {
        try {
          await fetch(`/api/photos?id=${encodeURIComponent(photoId)}`, { method: 'DELETE' });
        } catch (e) {
          console.warn('Server delete failed, persisting locally:', e);
        }
        this.saveCustomPhotos();
      } else {
        if (!this.deletedDefaultIds) this.deletedDefaultIds = [];
        if (!this.deletedDefaultIds.includes(photoId)) {
          this.deletedDefaultIds.push(photoId);
        }
        try {
          await fetch('/api/deleted-defaults', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: photoId })
          });
        } catch (e) {}
        try {
          localStorage.setItem('sabari_deleted_defaults_v1', JSON.stringify(this.deletedDefaultIds));
        } catch (e) {}
      }

      this.currentSlideIdx = Math.max(0, Math.min(this.currentSlideIdx, config.slideshowPhotos.length - 1));
      if (this.activeScene === 'slideshow') {
        this.playScene5Slideshow();
      }
      this.renderManagePhotosGrid();
      this.showToast(`🗑️ Deleted "${targetPhoto.title || 'photo'}".`);
    }

    async deleteAllDefaultPhotos() {
      audio.playClick();
      if (!this._initialDefaultPhotos) {
        this._initialDefaultPhotos = JSON.parse(JSON.stringify(config.slideshowPhotos));
      }
      if (!this.deletedDefaultIds) this.deletedDefaultIds = [];

      this._initialDefaultPhotos.forEach((dp) => {
        if (!this.deletedDefaultIds.includes(dp.id)) {
          this.deletedDefaultIds.push(dp.id);
        }
      });

      try {
        localStorage.setItem('sabari_deleted_defaults_v1', JSON.stringify(this.deletedDefaultIds));
      } catch (e) {}

      // Inform server disk
      for (const dp of this._initialDefaultPhotos) {
        try {
          await fetch('/api/deleted-defaults', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: dp.id })
          });
        } catch (e) {}
      }

      // Filter out all defaults from active memory
      config.slideshowPhotos = config.slideshowPhotos.filter((p) => p.isCustom);
      this.currentSlideIdx = 0;
      if (this.activeScene === 'slideshow') {
        this.playScene5Slideshow();
      }
      this.renderManagePhotosGrid();
      this.showToast('🗑️ All given photos deleted! Only your uploads remain.');
    }

    async restoreAllDefaultPhotos() {
      this.deletedDefaultIds = [];
      try {
        localStorage.removeItem('sabari_deleted_defaults_v1');
        await fetch('/api/reset-defaults', { method: 'POST' });
      } catch (e) {}

      if (this._initialDefaultPhotos) {
        const customOnly = config.slideshowPhotos.filter((p) => p.isCustom);
        config.slideshowPhotos = [...customOnly, ...JSON.parse(JSON.stringify(this._initialDefaultPhotos))];
      }
      this.currentSlideIdx = 0;
      if (this.activeScene === 'slideshow') {
        this.playScene5Slideshow();
      }
      this.renderManagePhotosGrid();
      this.showToast('✨ All default photos restored!');
    }

    renderManagePhotosGrid() {
      const grid = document.getElementById('managePhotosGrid');
      const countEl = document.getElementById('managePhotosCount');
      if (countEl) countEl.textContent = config.slideshowPhotos.length;
      if (!grid) return;

      grid.innerHTML = '';
      if (config.slideshowPhotos.length === 0) {
        grid.innerHTML = '<div style="color: var(--text-muted); font-size: 13px; text-align: center; padding: 20px;">No photos in slideshow. Click "Device File" above to add one, or restore defaults below.</div>';
        return;
      }

      config.slideshowPhotos.forEach((photo, idx) => {
        const card = document.createElement('div');
        card.className = 'manage-photo-card';

        const thumb = document.createElement('img');
        thumb.src = photo.image;
        thumb.alt = photo.title || 'Memory';
        thumb.className = 'manage-photo-thumb';

        const info = document.createElement('div');
        info.className = 'manage-photo-info';
        info.innerHTML = `
          <div class="manage-photo-title">#${idx + 1}. ${photo.title || 'Photo Memory'}</div>
          <div class="manage-photo-tag">${photo.tag || (photo.isCustom ? 'Custom Upload 📸' : 'WorldSkills Champion')}</div>
        `;

        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = 'manage-photo-del-btn';
        delBtn.innerHTML = '🗑️ Delete';
        delBtn.onclick = (e) => {
          e.stopPropagation();
          audio.playClick();
          this.deletePhoto(photo.id);
        };

        card.appendChild(thumb);
        card.appendChild(info);
        card.appendChild(delBtn);
        grid.appendChild(card);
      });
    }

    removeCustomPhoto(photoId) {
      this.deletePhoto(photoId);
    }

    showToast(message) {
      const toast = document.getElementById('uploadToast');
      const toastMsg = document.getElementById('toastMsg');
      if (!toast || !toastMsg) return;
      toastMsg.textContent = message;
      toast.classList.add('show');
      clearTimeout(this._toastTimeout);
      this._toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 3800);
    }

    openPhotoUploadModal() {
      audio.playClick();
      const modal = document.getElementById('photoUploadModal');
      if (modal) {
        modal.classList.add('active');
        modal.style.display = 'flex';
      }
      const errorBox = document.getElementById('uploadErrorBox');
      if (errorBox) {
        errorBox.style.display = 'none';
        errorBox.textContent = '';
      }
    }

    closePhotoUploadModal() {
      audio.playClick();
      const modal = document.getElementById('photoUploadModal');
      if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
      }
    }

    /* ------------------------------------------------------------------
       PHOTO UPLOAD SYSTEM (COMPRESSION, TABS, DRAG-DROP, PASTE & URL)
       ------------------------------------------------------------------ */
    initPhotoUploadSystem() {
      const modal = document.getElementById('photoUploadModal');
      const dropzone = document.getElementById('uploadDropzone');
      const fileInput = document.getElementById('photoFileInput');
      const previewContainer = document.getElementById('uploadPreviewContainer');
      const previewImg = document.getElementById('uploadPreviewImg');
      const changeBtn = document.getElementById('changePhotoBtn');
      const clearBtn = document.getElementById('clearPhotoBtn');
      const titleInput = document.getElementById('photoTitleInput');
      const msgInput = document.getElementById('photoMsgInput');
      const tagInput = document.getElementById('photoTagInput');
      const confirmBtn = document.getElementById('confirmPhotoUploadBtn');
      const closeBtn = document.getElementById('closeUploadModalBtn');
      const errorBox = document.getElementById('uploadErrorBox');

      // Tabs
      const tabFileBtn = document.getElementById('tabUploadFileBtn');
      const tabUrlBtn = document.getElementById('tabUploadUrlBtn');
      const fileTabContent = document.getElementById('fileUploadTabContent');
      const urlTabContent = document.getElementById('urlUploadTabContent');
      const urlInput = document.getElementById('photoUrlInput');
      const loadUrlBtn = document.getElementById('loadPhotoUrlBtn');

      let currentUploadedDataUrl = null;

      const showError = (msg) => {
        if (!errorBox) return;
        errorBox.textContent = msg;
        errorBox.style.display = 'block';
        errorBox.classList.remove('shake');
        void errorBox.offsetWidth;
        errorBox.classList.add('shake');
      };

      const clearError = () => {
        if (!errorBox) return;
        errorBox.style.display = 'none';
        errorBox.textContent = '';
      };

      const setPreviewImage = (dataUrl) => {
        currentUploadedDataUrl = dataUrl;
        previewImg.src = dataUrl;
        previewContainer.style.display = 'block';
        fileTabContent.style.display = 'none';
        urlTabContent.style.display = 'none';
        clearError();
        audio.playClick();
      };

      const clearPreviewImage = () => {
        currentUploadedDataUrl = null;
        previewImg.src = '';
        previewContainer.style.display = 'none';
        fileInput.value = '';
        if (urlInput) urlInput.value = '';
        if (tabFileBtn.classList.contains('active')) {
          fileTabContent.style.display = 'block';
          urlTabContent.style.display = 'none';
        } else {
          fileTabContent.style.display = 'none';
          urlTabContent.style.display = 'flex';
        }
      };

      const resetForm = () => {
        clearPreviewImage();
        titleInput.value = '';
        msgInput.value = '';
        tagInput.value = '';
        clearError();
      };

      // Modal close button & background click
      if (closeBtn) {
        closeBtn.onclick = () => this.closePhotoUploadModal();
      }
      if (modal) {
        modal.onclick = (e) => {
          if (e.target === modal) this.closePhotoUploadModal();
        };
      }

      const tabManageBtn = document.getElementById('tabManagePhotosBtn');
      const manageTabContent = document.getElementById('managePhotosTabContent');
      const restoreDefaultsBtn = document.getElementById('restoreDefaultsBtn');
      const clearDefaultsBtn = document.getElementById('clearAllDefaultsBtn');

      if (restoreDefaultsBtn) {
        restoreDefaultsBtn.onclick = () => {
          audio.playClick();
          this.restoreAllDefaultPhotos();
        };
      }

      if (clearDefaultsBtn) {
        clearDefaultsBtn.onclick = () => {
          audio.playClick();
          this.deleteAllDefaultPhotos();
        };
      }

      // Tab Switching
      if (tabFileBtn && tabUrlBtn) {
        tabFileBtn.onclick = () => {
          audio.playClick();
          tabFileBtn.classList.add('active');
          tabUrlBtn.classList.remove('active');
          if (tabManageBtn) tabManageBtn.classList.remove('active');
          if (manageTabContent) manageTabContent.style.display = 'none';
          if (!currentUploadedDataUrl) {
            fileTabContent.style.display = 'block';
            urlTabContent.style.display = 'none';
          } else {
            previewContainer.style.display = 'block';
          }
          clearError();
        };

        tabUrlBtn.onclick = () => {
          audio.playClick();
          tabUrlBtn.classList.add('active');
          tabFileBtn.classList.remove('active');
          if (tabManageBtn) tabManageBtn.classList.remove('active');
          if (manageTabContent) manageTabContent.style.display = 'none';
          if (!currentUploadedDataUrl) {
            fileTabContent.style.display = 'none';
            urlTabContent.style.display = 'flex';
          } else {
            previewContainer.style.display = 'block';
          }
          clearError();
        };

        if (tabManageBtn) {
          tabManageBtn.onclick = () => {
            audio.playClick();
            tabManageBtn.classList.add('active');
            tabFileBtn.classList.remove('active');
            tabUrlBtn.classList.remove('active');
            fileTabContent.style.display = 'none';
            urlTabContent.style.display = 'none';
            previewContainer.style.display = 'none';
            if (manageTabContent) manageTabContent.style.display = 'flex';
            this.renderManagePhotosGrid();
            clearError();
          };
        }
      }

      // Client-side image compression: max 1280px dimension, high-quality JPEG
      const processImageFile = (file) => {
        if (!file) return;
        if (!file.type || !file.type.startsWith('image/')) {
          showError('⚠️ Please select a valid image file (JPG, PNG, WEBP, or GIF).');
          return;
        }

        const reader = new FileReader();
        reader.onerror = () => {
          showError('⚠️ Failed to read image file. Please try another image.');
        };
        reader.onload = (e) => {
          const img = new Image();
          img.onerror = () => {
            showError('⚠️ Unable to decode image. Please select a different file.');
          };
          img.onload = () => {
            try {
              let width = img.width;
              let height = img.height;
              const maxDim = 1280;

              if (width > maxDim || height > maxDim) {
                if (width > height) {
                  height = Math.round((height * maxDim) / width);
                  width = maxDim;
                } else {
                  width = Math.round((width * maxDim) / height);
                  height = maxDim;
                }
              }

              const canvas = document.createElement('canvas');
              canvas.width = Math.max(1, width);
              canvas.height = Math.max(1, height);
              const ctx = canvas.getContext('2d');
              ctx.drawImage(img, 0, 0, width, height);

              const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.88);
              setPreviewImage(optimizedDataUrl);
            } catch (err) {
              // Canvas fallback if tainted
              setPreviewImage(e.target.result);
            }
          };
          img.src = e.target.result;
        };
        reader.readAsDataURL(file);
      };

      // Native file input change
      fileInput.onchange = (e) => {
        if (e.target.files && e.target.files[0]) {
          processImageFile(e.target.files[0]);
        }
      };

      // Reset input value on click so selecting the exact same file re-triggers change
      fileInput.onclick = () => {
        fileInput.value = '';
      };

      // Fallback click on dropzone
      if (dropzone) {
        dropzone.onclick = () => {
          fileInput.value = '';
          fileInput.click();
        };
      }

      // Drag and Drop prevention on window
      window.addEventListener('dragover', (e) => e.preventDefault());
      window.addEventListener('drop', (e) => e.preventDefault());

      if (dropzone) {
        dropzone.ondragover = (e) => {
          e.preventDefault();
          dropzone.classList.add('dragover');
        };
        dropzone.ondragleave = () => {
          dropzone.classList.remove('dragover');
        };
        dropzone.ondrop = (e) => {
          e.preventDefault();
          dropzone.classList.remove('dragover');
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processImageFile(e.dataTransfer.files[0]);
          }
        };
      }

      // Clipboard Paste (Ctrl+V) anywhere while modal is open
      window.addEventListener('paste', (e) => {
        if (!modal.classList.contains('active')) return;
        const items = e.clipboardData && e.clipboardData.items;
        if (!items) return;
        for (let i = 0; i < items.length; i++) {
          if (items[i].type && items[i].type.startsWith('image/')) {
            const file = items[i].getAsFile();
            if (file) {
              processImageFile(file);
              break;
            }
          }
        }
      });

      // Load image from URL
      if (loadUrlBtn && urlInput) {
        const handleLoadUrl = () => {
          const url = urlInput.value.trim();
          if (!url) {
            showError('⚠️ Please enter an image URL first.');
            return;
          }
          const testImg = new Image();
          testImg.crossOrigin = 'anonymous';
          testImg.onload = () => {
            try {
              let width = testImg.width;
              let height = testImg.height;
              const maxDim = 1280;
              if (width > maxDim || height > maxDim) {
                if (width > height) {
                  height = Math.round((height * maxDim) / width);
                  width = maxDim;
                } else {
                  width = Math.round((width * maxDim) / height);
                  height = maxDim;
                }
              }
              const canvas = document.createElement('canvas');
              canvas.width = Math.max(1, width);
              canvas.height = Math.max(1, height);
              const ctx = canvas.getContext('2d');
              ctx.drawImage(testImg, 0, 0, width, height);
              setPreviewImage(canvas.toDataURL('image/jpeg', 0.88));
            } catch (err) {
              setPreviewImage(url);
            }
          };
          testImg.onerror = () => {
            showError('⚠️ Could not load image from this URL. Please verify the URL or try uploading a file.');
          };
          testImg.src = url;
        };

        loadUrlBtn.onclick = handleLoadUrl;
        urlInput.onkeydown = (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleLoadUrl();
          }
        };
      }

      // Change & Remove Preview buttons
      if (changeBtn) {
        changeBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          fileInput.value = '';
          fileInput.click();
        };
      }

      if (clearBtn) {
        clearBtn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          clearPreviewImage();
        };
      }

      // Confirm Upload and Add to Slideshow
      if (confirmBtn) {
        confirmBtn.onclick = () => {
          if (!currentUploadedDataUrl) {
            showError('⚠️ Please choose a photo or load an image URL first!');
            return;
          }

          const title = titleInput.value.trim() || 'Golden Memory';
          const message = msgInput.value.trim() || 'Always cheering for you, Sabari!';
          const tag = tagInput.value.trim() || 'Squad Supporter 🌟';

          const newPhoto = {
            id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            isCustom: true,
            image: currentUploadedDataUrl,
            title: title,
            message: message,
            tag: tag
          };

          // Prepend to front of slideshow photos
          config.slideshowPhotos.unshift(newPhoto);
          this.saveCustomPhotoToServer(newPhoto);

          // Reset and close modal
          resetForm();
          this.closePhotoUploadModal();
          audio.playTrophyFanfare();

          // Immediate feedback
          this.currentSlideIdx = 0;
          if (this.activeScene === 'slideshow') {
            this.playScene5Slideshow();
            this.showToast('🎉 Photo saved permanently! Displaying on slideshow now!');
          } else {
            this.showToast('🎉 Photo saved permanently! You will see it in the Scene 5 Slideshow!');
          }
        };
      }
    }
  }

  window.storyApp = new StoryManager();
});
