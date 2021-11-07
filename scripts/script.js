"use strict";

let buttons = document.getElementsByClassName("plus-minus-button");
var currentPageURL = window.location.pathname;
var currentPageID = currentPageURL.split("/").pop();
var products = new Array();
let addCart = document.getElementById("add2Cart");
let showMoreBtn = document.getElementsByClassName("show-more");

/** Script for Product Pages */

function changeProductQty() {
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
  updateProductExtendedTtl();
  //Using SessionStorage to store the value of the specific quantity count of the specific page using currentPageID
  sessionStorage.setItem(currentPageID + "quantity", textfield.value);
}

function updateProductExtendedTtl() {
  let quantity = sessionStorage.getItem(currentPageID + "quantity");
  try {
    document.getElementById("total").value =
      "$" +
      (
        parseFloat(
          document.getElementById("price").innerText.split("$").pop()
        ) * document.getElementById("quantity-text").value
      ).toFixed(2);
  } catch (error) {
    console.log(error);
  }
}

//Attaching the event "click" and the function "changeProductQty" to all plus and minus buttons in the product buttons.
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", changeProductQty);
}

window.addEventListener("load", loadProductQty);
/** End Script for Product Pages */
/** Script for Cart Pages */
window.addEventListener("load", loadProductsInCart);

function loadProductQty() {
  if (sessionStorage.getItem(currentPageID + "quantity") != null)
    document.getElementById("quantity-text").value = sessionStorage.getItem(
      currentPageID + "quantity"
    );

  updateProductExtendedTtl();
}

/*update price using cart buttons */

function changeCartQty(e) {
  var id;
  var anchor = e.target;
  if (e.target.getAttribute("id") != null) {
    id = anchor
      .getAttribute("id")
      .slice(0, anchor.getAttribute("id").length - 1);
    var index = parseInt(anchor.parentNode.parentNode.parentNode.rowIndex) - 1;
    var int_data = parseInt(document.getElementById(id + "_txt").value, 10);
    if (anchor.value == "+") {
      if (document.getElementById(id + "_txt").value == "") {
        document.getElementById(id + "_txt").value = 1;
        updateProductQtyCart(products[index].id, 1);
      } else {
        document.getElementById(id + "_txt").value = int_data + 1;
        updateProductQtyCart(products[index].id, int_data + 1);
      }
      getCartTotal(id + "_price", this.value);
    } else {
      if (document.getElementById(id + "_txt").value == "") {
        document.getElementById(id + "_txt").value = 0;
        updateProductQtyCart(products[index].id, 0);
      } else if (!checkOOB(int_data - 1)) {
        document.getElementById(id + "_txt").value = int_data - 1;
        updateProductQtyCart(products[index].id, int_data - 1);
        getCartTotal(id + "_price", this.value);
      }
    }
  }
}

function checkOOB(value) {
  if (value < 0) return true;
}

function getCartTotal(myString, sign) {
  var new_subtotal = parseFloat(document.getElementById("subtotal").innerHTML);

  if (sign == "+")
    new_subtotal =
      new_subtotal + parseFloat(document.getElementById(myString).innerHTML);
  else
    new_subtotal =
      new_subtotal - parseFloat(document.getElementById(myString).innerHTML);

  var GST = new_subtotal * 0.05;
  var QST = new_subtotal * 0.09975;

  document.getElementById("subtotal").innerHTML =
    parseFloat(new_subtotal).toFixed(2);
  document.getElementById("gst_total").innerHTML = parseFloat(GST).toFixed(2);
  document.getElementById("qst_total").innerHTML = parseFloat(QST).toFixed(2);
  document.getElementById("total").innerHTML = parseFloat(
    parseFloat(document.getElementById("subtotal").innerHTML) +
      parseFloat(document.getElementById("gst_total").innerHTML) +
      parseFloat(document.getElementById("qst_total").innerHTML)
  ).toFixed(2);
}

//Update price using the input box

function changeCartBox(e) {
  if (isNaN(this.value)) {
    alert("Only numbers are allowed");
    this.value = 0;
  } else if (this.value.indexOf(".") != -1) {
    alert("Cannot use decimal values");
    this.value = parseInt(this.value);
  }
  updateSummary();
}

//The function loads the appropriate values for the specific page from sessionStorage. Called when page is first loaded.

function loadProductsInCart() {
  loadProducts();
  updateSummary();
}

function updateSummary() {
  try {
    var table = document.getElementById("cartTable");
    var numberProducts = table.rows.length;
    if (numberProducts > 0) {
      var total = 0;
      for (var i = 1; i < numberProducts; i++) {
        let qty = table.rows[i].cells[2].children[0].children[1].value;
        products[i - 1].qty = qty;
        var jsonString = JSON.stringify(products);
        window.localStorage.setItem("products", jsonString);
        let price = table.rows[i].cells[3].children[0].innerText;
        total = total + qty * price;
      }

      document.getElementById("nbrItems").innerText = numberProducts - 1;
      document.getElementById("subtotal").innerHTML =
        parseFloat(total).toFixed(2);
      document.getElementById("gst_total").innerHTML = parseFloat(
        total * 0.05
      ).toFixed(2);
      document.getElementById("qst_total").innerHTML = parseFloat(
        total * 0.0975
      ).toFixed(2);
      document.getElementById("total").innerHTML = parseFloat(
        parseFloat(document.getElementById("subtotal").innerHTML) +
          parseFloat(document.getElementById("gst_total").innerHTML) +
          parseFloat(document.getElementById("qst_total").innerHTML)
      ).toFixed(2);
    } else document.getElementById("nbrItems").innerText = 0;
  } catch (error) {
    console.log(error);
  }
}

function loadProducts() {
  if (window.localStorage.getItem("products") != null) {
    products = new Array();
    var data = JSON.parse(window.localStorage.getItem("products"));
    for (var i = 0; i < data.length; i++) {
      products.push(data[i]);
    }
    loadCart();
  }
}

//window.onload = loadProductQty(); //On page load, call loadProductQty

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

if (addCart) {
  addCart.addEventListener("click", add_to_cart);
}

function Product(id, item, price, qty, img) {
  this.id = id;
  this.item = item;
  this.price = parseFloat(price.replace("$", ""));
  this.qty = parseInt(qty);
  this.img = img;
}

function add_to_cart(e) {
  e.preventDefault();
  let id = document.getElementsByClassName("item_number")[0].innerHTML;
  let item = document.getElementsByClassName("item_description")[0].innerHTML;
  let price = document.getElementsByClassName("item_price")[0].innerHTML;
  let qty = document.getElementById("quantity-text").value;
  let img = document.getElementById("productImg").src;
  let product = new Product(id, item, price, qty, img);
  var index = getProduct(id);
  if (index >= 0) {
    products[index].qty = parseInt(products[index].qty) + parseInt(product.qty);
  } else {
    products.push(product);
  }
  var jsonString = JSON.stringify(products);
  window.localStorage.setItem("products", jsonString);
}

function getProduct(id) {
  if (products.length > 0) {
    var index;
    for (var i = 0; i < products.length; i++) {
      if (id == products[i].id) {
        index = i;
      }
    }
    return index;
  } else return -1;
}

function updateProductQtyCart(id, value) {
  if (products.length > 0) {
    for (var i = 0; i < products.length; i++) {
      if (id == products[i].id) {
        products[i].qty = value;
        var jsonString = JSON.stringify(products);
        window.localStorage.setItem("products", jsonString);
      }
    }
  }
}

function loadCart() {
  try {
    let table = document.getElementById("cartTable");
    if (table != null) {
      if (window.localStorage.getItem("products") != null) {
        products = new Array();
        var data = JSON.parse(window.localStorage.getItem("products"));
        for (var i = 0; i < data.length; i++) {
          products.push(data[i]);
        }
      }
      if (products.length > 0) {
        table.style.visibility = "visible";
        document.getElementById("cart-title").innerText = "My Shopping Cart";
        var headerrow = document.createElement("tr");
        var headers = ["Products", "Quantity", "Price"];
        for (var i = 0; i < 3; i++) {
          var headercell = document.createElement("th");
          if (i == 0) headercell.setAttribute("colspan", "2");
          headercell.innerText = headers[i];
          headerrow.appendChild(headercell);
        }
        table.appendChild(headerrow);
        products.forEach(createElements);
      } else {
        table.style.visibility = "hidden";
        document.getElementById("cart-title").innerText = "The Cart is empty";
      }
    }
  } catch (error) {
    console.log(error);
  }
}

function createElements(element) {
  var product = new Object(element);
  var table = document.getElementById("cartTable");
  var newRow = document.createElement("tr");

  var cellimg = document.createElement("td");
  var imgproduct = document.createElement("img");
  imgproduct.src = product.img;
  imgproduct.setAttribute("class", "cart-item-image");
  cellimg.appendChild(imgproduct);

  var cellname = document.createElement("td");
  cellname.setAttribute("class", "cart-item-name");
  var name = document.createTextNode(product.item);
  cellname.appendChild(name);

  var cellqty = document.createElement("td");
  var divElement = document.createElement("div");
  divElement.setAttribute("class", "cart-item-quantity");
  var buttonElt = document.createElement("button");
  buttonElt.setAttribute("class", "cart-item-quantity-button");
  buttonElt.setAttribute("id", product.id + products.indexOf(element) + "-");
  buttonElt.value = "-";
  buttonElt.innerHTML = "-";
  buttonElt.addEventListener("click", changeCartQty);
  divElement.appendChild(buttonElt);

  var txtelt = document.createElement("input");
  /*id = "item2" class="cart-item-quantity-input"*/
  txtelt.setAttribute("class", "cart-item-quantity-input");
  txtelt.setAttribute("id", product.id + products.indexOf(element) + "_txt");
  txtelt.setAttribute("type", "text");
  txtelt.placeholder = 0;
  txtelt.setAttribute("maxLength", "3");
  txtelt.minLength = 1;
  txtelt.value = product.qty;
  txtelt.addEventListener("keyup", changeCartBox);
  divElement.appendChild(txtelt);

  var buttonElt = document.createElement("button");
  buttonElt.setAttribute("class", "cart-item-quantity-button");
  buttonElt.setAttribute("id", product.id + products.indexOf(element) + "+");
  buttonElt.value = "+";
  buttonElt.innerHTML = "+";
  buttonElt.addEventListener("click", changeCartQty);
  divElement.appendChild(buttonElt);
  cellqty.appendChild(divElement);

  var cellprice = document.createElement("td");
  var spanElt = document.createElement("span");
  spanElt.setAttribute("id", product.id + products.indexOf(element) + "_price");
  spanElt.innerHTML = product.price;
  cellprice.appendChild(spanElt);

  var celldelete = document.createElement("td");
  var spanElt = document.createElement("a");
  spanElt.setAttribute("class", "cart-item-delete");
  spanElt.setAttribute("id", products.indexOf(element));
  spanElt.innerHTML = "Delete";
  spanElt.addEventListener("click", deleteEntireRow);
  celldelete.appendChild(spanElt);

  newRow.appendChild(cellimg);
  newRow.appendChild(cellname);
  newRow.appendChild(cellqty);
  newRow.appendChild(cellprice);
  newRow.appendChild(celldelete);
  table.appendChild(newRow);
}

function deleteEntireRow(e) {
  try {
    var index = e.target.getAttribute("id");
    if (index > -1) {
      products.splice(index, 1);
      var jsonString = JSON.stringify(products);
      window.localStorage.setItem("products", jsonString);
    }
    document
      .getElementById("cartTable")
      .deleteRow(e.target.parentNode.parentNode.rowIndex);
    updateSummary();
  } catch (error) {
    console.log(error);
  }
}




/*TEST FOR BOX UPDATE TO DELETE IF CAUSE PROBLEMS*/
function updateExtendedTtl() {
  document.getElementById("total").value =
    (
      parseFloat(document.getElementById("price").innerText.split("$").pop()) *
      document.getElementById("quantity-text").value
    ).toFixed(2) + "$";
}

//Make it change on text input
function change_updateProductExtendedTtl() {
  if (isNaN(this.value)) {
    alert("Only numbers are allowed");
    this.value = 0;
  } else if (this.value.indexOf(".") != -1) {
    alert("Cannot use decimal values");
    this.value = parseInt(this.value);
  }
  updateExtendedTtl();
}

document.getElementById("quantity-text").addEventListener("keyup", change_updateProductExtendedTtl);
/*TEST FOR BOX UPDATE TO DELETE IF CAUSE PROBLEMS*/


/** End Script for Cart Pages */

/*Script for product pages*/
/*var plus_minus_button = document.getElementsByClassName("plus-minus-button");

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
function change_updateProductExtendedTtl() {
  if (isNaN(this.value)) this.value = 0;
  updateExtendedTtl();
}

document
  .getElementById("quantity-text")
  .addEventListener("keyup", change_updateProductExtendedTtl);

//Function for the Add more

/*let showMoreBtn = document.getElementsByClassName("show-more");

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

showMoreBtn[0].addEventListener("click", showMoreDescription);*/
/* End Script for product pages*/

/*
function getCartTotal(myString, sign) {
  console.log(myString);
  var new_subtotal = parseFloat(document.getElementById("subtotal").innerHTML);

  if (sign == "+")
    new_subtotal =
      new_subtotal +
      parseFloat(document.getElementById(myString + "_price").innerHTML);
  else
    new_subtotal =
      new_subtotal -
      parseFloat(document.getElementById(myString + "_price").innerHTML);

  var GST = new_subtotal * 0.05;
  var QST = new_subtotal * 0.09975;

  document.getElementById("subtotal").innerHTML =
    parseFloat(new_subtotal).toFixed(2);
  document.getElementById("gst_total").innerHTML = parseFloat(GST).toFixed(2);
  document.getElementById("qst_total").innerHTML = parseFloat(QST).toFixed(2);
  document.getElementById("total").innerHTML = parseFloat(
    parseFloat(document.getElementById("subtotal").innerHTML) +
      parseFloat(document.getElementById("gst_total").innerHTML) +
      parseFloat(document.getElementById("qst_total").innerHTML)
  ).toFixed(2);
}
*/

/*End of update price using cart buttons*/

/*function changeCartQty(e) {
  var myString;
  var anchor = e.target;
  if (e.target.getAttribute("id") != null) {
    myString = e.target.getAttribute("id");
  } else {
    myString = this.className.split(" ")[1].match(/item\d+/);
  }
  var int_data = parseInt(document.getElementById(myString).value, 10);

  if (anchor.value == "+") {
    if (document.getElementById(myString).value == "")
      document.getElementById(myString).value = 1;
    else document.getElementById(myString).value = int_data + 1;
    getCartTotal(myString, this.value);
  } else {
    if (document.getElementById(myString).value == "")
      document.getElementById(myString).value = 0;
    else if (!checkOOB(int_data - 1)) {
      document.getElementById(myString).value = int_data - 1;
      getCartTotal(myString, this.value);

    }
  }
}*/

/*
for (var i = 0; i < cartButtons.length; i++) {
  cartButtons[i].addEventListener("click", changeCartQty);
}
*/

/*
for (var i = 0; i < inputBoxes.length; i++) {
  inputBoxes[i].addEventListener("keyup", changeCartBox);
}
*/
//end of price update using input box
//Delete all stored quantities and values of this page from sessionStorage
/*window.onbeforeunload = function(){
  //deleteStorage();
}

function deleteStorage()
{
/*for (var quantityID in sessionStorage) {
    if (quantityID.indexOf(currentPageID) === 0)
      sessionStorage.removeItem(quantityID);
  }
  if (performance.navigation.type == performance.navigation.TYPE_RELOAD)
  window.alert('reaches deleteStorage');
  sessionStorage.removeItem(currentPageID+'quantity');
  
}*/

/*function deleteProducts() {
  window.localStorage.removeItem("products");
}*/
