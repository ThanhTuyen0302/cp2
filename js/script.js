const apiKey = 'dcb4408655310436fe109eb555b12e26'; 

// Lấy thông tin thời tiết theo tên thành phố
function getWeatherByCity() {
    const cityInput = document.querySelector('input[type="text"]').value;
    const weatherInfo = document.getElementById('weatherInfo');

    if (cityInput.trim() === '') {
        weatherInfo.innerHTML = `<p style="color: red;">Please enter a city name.</p>`;
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                weatherInfo.innerHTML = `<p style="color: red;">City not found. Please try again.</p>`;
            }
        })
        .catch(() => {
            weatherInfo.innerHTML = `<p style="color: red;">Unable to fetch weather data. Try again later.</p>`;
        });
}

// Lấy thông tin thời tiết theo vị trí thiết bị
function getWeatherByLocation() {
    const weatherInfo = document.getElementById('weatherInfo');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (data.cod === 200) {
                        displayWeather(data);
                    } else {
                        weatherInfo.innerHTML = `<p style="color: red;">Unable to fetch weather data.</p>`;
                    }
                })
                .catch(() => {
                    weatherInfo.innerHTML = `<p style="color: red;">Unable to fetch weather data. Try again later.</p>`;
                });
        }, () => {
            weatherInfo.innerHTML = `<p style="color: red;">Location access denied. Please enable location permissions.</p>`;
        });
    } else {
        weatherInfo.innerHTML = `<p style="color: red;">Geolocation is not supported by this browser.</p>`;
    }
}

// Hiển thị thông tin thời tiết
function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    const { name, main, weather } = data;

    weatherInfo.innerHTML = `
        <h3>${name}</h3>
        <p>Temperature: ${main.temp}°C</p>
        <p>Feels like: ${main.feels_like}°C</p>
        <p>Weather: ${weather[0].description}</p>
    `;
}

// Gắn sự kiện cho các button
document.querySelector('.btn-primary').addEventListener('click', getWeatherByCity);
document.querySelector('.btn-success').addEventListener('click', getWeatherByLocation);
