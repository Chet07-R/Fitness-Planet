gsap.to("#nav", {
    backgroundColor: "#000",  // we can access any css property here but we use Camel case here that is instead of - use a capital letter
    height: "90px",
    duration: 0.5,
    scrollTrigger: {
        trigger: "#nav",
        scroller: "body",
        // markers:true,
        start: "top -10%",
        end: "top -11%",
        scrub: 1 // for this it will repeat when we scroll otherwise it won't


    }

})
gsap.to("#main", {
    backgroundColor: "#000",
    scrollTrigger: {
        trigger: "main",
        scroller: "body",
        // markers:true
        start: "top -25%",
        end: "top -75%",
        scrub: 2
    }
})

// page 2 

function calculateBMI() {
    let height = parseFloat(document.getElementById("height").value) / 100;
    let weight = parseFloat(document.getElementById("weight").value);
    
    // Check if inputs are valid
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        document.getElementById("bmi-value").innerText = "Error";
        document.getElementById("condition").innerText = "Invalid input";
        return;
    }
    
    let bmi = (weight / (height * height)).toFixed(1);
    document.getElementById("bmi-value").innerText = bmi;
    
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
    
    document.getElementById("condition").innerText = condition;
    needle.style.transform = `rotate(${angle}deg)`;
}

// Add event listener to the button
document.getElementById("calculate-btn").addEventListener("click", calculateBMI);

// cards animation that we have used

let cards = document.querySelectorAll(".card");

let stackArea = document.querySelector(".stack-area");

function rotateCards() {
    let angle = 0;
    cards.forEach((card, index) => {
        if (card.classList.contains("away")) {
            card.style.transform = `translateY(-120vh) rotate(-48deg)`;
        } else {
            card.style.transform = ` rotate(${angle}deg)`;
            angle = angle - 10;
            card.style.zIndex = cards.length - index;
        }
    });
}

rotateCards();

window.addEventListener("scroll", () => {
    let distance = window.innerHeight * 0.5;

    let topVal = stackArea.getBoundingClientRect().top;

    let index = -1 * (topVal / distance + 1);

    index = Math.floor(index);

    for (i = 0; i < cards.length; i++) {
        if (i <= index) {
            cards[i].classList.add("away");
        } else {
            cards[i].classList.remove("away");
        }
    }
    rotateCards();
});

