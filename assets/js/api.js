// Fetch a random quote from the API and display it in the quoteText element.

fetch("https://dummyjson.com/quotes/random")

.then(function(response) {
    return response.json();
})

// Handle the response data and update the quoteText element with the quote.

.then(function(data) {

    document.querySelector("#quoteText").textContent =
        data.quote;

})

// Handle any errors that occur during the fetch request and display an error message in the quoteText element.

.catch(function() {

    document.querySelector("#quoteText").textContent =
        "Unable to load quote.";

});