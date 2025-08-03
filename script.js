const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Botão "Ver mais" do mural
const verMaisBtn = document.getElementById('verMais');
const galeria = document.querySelector('.galeria');

verMaisBtn.addEventListener('click', () => {
    galeria.classList.toggle('expanded');
    verMaisBtn.textContent = galeria.classList.contains('expanded') ? 'Ver menos' : 'Ver mais';
});
