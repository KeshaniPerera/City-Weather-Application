import '../styles/weather.css';
import { useState, useEffect } from 'react';

export const WeatherDetails = () => {
  const [city, setCity] = useState('Colombo'); 
  const [weatherData, setWeatherData] = useState({});
  const [image, setImage] = useState('');
  const [cityAvailability, setCityAvailability] = useState(true);

  const myApi = 'b229ffef018d8583ca8dfd59da9793a9'; 


  const search = async () => {
    if (!city) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${myApi}&units=metric`
      );
      const data = await response.json();
      console.log(data);
      
      if (data.cod === '404' || data.cod === 404) {
        setCityAvailability(false);
        return;
      } else {
        setCityAvailability(true); 
      }

      setWeatherData({
        country: data.sys.country,
        city: data.name,
        temperature: data.main.temp,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: data.weather[0].icon, 
      });

      setImage(data.weather[0].icon.slice(0, -1) + '.png'); 
      console.log(image);

    } catch (error) {
      console.error('Error fetching weather data:', error);
    }



  };

  useEffect(() => {
    try {
      search();
      
    } catch (error) {
      
    }

  }, []); 
  

  return (
    <div className="background">
      <div className="search-bar">
        <input
          type="search"
          placeholder="Enter city name"
          value={city}
          onChange={(event) => setCity(event.target.value)} 
        />
        <div className='search-button'>
        <button onClick={search} id="search">
          <img src="search.png" width="20px" height="20px" alt="Search" />
        </button>
        </div>
       <div className='city-availability'>
        {cityAvailability === false && <p id="city-not-found">Sorry, City Not Found</p>}
        </div>
      </div>
      <div className='weather-background'>
        <div className="weather-icon">
     
          <img src={image} id="icon" alt="Weather Icon" />
        </div>
        <div className="temperature-city-name">
          <h2 style={{}}>{weatherData.temperature}°C</h2>
          <h2 style={{fontSize:"20px"}}>{weatherData.city}, {weatherData.country}</h2>
        </div>
        <div className="humidity-wind-speed">
          <div className='humidity'>
            <div className='icon'>
              <img src="humidity.png" width="50px" height="50px"/>
            </div>
            <div className="humidity-speed-text">
            <h6 style={{fontSize: "18px", fontWeight:"bold"}}>{weatherData.humidity} %</h6>
          <h6 style={{fontSize:"13px"}}> Humidity</h6>
          </div>
          </div>
          <div class = "wind-speed">
          <div className='icon'>
              <img src="wind_speed.png" width="50px" height="50px"/>
            </div>
            <div className="humidity-speed-text">
          <h6 style={{fontSize: "18px", fontWeight:"bold"}}>{weatherData.windSpeed} m/s</h6>
          <h6 style={{fontSize:"13px"}}>Wind Speed</h6>
          </div>
          </div> 
        </div>
      </div>
   
    </div>
  );
};
