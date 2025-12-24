document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('header');
const links = document.querySelectorAll('header .menu-area a');

function getHeaderHeight() {
  if (!header) return 0;
  const style = getComputedStyle(header);
  return header.offsetHeight || 0;
}

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const id = href.slice(1);
    const target = document.getElementById(id);
    if (!target) return;

    const headerHeight = getHeaderHeight();
    const targetY = target.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: Math.max(0, Math.round(targetY)),
      behavior: 'smooth'
    });
  });
});


});

const canvas = document.querySelector('.matrix-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const chars = "01";
const fontSize = 18;
const columns = Math.floor(window.innerWidth / fontSize);

const drops = Array(columns).fill(1);

function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff9d";         
    ctx.font = fontSize + "px monospace";

    drops.forEach((y, x) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, x * fontSize, y * fontSize);

        if (y * fontSize > canvas.height && Math.random() > 0.975) {
            drops[x] = 0;
        }
        drops[x]++;
    });
}

setInterval(drawMatrix, 40);

