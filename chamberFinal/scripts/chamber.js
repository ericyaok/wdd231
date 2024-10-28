


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



/*--------------------Script for the Join Page----------------------*/

if (currentPage.includes('join.html')) {
    document.getElementById('timestamp').value = new Date().toISOString();


    const modal1 = document.getElementById('modal1');
    const modal2 = document.getElementById('modal2');
    const modal3 = document.getElementById('modal3');
    const modal4 = document.getElementById('modal4');

    const openModal1 = document.getElementById('openModal1');
    const openModal2 = document.getElementById('openModal2');
    const openModal3 = document.getElementById('openModal3');
    const openModal4 = document.getElementById('openModal4');

    const closeModal1 = document.getElementById('closeModal1');
    const closeModal2 = document.getElementById('closeModal2');
    const closeModal3 = document.getElementById('closeModal3');
    const closeModal4 = document.getElementById('closeModal4');



    openModal1.addEventListener('click', function () {
        modal1.showModal();
    });
    closeModal1.addEventListener('click', function () {
        modal1.close();
    });

    openModal2.addEventListener('click', function () {
        modal2.showModal(); 
    });
    closeModal2.addEventListener('click', function () {
        modal2.close(); 
    });

    openModal3.addEventListener('click', function () {
        modal3.showModal(); 
    });
    closeModal3.addEventListener('click', function () {
        modal3.close(); 
    });

    openModal4.addEventListener('click', function () {
        modal4.showModal(); 
    });
    closeModal4.addEventListener('click', function () {
        modal4.close(); 
    });

}




/*--------------------Script for the Thankyou Page--------------------------*/


if (currentPage.includes('thankyou.html')) {
    
    function getQueryParams() {
       
        const params = new URLSearchParams(window.location.search);

        const fname = params.get('first-name');  
        const lname = params.get('last-name');
        const title = params.get('title');
        const email = params.get('email');
        const phone = params.get('phone');
        const businessName = params.get('business-name');
        const membership = params.get('membership');
        const description = params.get('description');
        const timestamp = params.get('timestamp');

    
       const data = [
        `First Name: ${fname}`,
        `Last Name: ${lname}`,
        `Title: ${title}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `Business Name: ${businessName}`,
        `Membership: ${membership}`,
        `Description: ${description}`,
        `Timestamp: ${timestamp}`
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



