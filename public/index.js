// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {getFirestore, collection, getDoc, doc, setDoc, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

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
                    document.querySelector('.error').innerHTML = "";
                    window.location.href = 'login.html';
                })
                .catch((error) => {
                    console.error("Error writing document:", error);
                });
                signInForm.style.display="block";
                signUpForm.style.display="none";
        })
        .catch((error) => {
            if(error.code === "auth/email-already-in-use") {
                document.querySelector('.error-sign-up').innerHTML = "Email already in use.";
            } else if (error.code === "auth/password-does-not-meet-requirements") {
                document.querySelector('.error-sign-up').innerHTML = "Password must contain at least 6 characters, Password must contain an upper case character.";
            } else if (error.code === "auth/invalid-email") {
                document.querySelector('.error-sign-up').innerHTML = "Invalid email.";
            } else {
                document.querySelector('.error-sign-up').innerHTML = error.message;
            }
            console.error("Sign-up error:", error);
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
            if(error.code === "auth/user-not-found") {
                document.querySelector('.error-sign-in').innerHTML = "User not found. Please register an account with this email.";
            } else if (error.code === "auth/invalid-credential") {
                document.querySelector('.error-sign-in').innerHTML = "Wrong email or password. Please try again or register a new account.";
            } else if (error.code === "auth/invalid-email") {
                document.querySelector('.error-sign-in').innerHTML = "Invalid email.";
            } else {
                document.querySelector('.error-sign-in').innerHTML = error.message;
            }
            console.error("Sign-in error:", error); 
        });
    });
} else {
    console.error("Element with id 'sign-in-confirm' not found.");
}

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            if (user.providerData[0].providerId === "password") {
                // Retrieve data from Firestore for email/password users
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();

                    // Set welcome message with first name from Firestore
                    const firstName = userData.firstName || "User";
                    document.getElementById("welcome").textContent = `Welcome, ${firstName}!`;
                    document.getElementById("login").style.display = "none";
                    document.getElementById("logout").style.display = "block";
                    console.log("Set welcome message to:", `Welcome, ${firstName}!`);
                } else {
                    console.log("No document found for this user in Firestore.");
                }
            } else {
                // Google Login: Use displayName directly
                const displayName = user.displayName || "User";
                const firstName = displayName.split(" ")[0];
                document.getElementById("login").style.display = "none";
                document.getElementById("logout").style.display = "block";
                document.getElementById("welcome").textContent = `Welcome, ${firstName}!`;
                console.log("Set welcome message to:", `Welcome, ${firstName}!`);
            }

        //TODO: Perhaps put this code in the main.js file 
        document.querySelector(".add-task-confirm").addEventListener("click", () => {
            const userId = user.uid;
            const taskDesc = document.getElementById("task").value;
            const dueDate = document.getElementById("due-date").value;

            const taskData = {
                taskDesc: taskDesc,    
                dueDate: dueDate,     
                userId: userId,      
            };
                
            addDoc(collection(db, "tasks"), taskData)
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch((error) => {
                    //TODO: Add error message on home page if not logged in for example
                    console.error("Error writing document:", error);
                });
        });
    }
});


    document.getElementById("logout").addEventListener("click", () => {
        signOut(auth)
            .then(() => {
                console.log("User signed out successfully.");
                localStorage.removeItem('loggedInUserId');
                document.getElementById("login").style.display = "block";
                document.getElementById("logout").style.display = "none";
                document.getElementById("welcome").textContent = ``;
                window.location.href = "index.html";
            })
            .catch((error) => {
                console.error("Sign-out error:", error);
            });
    }); 
});
