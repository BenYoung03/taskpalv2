// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {getFirestore,  getDoc,  doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

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
//TODO: Seperate authentication functionality and homepage functionality to reduce console errors

// Google Sign-In
// TODO: Either remove google sign in or make it work with the database
const googleProvider = new GoogleAuthProvider();
const googleSignIn = () => {
    signInWithPopup(auth, googleProvider)
        .then((result) => {
            const user = result.user;
            console.log("Google Sign-In successful, user:", user);
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

//Sign up with email and password
const signUp = document.getElementById("sign-up-confirm");
const signInForm = document.getElementById('sign-in');
const signUpForm = document.getElementById('sign-up');

if (signUp) {
    signUp.addEventListener('click', function() {
        //get values from input fields
        const emailR = document.getElementById("emailR").value;
        const passwordR = document.getElementById("passwordR").value;
        const firstName = document.getElementById('fName').value;
        const lastName = document.getElementById('lName').value;
        
        //call firebase function to create user with email and password
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

            // Add user data to Firestore by creating a new document with the user's ID and data
            const docRef = doc(db, "users", userId);
            setDoc(docRef, userData)
                .then(() => {
                    //redirect to login page
                    signUpForm.classList.add('fade-out');
                    signUpForm.classList.remove('fade-in');
                    signInForm.classList.add('fade-in');
                    signInForm.classList.remove('fade-out');
                    setTimeout(() => {
                        signUpForm.style.display = "none";
                        signInForm.style.display = "block";
                    }, 500);
                })
                .catch((error) => {
                    console.error("Error writing document:", error);
                });
                //show sign in form
                signInForm.style.display="block";
                signUpForm.style.display="none";
        })
        .catch((error) => {
            //various error handling
            if(error.code === "auth/email-already-in-use") {
                document.querySelector('.error-sign-up').innerHTML = "This email is already associated with an account.";
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

//Sign in with email and password
const signIn = document.getElementById("sign-in-confirm");
if (signIn) {
    signIn.addEventListener('click', function() {
        //get values from input fields
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        //call firebase function to sign in user with email and password
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => { 
            const user = userCredential.user;
            console.log("User signed in:", user);
            //Redirect to main page
            window.location.href = "index.html";
        })
        .catch((error) => {
            //various error handling
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

const resetPasswordConfirm = document.getElementById("reset-password-confirm");
    if (resetPasswordConfirm) {
        resetPasswordConfirm.addEventListener('click', function() {
            console.log("Reset password button clicked"); // Debug log
            const email = document.getElementById('reset-email').value;
            const resetPasswordForm = document.getElementById('reset-password-form');
            const signInForm = document.getElementById('sign-in');
            if (email) {
                sendPasswordResetEmail(auth, email)
                    .then(() => {
                        const resetPasswordMessage = document.querySelector('.error-reset-password');
                        resetPasswordMessage.textContent = 'Password reset email sent!';
                        resetPasswordMessage.style.color = 'green';
                        resetPasswordConfirm.style.display = "none";
                        setTimeout(() => {
                            resetPasswordForm.classList.add('fade-out');
                            resetPasswordForm.classList.remove('fade-in');
                            signInForm.classList.add('fade-in');
                            signInForm.classList.remove('fade-out');
                            setTimeout(() => {
                                resetPasswordForm.style.display = "none";
                                signInForm.style.display = "block";
                            }, 500);
                        }, 2000);
                    })
                    .catch((error) => {
                        const resetPasswordMessage = document.querySelector('.error-reset-password');
                        resetPasswordMessage.textContent = error.message
                        resetPasswordMessage.style.color = 'red';
                        console.error('Error sending password reset email:', error);
                    });
            } else {
                const resetPasswordMessage = document.querySelector('.error-reset-password');
                resetPasswordMessage.textContent = 'Please enter your email address.';
                resetPasswordMessage.style.color = 'red';
            }
        });
    } else {
        console.error("Element with id 'reset-password-confirm' not found.");
}

const formContainer = document.querySelector(".form-container");
const taskFunctions = document.querySelector(".task-functions");
const addTask = document.querySelector(".add-task");
document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            addTask.style.display = "block";
            taskFunctions.style.display = "block";
            //Remove logged out text warning if a user is detected
            document.getElementById("logged-out-text").style.display = "none";
            if (user.providerData[0].providerId === "password") {
                // Retrieve data from Firestore for email/password users
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const userData = docSnap.data();

                    // Set welcome message with first name from Firestore
                    const firstName = userData.firstName || "User";
                    document.getElementById("welcome").textContent = `Welcome, ${firstName}!`;
                    //Display logout button and hide login when user is logged in
                    document.getElementById("login").style.display = "none";
                    document.getElementById("logout").style.display = "block";
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

            addTask.addEventListener("click", () => {
                formContainer.style.display = "flex";
                addTask.style.display = "none";
                formContainer.classList.add("show");
            });

            const cancelTask = document.querySelector(".cancel-task");
            cancelTask.addEventListener("click", () => {
                formContainer.classList.remove("show");
                addTask.style.display = "block";
                formContainer.style.display = "none";
            });
    } else {
        //If there is no user signed in, then hide the task confirm button and show the login button
        console.log("No user is signed in.");
        document.querySelector(".add-task-confirm").style.display = "none";
        formContainer.style.display = "none";
        document.getElementById("login").style.display = "block";
        document.getElementById("logout").style.display = "none";
        document.getElementById("welcome").textContent = ``;
        addTask.style.display = "none";
        taskFunctions.style.display = "none";
    }
});

    //Logout button
    document.getElementById("logout").addEventListener("click", () => {
        signOut(auth)
            .then(() => {
                //Show login button and hide logout button on sign out
                console.log("User signed out successfully.");
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
