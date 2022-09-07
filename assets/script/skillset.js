//Fetching data for skills
const addLanguageButton = document.getElementById("addLanguageBtn");
const skillsetTemplate = document.getElementById("skillsetTemplate");
const skillsetOptionsTable = document.getElementById("skillset");
const experienceInYears = document.getElementById("experienceInYears");
const listOfSkills = document.getElementById("listOfSkills");
const selectedSkills = [];
let skills = [];
let skillNames = [];

fetch("https://bootcamp-2022.devtest.ge/api/skills")
  .then((response) => response.json())
  .then((data) => {
    skills = data;
    let skillOptions;
    data.forEach((element) => {
      skillOptions += `<option value=${element.title} id=${element.id}>${element.title}</option>`;
      skillNames.push(element.title);
    });
    skillsetOptionsTable.innerHTML = skillOptions;
  })
  .catch((error) => {
    alert(error);
  });

//fetching skills data From API
let skillsFromApi = [];
fetch("https://bootcamp-2022.devtest.ge/api/skills")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((skillAndId) => {
      skillsFromApi.push(skillAndId);
    });

    if (localStorage.getItem("skillset-information") !== null) {
      //prepare experience data
      let skillsFromLocalStorage = JSON.parse(
        localStorage.getItem("skillset-information")
      );

      //prepare skill name data UNDER CONSTRUCTION
      skillsFromLocalStorage.forEach((skillAndExperience) => {
        let clonedListInfo = skillsetTemplate.content.cloneNode(true);

        clonedListInfo.getElementById("yearsOfExperience").innerHTML =
          skillAndExperience.experience + " Years Of Experience";
        clonedListInfo.getElementById("programmingLanguage").innerText =
          getSkill(skillAndExperience.id).title;

        clonedListInfo.getElementById("removeSkill").onclick = () => {
          document
            .getElementById("listOfSkills")
            .removeChild(document.getElementById("skill-id"));
        };

        listOfSkills.appendChild(clonedListInfo);
      });
    }
  });

//function to get skill titles

function getSkill(id) {
  return skillsFromApi.find((skill) => skill.id === id);
}

addLanguageButton.addEventListener("click", addSkill);

function addSkill() {
  const skillName = skillsetOptionsTable.value;
  const skillId = "skill-" + skillName;
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

  // making experience value in years(data-type:integer) only for skills object
  let experience = experienceInYears.value.split(" ");
  let experienceInYearsInteger = experience.splice(0, 1).join(" ");

  //retrieving skill by name
  const skillToAdd = skills.find((skill) => skill.title === skillName);

  //Validation & storing info in local storage
  let nextPage = document.getElementById("nextPage");
  nextPage.addEventListener("click", () => {
    selectedSkills.push({
      id: skillToAdd.id,
      experience: parseInt(experienceInYearsInteger),
    });
    window.localStorage.setItem(
      "skillset-information",
      JSON.stringify(selectedSkills)
    );

    window.location.href = "./covid.html";
  });
}
