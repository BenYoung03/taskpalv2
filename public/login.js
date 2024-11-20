// Code to toggle between sign up and sign in form
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('sign-in');
const signUpForm = document.getElementById('sign-up');

signUpButton.addEventListener('click', function() {
    signInForm.classList.add('fade-out');
    signInForm.classList.remove('fade-in');
    signUpForm.classList.add('fade-in');
    signUpForm.classList.remove('fade-out');
    setTimeout(() => {
        signInForm.style.display = "none";
        signUpForm.style.display = "block";
    }, 500); 
});

signInButton.addEventListener('click', function() {
    signUpForm.classList.add('fade-out');
    signUpForm.classList.remove('fade-in');
    signInForm.classList.add('fade-in');
    signInForm.classList.remove('fade-out');
    setTimeout(() => {
        signUpForm.style.display = "none";
        signInForm.style.display = "block";
    }, 500);
});