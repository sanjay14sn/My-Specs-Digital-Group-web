// Navbar component JS
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-container input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                alert('Searching for: ' + searchInput.value);
            }
        });
    }
});
