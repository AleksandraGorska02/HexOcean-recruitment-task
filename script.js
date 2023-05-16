// Get form elements
const form = document.getElementById('dish-form');
const typeField = document.getElementById('type');
const pizzaFields = document.getElementById('pizza-fields');
const soupFields = document.getElementById('soup-fields');
const sandwichFields = document.getElementById('sandwich-fields');

// Add event listener to typeField
typeField.addEventListener('change', function () {
  const selectedType = typeField.value;
  
  // Hide all fields
  hideAllFields();

  // Show fields based on selected type
  if (selectedType === 'pizza') {
    pizzaFields.classList.remove('hidden');
  } else if (selectedType === 'soup') {
    soupFields.classList.remove('hidden');
  } else if (selectedType === 'sandwich') {
    sandwichFields.classList.remove('hidden');
  }
});

// Function to hide all fields
function hideAllFields() {
  pizzaFields.classList.add('hidden');
  soupFields.classList.add('hidden');
  sandwichFields.classList.add('hidden');
}

// Submit event listener
form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById('name').value;
  const preparationTime = document.getElementById('preparation_time').value;
  const type = document.getElementById('type').value;
  const noOfSlices = document.getElementById('no_of_slices').value;
  const diameter = document.getElementById('diameter').value;
  const spicinessScale = document.getElementById('spiciness_scale').value;
  const slicesOfBread = document.getElementById('slices_of_bread').value;

  // Create data object
  const data = {
    name,
    preparation_time: preparationTime,
    type,
  };

  // Add conditional fields based on type
  if (type === 'pizza') {
    data.no_of_slices = parseInt(noOfSlices);
    data.diameter = parseFloat(diameter);
  } else if (type === 'soup') {
    data.spiciness_scale = parseInt(spicinessScale);
  } else if (type === 'sandwich') {
    data.slices_of_bread = parseInt(slicesOfBread);
  }

  // Make POST request
  fetch('https://umzzcc503l.execute-api.us-west-2.amazonaws.com/dishes/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      // Handle success response here
    })
    .catch(error => {
      console.error(error);
      // Handle error here
    });
});