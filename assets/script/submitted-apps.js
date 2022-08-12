//making a collapsible list

document.querySelectorAll(".accordion-btn").forEach((button) => {
  button.addEventListener("click", () => {
    let accordionContent = button.nextElementSibling;
    button.classList.toggle("accordion-btn-active");
    if (button.classList.contains("accordion-btn-active")) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    } else {
      accordionContent.style.maxHeight = 0;
    }
  });
});

//fetching data from the API
let submittedAppsBtn = document.getElementById("submittedApps");
submittedAppsBtn.addEventListener("click", () => {
  fetch(
    "https://bootcamp-2022.devtest.ge/api/applications?token=b3fdeb04-8ed1-4544-93ff-8cf46471498c"
  )
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        document.getElementById("personal-info-header").innerHTML =
          "Personal Information";
        document.getElementById("first-name").innerHTML = "First Name";
        document.getElementById("first-name-content").innerHTML =
          data[i].first_name;
        document.getElementById("last-name").innerHTML = "Last Name";
        document.getElementById("last-name-content").innerHTML =
          data[i].last_name;
        document.getElementById("email").innerHTML = "E-mail";
        document.getElementById("email-content").innerHTML = data[i].email;
        document.getElementById("phone").innerHTML = "Phone";
        document.getElementById("phone-content").innerHTML = data[i].phone;
        document.getElementById(
          "covid-info-header"
        ).innerHTML = `Covid Situation`;
        document.getElementById(
          "work-question-header"
        ).innerHTML = `how would you prefer to work`;
      }
    });
});
