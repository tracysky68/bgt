/* ══ 大綠地藝術 · 共用 Nav & Footer ══ */

const NAV_HTML = `
<nav class="nav" id="mainNav">
  <a href="index.html" class="nav-logo">
    <div class="logo-mark">
      <img src="assets/bgt-logo.png" alt="">
    </div>
    <div>
      <span class="logo-zh" style="font-family:'Noto Serif TC',serif;font-size:16px;font-weight:500;color:var(--ink);letter-spacing:0.06em;display:block">大綠地藝術</span>
      <span class="logo-en" style="font-size:9.5px;font-weight:300;color:var(--green-dark);letter-spacing:0.2em;text-transform:uppercase;display:block">Big Green Team</span>
    </div>
  </a>
  <ul class="nav-links">
    <li><a href="about.html">關於我們</a></li>
    <li><a href="courses.html">課程介紹</a></li>
    <li><a href="works.html">學生成果</a></li>
    <li><a href="workshop.html">家長工作坊</a></li>
    <li><a href="blog.html">部落格</a></li>
    <li><a href="little-days.html">幼學小日子</a></li>
    <li><a href="sunday-art.html">週日玩藝術</a></li>
    <li><a href="booking.html" class="nav-cta">預約與聯絡</a></li>
  </ul>
</nav>`;

const FOOTER_HTML = `
<div class="wave" style="background:var(--green)">
  <svg viewBox="0 0 1440 60" preserveAspectRatio="none" height="60">
    <path d="M0,60 L0,28 Q360,0 720,32 Q1080,56 1440,20 L1440,60Z" fill="#2E2A24"/>
  </svg>
</div>
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <a href="index.html" class="nav-logo" style="text-decoration:none">
        <div class="logo-mark" style="width:40px;height:40px">
          <img src="assets/bgt-logo.png" alt="">
        </div>
        <div>
          <span style="font-family:'Noto Serif TC',serif;font-size:16px;font-weight:500;color:white;letter-spacing:0.06em;display:block">大綠地藝術</span>
          <span style="font-size:9.5px;font-weight:300;color:var(--green);letter-spacing:0.2em;text-transform:uppercase;display:block">Big Green Team</span>
        </div>
      </a>
      <p>致力推廣兒童情緒藝術教育，陪孩子用創作感受生活、表達想法、釋放情緒。每個孩子的內在都有一片綠地，等待被看見。</p>
    </div>
    <div class="footer-col">
      <h5>服務項目</h5>
      <ul>
        <li><a href="about.html">關於我們</a></li>
        <li><a href="courses.html">課程介紹</a></li>
        <li><a href="works.html">學生成果</a></li>
        <li><a href="workshop.html">家長工作坊</a></li>
        <li><a href="booking.html">預約與聯絡</a></li>
        <li><a href="parent-peace.html">家長安心事</a></li>
        <li><a href="blog.html">部落格專欄</a></li>
        <li><a href="little-days.html">幼學小日子</a></li>
        <li><a href="sunday-art.html">週日玩藝術</a></li>
        <li><a href="https://www.facebook.com/biggreenteam" target="_blank">Facebook</a></li>
        <li><a href="https://lin.ee/zJctveL" target="_blank">LINE 官方帳號</a></li>
      </ul>
    </div>
    <div class="footer-col">
      <h5>教室資訊</h5>
      <ul>
        <li><a href="contact.html">📍 昌平教室</a></li>
        <li><a href="tel:04-22334859">☎ 04-22334859</a></li>
        <li class="footer-addr">台中市北屯區昌平路一段77號</li>
        <li style="margin-top:8px"><a href="contact.html">📍 豐樂教室</a></li>
        <li><a href="tel:04-24752782">☎ 04-24752782</a></li>
        <li class="footer-addr">台中市南屯區文心南五路一段312號</li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 大綠地藝術 Big Green Team · 台中市</span>
    <span><a href="booking.html">預約與聯絡</a></span>
  </div>
</footer>`;

const SHARED_JS = `
  // Inject nav & footer
  document.getElementById('nav-placeholder').innerHTML = NAV_HTML;
  document.getElementById('footer-placeholder').innerHTML = FOOTER_HTML;

  // Set active nav item
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links > li > a').forEach(a => {
    if (a.getAttribute('href') === path) {
      a.closest('li').classList.add('active');
    }
  });

  // Nav shadow on scroll
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 10
      ? '0 4px 28px rgba(46,42,36,0.08)'
      : 'none';
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const t = id && document.getElementById(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // Fade-up intersection observer
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));
`;
