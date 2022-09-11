// Show/Hide conditionally rendered forms

const covidContactDateLabel = document.getElementById("covid-contact-date");
const vaccinationDate = document.getElementById("vaccination-date");

function showCovidContact(answer) {
  covidContactDateLabel.style.display = answer === "yes" ? "block" : "none";
}

function showVaccinationDateInput(answer) {
  vaccinationDate.style.display = answer === "yes" ? "block" : "none";
}

// Form Validation & & storing gathed data in local storage
const nextPageBtn = document.getElementById("nextPage");
const workPreferenceRadioButtons = document.querySelectorAll('input[name = "location"]');
const covidContactRadioButtons = document.querySelectorAll('input[name = "covid-contact"]');
const covidContactDateInput = document.getElementById("covid-contact-date-input");

const vaccinationRadioButtons = document.querySelectorAll('input[name = "covid-vaccine"]');
const gotVaccineOnThisDay = document.getElementById("vaccination-date-input");

nextPageBtn.addEventListener("click", () => {
  if (validateInputs()) {
    window.localStorage.setItem(
      "covid",
      JSON.stringify({
        from_office: !!workPreferenceRadioButtons[0].checked,
        from_home: !!workPreferenceRadioButtons[1].checked,
        hybrid: !!workPreferenceRadioButtons[2].checked,
        had_covid: !!covidContactRadioButtons[0].checked,
        had_covid_at: covidContactDateInput.value.trim(),
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
    if (!isFilled(covidContactDateInput.value)) {
      formIsValid = false;
      setError(covidContactDateInput, "*Please fill this field");
    } else {
      setSuccess(covidContactDateInput);
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

  if (COVID_JOB_VACCINATION_DATA.from_office) {
    workPreferenceRadioButtons[0].checked = true;
  } else if (COVID_JOB_VACCINATION_DATA.from_home) {
    workPreferenceRadioButtons[1].checked = true;
  } else {
    workPreferenceRadioButtons[2].checked = true;
  }

  // Display Covid Contact Choice
  if (COVID_JOB_VACCINATION_DATA.had_covid) {
    covidContactRadioButtons[0].checked = true;
    covidContactDateLabel.style.display = "block";
    covidContactDateInput.value = COVID_JOB_VACCINATION_DATA.had_covid_at;
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
