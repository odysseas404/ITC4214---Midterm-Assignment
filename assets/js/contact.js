// Select the contact form element and add a submit event listener to validate the form inputs and display a confirmation modal.

const contactForm =
document.querySelector("#contactForm");

// Validate the form inputs and display a confirmation modal when the form is submitted.

contactForm.addEventListener("submit", function(event){

    //Prevents default submission in order to firstly confirm the form.
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

    //creates a modal that turns id=confirmationModal into a popup window.
    const modal =
    new bootstrap.Modal(
        document.querySelector("#confirmationModal")
    );

    modal.show();

    contactForm.reset();

});