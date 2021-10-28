// Current Weather

const cityInput = document.getElementById("inputCity");
const submitButton = document.getElementById("submit");
const temperatureText = document.getElementById("temperatureText");
const minTemperatureText = document.getElementById("minTemperatureText");
const maxTemperatureText = document.getElementById("maxTemperatureText");
const cityNameText = document.getElementById("cityName");
const dateText = document.getElementById("date");
const weatherText = document.getElementById("weatherText");
const iconWeather = document.getElementById("weatherIcon");

const feelsLikeText = document.getElementById("feelsLikeText");
const windSpeedText = document.getElementById("windSpeedText");
const humidityText = document.getElementById("humidityText");
const pressureText = document.getElementById("pressureText");

const background = document.getElementById("background");
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");

// Forecast
const maxTempText1 = document.getElementById("1maxText");
const minTempText1 = document.getElementById("1minText");

const maxTempText2 = document.getElementById("2maxText");
const minTempText2 = document.getElementById("2minText");

const maxTempText3 = document.getElementById("3maxText");
const minTempText3 = document.getElementById("3minText");

const maxTempText4 = document.getElementById("4maxText");
const minTempText4 = document.getElementById("4minText");

const maxTempText5 = document.getElementById("5maxText");
const minTempText5 = document.getElementById("5minText");

const maxTempText6 = document.getElementById("6maxText");
const minTempText6 = document.getElementById("6minText");

const maxTempText7 = document.getElementById("7maxText");
const minTempText7 = document.getElementById("7minText");

const day1 = document.getElementById("day1");
const day2 = document.getElementById("day2");
const day3 = document.getElementById("day3");
const day4 = document.getElementById("day4");
const day5 = document.getElementById("day5");
const day6 = document.getElementById("day6");
const day7 = document.getElementById("day7");

let dailyWeatherDescription = [];

const iconWeather1 = document.getElementById("iconWeather1");
const iconWeather2 = document.getElementById("iconWeather2");
const iconWeather3 = document.getElementById("iconWeather3");
const iconWeather4 = document.getElementById("iconWeather4");
const iconWeather5 = document.getElementById("iconWeather5");
const iconWeather6 = document.getElementById("iconWeather6");
const iconWeather7 = document.getElementById("iconWeather7");


// OPEN WEATHER API
const key = "9dec860a85cc3ee5e04c2859961a6906";
const oneCallURL= "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude=hourly&units=metric&appid={API key}";
const cityNameURL = "https://api.openweathermap.org/data/2.5/weather";
let lat = 0;
let lon = 0;
let currentTemp = 0;
let feelsLike = 0;
let tempMin = 0;
let tempMax = 0;
let humidity = 0;
let pressure = 0;
let windSpeed = 0;
let city = "";
let cityID = 0;
let weatherDescription = "";
let date = "";
let epochDate;
let isDaytime;
let cityName = "";


// obtenemos la ciudad ingresada en el input Text
const getCity = (e) => {
    
    e.preventDefault(); 
    cityName = cityInput.value;
    console.log(cityName);
    getCityData(cityName);
    cityInput.value = "";
}


submitButton.addEventListener("click", getCity);

// obtenemos el clima actual
const getCityData = async (cityName) => {
    try {
        const response = await fetch(cityNameURL + "?q=" + `${cityName}` + "&units=metric" + "&appid=" + `${key}`, {
            method: "GET"                
        });

        const data = await response.json();
        console.log(data);
        lat = data.coord.lat;
        lon = data.coord.lon;
        currentTemp = data.main.temp;
        feelsLike = data.main.feels_like;
       
        humidity = data.main.humidity;
        pressure = data.main.pressure;
        city = data.name + ", " + data.sys.country;
        cityID = data.sys.id;
        windSpeed = data.wind.speed;
        weatherDescription = data.weather[0].main;
        isDaytime = (data.weather[0].icon).includes("d");
        console.log("Es de dia?: " + isDaytime);
           
        epochDate = data.dt * 1000;
        date = new Date(epochDate).toISOString().replace(/^(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+).(\d+)Z$/, function (a,y,m,d) {return [d,['Jan','Feb','Mar','Apr','May','June','July','Aug','Sept','Oct','Nov','Dec'][m-1],y].join(' ')});
       
        console.log("fecha: " + date);

        console.log("latitud: " + lat);
        console.log("longitud: " + lon);
        console.log("current temperature: " + currentTemp);
        console.log("feels like: " + feelsLike);
     
        console.log("humidity: " + humidity);
        console.log("pressure: " + pressure);
        console.log("wind speed: " + windSpeed);
        console.log("city: " + city);
        console.log("city ID: " + cityID);
        console.log("weather desciption: " + weatherDescription);

        temperatureText.textContent = Math.floor(currentTemp);  
        cityNameText.textContent = city;  
        dateText.textContent = date;  
        weatherText.textContent = weatherDescription;
        feelsLikeText.textContent= Math.floor(feelsLike) + " ºC";
        windSpeedText.textContent = Math.floor(windSpeed) + " m/s";
        humidityText.textContent = humidity + " %";
        pressureText.textContent = pressure + " hPa";
           
       
        if(isDaytime){

             // cambiamos estilo de acuerdo si es de dia o de noche
            background.className = "bg-image-day";
            card1.className = "today-day";
            card2.className = "detailsContainer-day";

            switch(weatherDescription){
                case "Clear":
                    iconWeather.className = "wi wi-day-sunny";    
                    break;
                case "Drizzle":
                    iconWeather.className = "wi wi-day-thunderstorm";    
                    break;
                case "Rain":
                    iconWeather.className = "wi wi-day-rain";    
                    break;
                case "Snow":
                    iconWeather.className = "wi wi-day-snow";    
                    break;
                case "Mist":
                    iconWeather.className = "wi wi-day-fog";    
                    break;
                case "Fog":
                    iconWeather.className = "wi wi-day-fog";    
                    break;
                case "Smoke":
                    iconWeather.className = "wi wi-smoke";    
                    break;
                case "Haze":
                    iconWeather.className = "wi wi-day-haze";    
                    break;
                case "Dust":
                    iconWeather.className = "wi wi-dust";    
                    break;         
                case "Sand":
                    iconWeather.className = "wi wi-sandstorm";    
                    break;
                case "Ash":
                    iconWeather.className = "wi wi-sandstorm";    
                    break;
                case "Squall":
                    iconWeather.className = "wi wi-day-rain-mix";    
                    break;
                case "Tornado":
                    iconWeather.className = "wi wi-tornado";    
                    break;
                case "Clouds":
                    iconWeather.className = "wi wi-day-cloudy";    
                    break;
                default:
                    iconWeather.className = "wi wi-na";    
            }
        }
        else if(!isDaytime){
            
            background.className = "bg-image-night";
            card1.className = "today-night";
            card2.className = "detailsContainer-night";

            switch(weatherDescription){
                case "Clear":
                    iconWeather.className = "wi wi-night-clear";    
                    break;
                case "Drizzle":
                    iconWeather.className = "wi wi-night-thunderstorm";    
                    break;
                case "Rain":
                    iconWeather.className = "wi wi-night-rain";    
                    break;
                case "Snow":
                    iconWeather.className = "wi wi-night-snow";    
                    break;
                case "Mist":
                    iconWeather.className = "wi wi-night-fog";    
                    break;
                case "Fog":
                    iconWeather.className = "wi wi-night-fog";    
                    break;
                case "Smoke":
                    iconWeather.className = "wi wi-smoke";    
                    break;
                case "Haze":
                    iconWeather.className = "wi wi-day-haze";    
                    break;
                case "Dust":
                    iconWeather.className = "wi wi-dust";    
                    break;             
                case "Sand":
                    iconWeather.className = "wi wi-sandstorm";    
                    break;
                case "Ash":
                    iconWeather.className = "wi wi-sandstorm";    
                    break;
                case "Squall":
                    iconWeather.className = "wi wi-night-rain-mix";    
                    break;
                case "Tornado":
                    iconWeather.className = "wi wi-tornado";    
                    break;
                case "Clouds":
                    iconWeather.className = "wi wi-night-cloudy";    
                    break;
                default:
                    iconWeather.className = "wi wi-na";    
            }
        }            
    
        getWeather(lat, lon);

    } catch(error) {
        console.log(error, "Please search for a valid city");
    }
};

// obtenemos el forecast para los proximos 7 dias
const getWeather = async (lat, lon) => {
    try {
        const response = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + `${lat}` + "&lon=" + `${lon}` + "&exclude=hourly&units=metric&appid=9dec860a85cc3ee5e04c2859961a6906", {
            method: "GET"                
        });

        const data = await response.json();
        tempMin = data.daily[0].temp.min;
        tempMax = data.daily[0].temp.max;
        console.log("min temperature: " + tempMin);
        console.log("max temperature: " + tempMax);
        minTemperatureText.textContent = Math.floor(tempMin);
        maxTemperatureText.textContent = Math.floor(tempMax);

        maxTempText1.textContent = Math.floor(data.daily[1].temp.max);
        minTempText1.textContent = Math.floor(data.daily[1].temp.min);
        maxTempText2.textContent = Math.floor(data.daily[2].temp.max);
        minTempText2.textContent = Math.floor(data.daily[2].temp.min);      
        maxTempText3.textContent = Math.floor(data.daily[3].temp.max);
        minTempText3.textContent = Math.floor(data.daily[3].temp.min);        
        maxTempText4.textContent = Math.floor(data.daily[4].temp.max);
        minTempText4.textContent = Math.floor(data.daily[4].temp.min);  
        maxTempText5.textContent = Math.floor(data.daily[5].temp.max);
        minTempText5.textContent = Math.floor(data.daily[5].temp.min);        
        maxTempText6.textContent = Math.floor(data.daily[6].temp.max);
        minTempText6.textContent = Math.floor(data.daily[6].temp.min);      
        maxTempText7.textContent = Math.floor(data.daily[7].temp.max);
        minTempText7.textContent = Math.floor(data.daily[7].temp.min);
        
        dailyWeatherDescription[0] = data.daily[0].weather[0].main;
        dailyWeatherDescription[1] = data.daily[1].weather[0].main;
        dailyWeatherDescription[2] = data.daily[2].weather[0].main;
        dailyWeatherDescription[3] = data.daily[3].weather[0].main;
        dailyWeatherDescription[4] = data.daily[4].weather[0].main;
        dailyWeatherDescription[5] = data.daily[5].weather[0].main;
        dailyWeatherDescription[6] = data.daily[6].weather[0].main;

        let timestamp = [data.daily[1].dt, data.daily[2].dt, data.daily[3].dt, data.daily[4].dt, data.daily[5].dt, data.daily[6].dt, data.daily[7].dt];
        let a = [new Date(timestamp[0]*1000), new Date(timestamp[1]*1000), new Date(timestamp[2]*1000), new Date(timestamp[3]*1000), new Date(timestamp[4]*1000), new Date(timestamp[5]*1000), new Date(timestamp[6]*1000)];
        let days = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
        let week = [days[a[0].getDay()], days[a[1].getDay()], days[a[2].getDay()],days[a[3].getDay()],days[a[4].getDay()],days[a[5].getDay()],days[a[6].getDay()]];
        console.log("week: " + week);

        day1.textContent = week[0];
        day2.textContent = week[1];
        day3.textContent = week[2];
        day4.textContent = week[3];
        day5.textContent = week[4];
        day6.textContent = week[5];
        day7.textContent = week[6];
        
        let nameClass = [];

        for (i=0; i<7; i++){
            
            console.log(dailyWeatherDescription[i]);
            switch(dailyWeatherDescription[i]){
                case "Clear":                    
                    nameClass[i] = "wi wi-day-sunny";  
                    break;

                case "Drizzle":
                    nameClass[i] = "wi wi-day-thunderstorm";    
                    break;
                    
                case "Rain":
                    nameClass[i] = "wi wi-day-rain";     
                    break;
                    
                case "Snow":
                    nameClass[i] = "wi wi-day-snow"; 
                    break;
                    
                case "Mist":
                    nameClass[i] = "wi wi-day-fog";   
                    break;
                
                case "Fog":
                    nameClass[i] = "wi wi-day-fog"; 
                    break;
                    
                case "Smoke":
                    nameClass[i] = "wi wi-smoke"; 
                    break;
                    
                case "Haze":
                    nameClass[i] = "wi wi-day-haze";
                    break;
                    
                case "Dust":
                    nameClass[i] = "wi wi-dust"; 
                    break;         
                    
                case "Sand":
                    nameClass[i] = "wi wi-sandstorm";   
                    break;
                    
                case "Ash":
                    nameClass[i] = "wi wi-sandstorm";    
                    break;
                    
                case "Squall":
                    nameClass[i] = "wi wi-day-rain-mix";    
                    break;
                    
                case "Tornado":
                    nameClass[i] = "wi wi-tornado"; 
                    break;
                    
                case "Clouds":
                    nameClass[i] = "wi wi-day-cloudy";  
                    break;
                    
                default:
                    nameClass[i] = "wi wi-na"; 
            }                 
        }

        iconWeather1.className = nameClass[0];
        iconWeather2.className = nameClass[1];
        iconWeather3.className = nameClass[2];
        iconWeather4.className = nameClass[3];
        iconWeather5.className = nameClass[4];
        iconWeather6.className = nameClass[5];
        iconWeather7.className = nameClass[6];        

        console.log(data);      


    } catch(error) {
        console.log(error, "Current weather conditions not available");
    }
};