//vaccination & covid contact date input

const covidContactDateLabel = document.getElementById("covid-contact-date");
const vaccinationDate = document.getElementById("vaccination-date");
function covidContact(answer) {
  covidContactDateLabel.style.display = answer === "yes" ? "block" : "none";
}

function vaccinationDateInput(answer) {
  vaccinationDate.style.display = answer === "yes" ? "block" : "none";
}

// Form Validation & & storing gathed data in local storage
const nextPageBtn = document.getElementById("nextPage");
let workPreferenceRadioButtons = document.querySelectorAll(
  'input[name = "location"]'
);
let covidContactRadioButtons = document.querySelectorAll(
  'input[name = "covid-contact"]'
);
const covidContactDatesInput = document.getElementById(
  "covid-contact-date-input"
);

let vaccinationRadioButtons = document.querySelectorAll(
  'input[name = "covid-vaccine"]'
);
let gotVaccineOnThisDay = document.getElementById("vaccination-date-input");

nextPageBtn.addEventListener("click", () => {
  if (validateInputs()) {
    window.localStorage.setItem(
      "covid",
      JSON.stringify({
        from_office: !!workPreferenceRadioButtons[0].checked,
        from_home: !!workPreferenceRadioButtons[1].checked,
        hybrid: !!workPreferenceRadioButtons[2].checked,
        had_covid: !!covidContactRadioButtons[0].checked,
        had_covid_at: covidContactDatesInput.value.trim(),
        vaccinated: !!vaccinationRadioButtons[0].checked,
        vaccinationDate: gotVaccineOnThisDay.value.trim(),
      })
    );
    if (
      !workPreferenceRadioButtons[0].checked &&
      !workPreferenceRadioButtons[1].checked &&
      !workPreferenceRadioButtons[2].checked
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
  if (covidContactRadioButtons[0].checked) {
    if (!isFilled(covidContactDatesInput.value)) {
      formIsValid = false;
      setError(covidContactDatesInput, "*Please fill this field");
    } else {
      setSuccess(covidContactDatesInput);
    }
  }

  if (vaccinationRadioButtons[0].checked) {
    if (!isFilled(gotVaccineOnThisDay.value)) {
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

  // display Job Preference choice

  COVID_JOB_VACCINATION_DATA.from_office
    ? (workPreferenceRadioButtons[0].checked = true)
    : COVID_JOB_VACCINATION_DATA.from_home
    ? (workPreferenceRadioButtons[1].checked = true)
    : COVID_JOB_VACCINATION_DATA.hybrid
    ? (workPreferenceRadioButtons[2].checked = true)
    : null;

  // Display Covid Contact Choice

  if (COVID_JOB_VACCINATION_DATA.had_covid) {
    covidContactRadioButtons[0].checked = true;
    covidContactDateLabel.style.display = "block";
    covidContactDatesInput.value = COVID_JOB_VACCINATION_DATA.had_covid_at;
  } else {
    covidContactRadioButtons[1].checked = true;
  }

  // Display vaccination choice
  if (COVID_JOB_VACCINATION_DATA.vaccinated) {
    vaccinationRadioButtons[0].checked = true;
    vaccinationDate.style.display = "block";
    gotVaccineOnThisDay.value = COVID_JOB_VACCINATION_DATA.vaccinationDate;
  } else {
    vaccinationRadioButtons[1].checked = true;
  }
}
