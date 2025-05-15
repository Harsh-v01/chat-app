/**
 * Samwad Chat App - Debug Helper
 * 
 * This script helps diagnose issues with socket communication
 * To use: Add <script src="/js/debug.js"></script> before closing body tag
 */

(function() {
  console.log('Loading debug utilities...');
  
  window.debugSocketEvents = function() {
    if (typeof socket === 'undefined') {
      console.error('Socket object not found. Make sure it\'s initialized before calling this function.');
      return;
    }

    const events = [
      'connect', 'disconnect', 'connect_error',
      'user_join', 'user_list', 'user_joined', 'user_left', 
      'send_message', 'receive_message', 'language_change'
    ];

    events.forEach(eventName => {
      const originalListener = socket.listeners(eventName)[0];
      socket.off(eventName);
      
      socket.on(eventName, (...args) => {
        console.log(`%c[Socket Event: ${eventName}]`, 'background:#3b82f6;color:white;padding:2px 5px;border-radius:3px', ...args);
        if (originalListener) originalListener.apply(socket, args);
      });
    });
    
    // Monitor emit calls
    const originalEmit = socket.emit;
    socket.emit = function(eventName, ...args) {
      console.log(`%c[Socket Emit: ${eventName}]`, 'background:#10b981;color:white;padding:2px 5px;border-radius:3px', ...args);
      return originalEmit.apply(this, [eventName, ...args]);
    };
    
    console.log('Socket debugging enabled. All events will be logged to console.');
  };

  // Add convenience methods
  window.getSocketStatus = function() {
    if (typeof socket === 'undefined') return 'Socket not initialized';
    return {
      connected: socket.connected,
      id: socket.id,
      disconnected: socket.disconnected
    };
  };
  
  window.getConnectedUsers = function() {
    if (typeof users === 'undefined') return 'Users object not found';
    return users;
  };

  // Add to window load event
  window.addEventListener('load', function() {
    console.log('Debug tools ready. Type debugSocketEvents() to start monitoring socket events.');
  });
})();
