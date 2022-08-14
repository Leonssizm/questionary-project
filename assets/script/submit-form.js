// get data from local storage

let coordinatesFromLocalStorage = localStorage.getItem("personal-coordinates");
let token = localStorage.getItem("token");
let skillsFromLocalStorage = localStorage.getItem("skillset-information");
let covidInfo = localStorage.getItem("covid");
let insights = localStorage.getItem("insights");
//parsing local storage data
let coordinates = JSON.parse(coordinatesFromLocalStorage);
let skills = JSON.parse(skillsFromLocalStorage);
let covidAndWork = JSON.parse(covidInfo);
let devtalkAndInsights = JSON.parse(insights);

//to pinpoint the exact work preference

let workArray = [
  covidAndWork.hybrid,
  covidAndWork.from_home,
  covidAndWork.from_office,
];
let chosenWorkPreference;

if (workArray[0] == true) {
  chosenWorkPreference = "hybrid";
}
if (workArray[1] == true) {
  chosenWorkPreference = "from_home";
}
if (workArray[2] == true) {
  chosenWorkPreference = "from_office";
}

let submitBtn = document.getElementById("submitButton");
submitBtn.addEventListener("click", submitData);
let body = {
  token: token,
  first_name: coordinates.first_name,
  last_name: coordinates.last_name,
  email: coordinates.email,
  phone: coordinates.phone,
  skills: skills,
  work_preference: chosenWorkPreference,
  had_covid: covidAndWork.had_covid,
  ...(covidAndWork.had_covid && { had_covid_at: covidAndWork.had_covid_at }),
  vaccinated: covidAndWork.vaccinated,
  ...(covidAndWork.vaccinated && {
    vaccinated_at: covidAndWork.vaccinationDate,
  }),
  will_organize_devtalk: devtalkAndInsights.devtalkRadioBtn,
  ...(devtalkAndInsights.devtalkRadioBtn && {
    devtalk_topic: devtalkAndInsights.devtalkTopic,
  }),
  something_special: devtalkAndInsights.specialWords,
};

function submitData() {
  fetch("https://bootcamp-2022.devtest.ge/api/application", {
    method: "POST",
    body: JSON.stringify({ body }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((data) => {
      if (data !== "") {
        alert("Form has been submitted");
        setTimeout((window.location.href = "./thanks.html"), 5000);
      }
    })
    .catch((error) => {
      alert(error);
    });
}
console.log(body);
