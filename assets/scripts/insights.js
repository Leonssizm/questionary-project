//devtalk topic input
let devtalkFieldWrapper = document.getElementById("devtalk-field-wrapper");
function displayDevtalkForm(answer) {
  devtalkFieldWrapper.style.display = answer === "yes" ? "block" : "none";
}

// form validation & storing gathed data in local storage

let specialWordsInput = document.getElementById("somethingSpecial");
let devtalkRadioButtons = document.querySelectorAll('input[name = "devtalk"]');
let devtalkField = document.getElementById("devtalk-field");

const nextPageBtn = document.getElementById("nextPage");
nextPageBtn.addEventListener("click", () => {
  if (validateInputs()) {
    window.localStorage.setItem(
      "insights",
      JSON.stringify({
        devtalkRadioBtn: !!devtalkRadioButtons[0].checked,
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
  if (
    !isFilled(specialWordsInput) ||
    !lengthIsLonger(specialWordsInputValue, 2)
  ) {
    formIsValid = false;
    setError(specialWordsInput, "*Please fill this field");
  } else {
    setSuccess(specialWordsInput);
  }

  if (devtalkRadioButtons[0].checked) {
    if (!isFilled(devtalkFieldValue)) {
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

  if (insightsFromLocalStorage.devtalkRadioBtn) {
    devtalkRadioButtons[0].checked = true;
    devtalkFieldWrapper.style.display = "block";
    devtalkField.value = insightsFromLocalStorage.devtalkTopic;
  } else {
    devtalkRadioButtons[1].checked = true;
  }
  specialWordsInput.value = insightsFromLocalStorage.specialWords;
}
