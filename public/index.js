// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {getFirestore, collection, getDocs, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

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
const db = getFirestore(app);

//TODO: Place index.js and main.js in src folder and get them to still work
//TODO: Add a sign out button

// Google Sign-In
// TODO: Either remove google sign in or make it work with the database
const googleProvider = new GoogleAuthProvider();
const googleSignIn = () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            console.log("Google Sign-In successful, user:", user);
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error("Google Sign-In error:", error);
        });
};

// Attach Google Sign-In to the Google Icon
const googleSignInButton = document.getElementById('googleButton');
if (googleSignInButton) {
    googleSignInButton.addEventListener('click', (event) => {
        event.preventDefault();
        googleSignIn();
    });
}

const signUp = document.getElementById("sign-up-confirm");
if (signUp) {
    signUp.addEventListener('click', function() {
        const emailR = document.getElementById("emailR").value;
        const passwordR = document.getElementById("passwordR").value;
        const firstName = document.getElementById('fName').value;
        const lastName = document.getElementById('lName').value;
        
        createUserWithEmailAndPassword(auth, emailR, passwordR)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            const userId = user.uid;

            const userData = {
                firstName: firstName,
                lastName: lastName,
                email: emailR,
            };

            const docRef = doc(db, "users", userId);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = 'login.html';
                })
                .catch((error) => {
                    console.error("Error writing document:", error);
                });
        })
        .catch((error) => {
            console.error("Sign-up error:", error);
            //TODO: Add visible error message to the user (example: duplicate account)
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
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href = "index.html";
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
