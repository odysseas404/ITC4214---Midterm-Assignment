const contactForm =
document.querySelector("#contactForm");

contactForm.addEventListener("submit", function(event){

    event.preventDefault();

    const name =
    document.querySelector("#name").value;

    const email =
    document.querySelector("#email").value;

    const subject =
    document.querySelector("#subject").value;

    const message =
    document.querySelector("#message").value;

    document.querySelector("#confirmationText")
    .innerHTML = `

        <strong>Name:</strong> ${name}<br>

        <strong>Email:</strong> ${email}<br>

        <strong>Subject:</strong> ${subject}<br>

        <strong>Message:</strong> ${message}

    `;

    const modal =
    new bootstrap.Modal(
        document.querySelector("#confirmationModal")
    );

    modal.show();

    contactForm.reset();

});