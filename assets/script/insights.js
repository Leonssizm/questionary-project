//devtalk topic input
let devtalkField = document.getElementById("devtalk-field");
devtalkField.style.display = "none";
function displayDevtalkForm(answer) {
  if (answer == `yes`) {
    devtalkField.style.display = "block";
  } else {
    devtalkField.style.display = "none";
  }
}
