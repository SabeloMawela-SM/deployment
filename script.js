document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const darkModeToggle = document.getElementById("darkModeToggle");
    const lightModeToggle = document.getElementById("lightModeToggle");
    const logo = document.getElementById("logo");
    const Logo =document.getElementById("Logo")
    const heroImg = document.getElementById("heroImg");

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

    function enableDarkMode() {
        body.classList.remove("light-mode");
        body.classList.add("dark-mode");
        document.querySelector(".navbar").classList.remove("navbar-light", "bg-light");
        document.querySelector(".navbar").classList.add("navbar-dark", "bg-dark");
        document.querySelector(".footer").classList.remove("footer-light", "bg-light");
        document.querySelector(".footer").classList.add("footer-dark", "bg-dark");
        darkModeToggle.classList.add("d-none");
        lightModeToggle.classList.remove("d-none");
        heroImg.style.backgroundImage = "url('./assets/hero_processed.png')";
        logo.src = "./assets/dark-logo.png";
        Logo.src="./assets/dark-logo.png" ;
        localStorage.setItem("theme", "dark");
    }

    function enableLightMode() {
        body.classList.remove("dark-mode");
        body.classList.add("light-mode");
        document.querySelector(".navbar").classList.remove("navbar-dark", "bg-dark");
        document.querySelector(".navbar").classList.add("navbar-light", "bg-light");
        document.querySelector(".footer").classList.remove("footer-dark", "bg-dark");
        document.querySelector(".footer").classList.add("footer-light", "bg-light");
        darkModeToggle.classList.remove("d-none");
        lightModeToggle.classList.add("d-none");
        heroImg.style.backgroundImage = "url('./assets/hero.png')";
        logo.src = "./assets/light-logo.png";
        Logo.src= "./assets/light-logo.png";
        localStorage.setItem("theme", "light");
    }

    // Form validation and preview logic
    function validateAndPreview() {
        let valid = true;
        let numbers = [];
        let errorMessages = [
            "",
            "Please enter a valid current age.",
            "Please enter a valid retirement age greater than current age.",
            "Please enter a valid gross monthly income.",
            "Please enter a valid monthly retirement contribution.",
            "Please enter a valid savings component value.",
            "Please enter a valid withdrawal amount between R2,500 and the savings component value."
        ];

        // Loop through each input field for validation
        for (let i = 1; i <= 6; i++) {
            let input = document.getElementById(`number${i}`);
            let error = document.getElementById(`error${i}`);

            // Reset previous validation styles and messages
            input.classList.remove("is-invalid");

            if (input.value.trim() === "") {
                error.textContent = errorMessages[i];
                input.classList.add("is-invalid");
                valid = false;
            } else {
                let num = Number(input.value);
                if (isNaN(num)) {
                    error.textContent = "Invalid number.";
                    input.classList.add("is-invalid");
                    valid = false;
                } else {
                    // Retirement Age validation (should be greater than Current Age)
                    if (i === 2) {
                        let currentAge = Number(document.getElementById("number1").value);
                        if (num <= currentAge) {
                            error.textContent = "Retirement age must be greater than current age.";
                            input.classList.add("is-invalid");
                            valid = false;
                        }
                    }

                    // Withdrawal amount validation
                    if (i === 6) {
                        let minWithdrawal = 2500;
                        let maxWithdrawal = Number(document.getElementById("number5").value);
                        if (num < minWithdrawal || num > maxWithdrawal) {
                            error.textContent = `Amount must be between R${minWithdrawal} and R${maxWithdrawal}.`;
                            input.classList.add("is-invalid");
                            valid = false;
                        }
                    }

                    numbers.push(num);
                }
            }
        }

        // If all inputs are valid, show preview
        if (valid) {
            document.getElementById("previewText").textContent = `You entered: ${numbers.join(", ")}`;
            document.getElementById("previewSection").classList.remove("d-none");
            document.getElementById("confirmButton").classList.remove("d-none");
            document.getElementById("imgId").classList.remove("d-none");
            document.getElementById("textId").classList.remove("d-none");
        }
    }

    // Form submission handling (to validate and preview data)
    document.getElementById("retirementForm").addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent form from submitting normally
        validateAndPreview(); // Call validateAndPreview function
    });

    // Confirm button event
    document.getElementById("confirmButton").addEventListener("click", function () {
        alert("Confirmed! Proceeding...");
    });
});