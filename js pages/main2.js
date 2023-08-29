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


// personal data 
async function getData() {
    console.log("start fetch data");
    const url = `https://script.google.com/macros/s/AKfycbxbIh1P4jMmH5GDvpE44wHgu-g1JPUvvK10gGcOyBPdUi8fTt6kGDBuJ-3Eh6ydkuMX9A/exec`;
    response = await fetch(url);
    data = await response.json();
    console.log("done fetch data");
    return data;
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
            emailcrd.innerHTML = user.Email;
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
}

moreBtn.addEventListener('click', () => {
    emailcrd.style.display = "block";
    // emailcrd.style.display = emailcrd.style.display === 'none' ? 'block' : 'none';
});





// invoice data 


async function getInvoice(id) {
    const response = await fetch('https://script.google.com/macros/s/AKfycbzWPoJWJuAgWp1qLOgKsaHp4jR7jC6buI5GMWa__tN3tzC2Y5Hp3VBpV0KLy1mjZTYs-A/exec', {
        method: 'POST',
        body: JSON.stringify({ "id": id })
    })
    var data = await response.json();
    console.log(data);
    return data;
}





async function showInvoice(value) {
    try {
        const Invoices = await getInvoice(value);
        const tbodyInvoice = document.querySelector('.tbody2');
        // tbodyInvoice.innerHTML = '';
        // Sort the invoices by timestamp
        Invoices.sort((a, b) => new Date(a.Timestamp) - new Date(b.Timestamp));

        Invoices.forEach(element => {
            if (value == element.ID) {
                var studentInvoice = {
                    Amount: element["Amount "],
                    Timestamp: element.Timestamp,
                    Notes: element["Notes "],
                    autoSerial: element["autoSerial "],
                    InvoiceType: element["InvoiceType "]
                };
                console.log(studentInvoice.Amount);
                const newRow = document.createElement('tr');
                const timeCell = document.createElement('td');
                const AmountCell = document.createElement('td');
                const noteCell = document.createElement('td');
                const serialCell = document.createElement('td');
                const InvoiceTypeCell = document.createElement('td');
                newRow.appendChild(timeCell);
                newRow.appendChild(noteCell);
                newRow.appendChild(AmountCell);
                newRow.appendChild(serialCell);
                newRow.appendChild(InvoiceTypeCell);
                // Format the timestamp
                const options = { year: 'numeric', month: 'short', day: 'numeric' };
                const formattedTimestamp = new Date(studentInvoice.Timestamp).toLocaleDateString('en-US', options);


                timeCell.innerHTML = formattedTimestamp;

                noteCell.innerHTML = studentInvoice.Notes;
                AmountCell.innerHTML = studentInvoice.Amount;
                serialCell.innerHTML = studentInvoice.autoSerial;
                InvoiceTypeCell.innerHTML = studentInvoice.InvoiceType;
                tbodyInvoice.appendChild(newRow);
            }
        });
    } catch (error) {
        console.log(error);
    }
}








var paramsGroup = new URLSearchParams(window.location.search);
var value = paramsGroup.get('id');
showInvoice(value);
display(value);


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


        // Stop all functions from another JavaScript file
        return;
    } else {

        display(value);
        // showInvoice(value);
    }
});

// add an event listener to the window object to run the `change()` function when a new window is opened
window.addEventListener('open', change);

window.onload = function () {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");
    const searchBtn = document.querySelector(".bx-search")

    closeBtn.addEventListener("click", function () {
        sidebar.classList.toggle("open")
        menuBtnChange()
    })

    searchBtn.addEventListener("click", function () {
        sidebar.classList.toggle("open")
        menuBtnChange()
    })

    function menuBtnChange() {
        if (sidebar.classList.contains("open")) {
            closeBtn.classList.replace("bx-menu", "bx-menu-alt-right")
        } else {
            closeBtn.classList.replace("bx-menu-alt-right", "bx-menu")
        }
    }
}


const welcome = document.querySelector('.Welcome');
var user = localStorage.getItem("myUser");

welcome.innerHTML = `Welcome ${user}!`