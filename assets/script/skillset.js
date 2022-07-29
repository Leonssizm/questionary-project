//adding programming language
const addLanguageButton = document.getElementById("addLanguageBtn");
const skillsetTemplate = document.getElementById("skillsetTemplate");
const skillsetOptionsTable = document.getElementById("skillset");
const experienceInYears = document.getElementById("experienceInYears");
const listOfSkills = document.getElementById("listOfSkills");

addLanguageButton.addEventListener("click", () => {
  addingLanguageAndExperience();
});

function addingLanguageAndExperience() {
  let clonedListInfo = skillsetTemplate.content.cloneNode(true);
  clonedListInfo.querySelector("h4").innerText = skillsetOptionsTable.value;
  clonedListInfo.querySelector("p").innerText = experienceInYears.value;

  if (skillsetOptionsTable.value === "" || experienceInYears.value === "") {
    alert("Please provide the correct information");
  } else {
    listOfSkills.appendChild(clonedListInfo);
  }
}
