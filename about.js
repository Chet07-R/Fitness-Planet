// // Swiper initialization
// document.addEventListener('DOMContentLoaded', function() {
//   // Initialize Swiper if the element exists
//   if (document.querySelector('.slide-content')) {
//       var swiper = new Swiper(".slide-content", {
//           slidesPerView: 3,   /* Slides in container */
//           spaceBetween: 25,
//           loop: true,         /* Infinite loop */
//           centerSlide: true,
//           fade: true,
//           dragCursor: true,   /* move by cursor */
//           pagination: {
//               el: ".swiper-pagination",
//               clickable: true,
//               dynamicBullets: true,
//           },
//           navigation: {
//               nextEl: ".swiper-button-next",
//               prevEl: ".swiper-button-prev",
//           },
//           breakpoints: {
//               0: {
//                   slidesPerView: 1,
//               },
//               520: {
//                   slidesPerView: 2,
//               },
//               950: {
//                   slidesPerView: 3,
//               },
//           },
//       });
//   }


//   document.addEventListener("DOMContentLoaded", () => {
//     const counters = document.querySelectorAll(".counter");
    
//     const animateCounter = (counter) => {
//         const target = +counter.getAttribute("data-target");
//         const duration = 2000; // 2 seconds animation
//         const start = 0;
//         const increment = target / (duration / 16); // 60 FPS
        
//         let current = start;
        
//         const updateCounter = () => {
//             current += increment;
//             if (current < target) {
//                 counter.innerText = Math.ceil(current);
//                 requestAnimationFrame(updateCounter);
//             } else {
//                 counter.innerText = target;
//             }
//         };
        
//         updateCounter();
//     };

//     // Only animate when element is in viewport
//     const observer = new IntersectionObserver((entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 animateCounter(entry.target);
//                 observer.unobserve(entry.target);
//             }
//         });
//     }, { threshold: 0.5 });

//     counters.forEach(counter => observer.observe(counter));
// });

  // Dark mode functionality
  // Create dark mode toggle button
  const button = document.createElement('button');
  button.classList.add('dark-mode-toggle');
  button.innerHTML = '☀️'; // Sun icon for light mode
  document.body.appendChild(button);
  
  // Check for saved preference
  if (localStorage.getItem('darkMode') === 'enabled') {
      document.documentElement.classList.add('dark');
      button.innerHTML = '🌙'; // Moon icon for dark mode
  }
  
  // Add event listener to toggle dark mode
  button.addEventListener('click', function() {
      if (document.documentElement.classList.contains('dark')) {
          // Switch to light mode
          document.documentElement.classList.remove('dark');
          button.innerHTML = '☀️';
          localStorage.setItem('darkMode', 'disabled');
      } else {
          // Switch to dark mode
          document.documentElement.classList.add('dark');
          button.innerHTML = '🌙';
          localStorage.setItem('darkMode', 'enabled');
      }
  });
// });