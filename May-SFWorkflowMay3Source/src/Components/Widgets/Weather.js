import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import classNames from 'classnames';

// function to get today weather icon
function getIcon(id) {
    if (id >= 200 && id < 300) {
        return 'wi wi-night-showers'
    } else if (id >= 300 && id < 500) {
        return 'wi day-sleet'
    } else if (id >= 500 && id < 600) {
        return 'wi wi-night-showers'
    } else if (id >= 600 && id < 700) {
        return 'wi wi-day-snow'
    } else if (id >= 700 && id < 800) {
        return 'wi wi-day-fog'
    } else if (id === 800) {
        return 'wi wi-day-sunny'
    } else if (id >= 801 && id < 803) {
        return 'wi wi-night-partly-cloudy'
    } else if (id >= 802 && id < 900) {
        return 'wi wi-day-cloudy'
    } else if (id === 905 || (id >= 951 && id <= 956)) {
        return 'wi wi-day-windy'
    } else if (id >= 900 && id < 1000) {
        return 'wi wi-night-showers'
    }
}

// Main component
function WeatherWidget() {
   const [city,setCity] = useState(false);
   const [countryCode, setCountryCode] = useState(false);
   const [todayTemp, setTodayTemp] = useState(false);
   const [todayTempText, setTodayTempText] = useState(false);
   const [todayWeatherIcon, setTodayWeatherIcon] = useState('');
   const currentTime = moment().format('hh:mm A');

   useEffect(() => {
      var appid = 'b1b15e88fa797225412429c1c50c122a1'; // Your api id
      var apikey = '69b72ed255ce5efad910bd946685883a'; //Your apikey
      var city = 'Mohali'; // city name
      axios.get('https://api.openweathermap.org/data/2.5/forecast/daily?q=' + city + '&cnt=6&units=metric&mode=json&appid=' + appid + '&apikey=' + apikey)
         .then(response => {
            setCity(response.data.city.name);
            setCountryCode(response.data.city.country);
            setTodayTemp(response.data.list[0].temp.max);
            setTodayTempText(response.data.list[0].weather[0].main);
            setTodayWeatherIcon(getIcon(response.data.list[0].weather[0].id));
         })
         .catch(error => {
            console.log('Error fetching and parsing data', error);
         });
   },[])
   
   return (
      <div className="card rct-weather-widget text-white text-center p-0">
         <div className="black-overlay p-20 align-items-center d-flex justify-content-center">
            <div className="d-flex justify-content-start">
               <i className={classNames(todayWeatherIcon, 'font-4x mr-20')}></i>
               <div className="weather-content">
                  <h3 className="mb-5">{city} ({countryCode})</h3>
                  <h4 className="mb-5 dayTime">{todayTempText} {currentTime}</h4>
                  <h2>{todayTemp} {todayTempText}</h2>
               </div>
            </div>
         </div>
      </div>
   )
}

export default WeatherWidget;
