//making a collapsible list

document.querySelectorAll(".accordion-btn").forEach((button) => {
  button.addEventListener("click", () => {
    let accordionContent = button.nextElementSibling;
    button.classList.toggle("accordion-btn-active");
    if (button.classList.contains("accordion-btn-active")) {
      setTimeout(() => {
        accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
      }, 4000);
    } else {
      accordionContent.style.maxHeight = 0;
    }
  });
});

//fetching data from the API
// let submittedAppsBtn = document.getElementById("submittedApps");
// submittedAppsBtn.onclick = fetchData;

fetch(
  "https://bootcamp-2022.devtest.ge/api/applications?token=" +
    localStorage.getItem("token")
)
  .then((response) => response.json())
  .then((data) => {
    for (let i = 0; i < data.length; i++) {
      //personal info
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

      //covid situation and work preference

      document.getElementById(
        "covid-info-header"
      ).innerHTML = `Covid Situation`;
      document.getElementById(
        "work-question-header"
      ).innerHTML = `how would you prefer to work`;
      if (data[i].work_preference === "from_home") {
        document.getElementById("from-office").innerHTML =
          "&#9711;" + "From Sairme Office";
        document.getElementById("from-home").innerHTML =
          "&#10686;" + "From home";
        document.getElementById("hybrid").innerHTML = "&#9711;" + "Hybrid";
      } else if (data[i].work_preference === "from_office") {
        document.getElementById("from-office").innerHTML =
          "&#10686;" + "From Sairme Office";
        document.getElementById("from-home").innerHTML =
          "&#9711;" + "From home";
        document.getElementById("hybrid").innerHTML = "&#9711;" + "Hybrid";
      } else if (data[i].work_preference === "hybrid") {
        document.getElementById("from-office").innerHTML =
          "&#9711;" + "From Sairme Office";
        document.getElementById("from-home").innerHTML =
          "&#9711;" + "From home";
        document.getElementById("hybrid").innerHTML = "&#10686;" + "Hybrid";
      }

      // Covid Contact

      document.getElementById("covid-question-header").innerHTML =
        "Did you have covid 19?";

      if (data[i].had_covid == false) {
        document.getElementById("covid-yes").innerHTML = "&#9711;" + "Yes";
        document.getElementById("covid-no").innerHTML = "&#10686;" + "No";
      }
      if (data[i].had_covid == true) {
        document.getElementById("covid-yes").innerHTML = "&#10686;" + "Yes";
        document.getElementById("covid-no").innerHTML = "&#9711;" + "No";
        document.getElementById("covid-date-title").innerHTML =
          "When did you have covid?";
        document.getElementById("covid-contact-date").innerHTML =
          data[i].had_covid_at + "<hr>" + "&#128197";
      }

      // Vaccination

      document.getElementById("vaccine-question-header").innerHTML =
        "Have you been Vaccinated?";

      if (data[i].vaccinated == true) {
        document.getElementById("vaccine-yes").innerHTML = "&#10686;" + "Yes";
        document.getElementById("vaccine-no").innerHTML = "&#9711;" + "No";
      }
    }
  });
