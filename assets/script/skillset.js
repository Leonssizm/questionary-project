//adding programming language
const addLanguageButton = document.getElementById("addLanguageBtn");
const skillsetTemplate = document.getElementById("skillsetTemplate");
const skillsetOptionsTable = document.getElementById("skillset");
const experienceInYears = document.getElementById("experienceInYears");
const listOfSkills = document.getElementById("listOfSkills");
const templateWrapper = document.getElementById("template-wrapper");

addLanguageButton.addEventListener("click", () => {
  addLanguageAndExperience();
  removeSkill();
});

function addLanguageAndExperience() {
  let clonedListInfo = skillsetTemplate.content.cloneNode(true);
  clonedListInfo.getElementById("programmingLanguage").innerText =
    skillsetOptionsTable.value;
  clonedListInfo.getElementById("yearsOfExperience").innerText =
    experienceInYears.value;

  let listId = clonedListInfo.querySelector("#template");

  if (skillsetOptionsTable.value === "" || experienceInYears.value === "") {
    alert("Please provide the information");
  } else {
    listOfSkills.appendChild(clonedListInfo);
  }
}

function removeSkill() {
  const removeBtn = document.getElementById("removeSkill");
  const listitemWrapper = document.getElementById("listItem-wrapper");
  removeBtn.addEventListener("click", () => {
    listOfSkills.removeChild(listitemWrapper);
  });
}
