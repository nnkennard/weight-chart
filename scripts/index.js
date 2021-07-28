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
			placeholder:"Select an ingredient...",
                    onDropdownClose: function(dropdown) {
                        ingredientChange(dropdown);
                }
            }

        )
    }
});

function getIndexFromId(element_id){
	bits = element_id.split("_")
	return bits[bits.length - 1]
}


function enableRow(row_index, ingredient){
	// Enable buttons
	// Set unit dropdowns
}


function ingredientChange(dropdown) {
    for (a in INGREDIENTS){
        console.log(a)
    }
    ingredient_select_id = dropdown[0].parentNode.parentNode.childNodes[1].id
    ingredient = ""
    for (child of dropdown[0].firstChild.childNodes){
        if(child.className == 'option selected'){
            ingredient = child.getAttribute('data-value')
            console.log(ingredient, ingredient_select_id)
            index = getIndexFromId(ingredient_select_id)

            if(ingredient == ""){
                alert("something is wrong, talk to Neha")
            } else {
                console.log(ingredient)
                console.log(INGREDIENTS[ingredient])
            }
        }
    }
    

    // If ingredient is empty, disable other buttons
    // If ingredient is not empty, enable other buttons
    
}

function amountOrUnitChange(element) {
    // Assert ingredient is set

    // Get details of ingredient

    final_amount = final_unit_amount * recipe_amount / recipe_unit_amount * multiply_factor / divide_factor;
    // Set final amount

}

function scaleChange() {
	// Call amountOrUnitChange on each valid row
}




