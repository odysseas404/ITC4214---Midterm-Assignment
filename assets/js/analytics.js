//Constant variable to select the commissions from local storage

const commissions =
JSON.parse(
    localStorage.getItem("commissions")
) || []; //or - if nothing is stored, use an empty array instead.

let completed = 0;
let pending = 0;

//Loop through the commissions and count the completed and pending commissions

commissions.forEach(function(commission){

    if(commission.status === "Completed"){

        completed++;

    }
    else{

        pending++;

    }

});

//Select the canvas element for the chart and create a new Chart instance.

const chartCanvas =
document.querySelector("#commissionChart");

new Chart(chartCanvas, {

    type: "pie",

    data: {

        labels: [

            "Completed",
            "Pending"

        ],

        datasets: [{

            data: [

                completed,
                pending

            ],

            backgroundColor: [

                "#198754",
                "#dc3545"

            ]

        }]

    },

    options: {

        plugins: {

            legend: {

                labels: {

                    color:
                    document.body.classList.contains("dark-mode")
                    ? "white" //ternary operator if
                    : "black" //ternary operator else

                }

            }

        }

    }

});