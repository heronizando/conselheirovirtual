// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .plan-card, .about-content > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Plan selection handling
document.querySelectorAll('.plan-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const planName = this.closest('.plan-card').querySelector('.plan-name').textContent;
        
        // Create a simple modal or alert for demo purposes
        const modal = document.createElement('div');
        modal.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
            ">
                <div style="
                    background: white;
                    padding: 2rem;
                    border-radius: 1rem;
                    text-align: center;
                    max-width: 400px;
                    margin: 1rem;
                ">
                    <h3 style="margin-bottom: 1rem; color: #1f2937;">Plano ${planName} Selecionado!</h3>
                    <p style="margin-bottom: 2rem; color: #6b7280;">
                        Para ativar seu plano, instale a extensão e faça seu cadastro.
                    </p>
                    <div style="display: flex; gap: 1rem; justify-content: center;">
                        <a href="https://chromewebstore.google.com/detail/dpccjdmjjhfmmfpbgbklmnihiphaidkp?authuser=0&hl=pt-BR" 
                           target="_blank"
                           style="
                               background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
                               color: white;
                               padding: 0.75rem 1.5rem;
                               border-radius: 0.5rem;
                               text-decoration: none;
                               font-weight: 600;
                           ">
                           Instalar Extensão
                        </a>
                        <button onclick="this.closest('div').remove()" style="
                            background: #f3f4f6;
                            color: #374151;
                            padding: 0.75rem 1.5rem;
                            border: none;
                            border-radius: 0.5rem;
                            font-weight: 600;
                            cursor: pointer;
                        ">
                            Fechar
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    });
});

// Add loading animation to install buttons
document.querySelectorAll('a[href*="chromewebstore"]').forEach(btn => {
    btn.addEventListener('click', function() {
        const originalText = this.innerHTML;
        this.innerHTML = '<span style="display: flex; align-items: center; gap: 0.5rem;"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation: spin 1s linear infinite;"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>Redirecionando...</span>';
        
        setTimeout(() => {
            this.innerHTML = originalText;
        }, 2000);
    });
});

// Add CSS for spin animation
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Statistics counter animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString('pt-BR');
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString('pt-BR');
        }
    }
    
    updateCounter();
}

// Animate statistics when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            
            if (text.includes('k+')) {
                const number = parseInt(text.replace('k+', '')) * 1000;
                animateCounter(statNumber, number);
            } else if (text.includes('%')) {
                const number = parseInt(text.replace('%', ''));
                animateCounter(statNumber, number);
            }
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// Language switching functionality
const translations = {
    pt: {
        // Navigation
        'Início': 'Início',
        'Recursos': 'Recursos',
        'Planos': 'Planos',
        'Sobre': 'Sobre',
        
        // Hero section
        'Seu': 'Seu',
        'Apoio Emocional': 'Apoio Emocional',
        'Disponível 24/7': 'Disponível 24/7',
        'Encontre suporte, compreensão e orientação sempre que precisar. O Friendly Counselor está aqui para ajudar você em todos os momentos.': 'Encontre suporte, compreensão e orientação sempre que precisar. O Friendly Counselor está aqui para ajudar você em todos os momentos.',
        'Instalar Extensão': 'Instalar Extensão',
        'Saiba Mais': 'Saiba Mais',
        
        // Features
        'Por que escolher o Friendly Counselor?': 'Por que escolher o Friendly Counselor?',
        'Cuidando do seu bem-estar com tecnologia e humanidade': 'Cuidando do seu bem-estar com tecnologia e humanidade',
        '100% Privado e Seguro': '100% Privado e Seguro',
        'Suas conversas são completamente confidenciais. Ambiente seguro e protegido para você se expressar livremente.': 'Suas conversas são completamente confidenciais. Ambiente seguro e protegido para você se expressar livremente.',
        'Disponível 24/7': 'Disponível 24/7',
        'Apoio emocional quando você mais precisa, a qualquer hora do dia ou da noite, sem julgamentos.': 'Apoio emocional quando você mais precisa, a qualquer hora do dia ou da noite, sem julgamentos.',
        'Conselheiros Especialistas': 'Conselheiros Especialistas',
        'Acesso a profissionais qualificados com o plano Gold para um suporte ainda mais personalizado.': 'Acesso a profissionais qualificados com o plano Gold para um suporte ainda mais personalizado.',
        'Alívio Imediato': 'Alívio Imediato',
        'Suporte instantâneo para momentos de ansiedade, estresse ou conflitos pessoais.': 'Suporte instantâneo para momentos de ansiedade, estresse ou conflitos pessoais.'
    },
    en: {
        // Navigation
        'Início': 'Home',
        'Recursos': 'Features',
        'Planos': 'Plans',
        'Sobre': 'About',
        
        // Hero section
        'Seu': 'Your',
        'Apoio Emocional': 'Emotional Support',
        'Disponível 24/7': 'Available 24/7',
        'Encontre suporte, compreensão e orientação sempre que precisar. O Friendly Counselor está aqui para ajudar você em todos os momentos.': 'Find support, understanding and guidance whenever you need it. Friendly Counselor is here to help you through every moment.',
        'Instalar Extensão': 'Install Extension',
        'Saiba Mais': 'Learn More',
        
        // Features
        'Por que escolher o Friendly Counselor?': 'Why choose Friendly Counselor?',
        'Cuidando do seu bem-estar com tecnologia e humanidade': 'Caring for your wellbeing with technology and humanity',
        '100% Privado e Seguro': '100% Private & Secure',
        'Suas conversas são completamente confidenciais. Ambiente seguro e protegido para você se expressar livremente.': 'Your conversations are completely confidential. Safe and protected environment for you to express yourself freely.',
        'Disponível 24/7': 'Available 24/7',
        'Apoio emocional quando você mais precisa, a qualquer hora do dia ou da noite, sem julgamentos.': 'Emotional support when you need it most, any time of day or night, without judgment.',
        'Conselheiros Especialistas': 'Expert Counselors',
        'Acesso a profissionais qualificados com o plano Gold para um suporte ainda mais personalizado.': 'Access to qualified professionals with Gold plan for even more personalized support.',
        'Alívio Imediato': 'Immediate Relief',
        'Suporte instantâneo para momentos de ansiedade, estresse ou conflitos pessoais.': 'Instant support for moments of anxiety, stress or personal conflicts.'
    }
};

let currentLanguage = 'pt';

// Language switching
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        if (lang !== currentLanguage) {
            switchLanguage(lang);
        }
    });
});

function switchLanguage(lang) {
    currentLanguage = lang;
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en-US';
    
    // Update all translatable elements
    document.querySelectorAll('[data-pt][data-en]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update page title and meta description
    if (lang === 'en') {
        document.title = 'Friendly Counselor - Emotional Support 24/7 | Chrome Extension';
        document.querySelector('meta[name="description"]').content = 'Get instant emotional support 24/7 with Friendly Counselor Chrome extension. Private, secure counseling with AI and expert therapists. Free plan available.';
    } else {
        document.title = 'Friendly Counselor - Seu Apoio Emocional 24/7';
        document.querySelector('meta[name="description"]').content = 'Obtenha apoio emocional instantâneo 24/7 com a extensão Friendly Counselor. Aconselhamento privado e seguro com IA e terapeutas especialistas. Plano gratuito disponível.';
    }
}

// Initialize language based on browser language
function initializeLanguage() {
    const browserLang = navigator.language.slice(0, 2);
    const initialLang = browserLang === 'pt' ? 'pt' : 'en';
    switchLanguage(initialLang);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', initializeLanguage);