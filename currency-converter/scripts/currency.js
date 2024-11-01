


/* Identify the current page */
const currentPage = window.location.pathname;

/* Toggle Navigation Menu */
const hamMenuButton = document.getElementById('ham-menu');
const menuLinks = document.querySelector('.menu-links');

hamMenuButton.onclick = function () {
    menuLinks.classList.toggle('open');
};

/* Date Update in Footer */
const today = new Date();
const year = today.getFullYear();

let yearSpan = document.getElementById("currentyear");
yearSpan.innerHTML = year;

const lastModified = document.lastModified;

let modifiedspan = document.getElementById("modified");
modifiedspan.innerHTML = lastModified;


// Wayfinding

document.addEventListener("DOMContentLoaded", function () {

    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll(".menu-links a");

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath.split("/").pop()) {
            link.classList.add("active");
        }
    });
});



/*------------------------------Script for Home Page---------------------------------*/

if (currentPage.includes('index.html')) {

    const apiKey = "d9ef40b80a8944e33d9c38ba";  
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    const amountInput = document.getElementById("amount");
    const fromCurrency = document.getElementById("from-currency");
    const toCurrency = document.getElementById("to-currency");
    const resultDiv = document.getElementById("result");
    const convertBtn = document.getElementById("convert-btn");

    // Fetch currency data and populate dropdowns
    async function fetchCurrencies() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.result === "success") {
                populateCurrencyOptions(data.conversion_rates);
            } else {
                throw new Error("Failed to fetch exchange rates.");
            }
        } catch (error) {
            resultDiv.textContent = "Error fetching currency data.";
        }
    }

    // Populate currency options in dropdowns
    function populateCurrencyOptions(rates) {
        const currencies = Object.keys(rates);
        currencies.forEach(currency => {
            const option1 = document.createElement("option");
            option1.value = currency;
            option1.textContent = currency;
            fromCurrency.appendChild(option1);

            const option2 = option1.cloneNode(true);
            toCurrency.appendChild(option2);
        });
        fromCurrency.value = "USD";
        toCurrency.value = "EUR";
    }

    // Convert currency
    async function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (isNaN(amount) || amount <= 0) {
            resultDiv.textContent = "Please enter a valid amount.";
            return;
        }

        try {
            const response = await fetch(`${apiUrl}`);
            const data = await response.json();

            if (data.result === "success") {
                const rate = data.conversion_rates[to] / data.conversion_rates[from];
                const convertedAmount = (amount * rate).toFixed(2);
                resultDiv.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
            } else {
                throw new Error("Conversion failed.");
            }
        } catch (error) {
            resultDiv.textContent = "Error converting currency.";
        }
    }

    convertBtn.addEventListener("click", convertCurrency);

    fetchCurrencies();
}


/*--------------------Script Countries Page----------------------*/

if (currentPage.includes('countries.html')) {
    const countryList = document.getElementById("country-list");
    const modal = document.getElementById("country-modal");
    const closeModalButton = document.getElementById("close-modal");

    const modalName = document.getElementById("country-name");
    const modalRegion = document.getElementById("country-region");
    const modalPopulation = document.getElementById("country-population");
    const modalCapital = document.getElementById("country-capital");

    async function fetchCountryData() {
        try {
            const response = await fetch("https://restcountries.com/v3.1/all");

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            displayCountries(data);
        } catch (error) {
            countryList.innerHTML = `<p>Sorry, there was a problem loading the country data.</p>`;
        }
    }

    function displayCountries(data) {
        data.forEach(country => {
            const countryDiv = document.createElement("div");
            countryDiv.classList.add("country");

            countryDiv.innerHTML = `
                <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
                <p>${country.name.common}</p>
            `;

            countryDiv.addEventListener("click", () => {
                modalName.textContent = country.name.common;
                modalRegion.textContent = country.region;
                modalPopulation.textContent = country.population.toLocaleString();
                modalCapital.textContent = country.capital ? country.capital[0] : "N/A";

                modal.showModal();
            });

            countryList.appendChild(countryDiv);
        });
    }

    closeModalButton.addEventListener("click", () => {
        modal.close();
    });

    fetchCountryData();
}


/*--------------------Script for the Thankyou Page--------------------------*/

if (currentPage.includes('thankyou.html')) {

    function getQueryParams() {

        const params = new URLSearchParams(window.location.search);

        const fname = params.get('first-name');
        const lname = params.get('last-name');
        const email = params.get('email');
        const phone = params.get('phone');
        const description = params.get('description');


        const data = [
            `First Name: ${fname}`,
            `Last Name: ${lname}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            `Message: ${description}`

        ];


        const div = document.getElementById('subscription-data');

        data.forEach(item => {
            const span = document.createElement('span');
            span.textContent = item;
            div.appendChild(span);
            div.appendChild(document.createElement('br'));
        });
    }

    window.onload = getQueryParams;
}



