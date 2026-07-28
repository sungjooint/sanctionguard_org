/* SanctionGuard™ FINAL — main.js */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Navbar scroll ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => navbar.classList.toggle('scrolled', window.scrollY > 50), {passive:true});

  /* ── Mobile menu ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }));

  /* ── Scroll-reveal ── */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, {threshold: 0.12});
  document.querySelectorAll('.fade-in').forEach(el => io.observe(el));

  /* ── Particles ── */
  const pc = document.getElementById('heroParticles');
  if (pc) {
    const cols = ['#E63946','#00B4D8','#2AABEE','#FEE500','#2DC653','#7C3AED'];
    for (let i = 0; i < 24; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const sz = Math.random() * 5 + 2;
      p.style.cssText = `width:${sz}px;height:${sz}px;left:${Math.random()*100}%;background:${cols[Math.floor(Math.random()*cols.length)]};animation-duration:${Math.random()*16+10}s;animation-delay:${Math.random()*12}s;`;
      pc.appendChild(p);
    }
  }

  /* ── Ticker duplicate ── */
  const tt = document.getElementById('tickerTrack');
  if (tt) tt.innerHTML += tt.innerHTML;

  /* ── Counter animation ── */
  function animateCounter(el) {
    const target  = parseFloat(el.dataset.target);
    const suffix  = el.dataset.suffix || '';
    const isFloat = target % 1 !== 0;
    const duration = 2000;
    const steps    = 60;
    const inc      = target / steps;
    let cur = 0, step = 0;
    const t = setInterval(() => {
      step++;
      cur = Math.min(inc * step, target);
      el.textContent = (isFloat ? cur.toFixed(1) : Math.floor(cur)) + suffix;
      if (step >= steps) clearInterval(t);
    }, duration / steps);
  }
  const counterIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.cc-num[data-target]').forEach(animateCounter);
        counterIO.unobserve(e.target);
      }
    });
  }, {threshold: 0.3});
  const crisisGrid = document.querySelector('.crisis-grid');
  if (crisisGrid) counterIO.observe(crisisGrid);

  /* ── Chart: OTC vs Exchange Bar ── */
  const otcCtx = document.getElementById('otcChart');
  if (otcCtx) {
    new Chart(otcCtx, {
      type: 'bar',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [
          {
            label: 'OTC 장외거래 ($조)',
            data: [0.3, 0.55, 0.75, 0.85, 1.4],
            backgroundColor: 'rgba(230,57,70,0.75)',
            borderColor: '#E63946',
            borderWidth: 1,
            borderRadius: 6,
          },
          {
            label: '거래소 거래 ($조)',
            data: [0.08, 0.15, 0.18, 0.2, 0.35],
            backgroundColor: 'rgba(45,198,83,0.65)',
            borderColor: '#2DC653',
            borderWidth: 1,
            borderRadius: 6,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { labels: { color: 'rgba(255,255,255,0.7)', font: { size: 11 } } },
          tooltip: {
            backgroundColor: 'rgba(8,14,26,0.96)',
            borderColor: 'rgba(0,180,216,0.4)',
            borderWidth: 1,
            titleColor: '#fff',
            bodyColor: 'rgba(255,255,255,0.8)',
          }
        },
        scales: {
          x: { ticks: { color: 'rgba(255,255,255,0.6)' }, grid: { color: 'rgba(255,255,255,0.05)' } },
          y: {
            ticks: { color: 'rgba(255,255,255,0.6)', callback: v => '$' + v + '조' },
            grid: { color: 'rgba(255,255,255,0.05)' }
          }
        }
      }
    });
  }

  /* ── Chart: Risk Type Doughnut ── */
  const riskCtx = document.getElementById('riskChart');
  if (riskCtx) {
    new Chart(riskCtx, {
      type: 'doughnut',
      data: {
        labels: ['자금세탁', '제재회피', '북한 연계', '피싱·사기', '테러자금', '기타'],
        datasets: [{
          data: [30, 22, 18, 16, 8, 6],
          backgroundColor: ['#E63946','#F4831F','#2AABEE','#FFD166','#A78BFA','#6C757D'],
          borderColor: 'rgba(8,14,26,0.85)',
          borderWidth: 2,
          hoverOffset: 8,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '60%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: { color: 'rgba(255,255,255,0.65)', font: { size: 10 }, padding: 12, boxWidth: 12 }
          },
          tooltip: {
            backgroundColor: 'rgba(8,14,26,0.96)',
            borderColor: 'rgba(0,180,216,0.4)',
            borderWidth: 1,
            titleColor: '#fff',
            bodyColor: 'rgba(255,255,255,0.8)',
            callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` }
          }
        }
      }
    });
  }

  /* ── Feature Tabs ── */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = btn.dataset.tab;
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const tc = document.getElementById('tab-' + t);
      if (tc) tc.classList.add('active');
    });
  });

  /* ── FAQ Accordion ── */
  document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-q').addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(fi => {
        fi.classList.remove('open');
        fi.querySelector('.faq-a').classList.remove('open');
      });
      if (!isOpen) {
        item.classList.add('open');
        item.querySelector('.faq-a').classList.add('open');
      }
    });
  });

  /* ── Scroll active nav ── */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a');
  const style = document.createElement('style');
  style.textContent = '.nav-links a.nav-active{color:var(--cyan)!important}';
  document.head.appendChild(style);
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    sections.forEach(s => {
      if (sy >= s.offsetTop - 130 && sy < s.offsetTop + s.offsetHeight - 130) {
        navAs.forEach(a => {
          a.classList.remove('nav-active');
          if (a.getAttribute('href') === '#' + s.id) a.classList.add('nav-active');
        });
      }
    });
  }, {passive: true});

  /* ── CTA button alerts ── */
  document.querySelectorAll('.cta-btns .btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const t = btn.textContent.trim();
      if (t.includes('텔레그램'))      alert('텔레그램 봇 준비 중! 2025년 5월 정식 오픈 예정입니다. 🛡️');
      else if (t.includes('카카오'))   alert('카카오톡 채널 준비 중! 2025년 5월 정식 오픈 예정입니다. 💛');
      else if (t.includes('App'))     alert('App Store 출시 2025년 5월 예정입니다! 🚀');
      else if (t.includes('Google'))  alert('Google Play 출시 2025년 5월 예정입니다! 🚀');
    });
  });

  /* ── App chat animation ── */
  const chatItems = document.querySelectorAll('.app-chat > *');
  chatItems.forEach((el, i) => {
    el.style.cssText = 'opacity:0;transform:translateY(8px);transition:opacity .5s,transform .5s';
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; }, 600 + i * 650);
  });

  console.log('%c🛡️ SanctionGuard™ FINAL', 'color:#00B4D8;font-size:16px;font-weight:bold;');
  console.log('%cChainalysis 한국 공식 파트너 · OTC 장외거래 세계 최고 수준 사전 스크리닝', 'color:#E63946;font-size:11px;');
  console.log('%c텔레그램 + 카카오톡 · 2025년 5월 출시', 'color:#FEE500;font-size:11px;');
});
