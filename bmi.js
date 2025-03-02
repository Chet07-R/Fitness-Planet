function calculateBMI() {
    let height = parseFloat(document.getElementById("height").value) / 100;
    let weight = parseFloat(document.getElementById("weight").value);
    let bmi = (weight / (height * height)).toFixed(1);
    document.getElementById("bmi-result").innerText = bmi;
    let needle = document.getElementById("needle");
    let condition = "";
    let angle = 0;

    if (bmi < 18.5) { 
        condition = "Underweight"; 
        angle = -80; 
    } else if (bmi < 25) { 
        condition = "Normal"; 
        angle = -45; 
    } else if (bmi < 30) { 
        condition = "Overweight"; 
        angle = 0; 
    } else if (bmi < 40) { 
        condition = "Obese"; 
        angle = 35; 
    } else { 
        condition = "Severely Obese"; 
        angle = 80; 
    }

    document.getElementById("weight-condition").innerText = condition;
    needle.style.transform = `rotate(${angle}deg)`;
}
