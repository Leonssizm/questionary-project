//Fetching data for skills
const addLanguageButton = document.getElementById("addLanguageBtn");
const skillsetTemplate = document.getElementById("skillsetTemplate");
const skillsetOptionsTable = document.getElementById("skillset");
const experienceInYears = document.getElementById("experienceInYears");
const listOfSkills = document.getElementById("listOfSkills");

fetch("https://bootcamp-2022.devtest.ge/api/skills")
  .then((response) => response.json())
  .then((data) => {
    let fetchedData;

    data.forEach((element) => {
      fetchedData += `<option value=${element.title} id=${element.id}>${element.title}</option>`;
    });
    skillsetOptionsTable.innerHTML = fetchedData;
  })
  .catch((error) => {
    alert(error);
  });

addLanguageButton.addEventListener("click", () => {
  addSkill();
  removeSkill();
});

function addSkill() {
  let clonedListInfo = skillsetTemplate.content.cloneNode(true);
  clonedListInfo.getElementById("programmingLanguage").innerText =
    skillsetOptionsTable.value;
  clonedListInfo.getElementById("yearsOfExperience").innerText =
    experienceInYears.value;

  if (skillsetOptionsTable.value === "" || experienceInYears.value === "") {
    alert("Please provide the information");
  } else {
    listOfSkills.appendChild(clonedListInfo);
  }
}

// Back to the previous page Btn

const previousPageBtn = document.getElementById("previousPage");
previousPageBtn.addEventListener("click", () => {
  window.location.href = "./coordinates.html";
});
