"use strict";

let buttons = document.getElementsByClassName("plus-minus-button");

function changeQty(e) {
  var valueButton = this.getAttribute("value");
  let textfield = document.getElementById("quantity-text");
  let value = parseInt(textfield.value, 10);
  if (!Number.isInteger(value)) value = 0;
  let fieldValue = value;
  if (valueButton == "+") {
    fieldValue = fieldValue + 1;
    textfield.value = fieldValue;
  } else {
    fieldValue = fieldValue - 1;
    if (fieldValue < 0) fieldValue = 0;
    textfield.value = fieldValue;
  }
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", changeQty);
}
