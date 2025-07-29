document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    navLinksItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });
    
    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Intersection Observer for scroll animations
    const sections = document.querySelectorAll('section');
    const circleItems = document.querySelectorAll('.stat-circle');
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-show');
                
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                
                if (entry.target.id === 'about') {
                    circleItems.forEach(circle => {
                        const percent = circle.getAttribute('data-percent');
                        const circlePath = circle.querySelector('circle:nth-child(2)');
                        const circumference = 2 * Math.PI * 70;
                        const offset = circumference - (percent / 100) * circumference;
                        
                        circlePath.style.strokeDashoffset = offset;
                        circle.style.setProperty('--percent', percent);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        observer.observe(section);
    });
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí iría el código para enviar el formulario
            // Por ahora solo mostramos un mensaje
            alert('¡Gracias por tu mensaje! Me pondré en contacto contigo pronto.');
            this.reset();
        });
    }
    
    // Initialize particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', 'js/particles.json', function() {
            console.log('Particles.js loaded');
        });
    }
});