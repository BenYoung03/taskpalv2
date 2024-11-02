// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
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

document.querySelector(".add-task-confirm").addEventListener('click', function() {
    const inputTask = document.querySelector(".form-container input[type='text']");
    const inputDate = document.querySelector(".form-container input[type='date']");
    
    const gridContainer = document.querySelector(".grid-container");
    const newItemContainer = document.createElement("div");
    newItemContainer.classList.add("grid-item");
    gridContainer.appendChild(newItemContainer);

    const newItemText = document.createElement("div");
    newItemText.classList.add("grid-item-text");
    newItemContainer.appendChild(newItemText);

    const taskHeader = document.createElement("h2");
    taskHeader.textContent = inputTask.value; 
    newItemText.appendChild(taskHeader);

    const dueDate = document.createElement("p");
    dueDate.textContent = inputDate.value; 
    newItemText.appendChild(dueDate);
});
