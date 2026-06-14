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

            label:
            "Number of Commissions",

            data: [

                completed,
                pending

            ]

        }]

    }

});