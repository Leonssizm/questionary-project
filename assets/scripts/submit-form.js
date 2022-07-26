// get data from local storage
let token = localStorage.getItem("token");

//parsing local storage data
let coordinates = JSON.parse(localStorage.getItem("personal-coordinates"));
let skills = JSON.parse(localStorage.getItem("skillset-information"));
let covidAndWork = JSON.parse(localStorage.getItem("covid"));
let devtalkAndInsights = JSON.parse(localStorage.getItem("insights"));

//to pinpoint the exact work preference
let workArray = [covidAndWork.hybrid, covidAndWork.from_home, covidAndWork.from_office];
let chosenWorkPreference;

if (workArray[0]) {
  chosenWorkPreference = "hybrid";
} else if (workArray[1]) {
  chosenWorkPreference = "from_home";
} else {
  chosenWorkPreference = "from_office";
}

let submitBtn = document.getElementById("submitButton");
submitBtn.addEventListener("click", submitData);

function submitData() {
  fetch("https://bootcamp-2022.devtest.ge/api/application", {
    method: "POST",
    body: JSON.stringify({
      token: token,
      first_name: coordinates.first_name,
      last_name: coordinates.last_name,
      email: coordinates.email,
      phone: coordinates.phone,
      skills: skills,
      work_preference: chosenWorkPreference,
      had_covid: covidAndWork.had_covid,
      ...(covidAndWork.had_covid && {
        had_covid_at: covidAndWork.had_covid_at,
      }),
      vaccinated: covidAndWork.vaccinated,
      ...(covidAndWork.vaccinated && {
        vaccinated_at: covidAndWork.vaccinationDate,
      }),
      will_organize_devtalk: devtalkAndInsights.devtalkRadioBtn,
      ...(devtalkAndInsights.devtalkRadioBtn && {
        devtalk_topic: devtalkAndInsights.devtalkTopic,
      }),
      something_special: devtalkAndInsights.specialWords,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((data) => {
      if (data !== "") {
        alert("Form has been submitted");

        window.localStorage.clear();
        setTimeout((window.location.href = "./thanks.html"), 5000);
      }
    })
    .catch((error) => {
      alert(error);
    });
}
