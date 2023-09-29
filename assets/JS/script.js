
let DietURL = 'https://fitness-calculator.p.rapidapi.com/dailycalorie/'

let age = 37; 
let gender = "female";
let height = 175;
let weight = 72;
let activitylevel = "level_6";

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
        })
}

getDiet();

