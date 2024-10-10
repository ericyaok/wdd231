
const hamMenuButton = document.getElementById('ham-menu');
const menuLinks = document.getElementById('menu-links');


hamMenuButton.onclick = function () {
    menuLinks.classList.toggle('open');
};

const today = new Date();
const year = today.getFullYear();

let yearSpan = document.getElementById("currentyear");
yearSpan.innerHTML = year;

const lastModified = document.lastModified;

let modifiedspan = document.getElementById("modified");
modifiedspan.innerHTML = lastModified;



const url = 'data/members.json';
const cards = document.querySelector('#cards');
let goldMembersToDisplay = [];
const goldMembersContainer = document.getElementById('gold-members-wrapper');


const displayCompanies = (companies, container) => {
    companies.forEach((company) => {

        let card = document.createElement('section');
        card.classList.add('grid-style');
        let name = document.createElement('h3');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('p');
        let portrait = document.createElement('img');


        name.textContent = `${company.name}`;
        address.textContent = `${company.address}`;
        phone.textContent = `${company.phoneNumber}`;
        website.textContent = `${company.website}`;

        portrait.setAttribute('src', 'images/company-logo.jpeg');
        portrait.setAttribute('alt', 'company logo');
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '140');
        portrait.setAttribute('height', '140');


        card.appendChild(portrait);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);

        container.appendChild(card);
    });
}

async function getCompaniesData() {
    const response = await fetch(url);
    const data = await response.json();
    goldMembersToDisplay = selectRandomMembers(data.companies);
    displayCompanies(goldMembersToDisplay, goldMembersContainer);
}

getCompaniesData();

/* document.getElementById('grid-view').addEventListener('click', function() {
    const sections = document.querySelectorAll('#cards section');
    const images = document.querySelectorAll('#cards img');
    const cardsContaniner = document.getElementById('cards');

    sections.forEach(function(section) {
      section.classList.remove('table-view');
    });
    images.forEach(function(image) {
        image.style.display = 'block'; 
    });

    cardsContaniner.classList.add('grid');
  });


  document.getElementById('list-view').addEventListener('click', function() {
    const sections = document.querySelectorAll('#cards section');
    const images = document.querySelectorAll('#cards img');
    const cardsContaniner = document.getElementById('cards');

    sections.forEach(function(section, index) {
        section.classList.add('table-view');   
    });

    images.forEach(function(image) {
        image.style.display = 'none'; 
    });

    cardsContaniner.classList.remove('grid');
  }); */

/* --------------------------Homepage-------------------------------------*/

function selectRandomMembers(companies) {
    const eligibleCompanies = companies.filter(company => company.membershipLevel === 2 || company.membershipLevel === 3);

    const shuffled = eligibleCompanies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
}

/* Weather API Fetch */

const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=5.56&lon=-0.196&appid=1a06b1d1f9bf00e56b94af1608413eea&units=imperial`;

const weatherIcon = document.querySelector('#weather-icon');
const weatherDesc = document.querySelector('#description');
const weatherTemp = document.querySelector('#temperature');

async function apiFetch() {
    try {
        const response = await fetch(weatherApi);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    weatherTemp.innerHTML = `${data.main.temp}&deg;F`;
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;
    weatherIcon.setAttribute('SRC', iconsrc);
    weatherIcon.setAttribute('alt', data.weather[0].description);
    weatherDesc.innerHTML = desc;
}


apiFetch();




//---------------------Fetch 3-day forecast from OpenWeatherMap ----------------------

const apiKey = '1a06b1d1f9bf00e56b94af1608413eea';  // Replace with your OpenWeatherMap API Key
const lat = 5.56;    // Replace with your latitude
const lon = -0.196;   // Replace with your longitude

const getWeatherForecast = async () => {
    const apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiURL);
        const data = await response.json();

        // Extract and display first instance of forecast for today and the next two days
        console.log(data);
        displayTemperature(data);
    } catch (error) {
        console.error("Error fetching the weather data:", error);
    }
};

// Function to display temperatures for today, tomorrow, and the day after tomorrow
const displayTemperature = (data) => {
    const forecastContainer = document.getElementById('weather-container');
    forecastContainer.innerHTML = ''; // Clear previous data

    const today = new Date().getDate(); // Get today's date

    // Object to store the first forecast instance for today, tomorrow, and the day after
    const firstInstances = {
        today: null,
        tomorrow: null,
        dayAfterTomorrow: null,
    };

    // Loop through forecast data and get the first instance for each day
    data.list.forEach(item => {
        const forecastDate = new Date(item.dt_txt);
        const forecastDay = forecastDate.getDate();

        if (forecastDay === today && !firstInstances.today) {
            firstInstances.today = item;  // Get the first instance of today's forecast
        }
        if (forecastDay === today + 1 && !firstInstances.tomorrow) {
            firstInstances.tomorrow = item;  // Get the first instance of tomorrow's forecast
        }
        if (forecastDay === today + 2 && !firstInstances.dayAfterTomorrow) {
            firstInstances.dayAfterTomorrow = item;  // Get the first instance of the day after tomorrow's forecast
        }
    });

    // Function to get the day of the week (e.g., "Monday")
    const getDayOfWeek = (dateString) => {
        const date = new Date(dateString);
        const options = { weekday: 'long' };  // Format to get only the day name
        return date.toLocaleDateString(undefined, options);
    };

    // Display the temperatures for today, tomorrow, and the day after tomorrow
    Object.entries(firstInstances).forEach(([key, day]) => {
        if (day) {
            let displayDate;

            // If it's today, display "Today"; otherwise, show the day of the week
            if (key === 'today') {
                displayDate = "Today";
            } else {
                displayDate = getDayOfWeek(day.dt_txt);
            }

            const temp = day.main.temp;

            // Create HTML elements
            const forecastCard = document.createElement('div');
            forecastCard.classList.add('forecast-card');

            forecastCard.innerHTML = `
                <p>${displayDate}</p>
                <p>Temperature: ${temp}°C</p>
            `;

            forecastContainer.appendChild(forecastCard);
        }
    });
};

// Call the function
getWeatherForecast();