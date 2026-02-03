// Loading Overlay Feature
// Shows a full-screen loading overlay when navigation links are clicked

document.addEventListener("DOMContentLoaded", () => {
  const loadingOverlay = document.getElementById('loadingOverlay');
  
  // Exit early if overlay element doesn't exist
  if (!loadingOverlay) return;
  
  // Duration to show loading overlay (in milliseconds)
  const LOADING_DISPLAY_DURATION = 1500;
  
  // Get all navigation links that should trigger the loading overlay
  const navigationLinks = document.querySelectorAll('a:not([target="_blank"])');
  
  navigationLinks.forEach(link => {
    // Skip anchor links (links that start with #)
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#')) return;
    
    // Skip external links (links with different hostname)
    try {
      const linkUrl = new URL(href, window.location.href);
      if (linkUrl.hostname !== window.location.hostname) return;
    } catch (e) {
      // Invalid URL, skip
      return;
    }
    
    // Add click event listener to show loading overlay
    link.addEventListener('click', (event) => {
      // Show the loading overlay
      loadingOverlay.classList.add('active');
      
      // Note: The overlay will naturally disappear when the new page loads
      // But we also set a fallback timeout in case navigation is prevented
      setTimeout(() => {
        loadingOverlay.classList.remove('active');
      }, LOADING_DISPLAY_DURATION);
    });
  });
  
  // Hide loading overlay when page finishes loading (for back/forward navigation)
  window.addEventListener('pageshow', () => {
    loadingOverlay.classList.remove('active');
  });
});
