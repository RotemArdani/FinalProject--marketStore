document.addEventListener('DOMContentLoaded', function() {

    ////////////////////////////////////////////////// create product
    var nameInput = document.getElementById("product-name");
    var idInput = document.getElementById("product-id");
    var priceInput = document.getElementById("product-price");
    var supplyInput = document.getElementById("product-supply");
    var imgNameInput = document.getElementById("product-imgName");
  
    // Add event listeners to input fields
    nameInput.addEventListener("input", validateName);
    idInput.addEventListener("input", validateId);
    priceInput.addEventListener("input", validatePrice);
    supplyInput.addEventListener("input", validateSupply);
    imgNameInput.addEventListener("input", validateImageName);
  
    function validateName() {
      var name = nameInput.value.trim();
      var nameRegex = /^[0-9A-Za-z ]+$/;
  
      if (!nameRegex.test(name)) {
        setMessage("Name can only contain English letters Numbers and spaces.");
      } else {
        clearMessage();
      }
    }

    function validateId() {
        var id = idInput.value.trim();
        var idRegex = /^[0-9 ]+$/;
    
        if (!idRegex.test(id)) {
          setMessage("Id can only contain Numbers and spaces.");
        } else {
          clearMessage();
        }
      }
  
    function validatePrice() {
      var price = priceInput.value.trim();
      var priceRegex = /^\d+(\.\d+)?$/;
  
      if (!priceRegex.test(price) || parseFloat(price) <= 0) {
        setMessage("Price must be a positive number.");
      } else {
        clearMessage();
      }
    }
  
    function validateSupply() {
      var supply = supplyInput.value.trim();
      var supplyRegex = /^\d*$/;
  
      if (!supplyRegex.test(supply) || parseInt(supply) < 0) {
        setMessage("Supply must be a positive number or zero.");
      } else {
        clearMessage();
      }
    }
  
    function validateImageName() {
      var imgName = imgNameInput.value.trim();
      var imgNameRegex = /^[^\s]+$/;
  
      if (!imgNameRegex.test(imgName)) {
        setMessage("Image name cannot contain spaces.");
      } else {
        clearMessage();
      }
    }
  
    function setMessage(message) {
      var messageElement = document.getElementById(`new-product-response-message`);
      messageElement.textContent = message;
    }
  
    function clearMessage() {
      var messageElement = document.getElementById(`new-product-response-message`);
      messageElement.textContent = "";
    }
  
  
    // Add an event listener to the form submission
    document.getElementById('product-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
      
        // Get the values from the input fields
        var name = document.getElementById('product-name').value;
        var id = document.getElementById('product-id').value;
        var price = document.getElementById('product-price').value;
        var supply = document.getElementById('product-supply').value;
        var img_name = document.getElementById('product-imgName').value;
        var category = document.getElementById('product-category').value;
  
    // Validate the inputs
    if (name.trim() === '') {
      alert('Name cannot be empty. Please enter a value.');
      return;
    }

    var idValue = parseFloat(id);
    if (isNaN(idValue) || idValue < 0) {
      alert('Invalid id input. Please enter a positive number.');
      return;
    }
  
    var priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue < 0) {
      alert('Invalid price input. Please enter a positive number.');
      return;
    }
  
    var supplyValue = parseFloat(supply);
    if (isNaN(supplyValue) || supplyValue < 0) {
      alert('Invalid supply input. Please enter a positive number or zero.');
      return;
    }
  
    if (img_name.trim() === '') {
      alert('Image name cannot be empty. Please enter a value.');
      return;
    }
  
    if (category.trim() === '') {
      alert('Category cannot be empty. Please enter a value.');
      return;
    } 
  
        // Create a data object with the input values
        var data = {
            Category: category,
            ProductName: name,
            ProductId: id,
            Price: price,
            Quantity: supply,
            Image: img_name
        };
  
        // Send the data to the server using fetch
        fetch('/products/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
        .then(response => {
          // Handle the response from the server
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then(errorData => {
              throw new Error(errorData.error);
            });
          }
        })
        .then(responseData => {
          // Handle the successful response
          var responseMessage = responseData.message;
          var answerDiv = document.getElementById(`new-product-response-message`);
          answerDiv.textContent = responseMessage;
        })
        .catch(error => {
          // Handle any errors that occurred during the request
          var errorDiv = document.getElementById(`new-product-response-message`);
          errorDiv.textContent = error.message; // Display the error message
          console.error(error); // Log the error to the console
        });
        
      });
      
    ////////////////////////////////////////////////// update product
    document.querySelectorAll('[id^="update-product-form-"]').forEach((form) => {
      form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const productName = form.getAttribute('action').split('/').pop();
        const nameInput = productName;
        const idInput = form.querySelector(`[id="update-product-price-${productName.replace(/ /g, '\\ ')}"]`);
        const priceInput = form.querySelector(`[id="update-product-id-${productName.replace(/ /g, '\\ ')}"]`);
        const supplyInput = form.querySelector(`[id="update-product-supply-${productName.replace(/ /g, '\\ ')}"]`);
        const imgNameInput = form.querySelector(`[id="update-product-imgName-${productName.replace(/ /g, '\\ ')}"]`);
        const categoryInput = form.querySelector(`[id="update-product-category-${productName.replace(/ /g, '\\ ')}"]`);
  
        const updatedProduct = {};
  
        if (nameInput !== '') {
          updatedProduct.productName = nameInput;
        }
        
        if (idInput.value.trim() !== '') {
            const idValue = parseFloat(idInput.value);
            if (!isNaN(idValue) && idValue >= 0) {
              updatedProduct.ProductId = idValue;
            } else {
              alert('Invalid id input. Please enter a positive number.');
              return; // Stop further execution
            }
          }

        if (priceInput.value.trim() !== '') {
          const priceValue = parseFloat(priceInput.value);
          if (!isNaN(priceValue) && priceValue >= 0) {
            updatedProduct.Price = priceValue;
          } else {
            alert('Invalid price input. Please enter a positive number.');
            return; // Stop further execution
          }
        }
        
        if (supplyInput.value.trim() !== '') {
          const supplyValue = parseFloat(supplyInput.value);
          if (!isNaN(supplyValue) && supplyValue >= 0) {
            updatedProduct.Quantity = supplyValue;
          } else {
            alert('Invalid supply input. Please enter a positive number or zero.');
            return; // Stop further execution
          }
        }
        
        if (imgNameInput.value.trim() !== '') {
          updatedProduct.Image = imgNameInput.value;
        } else {
          alert('Image name cannot be empty. Please enter a value.');
          return; // Stop further execution
        }
        
        if (categoryInput.value.trim() !== '') {
          updatedProduct.CategoryId = categoryInput.value;
        } else {
          alert('Category cannot be empty. Please enter a value.');
          return; // Stop further execution
        }
              
        // Check if there are no updated fields
        if (Object.keys(updatedProduct).length === 0) {
          console.log('No fields to update');
          return;
        }
  
        // Make a PUT request to update the product
        fetch(`/Products/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        })
        .then(response => {
          // Handle the response from the server
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then(errorData => {
              throw new Error(errorData.error);
            });
          }
        })
        .then(responseData => {
          // Handle the successful response
          var responseMessage = responseData.message;
          var answerDiv = document.getElementById(`update-product-response-message-${ProductId}`);
          answerDiv.textContent = responseMessage;
        })
        .catch(error => {
          // Handle any errors that occurred during the request
          var errorDiv = document.getElementById(`update-product-response-message-${ProductId}`);
          errorDiv.textContent = error.message; // Display the error message
          console.error(error); // Log the error to the console
        });        
      });
    });
    
    ////////////////////////////////////////////////// search product
    document.getElementById('search-product-button').addEventListener('click', () => {
      const searchInput = document.getElementById('search-product-name').value;
      const productCard = document.getElementById(`product-card-${searchInput}`);
      const updateFormContainer = document.getElementById('update-form-container');
    
      if (productCard && updateFormContainer) {
        const existingCard = updateFormContainer.querySelector('.card');
    
        if (existingCard) {
          const existingCardOriginalParentId = existingCard.getAttribute('data-original-parent');
    
          if (existingCardOriginalParentId) {
            const existingCardOriginalParent = document.getElementById(existingCardOriginalParentId);
            existingCardOriginalParent.appendChild(existingCard);
          }
        }
    
        updateFormContainer.innerHTML = '';
        updateFormContainer.appendChild(productCard);
      }
    });
  
    ////////////////////////////////////////////////// delete product
    document.querySelectorAll('[id^="delete-product-btn-"]').forEach((button) => {
      // Get the product ID from the button's ID
      var productId = button.id.split('-').pop();
    
      // Add the onclick event handler
      button.addEventListener('click', function() {  
        // Call the deleteProduct function passing the form and product ID
        deleteProduct(productId);
      });
    });
  
    function deleteProduct(productName) {
      if (confirm("Are you sure you want to delete this product?")) {
        fetch(`/Products/${productName}`, { method: 'DELETE' })
          .then(response => {
            if (response.ok) {
              // Product deleted successfully, you can perform any additional actions here
              const prodElement = document.getElementById(`product-card-container-${productName}`);
  
              if (prodElement) {
                prodElement.style.display = 'none';
              }
              
              console.log(`Product ${productName} deleted successfully`);
            } else {
              
              console.error(`Failed to delete product ${productName}`);
            }
          })
          .catch(error => {
            // Error occurred during the delete request, handle the error
            console.error(`An error occurred while deleting product ${productName}`, error);
          });
      }
    }
    
    ////////////////////////////////////////////////////////////////pre validation update product 
    // Validate price input
    function UPprodvalidatePrice(priceInput, messageElement) {
      var price = priceInput.value.trim();
      var priceRegex = /^\d+(\.\d+)?$/;
  
      if (!priceRegex.test(price) || parseFloat(price) <= 0) {
        UPprodsetUpdateMessage(messageElement,"Price must be a positive number.");
      } else {
        UPprodclearUpdateMessage(messageElement);
      }
    }
  
    // Validate supply input
    function UPprodvalidateSupply(supplyInput, messageElement) {
      var supply = supplyInput.value.trim();
      var supplyRegex = /^\d*$/;
  
      if (!supplyRegex.test(supply) || parseInt(supply) < 0) {
        UPprodsetUpdateMessage(messageElement,"Supply must be a positive number or zero.");
      } else {
        UPprodclearUpdateMessage(messageElement);
      }
    }
  
    // Validate image name input
    function UPprodvalidateImageName(imgNameInput, messageElement) {
      var imgName = imgNameInput.value.trim();
      var imgNameRegex = /^[^\s]+$/;
  
      if (!imgNameRegex.test(imgName)) {
        UPprodsetUpdateMessage(messageElement,"Image name cannot contain spaces.");
      } else {
        UPprodclearUpdateMessage(messageElement);
      }
    }
  
    // Set user update section message
    function UPprodsetUpdateMessage(messageElement, message) {
      messageElement.textContent = message;
    }
  
    // Clear user update section message
    function UPprodclearUpdateMessage(messageElement) {
      messageElement.textContent = "";
    }
  
    //////////////////////////////////////////////////////////////pre-validation update user
    
    function UPvalidateEmail(emailInput, messageElement) {
      var email = emailInput.value.trim();
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
      if (!emailRegex.test(email)) {
        UPsetUpdateMessage(messageElement, "Invalid email address.");
      } else {
        UPclearUpdateMessage(messageElement);
      }
    }
    
    function UPvalidatePassword(passInput, messageElement) {
      var password = passInput.value.trim();
      var passwordRegex = /^[A-Za-z0-9]{4,8}$/;
    
      if (!passwordRegex.test(password)) {
        UPsetUpdateMessage(messageElement, "Password must be 4-8 characters long and contain only English letters and numbers.");
      } else {
        UPclearUpdateMessage(messageElement);
      }
    }
    
    function UPvalidateName(nameInput, messageElement) {
      var name = nameInput.value.trim();
      var nameRegex = /^[A-Za-z ]+$/;
    
      if (!nameRegex.test(name)) {
        UPsetUpdateMessage(messageElement, "Name can only contain English letters and spaces.");
      } else {
        UPclearUpdateMessage(messageElement);
      }
    }
    
    function UPvalidateAge(ageInput, messageElement) {
      var age = ageInput.value.trim();
    
      if (age < 18) {
        UPsetUpdateMessage(messageElement, "Age must be 18 or higher.");
      } else {
        UPclearUpdateMessage(messageElement);
      }
    }
    
    function UPvalidateAddress(addressInput, messageElement) {
      var address = addressInput.value.trim();
      var addressRegex = /^[A-Za-z0-9 ]+$/;
    
      if (!addressRegex.test(address)) {
        UPsetUpdateMessage(messageElement, "Address can only contain English letters, numbers, and spaces.");
      } else {
        UPclearUpdateMessage(messageElement);
      }
    }
    
    // Set user update section message
    function UPsetUpdateMessage(messageElement, message) {
      messageElement.textContent = message;
    }
    
  
  
    // Clear user update section message
    function UPclearUpdateMessage(messageElement) {
      messageElement.textContent = "";
    }
  
  
  
  
    
   /////////////////////////////////////////////////////////// main select
  
    var productsCol = document.getElementById("products-col");
    var usersCol = document.getElementById("users-col");
    var ordersCol = document.getElementById("orders-col");
  
    function handleRadioChange(event) {
        var selectedValue = event.target.value;
  
        if (selectedValue === "products") {
          productsCol.style.display = "block";
          usersCol.style.display = "none";
          ordersCol.style.display= "none";
  
          //////////////////////////////////////////////adding pre validation to update product
          document.querySelectorAll('[id^="update-product-form-"]').forEach((form) => {
            const UPproductId = form.getAttribute('action').split('/').pop();
            const UPnameInput = form.querySelector(`#update-product-name-${CSS.escape(UPproductId)}`);
  
            const UPpriceInput = form.querySelector(`#update-product-price-${CSS.escape(UPproductId)}`);
            const UPsupplyInput = form.querySelector(`#update-product-supply-${CSS.escape(UPproductId)}`);
            const UPimgNameInput = form.querySelector(`#update-product-imgName-${CSS.escape(UPproductId)}`);
  
            const UPmessageElement = form.querySelector(`#update-product-response-message-${CSS.escape(UPproductId)}`);
  
            // Add event listeners to input fields
          UPpriceInput.addEventListener("input", () => UPprodvalidatePrice(UPpriceInput, UPmessageElement));
          UPsupplyInput.addEventListener("input", () => UPprodvalidateSupply(UPsupplyInput, UPmessageElement));
          UPimgNameInput.addEventListener("input", () => UPprodvalidateImageName(UPimgNameInput, UPmessageElement));
         
           //// the name input isn't available for edit.
           UPnameInput.readOnly=true;
           //// ^^^^^^^^^^^^^^^^^^^^^^
           
          });
          
        } else if (selectedValue === "users") {
          productsCol.style.display = "none";
          usersCol.style.display = "block";
          ordersCol.style.display= "none";
  
  
          //////////////////////////////////////////////adding pre validation to update user
          document.querySelectorAll('[id^="update-user-form-"]').forEach((form) => {
            const UPuserId = form.getAttribute('action').split('/').pop();
            const UPemailInput = form.querySelector(`#update-user-email-${CSS.escape(UPuserId)}`);
            const UPpassInput = form.querySelector(`#update-user-pass-${CSS.escape(UPuserId)}`);
            const UPnameInput = form.querySelector(`#update-user-name-${CSS.escape(UPuserId)}`);
            const UPageInput = form.querySelector(`#update-user-age-${CSS.escape(UPuserId)}`);
            const UPaddressInput = form.querySelector(`#update-user-address-${CSS.escape(UPuserId)}`);
            const UPmessageElement = form.querySelector(`#update-user-response-message-${CSS.escape(UPuserId)}`);
            
          
            // Add event listeners to input fields
          UPemailInput.addEventListener("input", () => UPvalidateEmail(UPemailInput, UPmessageElement));
          UPpassInput.addEventListener("input", () => UPvalidatePassword(UPpassInput, UPmessageElement));
          UPnameInput.addEventListener("input", () => UPvalidateName(UPnameInput, UPmessageElement));
          UPageInput.addEventListener("input", () => UPvalidateAge(UPageInput, UPmessageElement));
          UPaddressInput.addEventListener("input", () => UPvalidateAddress(UPaddressInput, UPmessageElement));
        
           //// the name input isn't available for edit.
           UPemailInput.readOnly=true;
           //// ^^^^^^^^^^^^^^^^^^^^^^
           
          });
  
  
  
        } else if (selectedValue === "orders") {
          productsCol.style.display = "none";
          usersCol.style.display = "none";
          ordersCol.style.display= "block";
        } 
    }
  
    var radioButtons = document.querySelectorAll('[name="listGroupRadio"]');
  
    radioButtons.forEach(function(radioButton) {
      radioButton.addEventListener("change", handleRadioChange);
    });
  
    // Initialize the visibility based on the initially selected radio button
    var initiallySelectedRadioButton = document.querySelector('[name="listGroupRadio"]:checked');
    handleRadioChange({ target: initiallySelectedRadioButton });
    
  });