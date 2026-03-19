/* ============================================
   RITISH SINGHA — PORTFOLIO SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Safe Icon Initialization
    const safeCreateIcons = () => {
        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }
    };
    
    safeCreateIcons();


    // ---- Particle Background ---- //
    initParticles();

    // ---- Custom Cursor ---- //
    initCustomCursor();

    // ---- Navigation ---- //
    initNavigation();

    // ---- Typing Animation ---- //
    initTypingAnimation();

    // ---- Scroll Reveal ---- //
    initScrollReveal();

    // ---- Theme Toggle ---- //
    initThemeToggle();

    // ---- Counter Animation ---- //
    initCounterAnimation();

    // ---- Contact Form ---- //
    initContactForm();

    // ---- Chatbot ---- //
    initChatbot();

    // ---- Scroll Navigator ---- //
    initScrollNavigator();

    // ---- Interactive Terminal ---- //
    initTerminal();

    // ---- Project Modals ---- //
    initProjectModals();

    // ---- Music Widget ---- //
    initMusicWidget();

    // ---- Sound Effects ---- //
    initSoundEffects();

    // ---- Animated Resume Download ---- //
    initResumeDownload();

    // ---- 3D Skill Sphere ---- //
    initSkillSphere();

    // Safety: Expose icon refresh for dynamic content
    window.refreshIcons = safeCreateIcons;
});

/* ============================================
   PRELOADER & ROBUSTNESS
   ============================================ */
// Define dismissal function
function dismissPreloader() {
    const preloader = document.getElementById('preloader');
    if (preloader && !preloader.classList.contains('fade-out')) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }
}

// 1. Initial attempt on DOM ready (after a slight tech-vibe delay)
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(dismissPreloader, 2500); // Allow time to see the "INIT" animation
});

// 2. Secondary attempt on full page Load (images, fonts, etc)
window.addEventListener('load', dismissPreloader);

// 3. Absolute safety fallback (if something goes wrong with events)
setTimeout(dismissPreloader, 6000); 


/* ============================================
   PARTICLE BACKGROUND (SMART TECH NET)
   ============================================ */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let particles = [];
    
    let mouse = {
        x: null,
        y: null,
        radius: 150
    };

    window.addEventListener('mousemove', function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    window.addEventListener('mouseout', function() {
        mouse.x = null;
        mouse.y = null;
    });

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init(); // Reinitialize to adjust particle density
    }

    // Delay resize listener to prevent lag on rapid resizing
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 200);
    });
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.density = (Math.random() * 20) + 1;
            this.speedX = (Math.random() - 0.5) * 0.8;
            this.speedY = (Math.random() - 0.5) * 0.8;
        }

        update() {
            // Natural drift
            this.x += this.speedX;
            this.y += this.speedY;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Mouse interaction: subtle push away
            if (mouse.x != null && mouse.y != null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < mouse.radius) {
                    let forceDirectionX = dx / distance;
                    let forceDirectionY = dy / distance;
                    let force = (mouse.radius - distance) / mouse.radius;
                    // Density factors in how heavily they are pushed
                    let directionX = forceDirectionX * force * this.density * 0.2;
                    let directionY = forceDirectionY * force * this.density * 0.2;
                    this.x -= directionX;
                    this.y -= directionY;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            // Slight opacity variation
            ctx.fillStyle = 'rgba(16, 185, 129, 0.4)';
            ctx.fill();
        }
    }

    function init() {
        particles = [];
        // Calculate amount of particles based on screen size (responsive density)
        let numberOfParticles = (canvas.height * canvas.width) / 10000;
        numberOfParticles = Math.min(numberOfParticles, 120); // Cap it
        
        for (let i = 0; i < numberOfParticles; i++) {
            particles.push(new Particle());
        }
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = dx*dx + dy*dy;
                
                // Base connections between background nodes
                if (distance < 20000) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = `rgba(16, 185, 129, ${opacityValue * 0.25})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
            
            // Proximity connections to the mouse cursor (Creates the interactive "Net" effect)
            if (mouse.x != null && mouse.y != null) {
                let dxMouse = particles[a].x - mouse.x;
                let dyMouse = particles[a].y - mouse.y;
                let distanceToMouse = dxMouse*dxMouse + dyMouse*dyMouse;
                
                // If node is close to mouse, draw a strong connector
                if (distanceToMouse < 30000) {
                    opacityValue = 1 - (distanceToMouse / 30000);
                    ctx.strokeStyle = `rgba(16, 185, 129, ${opacityValue * 0.6})`;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Optional: draw a faint glow around the mouse
        if (mouse.x != null && mouse.y != null) {
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
            let gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
            gradient.addColorStop(0, 'rgba(16, 185, 129, 0.05)');
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
            ctx.fillStyle = gradient;
            ctx.fill();
        }

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        connect();
    }

    init();
    animate();
}

/* ============================================
   CUSTOM CURSOR
   ============================================ */
function initCustomCursor() {
    const dot = document.getElementById('cursor-dot');
    const outline = document.getElementById('cursor-outline');
    const glow = document.getElementById('mouse-glow');
    
    // Check if touch device
    if (!dot || !outline || window.matchMedia("(pointer: coarse)").matches) {
        return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        dot.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
        
        if (glow) {
            glow.style.transform = `translate(calc(${mouseX}px - 50%), calc(${mouseY}px - 50%))`;
            glow.classList.add('active');
        }
    });

    window.addEventListener('mouseout', () => {
        if (glow) glow.classList.remove('active');
    });

    function animate() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        
        outline.style.transform = `translate(calc(${outlineX}px - 50%), calc(${outlineY}px - 50%))`;
        requestAnimationFrame(animate);
    }
    animate();

    const hoverElements = document.querySelectorAll('a, button, input, textarea, .skill-tag, .photo-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            outline.classList.add('cursor-hovering');
        });
        el.addEventListener('mouseleave', () => {
            outline.classList.remove('cursor-hovering');
        });
    });
}

/* ============================================
   NAVIGATION
   ============================================ */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const links = document.querySelectorAll('.nav-link');

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link
        updateActiveLink();
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu on link click
    links.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active link highlight
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

/* ============================================
   TYPING ANIMATION
   ============================================ */
function initTypingAnimation() {
    const typedElement = document.getElementById('typed-text');
    const phrases = [
        'Software Engineer',
        'Full-Stack Django Developer',
        'Competitive Programmer',
        'Machine Learning Enthusiast',
        'Problem Solver',
        'Open Source Contributor'
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40;
        } else {
            typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

/* ============================================
   SCROLL REVEAL
   ============================================ */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/* ============================================
   THEME TOGGLE
   ============================================ */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    // Check localStorage for preferred theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        let theme = 'dark';
        if (document.body.classList.contains('light-mode')) {
            theme = 'light';
        }
        
        localStorage.setItem('theme', theme);
    });
}

/* ============================================
   COUNTER ANIMATION
   ============================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    let counted = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000;
                    const step = target / (duration / 16);
                    let current = 0;

                    function updateCounter() {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.round(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    }

                    updateCounter();
                });
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

/* ============================================
   CONTACT FORM
   ============================================ */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Button animation
        submitBtn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:8px;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="animate-spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Sending...</span>';
        submitBtn.disabled = true;

        // Simulate sending
        setTimeout(() => {
            submitBtn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:8px;"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!</span>';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = '<i data-lucide="send" class="btn-icon"></i> Send Message';
                submitBtn.disabled = false;
                submitBtn.style.background = '';
                lucide.createIcons();
            }, 3000);
        }, 1500);
    });
}

/* ============================================
   CHATBOT LOGIC
   ============================================ */
function initChatbot() {
    const toggleBtn = document.getElementById('chat-toggle-btn');
    const widget = document.getElementById('chatbot-widget');
    const closeBtn = document.getElementById('close-chat');
    const prompts = document.querySelectorAll('.chat-prompt');
    const messagesContainer = document.getElementById('chat-messages');

    if (!toggleBtn || !widget) return;

    toggleBtn.addEventListener('click', () => {
        widget.classList.add('active');
        toggleBtn.style.transform = 'scale(0)';
    });

    closeBtn.addEventListener('click', () => {
        widget.classList.remove('active');
        toggleBtn.style.transform = 'scale(1)';
    });

    prompts.forEach(prompt => {
        prompt.addEventListener('click', () => {
            const userText = prompt.innerText;
            const responseText = prompt.getAttribute('data-response');

            addUserMessage(userText);
            
            // Add bot response with slight delay
            setTimeout(() => {
                addBotMessage(responseText);
            }, 600);

            prompt.style.display = 'none'; // hide used prompt
        });
    });

    const chatInputForm = document.getElementById('chat-input-form');
    const chatInput = document.getElementById('chat-input');

    if (chatInputForm) {
        chatInputForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if(!text) return;
            
            addUserMessage(text);
            chatInput.value = '';

            // Simulate AI thinking and replying
            setTimeout(() => {
                const response = getSimulatedResponse(text);
                addBotMessage(response);
            }, 800 + Math.random() * 500);
        });
    }

    function addUserMessage(text) {
        const userMsg = document.createElement('div');
        userMsg.className = 'message user-message';
        userMsg.innerText = text;
        messagesContainer.appendChild(userMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function addBotMessage(text) {
        const botMsg = document.createElement('div');
        botMsg.className = 'message bot-message';
        botMsg.innerText = text;
        messagesContainer.appendChild(botMsg);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        lucide.createIcons();
        if (window.playBotSound) window.playBotSound();
    }

    function getSimulatedResponse(text) {
        const lowerText = text.toLowerCase();
        if(lowerText.includes('hello') || lowerText.includes('hi ')) return 'Hello! How can I help you learn more about Ritish?';
        if(lowerText.includes('contact') || lowerText.includes('email') || lowerText.includes('phone')) return 'You can reach Ritish at ritishsingha899@gmail.com, or call/WhatsApp him at +8801631931072.';
        if(lowerText.includes('project') || lowerText.includes('work')) return 'Ritish has built robust apps like a Student Data Store, Recruitment Management System, and Digital Wallet. Check the Projects section!';
        if(lowerText.includes('skill') || lowerText.includes('tech')) return 'His primary stack is Python, Django, C++, and Machine Learning. He also uses React, JavaScript, and Tailwind CSS.';
        return "Thanks for your message! Since I'm an AI simulation, I might not have a perfect answer for that. Feel free to contact Ritish directly via the Contact section!";
    }
}

/* ============================================
   SCROLL NAVIGATOR
   ============================================ */
function initScrollNavigator() {
    const upBtn = document.getElementById('scroll-up-btn');
    const downBtn = document.getElementById('scroll-down-btn');
    const progressCircle = document.getElementById('progress-circle');
    
    if(!upBtn || !downBtn || !progressCircle) return;

    const radius = progressCircle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;

    function setProgress() {
        const scrollTop = window.scrollY;
        // The total scrollable distance is document height minus viewport height.
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        let scrollPercentage = scrollTop / scrollHeight;
        if (isNaN(scrollPercentage)) scrollPercentage = 0;
        if (scrollPercentage > 1) scrollPercentage = 1;
        
        // This calculates how much of the stroke is offset (i.e. not drawn).
        const offset = circumference - (scrollPercentage * circumference);
        progressCircle.style.strokeDashoffset = offset;
    }

    // Initialize progress on load
    setProgress();

    window.addEventListener('scroll', () => {
        setProgress();
    });

    upBtn.addEventListener('click', () => {
        window.scrollBy({ top: -window.innerHeight * 0.8, left: 0, behavior: 'smooth' });
    });

    downBtn.addEventListener('click', () => {
        window.scrollBy({ top: window.innerHeight * 0.8, left: 0, behavior: 'smooth' });
    });
}

/* ============================================
   INTERACTIVE TERMINAL
   ============================================ */
function initTerminal() {
    const overlay = document.getElementById('terminal-overlay');
    const terminalBody = document.getElementById('terminal-body');
    const terminalInput = document.getElementById('terminal-input');
    const toggleBtn = document.getElementById('terminal-toggle');
    const closeBtn = document.getElementById('terminal-close');

    if (!overlay || !terminalBody || !terminalInput) return;

    let commandHistory = [];
    let historyIndex = -1;

    function openTerminal() {
        overlay.classList.add('active');
        setTimeout(() => terminalInput.focus(), 300);
    }

    function closeTerminal() {
        overlay.classList.remove('active');
    }

    // Toggle button in navbar
    toggleBtn.addEventListener('click', openTerminal);

    // Close button
    closeBtn.addEventListener('click', closeTerminal);

    // Close on overlay click (outside terminal)
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeTerminal();
    });

    // Keyboard shortcut: Ctrl + `
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === '`') {
            e.preventDefault();
            overlay.classList.contains('active') ? closeTerminal() : openTerminal();
        }
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeTerminal();
        }
    });

    // Command input
    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = terminalInput.value.trim();
            if (cmd) {
                commandHistory.push(cmd);
                historyIndex = commandHistory.length;
            }
            processCommand(cmd);
            terminalInput.value = '';
        }
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
            }
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
            }
        }
    });

    function addLine(html) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = html;
        terminalBody.appendChild(line);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function addPromptLine(cmd) {
        addLine(`<span class="t-green">ritish@portfolio</span>:<span class="t-blue">~</span>$ ${cmd}`);
    }

    function processCommand(cmd) {
        addPromptLine(cmd);

        const parts = cmd.toLowerCase().split(/\s+/);
        const base = parts[0];
        const arg = parts.slice(1).join(' ');

        switch (base) {
            case '':
                break;

            case 'help':
                addLine(`<span class="t-yellow">Available commands:</span>`);
                addLine(`  <span class="t-cyan">whoami</span>         — About Ritish`);
                addLine(`  <span class="t-cyan">ls projects</span>   — List all projects`);
                addLine(`  <span class="t-cyan">cat skills.txt</span>— Show technical skills`);
                addLine(`  <span class="t-cyan">cat education</span> — Education details`);
                addLine(`  <span class="t-cyan">contact</span>       — Contact information`);
                addLine(`  <span class="t-cyan">open github</span>   — Open GitHub profile`);
                addLine(`  <span class="t-cyan">open linkedin</span> — Open LinkedIn profile`);
                addLine(`  <span class="t-cyan">neofetch</span>      — System info (fun!)`);
                addLine(`  <span class="t-cyan">date</span>          — Current date & time`);
                addLine(`  <span class="t-cyan">history</span>       — Command history`);
                addLine(`  <span class="t-cyan">clear</span>         — Clear terminal`);
                addLine(`  <span class="t-cyan">exit</span>          — Close terminal`);
                break;

            case 'whoami':
                addLine(`<span class="t-yellow">Ritish Singha</span>`);
                addLine(`Software Engineer | Python Django | ML Enthusiast`);
                addLine(`Founder & Lead — Innova Tech`);
                addLine(`BSc in CSE @ East Delta University (2022-2026)`);
                addLine(`300+ Problems Solved on Codeforces`);
                addLine(`ICPC Asia Dhaka Regional Participant`);
                break;

            case 'ls':
                if (arg === 'projects' || arg === '') {
                    addLine(`<span class="t-blue">drwxr-xr-x</span>  <span class="t-green">Student-Data-Store/</span>`);
                    addLine(`<span class="t-blue">drwxr-xr-x</span>  <span class="t-green">Recruitment-Management-System/</span>`);
                    addLine(`<span class="t-blue">drwxr-xr-x</span>  <span class="t-green">Digital-Wallet-System/</span>`);
                    addLine(`<span class="t-blue">drwxr-xr-x</span>  <span class="t-green">ML-Customer-Retention-Engine/</span>`);
                    addLine(`<span class="t-blue">drwxr-xr-x</span>  <span class="t-green">Codeforces-Solutions-Archive/</span>`);
                    addLine(`<span class="t-blue">drwxr-xr-x</span>  <span class="t-green">Network-Traffic-WGAN/</span>`);
                } else {
                    addLine(`<span class="t-red">ls: cannot access '${arg}': No such file or directory</span>`);
                }
                break;

            case 'cat':
                if (arg === 'skills.txt' || arg === 'skills') {
                    addLine(`<span class="t-yellow">── Languages ──</span>`);
                    addLine(`  Python • C++ • JavaScript • C • Java • SQL`);
                    addLine(`<span class="t-yellow">── Frameworks ──</span>`);
                    addLine(`  Django • Django REST • React • Next.js`);
                    addLine(`<span class="t-yellow">── Tools & DB ──</span>`);
                    addLine(`  PostgreSQL • MongoDB • Git • GitHub • Docker`);
                    addLine(`<span class="t-yellow">── AI / ML ──</span>`);
                    addLine(`  WGAN • LLM • TensorFlow • PyTorch • Pandas`);
                } else if (arg === 'education' || arg === 'edu') {
                    addLine(`<span class="t-yellow">East Delta University</span>`);
                    addLine(`BSc in Computer Science & Engineering`);
                    addLine(`2022 — 2026 | 151/166 Credits Completed`);
                    addLine(`Thesis: Network Traffic Data Augmentation`);
                    addLine(`  using WGAN guided by LLM`);
                } else {
                    addLine(`<span class="t-red">cat: ${arg || '???'}: No such file or directory</span>`);
                }
                break;

            case 'contact':
                addLine(`<span class="t-yellow">── Contact Info ──</span>`);
                addLine(`  <span class="t-cyan">Email:</span>    ritishsingha899@gmail.com`);
                addLine(`  <span class="t-cyan">Phone:</span>    +8801631931072`);
                addLine(`  <span class="t-cyan">WhatsApp:</span> wa.me/8801631931072`);
                addLine(`  <span class="t-cyan">LinkedIn:</span> linkedin.com/in/ritish-singha`);
                addLine(`  <span class="t-cyan">GitHub:</span>   github.com/ritishsingha999`);
                break;

            case 'open':
                if (arg === 'github') {
                    addLine(`<span class="t-green">Opening GitHub...</span>`);
                    window.open('https://github.com/ritishsingha999', '_blank');
                } else if (arg === 'linkedin') {
                    addLine(`<span class="t-green">Opening LinkedIn...</span>`);
                    window.open('https://www.linkedin.com/in/ritish-singha/', '_blank');
                } else if (arg === 'codeforces') {
                    addLine(`<span class="t-green">Opening Codeforces...</span>`);
                    window.open('https://codeforces.com/profile/Ritish_Singha', '_blank');
                } else {
                    addLine(`<span class="t-red">open: '${arg}' not recognized. Try: github, linkedin, codeforces</span>`);
                }
                break;

            case 'neofetch':
                addLine(`<span class="t-green">         ██████╗ ███████╗</span>`);
                addLine(`<span class="t-green">         ██╔══██╗██╔════╝</span>   <span class="t-cyan">ritish@portfolio</span>`);
                addLine(`<span class="t-green">         ██████╔╝███████╗</span>   ─────────────────`);
                addLine(`<span class="t-green">         ██╔══██╗╚════██║</span>   <span class="t-yellow">OS:</span> Portfolio v2.0`);
                addLine(`<span class="t-green">         ██║  ██║███████║</span>   <span class="t-yellow">Stack:</span> HTML/CSS/JS`);
                addLine(`<span class="t-green">         ╚═╝  ╚═╝╚══════╝</span>   <span class="t-yellow">Theme:</span> Emerald Dark`);
                addLine(`                          <span class="t-yellow">Font:</span> Inter + JetBrains Mono`);
                addLine(`                          <span class="t-yellow">Terminal:</span> RS Shell v1.0`);
                addLine(`                          <span class="t-yellow">Uptime:</span> Since 2022`);
                break;

            case 'date':
                addLine(`<span class="t-white">${new Date().toString()}</span>`);
                break;

            case 'history':
                if (commandHistory.length === 0) {
                    addLine(`<span class="t-muted">No commands in history.</span>`);
                } else {
                    commandHistory.forEach((c, i) => {
                        addLine(`  <span class="t-muted">${i + 1}</span>  ${c}`);
                    });
                }
                break;

            case 'clear':
                terminalBody.innerHTML = '';
                break;

            case 'exit':
                closeTerminal();
                break;

            default:
                addLine(`<span class="t-red">bash: ${base}: command not found</span>`);
                addLine(`<span class="t-muted">Type 'help' for available commands.</span>`);
                break;
        }
    }
}

/* ============================================
   PROJECT DETAIL MODALS
   ============================================ */
function initProjectModals() {
    const overlay = document.getElementById('project-modal-overlay');
    const closeBtn = document.getElementById('project-modal-close');
    const cards = document.querySelectorAll('.project-card[data-modal]');

    if (!overlay || !closeBtn || cards.length === 0) return;

    const pmTitle = document.getElementById('pm-title');
    const pmStatus = document.getElementById('pm-status');
    const pmRole = document.getElementById('pm-role');
    const pmProblem = document.getElementById('pm-problem');
    const pmSolution = document.getElementById('pm-solution');
    const pmFeatures = document.getElementById('pm-features');
    const pmGithub = document.getElementById('pm-github');
    const pmFooter = document.getElementById('pm-footer');

    function openModal(card) {
        pmTitle.textContent = card.dataset.title || '';
        pmStatus.textContent = card.dataset.status || '';
        pmRole.textContent = card.dataset.role || '';
        pmProblem.textContent = card.dataset.problem || '';
        pmSolution.textContent = card.dataset.solution || '';

        // Features
        pmFeatures.innerHTML = '';
        const features = (card.dataset.features || '').split('|');
        features.forEach(f => {
            if (f.trim()) {
                const li = document.createElement('li');
                li.textContent = f.trim();
                pmFeatures.appendChild(li);
            }
        });

        // GitHub link
        const ghLink = card.dataset.github;
        if (ghLink) {
            pmGithub.href = ghLink;
            pmFooter.style.display = 'flex';
        } else {
            pmFooter.style.display = 'none';
        }

        overlay.classList.add('active');
        if (window.refreshIcons) window.refreshIcons();
    }

    function closeModal() {
        overlay.classList.remove('active');
    }

    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking the GitHub link inside the card
            if (e.target.closest('.project-links a')) return;
            openModal(card);
        });
    });

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ============================================
   MUSIC WIDGET
   ============================================ */
function initMusicWidget() {
    const titleEl = document.getElementById('music-title');
    const artistEl = document.getElementById('music-artist');
    const progressBar = document.getElementById('music-progress-bar');
    const currentTimeEl = document.getElementById('music-current-time');
    const totalTimeEl = document.getElementById('music-total-time');

    if (!titleEl || !progressBar) return;

    const playlist = [
        { title: 'Lofi Beats — Chill Vibes', artist: 'ChilledCow', duration: 225 },
        { title: 'Midnight Drive — Synthwave', artist: 'FM-84', duration: 198 },
        { title: 'Focus Flow — Deep Work', artist: 'Brain.fm', duration: 310 },
        { title: 'Coding Nights — Ambient', artist: 'Carbon Based Lifeforms', duration: 267 },
        { title: 'Binary Sunset — Instrumental', artist: 'John Williams', duration: 180 },
        { title: 'Neon Lights — Retrowave', artist: 'The Midnight', duration: 242 },
    ];

    let currentTrack = 0;
    let elapsed = 0;

    function formatTime(seconds) {
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

    function loadTrack(index) {
        const track = playlist[index];
        titleEl.textContent = track.title;
        artistEl.textContent = track.artist;
        totalTimeEl.textContent = formatTime(track.duration);
        elapsed = 0;
        progressBar.style.width = '0%';
        currentTimeEl.textContent = '0:00';
    }

    loadTrack(0);

    setInterval(() => {
        const track = playlist[currentTrack];
        elapsed++;
        if (elapsed >= track.duration) {
            currentTrack = (currentTrack + 1) % playlist.length;
            loadTrack(currentTrack);
            return;
        }
        const percent = (elapsed / track.duration) * 100;
        progressBar.style.width = `${percent}%`;
        currentTimeEl.textContent = formatTime(elapsed);
    }, 1000);
}

/* ============================================
   UI SOUND EFFECTS (Web Audio API)
   ============================================ */
function initSoundEffects() {
    const soundToggle = document.getElementById('sound-toggle');
    if (!soundToggle) return;

    const soundOnIcon = soundToggle.querySelector('.sound-on-icon');
    const soundOffIcon = soundToggle.querySelector('.sound-off-icon');

    let soundEnabled = false;
    let audioCtx = null;

    soundToggle.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
            soundOnIcon.style.display = 'block';
            soundOffIcon.style.display = 'none';
            // Initialize AudioContext on first user interaction
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            playSound(400, 'sine', 0.1, 0.1); // Play "on" sound
        } else {
            soundOnIcon.style.display = 'none';
            soundOffIcon.style.display = 'block';
        }
    });

    function playSound(freq, type, duration, vol) {
        if (!soundEnabled || !audioCtx) return;
        
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        gain.gain.setValueAtTime(vol, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    }

    // Attach hover sounds to buttons and links safely
    const hoverElements = document.querySelectorAll('button, a, .project-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            if (el.id !== 'sound-toggle') { // Don't play hover on the toggle itself
                playSound(600, 'sine', 0.05, 0.02); // Soft click
            }
        });
        
        // Add click sound only if it's not a link that navigates away (basic click)
        if(el.tagName === 'BUTTON' || el.classList.contains('project-card')) {
             el.addEventListener('mousedown', () => {
                 if (el.id !== 'sound-toggle') {
                     playSound(400, 'square', 0.1, 0.03); // Deeper click
                 }
             });
        }
    });

    window.playBotSound = function() {
        playSound(800, 'triangle', 0.15, 0.05); // Chat popup pop
    }
}

/* ============================================
   ANIMATED RESUME DOWNLOAD
   ============================================ */
function initResumeDownload() {
    const resumeBtns = document.querySelectorAll('.d-resume-btn');

    resumeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Prevent multiple clicks while animating
            if (btn.classList.contains('compiling') || btn.classList.contains('success')) return;

            const originalHTML = btn.innerHTML;
            const originalWidth = btn.offsetWidth;
            
            // Set fixed width so formatting doesn't break
            btn.style.width = `${originalWidth}px`;
            
            // Step 1: "Compiling Data..." state
            btn.classList.add('compiling');
            btn.innerHTML = `
                <i data-lucide="loader" class="btn-icon"></i>
                <span class="btn-text">Compiling Data...</span>
            `;
            if (window.refreshIcons) window.refreshIcons();

            // Fake processing delay
            setTimeout(() => {
                // Step 2: "Ready/Success" state
                btn.classList.remove('compiling');
                btn.classList.add('success');
                btn.innerHTML = `
                    <i data-lucide="check-circle" class="btn-icon"></i>
                    <span class="btn-text">Data Compiled!</span>
                `;
                if (window.refreshIcons) window.refreshIcons();
                
                // Trigger real download (assuming a PDF is placed in root folder as expected)
                const link = document.createElement('a');
                link.href = 'RS_CV.pdf'; 
                link.download = 'Ritish_Singha_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Step 3: Revert back to original after a few seconds
                setTimeout(() => {
                    btn.classList.remove('success');
                    btn.innerHTML = originalHTML;
                    btn.style.width = ''; // Reset width restriction
                    lucide.createIcons();
                }, 3000);
            }, 1800); // 1.8 second deep computing delay
        });
    });
}

/* ============================================
   3D SKILL SPHERE
   ============================================ */
function initSkillSphere() {
    const container = '#skill-sphere';
    const texts = [
        'Python', 'Django', 'C++', 'Machine Learning',
        'TypeScript', 'React', 'HTML5', 'CSS3',
        'Git', 'PostgreSQL', 'Docker', 'REST API',
        'Tailwind', 'Unit Testing', 'AWS', 'Linux'
    ];
    
    // Check if container exists and TagCloud is loaded
    if (document.querySelector(container) && typeof TagCloud !== 'undefined') {
        const options = {
            radius: 140,
            maxSpeed: 'normal',
            initSpeed: 'normal',
            direction: 135,
            keep: true
        };
        
        TagCloud(container, texts, options);
    }
}
