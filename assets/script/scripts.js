let coordinatesInLocalStorage = localStorage.getItem("personal-coordinates");
let skillsetInLocalStorage = localStorage.getItem("skillset-information");
let covidInLocalStorage = localStorage.getItem("covid");
let insightsInLocalStorage = localStorage.getItem("insights");

//Handle token, landing page and ending questionary

function handleStartQuestionary() {
  if (
    coordinatesInLocalStorage !== null ||
    skillsetInLocalStorage !== null ||
    covidInLocalStorage !== null ||
    insightsInLocalStorage !== null
  ) {
    window.localStorage.clear();
  }

  window.location.href = "./coordinates.html";
}

function handleSubmitButton() {
  window.location.href = "./index.html";
}

localStorage.setItem("token", "b3fdeb04-8ed1-4544-93ff-8cf46471498c");
