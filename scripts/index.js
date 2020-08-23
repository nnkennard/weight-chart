const fuse = new Fuse(INGREDIENTS, {
  keys: [
    'ingredient',
  ]
});


function doSearch(){
  results = fuse.search(document.getElementById("ingredientName").value);
  if (results.length > 5) {
    alert("Please refine your search term")
  }
  results = results.slice(0, 5);
  tableBody = document.getElementById("searchTable");
  tableBody.innerHTML = "";
  for (result of results){
    console.log(result);
    tableBody.innerHTML += ```<tr> <td><a onClick="selectIngredient(""); return false;" href="fallback.html">" + result["item"]["ingredient"] + " </a></td></tr>```
  }

}

function selectIngredient(ingredient) {
  document.getElementById("selectedIngredient").innerHTML = ingredient
}

function build() {
  selectElement = document.getElementById("ingredientSelect");
  for (var idx = 0; idx < INGREDIENTS.length; idx++) {
    selectElement.innerHTML +=
      "<option value=" +
      idx +
      ">" +
      INGREDIENTS[idx]["ingredient"] +
      "</option>";
  }
  changeIngredient();
}

function changeIngredient() {
  ing = INGREDIENTS[document.getElementById("ingredientSelect").value];
  document.getElementById("volumeUnit").innerHTML = ing["unit"];
  document.getElementById("mulDiv_volumeUnit").innerHTML = ing["unit"];
  document.getElementById("volumeAmount").value = ing["volume"];
  document.getElementById("gAmount").value = ing["gm"];
  document.getElementById("ozAmount").value = ing["oz"];
  updateScaled();
}

function updateScaled() {
  mulDivSelector = document.getElementById("mulDivSelector").value;
  if (mulDivSelector == "mul") {
    scaleFactor = document.getElementById("mulDivAmount").value;
  } else {
    scaleFactor = 1.0 / document.getElementById("mulDivAmount").value;
  }
  document.getElementById("mulDiv_volumeAmount").innerHTML =
    scaleFactor * document.getElementById("volumeAmount").value;
  document.getElementById("mulDiv_gAmount").innerHTML =
    scaleFactor * document.getElementById("gAmount").value;
  document.getElementById("mulDiv_ozAmount").innerHTML =
    scaleFactor * document.getElementById("ozAmount").value;
}

function scale(current_amount, base_amount_old_format, base_amount_new_format) {
  return (current_amount * base_amount_new_format) / base_amount_old_format;
}

FORMATS = ["volume", "gm", "oz"];

function updateAmounts(baseAmount, typeIndex) {
  baseType = FORMATS[typeIndex];
  ing = INGREDIENTS[document.getElementById("ingredientSelect").value];

  document.getElementById("gAmount").value = scale(
    baseAmount,
    ing[baseType],
    ing["gm"]
  );
  document.getElementById("ozAmount").value = scale(
    baseAmount,
    ing[baseType],
    ing["oz"]
  );
  document.getElementById("volumeAmount").value = scale(
    baseAmount,
    ing[baseType],
    ing["volume"]
  );
  document.getElementById("volumeUnit").innerHTML = ing["unit"];
  updateScaled();
}

