// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA8VdP3Tt4egN2yq8Ps8VKNMiOYKFcGEHQ",
    authDomain: "taskpal-75c5d.firebaseapp.com",
    projectId: "taskpal-75c5d",
    storageBucket: "taskpal-75c5d.firebasestorage.app",
    messagingSenderId: "257006037090",
    appId: "1:257006037090:web:871f22788458435c4bc93b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

//TODO: Place index.js and main.js in src folder and get them to still work
//TODO: Add a sign out button
//TODO: Fix sign in button

const signUp = document.getElementById("sign-up-confirm");
if (signUp) {
    signUp.addEventListener('click', function() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            console.log(user);
            window.location.href = "index.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    });
} else {
    console.error("Element with id 'sign-up-confirm' not found.");
}

const signIn = document.getElementById("sign-in-confirm");
if (signIn) {
    signIn.addEventListener('click', function() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            window.location.href = "index.html";
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });
    });
} else {
    console.error("Element with id 'sign-in-confirm' not found.");
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(uid);
        // ...
    } else {
        // User is signed out
        // ...
    }
});
