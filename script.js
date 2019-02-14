//creating welcome message and search button
let welcome = '<div class="card col">'
welcome += '<h3 class="card-header">Welcome!</h3>'
welcome += '<div class="card-body">'
welcome += '<p class="card-text"> In this website you will be able to find recipes online. Recipes will be provided with the recipe name,'
welcome += 'image, recipe calories, ingredients, and finally a link to go to the complete recipe. Recipe search criteria will be: main ingredient,'
welcome += 'number of calories, type of diet, and number of ingredients. A list of 10 recipes will show which fit the criteria.</p><br/><br/></div></div>'
welcome += '<div id="button"><button type="button" id="search">Search Recipes</button></div>'


document.getElementById("recipe").innerHTML = welcome; //initialize to welcome card
document.getElementById("search").addEventListener("click", newForm); //if search button then go to form

//script to create form
let myForm = '<form onsubmit="getData()" id="myForm">';
myForm += '<label for="mainIng">Main Ingredient</label><br/>';
myForm += '<input class="form-control" name="mainIng" type="text" placeholder="Ex. Chicken, Beef, Pork, Carrots, etc" value="" required id="mainIng"><br/>';
myForm += '<label for="calories">Calories Range</label><br/>';
myForm += '<input class="form-control" name ="calories" type="text" placeholder="Range 000-111" value="" required id="calories"><br/>';
myForm += '<label for="diet">Type of Diet</label><br/>';
myForm += '<select class="form-control" name ="diet" id="diet" required><option value="">Select a Diet Option</option><option value="balanced">Balanced</option><option value="high-protein">Protein Rich</option><option value="high-fiber">High Fiber</option><option value="low-fat">Low Fat</option><option value="low-carb">Low Carbs</option><option value="low-sodium">Low Sodium</option></select><br/>'
myForm += '<label for="ingredients">Amount of Ingredients</label><br/>';
myForm += '<input class="form-control" name ="ingredients" type="text" placeholder="Maximum ingredients" value="" required id="ingredients"><br/>';
myForm += '<div id="submitButton" style="text-align: center;"><button type="submit" class="btn btn-primary" id="submitSearch">Submit</button></div>';
myForm += '</form>'

function newForm(){
    document.getElementById("recipe").innerHTML = myForm;
}

function getData(){
    event.preventDefault();
    const main = document.getElementById("mainIng").value; // q
    const calories = document.getElementById("calories").value; // calories
    const diet = document.getElementById("diet").value; // diet
    const ingredients = document.getElementById("ingredients").value; //ingredients

    const APIKEY = "c466c9116c259d01cae5e81a98f65422";
    const app_id = "72659001";

    if (main === ""){
        return;
    }
    else {
        document.getElementById("myForm").style.visibility = "hidden";
        //const aa = "https://api.edamam.com/search?q=chicken&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free"

        const url = "https://api.edamam.com/search?q=" + main + "&app_id=" + app_id + "&app_key=" + APIKEY + "&ingr=" + ingredients + "&diet=" + diet + "&calories=" + calories;
        fetch(url).then(function(response) {
            return response.json();
        }).then(function(json) {
            console.log(json)
            let results = "";
            results += '<div class="row"><div class="col-sm-6"><h3>' + json.q + ' Recipes</h3></div><div class="col-sm-6"><button type="button" class="btn btn-primary" id="backToForm"> Back </button></div></div>'
            results += '<div class="row">'
            

            for (let i = 0; i < json.hits.length; i++) {
                
                results += '<div class="card col-sm-6">'
                results += '<h5 class="card-header">' + json.hits[i].recipe.label + '</h5>'
                results += '<img src="' + json.hits[i].recipe.image + '" width="200px">'
                results += '<div class="card-body">'
                results += '<p class="card-text"> Number of calories: ' + Math.round(json.hits[i].recipe.calories) + '</p>'
                results += '<p class="card-text"> Ingredients <br/>'
                for (let j = 0; j < json.hits[i].recipe.ingredients.length; j++){
                    results += '<span>' + json.hits[i].recipe.ingredients[j].text + ' </span><br/>'
                }
                results += '</p>'
                results += '<a href="' + json.hits[i].recipe.url + '" target="blank"> <strong>Go to Recipe</strong> </a>'
                results += '</div></div>'
            }
            results += '</div></div>';

            document.getElementById("recipe").innerHTML = results;
            document.getElementById("backToForm").addEventListener("click", newForm);
            delete json
        });
    }
}