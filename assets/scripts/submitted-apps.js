//making a collapsible list

const accordion = document.getElementsByClassName("contentBox");
const accordionLabel = document.getElementsByClassName("label");
setTimeout(function () {
  for (let i = 0; i < accordionLabel.length; i++) {
    accordionLabel[i].addEventListener("click", () => {
      accordion[i].classList.toggle("active");
    });
  }
}, 3000);

//fetching skills data From API
let skillsFromApi = [];

fetch("https://bootcamp-2022.devtest.ge/api/skills")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((skillAndId) => {
      skillsFromApi.push(skillAndId);
    });
  });

//function to get skill titles

function getSkillTitle(id) {
  return skillsFromApi.find((skill) => {
    if (skill.id === id) {
      return skill.title;
    }
  });
}

fetch(
  "https://bootcamp-2022.devtest.ge/api/applications?token=" +
    localStorage.getItem("token")
)
  .then((response) => response.json())
  .then((data) => {
    let formData = "";
    let workPreferenceData = "";
    let covidData = "";
    let vaccinationData = "";

    let insightsData = "";

    data.forEach((form, index) => {
      let skillsData = "";
      //handle work preference dynamic data
      if (form.work_preference === "from_office") {
        workPreferenceData = `
      <div class="work-preference-info">
        <h4 class="question-header">How Would You Prefer to Work?</h4>
        <p> &#10686; From Sairme Office</p>
        <p>&#9711; From Home</p>
        <p>&#9711; Hybrid</p>
      </div>`;
      } else if (form.work_preference === "from_home") {
        workPreferenceData = `
        <div class="work-preference-info">
        <h4 class="question-header">How Would You Prefer to Work?</h4>
        <p>&#9711; From Sairme Office</p>
        <p>&#10686; From Home</p>
        <p>&#9711; Hybrid</p>
      </div>`;
      } else if (form.work_preference === "hybrid") {
        workPreferenceData = `
        <div class="work-preference-info">
        <h4 class="question-header">How Would You Prefer to Work?</h4>
        <p>&#9711; From Sairme Office</p>
        <p>&#9711; From Home</p>
        <p>&#10686; Hybrid</p>
      </div>`;
      }
      //handle covid form dynamic data
      if (form.had_covid) {
        covidData = `
        <h4 class="covid-question-header">Did you have covid 19?</h4>
        <div class = "covid-question">
        <p>&#10686; Yes</p>
        <p>&#9711; No</p>
        <p class="sub-questions">When did you have covid?</p>
        <p id="covid-contact-vaccination-date">${form.had_covid_at} <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 7H17M13 1V3M5 1V3M2 3H16C16.5523 3 17 3.44772 17 4V18C17 18.5523 16.5523 19 16 19H2C1.44772 19 1 18.5523 1 18V4C1 3.44772 1.44772 3 2 3ZM13 15H13.002V15.002H13V15ZM9 15H9.002V15.002H9V15ZM5 15H5.002V15.002H5V15ZM13 11H13.002V11.002H13V11ZM9 11H9.002V11.002H9V11ZM5 11H5.002V11.002H5V11Z" stroke="#FE3B1F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </p>
        </div>`;
      } else {
        covidData = `
        <h4 class="covid-question-header">Did you have covid 19?</h4>
        <div class = "covid-question">
        <p>&#9711; Yes</p>
        <p>&#10686; No</p>
        </div>`;
      }
      // handle Vaccination dynamic data

      if (form.vaccinated) {
        vaccinationData = `
        <h4 class="vaccine-question-header">Have You been Vaccinated?</h4>
        <div class="vaccination-question">
        <p>&#10686; Yes</p>
        <p>&#9711; No</p>
        <p class="sub-questions">When did you have covid Vaccine?</p>
        <p id="covid-contact-vaccination-date">${form.vaccinated_at} <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 7H17M13 1V3M5 1V3M2 3H16C16.5523 3 17 3.44772 17 4V18C17 18.5523 16.5523 19 16 19H2C1.44772 19 1 18.5523 1 18V4C1 3.44772 1.44772 3 2 3ZM13 15H13.002V15.002H13V15ZM9 15H9.002V15.002H9V15ZM5 15H5.002V15.002H5V15ZM13 11H13.002V11.002H13V11ZM9 11H9.002V11.002H9V11ZM5 11H5.002V11.002H5V11Z" stroke="#FE3B1F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </p>
        </div>
        `;
      } else {
        vaccinationData = `
        <h4 class="vaccine-question-header">Have You been Vaccinated?</h4>
        <div class="vaccination-question">
        <p>&#9711; Yes</p>
        <p>&#10686; No</p>
        </div>
        `;
      }

      // handle skillset dynamic data
      form.skills.forEach((skill) => {
        const skillIdAndTitle = getSkillTitle(skill.id);

        skillsData += `
        <div class ="skills-info">
        <p><span class="skill-title">${skillIdAndTitle.title}</span> Years of Experience ${skill.experience}</p>
        </div>
        `;
      });

      //handle insights & devtalk Dynamic data
      if (form.will_organize_devtalk) {
        insightsData = `
        <h4 class="devtalk-question-header">Would you attend Devtalks and maybe also <br> organize your own?</h4>
        <div class="devtalk-question">
        <p>&#10686; Yes</p>
        <p>&#9711; No</p>
        </div>
        <h4 class ="devtalk-question-header"> What would you speak about at Devtalk?</h4>
        <p class="devtalk-specials-box">${form.devtalk_topic}</p>
        `;
      } else {
        insightsData = `
        <h4 class="devtalk-question-header">Would you attend Devtalks and maybe also <br> organize your own?</h4>
        <div class="devtalk-question">
        <p> &#9711; Yes</p>
        <p>&#10686; No</p>
        </div>
        
        `;
      }

      formData += `
<div class="contentBox">
      <div class="label">${index + 1}</div>
  <div class = "content">

      <div class="skillset-insights-right">
        <h3 class="info-header">skillset</h3>
      ${skillsData}
        <h3 class="info-header">Insights</h3>
      ${insightsData}
      <h4 class="devtalk-question-header">Tell Us Something Special</h4>
      <p class="devtalk-specials-box">${form.something_special}</p>
      </div>
      
      <h3 class="info-header">Personal Information</h3>
      
        <div class="fetched-personal-info">
          <div class="fetched-info-names">
          <p> <strong>First Name</strong> ${form.first_name}</p>
          <p><strong>Last-name</strong> ${form.last_name}</p>
          <p><strong>email</strong> ${form.email}</p>
          <p><strong>Phone</strong> ${form.phone}</p>
          </div>
        </div>

        <!--Covid Situation-->
        <h3 class="info-header">Covid situation</h3>
        ${workPreferenceData}
        ${covidData}
        ${vaccinationData}

     
  </div>
</div>`;
    });
    document.getElementById("accordion").innerHTML = formData;
  });
