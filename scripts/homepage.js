const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]



const today = new Date();
const year = today.getFullYear();

let yearSpan = document.getElementById("currentyear");
yearSpan.innerHTML = year;

const lastModified = document.lastModified;

let modifiedspan = document.getElementById("modified");
modifiedspan.innerHTML = lastModified;


const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});



function createButtons(objectsList, subject) {
    var container = document.getElementById('course-display');
    
    // Clear any existing buttons before appending new ones (optional)
    container.innerHTML = '';
  
    // If a subject is provided, filter the list; otherwise, use the full list
    var filteredList = subject 
      ? objectsList.filter(function(obj) {
          return obj.subject === subject;
        })
      : objectsList;
  
    // Loop through the filtered list (or full list if no subject was provided)
    filteredList.forEach(function(obj) {
      var button = document.createElement('button');
      button.textContent = obj.subject;
      
      // Add the 'finish' class if the completed property is true
      if (obj.completed === true) {
        button.classList.add('finish');
      }
      
      container.appendChild(button);
    });
  }
  
 
  
// Grab the button with id 'all'
var allButton = document.getElementById('all');
var cseButton = document.getElementById('cse');
var wddButton = document.getElementById('wdd');

// Add the click event listener to the 'all' button
allButton.addEventListener('click', function() {
  // Call the createButtons function when 'all' button is clicked
  createButtons(courses);
});

cseButton.addEventListener('click', function() {
    // Call the createButtons function when 'all' button is clicked
    createButtons(courses,'CSE');
  });

  wddButton.addEventListener('click', function() {
    // Call the createButtons function when 'all' button is clicked
    createButtons(courses,'WDD');
  });
  