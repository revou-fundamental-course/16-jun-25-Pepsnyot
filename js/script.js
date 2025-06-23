const links = document.querySelectorAll('.nav-link');
const highlight = document.querySelector('.highlight');

links.forEach((link, index) => {
    link.addEventListener('mouseenter', () => {
        highlight.style.left = `${index * 25}%`;
    });
});

// Default posisi highlight di awal
highlight.style.left = `0%`;

const toggleButton = document.getElementById('toggleButton');
const textA = document.getElementById('textA');
const textB = document.getElementById('textB');

toggleButton.addEventListener('change', function() {
    if (this.checked) {
        textA.style.display = 'none';
        textB.style.display = 'block';
    } else {
        textA.style.display = 'block';
        textB.style.display = 'none';
    }
});