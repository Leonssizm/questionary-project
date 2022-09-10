// coordinates Page Validation

const REGEX = {
  EMAIL:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  PHONE: /[+][9]{2}[5]{2}[0-9]{8}$/g,
};

function isValidEmail(email) {
  return REGEX.EMAIL.test(String(email).toLowerCase());
}

function isValidPhoneNumber(phoneNum) {
  return REGEX.PHONE.test(phoneNum);
}

function isFilled(element) {
  return element !== null && element !== "";
}

function lengthIsLonger(element, length) {
  return element.length > length;
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
