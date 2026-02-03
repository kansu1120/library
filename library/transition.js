// Page Transition Effect
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.querySelector('.transition-overlay');
  
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
      overlay.classList.add('active');

      setTimeout(() => {
        window.location.href = link.href;
      }, 800);
    });
  });
});
