// Toggle Dark Mode
function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById('toggle-icon');

    body.classList.toggle('dark-mode');
    icon.style.opacity = 0;

    setTimeout(() => {
        if (body.classList.contains('dark-mode')) {
            icon.textContent = '🌞'; // Sun icon for light mode
            localStorage.setItem('dark-mode', 'enabled'); // Save preference
        } else {
            icon.textContent = '🌙'; // Moon icon for dark mode
            localStorage.setItem('dark-mode', 'disabled'); // Save preference
        }
        icon.style.opacity = 1;
    }, 200);
}

document.addEventListener('DOMContentLoaded', () => {
    const darkModePreference = localStorage.getItem('dark-mode');
    const body = document.body;
    const icon = document.getElementById('toggle-icon');

    if (darkModePreference === 'enabled') {
        body.classList.add('dark-mode');
        icon.textContent = '🌞';
    }
});
