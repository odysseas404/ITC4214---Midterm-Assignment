fetch("https://api.quotable.io/random")

.then(function(response) {
    return response.json();
})

.then(function(data) {

    document.querySelector("#quoteText").textContent =
        data.content;

});