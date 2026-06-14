const activityList =
document.querySelector("#activityList");

if(activityList){

    const activities =
    JSON.parse(
        localStorage.getItem("activities")
    ) || [];

    activityList.innerHTML = "";

    if(activities.length === 0){

        activityList.innerHTML =
        "<li>No activity available yet.</li>";

    }

    activities
    .slice()
    .reverse()
    .forEach(function(activity){

        activityList.innerHTML +=
        `<li>${activity}</li>`;

    });

}