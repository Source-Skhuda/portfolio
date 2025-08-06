// === MATRIX BACKGROUND EFFECT ===
const canvas = document.getElementById("matrixCanvas");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const matrixChars = "01";
const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#0F0";
  ctx.font = `${fontSize}px monospace`;

  for (let i = 0; i < drops.length; i++) {
    const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height || Math.random() > 0.975) {
      drops[i] = 0;
    }

    drops[i]++;
  }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// === TYPING EFFECT ===
const typedText = ["Fullstack Developer", "Creative Coder", "AI Enthusiast","Automation-Specialist"];
let typedIndex = 0;
let charIndex = 0;
let deleting = false;
let typingSpeed = 100;

function typeEffect() {
  const typedElement = document.getElementById("typed");
  const currentText = typedText[typedIndex];

  if (deleting) {
    typedElement.textContent = currentText.substring(0, charIndex--);
  } else {
    typedElement.textContent = currentText.substring(0, charIndex++);
  }

  if (!deleting && charIndex === currentText.length) {
    deleting = true;
    typingSpeed = 80;
    setTimeout(typeEffect, 1000); // pause before deleting
    return;
  }

  if (deleting && charIndex === 0) {
    deleting = false;
    typedIndex = (typedIndex + 1) % typedText.length;
    typingSpeed = 100;
  }

  setTimeout(typeEffect, typingSpeed);
}

document.addEventListener("DOMContentLoaded", () => {
  typeEffect();
});
