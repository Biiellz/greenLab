// 1. Mudança de estilo do Menu ao rolar (Sticky Navbar)
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 50);
});

// 2. Menu Mobile (Hamburguer)
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuToggle.textContent = menuToggle.textContent === '☰' ? '✕' : '☰';
});

// Fecha o menu ao clicar em qualquer link (Mobile)
document.querySelectorAll('.nav-menu li a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.textContent = '☰';
    });
});

// 3. Seleção Múltipla dos Cards de Serviços
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('selected');
    });
});

// 4. Highlight Dinâmico no menu conforme o Scroll da página
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// 5. Manipulação do Formulário e Envio para o WhatsApp
document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault(); 

    const numeroWhatsApp = "5561995411862"; 

    // Captura os dados textuais dos inputs
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const car = document.getElementById('car').value;
    const message = document.getElementById('message').value;

    // Coleta dinamicamente os títulos (h3) de todos os cards com a classe '.selected'
    const cardsSelecionados = document.querySelectorAll('.card.selected h3');
    const servicosEscolhidos = Array.from(cardsSelecionados).map(h3 => h3.textContent);

    // Validação obrigatória dos cards
    if (servicosEscolhidos.length === 0) {
        alert("Por favor, selecione pelo menos um serviço clicando nos nossos cards de serviços acima antes de enviar!");
        return;
    }

    const listaServicos = servicosEscolhidos.join(', ');

    // Monta a mensagem formatada para o WhatsApp
    let textoMensagem = `Olá, gostaria de agendar um serviço!%0A%0A`;
    textoMensagem += `*Nome:* ${name}%0A`;
    textoMensagem += `*WhatsApp:* ${phone}%0A`;
    textoMensagem += `*Veículo:* ${car}%0A`;
    textoMensagem += `*Serviços Selecionados:* ${listaServicos}%0A`;
    
    if (message.trim() !== "") {
        textoMensagem += `*Observações:* ${message}`;
    }

    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${textoMensagem}`;

    window.open(linkWhatsApp, '_blank');

    // Reseta o form e remove as marcações visuais douradas dos cards
    this.reset();
    cards.forEach(card => card.classList.remove('selected'));
});