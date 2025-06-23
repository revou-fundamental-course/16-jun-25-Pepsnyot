const links = document.querySelectorAll('.nav-link');
const highlight = document.querySelector('.highlight');

links.forEach((link, index) => {
    link.addEventListener('mouseenter', () => {
        highlight.style.left = `${index * 25}%`;
    });
});

// Default posisi highlight di awal
highlight.style.left = `0%`;