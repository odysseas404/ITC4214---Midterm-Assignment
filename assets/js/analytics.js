const commissions =
JSON.parse(
    localStorage.getItem("commissions")
) || [];

let completed = 0;
let pending = 0;

commissions.forEach(function(commission){

    if(commission.status === "Completed"){

        completed++;

    }
    else{

        pending++;

    }

});

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
                    ? "white"
                    : "black"

                }

            }

        }

    }

});