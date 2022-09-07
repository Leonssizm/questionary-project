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
  if (validateInputs()) {
    window.localStorage.setItem(
      "covid",
      JSON.stringify({
        from_office: workPreferenceRadioBtn[0].checked ? true : false,
        from_home: workPreferenceRadioBtn[1].checked ? true : false,
        hybrid: workPreferenceRadioBtn[2].checked ? true : false,
        had_covid: covidContactRadioBtn[0].checked ? true : false,
        had_covid_at: covidContactDatesInput.value.trim(),
        vaccinated: vaccinationRadioBtn[0].checked ? true : false,
        vaccinationDate: gotVaccineOnThisDay.value.trim(),
      })
    );
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

function validateInputs() {
  let formIsValid = true;
  if (covidContactRadioBtn[0].checked == true) {
    if (required(covidContactDatesInput.value)) {
      formIsValid = false;
      setError(covidContactDatesInput, "*Please fill this field");
    } else {
      setSuccess(covidContactDatesInput);
    }
  }

  if (vaccinationRadioBtn[0].checked == true) {
    if (required(gotVaccineOnThisDay.value)) {
      formIsValid = false;
      setError(gotVaccineOnThisDay, "*Please fill this field");
    } else {
      setSuccess(gotVaccineOnThisDay);
    }
  }
  return formIsValid;
}

// When returning to the previous page, submitted values are displayed.

if (localStorage.getItem("covid") !== null) {
  let COVID_JOB_VACCINATION_DATA = JSON.parse(localStorage.getItem("covid"));

  // Display work preference radio button choice
  if (COVID_JOB_VACCINATION_DATA.from_office == true) {
    workPreferenceRadioBtn[0].checked = true;
  } else if (COVID_JOB_VACCINATION_DATA.from_home == true) {
    workPreferenceRadioBtn[1].checked = true;
  } else if (COVID_JOB_VACCINATION_DATA.hybrid == true) {
    workPreferenceRadioBtn[2].checked = true;
  }

  // Display Covid Contact Choice

  if (COVID_JOB_VACCINATION_DATA.had_covid == true) {
    covidContactRadioBtn[0].checked = true;
    covidContactDateLabel.style.display = "block";
    covidContactDatesInput.value = COVID_JOB_VACCINATION_DATA.had_covid_at;
  } else {
    covidContactRadioBtn[1].checked = true;
  }

  // Display vaccination choice
  if (COVID_JOB_VACCINATION_DATA.vaccinated == true) {
    vaccinationRadioBtn[0].checked = true;
    vaccinationDate.style.display = "block";
    gotVaccineOnThisDay.value = COVID_JOB_VACCINATION_DATA.vaccinationDate;
  } else {
    vaccinationRadioBtn[1].checked = true;
  }
}
