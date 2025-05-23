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
    trigger: "#main",
    scroller: "body",
    // markers: true,
    start: "top -25%",
    end: "top -70%",
    scrub: 2,
  },
});

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

// chat-bot

let prompt=document.querySelector(".prompt")
let chatbtn=document.querySelector(".input-area button")
let chatContainer=document.querySelector(".chat-container")
let h1=document.querySelector(".h1")
let userMessage="";

let Api_url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCacQmAMhupE1_VrLNnhsB-APf48WDmzDM"

function createChatBox(html,className){
    const div=document.createElement("div")
    div.classList.add(className)
    div.innerHTML=html;
    return div
    }

    async function generateApiResponse(aiChatBox){
        const textElement=aiChatBox.querySelector(".text")
        try{
        const response=await fetch(Api_url,{
          method:"POST",
          headers:{"Content-Type": "application/json"},
          body:JSON.stringify({
            contents:[{
              "role": "user",
              "parts":[{text:`${userMessage}`}]
            }]
          })
        })
        const data=await response.json()
        const apiResponse=data?.candidates[0].content.parts[0].text.trim();
        textElement.innerText=apiResponse
        
        }
        catch(error){
          console.log(error)
        }
        finally{
          aiChatBox.querySelector(".loading").style.display="none"
        }
        }    

    function showLoading(){
        const html=`<p class="text"></p>
        <img src="pictures/load.gif" class="loading" width="50px">`
          let aiChatBox=createChatBox(html,"ai-chat-box")
       chatContainer.appendChild(aiChatBox)
      generateApiResponse(aiChatBox)
      
      }

chatbtn.addEventListener("click",()=>{
    h1.style.display = "none";
        userMessage=prompt.value;
      const html=`<p class="text"></p>`
     let userChatBox=createChatBox(html,"user-chat-box")
     userChatBox.querySelector(".text").innerText=userMessage
     chatContainer.appendChild(userChatBox)
     prompt.value=""
     setTimeout(showLoading,500)
    })

  window.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.site-header');
    const navbar = document.querySelector('.navbar');

    if (header && navbar) {
      const toggleBtn = document.createElement('button');
      toggleBtn.classList.add('menu-toggle');
      toggleBtn.innerHTML = '&#9776;'; // ☰ icon
      header.appendChild(toggleBtn);

      toggleBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
      });
    }
  });
// Add event listener for Enter key press
prompt.addEventListener("keypress", function(event) {
    // Check if the key pressed was Enter
    if (event.key === "Enter") {
      // Prevent the default action (form submission/line break)
      event.preventDefault();
      
      // Trigger the same action as clicking the button
      if (prompt.value.trim() !== "") {
        h1.style.display = "none";
        userMessage = prompt.value;
        const html = `<p class="text"></p>`;
        let userChatBox = createChatBox(html, "user-chat-box");
        userChatBox.querySelector(".text").innerText = userMessage;
        chatContainer.appendChild(userChatBox);
        prompt.value = "";
        setTimeout(showLoading, 500);
      }
    }
  });




