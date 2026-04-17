// ===================================
// NAVIGATION
// ===================================
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

// Scroll effect — only toggle on index (hero page); subpages are always scrolled
const isIndexPage = !document.querySelector('.page-hero');
window.addEventListener('scroll', () => {
  if (!isIndexPage) return;
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('open');
  });
}

// Close menu on link click
document.querySelectorAll('.nav-menu a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

// ===================================
// SCROLL REVEAL
// ===================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ===================================
// HERO COPY ANIMATION
// ===================================
const heroCopy = document.querySelector('.hero-copy');
if (heroCopy) {
  const text = heroCopy.textContent;
  heroCopy.innerHTML = text.split('').map((char, i) => {
    const delay = i * 0.06;
    return `<span class="char" style="animation-delay:${delay}s; animation: fadeInUp 0.5s ${delay}s ease both">${char === ' ' ? '&nbsp;' : char}</span>`;
  }).join('');
}

// ===================================
// ACTIVE NAV LINK
// ===================================
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.style.color = 'var(--accent)';
    link.style.background = 'var(--accent-light)';
  }
});

// ===================================
// CONTACT FORM (demo)
// ===================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = '送信中...';
    btn.disabled = true;
    setTimeout(() => {
      contactForm.innerHTML = `
        <div style="text-align:center; padding: 3rem 1rem;">
          <div style="font-size:3rem; margin-bottom:1rem;">✅</div>
          <h3 style="font-size:1.4rem; margin-bottom:0.5rem; color:var(--accent);">送信完了</h3>
          <p style="color:var(--text-mid); font-size:0.95rem;">お問い合わせありがとうございます。<br>内容を確認の上、担当者よりご連絡いたします。</p>
        </div>
      `;
    }, 1200);
  });
}
