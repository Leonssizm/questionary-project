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
  if (validateInputs()) {
    window.localStorage.setItem(
      "insights",
      JSON.stringify({
        devtalkRadioBtn: devtalkRadioBtn[0].checked ? true : false,
        devtalkTopic: devtalkField.value.trim(),
        specialWords: specialWordsInput.value.trim(),
      })
    );
    window.location.href = "./submit.html";
  } else {
    alert("Please provide valid info");
  }
});

function validateInputs() {
  let formIsValid = true;
  const specialWordsInputValue = specialWordsInput.value.trim();
  const devtalkFieldValue = devtalkField.value.trim();
  if (required(specialWordsInput) || !minLength(specialWordsInputValue, 2)) {
    formIsValid = false;
    setError(specialWordsInput, "*Please fill this field");
  } else {
    setSuccess(specialWordsInput);
  }

  if (devtalkRadioBtn[0].checked === true) {
    if (required(devtalkFieldValue)) {
      formIsValid = false;
      setError(devtalkField, "*Please fill this field");
    } else {
      setSuccess(devtalkField);
    }
  }
  return formIsValid;
}

// When returning to the previous page, submitted values are displayed.

if (localStorage.getItem("insights") !== null) {
  let insightsFromLocalStorage = JSON.parse(localStorage.getItem("insights"));

  if (insightsFromLocalStorage.devtalkRadioBtn === true) {
    devtalkRadioBtn[0].checked = true;
    devtalkFieldWrapper.style.display = "block";
    devtalkField.value = insightsFromLocalStorage.devtalkTopic;
  } else {
    devtalkRadioBtn[1].checked = true;
  }
  specialWordsInput.value = insightsFromLocalStorage.specialWords;
}
