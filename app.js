const apikey = `65919f1b16b058e5527e0f00f27efb4d
`;


async function fetchWeatherData(city){
   try{
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
    )
    if(!response.ok){
        throw new Error ("enable to fetch weather data");
    }
    const data = await response.json();
    updateWeatherUI(data);
   } catch (error){
    console.error(error)
   }
}
const cityElement = document.querySelector('.city');
const temperature = document.querySelector('.temp');
const windspeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity')
const visibility = document.querySelector('.visibility-distance');
const descriptiontext = document.querySelector('.description-text');
const date = document.querySelector(".date");
const descriptionIcon = document.querySelector(".description i");

function updateWeatherUI(data){
cityElement.textContent = data.name;
temperature.textContent = `${Math.round(data.main.temp)}`;
windspeed.textContent = `${data.wind.speed}km/h`;
humidity.textContent = `${data.main.humidity}%`;
visibility.textContent = `${data.visibility/1000} km`;
descriptiontext.textContent = data.weather[0].description;
const currentDate = new Date();
date.textContent = currentDate.toDateString();
const weatherIconName = getWeatherIconName(data.weather[0].main);
descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}
const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input")


formElement.addEventListener("submit",function(e){
    e.preventDefault();
    const city = inputElement.value;
    if(city !==""){
        fetchWeatherData(city)
        inputElement.value ="";
    }
})
function getWeatherIconName(weathercondition){
const iconMap={
    Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
}
return iconMap[weathercondition]  || "help"
}