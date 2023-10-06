let age = 37; 
let gender = "female";
let height = 175;
let weight = 72;
let activitylevel = "level_6";
let calories = 2000
let goals = '';

let Users = [];

var DefaultUser = {
    userName: 'DefaultUser',
    age: '25', // 0-80
    gender: 'male', // male / female
    height: '180', // cm
    weight: '72', // kg
    activitylevel: 'level_4',  // [level_#] 1 - 7
    goals: ''
}

Users.push(DefaultUser)

var getDiet = function (currentUser) {
    let DietURL = 'https://fitness-calculator.p.rapidapi.com/dailycalorie/'
    let localURL = DietURL + '?' + 'age=' + currentUser.age + '&gender=' + currentUser.gender + '&height=' + currentUser.height + '&weight=' + currentUser.weight + '&activitylevel=' + currentUser.activitylevel

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
        return calories;        
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

let input = [];
let returnValue = [];

openModal = document.getElementById("openModal")

modal = document.createElement("section")
modal.setAttribute("class", "modal")
modal.setAttribute("id", "inputModal")

header = document.createElement("div")
header.setAttribute("class", "#")

inputDiv = document.createElement("form")
inputDiv.setAttribute("class", "#")

nextButton = document.createElement("button")
nextButton.setAttribute("class", "#")

returnValueDiv = document.createElement("div")
returnValueDiv.setAttribute("class", "#")

returnList = document.createElement("ul")
returnList.setAttribute("id", "returnList")
returnValueDiv.appendChild(returnList)

for (let i = 0; i < 7; i++)
{
    input[i] = document.createElement("input")
    input[i].setAttribute("class", "#")
    inputDiv.appendChild(input[i])  
}

modal.appendChild(header)
modal.appendChild(inputDiv)

modal.appendChild(returnValueDiv)

main = document.getElementById("main")
main.appendChild(modal)

errorParagraph = document.createElement("p")
errorParagraph.textContent = "You must fill in all the inputs!"
errorParagraph.setAttribute("class", "error")

submitInfoButton = document.createElement("button")
submitInfoButton.setAttribute("class", "#")
submitInfoButton.textContent = "Submit to create new User"

inputDiv.appendChild(submitInfoButton)

var submitInfo = function (event) {

    event.preventDefault()   
    errorParagraph.setAttribute("style", "display:none")
    inputDiv.appendChild(errorParagraph)    

    localUserName = input[0].value

    if (input[1].value <= 80 && 0 < input[1].value)
    {localAge = input[1].value}
    else
    {
        errorParagraph.textContent = "You must fill input an age 1 - 80"
        errorParagraph.setAttribute("style", "display:visible") 
    }    

    testHeight = Math.floor(input[2].value)
    if (testHeight <= 230 && 130 <= testHeight)
    {localHeight = testHeight}
    else
    {
        errorParagraph.textContent = "Your height must be between 130-230cm"
        errorParagraph.setAttribute("style", "display:visible") 
    } 


    testWeight = Math.floor(input[3].value)
    if (testWeight <= 160 && 40 <= testWeight)
    {localWeight = testWeight}
    else
    {
        errorParagraph.textContent = "Your weight must be between 40-160kg"
        errorParagraph.setAttribute("style", "display:visible") 
    } 

    if (input[4].value <= 7 && 0 < input[4].value)
    {localActivityLevel = "level_" + input[4].value}
    else
    {
        errorParagraph.textContent = "You must input an activity level 1-6"
        errorParagraph.setAttribute("style", "display:visible") 
    }

    testGender = input[6].value
    if (testGender === "male" || testGender === "female")
    {localGender = testGender.toLowerCase()}
    else
    {
        if (testGender === "M" || testGender === "m")
        {
            localGender = "male"
        }
        if (testGender === "F" || testGender === "f")
        {
            localGender = "female"
        }
    }

    if (localUserName && localAge && localHeight && localWeight && localActivityLevel && localGender)
    {
        var newUser = 
        {
            userName : input[0].value,
            age : localAge,
            height : localHeight, 
            weight : localWeight,
            activitylevel : localActivityLevel,
            goals : input[5].value,
            gender: localGender
        }        
        
        let newUserCalorie = getDiet(newUser)
        newUser.calories = newUserCalorie
        
        Users.push(newUser)

        console.log(Users)

        for (let i = 0; i < 5; i++)
        {
            returnValue[i] = document.createElement("li")
            returnValue[i].setAttribute("class", "#")       
            returnList.appendChild(returnValue[i])
        }

        returnValue[0].textContent = "New User Created! - " + newUser.userName 
        returnValue[1].textContent = "Recommended Daily Calories: "    
        returnValue[2].textContent = "Protein:"
        returnValue[3].textContent = "Fat: "
        returnValue[4].textContent = "Carbohydrates: "  
        submitInfoButton.setAttribute("style", "display:none") 

        createAnotherButton = document.createElement("button")
        createAnotherButton.addEventListener("click", refreshModal)
        createAnotherButton.textContent = "Create another user?"
        createAnotherButton.setAttribute("id", "createAnother")
        modal.appendChild(createAnotherButton)
    }

    else
    {   
        errorParagraph.textContent = "You must fill in all the inputs!"     
        errorParagraph.setAttribute("style", "display:visible")           
    }
}

var refreshModal = function () {  
    
    errorParagraph.setAttribute("style", "display:none") 
    submitInfoButton.addEventListener("click", submitInfo)
    submitInfoButton.setAttribute("style", "display:visible") 


    for (let i = 0; i < 7; i++)
    {
        input[i].value = ''
    }    
   
    console.log(Users)
    input[0].placeholder = "Name:"
    input[1].placeholder = "Age: (0-80)"
    input[2].placeholder = "Height: (130-230cm)"
    input[3].placeholder = "Weight: (40-160kg)"
    input[4].placeholder = "Activity Level: (1-6)"
    input[5].placeholder = "Weight Loss Goal: "
    input[6].placeholder = "Gender? Male/Female"
    
    if (Users.length > 1)
    {
        another = document.getElementById("createAnother")
        another.remove()

        for (let i = 0; i < 5; i++)
        {
            returnValue[i].remove()    
        }
    }
}

openModal.addEventListener("click", refreshModal)



// only executes when entire DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
   
    // query selectors for the form, the results section, and the favorites
        const form = document.querySelector('form');
        const recipeResults = document.getElementById('resultsList')
        let lastSearchedRecipes = [];
        const favoritesList = document.getElementById('favoritesList')
    
    // function to load favorite recipes, if there are any
    function loadFavoriteRecipe() {
            const favoriteRecipes = [];

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                if (key.startsWith('favoriteRecipe')) {
                    const recipeInfo = JSON.parse(localStorage.getItem(key));
                    favoriteRecipes.push(recipeInfo);
                }
            }

            displayFavorites(favoriteRecipes);
        }
    
    // function to display favorited recipes
    function displayFavorites(recipe) {

            // does this for each recipe
            recipe.forEach(recipe => {
            // creates the card for each individual recipe, and adds the card class
            const card = document.createElement('div');
            card.classList.add('card');
    
    
            // adds the corresponding image for said recipe, as well as the name of the recipe
            const img = document.createElement('img');
            img.src = recipe.image;
            img.alt = recipe.label;
    
    
            // creates the h3 to put the name of the recipe in
            const heading = document.createElement('h3');
            heading.innerText = recipe.label;
    
    
            // creates icon for favorites
            const heart = document.createElement('i');
            heart.classList.add('sourceText', 'fa-solid', 'fa-heart');
    
            heading.appendChild(heart);
    
            // adds the image and heading to the card created previously
            card.appendChild(heading);
            card.appendChild(img);
            
    
            // appends the recipe card to the recipe result section
            favoritesList.appendChild(card);
    
            // event listener for the cards, takes user to new tab with the corresponding recipe URL
            card.addEventListener('click', function() {
                const recipeURL = recipe.url;
                window.open(recipeURL, '_blank');
            })
    
            // adds event listener to the heart, when clicked it saves the card to local storage
            heart.addEventListener('click', function(event) {
                event.stopPropagation();
    
                // saves the recipe data in a variable
                const recipeData = {
                    label: recipe.label,
                    image: recipe.image,
                    url: recipe.url
                };
    
                // if clicked and heart isnt solid, it makes heart solid and saves info to local storage
                if (heart.classList.contains('fa-regular')) {
                    localStorage.setItem('favoriteRecipe' + recipe.url, JSON.stringify(recipeData));
                    heart.classList.remove('fa-regular');
                    heart.classList.add('fa-solid');
    
                // if clicked and heart is solid, it changes to the regular heart and removes info to local storage
                } else if (heart.classList.contains('fa-solid')) {
                    localStorage.removeItem('favoriteRecipe' + recipe.url, JSON.stringify(recipeData));
                    heart.classList.remove('fa-solid');
                    heart.classList.add('fa-regular');
                }
            })
            })
    }
    
        loadFavoriteRecipe();
    
    
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
                lastSearchedRecipes = recipes;
    
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
    
    
                    // creates icon for favorites
                    const heart = document.createElement('i');
                    heart.classList.add('sourceText', 'fa-regular', 'fa-heart');
    
                    heading.appendChild(heart);
    
                    // adds the image and heading to the card created previously
                    card.appendChild(heading);
                    card.appendChild(img);
                    
    
                    // appends the recipe card to the recipe result section
                    recipeResults.appendChild(card);
    
    
                    // event listener for the cards, takes user to new tab with the corresponding recipe URL
                    card.addEventListener('click', function() {
                        const recipeURL = recipe.recipe.url;
                        window.open(recipeURL, '_blank');
                    })
    
    
                    // adds event listener to the heart, when clicked it saves the card to local storage
                    heart.addEventListener('click', function(event) {
                        event.stopPropagation();
    
                        // saves the recipe data in a variable
                        const recipeData = {
                            label: recipe.recipe.label,
                            image: recipe.recipe.image,
                            url: recipe.recipe.url
                        };
    
                        // if clicked and heart isnt solid, it makes heart solid and saves info to local storage
                        if (heart.classList.contains('fa-regular')) {
                            localStorage.setItem('favoriteRecipe' + recipe.recipe.url, JSON.stringify(recipeData));
                            heart.classList.remove('fa-regular');
                            heart.classList.add('fa-solid');
                        // if clicked and heart is solid, it changes to the regular heart and removes info to local storage
                        } else if (heart.classList.contains('fa-solid')) {
                            localStorage.removeItem('favoriteRecipe' + recipe.recipe.url, JSON.stringify(recipeData));
                            heart.classList.remove('fa-solid');
                            heart.classList.add('fa-regular');
                        }
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