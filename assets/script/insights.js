//devtalk topic input
let devtalkFieldWrapper = document.getElementById("devtalk-field-wrapper");
devtalkFieldWrapper.style.display = "none";
function displayDevtalkForm(answer) {
  if (answer == `yes`) {
    devtalkFieldWrapper.style.display = "block";
  } else {
    devtalkFieldWrapper.style.display = "none";
  }
}

// form validation & storing gathed data in local storage

let specialWordsInput = document.getElementById("somethingSpecial");
let devtalkRadioBtn = document.querySelectorAll('input[name = "devtalk"]');
let devtalkField = document.getElementById("devtalk-field");

const nextPageBtn = document.getElementById("nextPage");
nextPageBtn.addEventListener("click", () => {
  validateInputs();
  if (isFormValid() == true) {
    const gatheredDataFromInsightsPage = {
      devtalkRadioBtn: devtalkRadioBtn[0].checked ? true : false,
      devtalkTopic: devtalkField.value.trim(),
      specialWords: specialWordsInput.value.trim(),
    };
    window.localStorage.setItem(
      "insights",
      JSON.stringify(gatheredDataFromInsightsPage)
    );
    window.location.href = "./submit.html";
  } else {
    alert("Please provide valid info");
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
  const specialWordsInputValue = specialWordsInput.value.trim();
  const devtalkFieldValue = devtalkField.value.trim();
  if (
    specialWordsInputValue === "" ||
    specialWordsInputValue === null ||
    specialWordsInputValue.length < 2
  ) {
    setError(specialWordsInput, "*Please fill this field");
  } else {
    setSuccess(specialWordsInput);
  }

  if (devtalkRadioBtn[0].checked === true) {
    if (devtalkFieldValue === "" || devtalkFieldValue === null) {
      setError(devtalkField, "*Please fill this field");
    } else {
      setSuccess(devtalkField);
    }
  }
}

// When returning to the previous page, submitted values are displayed.

if (localStorage.getItem("insights") !== null) {
  if (JSON.parse(localStorage.getItem("insights")).devtalkRadioBtn === true) {
    devtalkRadioBtn[0].checked = true;
    devtalkFieldWrapper.style.display = "block";
    devtalkField.value = JSON.parse(
      localStorage.getItem("insights")
    ).devtalkTopic;
  } else {
    devtalkRadioBtn[1].checked = true;
  }
  specialWordsInput.value = JSON.parse(
    localStorage.getItem("insights")
  ).specialWords;
}
