const api = {
    key: "d11fbedd0a593a2b2e097aaaa74f9aad",
    baseurl: 'http://api.openweathermap.org/data/2.5/'
}

const searchBox = document.querySelector('.search-box');
window.addEventListener('load',handleWroclaw);
searchBox.addEventListener('keypress',handleSearch);

function handleWroclaw(e) {
    const url = `${api.baseurl}weather?q=Wroclaw&units=metric&APPID=${api.key}`;
    fetch(url)
        .then(weather => weather.json())
        .then(displayWeather);
}
function handleSearch(event) {
    if (event.keyCode == 13) {
        const city = searchBox.value;
        const url = `${api.baseurl}weather?q=${city}&units=metric&APPID=${api.key}`;
        fetch(url)
            .then(weather => weather.json())
            .then(displayWeather);
    }
}

function displayWeather(weather) {
    let cityCountry = document.querySelector('.city');
    cityCountry.textContent = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.date');
    date.textContent = dateBuilder(now);

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>&deg;C</span>`;

    let weath = document.querySelector('.weather');
    weath.textContent = `${weather.weather[0].main}`;

    let hiLow = document.querySelector('.hi-low');
    hiLow.innerHTML =
        `${Math.round(weather.main.temp_min)}<span>&deg;C</span>/${Math.round(weather.main.temp_max)}<span>&deg;C</span>`
}

function dateBuilder(now)
{
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[now.getDay()];
    let date = now.getDate();
    let month = months[now.getMonth()];

    let year = now.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
