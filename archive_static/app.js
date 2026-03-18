// Basic interactivity for GlassesUSA clone

document.addEventListener('DOMContentLoaded', () => {
    console.log('My Specs Digital Group');

    // Add sticky header behavior refinement
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
        } else {
            header.style.padding = '15px 0';
        }
    });

    // Mock search functionality
    const searchInput = document.querySelector('.search-container input');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            alert('Searching for: ' + searchInput.value);
        }
    });

    // Add smooth scroll for links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
