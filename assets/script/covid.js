//vaccination & covid contact date input

const covidContactDate = document.getElementById("covid-contact-date");
const vaccinationDate = document.getElementById("vaccination-date");
covidContactDate.style.display = "none";
vaccinationDate.style.display = "none";
function covidContact(answer) {
  if (answer == `yes`) {
    covidContactDate.style.display = "block";
  } else {
    covidContactDate.style.display = "none";
  }
}

function vaccinationDateInput(answer) {
  if (answer == `yes`) {
    vaccinationDate.style.display = "block";
  } else {
    vaccinationDate.style.display = "none";
  }
}
