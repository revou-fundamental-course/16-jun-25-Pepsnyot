console.log('Script loaded');
const links = document.querySelectorAll('.nav-link');
const highlight = document.querySelector('.highlight');

links.forEach((link, index) => {
    link.addEventListener('mouseenter', () => {
        highlight.style.left = `${index * 25}%`;
    });
});

// Default posisi highlight di awal
highlight.style.left = `0%`;

document.addEventListener('DOMContentLoaded', function() {
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
});


function hitungLuas() {
    // Ambil nilai input
    const alas = parseFloat(document.getElementById('alas1').value);
    const tinggi = parseFloat(document.getElementById('tinggi1').value);

    // Validasi input
    if (isNaN(alas) || isNaN(tinggi)) {
        alert("Masukkan angka yang valid!");
        return;
    }

    // Hitung luas
    const luas = 0.5 * alas * tinggi;

    // Tampilkan hasil
    document.getElementById('hasilluas').textContent =
        `${luas} cm²`;
}

function hitungKeliling() {
    // Ambil nilai input
    const alas = parseFloat(document.getElementById('alas2').value);
    const tinggi = parseFloat(document.getElementById('tinggi2').value);
    const miring = parseFloat(document.getElementById('miring').value);

    // Validasi input
    if (isNaN(alas) || isNaN(tinggi) || isNaN(miring)) {
        alert("Masukkan angka yang valid!");
        return;
    }

    // Hitung keliling
    const keliling = alas + tinggi + miring;

    // Tampilkan hasil
    document.getElementById('hasilkeliling').textContent =
        ` ${keliling} cm`;
}