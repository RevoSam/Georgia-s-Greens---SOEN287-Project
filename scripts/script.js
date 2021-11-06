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
  // stores input into local storage ; Salman
  // localStorage.setItem('quantity', textfield.value);
}

for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", changeQty);
}

// Session Storage
// Meant to retrieve value from local storage but not replacing value in box ; Salman
/*
function getQty()
{
  document.getElementById("quantity-text").value = localStorage.getItem('quantity');
}

window.onload = getQty();

*/
//

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

/*
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
document.write("HELLO");

function get_cartStorage() {
  let cartObject = JSON.parse(sessionStorage.getItem("cart"));
  console.log(cartObject);
}*/


/* SHOPPING CART */


//buttons
let cartButtons = document.getElementsByClassName("cart-item-quantity-button");

//using the buttons
function changeCartQty(e) {

  var myString = this.className.split(" ")[1].match(/item\d+/);
  var int_data = parseInt(document.getElementById(myString).value,10);

  if(this.value == "+")
  {
    if(document.getElementById(myString).value == "")
      document.getElementById(myString).value = 1;
    else
      document.getElementById(myString).value = int_data + 1;
      getCartTotal(myString,this.value);
  }
  else
  {
    if(document.getElementById(myString).value == "")
      document.getElementById(myString).value = 0;

    else if(!checkOOB(int_data-1))
    {
      document.getElementById(myString).value = int_data - 1;
      getCartTotal(myString,this.value);
    }
  }
}

function checkOOB(value) {
  if(value < 0)
      return true;
}

for (var i = 0; i < cartButtons.length; i++) {
  cartButtons[i].addEventListener("click", changeCartQty);
}

function getCartTotal(myString,sign)
{
  var new_subtotal = parseFloat(document.getElementById("subtotal").innerHTML);
  
  if(sign == "+")
      new_subtotal = new_subtotal + parseFloat(document.getElementById(myString+"_price").innerHTML);
  else
      new_subtotal = new_subtotal - parseFloat(document.getElementById(myString+"_price").innerHTML);
  
  var GST = new_subtotal * 0.05;
  var QST = new_subtotal * 0.09975;
  
  document.getElementById("subtotal").innerHTML = parseFloat(new_subtotal).toFixed(2);
  document.getElementById("gst_total").innerHTML = parseFloat(GST).toFixed(2);
  document.getElementById("qst_total").innerHTML = parseFloat(QST).toFixed(2);
  document.getElementById("total").innerHTML = parseFloat(parseFloat(document.getElementById("subtotal").innerHTML) + parseFloat(document.getElementById("gst_total").innerHTML) + parseFloat(document.getElementById("qst_total").innerHTML)).toFixed(2);
}



//using the textbox

var inputBoxes = document.getElementsByClassName("cart-item-quantity-input");

function changeCartBox() {
  if(isNaN(this.value))
  {
    alert("Only numbers are allowed")
    this.value = 0;
  }
  else if(this.value.indexOf(".")!= -1)
  {
    alert("Cannot use decimal values");
    this.value = parseInt(this.value);
  }
  var total = 0;
  for(var i = 0; i < inputBoxes.length; i++)
    total += inputBoxes[i].value * parseFloat(document.getElementById("item" + (i+1) + "_price").innerHTML);
  document.getElementById("subtotal").innerHTML = parseFloat(total).toFixed(2);
  document.getElementById("gst_total").innerHTML = parseFloat(total*0.05).toFixed(2);
  document.getElementById("qst_total").innerHTML = parseFloat(total*0.0975).toFixed(2);
  document.getElementById("total").innerHTML = parseFloat(parseFloat(document.getElementById("subtotal").innerHTML) + parseFloat(document.getElementById("gst_total").innerHTML) + parseFloat(document.getElementById("qst_total").innerHTML)).toFixed(2);
}

for(var i = 0; i < inputBoxes.length; i++)
{
  inputBoxes[i].addEventListener("keyup",changeCartBox)
}





