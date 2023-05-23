document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    document.getElementById('navbar-custom').style.display='none';
  
    // Add event listener for login form submission
    loginForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent form submission
  
      const aadharInput = document.getElementById('login-aadhar');
      const passwordInput = document.getElementById('login-password');
  
      const aadhar = aadharInput.value;
      const password = passwordInput.value;
  
      console.log('Login Form Data:');
      console.log('Aadhar:', aadhar);
      console.log('Password:', password);

      fetch('http://localhost:8080/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            aadhar: aadhar,
            password: password,
          }),
        })
          .then((response) => {
            if (response.status==200) {
              console.log('Login success');
              localStorage.setItem('aadhar', aadhar);
              alert('Login success');
              document.getElementById('navbar-custom').style.display='block';
            }
            else if(response.status==205) {
                alert('User already voted');
            }
             else {
              console.log('Login failed');
              alert('Login failed');
            //   document.getElementById('navbar-custom').style.display='none';
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
  
      // Clear form fields after logging data
      aadharInput.value = '';
      passwordInput.value = '';
    });
  
    // Add event listener for signup form submission
    signupForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form submission
    
        const usernameInput = document.getElementById('signup-username');
        const aadharInput = document.getElementById('signup-aadhar');
        const passwordInput = document.getElementById('signup-password');

        console.log(usernameInput);
        console.log(aadharInput);
        console.log(passwordInput);
    
        const username = usernameInput.value;
        const aadhar = aadharInput.value;
        const password = passwordInput.value;
    
        console.log('Signup Form Data:');
        console.log('Username:', username);
        console.log('Aadhar:', aadhar);
        console.log('Password:', password);
    
        // Clear form fields after logging data
        usernameInput.value = '';
        aadharInput.value = '';
        passwordInput.value = '';
    
        // Make the POST request to the signup API
        fetch('http://localhost:8080/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            aadhar: aadhar,
            password: password,
          }),
        })
          .then((response) => {
            if (response.ok) {
              console.log('Signup success');
              alert('Signup success');
            } else {
              console.log('Signup failed');
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      });
    
  });
  