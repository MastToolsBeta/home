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
  
  // Function to show signup form and hide login form
  function showSignupForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
  }
  
  // Function to show login form and hide signup form
  function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
  }
  
  // Handle form submission for login
  document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Handle successful login, e.g., redirect to dashboard
        console.log('Logged in successfully:', userCredential.user);
      })
      .catch(error => {
        // Handle login error
        console.error('Login error:', error.message);
        alert('Login error: ' + error.message);
      });
  });
  
  // Handle form submission for signup
  document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Send email verification
        userCredential.user.sendEmailVerification()
          .then(() => {
            // Email sent
            console.log('Email verification sent:', email);
            alert('Email verification sent. Please check your email inbox to verify your email address.');
          })
          .catch(error => {
            console.error('Email verification error:', error.message);
            alert('Email verification failed. Please try again later.');
          });
      })
      .catch(error => {
        // Handle signup error
        console.error('Signup error:', error.message);
        alert('Signup error: ' + error.message);
      });
  });
  
  // Login with Google
  function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(result => {
        // Handle successful Google login, e.g., redirect to dashboard
        console.log('Logged in with Google successfully:', result.user);
      })
      .catch(error => {
        // Handle Google login error
        console.error('Google login error:', error.message);
      });
  }
  