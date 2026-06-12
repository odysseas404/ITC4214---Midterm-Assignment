fetch("https://dummyjson.com/quotes/random")

.then(function(response) {
    return response.json();
})

.then(function(data) {

    document.querySelector("#quoteText").textContent =
        data.quote;

})

.catch(function() {

    document.querySelector("#quoteText").textContent =
        "Unable to load quote.";

});