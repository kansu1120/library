// Page Transition Effect
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector('.transition-overlay');
  
  // Exit early if overlay element doesn't exist
  if (!overlay) return;
  
  // Transition duration in milliseconds (must match CSS transition time)
  const TRANSITION_DURATION = 800;
  
  // Add transition-link class to all navigation links
  document.querySelectorAll('a').forEach(link => {
    // Skip external links and anchors
    if (link.hostname === window.location.hostname && 
        !link.getAttribute('target') &&
        !link.hash) {
      link.classList.add('transition-link');
    }
  });

  // Add click event listener to transition links
  document.querySelectorAll('.transition-link').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      // overlay.classList.add('active'); // Commented out to disable background overlay effect

      setTimeout(() => {
        window.location.href = link.href;
      }, TRANSITION_DURATION);
    });
  });
});
