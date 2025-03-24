//Form Handling to add new locations
const locationForm = document.getElementById('location-form');

locationForm.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault(); // Prevents the default form submit behavior

  const form = event.target; // The form that triggered the event
  const formData = new FormData(form);
  console.log(formData);

  const formObject = Object.fromEntries(formData.entries()); // Convert FormData to plain object. entries() iterates over all formData elements
  console.log(formObject);

  // Convert to pretty JSON format
  const jsonOutput = JSON.stringify(formObject, null, 4);
  console.log(jsonOutput);

  const response = await fetch('http://localhost:8080/locations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonOutput, // send json data in body
  });

  const data = await response.json();
  console.log('added successfully:', data);
}
