const images =
document.querySelectorAll(".clickable-image");

const modalImage =
document.querySelector("#modalImage");

images.forEach(function(image){

    image.addEventListener("click", function(){

        modalImage.src = this.src;

        const modal =
        new bootstrap.Modal(
            document.querySelector("#imageModal")
        );

        modal.show();

    });

});