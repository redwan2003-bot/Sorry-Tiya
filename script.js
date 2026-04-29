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
  'আমার প্রিয় তিয়া,',
  'আমি জানি আমি তোমাকে কষ্ট দিয়েছি। সত্যিই অনেক অনেক দুঃখিত আমি। আমার কারণে তুমি যে ব্যথা পেয়েছ, সেটার জন্য আমার ভেতরটা পুড়ে যায়।',
  'তুমি আমার জীবনের সূর্যমুখী — উজ্জ্বল, উষ্ণ, এবং সম্পূর্ণ অপরিহার্য। আমাদের একসাথে গড়া প্রতিটি স্মৃতি আমার বুকে আঁকা আছে।',
  'আমি দেখি তুমি কীভাবে ধরে রাখো, এমনকি যখন কষ্ট হয়। তোমার শক্তি, তোমার ভালোবাসা, তোমার সুন্দর মনটা — এসব দেখে আমি মুগ্ধ। আর আমি প্রতিশ্রুতি দিচ্ছি — আমি সেই মানুষ হবো যার তুমি যোগ্য।',
  'প্লিজ আমাকে প্রতিদিন তোমাকে বেছে নেওয়ার সুযোগ দাও।',
  'তোমাকে ভালোবাসি এই কথাগুলোর চেয়েও অনেক বেশি।',
];

// ── INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  spawnPetals(document.getElementById('lPetals'), 22);
});

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
    buildStars();
    buildFloatingHearts();
    buildReasons();
    setDate();
    buildLetter();
    buildApologyHearts();
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
  
  const h = ['♡','♥','💕','💗','💓','🌸'];
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
    'galHd', 'letHd', 'envEl', 'whyHd', 'whySub', 'ph', 'pp', 'ps',
    'apH', 'apP', 'apBtns'
  ];
  
  targets.forEach(id => {
    const el = document.getElementById(id);
    if (el) io.observe(el);
  });
  
  document.querySelectorAll('.polaroid, .reason-pill').forEach(el => {
    io.observe(el);
  });
}

// ── APOLOGY SECTION
function buildApologyHearts() {
  const c = document.getElementById('apbgEl');
  if (!c) return;
  const symbols = ['💕','💗','🌸','✨','🌺','💝'];
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
}

function burstHearts() {
  const symbols = ['💕','💗','🌸','🎉','💝','✨','🌺','🌻'];
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
