import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const app = express();
const port = 3000;
const apiKey = 'INSERT_YOUR_API_KEY';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather', async (req, res) => {
    const city = req.query.city;
    if (!city) {
        return res.redirect('/error');
    }

    try {
        const { lat, lon } = weatherData.coord;
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`};
        const airQualityUrl = `https://api.openweathermap.org/data/2.5/air_pollution`;
        const weatherResponse = await fetch(weatherUrl);
        if (weatherResponse.status !== 200) {
            return res.redirect('/error');
        }

        const weatherData = await weatherResponse.json();
       
        const aqiResponse = await fetch(`${airQualityUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const aqiData = await aqiResponse.json();

        res.json({ weather: weatherData, aqi: aqiData });
    } 
    catch (error) {
        console.error('Error fetching weather data:', error);
        res.redirect('/error');
    }
);

app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'error.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
