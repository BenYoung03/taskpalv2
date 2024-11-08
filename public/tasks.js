//Update tasks front end when a new task is added
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

    const completeButton = document.createElement("button");
    completeButton.classList.add("complete-task");
    completeButton.textContent = "Complete";
    newItemContainer.appendChild(completeButton);

    /*
    TODO: Add implementation where on click of complete button, the task is removed from the grid and removed from firestore
    completeButton.addEventListener('click', function() {
        gridContainer.removeChild(newItemContainer);
    });
    */
});