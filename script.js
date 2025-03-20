function toggleTheme() {
    document.body.classList.toggle('dark-theme');
    const button = document.querySelector('.theme-toggle');
    button.textContent = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
}

function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');
}

document.querySelectorAll('.nav-menu a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
        toggleMenu();
    });
});

function handleScroll() {
    const sections = document.querySelectorAll('section');
    const triggerPoint = window.innerHeight * 0.8;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerPoint) {
            section.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// Typewriter effect
function typeWriter(element, text, speed) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

window.addEventListener('load', () => {
    typeWriter(document.getElementById('name'), 'Андрей Иванов', 100);
    setTimeout(() => typeWriter(document.getElementById('title'), 'Backend & DevOps Специалист', 100), 1500);
});

// Stats counter
function animateStats() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let count = 0;
        const speed = 50;
        const updateCount = () => {
            const increment = target / speed;
            if (count < target) {
                count += increment;
                counter.textContent = Math.ceil(count);
                setTimeout(updateCount, 20);
            } else {
                counter.textContent = target;
            }
        };
        updateCount();
    });
}

const statsSection = document.getElementById('stats');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        animateStats();
        observer.unobserve(statsSection);
    }
}, { threshold: 0.5 });
observer.observe(statsSection);

// Carousel
const carouselInner = document.querySelector('.carousel-inner');
const carouselItems = document.querySelectorAll('.project-item');
const prevBtn = document.querySelector('.carousel-prev');
const nextBtn = document.querySelector('.carousel-next');
let currentIndex = 0;

function updateCarousel() {
    carouselItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentIndex);
    });
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : carouselItems.length - 1;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex < carouselItems.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

// Particles
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];
const numberOfParticles = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = 'rgba(0, 180, 216, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.2) {
            particlesArray.splice(i, 1);
            i--;
            particlesArray.push(new Particle());
        }
    }
    requestAnimationFrame(animateParticles);
}

canvas.addEventListener('mousemove', (e) => {
    for (let i = 0; i < 5; i++) {
        particlesArray.push(new Particle());
        particlesArray[particlesArray.length - 1].x = e.x;
        particlesArray[particlesArray.length - 1].y = e.y;
    }
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

initParticles();
animateParticles();
