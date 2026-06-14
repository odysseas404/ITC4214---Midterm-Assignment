//Constant variable to select the activity list element from the DOM

const activityList =
document.querySelector("#activityList");

//Check if the activity list element exists in the DOM

if(activityList){

    const activities =
    JSON.parse(
        localStorage.getItem("activities")
    ) || [];

    //Clear the current content of the activity list before populating it with new activities

    activityList.innerHTML = "";

    if(activities.length === 0){

        activityList.innerHTML =
        "<li>No activity available yet.</li>";

    }

    //Iterate over the activities in reverse order to display the most recent activities first

    activities
    .slice()
    .reverse()
    .forEach(function(activity){

        activityList.innerHTML +=
        `<li>${activity}</li>`;

    });

}