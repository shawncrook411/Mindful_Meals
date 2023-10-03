let age = 37; 
let gender = "female";
let height = 175;
let weight = 72;
let activitylevel = "level_6";
let calories = 2000

var DefaultUser = {
    age: '25', // 0-80
    gender: 'male', // male / female
    height: '180', // cm
    weight: '72', // kg
    activitylevel: 'level_4',  // [level_#] 1 - 7
}

var getDiet = function () {
    let DietURL = 'https://fitness-calculator.p.rapidapi.com/dailycalorie/'
    let localURL = DietURL + '?' + 'age=' + age + '&gender=' + gender + '&height=' + height + '&weight=' + weight + '&activitylevel=' + activitylevel

    let options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'a545dc7272msh5310c0b3bc93c07p135ef8jsne5be6ed602b9',
            'X-RapidAPI-Host': 'fitness-calculator.p.rapidapi.com'
        }
    };

    fetch(localURL, options)
        .then(function (response) {
        return response.json();
        })
        .then(function (data) {
        console.log("getDiet works")
        console.log(data)

        calories = data.data.goals["maintain weight"]        
        })
}


var getRecipe = function () {
    
    var queryValue = 'pasta'
    var cuisineTypeLables = 'Italian'
    var mealTypeLabels = 'Dinner'
    var healthLabels = 'kosher'
    var dietLabels = 'balanced'   
    
    var app_id = 'f21289d1'
    var app_key = '1ae2a0e4c64ececf2fea98460046a101'
    
    let localURL = 'https://api.edamam.com/api/recipes/v2?type=public&app_id=' + app_id + '&app_key=' + app_key + '&q=' + queryValue + '&calories=' + (calories-200) + '-' + (calories+200) + '&cuisinetype=' + cuisineTypeLables + '&mealType=' + mealTypeLabels + '&health=' + healthLabels + '&diet=' + dietLabels
    
    fetch(localURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log("getRecipe works")
        console.log(data)        
    })
    // q - serachbar query
    // calories / passed from other API
    // cuisineType
    // mealType
    // health
    // alcohol-free, dairy-free, fish-free (crustacean/mollusks and fish) , gluten-free, vegan , vegatarian, treenut-free, peanut-free, kosher, low-sugar
    // diet
}

modal = document.createElement("section")
modal.setAttribute("class", "modal")
modal.setAttribute("id", "inputModal")

header = document.createElement("div")
header.setAttribute("class", "#")

inputDiv = document.createElement("div")
inputDiv.setAttribute("class", "#")

submitInfoButton = document.createElement("button")
submitInfoButton.setAttribute("class", "#")
submitInfoButton.textContent = "Submit"

nextButton = document.createElement("button")
nextButton.setAttribute("class", "#")

returnValueDiv = document.createElement("div")
returnValueDiv.setAttribute("class", "#")

returnList = document.createElement("ul")
returnValueDiv.appendChild(returnList)

let input = [];
let returnValue = [];

for (let i = 0; i < 6; i++)
{
    input[i] = document.createElement("input")
    input[i].setAttribute("class", "#")
    inputDiv.appendChild(input[i])  
}

input[0].placeholder = "Name:"
input[1].placeholder = "Age: (0-80)"
input[2].placeholder = "Height: in cm"
input[3].placeholder = "Weight: in Kg"
input[4].placeholder = "Activity Level: 1-7"
input[5].placeholder = "Weight Loss Goal: "

for (let i = 0; i < 4; i++)
{
    returnValue[i] = document.createElement("li")
    returnValue[i].setAttribute("class", "#")       
    returnList.appendChild(returnValue[i])
}

returnValue[0].textContent = "Recommended Daily Calories: "    
returnValue[1].textContent = "Protein:"
returnValue[2].textContent = "Fat: "
returnValue[3].textContent = "Carbohydrates: "   

modal.appendChild(header)
modal.appendChild(inputDiv)
modal.appendChild(submitInfoButton)
modal.appendChild(returnValueDiv)

main = document.getElementById("main")
main.appendChild(modal)


// only executes when entire DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // query selectors for the form, and for the results section
    const form = document.querySelector('form');
    const recipeResults = document.getElementById('resultsList')
    
    // function to search the recipes
    function searchRecipes() {

        // gets the users search input
        const userSearch = document.getElementById('searchField').value
        
        // error handling, if the searchbar is empty, code doesn't execute when submitted
        if (userSearch.trim() !== '') {
            
            const recipeURL = `https://api.edamam.com/search?q=${userSearch}&app_id=f21289d1&app_key=1ae2a0e4c64ececf2fea98460046a101`
            
            // fetch for the recipes
            fetch(recipeURL)
            .then((response) => response.json())
            .then((data) => {
                
                // creating variable for the returned recipes
                const recipes = data.hits;

                // for each recipe ...
                recipes.forEach(recipe => {

                    // creates the card for each individual recipe, and adds the card class
                    const card = document.createElement('div');
                    card.classList.add('card');

                    // adds the corresponding image for said recipe, as well as the name of the recipe
                    const img = document.createElement('img');
                    img.src = recipe.recipe.image;
                    img.alt = recipe.recipe.label;

                    // creates the h3 to put the name of the recipe in
                    const heading = document.createElement('h3');
                    heading.innerText = recipe.recipe.label;

                    // adds the image and heading to the card created previously
                    card.appendChild(img);
                    card.appendChild(heading);

                    // appends the recipe card to the recipe result section
                    recipeResults.appendChild(card);

                    // event listener for the cards, takes user to new tab with the corresponding recipe URL
                    card.addEventListener('click', function() {
                        const recipeURL = recipe.recipe.url;
                        window.open(recipeURL, '_blank');
                        console.log('card clicked');
                    })
                });
            })
            // error handling, displays given error in console
            .catch(error => console.error("Error fetching data:", error))
        } else {
            // empties the recipe section
            recipeResults.innerHTML = ''
        }
    }
    
    // when the search is submitted, empty the recipe results section, and then run the searchRecipe function
    form.addEventListener('submit', function(event) {
        event.preventDefault()
        recipeResults.innerHTML = '';
        searchRecipes()
    })
})


// getRecipe();
// getDiet();