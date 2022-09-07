//Form Validation & storing gathed data in local storage

const nextPageBtn = document.getElementById("nextPage");
const firstnameElement = document.getElementById("firstName");
const lastnameElement = document.getElementById("lastName");
const emailElement = document.getElementById("email");
const phoneNumberElement = document.getElementById("phoneNum");
let formIsValid = true;
nextPageBtn.addEventListener("click", () => {
  validateInputs();
  if (validateInputs()) {
    window.localStorage.setItem(
      "personal-coordinates",
      JSON.stringify({
        first_name: firstnameElement.value,
        last_name: lastnameElement.value,
        email: emailElement.value,
        phone: phoneNumberElement.value,
      })
    );

    window.location.href = "./skillset.html";
  } else {
    alert("Please provide valid information");
  }
});

function validateInputs() {
  const firstnameValue = firstnameElement.value.trim();
  const lastnameValue = lastnameElement.value.trim();
  const emailValue = emailElement.value.trim();
  const phoneNumberValue = phoneNumberElement.value.trim();

  if (
    firstnameValue === "" ||
    firstnameValue === null ||
    firstnameValue.length < 2
  ) {
    formIsValid = false;
    setError(firstnameElement, "*First name is required");
  } else {
    setSuccess(firstnameElement);
  }

  if (
    lastnameValue === "" ||
    lastnameValue === null ||
    lastnameValue.length < 3
  ) {
    formIsValid = false;
    setError(lastnameElement, "*Last name should include 3 or more characters");
  } else {
    setSuccess(lastnameElement);
  }

  if (emailValue === "" || emailValue === null) {
    formIsValid = false;
    setError(emailElement, "*Email is required");
  } else if (!isValidEmail(emailValue)) {
    formIsValid = false;
    setError(emailElement, "*Provide a Valid email address");
  } else {
    setSuccess(emailElement);
  }

  if (phoneNumberValue === "" || phoneNumberValue === null) {
    setSuccess(phoneNumberElement);
  } else if (!isValidPhoneNumber(phoneNumberValue)) {
    formIsValid = false;
    setError(phoneNumberElement, "Provide a valid phone number");
  } else {
    setSuccess(phoneNumberElement);
  }

  return formIsValid;
}

// When returning to the previous page, submitted values are displayed.

if (localStorage.getItem("personal-coordinates") !== null) {
  firstnameElement.value = JSON.parse(
    localStorage.getItem("personal-coordinates")
  ).first_name;
  lastnameElement.value = JSON.parse(
    localStorage.getItem("personal-coordinates")
  ).last_name;
  emailElement.value = JSON.parse(
    localStorage.getItem("personal-coordinates")
  ).email;
  phoneNumberElement.value = JSON.parse(
    localStorage.getItem("personal-coordinates")
  ).phone;
}
