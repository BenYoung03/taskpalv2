
//Code to toggle between sign up and sign in form
const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('sign-in');
const signUpForm=document.getElementById('sign-up');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})

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