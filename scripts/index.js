$(document).ready(function() {
    for (var i = 1; i <= 20; i++) {

        for (ingredient_obj of INGREDIENTS) {
            var opt = document.createElement('option');
            opt.value = ingredient_obj["ingredient"];
            opt.innerHTML = ingredient_obj["ingredient"];
            document.getElementById('ingredient_select_' + i).appendChild(opt);
        }
        $('#ingredient_select_' + i).selectize(
                {
                    onDropdownClose: function(dropdown) {
                        ingredientChange(dropdown.parent().parent());
                }
            }

        )
    }
});

console.log(INGREDIENTS)

function ingredientChange(dropdown) {
    console.log("bababab")
    console.log(dropdown)
    alert("Change in element " + dropdown.firstChild.id);
    // Enable the other changes
    // If everything is valid, calculate
}

function amountOrUnitChange(element) {
    // Assert ingredient is set

    // Get details of ingredient

    final_amount = final_unit * recipe_amount / recipe_unit * multiply_amount / divide_amount;
    // Set final amount

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


function updateMain(enteredValue, enteredFormat) {

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