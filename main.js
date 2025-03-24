const form = document.querySelector(".form");

function getProgressColor(percent) {
    if (percent >= 70) {
        return "bg-success";
    } else if (percent >= 40) {
        return "bg-warning";
    } else {
        return "bg-danger";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Collect user inputs
    let currentAge = parseInt(document.getElementById("number1").value);
    let retirementAge = parseInt(document.getElementById("number2").value);
    let monthlyIncome = parseFloat(document.getElementById("number3").value);
    let monthlyContribution = parseFloat(document.getElementById("number4").value);
    let savingsComponentValue = parseFloat(document.getElementById("number5").value);
    let withdrawalAmount = parseFloat(document.getElementById("number6").value);

    // Validation
    if (retirementAge <= currentAge) {
        alert("Retirement age must be greater than current age.");
        return;
    }

    if (withdrawalAmount < 2500 || withdrawalAmount > savingsComponentValue) {
        alert("Withdrawal amount must be between R2,500 and your current savings component value.");
        return;
    }

    // Calculation Logic
    let yearsToRetirement = retirementAge - currentAge;
    let inflationRate = 0.06;
    let returnRate = 0.08;
    let estimatedTaxRate = 0.26;
    //const estimatedTransition = 500;
    let estimatedTax = (withdrawalAmount - monthlyIncome * Math.pow(1 + inflationRate, 1)) * estimatedTaxRate;
    let netWithdrawal = withdrawalAmount - estimatedTax;

    // Future value calculation with inflation and growth
    let savingsGrowth = savingsComponentValue;
    for (let i = 0; i < yearsToRetirement; i++) {
        savingsGrowth = (savingsGrowth + (monthlyContribution * (1 / 3) * 12) * Math.pow(1 + inflationRate, i)) * (1 + returnRate);
    }

    let futureAfter = savingsGrowth - (savingsComponentValue * Math.pow(1 + inflationRate, yearsToRetirement));

    // Percentages for progress bars
    let afterWithdrawalPercent = ((savingsComponentValue - withdrawalAmount) / savingsComponentValue) * 100;
    let futureAfterPercent = (futureAfter / savingsGrowth) * 100;

    // Prevent percentages from exceeding limits
    afterWithdrawalPercent = Math.max(0, Math.min(afterWithdrawalPercent, 100));
    futureAfterPercent = Math.max(0, Math.min(futureAfterPercent, 100));

    // Hide preview elements
    document.getElementById("imgId").classList.add("d-none");

    // Dynamically build and inject the results into the DOM
    const container = document.getElementById("previewSection");
    container.innerHTML = `
        <div class="row m-4">
            <div class="col-md-6">
                <h5>Estimated Income Tax on Withdrawal Amount</h5>
                <h2 class="text-primary">R ${estimatedTax.toFixed(2)}</h2>
                <p>Requested withdrawal amount will be reduced by this amount</p>
            </div>
            <div class="col-md-6 border-covered">
                <h5>Estimated Withdrawal Benefit Paid to You</h5>
                <h2 class="text-primary">R ${netWithdrawal.toFixed(2)}</h2>
                <p>Requested withdrawal amount less estimated income tax</p>
            </div>
        </div>
        <hr>
        <div class="mt-4 m-4">
            <h5>Current value of savings component:</h5>
            <p>Before withdrawal: <strong>R ${savingsComponentValue.toFixed(2)}</strong></p>
            <div class="progress">
                <div class="progress-bar ${getProgressColor(100)}" role="progressbar" style="width: 100%"></div>
            </div>
            <p>After withdrawal: <strong>R ${(savingsComponentValue - withdrawalAmount).toFixed(2)}</strong></p>
            <div class="progress mb-3">
                <div class="progress-bar ${getProgressColor(afterWithdrawalPercent)}" role="progressbar" style="width: ${afterWithdrawalPercent}%"></div>
            </div>
            <h5>Illustrative future value of savings component at retirement:</h5>
            <p>Before withdrawal: <strong>R ${savingsGrowth.toFixed(2)}</strong></p>
            <div class="progress">
                <div class="progress-bar ${getProgressColor(100)}" role="progressbar" style="width: 100%"></div>
            </div>
            <p>After withdrawal: <strong>R ${futureAfter.toFixed(2)}</strong></p>
            <div class="progress">
                <div class="progress-bar ${getProgressColor(futureAfterPercent)}" role="progressbar" style="width: ${futureAfterPercent}%"></div>
            </div>
        </div>
        <p class="mt-3 text-muted small center">This calculation has been made using <a href="#">assumptions</a>.</p>
    `;

    const results = document.getElementById("resultsContainer");
    results.classList.remove("d-none");
});
