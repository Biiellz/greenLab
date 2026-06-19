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

// 3. Highlight Dinâmico no menu conforme o Scroll da página
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-menu li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
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

// 4. Manipulação do Formulário e Envio para o WhatsApp
document.getElementById('appointment-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o recarregamento da página

    // Exemplo: 55 + DDD + Número. Se for de Brasília (61) 99999-9999 fica: 5561999999999
    const numeroWhatsApp = "5561999117396"; 

    // 2. Captura os dados dos campos dinamicamente
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const car = document.getElementById('car').value;
    const service = document.getElementById('service-select').value;
    const message = document.getElementById('message').value;

    // 3. Monta a mensagem formatada com quebras de linha (%0A)
    let textoMensagem = `Olá, gostaria de agendar um serviço!%0A%0A`;
    textoMensagem += `*Nome:* ${name}%0A`;
    textoMensagem += `*WhatsApp:* ${phone}%0A`;
    textoMensagem += `*Veículo:* ${car}%0A`;
    textoMensagem += `*Serviço:* ${service}%0A`;
    
    // Se o cliente digitou uma mensagem opcional, adiciona no texto
    if (message.trim() !== "") {
        textoMensagem += `*Observações:* ${message}`;
    }

    // 4. Gera o link final da API do WhatsApp
    const linkWhatsApp = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${textoMensagem}`;

    // 5. Abre em uma nova aba o WhatsApp do cliente com a mensagem pronta
    window.open(linkWhatsApp, '_blank');

    // Opcional: Limpa o formulário após o disparo
    this.reset();
});