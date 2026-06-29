// Fetch a random quote from the API and display it in the quoteText element.

fetch("https://dummyjson.com/quotes/random")

//then -> when the data is ready, run this function.
.then(function(response) {
    //converts the response into a JS object.
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