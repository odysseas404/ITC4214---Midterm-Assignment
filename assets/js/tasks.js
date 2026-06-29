// Select the commissions from local storage or initialize an empty array if not found.

let commissions =
JSON.parse(
    localStorage.getItem("commissions")
) || [];

// Initialize counters for completed and pending commissions.

let editIndex = -1;
function saveCommissions(){

    localStorage.setItem(
        "commissions",
        JSON.stringify(commissions)
    );

}

// Select the commission form element and add a submit event listener to handle form submissions.

let activities =
JSON.parse(localStorage.getItem("activities")) || [];

const form =
document.querySelector("#commissionForm");

// Add a submit event listener to the commission form to validate inputs, create or update commissions, and update the display and summary.

form.addEventListener("submit", function(event){

    event.preventDefault();

    const client =
    document.querySelector("#clientName").value;

    if(!/^[A-Za-z ]+$/.test(client)){

    alert(
        "Client name can only contain letters."
    );

    return;

    }

    const description =
    document.querySelector("#description").value;

    const dueDate =
    document.querySelector("#dueDate").value;

    //today's date.
    const today =
    new Date()
    .toISOString()
    .split("T")[0];

// Set the minimum date for the due date input to today's date to prevent selecting past dates.

document.querySelector("#dueDate")
.min = today;

    const priority =
    document.querySelector("#priority").value;

    //creating a commission object for a complete commission.
    const commission = {

    client: client,

    description: description,

    dueDate: dueDate,

    priority: priority,

    //if adding a new commission -> pending / else -> keep the commission's existing status.
    status:
    editIndex === -1
    ? "Pending"
    : commissions[editIndex].status

};
    // If editIndex is -1, it means a new commission is being added, so push the new commission to the commissions array and save it to local storage. Otherwise, update the existing commission at editIndex.

    if(editIndex === -1){

    commissions.push(commission);

    saveCommissions();

    activities.push(
    `${client} submitted a new commission`
);

// Save the updated activities array to local storage.

localStorage.setItem(
    "activities",
    JSON.stringify(activities)
);

}
else{
    // If editIndex is not -1, it means an existing commission is being edited, so update the commission at editIndex with the new data and save it to local storage.

    commissions[editIndex] = commission;
    
    saveCommissions();

    editIndex = -1;

    document.querySelector("button[type='submit']")
    .textContent = "Add Commission";

}

// After adding or updating a commission, display the updated commissions, update the summary, and reset the form.

    displayCommissions();

    updateSummary();

    form.reset();

});

// Function to display the commissions in the table based on the selected filters and sorting options.

function displayCommissions(){

    const tableBody =
    document.querySelector("#commissionTableBody");

    tableBody.innerHTML = "";

    let filteredCommissions =
    [...commissions];

    const filterValue =
    document.querySelector("#statusFilter").value;
    
    const priorityValue =
    document.querySelector("#priorityFilter").value;

    if(filterValue !== "All"){

        filteredCommissions =
        filteredCommissions.filter(function(item){

            return item.status === filterValue;

        });

    }

    // If the selected priority filter is not "All", filter the commissions based on the selected priority.

    if(priorityValue !== "All"){

    filteredCommissions =
    filteredCommissions.filter(function(item){

        return item.priority === priorityValue;

    });

    }
    
    // Get the selected sorting option and sort the filtered commissions accordingly.

    const sortValue =
    document.querySelector("#sortOption").value;

    // If the selected sorting option is "name", sort the filtered commissions alphabetically by client name.

    if(sortValue === "name"){

        filteredCommissions.sort(function(a,b){

            return a.client.localeCompare(b.client);

        });

    }

    // If the selected sorting option is "date", sort the filtered commissions by due date in ascending order.

    if(sortValue === "date"){

        filteredCommissions.sort(function(a,b){

            return new Date(a.dueDate) -
                   new Date(b.dueDate);

        });

    }

    // If the selected sorting option is "priority", sort the filtered commissions by priority in the order of High, Medium, and Low.
    
    filteredCommissions.forEach(function(commission){

    const index =
    commissions.indexOf(commission);

        let priorityClass = "";

        if(commission.priority === "High"){

            priorityClass = "high-priority";

        }

        if(commission.priority === "Medium"){

            priorityClass = "medium-priority";

        }

        if(commission.priority === "Low"){

            priorityClass = "low-priority";

        }

        tableBody.innerHTML += `

        <tr>

    <td>${commission.client}</td>

    <td>${commission.description}</td>

    <td>${commission.dueDate}</td>

    <td class="${priorityClass}">
        ${commission.priority}
    </td>

    <td>${commission.status}</td>

    <td>

        <div class="d-flex gap-2 justify-content-center">

            <button
            class="btn btn-primary btn-sm edit-btn"
            data-index="${index}">

                Edit

            </button>

            <button
            class="btn btn-success btn-sm complete-btn"
            data-index="${index}">

                Complete

            </button>

            <button
            class="btn btn-danger btn-sm delete-btn"
            data-index="${index}">

                Delete

            </button>

        </div>

    </td>

</tr>

        `;

    });

    addButtonEvents();

}

// Function to add event listeners to the edit, complete, and delete buttons for each commission in the table.

function addButtonEvents(){

    const editButtons =
document.querySelectorAll(".edit-btn");

editButtons.forEach(function(button){

    // Add a click event listener to each edit button to populate the form with the commission data for editing.

    button.addEventListener("click", function(){

        const index =
        this.dataset.index;

        document.querySelector("#clientName").value =
        commissions[index].client;

        document.querySelector("#description").value =
        commissions[index].description;

        document.querySelector("#dueDate").value =
        commissions[index].dueDate;

        document.querySelector("#priority").value =
        commissions[index].priority;

        editIndex = index;

        document.querySelector("button[type='submit']")
        .textContent = "Update Commission";

    });

});

    // Add click event listeners to the complete buttons to mark commissions as completed and update the display and summary.

    const completeButtons =
    document.querySelectorAll(".complete-btn");

    completeButtons.forEach(function(button){

        button.addEventListener("click", function(){

            const index =
            this.dataset.index;

            commissions[index].status =
            "Completed";

            saveCommissions();

            activities.push(
    `${commissions[index].client}'s commission was completed`
);

// Save the updated activities array to local storage.

localStorage.setItem(
    "activities",
    JSON.stringify(activities)
);

            displayCommissions();

            updateSummary();

        });

    });

    // Add click event listeners to the delete buttons to remove commissions from the array and update the display and summary.

    const deleteButtons =
    document.querySelectorAll(".delete-btn");

    deleteButtons.forEach(function(button){

    button.addEventListener("click", function(){

        const index =
        this.dataset.index;

        activities.push(
            `${commissions[index].client}'s commission was deleted`
        );

        localStorage.setItem(
            "activities",
            JSON.stringify(activities)
        );

        commissions.splice(index, 1);

        saveCommissions();

        displayCommissions();

    });

});

}

// Function to update the summary counts for total, pending, and completed commissions.

function updateSummary(){

    document.querySelector("#totalCount")
    .textContent =
    commissions.length;

    const pending =
    commissions.filter(function(item){

        return item.status === "Pending";

    }).length;

    const completed =
    commissions.filter(function(item){

        return item.status === "Completed";

    }).length;

    document.querySelector("#pendingCount")
    .textContent =
    pending;

    document.querySelector("#completedCount")
    .textContent =
    completed;

}

// Add event listeners to the filter and sort select elements to update the displayed commissions when the user changes the selected options.

document
.querySelector("#statusFilter")
.addEventListener("change", displayCommissions);

document
.querySelector("#sortOption")
.addEventListener("change", displayCommissions);

document
.querySelector("#priorityFilter")
.addEventListener("change", displayCommissions);

// Call the displayCommissions and updateSummary functions to initialize the display and summary counts when the page loads.

displayCommissions();

// Call the updateSummary function to initialize the summary counts when the page loads.

updateSummary();