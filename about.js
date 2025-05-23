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

  function toggleMenu() {
    var navbar = document.getElementById("myNavbar");
    if (navbar.classList.contains("active")) {
      navbar.classList.remove("active");
    } else {
      navbar.classList.add("active");
    }
  }
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.counter');

  if (!counters.length) {
    console.error('No .counter elements found!');
    return;
  }

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // Animation duration in ms
    const increment = target / (duration / 16); // Approx 60fps
    let current = 0;

    const updateCounter = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          if (!counter.classList.contains('animated')) {
            counter.classList.add('animated');
            animateCounter(counter);
          }
        }
      });
    },
    { threshold: 0.5 } // Trigger when 50% of element is visible
  );

  counters.forEach((counter) => observer.observe(counter));
});


gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".footer-card").forEach(card => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top 80%", // start animating when card enters viewport
      toggleActions: "play none none reverse"
    },
    y: 100,
    opacity: 0,
    rotateX: 60,
    duration: 1,
    ease: "power3.out"
  });
});
