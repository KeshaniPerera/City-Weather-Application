import logo from './logo.svg';
import './App.css';
import {WeatherDetails} from './components/weather'

function App() {
  return (
    <div className="App">
        <div className='weather-container'>
      <h1> City Weather Forecast</h1>
    < WeatherDetails/>
    </div>
    </div>
  
  );
}

export default App;
