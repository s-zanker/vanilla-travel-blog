import { weatherIconMap } from './weatherIconMap.js';

async function fetchLocations() {
  const response = await fetch('http://localhost:8080/locations');
  const locations = await response.json();
  const locationsContainer = document.getElementById('locations');
  locationsContainer.innerHTML = '';

  // Automatically load the details of the first location, if the location array is not empty
  if (locations.length > 0) {
    const firstLocation = locations[0];
    // fetch current weather of the first location
    await loadCurrentWeather(firstLocation);
    //loads the first location of the array
    loadDetails(firstLocation);
  }

  locations.forEach((location) => {
    // fetch location data
    const { thumbnail, name, country, visit_date_from } = location; //Destructering

    // Create all HTML Elements for each location
    // location card
    const locationCard = document.createElement('div');
    locationCard.classList.add('location-card');

    // Add click Eventlistener to locationCard
    locationCard.addEventListener('click', function () {
      loadDetails(location);
    });

    // image
    const img = document.createElement('img');
    img.src = thumbnail; // Das Thumbnail als Bildquelle
    img.alt = name; // Alt-Text für das Bild
    // name of location
    const h2 = document.createElement('h2');
    h2.textContent = name; // Der Name der Location
    // paragraph for country, icon and date
    const p = document.createElement('p');
    // country
    const spanCountry = document.createElement('span');
    spanCountry.textContent = country;
    // calender icon
    const icon = document.createElement('i');
    icon.classList.add('far', 'fa-calendar', 'icon');
    // date
    const spanDate = document.createElement('span');
    spanDate.classList.add('date');
    spanDate.textContent = visit_date_from;

    // add country, icon and date to paragraph
    p.appendChild(spanCountry);
    p.appendChild(icon);
    p.appendChild(spanDate);

    // add image, name the paragraph with country, icon and date
    locationCard.appendChild(img);
    locationCard.appendChild(h2);
    locationCard.appendChild(p);

    // add `locationCard` to container in the dom
    locationsContainer.appendChild(locationCard);
  });

  console.log(locationsContainer);
}

//Load details page on click on locationCard
function loadDetails(locationClicked) {
  console.log(locationClicked.name);

  const detailsImg = document.getElementById('details-img');
  const detailsName = document.getElementById('details-name');
  const detailsCountry = document.getElementById('details-country');
  const detailsDateFromTo = document.getElementById('details-date-from-to');
  const detailsSummary = document.getElementById('details-summary');

  detailsImg.src = locationClicked.bigImage;
  detailsImg.alt = locationClicked.name;
  detailsName.textContent = locationClicked.name;
  detailsCountry.textContent = locationClicked.country;
  detailsDateFromTo.textContent = `${locationClicked.visit_date_from} \u2014 ${locationClicked.visit_date_to}`;
  detailsSummary.textContent = locationClicked.description;

  // Lade Wetterdaten
  loadCurrentWeather(locationClicked);
}

// Catch the current weather of a location with the place_id
async function loadCurrentWeather(location) {
  const apiKey = '5i98pnmcmhafbmlz5qekijo9u36v81kmm1hih5i4';
  const apiUrl = 'https://www.meteosource.com/api/v1/free/point';
  const placeId = location.place_id;
  const url = `${apiUrl}?place_id=${placeId}&sections=current&language=en&units=auto&key=${apiKey}`;

  const response = await fetch(url);
  const weatherData = await response.json();
  const weatherDescription = weatherData.current.icon;
  const weatherIconId = weatherIconMap[weatherDescription] || 0; // Default to 0 if not found
  const weatherIcon = document.getElementById('weather-icon');

  weatherIcon.src = `icons/weather_icons/${weatherIconId}.png`;
  weatherIcon.alt = weatherDescription;

  const temperature = document.getElementById('temperature');
  const summary = document.getElementById('weather-summary');

  temperature.textContent = `${weatherData.current.temperature}\u00B0C`;
  summary.textContent = weatherData.current.summary;
}

fetchLocations();
