/**
 * Sorry Tiya - Interaction Logic
 */

// ── DATA
const photos = [
  { file: '664029338_992769913281252_582304682018196176_n.jpg', cap: 'Hand in hand, always' },
  { file: '669667184_2409228752884111_8778818277166131362_n.jpg', cap: 'From Tiya, with love 🌻' },
  { file: '685753491_1349562697063111_6145862061099688366_n.jpg', cap: 'Those beautiful eyes ✨' },
  { file: '677734212_2620052338410995_1179177485261297118_n.jpg', cap: 'The day you said yes 💕' },
  { file: '676758915_1446067046778912_8532280054613538975_n.jpg', cap: 'Mehndi & memories 🌸' },
  { file: '673950799_944831184841509_6658480280131260704_n.jpg', cap: 'Two hearts, one story' },
  { file: '685331049_1516775943295250_5064665421540281710_n.jpg', cap: 'Walking beside you 🌺' },
  { file: '682492271_2312963116116784_2085333495928395896_n.jpg', cap: 'My favourite feeling 💗' },
];

const rots = [-3, 2, -1.5, 3, -2, 1, -3.5, 2];

const reasons = [
  '💕 Your laugh heals me',
  '🌻 You make ordinary days magical',
  '✨ Your patience with me',
  '🌙 The way you care so deeply',
  '💌 Your kindness to everyone',
  '🌸 Your beautiful soul',
  '🎀 The little gifts from your heart',
  '🌟 Your strength amazes me',
  '💕 How you make home feel safe',
  '🌺 Your beautiful eyes',
  '💝 The way you hold on',
  '🌈 Life is better with you',
];

const letterParagraphs = [
  'সত্যি বলতে, আমি ভেতরে ভেতরে প্রচণ্ড guilty feel করছি। আমি জানি আমার কোনো একটা আচরণ বা কথা তোমাকে কষ্ট দিয়েছে, আর সেটা মনে পড়লে আমার নিজেরই খুব খারাপ লাগছে।',
  'তোমাকে কষ্ট দেওয়ার কোনো উদ্দেশ্যই আমার ছিল না, কিন্তু দিনশেষে ভুলটা আমারই ছিল।',
  'আমি জানি শুধু একগাদা \'সরি\' বলে সব ঠিক করা যায় না, তবুও আমার জায়গা থেকে আমি সত্যি আন্তরিকভাবে দুঃখিত। আমাদের এই সুন্দর সম্পর্কটাতে আমি কোনো তিক্ততা রাখতে চাই না। তুমি যদি একটু সময় নিয়ে ব্যাপারটা ভেবে দেখো এবং আমাকে ক্ষমা করে দাও, খুব খুশি হবো।',
];

// ── INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  spawnPetals(document.getElementById('lPetals'), 22);
  initVoiceDuration();
});

function initVoiceDuration() {
  const audio = document.getElementById('heart-voice');
  const durEl = document.getElementById('voiceDuration');
  if (!audio || !durEl) return;

  audio.addEventListener('loadedmetadata', () => {
    const mins = Math.floor(audio.duration / 60);
    const secs = Math.floor(audio.duration % 60);
    durEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
  });

  audio.addEventListener('timeupdate', () => {
    const rem = audio.duration - audio.currentTime;
    if (rem >= 0) {
      const mins = Math.floor(rem / 60);
      const secs = Math.floor(rem % 60);
      durEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    }
  });

  audio.addEventListener('ended', () => {
    const mins = Math.floor(audio.duration / 60);
    const secs = Math.floor(audio.duration % 60);
    durEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
  });
}

// ── PETALS
function spawnPetals(container, n) {
  if (!container) return;
  for (let i = 0; i < n; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    p.style.cssText = `
      left: ${Math.random() * 100}%;
      animation-duration: ${4 + Math.random() * 6}s;
      animation-delay: ${Math.random() * 7}s;
      transform: rotate(${Math.random() * 360}deg);
    `;
    container.appendChild(p);
  }
}

// ── ENTER SITE
function enterSite() {
  const ldr = document.getElementById('loader');
  ldr.classList.add('hidden');

  setTimeout(() => {
    ldr.style.display = 'none';
    const main = document.getElementById('main');
    main.classList.add('visible');

    // Initialize sections after entering
    spawnPetals(document.getElementById('hPetals'), 18);
    buildGallery();
    buildTimeline();
    buildStars();
    buildFloatingHearts();
    buildReasons();
    setDate();
    buildLetter();
    buildApologyHearts();
    spawnFloatingLetters();
    setupObserver();
  }, 850);
}

// ── GALLERY
function buildGallery() {
  const g = document.getElementById('polGrid');
  if (!g) return;

  photos.forEach((ph, i) => {
    const d = document.createElement('div');
    d.className = 'polaroid';
    d.style.setProperty('--rot', rots[i % rots.length] + 'deg');
    d.style.transitionDelay = (i * 0.1) + 's';

    d.innerHTML = `
      <img src="${ph.file}" alt="${ph.cap}" loading="lazy">
      <div class="pol-shine"></div>
      <span class="pol-cap">${ph.cap}</span>
    `;

    d.onclick = () => openLb(ph.file);
    g.appendChild(d);
  });
}

// ── LIGHTBOX
function openLb(src) {
  const lb = document.getElementById('lb');
  const img = document.getElementById('lb-img');
  img.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden'; // Prevent scroll
}

function closeLb() {
  const lb = document.getElementById('lb');
  lb.classList.remove('open');
  document.body.style.overflow = ''; // Restore scroll
}

// ── STARS
function buildStars() {
  const c = document.getElementById('starsEl');
  if (!c) return;

  for (let i = 0; i < 130; i++) {
    const s = document.createElement('div');
    s.className = 'star';
    const sz = Math.random() * 2.5 + 0.5;
    s.style.cssText = `
      width: ${sz}px;
      height: ${sz}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      --d: ${2 + Math.random() * 4}s;
      animation-delay: ${Math.random() * 5}s;
    `;
    c.appendChild(s);
  }
}

// ── FLOATING HEARTS
function buildFloatingHearts() {
  const c = document.getElementById('fhEl');
  if (!c) return;

  const h = ['♡', '♥', '💕', '💗', '💓', '🌸'];
  for (let i = 0; i < 18; i++) {
    const el = document.createElement('div');
    el.className = 'fheart';
    el.textContent = h[Math.floor(Math.random() * h.length)];
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: 0;
      font-size: ${14 + Math.random() * 18}px;
      animation-duration: ${5 + Math.random() * 9}s;
      animation-delay: ${Math.random() * 9}s;
    `;
    c.appendChild(el);
  }
}

// ── REASONS
function buildReasons() {
  const w = document.getElementById('reasonsEl');
  if (!w) return;

  reasons.forEach((r, i) => {
    const p = document.createElement('div');
    p.className = 'reason-pill';
    p.style.transitionDelay = (i * 0.07) + 's';
    p.textContent = r;
    p.onclick = function () {
      this.classList.toggle('lit');
    };
    w.appendChild(p);
  });
}

// ── LETTER
function setDate() {
  const dateEl = document.getElementById('letDate');
  if (!dateEl) return;
  const d = new Date();
  dateEl.textContent = d.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function buildLetter() {
  const b = document.getElementById('letBody');
  if (!b) return;

  letterParagraphs.forEach(txt => {
    const p = document.createElement('p');
    p.textContent = txt;
    b.appendChild(p);
  });
}

// ── OBSERVER
function setupObserver() {
  const options = {
    threshold: 0.15
  };

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;

      const el = e.target;
      el.classList.add('visible');

      if (el.id === 'envEl') {
        el.querySelectorAll('.letter-body p').forEach((p, i) => {
          setTimeout(() => p.classList.add('shown'), i * 280);
        });
      }

      if (el.id === 'ps') {
        setTimeout(() => el.classList.add('underlined'), 100);
      }

      io.unobserve(el);
    });
  }, options);

  const targets = [
    'galHd', 'timeHd', 'letHd', 'envEl', 'songHd', 'songCard', 'voiceHd', 'voiceCard', 'whyHd', 'whySub', 'ph', 'pp', 'ps',
    'apH', 'apP', 'apBtns'
  ];

  targets.forEach(id => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });

  document.querySelectorAll('.polaroid, .reason-pill, .timeline-item').forEach(el => {
    io.observe(el);
  });
}

// ── APOLOGY SECTION
function buildApologyHearts() {
  const c = document.getElementById('apbgEl');
  if (!c) return;
  const symbols = ['💕', '💗', '🌸', '✨', '🌺', '💝'];
  for (let i = 0; i < 24; i++) {
    const el = document.createElement('div');
    el.className = 'ap-bg-heart';
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      font-size: ${12 + Math.random() * 20}px;
      animation-duration: ${6 + Math.random() * 8}s;
      animation-delay: ${Math.random() * 6}s;
      opacity: ${0.08 + Math.random() * 0.12};
    `;
    c.appendChild(el);
  }
}

// ── RUNAWAY NO BUTTON
(function setupRunawayNo() {
  document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.getElementById('btnNo');
    if (!noBtn) return;

    let attempts = 0;

    function moveAway(e) {
      attempts++;
      const btn = noBtn.getBoundingClientRect();
      const cx = btn.left + btn.width / 2;
      const cy = btn.top + btn.height / 2;

      // Vector from cursor to button center
      const dx = cx - (e.clientX || e.touches?.[0]?.clientX || cx);
      const dy = cy - (e.clientY || e.touches?.[0]?.clientY || cy);
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;

      // Flee distance scales with attempts (gets more frantic)
      const flee = Math.min(120 + attempts * 15, 280);

      const nx = dx / dist * flee;
      const ny = dy / dist * flee;

      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // Current position
      const curLeft = noBtn.getBoundingClientRect().left;
      const curTop = noBtn.getBoundingClientRect().top;

      let newLeft = curLeft + nx;
      let newTop = curTop + ny;

      // Clamp to viewport
      newLeft = Math.max(8, Math.min(vw - btn.width - 8, newLeft));
      newTop = Math.max(8, Math.min(vh - btn.height - 8, newTop));

      noBtn.style.position = 'fixed';
      noBtn.style.left = newLeft + 'px';
      noBtn.style.top = newTop + 'px';
      noBtn.style.zIndex = '99999';
      noBtn.style.margin = '0';

      // Change label as she tries
      const labels = ['No 😅', 'No way!', 'Can\'t catch me!', 'Running away 🏃', 'Say yes!', 'Not today!'];
      noBtn.textContent = labels[Math.min(attempts - 1, labels.length - 1)];

      // Grow the yes button a little to hint
      const yesBtn = document.getElementById('btnYes');
      if (yesBtn) {
        const scale = Math.min(1 + attempts * 0.04, 1.5);
        yesBtn.style.transform = `scale(${scale})`;
      }
    }

    noBtn.addEventListener('mousemove', moveAway);
    noBtn.addEventListener('touchstart', moveAway, { passive: true });
    noBtn.addEventListener('click', moveAway);
  });
})();

// ── HANDLE YES
function handleYes() {
  const btns = document.getElementById('apBtns');
  const accepted = document.getElementById('apAccepted');
  const noBtn = document.getElementById('btnNo');

  // Reset no button back to normal flow
  if (noBtn) {
    noBtn.style.position = '';
    noBtn.style.left = '';
    noBtn.style.top = '';
    noBtn.style.zIndex = '';
  }

  if (btns) {
    btns.style.transition = 'opacity 0.5s ease';
    btns.style.opacity = '0';
    setTimeout(() => {
      btns.style.display = 'none';
      if (accepted) accepted.classList.remove('hidden');
    }, 500);
  }

  // Burst of hearts
  burstHearts();
  spawnConfetti();
}

function spawnConfetti() {
  const colors = ['#FF8FAB', '#FFB6C1', '#DB2777', '#F472B6', '#FFF'];
  for (let i = 0; i < 100; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.width = Math.random() * 10 + 5 + 'px';
    c.style.height = c.style.width;
    c.style.opacity = Math.random();
    c.style.animationDuration = Math.random() * 2 + 3 + 's';
    c.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}

function burstHearts() {
  const symbols = ['💕', '💗', '🌸', '🎉', '💝', '✨', '🌺', '🌻'];
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      el.style.cssText = `
        position: fixed;
        left: ${20 + Math.random() * 60}%;
        top: ${20 + Math.random() * 60}%;
        font-size: ${18 + Math.random() * 24}px;
        pointer-events: none;
        z-index: 99999;
        animation: burstAway 1.2s ease forwards;
        --tx: ${(Math.random() - 0.5) * 300}px;
        --ty: ${(Math.random() - 0.5) * 300}px;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1300);
    }, i * 40);
  }
}

// ── TOGGLE MUSIC
function toggleMusic() {
  const audio = document.getElementById('bg-music');
  const control = document.getElementById('music-control');
  if (!audio || !control) return;

  if (audio.paused) {
    audio.play().catch(err => console.log("Music play blocked:", err));
    control.classList.add('playing');
  } else {
    audio.pause();
    control.classList.remove('playing');
  }
}

// ── CUSTOM CURSOR & SPARKLES
(function setupCustomCursor() {
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const cursor = document.getElementById('cursor');
    let lastTime = 0;

    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';

      // Sparkles
      const now = Date.now();
      if (now - lastTime > 60) {
        spawnSparkle(e.clientX, e.clientY);
        lastTime = now;
      }
    });

    // Hover effect
    const hoverables = 'a, button, .polaroid, .reason-pill, .music-control, #lb-close, .btn-yes, .btn-no';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverables)) {
        cursor.classList.add('hover');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverables)) {
        cursor.classList.remove('hover');
      }
    });
  }
})();

function spawnSparkle(x, y) {
  const s = document.createElement('div');
  s.className = 'sparkle';
  const symbols = ['✨', '⭐', '💖', '🌸', '💕'];
  s.textContent = symbols[Math.floor(Math.random() * symbols.length)];
  s.style.left = x + 'px';
  s.style.top = y + 'px';

  const dx = (Math.random() - 0.5) * 100;
  const dy = (Math.random() - 0.5) * 100;
  s.style.setProperty('--dx', dx + 'px');
  s.style.setProperty('--dy', dy + 'px');

  document.body.appendChild(s);
  setTimeout(() => s.remove(), 1000);
}

// ── TIMELINE DATA
const timelineData = [
  { date: 'First Sight', title: 'The Day It All Began', desc: 'That moment I saw you, I knew my world was about to change.' },
  { date: 'First Conversation', title: 'Endless Chats', desc: 'We could talk for hours and never get tired. Every word felt like magic.' },
  { date: 'First Trip', title: 'Our First Adventure', desc: 'Exploring new places with you made me realize how much I love your company.' },
  { date: 'Favorite Memory', title: 'The Quiet Moments', desc: 'Just sitting beside you, feeling complete without saying a word.' },
];

function buildTimeline() {
  const container = document.getElementById('timeItems');
  if (!container) return;

  timelineData.forEach((item, i) => {
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.innerHTML = `
      <div class="timeline-content">
        <span class="time-date">${item.date}</span>
        <h3 class="time-title">${item.title}</h3>
        <p class="time-desc">${item.desc}</p>
      </div>
    `;
    container.appendChild(el);
  });
}

// ── TOGGLE SPECIAL SONG
function toggleSong() {
  const audio = document.getElementById('special-song');
  const btn = document.getElementById('songPlayBtn');
  const vinyl = document.querySelector('.vinyl');
  if (!audio || !btn || !vinyl) return;

  if (audio.paused) {
    // Pause ambient music if playing
    const bgMusic = document.getElementById('bg-music');
    const bgControl = document.getElementById('music-control');
    if (bgMusic && !bgMusic.paused) {
      bgMusic.pause();
      if (bgControl) bgControl.classList.remove('playing');
    }

    audio.play().catch(err => console.log("Song play blocked:", err));
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    vinyl.classList.add('playing');
  } else {
    audio.pause();
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    vinyl.classList.remove('playing');
  }
}

// ── FLOATING LOVE LETTERS
const loveNotes = [
  "You're my favorite person! 💕",
  "I miss your smile... 🌸",
  "You make my heart skip a beat! ✨",
  "Always thinking of you! 💖",
  "You are my sunshine! 🌻",
  "I love you more than words can say! 💌"
];

function spawnFloatingLetters() {
  setInterval(() => {
    const l = document.createElement('div');
    l.className = 'floating-letter';
    l.style.left = Math.random() * 90 + 'vw';
    l.style.animationDuration = Math.random() * 5 + 10 + 's';

    l.onclick = () => {
      openPopup(loveNotes[Math.floor(Math.random() * loveNotes.length)]);
      l.remove();
    };

    document.body.appendChild(l);
    setTimeout(() => l.remove(), 15000);
  }, 4000);
}

function openPopup(text) {
  const p = document.getElementById('letter-popup');
  const t = document.getElementById('popup-text');
  if (!p || !t) return;
  t.textContent = text;
  p.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  const p = document.getElementById('letter-popup');
  if (p) p.classList.remove('open');
  document.body.style.overflow = '';
}

// ── TOGGLE HEART VOICE
function toggleVoice() {
  const audio = document.getElementById('heart-voice');
  const btn = document.getElementById('voicePlayBtn');
  const card = document.getElementById('voiceCard');
  if (!audio || !btn || !card) return;

  if (audio.paused) {
    // Pause other music if playing
    const bgMusic = document.getElementById('bg-music');
    const bgControl = document.getElementById('music-control');
    if (bgMusic && !bgMusic.paused) {
      bgMusic.pause();
      if (bgControl) bgControl.classList.remove('playing');
    }

    const specialSong = document.getElementById('special-song');
    const songBtn = document.getElementById('songPlayBtn');
    const vinyl = document.querySelector('.vinyl');
    if (specialSong && !specialSong.paused) {
      specialSong.pause();
      if (songBtn) songBtn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
      if (vinyl) vinyl.classList.remove('playing');
    }

    audio.play().catch(err => console.log("Voice play blocked:", err));
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>';
    card.classList.add('playing');
  } else {
    audio.pause();
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
    card.classList.remove('playing');
  }
}
