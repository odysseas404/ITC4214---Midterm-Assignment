const navbar = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container">

      <a class="navbar-brand d-flex align-items-center"
   href="index.html">

    <img src="assets/images/logo.png"
         alt="Escapism logo"
         width="40"
         height="40"
         class="me-2">

    Escapism

</a>

        <button class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarMenu"
                aria-label="Toggle navigation">

            <span class="navbar-toggler-icon"></span>

        </button>

        <div class="collapse navbar-collapse" id="navbarMenu">

            <ul class="navbar-nav ms-auto">

                <li class="nav-item">
                    <a class="nav-link" href="index.html">Home</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="tasks.html">Commissions</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="portfolio.html">Portfolio</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="about.html">About</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="contact.html">Contact</a>
                </li>

            </ul>

        </div>

        <button class="btn btn-outline-light"
        id="darkModeButton">

    Dark Mode

</button>

    </div>
</nav>
`;

document.querySelector("header").innerHTML = navbar;

const footer = `
<div class="container text-center p-3">

    <h5>Escapism</h5>

    <p>Email: info@escapism.com</p>

    <p>&copy; 2026 Escapism</p>

</div>
`;

document.querySelector("footer").innerHTML = footer;

const darkButton =
document.querySelector("#darkModeButton");

darkButton.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");

});