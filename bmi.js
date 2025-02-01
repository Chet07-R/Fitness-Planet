
const btnE1 = document.getElementById('btn');
const bmiinputE1 = document.getElementById("bmi-result");
const weightconditionE1 = document.getElementById("weight-condition");

function calculateBMI() {
    const heightValue = document.getElementById("height").value;
    const weightValue = document.getElementById("weight").value;

    const heightInMeters = heightValue / 100;

    const bmiValue = weightValue / (heightInMeters * heightInMeters);

    bmiinputE1.value = bmiValue.toFixed(2);

    if (bmiValue < 18.5) {
        weightconditionE1.innerText = "Underweight";
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        weightconditionE1.innerText = "Normal weight";
    } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        weightconditionE1.innerText = "Overweight";
    } else if (bmiValue >= 30) {
        weightconditionE1.innerText = "Obesity";
    }
}


btnE1.addEventListener("click", calculateBMI);
