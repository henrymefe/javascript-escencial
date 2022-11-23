// import weather from '../data/current-weather.js'
import { formatDate, formatTemp } from './utils/format-data.js'
import { weatherConditionsCode } from './constants.js'
import { getLatLon } from './geolocation.js'
import { getCurrentWeather } from './services/weather.js'



// weatherConditionsCode[]
// API KEY: c54d58ded2c7efdef298cba8d44e9324
// API CALL : https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// API MAIN: https://api.openweathermap.org/data/2.5/weather?lat=20.62302452175294&lon=-103.32232123397506&appid=c54d58ded2c7efdef298cba8d44e9324




function setCurrentCity($el, city ) {
    $el.textContent = city
}


function setCurrentDate($el) {
    const date = new Date()
    const formattedDate = formatDate(date)
    $el.textContent = formattedDate
    
}

function setCurrentTemp($el, temp) {
    $el.textContent = formatTemp(temp)
     
}

function solarStatus(sunsetTime, sunriseTime) {
    const currentHours = new Date().getHours()
    const sunsetHours = sunsetTime.getHours()
    const sunriseHours = sunriseTime.getHours()

    if (currentHours > sunsetHours || currentHours < sunriseHours) {
        return 'night'  
    }
    return 'morning'
}

function setBackground($el, conditionCode, solarStatus) {
    const weatherType = weatherConditionsCode[conditionCode]
    const size = window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches ? '@2x' : ''
   
    $el.style.backgroundImage = `url(./images/${solarStatus}-${weatherType}${size}.jpg)`

}

function showCurrentWeather($app, $loader) {
    $app.hidden = false
    $loader.hidden = true
}

function configCurrentWeather(weather) {
    const $app = document.querySelector('#app')
    const $loading = document.querySelector('#loading')

    //loader
    showCurrentWeather($app, $loading)
    //date
    const $currentWeatherDate = document.querySelector('#current-weather-date')
    setCurrentDate($currentWeatherDate)
    //city
    const $currentWeatherCity = document.querySelector('#current-weather-city')
    const city = weather.name
    setCurrentCity($currentWeatherCity, city)
    //temp
    const $currentWeatherTemp = document.querySelector('#current-weather-temp')
    const temp = weather.main.temp
    setCurrentTemp($currentWeatherTemp, temp)
    //background
    const sunriseTime = new Date(weather.sys.sunrise * 1000)
    const sunsetTime = new Date(weather.sys.sunset * 1000)
    // const $app = document.querySelector('#app')
    const conditionCode = String(weather.weather[0].id).charAt(0)
    setBackground($app, conditionCode, solarStatus(sunriseTime, sunsetTime))

}

export default async function currentWeather() {
    // geo // api - weather // config 
        const { lat, lon, isError } = await getLatLon()
        if (isError) return console.log('Ah ocurrido un error ubicandote')
        console.log(lat, lon)
   
    // getCurrentPosition()
    // .then((data) => {
    //     console.log('hemos triunfado', data)
    // })
    // .catch((message) => {
    //     console.log(message)

    // })
    const { isError: currentWeathetError, data: weather } = await getCurrentWeather(lat, lon)
    if(currentWeathetError) return console.log('oh! a ocurrido un error trayendo los datos del clima')
    configCurrentWeather(weather)
    console.log(weather)


}