let commissions = [];

const form =
document.querySelector("#commissionForm");

form.addEventListener("submit", function(event){

    event.preventDefault();

    const client =
    document.querySelector("#clientName").value;

    const description =
    document.querySelector("#description").value;

    const dueDate =
    document.querySelector("#dueDate").value;

    const priority =
    document.querySelector("#priority").value;

    const commission = {

        client: client,

        description: description,

        dueDate: dueDate,

        priority: priority,

        status: "Pending"

    };

    commissions.push(commission);

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

    if(filterValue !== "All"){

        filteredCommissions =
        filteredCommissions.filter(function(item){

            return item.status === filterValue;

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

            priorityClass = "text-danger";

        }

        if(commission.priority === "Medium"){

            priorityClass = "text-warning";

        }

        if(commission.priority === "Low"){

            priorityClass = "text-success";

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

            </td>

        </tr>

        `;

    });

    addButtonEvents();

}

function addButtonEvents(){

    const completeButtons =
    document.querySelectorAll(".complete-btn");

    completeButtons.forEach(function(button){

        button.addEventListener("click", function(){

            const index =
            this.dataset.index;

            commissions[index].status =
            "Completed";

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

            commissions.splice(index,1);

            displayCommissions();

            updateSummary();

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