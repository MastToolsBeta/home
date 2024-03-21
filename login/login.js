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
    document.getElementById('password-reset-form').style.display = 'none';
  }
  
  // Function to show login form and hide signup form
  function showLoginForm() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('password-reset-form').style.display = 'none';
  }
  
  // Function to show password reset form
  function showPasswordResetForm() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'none';
    document.getElementById('password-reset-form').style.display = 'block';
  }
  
  // Function to handle successful login
  function handleLoginSuccess() {
    // Redirect to dashboard or previous page
    window.location.href = "dashboard.html"; // Change "dashboard.html" to your desired page
  }
  
  // Handle form submission for login
  document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Check if the email is verified
        if (userCredential.user.emailVerified) {
          // Handle successful login
          console.log('Logged in successfully:', userCredential.user);
          handleLoginSuccess(); // Redirect after successful login
        } else {
          console.log('Email not verified');
          alert('Your email is not verified. Please check your email inbox and verify your email address.');
        }
      })
      .catch(error => {
        // Handle login error
        console.error('Login error:', error.message);
        alert('Login error: ' + error.message);
      });
  });
  
  // Handle form submission for password reset
  document.getElementById('password-reset-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('reset-email').value;
  
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        console.log('Password reset email sent');
        alert('Password reset email sent. Please check your email inbox.');
      })
      .catch(error => {
        console.error('Error sending password reset email:', error.message);
        alert('Error sending password reset email: ' + error.message);
      });
  });
  
  // Handle form submission for signup
  document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const firstName = document.getElementById('signup-firstname').value;
    const lastName = document.getElementById('signup-lastname').value;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        // Update user profile with first and last names
        userCredential.user.updateProfile({
          displayName: `${firstName} ${lastName}`
        }).then(() => {
          // Profile updated successfully
          console.log('User profile updated successfully:', userCredential.user.displayName);
          // Send email verification
          userCredential.user.sendEmailVerification()
            .then(() => {
              // Email sent
              console.log('Email verification sent:', userCredential.user.email);
              alert('Email verification sent. Please check your email inbox to verify your email address.');
            })
            .catch(error => {
              console.error('Email verification error:', error.message);
              alert('Email verification failed. Please try again later.');
            });
        }).catch(error => {
          // Handle profile update error
          console.error('Profile update error:', error.message);
          alert('Profile update failed. Please try again later.');
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
        // Check if the email is verified
        if (result.user.emailVerified) {
          // Handle successful Google login
          console.log('Logged in with Google successfully:', result.user);
          handleLoginSuccess(); // Redirect after successful login
        } else {
          console.log('Email not verified');
          alert('Your email is not verified. Please check your email inbox and verify your email address.');
          document.getElementById('resend-verification').style.display = 'block';
        }
      })
      .catch(error => {
        // Handle Google login error
        console.error('Google login error:', error.message);
      });
  }
  