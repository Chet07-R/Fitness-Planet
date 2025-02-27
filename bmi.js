// Select elements using the IDs and classes from your CSS
const btnEl = document.querySelector('.calculate-btn'); // Matches your CSS class
const bmiInputEl = document.getElementById('bmi-result'); // Matches your CSS ID
const weightConditionEl = document.getElementById('weight-condition'); // Matches your CSS ID

function calculateBMI() {
    // Get height and weight values from input fields
    const heightValue = document.getElementById('height').value;
    const weightValue = document.getElementById('weight').value;

    // Convert height from cm to meters
    const heightInMeters = heightValue / 100;

    // Calculate BMI
    const bmiValue = weightValue / (heightInMeters * heightInMeters);

    // Display BMI in the result div (using textContent since it's not an input)
    bmiInputEl.textContent = bmiValue.toFixed(2);

    // Update weight condition based on BMI
    if (bmiValue < 18.5) {
        weightConditionEl.textContent = 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        weightConditionEl.textContent = 'Normal weight';
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        weightConditionEl.textContent = 'Overweight';
    } else if (bmiValue >= 30) {
        weightConditionEl.textContent = 'Obesity';
    }
}

// Add click event listener to the calculate button
btnEl.addEventListener('click', calculateBMI);