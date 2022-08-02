//Form Validation & storing gathed data in local storage

const nextPageBtn = document.getElementById("nextPage");
const firstname = document.getElementById("firstName");
const lastname = document.getElementById("lastName");
const email = document.getElementById("email");
const phoneNum = document.getElementById("phoneNum");
nextPageBtn.addEventListener("click", () => {
  validateInputs();
  if (isFormValid() == true) {
    const gatheredDataFromCoordinatesPage = {
      name: firstname.value,
      lastname: lastname.value,
      email: email.value,
      phoneNumber: phoneNum.value,
    };
    window.localStorage.setItem(
      "personal-coordinates",
      JSON.stringify(gatheredDataFromCoordinatesPage)
    );
    window.location.href = "./skillset.html";
  } else {
    alert("Please provide valid info");
  }
});

function isFormValid() {
  const inputContainers = form.querySelectorAll(".input-control");
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

function isValidEmail(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}
function isValidPhoneNumber(phoneNum) {
  const regex = /[+][9]{2}[5]{2}[0-9]{8}$/g;
  return regex.test(phoneNum);
}
function validateInputs() {
  const firstnameValue = firstname.value.trim();
  const lastnameValue = lastname.value.trim();
  const emailValue = email.value.trim();
  const phoneNumValue = phoneNum.value.trim();

  if (
    firstnameValue === "" ||
    firstnameValue === null ||
    firstnameValue.length < 2
  ) {
    setError(firstname, "*First name is required");
  } else {
    setSuccess(firstname);
  }

  if (
    lastnameValue === "" ||
    lastnameValue === null ||
    lastnameValue.length < 3
  ) {
    setError(lastname, "*Last name should include 3 or more characters");
  } else {
    setSuccess(lastname);
  }

  if (emailValue === "" || emailValue === null) {
    setError(email, "*Email is required");
  } else if (!isValidEmail(emailValue)) {
    setError(email, "*Provide a Valid email address");
  } else {
    setSuccess(email);
  }

  if (phoneNumValue === "" || phoneNumValue === null) {
    setSuccess(phoneNum);
  } else if (!isValidPhoneNumber(phoneNumValue)) {
    setError(phoneNum, "Provide a valid phone number");
  } else {
    setSuccess(phoneNum);
  }
}
