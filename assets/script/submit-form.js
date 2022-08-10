// get data from local storage

let coordinatesFromLocalStorage = localStorage.getItem("personal-coordinates");
let tokenFromLocalStorage = localStorage.getItem("token:");
let skillsFromLocalStorage = localStorage.getItem("skillset-information");
let covidInfo = localStorage.getItem("covid");
//parsing local storage data
let coordinates = JSON.parse(coordinatesFromLocalStorage);
let token = JSON.parse(tokenFromLocalStorage);
let skills = JSON.parse(skillsFromLocalStorage);
let covidAndWork = JSON.parse(covidInfo);

let submitBtn = document.getElementById("submitButton");
submitBtn.addEventListener("click", submitData);
const body = {
  token: token,
  first_name: coordinates.first_name,
  last_name: coordinates.last_name,
  email: coordinates.email,
  phone: coordinates.phone,
  skills: [
    {
      id: skills.id,
      experience: skills.experience,
    },
  ],
};

function submitData() {
  fetch("https://bootcamp-2022.devtest.ge/api/application", {
    method: "POST",
    mode: "no-cors",
    body: JSON.stringify({ body }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    // .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => {
      alert(error);
    });
}

//Checking the data sent to server

// fetch(
//   "https://bootcamp-2022.devtest.ge/api/applications?token=16e71880-4860-4f4e-abe6-a93d7629eef5"
// )
//   .then((response) => {
//     response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
