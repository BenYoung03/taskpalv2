// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {getFirestore, collection, getDocs, doc, addDoc, query, where, deleteDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"

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


document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            //Add task to Firestore
            document.querySelector(".add-task-confirm").addEventListener("click", () => {
            //Get values from input fields and current user ID
            const userId = user.uid;
            const taskDesc = document.getElementById("task").value;
            const dueDate = document.getElementById("due-date").value;

            const taskData = {
                taskDesc: taskDesc,    
                dueDate: dueDate,     
                userId: userId,      
            };

            const gridContainer = document.querySelector(".grid-container");
            const newItemContainer = document.createElement("div");
            newItemContainer.classList.add("grid-item");
            gridContainer.appendChild(newItemContainer);

            const newItemText = document.createElement("div");
            newItemText.classList.add("grid-item-text");
            newItemContainer.appendChild(newItemText);

            const taskHeader = document.createElement("h2");
            taskHeader.textContent = taskDesc; 
            newItemText.appendChild(taskHeader);

            const dueDateElement = document.createElement("p");
            dueDateElement.textContent = dueDate; 
            newItemText.appendChild(dueDateElement);

            const completeButton = document.createElement("button");
            completeButton.classList.add("complete-task");
            completeButton.textContent = "Complete";
            newItemContainer.appendChild(completeButton);
                
            //Add task to Firestore
            addDoc(collection(db, "tasks"), taskData)
                .then((docRef) => {
                    console.log("Document written with ID: ", docRef.id);
                    completeButton.addEventListener('click', async function() {
                        await deleteDoc(doc(db, "tasks", docRef.id));
                        gridContainer.removeChild(newItemContainer);
                        console.log("Document deleted with ID: ", docRef.id);    
                    });
                })
                .catch((error) => {
                    console.error("Error writing document:", error);
                });
        });

        //Gets all tasks from Firestore where the userId matches the current user's ID
        const tasksQuery = query(collection(db, "tasks"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(tasksQuery);

        //Clear the grid container before adding new tasks
        const gridContainer = document.querySelector(".grid-container");
        gridContainer.innerHTML = ""; 

        //Iterate through each task and add it to the grid container
        querySnapshot.forEach((taskDoc) => {
            const taskData = taskDoc.data();

            const newItemContainer = document.createElement("div");
            newItemContainer.classList.add("grid-item");
            gridContainer.appendChild(newItemContainer);

            const newItemText = document.createElement("div");
            newItemText.classList.add("grid-item-text");
            newItemContainer.appendChild(newItemText);

            const taskHeader = document.createElement("h2");
            taskHeader.textContent = taskData.taskDesc;
            newItemText.appendChild(taskHeader);

            const dueDate = document.createElement("p");
            dueDate.textContent = taskData.dueDate;
            newItemText.appendChild(dueDate);

            const completeButton = document.createElement("button");
            completeButton.classList.add("complete-task");
            completeButton.textContent = "Complete";
            newItemContainer.appendChild(completeButton);

            completeButton.addEventListener('click', async function() {
                await deleteDoc(doc(db, "tasks", taskDoc.id));
                gridContainer.removeChild(newItemContainer);
                console.log("Document deleted with ID: ", taskDoc.id);    
            });
        });
    } else {
        //If there is no user signed in, then hide the task confirm button and show the login button
        console.log("No user is signed in.");
        document.querySelector(".add-task-confirm").style.display = "none";
        document.getElementById("login").style.display = "block";
        document.getElementById("logout").style.display = "none";
        document.getElementById("welcome").textContent = ``;
    }
    });
});