// const getResponse = response => response.json();
// const processJSON = data => {const data = JSON}


var searchInput = document.getElementsByName("search");
var fName = document.querySelector(".fName");
var body = document.getElementById("body");
var infoBox = document.querySelector(".info-box");
var Email = document.querySelector(".Email");
var Phone = document.querySelector(".Phone");
var ID = document.querySelector(".ID");
var Requests = document.getElementById("Requests");
var Complaint = document.querySelector("#Complaint");
var searchButton = document.querySelector(".search-button");
var pic = document.getElementById("profile-pic");
var headName = document.querySelector(".headName");
var loadingDiv = document.querySelector(".loading-div");
const moduleCountElement = document.getElementById('moduleCount');
const numDeadline = document.querySelector('.num-deadline');
const footer3 = document.querySelector('.footer3');
const seeMore3 = document.querySelector('.seeMore3');
const seeMore4 = document.querySelector('.seeMore4');
const IdNumber = document.querySelector('.IdNumber');
const DOB = document.querySelector('.DOB');
const Grade = document.querySelector('.Grade');
const Scholarship = document.querySelector('.Scholarship');
const Receptionist = document.querySelector('.Receptionist');
const Reserver = document.querySelector('.Reserver');
const CCAgent = document.querySelector('.CCAgent');
const ReservationDate = document.querySelector('.ReservationDate');
const more = document.querySelector('.more');
const emailcrd = document.querySelector('.email-crd');
const moreBtn = document.querySelector('.more-btn');
const invoiceBtn = document.querySelector(".invoiceBtn")


// loading card

const spinner3 = document.getElementById('spinner3');

function loadOn3() {
  spinner3.style.display = 'block';
}

function loadOff3() {
  spinner3.style.display = 'none';
}


const spinner4 = document.getElementById('spinner4');

function loadOn4() {
  spinner4.style.display = 'block';
}

function loadOff4() {
  spinner4.style.display = 'none';
}
 //end


var overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.display = "none";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100%";
overlay.style.height = "100%";
overlay.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
overlay.style.backdropFilter = "blur(5px)";
overlay.style.zIndex = "1";
document.body.appendChild(overlay);

function change() {
  loadingDiv.style.display = "block";
  overlay.style.display = "block";
}

function hide() {
  overlay.style.display = "none";
  loadingDiv.style.display = "none";
}

async function getData() {
  console.log("start fetch data");
  const url = `https://script.google.com/macros/s/AKfycbxbIh1P4jMmH5GDvpE44wHgu-g1JPUvvK10gGcOyBPdUi8fTt6kGDBuJ-3Eh6ydkuMX9A/exec`;
  response = await fetch(url);
  data = await response.json();
  console.log("done fetch data");
  return data;
}

async function getAllCards() {
  const url = `https://script.google.com/macros/s/AKfycbwqja3nFfJIBT0WFGthzn9PdnykwSVjAI3q3dVvtIdo4AbXrJdozLHabxfUkuwbVtZV3Q/exec`;
  response1 = await fetch(url);
  data1 = await response1.json();
  // console.log(data[0].Name);
  return data1;
}

// Get data from session storage if it exists
const savedData = sessionStorage.getItem("myData");
if (savedData) {
  const data = JSON.parse(savedData);
  // Use the data to render the page
  // fName.innerHTML = data.Name;
  // ID.innerHTML = data.ID;
  // Email.innerHTML = data.Email.slice(0, 20);
  // Phone.innerHTML = data.Phone;
  // headName.innerHTML = data.Name.slice(0, 50);
  // pic.src = data.img;
  change();
  display(data.ID);
  hide()
}
const savedDataPlan = sessionStorage.getItem("myDataPlan");
if (savedDataPlan) {
  const data = JSON.parse(savedDataPlan);
  // Use the data to render the page
  change();
  displayPlanCard(data.value)
  hide()
}

const savedDataDead = sessionStorage.getItem("myDataDead");
if (savedDataDead) {
  const data = JSON.parse(savedDataDead);
  // Use the data to render the page
  change();
  displayDeadCard(data.value)
  hide()
}


async function display(value) {
  change();
  var users = await getData(value);

  users.forEach((element) => {
    if (value == element.ID) {
      let user = {
        Name: element.Name,
        ID: element.ID,
        Email: element.Email,
        Phone: element.Phone,
        img: element.image,
        IdNumber: element.IdNational,
        DOB: element.DateOfBirth,
        Grade: element.Grade,
        Scholarship: element.Scholarship,
        Receptionist: element.Receptionist,
        Reserver: element.Reserver,
        CCAgent: element.CCAgent,
        ReservationDate: element.ReservationDate,
      };
      // Save the data to session storage
      sessionStorage.setItem("myData", JSON.stringify(user));
      // Use the data to render the page
      fName.innerHTML = user.Name;
      ID.innerHTML = user.ID;
      let result = user.Email.indexOf(",");
      Email.innerHTML = user.Email.slice(0, result);
      emailcrd.innerHTML=user.Email;
      Phone.innerHTML = user.Phone;
      headName.innerHTML = user.Name.slice(0, 50);
      pic.src = user.img;
      IdNumber.innerHTML = user.IdNumber;
      DOB.innerHTML = user.DOB.slice(0, 10);
      Grade.innerHTML = user.Grade;
      Scholarship.innerHTML = user.Scholarship;
      Receptionist.innerHTML = user.Receptionist;
      Reserver.innerHTML = user.Reserver;
      CCAgent.innerHTML = user.CCAgent;
      ReservationDate.innerHTML = user.ReservationDate.slice(0, 10);
    }
  });
  more.style.display = "inline";
  hide();

  let invoiceUrl = `invoice.html?id=${value}`;
  invoiceBtn.href = invoiceUrl;
  let invoice = await fetch(invoiceUrl);
  let invoiceData = await invoice.json();
  sessionStorage.setItem('invoiceData', JSON.stringify(invoiceData));
  window.open(invoiceUrl); // Open moduleUrl in a new window
}

moreBtn.addEventListener('click', () => {
  emailcrd.style.display = "block";
  // emailcrd.style.display = emailcrd.style.display === 'none' ? 'block' : 'none';
});


// plan function 
async function displayPlanCard(value) {
  loadOn4()
  moduleCountElement.textContent = " ";
  const cards = await getAllCards(value);

  cards.forEach(card => {
    if (value == card.ID) {
      let planInfo = { value: card.ID, paln: card.Schadule, payment: card.Payments, paper: card.Papers, request: card.Requests, complaint: card.Complaints };
      // Save the data to session storage
      sessionStorage.setItem("myDataPlan", JSON.stringify(planInfo));
      // Use the data to render the page
      // traning plan 
      moduleCountElement.textContent = planInfo.paln;
    }
  });
  loadOff4()

  // module location 
  let moduleUrl = `Group.html?id=${value}`;
  seeMore4.href = moduleUrl;
  let module = await fetch(moduleUrl);
  let moduleData = await module.json();
  sessionStorage.setItem('moduleData', JSON.stringify(moduleData));
  window.open(moduleUrl); // Open moduleUrl in a new window
  
}


// dead function 
async function displayDeadCard(value) {
  loadOn3()
  numDeadline.textContent = " ";
  const cards = await getAllCards(value);

  cards.forEach(card => {
    if (value == card.ID) {
      let DeadInfo = { value: card.ID, paln: card.Schadule, payment: card.Payments, paper: card.Papers, request: card.Requests, complaint: card.Complaints };

      // Save the data to session storage
      sessionStorage.setItem("myDataDead", JSON.stringify(DeadInfo));
      // Use the data to render the page

      // deadLine
      numDeadline.textContent = DeadInfo.payment;
    }
  });
  loadOff3()
  // deadline location 
  let deadlineUrl = `Deadlines.html?id=${value}`;
  seeMore3.href = deadlineUrl;
  let deadline = await fetch(deadlineUrl);
  let deadlineData = await deadline.json();
  sessionStorage.setItem('deadlineData', JSON.stringify(deadlineData));
  window.open(deadlineUrl); // Open deadlineUrl in a new window
  
}




searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  sessionStorage.clear();
  const value = searchInput[0].value;
  if (value.trim() === "" || isNaN(value) || value.charAt(0) !== "2") {
    // Create a Bootstrap alert message
    const alertMessage = document.createElement("div");
    alertMessage.classList.add("alert", "alert-danger");
    alertMessage.textContent = "Please enter a valid Student Id";
    alertMessage.style.width = "50%";
    alertMessage.style.margin = "0 auto";
    alertMessage.style.display = "flex";
    alertMessage.style.alignItems = "center";
    alertMessage.style.justifyContent = "center";
    const section2 = document.querySelector(".section2");
    section2.appendChild(alertMessage);

    // Hide the alert message after half a second
    setTimeout(() => {
      alertMessage.style.display = "none";
    }, 2000);
    //display all boxes in this case
    fName.innerHTML = " ";
    ID.innerHTML = " ";
    Email.innerHTML = " ";
    Phone.innerHTML = " ";
    headName.innerHTML = " ";
    pic.src = " ";
    moduleCountElement.textContent = "0 / 0";
    numDeadline.textContent = "0 / 0";
    footer3.textContent = "No deadlines found";



    // Stop all functions from another JavaScript file
    return;
  } else {

    display(value);
    displayDeadCard(value);
    displayPlanCard(value)
  }
});






window.onload = function () {
  const sidebar = document.querySelector(".sidebar");
  const closeBtn = document.querySelector("#btn");
  const searchBtn = document.querySelector(".bx-search");

  closeBtn.addEventListener("click", function () {
    sidebar.classList.toggle("open");
    menuBtnChange();
  });

  searchBtn.addEventListener("click", function () {
    sidebar.classList.toggle("open");
    menuBtnChange();
  });

  function menuBtnChange() {
    if (sidebar.classList.contains("open")) {
      closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  }
};



// let params = {};
// let regex = /([^&=]+)=([^&]*)/g, m;
// while (m = regex.exec(location.href)){
//   params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
// }

// if (Object.keys(params).length > 0) {
//   localStorage.setItem('authInfo', JSON.stringify(params));
// }

// // hide the access token 
// if (window.history && window.history.pushState) {
//   window.history.pushState({}, document.title, "/SRM.html");
// } else {
//   window.location.replace("/SRM.html");
// }

// let info = JSON.parse(localStorage.getItem('authInfo'));
// console.log(JSON.parse(localStorage.getItem('authInfo')));
// console.log(info['access_token']);
// console.log(info['expires_in']);

console.log(user);
const welcome = document.querySelector('.Welcome');
var user = localStorage.getItem("myUser");

welcome.innerHTML = `Welcome ${user}!`