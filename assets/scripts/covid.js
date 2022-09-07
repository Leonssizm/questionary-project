//vaccination & covid contact date input

const covidContactDateLabel = document.getElementById("covid-contact-date");
const vaccinationDate = document.getElementById("vaccination-date");
covidContactDateLabel.style.display = "none";
vaccinationDate.style.display = "none";
function covidContact(answer) {
  if (answer == `yes`) {
    covidContactDateLabel.style.display = "block";
  } else {
    covidContactDateLabel.style.display = "none";
  }
}

function vaccinationDateInput(answer) {
  if (answer == `yes`) {
    vaccinationDate.style.display = "block";
  } else {
    vaccinationDate.style.display = "none";
  }
}

// Form Validation & & storing gathed data in local storage
const nextPageBtn = document.getElementById("nextPage");
let workPreferenceRadioBtn = document.querySelectorAll(
  'input[name = "location"]'
);
let covidContactRadioBtn = document.querySelectorAll(
  'input[name = "covid-contact"]'
);
const covidContactDatesInput = document.getElementById(
  "covid-contact-date-input"
);

let vaccinationRadioBtn = document.querySelectorAll(
  'input[name = "covid-vaccine"]'
);
let gotVaccineOnThisDay = document.getElementById("vaccination-date-input");

nextPageBtn.addEventListener("click", () => {
  validateInputs();
  if (isFormValid() == true) {
    const gatheredCovidData = {
      from_office: workPreferenceRadioBtn[0].checked ? true : false,
      from_home: workPreferenceRadioBtn[1].checked ? true : false,
      hybrid: workPreferenceRadioBtn[2].checked ? true : false,
      had_covid: covidContactRadioBtn[0].checked ? true : false,
      had_covid_at: covidContactDatesInput.value.trim(),
      vaccinated: vaccinationRadioBtn[0].checked ? true : false,
      vaccinationDate: gotVaccineOnThisDay.value.trim(),
    };
    window.localStorage.setItem("covid", JSON.stringify(gatheredCovidData));
    if (
      workPreferenceRadioBtn[0].checked == false &&
      workPreferenceRadioBtn[1].checked == false &&
      workPreferenceRadioBtn[2].checked == false
    ) {
      alert("First Question is mandatory");
    } else {
      window.location.href = "./insights.html";
    }
  } else {
    alert("Please Provide Valid data");
  }
});

function isFormValid() {
  const inputContainers = document.querySelectorAll(".input-control");
  let result = true;
  inputContainers.forEach((container) => {
    if (container.classList.contains("error")) {
      result = false;
    }
  });
  return result;
}

function setError(element, message) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
}

function setSuccess(element) {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
}

function validateInputs() {
  if (covidContactRadioBtn[0].checked == true) {
    if (covidContactDatesInput.value == "") {
      setError(covidContactDatesInput, "*Please fill this field");
    } else {
      setSuccess(covidContactDatesInput);
    }
  }

  if (vaccinationRadioBtn[0].checked == true) {
    if (gotVaccineOnThisDay.value == "") {
      setError(gotVaccineOnThisDay, "*Please fill this field");
    } else {
      setSuccess(gotVaccineOnThisDay);
    }
  }
}

// When returning to the previous page, submitted values are displayed.

if (localStorage.getItem("covid") !== null) {
  // Display work preference radio button choice
  if (JSON.parse(localStorage.getItem("covid")).from_office == true) {
    workPreferenceRadioBtn[0].checked = true;
  } else if (JSON.parse(localStorage.getItem("covid")).from_home == true) {
    workPreferenceRadioBtn[1].checked = true;
  } else if (JSON.parse(localStorage.getItem("covid")).hybrid == true) {
    workPreferenceRadioBtn[2].checked = true;
  }

  // Display Covid Contact Choice

  if (JSON.parse(localStorage.getItem("covid")).had_covid == true) {
    covidContactRadioBtn[0].checked = true;
    covidContactDateLabel.style.display = "block";
    covidContactDatesInput.value = JSON.parse(
      localStorage.getItem("covid")
    ).had_covid_at;
  } else {
    covidContactRadioBtn[1].checked = true;
  }

  // Display vaccination choice
  if (JSON.parse(localStorage.getItem("covid")).vaccinated == true) {
    vaccinationRadioBtn[0].checked = true;
    vaccinationDate.style.display = "block";
    gotVaccineOnThisDay.value = JSON.parse(
      localStorage.getItem("covid")
    ).vaccinationDate;
  } else {
    vaccinationRadioBtn[1].checked = true;
  }
}
