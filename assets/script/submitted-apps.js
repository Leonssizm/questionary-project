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

//fetch data
