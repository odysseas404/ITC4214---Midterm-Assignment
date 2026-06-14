const contactForm =
document.querySelector("#contactForm");

contactForm.addEventListener("submit", function(event){

    event.preventDefault();

    const name =
    document.querySelector("#name").value;

    if(!/^[A-Za-z\s'-]+$/.test(name)){

    alert(
        "Name can only contain letters."
    );

    return;

    }

    const email =
    document.querySelector("#email").value;

    const subject =
    document.querySelector("#subject").value;

    const message =
    document.querySelector("#message").value.trim();

    if(message.trim().length < 10){

    alert(
        "Message must contain at least 10 characters."
    );

    return;

    }

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