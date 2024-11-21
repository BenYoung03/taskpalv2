// Code to toggle between sign up and sign in form
const signUpButton = document.getElementById('signUpButton');
const signInButton = document.getElementById('signInButton');
const signInForm = document.getElementById('sign-in');
const signUpForm = document.getElementById('sign-up');
const resetPasswordForm = document.getElementById('reset-password-form');
const resetPasswordButton = document.getElementById('reset-password');
const backToSignInButton = document.getElementById('backToSignInButton');

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

resetPasswordButton.addEventListener('click', function() {
    signInForm.classList.add('fade-out');
    signInForm.classList.remove('fade-in');
    resetPasswordForm.classList.add('fade-in');
    resetPasswordForm.classList.remove('fade-out');
    setTimeout(() => {
        signInForm.style.display = "none";
        resetPasswordForm.style.display = "block";
    }, 500);
});

backToSignInButton.addEventListener('click', function() {
    resetPasswordForm.classList.add('fade-out');
    resetPasswordForm.classList.remove('fade-in');
    signInForm.classList.add('fade-in');
    signInForm.classList.remove('fade-out');
    setTimeout(() => {
        resetPasswordForm.style.display = "none";
        signInForm.style.display = "block";
    }, 500);
});

function toggleShowPasswordReg() {
    var x = document.getElementById("passwordR");
    var button = document.querySelector('.show-password-reg');
    if (x.type === "password") {
        x.type = "text";
        button.innerHTML = "Hide";
    } else {
        x.type = "password";
        button.innerHTML = "Show";
    }
}

function toggleShowPasswordSignIn() {
    var x = document.getElementById("password");
    var button = document.querySelector('.show-password-sign');
    if (x.type === "password") {
        x.type = "text";
        button.innerHTML = "Hide";
    } else {
        x.type = "password";
        button.innerHTML = "Show";
    }
}