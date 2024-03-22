    // Firebase configuration
    const firebaseConfig = {
        apiKey: "AIzaSyBKGWJFI7VbRPiDYHh-EqFmqrmkuUgroIM",
        authDomain: "ethereal-orb-417905.firebaseapp.com",
        projectId: "ethereal-orb-417905",
        storageBucket: "ethereal-orb-417905.appspot.com",
        messagingSenderId: "251665918227",
        appId: "1:251665918227:web:932227708b6c1d809e12e6"
      };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Function to check if user is authenticated
  function checkAuthState() {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        // User is not authenticated, redirect to login page
        console.log('User is not authenticated, redirecting to login page');
        window.location.href = '/login/';
      }
    });
  }
  
  // Check authentication state on page load
  checkAuthState();
  