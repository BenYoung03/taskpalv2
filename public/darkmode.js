// Toggle Dark Mode
function toggleDarkMode() {
    const body = document.body;
    const icon = document.getElementById('toggle-icon');

    body.classList.toggle('dark-mode');
    icon.style.opacity = 0;

    setTimeout(() => {
        if (body.classList.contains('dark-mode')) {
            icon.textContent = '🌞'; 
            //Stores change to local browser
            localStorage.setItem('dark-mode', 'enabled'); 
        } else {
            icon.textContent = '🌙'; 
            //Stores change to local browser
            localStorage.setItem('dark-mode', 'disabled'); 
        }
        icon.style.opacity = 1;
    }, 200);
}

document.addEventListener('DOMContentLoaded', () => {
    //When DOM fully loaded, get the preference from local brower storage
    const darkModePreference = localStorage.getItem('dark-mode');
    const body = document.body;
    const icon = document.getElementById('toggle-icon');

    if (darkModePreference === 'enabled') {
        body.classList.add('dark-mode');
        icon.textContent = '🌞';
    }
});
