const input = document.querySelector("input");
const submit = document.querySelector("#btn");
const form = document.querySelector("form");
const card = document.querySelector(".card");
const message = document.querySelector("#message");
const body = document.querySelector("body");

const city = document.querySelector(".city");
const temperature = document.querySelector(".temperature");
const Humidity = document.querySelector(".Humidity");
const descDisplay = document.querySelector(".descDisplay");
const Emoji = document.querySelector(".Emoji");
const errorDisplay = document.querySelector(".errorDisplay");

const API_KEY = "a4871670013f0f5e52c3fe65acb13237";  

card.classList.remove("card");

submit.addEventListener("click", () => {
    const cityName = input.value.trim();  

    if (cityName === "") {
        message.innerHTML = "Please Enter City Name";
        message.style.display = "block";
        message.classList.add("emptyDisplay");
        card.classList.remove("card");
        errorDisplay.classList.remove("emptyDisplay");
        card.innerHTML = "";



    } else {
        message.classList.remove("emptyDisplay");
        errorDisplay.classList.remove("emptyDisplay");
        message.innerHTML = "";
        card.classList.add("card");
        fetchWeatherData(cityName);
    }
});

async function fetchWeatherData(cityName) {
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;

    try {
        let response = await fetch(BASE_URL);

         
        if (!response.ok) {
            throw new Error(`Failed to fetch weather data: ${response.statusText}`);
        }

         
        let data = await response.json();
        
        
        const cityName = data.name;
        const temperatureValue = data.main.temp;
        const humidity = data.main.humidity;
        const description = data.weather[0].description;
        const weatherEmoji = getWeatherEmoji(data.weather[0].main);

        
        city.innerHTML = cityName;
        temperature.innerHTML = `${temperatureValue}°C`;
        Humidity.innerHTML = `Humidity: ${humidity}%`;
        descDisplay.innerHTML = description;
        Emoji.innerHTML = weatherEmoji;
        errorDisplay.innerHTML = ""; 
    } catch (error) {
        console.error('Error:', error);
        errorDisplay.innerHTML = "City not found. Please try again.";
        card.classList.remove("card"); 
        message.classList.remove("emptyDisplay");
        errorDisplay.classList.add("emptyDisplay");


    }
}

 
function getWeatherEmoji(weatherCondition) {

    if(weatherCondition === "Clear") {
        return "☀️";
    }
    else if(weatherCondition === "Clouds") {
        return "☁️";
    }
    else if(weatherCondition === "Rain") {
        return "🌧️";
    }
    else if(weatherCondition === "Snow") {
        return "❄️";
    }
    else if(weatherCondition === "Thunderstorm") {
        return "⛈️";
    }
    else if(weatherCondition === "Drizzle") {
        return "🌦️";
    }
    else {
        return "🌤️";
    }

    
}
