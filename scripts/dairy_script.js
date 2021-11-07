/*Script for product pages*/
/*
var plus_minus_button = document.getElementsByClassName("plus-minus-button");

function updateQuantity() {
  var int_data = parseInt(document.getElementById("quantity-text").value, 10);

  if (this.value == "+")
    if (document.getElementById("quantity-text").value == "")
      document.getElementById("quantity-text").value = 1;
    else document.getElementById("quantity-text").value = int_data + 1;
  else {
    if (!checkOOB(document.getElementById("quantity-text").value - 1))
      document.getElementById("quantity-text").value = int_data - 1;
  }
  updateExtendedTtl();
}

function checkOOB(value) {
  if (value < 0) return true;
}

function updateExtendedTtl() {
  document.getElementById("total").value =
    (
      parseFloat(document.getElementById("price").innerText) *
      document.getElementById("quantity-text").value
    ).toFixed(2) + "$";
}

//EventListener
for (var i = 0; i < plus_minus_button.length; i++) {
  plus_minus_button[i].addEventListener("click", updateQuantity);
}

//Make it change on text input
function change_updatePrice() {
  if (isNaN(this.value)) this.value = 0;
  updateExtendedTtl();
}

document
  .getElementById("quantity-text")
  .addEventListener("keyup", change_updatePrice);

//Function for the Add more

let showMoreBtn = document.getElementsByClassName("show-more");

function showMoreDescription(e) {
  //want the function to give show less
  if (this.innerText == "Show More") {
    this.innerText = "Show Less";
    document.getElementById("content-description").style.display = "block";
    document.getElementById("content-description").style.height = "150px";
  } else {
    this.innerText = "Show More";
    document.getElementById("content-description").style.display = "none";
  }
}

showMoreBtn[0].addEventListener("click", showMoreDescription);
*/
/* End Script for product pages*/
