//making a collapsible list

document.querySelectorAll(".accordion-btn").forEach((button) => {
  button.addEventListener("click", () => {
    let accordionContent = button.nextElementSibling;
    button.classList.toggle("accordion-btn-active");
    if (button.classList.contains("accordion-btn-active")) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    } else {
      accordionContent.style.maxHeight = 0;
    }
  });
});

//fetching data from the API
let submittedAppsBtn = document.getElementById("submittedApps");
submittedAppsBtn.addEventListener("click", () => {
  fetch(
    "https://bootcamp-2022.devtest.ge/api/applications?token=b3fdeb04-8ed1-4544-93ff-8cf46471498c"
  )
    .then((response) => response.json())
    .then((data) => console.log(data));
});
