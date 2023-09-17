// var searchInput = document.getElementsByName("search");
// var fName = document.querySelector(".fName");
// var body = document.getElementById("body");
// var infoBox = document.getElementsByClassName("info-box")
// var Email = document.querySelector('.Email');
// var Phone = document.querySelector('.Phone');
// var ID = document.querySelector('.ID');
// var Requests = document.getElementById('Requests');
// var Complaint = document.getElementById('Complaint');
// var searchButton = document.querySelector('.search-button');
// var pic = document.getElementById("profile-pic")
// var headName = document.querySelector('.headName') 




// const seeMore3 = document.querySelector('.seeMore3');

async function getInfoDeadlines() {
  const url = `https://script.googleusercontent.com/macros/echo?user_content_key=0R8d1iqm90C-GGTz99LLcABq6JENQdCw-rur0yb31njY0Wc0L5n0bzMAIKEfTYonYZRQLHNd2lFhE3ySk3SBTral3hsVvRwZm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnLvWzkbjjR_fgiUtTLMvhDvPsd6Ah7bMHYDZ2SfFYsGe49N88IBzLFHYettXQhUz1lKKK7_QllFkpCW2Mbqx36uCwy8sBRNeetz9Jw9Md8uu&lib=MQfVKFgVXIr2Rm9shkxeT9DVOmtUjdkhJ`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function getDeadlineCards() {
  const url = `https://script.google.com/macros/s/AKfycbwqja3nFfJIBT0WFGthzn9PdnykwSVjAI3q3dVvtIdo4AbXrJdozLHabxfUkuwbVtZV3Q/exec`;
  response1 = await fetch(url);
  data1 = await response1.json();
  // console.log(data[0].Name);
  return data1;
}


const spinner3 = document.getElementById('spinner3');

function loadOn3() {
  spinner3.style.display = 'block';
}

function loadOff3() {
  spinner3.style.display = 'none';
}


// Get the result from session storage
// try {
//   const savedResultDead = sessionStorage.getItem('myDatadead');
//   if (savedResultDead) {
//     const studentd = JSON.parse(savedResultDead);
//     // Use the result to update the UI
//     showDeadlines(studentd.value);
//   }
// } catch (error) {
//   console.log(error);
// }



const savedResultDead = sessionStorage.getItem('studentsData');
if (savedResultDead) {
  const sResult = JSON.parse(savedResultDead);
  // Use the result to update the UI
  showDeadlines(sResult.value);
}


// dead function 
async function displayDeadCard(value) {
  loadOn3()
  numDeadline.textContent = " ";
  const cards = await getDeadlineCards(value);

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



async function showDeadlines(value) {
  try {
    var students = await getInfoDeadlines(value);
    // Store the data in sessionStorage
    if (students.ID == value) {
      const sResult = { value };
      sessionStorage.setItem("studentsData", JSON.stringify(sResult));
    }
    // const numDeadline = document.querySelector('.num-deadline');
    const footer3 = document.querySelector('.footer3');
    let filteredDeadlines = students.filter(student => student.ID == value);
    let deadlineCount = filteredDeadlines.length;

    console.log(deadlineCount);
    const numberOfPaidDeadlines = filteredDeadlines.filter(student => student.Status === "paid").length;
    console.log(numberOfPaidDeadlines);
    const deadlines = filteredDeadlines.sort((a, b) => new Date(a["Due Date"]) - new Date(b["Due Date"]));
    const now = new Date();
    const nextDeadline = deadlines.find(deadline => new Date(deadline["Due Date"]) > now);
    if (numberOfPaidDeadlines === deadlineCount) {
      // const numberOfUnpaidDeadlines = deadlineCount
      // numDeadline.textContent = `${numberOfUnpaidDeadlines} / ${deadlineCount}`;
      footer3.textContent = "No upcoming deadlines";
    } else {
      // numDeadline.textContent = `${numberOfPaidDeadlines} / ${deadlineCount}`;
      const formattedDueDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(nextDeadline["Due Date"]));
      footer3.textContent = `Next deadline: ${formattedDueDate}`;
    }

    let deadlineUrl = `Deadlines.html?id=${value}`;
    seeMore3.href = deadlineUrl;
    let deadline = await fetch(deadlineUrl);
    let deadlineData = await deadline.json();
    localStorage.setItem('deadlineData', JSON.stringify(deadlineData));
    window.open = deadlineUrl;


    students.forEach(element => {
      if (value == element.ID) {
        let student = { DueDate: element[`Due Date`], Amount: element.Amount, Status: element.Status, value: element.ID };
        if (students.value === undefined) {
          students.value = document.querySelector('input[name="id"]').value;
        }
        student.value = value;
        console.log(student);
        const newRow = document.createElement('tr');
        const DueDateCell = document.createElement('td');
        const AmountCell = document.createElement('td');
        const StatusCell = document.createElement('td');
        newRow.appendChild(DueDateCell);
        newRow.appendChild(AmountCell);
        newRow.appendChild(StatusCell);
        DueDateCell.innerHTML = student.DueDate;
        AmountCell.innerHTML = student.Amount;
        const img = document.createElement('img');
        if (student.Status === "paid") {
          img.src = "./imgs/download.png";
          img.alt = "paid";
          img.style.width = "7%";
        } else if (student.Status === "unpaid") {
          img.src = "./imgs/png-transparent-computer-icons-ok-miscellaneous-trademark-cross.png";
          img.alt = "unpaid";
          img.style.width = "7%";
        }
        StatusCell.appendChild(img);
      }
    });
  } catch (error) {
    console.log(error);
  }
}






searchButton.addEventListener('click', () => {
  const value = searchInput[0].value;
  showDeadlines(value);
});








//   const result = {
//     value : searchInput[0].value,
//     numDeadline: numDeadline.textContent,
//     footer3: footer3.textContent,
//     deadlineData: deadlineData
// };