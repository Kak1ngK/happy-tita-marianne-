
// MARIANNE'S 19TH BIRTHDAY WEBSITE

const screens = [...document.querySelectorAll('.screen')];

let heartsTimer = null;
let candleBlown = false;

// SCREEN TRANSITIONS

function showScreen(number) {
  screens.forEach((screen) => {
    const active = screen.id === `screen-${number}`;

    screen.classList.toggle('active', active);
    screen.setAttribute('aria-hidden', String(!active));
  });

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// ALL NEXT SCREEN BUTTONS

document.querySelectorAll('[data-next]').forEach((button) => {
  button.addEventListener('click', () => {
    const nextScreen = Number(button.dataset.next);

    if (nextScreen === 5) {
      stopFloatingHearts();
      launchConfetti(35);
    }

    showScreen(nextScreen);
  });
});

// WISH BUTTONS

const readyButton = document.getElementById('ready-button');
const blowButton = document.getElementById('blow-button');

const wishText = document.getElementById('wish-text');
const wishHelp = document.getElementById('wish-help');

const flame = document.getElementById('flame');
const smoke = document.getElementById('smoke');

// READY TO MAKE A WISH

readyButton.addEventListener('click', () => {

  readyButton.classList.add('is-hidden');

  wishText.textContent = 'WISHHH WISELYYY BEYBB ✧';

  wishHelp.textContent =
    'Okayyy, take your time. Tell the universe what you want!';

  blowButton.classList.remove('is-hidden');

});

// BLOW THE CANDLE

blowButton.addEventListener('click', () => {

  if (candleBlown) return;

  candleBlown = true;

  // Turn off flame
  flame.classList.add('out');

  // Show smoke animation
  smoke.classList.remove('rise');

  void smoke.offsetWidth;

  smoke.classList.add('rise');

  // Change birthday text
  wishText.textContent = 'WISH GRANTED! ✧';

  wishHelp.textContent =
    'YAYYYYY! Hope something lovely finds you today.';

  blowButton.disabled = true;
  blowButton.textContent = 'YAYYYYY!';

  // Celebration
  launchConfetti();

  // Go to birthday letter
  window.setTimeout(() => {
    showScreen(3);
  }, 1900);

});

// HIDDEN SURPRISE BUTTON

document.getElementById('surprise-button')
  .addEventListener('click', () => {

    showScreen(4);

    startFloatingHearts();

  });

// REPLAY BUTTON

document.getElementById('replay-button')
  .addEventListener('click', () => {

    candleBlown = false;

    // Restore candle
    flame.classList.remove('out');
    smoke.classList.remove('rise');

    // Restore wish buttons
    readyButton.classList.remove('is-hidden');

    blowButton.classList.add('is-hidden');
    blowButton.disabled = false;

    blowButton.textContent = 'TAYUPIII NA HAHAHA!';

    wishText.textContent = 'MAKE A WISHHH DOOOO';

    wishHelp.textContent =
      "Take a little moment. No rush. This one's all yours.";

    // Stop decorations
    stopFloatingHearts();

    // Return to first screen
    showScreen(1);

  });

// FLOATING HEARTS AND SPARKLES

function startFloatingHearts() {

  stopFloatingHearts();

  const symbols = ['♡', '✧', '♥'];

  heartsTimer = window.setInterval(() => {

    const item = document.createElement('span');

    item.className = 'floating-decor-item';

    item.textContent =
      symbols[Math.floor(Math.random() * symbols.length)];

    item.style.cssText = `
      position: fixed;
      left: ${Math.random() * 92 + 4}vw;
      bottom: -30px;
      z-index: 20;
      pointer-events: none;
      color: ${Math.random() > .5 ? '#83bce0' : '#a58bc9'};
      font-size: ${Math.random() * 13 + 17}px;
      opacity: .8;
      animation: float-up ${Math.random() * 2 + 4}s linear forwards;
    `;

    document.body.appendChild(item);

    window.setTimeout(() => {
      item.remove();
    }, 6500);

  }, 550);

}

// STOP FLOATING HEARTS

function stopFloatingHearts() {

  if (heartsTimer) {
    window.clearInterval(heartsTimer);
  }

  heartsTimer = null;

  document.querySelectorAll('.floating-decor-item')
    .forEach((item) => item.remove());

}

// FLOATING ANIMATION STYLE

const floatStyle = document.createElement('style');

floatStyle.textContent = `
  @keyframes float-up {
    to {
      transform: translateY(-115vh) rotate(35deg);
      opacity: 0;
    }
  }
`;

document.head.appendChild(floatStyle);

// CONFETTI CANVAS

const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

let particles = [];
let animationFrame = null;

// RESIZE CANVAS FOR MOBILE

function resizeCanvas() {

  const ratio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);

  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;

  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

}

window.addEventListener('resize', resizeCanvas);

resizeCanvas();

// CREATE CONFETTI

function launchConfetti(amount = 105) {

  const colors = [
    '#a9cfe8',
    '#dceefa',
    '#ffffff',
    '#b9a4dc',
    '#8db8d9',
    '#eee8fb'
  ];

  for (let i = 0; i < amount; i++) {

    particles.push({

      x: window.innerWidth / 2 +
        (Math.random() - .5) * 100,

      y: window.innerHeight * .38 +
        (Math.random() - .5) * 35,

      vx: (Math.random() - .5) * 8,

      vy: Math.random() * -8 - 2,

      gravity: .13 + Math.random() * .08,

      size: Math.random() * 5 + 3,

      rotation: Math.random() * 6,

      spin: (Math.random() - .5) * .18,

      color: colors[
        Math.floor(Math.random() * colors.length)
      ],

      life: 170 + Math.random() * 60

    });

  }

  if (!animationFrame) {
    animateConfetti();
  }

}

// ANIMATE CONFETTI

function animateConfetti() {

  ctx.clearRect(
    0,
    0,
    window.innerWidth,
    window.innerHeight
  );

  particles = particles.filter((p) =>
    p.life > 0 && p.y < window.innerHeight + 30
  );

  particles.forEach((p) => {

    p.x += p.vx;
    p.y += p.vy;

    p.vy += p.gravity;

    p.rotation += p.spin;
    p.life -= 1;

    ctx.save();

    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);

    ctx.fillStyle = p.color;

    ctx.fillRect(
      -p.size / 2,
      -p.size / 2,
      p.size,
      p.size * 1.45
    );

    ctx.restore();

  });

  if (particles.length) {

    animationFrame = requestAnimationFrame(animateConfetti);

  } else {

    cancelAnimationFrame(animationFrame);

    animationFrame = null;

    ctx.clearRect(
      0,
      0,
      window.innerWidth,
      window.innerHeight
    );

  }

}
