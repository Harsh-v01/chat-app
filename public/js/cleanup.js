/**
 * Cleanup script for Samwad chat app
 * Removes unwanted text and fixes layout issues
 */
(function() {
  // Function to clean up any unwanted text nodes
  function cleanupPageContent() {
    // Find and remove stray text nodes directly under body
    const bodyNodes = document.body.childNodes;
    for (let i = 0; i < bodyNodes.length; i++) {
      const node = bodyNodes[i];
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        // Text nodes with content that aren't empty whitespace
        node.textContent = '';
      }
    }
    
    // Find any text matching the problematic content
    const bodyHTML = document.body.innerHTML;
    if (bodyHTML.includes('ion ensureChatLayout()') || 
        bodyHTML.includes('mainContent = document.querySelector')) {
      // Force reload if problematic content exists outside of scripts
      setTimeout(() => {
        location.reload();
      }, 100);
    }
  }

  // Clean up any visible layout issues
  function fixLayoutIssues() {
    // Make sure the chat container is positioned correctly
    const chatContainer = document.getElementById('chat');
    if (chatContainer) {
      chatContainer.style.position = 'absolute';
      chatContainer.style.top = '0';
      chatContainer.style.left = '0';
      chatContainer.style.right = '0';
      chatContainer.style.bottom = '70px';
      chatContainer.style.overflowY = 'auto';
    }
    
    // Make sure the input area is at the bottom
    const inputArea = document.getElementById('inputArea');
    if (inputArea) {
      inputArea.style.position = 'absolute';
      inputArea.style.bottom = '0';
      inputArea.style.left = '0';
      inputArea.style.right = '0';
      inputArea.style.zIndex = '10';
    }
    
    // Make sure language dropdown is properly placed
    const dropdown = document.getElementById('languageDropdown');
    if (dropdown) {
      dropdown.style.position = 'absolute';
      dropdown.style.display = dropdown.classList.contains('active') ? 'block' : 'none';
      dropdown.style.zIndex = '100';
    }
  }
  
  // Run cleanup when DOM is loaded
  document.addEventListener('DOMContentLoaded', cleanupPageContent);
  
  // Also run after a short delay to catch any late-appearing issues
  setTimeout(cleanupPageContent, 500);
  setTimeout(fixLayoutIssues, 100);
  setTimeout(fixLayoutIssues, 1000); // Run again after a longer delay
})();
