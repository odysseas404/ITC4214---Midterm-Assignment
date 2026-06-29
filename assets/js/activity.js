//Constant variable to select the activity list element from the DOM

const activityList =
document.querySelector("#activityList");

//Check if the activity list element exists in the DOM

if(activityList){

    //The saved activities are converted back into a JS array using JSON.parse()
    const activities =
    JSON.parse(
        localStorage.getItem("activities")
    ) || []; //or statement - if activities don't exist, use an empty array.

    //Clear the current content of the activity list before populating it with new activities

    activityList.innerHTML = "";

    if(activities.length === 0){

        activityList.innerHTML =
        "<li>No activity available yet.</li>";

    }

    //Iterate over the activities in reverse order to display the most recent activities first

    activities
    .slice() //copies the activities array and then reverses the copy. 
    .reverse()
    .forEach(function(activity){

        activityList.innerHTML +=
        `<li>${activity}</li>`;

    });

}