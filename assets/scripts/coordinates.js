//Form Validation & storing gathed data in local storage

const nextPageBtn = document.getElementById("nextPage");
const firstnameElement = document.getElementById("firstName");
const lastnameElement = document.getElementById("lastName");
const emailElement = document.getElementById("email");
const phoneNumberElement = document.getElementById("phoneNum");

nextPageBtn.addEventListener("click", () => {
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
  let formIsValid = true;
  const firstnameValue = firstnameElement.value.trim();
  const lastnameValue = lastnameElement.value.trim();
  const emailValue = emailElement.value.trim();
  const phoneNumberValue = phoneNumberElement.value.trim();

  if (required(firstnameValue) || !minLength(firstnameValue, 2)) {
    formIsValid = false;
    setError(firstnameElement, "*First name is required");
  } else {
    setSuccess(firstnameElement);
  }

  if (required(lastnameValue) || !minLength(lastnameValue, 3)) {
    formIsValid = false;
    setError(lastnameElement, "*Last name should include 3 or more characters");
  } else {
    setSuccess(lastnameElement);
  }
  if (required(emailValue)) {
    formIsValid = false;
    setError(emailElement, "*Email is required");
  } else if (!isValidEmail(emailValue)) {
    formIsValid = false;
    setError(emailElement, "*Provide a Valid email address");
  } else {
    setSuccess(emailElement);
  }

  if (required(phoneNumberValue)) {
    setSuccess(phoneNumberElement);
  } else if (!isValidPhoneNumber(phoneNumberValue)) {
    formIsValid = false;
    setError(phoneNumberElement, "Provide a valid phone number");
  }

  return formIsValid;
}

// When returning to the previous page, submitted values are displayed.

if (localStorage.getItem("personal-coordinates") !== null) {
  const personalCoordinates = JSON.parse(
    localStorage.getItem("personal-coordinates")
  );
  firstnameElement.value = personalCoordinates.first_name;
  lastnameElement.value = personalCoordinates.last_name;
  emailElement.value = personalCoordinates.email;
  phoneNumberElement.value = personalCoordinates.phone;
}
