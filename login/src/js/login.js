
  // Function to update password strength meter
  function updatePasswordStrength(password, strengthElement) {
    const strength = calculatePasswordStrength(password);
    strengthElement.innerHTML = 'Password Strength: ' + strength;
    strengthElement.className = 'password-strength strength-' + strength;
  }
  
  // Function to calculate password strength
  function calculatePasswordStrength(password) {
    // Example logic to calculate password strength
    const strength = password.length >= 8 ? 'strong' : password.length >= 6 ? 'medium' : 'weak';
    return strength;
  }
  
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
  
// Function to update error message on the page
function updateErrorMessage(formId, errorMessage) {
    const errorMessageElement = document.getElementById(formId + '-error-message');
    errorMessageElement.innerText = errorMessage;
    errorMessageElement.style.display = errorMessage ? 'block' : 'none';
    
    if (errorMessage) {
        setTimeout(() => {
            errorMessageElement.innerText = '';
            errorMessageElement.style.display = 'none';
        }, 10000);
    }
}

// Function to update success message on the page
function updateSuccessMessage(formId, successMessage) {
    const successMessageElement = document.getElementById(formId + '-success-message');
    successMessageElement.innerText = successMessage;
    successMessageElement.style.display = successMessage ? 'block' : 'none';
    
    if (successMessage) {
        setTimeout(() => {
            successMessageElement.innerText = '';
            successMessageElement.style.display = 'none';
        }, 10000);
    }
}

// Function to handle successful login
function handleLoginSuccess() {
    // Check if there is a referrer URL in the browser's history
    if (document.referrer !== '' && document.referrer !== window.location.href) {
        // Redirect to the previous page
        window.history.back();
    } else {
        // If there is no referrer URL or it's the same as the current page, redirect to "/index.html"
        window.location.href = "/index.html";
    }
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
          updateErrorMessage('login', 'Your email is not verified. Please check your email inbox and verify your email address.');
        }
      })
      .catch(error => {
        // Handle login error
        console.error('Login error:', error.code);
        if (error.code === 'auth/invalid-email') {
          updateErrorMessage('login', 'Invalid email address.');
        } else if (error.code === 'auth/user-disabled') {
          updateErrorMessage('login', 'Your account has been disabled.');
        } else if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          updateErrorMessage('login', 'Invalid email or password.');
        } else {
          updateErrorMessage('login', 'Login failed. Please try again later.');
        }
      });
  });
  
  // Handle form submission for password reset
  document.getElementById('password-reset-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('reset-email').value;
  
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        console.log('Password reset email sent');
        updateSuccessMessage('reset', 'Password reset email sent. Please check your email inbox.');
      })
      .catch(error => {
        console.error('Error sending password reset email:', error.code);
        if (error.code === 'auth/invalid-email') {
          updateErrorMessage('reset', 'Invalid email address.');
        } else if (error.code === 'auth/user-not-found') {
          updateErrorMessage('reset', 'No user found with this email address.');
        } else {
          updateErrorMessage('reset', 'Error sending password reset email. Please try again later.');
        }
      });
  });
  
  // Handle form submission for signup
  document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const firstName = document.getElementById('signup-firstname').value;
    const lastName = document.getElementById('signup-lastname').value;
  
    // Validate input fields
    if (!email || !password || !firstName || !lastName) {
      updateErrorMessage('signup', 'All fields are required.');
      return;
    }
  
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
              updateSuccessMessage('signup', 'Email verification sent. Please check your email inbox to verify your email address.');
            })
            .catch(error => {
              console.error('Email verification error:', error.code);
              updateErrorMessage('signup', 'Email verification failed. Please try again later.');
            });
        }).catch(error => {
          // Handle profile update error
          console.error('Profile update error:', error.code);
          updateErrorMessage('signup', 'Profile update failed. Please try again later.');
        });
      })
      .catch(error => {
        // Handle signup error
        console.error('Signup error:', error.code);
        if (error.code === 'auth/email-already-in-use') {
            updateErrorMessage('signup', 'The email address is already in use by another account.');
          } else if (error.code === 'auth/weak-password') {
            updateErrorMessage('signup', 'The password is too weak.');
          } else if (error.code === 'auth/invalid-email') {
            updateErrorMessage('signup', 'Invalid email address.');
          } else {
            updateErrorMessage('signup', 'Signup failed. Please try again later.');
          }
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
                  updateErrorMessage('login', 'Your email is not verified. Please check your email inbox and verify your email address.');
                  document.getElementById('resend-verification').style.display = 'block';
              }
          })
          .catch(error => {
              // Handle Google login error
              console.error('Google login error:', error.code);
              if (error.code === 'auth/popup-closed-by-user') {
                  updateErrorMessage('login', 'Google sign-in popup was closed.');
              } else {
                  updateErrorMessage('login', 'Google login failed. Please try again later.');
              }
          });
  }
  
  