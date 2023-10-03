
let DietURL = 'https://fitness-calculator.p.rapidapi.com/dailycalorie/'

let age = 37; 
let gender = "female";
let height = 175;
let weight = 72;
let activitylevel = "level_6";

let calories = 2000

//age = 0-80
//gender = male / female
//height = # in cm
//weight = # in kg
//activitylevel = [level_#] 1 - 7

var getDiet = function () {

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

var DefaultUser = {
    age: '25',
    gender: 'male',
    height: '180',
    weight: '72',
    activitylevel: 'level_4', 
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

var DisplayModal = function () {
    
    modal = document.createElement("section")
    modal.setAttribute("class", "modal")
    modal.setAttribute("id", "inputModal")


    header = document.createElement("div")
    header.setAttribute("class", "#")

    inputDiv = document.createElement("div")
    inputDiv.setAttribute("class", "#")

    skipButton = document.createElement("button")
    skipButton.setAttribute("class", "#")

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
    modal.appendChild(skipButton)
    modal.appendChild(nextButton)
    modal.appendChild(returnValueDiv)

    main = document.getElementById("main")
    main.appendChild(modal)
}


// getRecipe();
// getDiet();

DisplayModal()


document.addEventListener('DOMContentLoaded', function() {

    const form = document.querySelector('form');
    const recipeResults = document.getElementById('resultsList');

    function searchRecipes() {
        const userSearch = document.getElementById('searchField').value;

        if (userSearch.trim() !== '') {

            const recipeURL = `https://api.edamam.com/search?q=${userSearch}&app_id=f21289d1&app_key=1ae2a0e4c64ececf2fea98460046a101`;

            fetch(recipeURL)
            .then((response) => response.json())
            .then((data) => {
                const recipes = data.hits;
                recipes.forEach(recipe => {
                    const li = document.createElement('li');
                    li.innerText = recipe.recipe.label;
                    recipeResults.appendChild(li);
                });
            })
            .catch(error => console.error("Error fetching data:", error));
        } else {
            recipeResults.innerHTML = '';
        }
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        searchRecipes();
    });

});