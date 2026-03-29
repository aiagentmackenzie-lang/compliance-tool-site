// ========================================
// LENIS + GSAP SCROLLTRIGGER SYNC
// ========================================

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
gsap.registerPlugin(ScrollTrigger);

// ========================================
// CUSTOM CURSOR
// ========================================

const cursor = document.querySelector('.cursor-dot');
let cursorX = 0, cursorY = 0;
let currentX = 0, currentY = 0;

if (cursor && !window.matchMedia('(pointer: coarse)').matches) {
  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  function animateCursor() {
    currentX += (cursorX - currentX) * 0.15;
    currentY += (cursorY - currentY) * 0.15;
    cursor.style.left = currentX + 'px';
    cursor.style.top = currentY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effect on interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, textarea');
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
  });
}

// ========================================
// NAVIGATION SCROLL EFFECT
// ========================================

const nav = document.querySelector('.nav');
let lastScrollY = 0;

ScrollTrigger.create({
  start: 100,
  onUpdate: (self) => {
    if (self.scroll() > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
});

// ========================================
// HERO ANIMATIONS
// ========================================

// Text Scramble Effect on Load
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  
  update() {
    let output = '';
    let complete = 0;
    
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += char;
      } else {
        output += from;
      }
    }
    
    this.el.innerText = output;
    
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

// Apply scramble to accent text
const accentText = document.querySelector('.accent-text');
if (accentText) {
  const originalText = accentText.innerText;
  accentText.innerText = '';
  
  setTimeout(() => {
    const scrambler = new TextScramble(accentText);
    accentText.style.opacity = '1';
    scrambler.setText(originalText);
  }, 500);
}

// Hero entrance animations
gsap.from('.hero-headline .line', {
  y: 100,
  opacity: 0,
  duration: 1,
  stagger: 0.1,
  ease: 'power4.out',
  delay: 0.3
});

gsap.from('.hero-subtitle', {
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
  delay: 0.8
});

gsap.from('.hero-cta', {
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out',
  delay: 1
});

gsap.from('.hero-image', {
  scale: 1.2,
  opacity: 0,
  duration: 2,
  ease: 'power2.out'
});

// ========================================
// WORK SECTION - SIMPLE REVEAL (NO PIN)
// ========================================

gsap.from('.panel', {
  scrollTrigger: {
    trigger: '.work-panels',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  y: 80,
  opacity: 0,
  duration: 1,
  stagger: 0.2,
  ease: 'power3.out'
});

gsap.from('.work-header', {
  scrollTrigger: {
    trigger: '.work-section',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out'
});

// ========================================
// SERVICES SECTION - REVEAL ANIMATIONS
// ========================================

gsap.fromTo('.service-card', 
  { y: 40, opacity: 0 },
  {
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 85%',
    },
    y: 0,
    opacity: 1,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out'
  }
);

gsap.fromTo('.services-header',
  { y: 30, opacity: 0 },
  {
    scrollTrigger: {
      trigger: '.services-section',
      start: 'top 85%',
    },
    y: 0,
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out'
  }
);

// ========================================
// PROCESS SECTION - REVEAL ANIMATIONS
// ========================================

gsap.from('.step', {
  scrollTrigger: {
    trigger: '.process-steps',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  y: 60,
  opacity: 0,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power3.out'
});

gsap.from('.process-header', {
  scrollTrigger: {
    trigger: '.process-section',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out'
});

// Step lines animation
const steps = document.querySelectorAll('.step');
steps.forEach((step, i) => {
  const line = step.querySelector('::before') || step;
  
  gsap.from(step, {
    scrollTrigger: {
      trigger: step,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    },
    '--line-width': '0%',
    duration: 0.8,
    delay: i * 0.1
  });
});

// ========================================
// CONTACT SECTION - REVEAL ANIMATIONS
// ========================================

gsap.from('.contact-content', {
  scrollTrigger: {
    trigger: '.contact-section',
    start: 'top 70%',
    toggleActions: 'play none none reverse'
  },
  y: 60,
  opacity: 0,
  duration: 1,
  ease: 'power3.out'
});

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      lenis.scrollTo(target, {
        offset: -80,
        duration: 1.5
      });
    }
  });
});

// ========================================
// FORM HANDLING (AJAX - stays on page)
// ========================================

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.innerText;
    
    button.innerText = 'Sending...';
    button.disabled = true;
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      
      if (response.ok) {
        button.innerText = 'Message Sent!';
        button.style.background = '#22c55e';
        form.reset();
        
        setTimeout(() => {
          button.innerText = originalText;
          button.style.background = '';
          button.disabled = false;
        }, 3000);
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      button.innerText = 'Failed - try again';
      button.style.background = '#ef4444';
      
      setTimeout(() => {
        button.innerText = originalText;
        button.style.background = '';
        button.disabled = false;
      }, 3000);
    }
  });
}

// ========================================
// PARALLAX EFFECT ON HERO IMAGE
// ========================================

if (!window.matchMedia('(pointer: coarse)').matches) {
  gsap.to('.hero-image', {
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    },
    y: 100,
    scale: 1.15,
    ease: 'none'
  });
}

// ========================================
// WORK HEADER ANIMATION
// ========================================

gsap.from('.work-header', {
  scrollTrigger: {
    trigger: '.work-section',
    start: 'top 80%',
    toggleActions: 'play none none reverse'
  },
  y: 40,
  opacity: 0,
  duration: 0.8,
  ease: 'power3.out'
});

// ========================================
// REFRESH SCROLLTRIGGER ON RESIZE
// ========================================

let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});

// ========================================
// PREFERS REDUCED MOTION
// ========================================

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Disable complex animations
  gsap.globalTimeline.timeScale(0);
  
  // Simple fade-ins instead
  document.querySelectorAll('.service-card, .step, .panel').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'none';
  });
}
