async function fetchLocations() {
  const response = await fetch('http://localhost:3000/locations');
  const locations = await response.json();
  const locationsContainer = document.getElementById('locations');
  locationsContainer.innerHTML = '';

  locations.forEach((location) => {
    // fetch location data
    const thumbnail = location.thumbnail;
    const name = location.name;
    const country = location.country;
    const visitDateFrom = location.visit_date_from;

    // Create all HTML Elements for each location
    // location card
    const locationCard = document.createElement('div');
    locationCard.classList.add('locationCard');

    // Add click Eventlistener to locationCard
    locationCard.addEventListener('click', function () {
      console.log(location);
      alert('Location wurde geklickt');
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
    spanDate.textContent = visitDateFrom;

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

fetchLocations();
