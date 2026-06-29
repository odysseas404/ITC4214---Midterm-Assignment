// Select all clickable images and the modal image element, and add a click event listener to each image to display it in a modal when clicked.

const images =
document.querySelectorAll(".clickable-image");

// Select the modal image element to display the clicked image in the modal.

const modalImage =
document.querySelector("#modalImage");

// Add a click event listener to each clickable image to display it in the modal when clicked.

images.forEach(function(image){
    //Event listener for each image to show the modal with the clicked image when clicked.
    
    image.addEventListener("click", function(){

        //.this retrieves the file path of the selected image.
        modalImage.src = this.src;

        //new: creates a new object - turning ordinary HTML into a working Bootstrap popup.
        const modal =
        new bootstrap.Modal(
            document.querySelector("#imageModal")
        );

        modal.show();

    });

});