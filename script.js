// ==========================================
// Scroll Animations
// ==========================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');

            // Trigger skill bars animation
            if (entry.target.classList.contains('skill-category')) {
                animateSkills(entry.target);
            }
        }
    });
}, observerOptions);

// Observe all elements with class 'hidden'
document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

// ==========================================
// Skills Animation
// ==========================================
function animateSkills(container) {
    const bars = container.querySelectorAll('.skill-progress');
    bars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-progress');
        bar.style.width = targetWidth;
    });
}

// ==========================================
// Smooth Scroll for Internal Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Back to Top Button
// ==========================================
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ==========================================
// Typing Effect (Optional)
// ==========================================
const typingText = document.getElementById('typing-text');
if (typingText) {
    const words = ["Developer", "Designer", "Freelancer"];
    let wordIndex = 0;
    let charIndex = 0;
    let currentWord = '';
    let isDeleting = false;

    function type() {
        currentWord = words[wordIndex];
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex--);
        } else {
            typingText.textContent = currentWord.substring(0, charIndex++);
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            setTimeout(type, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        } else {
            setTimeout(type, isDeleting ? 50 : 100);
        }
    }

    type();
}
