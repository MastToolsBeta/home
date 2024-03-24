 // Function to check if user is authenticated
 function checkAuthState() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is authenticated, do nothing
        console.log('User is authenticated ✅');
      } else {
        // User is not authenticated, redirect to login page
        console.log('User is not authenticated, redirecting to login page');
        window.location.href = '/login/';
      }
    });
  }

  // Check authentication state after the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', checkAuthState);