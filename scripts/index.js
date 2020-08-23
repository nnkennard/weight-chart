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
    index = result["item"]["idx"];
    name = result["item"]['ingredient'];
    input = '<tr> <td><a onClick="selectIngredient(' + index +'); return false;"> '+ name +' </a></td></tr>';
    tableBody.innerHTML += input;
  }

}

function selectIngredient(index) {
  CURRENT_INGREDIENT = INGREDIENTS[index];
  document.getElementById("selectedIngredient").innerHTML = CURRENT_INGREDIENT["ingredient"];
  document.getElementById("volumeUnit").innerHTML = CURRENT_INGREDIENT["unit"];
  document.getElementById("volumeAmount").value = CURRENT_INGREDIENT["volume"];
  document.getElementById("gAmount").value = CURRENT_INGREDIENT["gm"];
  document.getElementById("ozAmount").value = CURRENT_INGREDIENT["oz"];
  updateScaled();
}

FORMATS = ["volume", "gm", "oz"];

CURRENT_INGREDIENT = null;


function updateMain(enteredValue , enteredFormat){

  baseType = FORMATS[enteredFormat];

  document.getElementById("gAmount").value = scale(
    enteredValue,
    CURRENT_INGREDIENT[baseType],
    CURRENT_INGREDIENT["gm"]
  );
  document.getElementById("ozAmount").value = scale(
    enteredValue,
    CURRENT_INGREDIENT[baseType],
    CURRENT_INGREDIENT["oz"]
  );
  document.getElementById("volumeAmount").value = scale(
    enteredValue,
    CURRENT_INGREDIENT[baseType],
    CURRENT_INGREDIENT["volume"]
  );
  document.getElementById("volumeUnit").innerHTML = CURRENT_INGREDIENT["unit"];

  updateScaled();
  
}


function updateScaled() {
  mulDivSelector = document.getElementById("mulDivSelector").value;
  if (mulDivSelector == "mul") {
    scaleFactor = document.getElementById("mulDivAmount").value;
  } else {
    scaleFactor = 1.0 / document.getElementById("mulDivAmount").value;
  }
  document.getElementById("mulDiv_volumeUnit").innerHTML = document.getElementById("volumeUnit").innerHTML;
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
