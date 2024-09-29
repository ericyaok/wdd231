
const hamMenuButton = document.getElementById('ham-menu');
const menuLinks = document.getElementById('menu-links');


hamMenuButton.onclick = function() {
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


const displayCompanies = (companies) => {
    companies.forEach((company) => {
        
        let card = document.createElement('section');
        card.classList.add('grid-style');
        let name = document.createElement('h3'); 
        let address = document.createElement('p');
        let phone= document.createElement('p');
        let website= document.createElement('p');
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
        


        cards.appendChild(card);
    }); 
}

async function getCompaniesData() {
    const response = await fetch(url);
    const data = await response.json();
    console.table(data.companies); 
    displayCompanies(data.companies);
}

getCompaniesData();

document.getElementById('grid-view').addEventListener('click', function() {
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
  });