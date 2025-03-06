document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const darkModeToggle = document.getElementById("darkModeToggle");
    const lightModeToggle = document.getElementById("lightModeToggle");
    const logo = document.getElementById("logo");
    
    // Load mode from localStorage
    if (localStorage.getItem("theme") === "dark") {
        enableDarkMode();
    } else {
        enableLightMode();
    }

    darkModeToggle.addEventListener("click", () => {
        enableDarkMode();
    });

    lightModeToggle.addEventListener("click", () => {
        enableLightMode();
    });

    function enableDarkMode()  {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        document.querySelector(".navbar").classList.remove("navbar-light", "bg-light");
        document.querySelector(".navbar").classList.add("navbar-dark", "bg-dark");

        darkModeToggle.classList.add("d-none");
        lightModeToggle.classList.remove("d-none");

        logo.src = "./assets/dark-logo.png";
        localStorage.setItem("theme", "dark");
    }

    function enableLightMode()  {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        document.querySelector(".navbar").classList.remove("navbar-dark", "bg-dark");
        document.querySelector(".navbar").classList.add("navbar-light", "bg-light");

        darkModeToggle.classList.remove("d-none");
        lightModeToggle.classList.add("d-none");

        logo.src = "./assets/light-logo.png";
        localStorage.setItem("theme", "light");
    }
});