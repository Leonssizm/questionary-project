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

// Form Validation & & storing gathed data in local storage
const nextPageBtn = document.getElementById("nextPage");
let workPreferenceRadioBtn = document.querySelectorAll(
  'input[name = "location"]'
);
let covidContactRadioBtn = document.querySelectorAll(
  'input[name = "covid-contact"]'
);
const covidContactDates = document.getElementById("covid-contact-date-input");

let vaccinationRadioBtn = document.querySelectorAll(
  'input[name = "covid-vaccine"]'
);
let gotVaccineOnThisDay = document.getElementById("vaccination-date-input");

nextPageBtn.addEventListener("click", () => {
  validateInputs();
  if (isFormValid() == true) {
    const gatheredCovidData = {
      workPlaceOffice: workPreferenceRadioBtn[0].checked
        ? "From Sairme Office"
        : false,
      workPlaceHome: workPreferenceRadioBtn[1].checked ? "From Home" : false,
      workPlaceHybrid: workPreferenceRadioBtn[2].checked ? "Hybrid" : false,
      covidContact: covidContactDates.value.trim(),
      vaccinationDate: gotVaccineOnThisDay.value.trim(),
    };
    window.localStorage.setItem(
      "Covid-Information",
      JSON.stringify(gatheredCovidData)
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
    if (covidContactDates.value == "") {
      setError(covidContactDates, "*Please fill this field");
    } else {
      setSuccess(covidContactDates);
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

//back to the previous page Btn

const previousPageBtn = document.getElementById("previousPage");
previousPageBtn.addEventListener("click", () => {
  window.location.href = "./skillset.html";
});
