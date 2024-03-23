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
  
  // Function to show avatar dropdown on click
  const avatar = document.getElementById('avatar');
  const avatarDropdown = document.getElementById('avatar-dropdown');
  
  avatar.addEventListener('click', () => {
    avatarDropdown.classList.toggle('show');
  });
  
  // Function to update user information and UI
  const userInfo = document.getElementById('user-info');
  const logoutBtn = document.getElementById('logout-btn');
  const loginBtn = document.getElementById('login-btn');
  
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      // User is signed in
      const displayName = user.displayName;
      const email = user.email;
      const photoURL = user.photoURL;
  
      // Update user information
      userInfo.innerHTML = `
        <div><img src="${photoURL}" alt="Avatar" class="avatar-img"></div>
        <div class="displayName">${displayName}</div>
        <div class="email">${email}</div>
      `;
  
      // Update avatar image
      const avatarImg = document.querySelector('.avatar-img');
      avatarImg.src = photoURL || '/src/img/account.png';
  
      // Show logout button and hide login button
      logoutBtn.style.display = 'block';
      loginBtn.style.display = 'none';
    } else {
      // User is signed out
      userInfo.innerHTML = '';
      // Hide logout button and show login button
      logoutBtn.style.display = 'none';
      loginBtn.style.display = 'block';
      // Add prompt to login with Google
      loginBtn.addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
          .then(result => {
            // Handle successful Google login
            console.log('Logged in with Google successfully:', result.user);
          })
          .catch(error => {
            // Handle Google login error
            console.error('Google login error:', error.message);
          });
      });
    }
  });
  
// Logout
logoutBtn.addEventListener('click', () => {
  // Get the user's display name
  const userName = firebase.auth().currentUser.displayName;
  
  // Ask for confirmation before logging out
  const confirmLogout = window.confirm(`Hey ${userName}, are you sure you want to logout?`);
  
  if (confirmLogout) {
    firebase.auth().signOut();
  }
});

