$(document).ready(function() {
    for (var i = 1; i <= 20; i++) {

        for (var baba in INGREDIENTS) {
            ingredient_obj = INGREDIENTS[baba]
            var opt = document.createElement('option');
            opt.value = ingredient_obj["ingredient"];
            opt.innerHTML = ingredient_obj["ingredient"];
            document.getElementById('ingredient_select_' + i).appendChild(opt);
        }
        $('#ingredient_select_' + i).selectize(
                {
			placeholder:"Select an ingredient...",
                    onDropdownClose: function(dropdown) {
                        ingredientChange(dropdown);
                }
            }

        )
    }
});

CURRENT_INGREDIENTS = Array(21).fill("")

function getIndexFromId(element_id){
	bits = element_id.split("_")
	return bits[bits.length - 1]
}

function setDropdownOptions(dropdown_element, volume_unit){

        dropdown_element.remove(3);
        var opt = document.createElement('option');
        opt.value = volume_unit;
        opt.innerHTML = volume_unit;
        dropdown_element.appendChild(opt);

    }

function ingredientChange(dropdown) {
    ingredient_select_id = dropdown[0].parentNode.parentNode.childNodes[1].id
    ingredient = ""
    for (child of dropdown[0].firstChild.childNodes){
        if(child.className == 'option selected'){
            ingredient = child.getAttribute('data-value')
            // console.log(ingredient, ingredient_select_id)
            index = getIndexFromId(ingredient_select_id)

            if(ingredient == ""){
                alert("something is wrong, talk to Neha")
            } else {
                for (dropdown_id_prefix of ["in_unit_select_", "out_unit_select_"]){
                    document.getElementById( dropdown_id_prefix + index).removeAttribute('disabled')
                    setDropdownOptions(document.getElementById( dropdown_id_prefix + index), INGREDIENTS[ingredient]["unit"])
                }
                document.getElementById("in_amount_" + index).removeAttribute('disabled')
                CURRENT_INGREDIENTS[parseInt(index)] = ingredient
            }
        }
    }

    
}

SIMPLE_UNITS = ["gm", "oz"]

//{volume: 1, gm: 259, oz: 9.125, unit: "cups", ingredient: "Almond paste (packed)"}

function getUnitTypeFromDropdown(in_or_out, index){

    unit = $("#" + in_or_out + "_unit_select_" + index + " :selected").text()
    if (!(SIMPLE_UNITS.includes(unit))){
        unit = 'volume'
    }
    return unit
}


function getUnitScaler(index){
    ingredient_info = INGREDIENTS[CURRENT_INGREDIENTS[index]]
    in_unit = getUnitTypeFromDropdown("in", index)
    out_unit = getUnitTypeFromDropdown("out", index)
    return ingredient_info[out_unit]/ingredient_info[in_unit]
}


function amountOrUnitChangeByIndex(index){
    // Get details of ingredient
    unit_scaler = getUnitScaler(index);

    console.log(document.getElementById("multiply").value)

    final_amount = parseFloat(
        document.getElementById("in_amount_" + index).value) * unit_scaler * parseInt(
        document.getElementById("multiply").value) / parseInt(
        document.getElementById("divide").value)
    document.getElementById("out_amount_" + index).innerHTML = final_amount


}

function amountOrUnitChange(element) {
    amountOrUnitChangeByIndex(getIndexFromId(element.id))
}

function scaleChange() {
	// Call amountOrUnitChange on each valid row
    for(i in CURRENT_INGREDIENTS){
        if(CURRENT_INGREDIENTS[i] == ""){
            continue
        } else {
            amountOrUnitChangeByIndex(i)
        }
    }
}




