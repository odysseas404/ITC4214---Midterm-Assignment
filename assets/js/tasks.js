let commissions =
JSON.parse(
    localStorage.getItem("commissions")
) || [];

let editIndex = -1;
function saveCommissions(){

    localStorage.setItem(
        "commissions",
        JSON.stringify(commissions)
    );

}

let activities =
JSON.parse(localStorage.getItem("activities")) || [];

const form =
document.querySelector("#commissionForm");

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

    const today =
    new Date()
    .toISOString()
    .split("T")[0];

document.querySelector("#dueDate")
.min = today;

    const priority =
    document.querySelector("#priority").value;

    const commission = {

    client: client,

    description: description,

    dueDate: dueDate,

    priority: priority,

    status:
    editIndex === -1
    ? "Pending"
    : commissions[editIndex].status

};

    if(editIndex === -1){

    commissions.push(commission);

    saveCommissions();

    activities.push(
    `${client} submitted a new commission`
);

localStorage.setItem(
    "activities",
    JSON.stringify(activities)
);

}
else{

    commissions[editIndex] = commission;
    
    saveCommissions();

    editIndex = -1;

    document.querySelector("button[type='submit']")
    .textContent = "Add Commission";

}

    displayCommissions();

    updateSummary();

    form.reset();

});

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

    if(priorityValue !== "All"){

    filteredCommissions =
    filteredCommissions.filter(function(item){

        return item.priority === priorityValue;

    });

    }

    const sortValue =
    document.querySelector("#sortOption").value;

    if(sortValue === "name"){

        filteredCommissions.sort(function(a,b){

            return a.client.localeCompare(b.client);

        });

    }

    if(sortValue === "date"){

        filteredCommissions.sort(function(a,b){

            return new Date(a.dueDate) -
                   new Date(b.dueDate);

        });

    }

    filteredCommissions.forEach(function(commission,index){

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

function addButtonEvents(){

    const editButtons =
document.querySelectorAll(".edit-btn");

editButtons.forEach(function(button){

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

localStorage.setItem(
    "activities",
    JSON.stringify(activities)
);

            displayCommissions();

            updateSummary();

        });

    });

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

document
.querySelector("#statusFilter")
.addEventListener("change", displayCommissions);

document
.querySelector("#sortOption")
.addEventListener("change", displayCommissions);

document
.querySelector("#priorityFilter")
.addEventListener("change", displayCommissions);

displayCommissions();

updateSummary();