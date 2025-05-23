const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})


//Email.js

document.addEventListener("DOMContentLoaded", function() {
    emailjs.init("gIrCWJ5ulBJkBv1US");                                                    //public key

    document.getElementById("email-form").addEventListener("submit", function(event) {
      event.preventDefault();

      const emailInput = document.getElementById("user_email").value.trim();

      if (!emailInput || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
        alert("Please enter a valid email address.");
        return;
      }

      emailjs.send("service_9r8tnnq", "template_cbs1olo", {
        user_email: emailInput
      })
      .then(response => {
        alert("Registered Succesfully");
        console.log("Success:", response.status, response.text);
      })
      .catch(error => {
        alert("Failed to send the auto-reply email.");
        console.error("EmailJS Error:", error);
      });
    });
  });