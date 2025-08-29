// Elementos do DOM
const themeToggle = document.querySelector('.theme-toggle');
const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('.nav-list');
const header = document.querySelector('.header');

// Função para alternar entre temas claro e escuro
function toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Atualiza o ícone do botão
    const icon = themeToggle.querySelector('i');
    icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Função para o menu hamburguer
function toggleMenu() {
    navList.classList.toggle('active');
    menuToggle.classList.toggle('active');
}

// Função para lidar com o scroll
function handleScroll() {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Função para animação suave do scroll
function smoothScroll(e) {
    if (e.target.hash) {
        e.preventDefault();
        const targetId = e.target.hash;
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            
            // Fecha o menu mobile se estiver aberto
            if (navList.classList.contains('active')) {
                toggleMenu();
            }
        }
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Carrega o tema salvo
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    
    // Atualiza o ícone inicial do tema
    const icon = themeToggle.querySelector('i');
    icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    // Adiciona listeners para os eventos
    themeToggle.addEventListener('click', toggleTheme);
    menuToggle.addEventListener('click', toggleMenu);
    window.addEventListener('scroll', handleScroll);
    
    // Adiciona smooth scroll para todos os links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', smoothScroll);
    });
    
    // Animação para elementos ao scrollar
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observa elementos para animação
    document.querySelectorAll('.tech-card, .feature-item').forEach(el => {
        observer.observe(el);
    });
});

// Fecha o menu mobile ao clicar fora
document.addEventListener('click', (e) => {
    if (navList.classList.contains('active') && 
        !e.target.closest('.nav-list') && 
        !e.target.closest('.menu-toggle')) {
        toggleMenu();
    }
});
