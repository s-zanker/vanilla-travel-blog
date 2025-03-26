//Form Handling to add new locations
const locationForm = document.getElementById('location-form');

locationForm.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(event) {
  event.preventDefault(); // Prevents the default form submit behavior

  const form = event.target; // The form that triggered the event
  const formData = new FormData(form);

  const formObject = Object.fromEntries(formData.entries()); // Convert FormData to plain object. entries() iterates over all formData elements

  //fetch place_id of the country
  const name = formObject.name;
  const apiKey = '5i98pnmcmhafbmlz5qekijo9u36v81kmm1hih5i4';
  const apiUrl = 'https://www.meteosource.com/api/v1/free';
  const url = `${apiUrl}/find_places?text=${name}&key=${apiKey}`;
  const responseWeatherApi = await fetch(url);
  const placesArray = await responseWeatherApi.json();
  console.log(placesArray);

  //filter places array with the name and country
  const placeFound = placesArray.find(
    (place) =>
      place.name.toLowerCase() === formObject.name.toLowerCase() &&
      place.country.toLowerCase() === formObject.country.toLowerCase()
  );

  // Only if a place is found, a location will be added
  if (placeFound) {
    console.log('Place found:', placeFound);
    console.log('place_id: ', placeFound.place_id);
    formObject.place_id = placeFound.place_id;

    //Place found will be added to JSON
    // Convert to pretty JSON format
    const jsonOutput = JSON.stringify(formObject, null, 4);
    console.log('jsonOutput:', jsonOutput);

    const response = await fetch('http://localhost:8080/locations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonOutput, // send json data in body
    });

    const data = await response.json();
    console.log('added successfully:', data);
    //reset form inputs
    form.reset();
  } else {
    alert(
      `No place could be found with ${formObject.name} and ${formObject.country}. Make sure you have written it correctly in English. Check and try again.`
    );
  }
}
