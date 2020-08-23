import Fuse from 'fuse.js';

// console.log(Fuse);

INGREDIENTS = [
  { volume: 0, gm: 0, oz: 0, unit: "", ingredient: "Choose an ingredient..." },
  { volume: 1, gm: 116, oz: 4, unit: "cup", ingredient: "00' Pizza Flour" },
  {
    volume: 1,
    gm: 120, 
    oz: 4.25,
    unit: "cup",
    ingredient: "All-Purpose Flour"
  },
  { volume: 1, gm: 96, oz: 3.375, unit: "cup", ingredient: "Almond Flour" },
  { volume: 1, gm: 84, oz: 3, unit: "cup", ingredient: "Almond meal" }
];

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

