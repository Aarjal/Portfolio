document.addEventListener('DOMContentLoaded', () => {
  // ===== LOADER =====
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      animateStats();
    }, 1000);
  });

  // Force hide loader if window load takes too long
  setTimeout(() => {
    if (!loader.classList.contains('hidden')) {
      loader.classList.add('hidden');
      animateStats();
    }
  }, 3000);

  // ===== CUSTOM CURSOR =====
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0;
  let dotX = 0, dotY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateCursor() {
    // Smooth interpolation (lerp)
    dotX += (mouseX - dotX) * 0.2;
    dotY += (mouseY - dotY) * 0.2;
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;

    dot.style.left = `${dotX}px`;
    dot.style.top = `${dotY}px`;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(updateCursor);
  }
  requestAnimationFrame(updateCursor);

  // Add hover class to ring on interactive elements
  const hoverables = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card, .filter-btn');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });

  // ===== SCROLL PROGRESS =====
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
  });

  // ===== THEME TOGGLE =====
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  // Read saved theme or prefer-color-scheme
  const savedTheme = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    const moon = themeToggle.querySelector('.fa-moon');
    const sun = themeToggle.querySelector('.fa-sun');
    if (theme === 'light') {
      moon.style.display = 'block';
      sun.style.display = 'none';
    } else {
      moon.style.display = 'none';
      sun.style.display = 'block';
    }
  }

  // ===== MOBILE NAV TOGGLE =====
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const navbar = document.getElementById('navbar');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close nav menu when clicking a link
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Navbar background change on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== ACTIVE SECTION HIGHLIGHTING =====
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        current = section.getAttribute('id');
      }
    });

    links.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  });

  // ===== TYPING ANIMATION =====
  const typedText = document.getElementById('typedText');
  const words = ['Full-Stack Development', '3D Web Experiences', 'Browser Extensions', 'Creative Interfaces'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typedText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typedText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 1500; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 500; // Pause before starting next word
    }

    setTimeout(type, typingSpeed);
  }
  setTimeout(type, 1000);

  // ===== PARTICLES BACKGROUND =====
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = 60;

  function resizeCanvas() {
    canvas.width = canvas.parentElement.offsetWidth;
    canvas.height = canvas.parentElement.offsetHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = Math.random() * 0.4 - 0.2;
      const colors = ['#7c5cfc', '#00d4ff', '#c084fc'];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          ctx.strokeStyle = document.documentElement.getAttribute('data-theme') === 'light' 
            ? `rgba(124, 92, 252, ${0.1 * (1 - dist / 120)})`
            : `rgba(124, 92, 252, ${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ===== STATS COUNTER ANIMATION =====
  function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
      const target = +stat.getAttribute('data-count');
      let current = 0;
      const increment = target / 50;
      const updateCount = () => {
        if (current < target) {
          current += increment;
          stat.textContent = Math.ceil(current);
          setTimeout(updateCount, 30);
        } else {
          stat.textContent = target;
        }
      };
      updateCount();
    });
  }

  // ===== SKILL PROGRESS FILL ANIMATION =====
  const skillsSection = document.getElementById('skills');
  const skillFills = document.querySelectorAll('.skill-fill');
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        skillFills.forEach(fill => {
          const width = fill.getAttribute('data-width');
          fill.style.width = `${width}%`;
        });
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  if (skillsSection) {
    skillObserver.observe(skillsSection);
  }

  // ===== PROJECT FILTER SYSTEM =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.8) translateY(20px)';
        
        setTimeout(() => {
          if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
            card.classList.remove('hidden');
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1) translateY(0)';
            }, 50);
          } else {
            card.classList.add('hidden');
          }
        }, 300);
      });
    });
  });

  // ===== SCROLL REVEAL EFFECT =====
  const reveals = document.querySelectorAll('.section-header, .about-grid, .skill-card, .project-card, .service-card, .timeline-item, .contact-grid');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  // ===== CONTACT FORM VALIDATION & SIMULATION =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>`;
      
      // Simulate API call
      setTimeout(() => {
        submitBtn.innerHTML = `<span>Success!</span><i class="fas fa-check"></i>`;
        submitBtn.style.background = '#4ade80';
        
        // Reset after 3 seconds
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          contactForm.reset();
        }, 3000);
      }, 1500);
    });
  }
});
