const api = {
    key: "2fa73590fd8b5a4c6e68098ad5625395",
    base: "https://api.openweathermap.org/data/2.5/"
  };
  
  const searchbox = document.querySelector(".search-box");
  searchbox.addEventListener("keypress", setQuery);
  
  function setQuery(evt) {
    if (evt.keyCode == 13) {
      getResults(searchbox.value);
    }
  }
  
  function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then((response) => response.json())
      .then(displayResults);
  }
  
  function displayResults(weather) {
    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;
  
    let now = new Date();
    let date = document.querySelector(".location .date");
    date.innerText = dateBuilder(now);
  
    let temp = document.querySelector(".current .temp");
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  
    let weather_el = document.querySelector(".current .weather");
    weather_el.innerText = weather.weather[0].main;
  
    let iconLeft = document.querySelector(".current .icon-left");
    let iconRight = document.querySelector(".current .icon-right");
  
    iconLeft.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    iconLeft.alt = weather.weather[0].description;
  
    iconRight.src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    iconRight.alt = weather.weather[0].description;
  
    let hilow = document.querySelector(".hi-low");
    hilow.innerText = `${weather.main.temp_min}°C / ${weather.main.temp_max}°C`;
  
    // Additional details
    let feelsLike = document.querySelector(".additional-info .feels-like");
    feelsLike.innerText = `Feels Like: ${Math.round(weather.main.feels_like)}°C`;
  
    let pressure = document.querySelector(".additional-info .pressure");
    pressure.innerText = `Pressure: ${weather.main.pressure} hPa`;
  
    let humidity = document.querySelector(".additional-info .humidity");
    humidity.innerText = `Humidity: ${weather.main.humidity}%`;
  
    let visibility = document.querySelector(".additional-info .visibility");
    visibility.innerText = `Visibility: ${weather.visibility / 1000} km`;
  
    let wind = document.querySelector(".additional-info .wind");
    wind.innerText = `Wind: ${weather.wind.speed} m/s, ${weather.wind.deg}°`;
  
    let sunrise = document.querySelector(".additional-info .sunrise");
    sunrise.innerText = `Sunrise: ${new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}`;
  
    let sunset = document.querySelector(".additional-info .sunset");
    sunset.innerText = `Sunset: ${new Date(weather.sys.sunset * 1000).toLocaleTimeString()}`;
  
    let clouds = document.querySelector(".additional-info .clouds");
    clouds.innerText = `Cloud Coverage: ${weather.clouds.all}%`;
  }
  
  function dateBuilder(d) {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
  
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
  
    return `${day} ${date} ${month} ${year}`;
  }
  
