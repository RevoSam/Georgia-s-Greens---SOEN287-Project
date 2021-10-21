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
    if (fieldValue <= 0) fieldValue = 1;
    textfield.value = fieldValue;
  }
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", changeQty);
}

let showMoreBtn = document.getElementsByClassName("show-more");

function showMoreDescription(e) {
  e.preventDefault();
  let showContent = document.getElementById("content-description");
  let linkText = this.innerHTML.toUpperCase();
  if (linkText === "SHOW MORE") {
    linkText = "Show Less";
    showContent.setAttribute("class", "showContent");
  } else {
    linkText = "Show More";
    showContent.setAttribute("class", "hideContent");
  }
  this.innerHTML = linkText;
}

for (var i = 0; i < showMoreBtn.length; i++) {
  showMoreBtn[i].addEventListener("click", showMoreDescription);
}

let addCart = document.getElementById("add2Cart");

function Product(id, item, price, qty) {
  this.id = id;
  this.item = item;
  this.price = parseFloat(price.replace("$", ""));
  this.qty = parseInt(qty);
}

function add_to_cart(e) {
  e.preventDefault();
  let id = document.getElementsByClassName("item_number")[0].innerHTML;
  let item = document.getElementsByClassName("item_description")[0].innerHTML;
  let price = document.getElementsByClassName("item_price")[0].innerHTML;
  let qty = document.getElementById("quantity-text").value;
  let product = new Product(id, item, price, qty);
  var jsonString = JSON.stringify(product);
  sessionStorage.setItem("cart", jsonString);
  get_cartStorage();
}

addCart.addEventListener("click", add_to_cart);

function get_cartStorage() {
  let cartObject = JSON.parse(sessionStorage.getItem("cart"));
  console.log(cartObject);
}
