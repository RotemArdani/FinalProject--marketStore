document.addEventListener('DOMContentLoaded', function() {
    // Login form validation
    var usernameInput = document.getElementById('user_name');
    var passwordInput = document.getElementById('password');
    var errorDiv = document.getElementById('error_login');
    
    // User_Name validation pattern
    var usernamePattern = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;
    
    // Password validation pattern
    var passwordPattern = /^[a-zA-Z0-9]{4,8}$/;
    
    // log in
    usernameInput.addEventListener('input', function() {
        validateUserName();
    });
    
    passwordInput.addEventListener('input', function() {
        validatePassword();
    });
    
    function validateUserName() {
      if (!usernamePattern.test(usernameInput.value)) {
        errorDiv.textContent = 'Please enter a valid User_Name.';
      } else {
        errorDiv.textContent = '';
      }
    }
    
    function validatePassword() {
      if (!passwordPattern.test(passwordInput.value)) {
        errorDiv.textContent = 'Please enter a password between 4 and 8 characters consisting of English letters or numbers.';
      } else {
        errorDiv.textContent = '';
      }
    }
    
    // Signup form validation
    var signupFirstNameInput = document.getElementById('signup_fname');
    var signupLastNameInput = document.getElementById('signup_lname');
    var signupUserNameInput = document.getElementById('signup_username');
    var signupPasswordInput = document.getElementById('signup_password');
    var signupCityInput = document.getElementById('signup_city');
    var signupAddressInput = document.getElementById('signup_address');
    var signupErrorDiv = document.getElementById('error_signup');
    
    signupFirstNameInput.addEventListener('input', function() {
        validateFirstName();
      });

      signupLastNameInput.addEventListener('input', function() {
        validateLastName();
      });

    signupUserNameInput.addEventListener('input', function() {
        validateUserNameSU();
    });
    
    signupPasswordInput.addEventListener('input', function() {
        validatePasswordSU();
    });
    
    signupCityInput.addEventListener('input', function() {
        validateCity();
    });
    
    signupAddressInput.addEventListener('input', function() {
        validateAddress();
    });
    
    // Name validation
    var namePattern = /^[a-zA-Z ]+$/;
    
    // First Name sign up validation
    function validateFirstName() {
      if (!namePattern.test(signupFirstNameInput.value)) {
        document.getElementById('error_fname').textContent = 'Please enter a first name consisting of English letters.';
      } else {
        document.getElementById('error_fname').textContent = '';
      }
    }

    // Last Name sign up validation
    function validateLastName() {
        if (!namePattern.test(signupLastNameInput.value)) {
          document.getElementById('error_lname').textContent = 'Please enter a last name consisting of English letters.';
        } else {
          document.getElementById('error_lname').textContent = '';
        }
      }
    
    // User Name sign up validation
    function validateUserNameSU() {
        if (!emailPattern.test(signupUserNameInput.value)) {
          document.getElementById('error_user_name').textContent = 'Please enter a valid User Name.';
        } else {
          document.getElementById('error_user_name').textContent = '';
        }
      }
      
    // Password sign up validation
    function validatePasswordSU() {
        if (!passwordPattern.test(signupPasswordInput.value)) {
            document.getElementById('error_password').textContent = 'Please enter a password between 4 and 8 characters consisting of English letters or numbers.';
        } else {
            document.getElementById('error_password').textContent = '';
        }
        }

    // City validation
    var cityPattern = /^[a-zA-Z ]+$/;
    
    function validateCity() {
      if (!cityPattern.test(signupCityInput.value)) {
        document.getElementById('error_city').textContent = 'Please enter a city consisting of English letters only.';
      } else {
        document.getElementById('error_city').textContent = '';
      }
    }
    
    // Address validation
    var addressPattern = /^[a-zA-Z0-9 ]+$/;
    
    function validateAddress() {
      if (!addressPattern.test(signupAddressInput.value)) {
        document.getElementById('error_address').textContent = 'Please enter an address consisting of English letters or numbers.';
      } else {
        document.getElementById('error_address').textContent = '';
      }
    }
    
     ////////////////////////////////////////////////////////////////////sign in
    
      // Get the button element by its ID
      const signInHref = document.getElementById('Sign-in');
      // Add an event listener to the button
      signInHref.addEventListener('click', showLogin);
    
      // Get the button element by its ID
      const signInlink = document.getElementById('show-signin');
      // Add an event listener to the button
      signInlink.addEventListener('click', showLogin);
    ///////////////////////////////////////////////////////////////////// 
    
    // Get the button element by its ID
    const hidelogin = document.getElementById('close-login');
    // Add an event listener to the button
    hidelogin.addEventListener('click', hideLogin);
    
    ///////////////////////////////////////////////////////////////////// show-signup
    
      // Get the button element by its ID
      const signuplink = document.getElementById('show-signup');
      // Add an event listener to the button
      signuplink.addEventListener('click', showSignUp);
    
    ////////////////////////////////////////////////////////////////////
      // Get the button element by its ID
      const hidesignup = document.getElementById('hideSignUp');
      // Add an event listener to the button
      hidesignup.addEventListener('click', hideSignUp);
      ////////////////////////////////////////////////////////////////////
    
    
    // Show/hide login and signup forms
    function showLogin() {
      loginForm.style.display = 'block';
      signupForm.style.display = 'none';
    }
    
    function hideLogin() {
      var popup = document.getElementById('loginPopup');
      popup.style.display = 'none';
    }
    
    function showSignUp() {
      signupForm.style.display = 'block';
      loginForm.style.display = 'none';
    }
    
    function hideSignUp() {
      var popup = document.getElementById('signupPopup');
      popup.style.display = 'none';
    }
    
    // Get the login and signup form elements
    const loginForm = document.getElementById('loginPopup');
    const signupForm = document.getElementById('signupPopup');
    
    
    // Add event listener for login form submission
    loginForm.addEventListener('submit', handleLogin);
    
    // Add event listener for signup form submission
    signupForm.addEventListener('submit', handleSignup);
      
    // Function to handle login form submission
    function handleLogin(event) {
      event.preventDefault(); // Prevent the form from submitting
    
      // Get the input values
      const user_name = document.querySelector('#user_name').value;
      const password = document.querySelector('#password').value;
    
      // Create the URL for the login AJAX request
      const loginUrl = '/Users/login/' + user_name;
      console.log(loginUrl);

      // Create the request body as an object
      const loginRequestBody = {
        User_Name: user_name,
        Password: password
      };
    
      // Create the headers object
      const loginHeaders = new Headers();
      loginHeaders.append('Content-Type', 'application/json');
    
      // Create the options object for the login fetch request
      const loginOptions = {
        method: 'POST',
        headers: loginHeaders,
        body: JSON.stringify(loginRequestBody)
      };
    
      const loginErrorDiv = document.getElementById('error_login');
    
      // Send the login AJAX request using fetch
      fetch(loginUrl, loginOptions)
        .then(response => response.json())
        .then(data => {
          // Check if the response contains an error
          if (data.error) {
            // Display the login error message
            loginErrorDiv.textContent = data.error;
          } else {
            // Clear the login error message
            loginErrorDiv.textContent = '';
    
            // Successful login, retrieve the user user_name
            const userName = data.User_Name;
    
            // Send a GET request to the home page with the user_name as a query parameter
            window.location.href = `/?user_name=${encodeURIComponent(userName)}`;
          }
        })
        .catch(error => {
          console.log('An error occurred:', error); // Handle any errors that occurred during the login AJAX request
        });
    }
    
    //////////////////////////////// Function to handle signup form submission
    function handleSignup(event) {
      event.preventDefault(); // Prevent the form from submitting
    
      // Get the input values
      const first_name = document.querySelector('#signup_fname').value;
      const last_name = document.querySelector('#signup_lname').value;
      const user_name = document.querySelector('#signup_username').value;
      const password = document.querySelector('#signup_password').value;
      const city = document.querySelector('#signup_city').value;
      const address = document.querySelector('#signup_address').value;
      const gender = document.querySelector('#signup_gender').value;
    
      const signupErrorDiv = document.getElementById('error_signup');
      signupErrorDiv.textContent = ''; // Clear previous error message
    
      // Validate First Name
      if (!RvalidateFirstName(first_name)) {
        signupErrorDiv.textContent = 'Invalid First Name';
        return;
      }

      // Validate Last Name
      if (!RvalidateLastName(last_name)) {
        signupErrorDiv.textContent = 'Invalid Last Name';
        return;
      }

      // Validate UserName
      if (!RvalidateUserName(user_name)) {
        signupErrorDiv.textContent = 'Invalid User Name';
        return;
      }
    
      // Validate password
      if (!RvalidatePassword(password)) {
        signupErrorDiv.textContent = 'Invalid password';
        return;
      }
    
      // Validate city
      if (!RvalidateCity(city)) {
        signupErrorDiv.textContent = 'invalid city';
        return;
      }
    
      // Validate address
      if (!RvalidateAddress(address)) {
        signupErrorDiv.textContent = 'invalid address';
        return;
      }
    
      // Create the URL for the signup AJAX request
      const signupUrl = '/Users/signup';
    
      // Create the request body as an object
      const signupRequestBody = {
        First_Name: first_name,
        Last_Name: last_name,
        User_Name: user_name,
        Password: password,
        City: city,
        Address: address,
        Gender: gender
      };
    
      // Create the headers object
      const signupHeaders = new Headers();
      signupHeaders.append('Content-Type', 'application/json');
    
      // Create the options object for the signup fetch request
      const signupOptions = {
        method: 'POST',
        headers: signupHeaders,
        body: JSON.stringify(signupRequestBody)
      };
    
      // Send the signup AJAX request using fetch
      fetch(signupUrl, signupOptions)
        .then(response => response.json())
        .then(data => {
          // Check if the response contains an error
          if (data.error) {
            // Display the signup error message
            signupErrorDiv.textContent = data.error;
          } else {
            // Clear the signup error message
            signupErrorDiv.textContent = '';
    
            // Successful signup, retrieve the user user_name
            const userName = data.User_Name;
    
            // Send a GET request to the cart page with the user_name as a query parameter
            window.location.href = `/?User_Name=${userName}`;
          }
        })
        .catch(error => {
          console.log('An error occurred:', error); // Handle any errors that occurred during the signup AJAX request
        });
    }
    
    // First Name validation function
    function RvalidateFirstName(first_name) {
        const fnameRegex = /^[A-Za-z\s]+$/;
        return fnameRegex.test(first_name);
      }

    // Last Name validation function
    function RvalidateLastName(last_name) {
        const lnameRegex = /^[A-Za-z\s]+$/;
        return lnameRegex.test(last_name);
      }

    // User Name validation function
    function RvalidateUserName(user_name) {
      // Use a regular expression to validate the email format
      const userNameRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/;
      return userNameRegex.test(user_name);
    }
    
    // Password validation function
    function RvalidatePassword(password) {
      // Use a regular expression to validate that the password contains only English letters and numbers and has a length between 4 and 8 characters
      const passwordRegex = /^[A-Za-z0-9]{4,8}$/;
      return passwordRegex.test(password);
    }
    
    // City validation function
    function RvalidateCity(city) {
      // Use a regular expression to validate that the city contains only English letters
      const cityRegex = /^[A-Za-z ]+$/;
      return cityRegex.test(city);
    }
    
    // Address validation function
    function RvalidateAddress(address) {
      // Use a regular expression to validate that the address contains only English letters or numbers
      const addressRegex = /^[A-Za-z0-9 ]+$/;
      return addressRegex.test(address);
    } 
});