//making a collapsible list

const list = document.getElementsByClassName("collapsable-content-table");

for (let i = 0; i < list.length; i++) {
  list[i].addEventListener("click", () => {
    this.classList.toggle("active");
    let content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display === "none";
    } else {
      content.style.display === "none";
    }
  });
}
