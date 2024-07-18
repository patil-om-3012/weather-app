async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) return;

    try {
        const response = await fetch(`/weather?city=${city}`);
        if (!response.ok) {
            window.location.href = '/error';
            return;
        }

        const data = await response.json();
        displayWeather(data.weather);
        displayAQI(data.aqi);
        displaySunriseSunset(data.weather);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

async function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
                const response = await fetch(`/weather?lat=${lat}&lon=${lon}`);
                if (!response.ok) {
                    window.location.href = '/error';
                    return;
                }

                const data = await response.json();
                displayWeather(data.weather);
                displayAQI(data.aqi);
                displaySunriseSunset(data.weather);
                displayTravelSuggestions(data.weather);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

function displayWeather(data) {
    document.getElementById('cityName').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('currentWeather').innerText = `Current Temperature: ${data.main.temp}°C, ${data.weather[0].description}`;
}

function displayAQI(data) {
    const aqi = data.list[0].main.aqi;
    let aqiText = '';
    switch (aqi) {
        case 1:
            aqiText = 'Good';
            break;
        case 2:
            aqiText = 'Fair';
            break;
        case 3:
            aqiText = 'Moderate';
            break;
        case 4:
            aqiText = 'Poor';
            break;
        case 5:
            aqiText = 'Very Poor';
            break;
    }
    document.getElementById('aqi').innerText = `Air Quality Index: ${aqiText}`;
}

function displaySunriseSunset(data) {
    const sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    const sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    document.getElementById('sunriseSunset').innerText = `Sunrise: ${sunrise}, Sunset: ${sunset}`;
}
