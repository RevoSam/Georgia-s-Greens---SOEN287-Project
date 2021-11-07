"use strict";
/*
window.addEventListener("load", loadCart);

function loadCart() {
  if (localStorage.getItem("products") != null) {
    console.log("loaded");
    products = new Array();
    var data = JSON.parse(sessionStorage.getItem("products"));
    for (var i = 0; i < data.length; i++) {
      products.push(data[i]);
    }
  }
  var table = document.getElementById("cartTable");
  for (var i = 0; i < products.length; i++) {
    var product = new Object(Product);
    product = products[i];
    var newRow = document.createElement("tr");

    var cellimg = document.createElement("td");
    var imgproduct = document.createElement("img");
    imgproduct.src = product.getimgsource;
    imgproduct.setAttribute("class", "cart-item-image");
    cellimg.appendChild(imgproduct);

    var cellname = document.createElement("td");
    cellname.setAttribute("class", "cart-item-name");
    var name = document.createTextNode(product.getItem);
    cellname.appendChild(name);

    var cellqty = document.createElement("td");
    var divElement = document.createElement("div");
    divElement.setAttribute("class", "cart-item-quantity");
    var buttonElt = document.createElement("button");
    buttonElt.setAttribute("class", "cart-item-quantity-button item2_button");
    buttonElt.value = "-";
    buttonElt.innerHTML = "-";
    divElement.appendChild(buttonElt);
    var txtelt = document.createElement("input");
    txtelt.type = "text";
    txtelt.placeholder = 0;
    txtelt.value = product.getQty;
    divElement.appendChild(txtelt);
    var buttonElt = document.createElement("button");
    buttonElt.setAttribute("class", "cart-item-quantity-button item2_button");
    buttonElt.value = "+";
    buttonElt.innerHTML = "+";
    divElement.appendChild(buttonElt);
    cellqty.appendChild(divElement);

    var cellprice = document.createElement("td");
    var spanElt = document.createElement("span");
    spanElt.setAttribute("id", "item2_price");
    spanElt.innerHTML = product.getPrice;
    cellprice.appendChild(spanElt);

    var celldelete = document.createElement("td");
    var spanElt = document.createElement("span");
    spanElt.setAttribute("class", "cart-item-delete");
    spanElt.innerHTML = "Delete";
    celldelete.appendChild(spanElt);

    newRow.appendChild(cellimg);
    newRow.appendChild(cellname);
    newRow.appendChild(cellqty);
    newRow.appendChild(cellprice);
    newRow.appendChild(celldelete);
    table.appendChild(newRow);
  }
}
*/
