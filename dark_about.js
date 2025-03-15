
document.addEventListener('DOMContentLoaded', function() {
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
});