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
});

function addSkill() {
  const skillId = "skill-" + skillsetOptionsTable.value;
  if (!document.getElementById(skillId)) {
    let clonedListInfo = skillsetTemplate.content.cloneNode(true);
    clonedListInfo.getElementById("programmingLanguage").innerText =
      skillsetOptionsTable.value;
    clonedListInfo.getElementById("yearsOfExperience").innerText =
      experienceInYears.value;

    clonedListInfo.getElementById("skill-id").id = skillId;
    clonedListInfo.getElementById("removeSkill").onclick = () => {
      document
        .getElementById("listOfSkills")
        .removeChild(document.getElementById(skillId));
    };
    if (skillsetOptionsTable.value === "" || experienceInYears.value === "") {
      alert("Please provide the information");
    } else {
      listOfSkills.appendChild(clonedListInfo);
    }
  } else {
    return;
  }

  //Validation & storing info in local storage
  let nextPage = document.getElementById("nextPage");
  nextPage.addEventListener("click", () => {
    const skillsetData = [
      (skills = {
        id: skillId,
        experience: experienceInYears.value,
      }),
    ];

    window.localStorage.setItem(
      "skillset-information",
      JSON.stringify(skillsetData)
    );
    window.location.href = "./covid.html";
  });
}

// Back to the previous page Btn

const previousPageBtn = document.getElementById("previousPage");
previousPageBtn.addEventListener("click", () => {
  window.location.href = "./coordinates.html";
});
