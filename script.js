// Animate skill bars
document.addEventListener('DOMContentLoaded', () => {
  const skills = document.querySelectorAll('.skill-progress');
  skills.forEach(skill => {
    const progress = skill.getAttribute('data-progress');
    setTimeout(() => skill.style.width = progress, 800);
  });
});

// Fade-in on scroll
const faders = document.querySelectorAll('.fade-in-section');
window.addEventListener('scroll', () => {
  const trigger = window.innerHeight / 1.2;
  faders.forEach(fader => {
    const top = fader.getBoundingClientRect().top;
    if(top < trigger){
      fader.style.opacity = '1';
      fader.style.transform = 'translateY(0)';
    }
  });
});

// Particle Background
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const colors = ['#b39ddb','#7e57c2','#fff'];
class Particle {
  constructor(){
    this.x = Math.random()*canvas.width;
    this.y = Math.random()*canvas.height;
    this.size = Math.random()*3 + 1;
    this.speedX = Math.random()*1 - 0.5;
    this.speedY = Math.random()*1 - 0.5;
    this.color = colors[Math.floor(Math.random()*colors.length)];
  }
  update(){
    this.x += this.speedX;
    this.y += this.speedY;
    if(this.x>canvas.width) this.x=0;
    if(this.x<0) this.x=canvas.width;
    if(this.y>canvas.height) this.y=0;
    if(this.y<0) this.y=canvas.height;
  }
  draw(){
    ctx.fillStyle=this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
    ctx.fill();
  }
}

function initParticles(){
  particlesArray = [];
  for(let i=0;i<100;i++){
    particlesArray.push(new Particle());
  }
}

function animateParticles(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  particlesArray.forEach(p=>{p.update(); p.draw();});
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Responsive Canvas
window.addEventListener('resize',()=>{
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});
