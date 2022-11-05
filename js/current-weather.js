// import weather from '../data/current-weather.js'
import { formatDate, formatTemp } from './utils/format-data.js'
import { weatherConditionsCodes } from './utils/constants.js'
import { getLatLon } from './utils/geolocation.js'
import { getCurrentWeather } from './services/weather.js'



function setCurrentCity($el, city) {
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

function solarStatus(sunriseTime, sunsetTime) {
    const currentHours = new Date().getHours()
    const sunsetHours = sunsetTime.getHours()
    const sunriseHours = sunriseTime.getHours()
    if (currentHours > sunsetHours || currentHours < sunriseHours) {
     return 'night'   
    }
    return 'morning'        
}

function setBackground($el, conditionCode, solarStatus) {
    const weatherType = weatherConditionsCodes[conditionCode]
    const size = window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches ? '@2x' : ''
    // if (window.matchMedia('(-webkit-min-device-pixel-ratio: 2)').matches) {
    //     size = '@2x'
    // }
    $el.style.backgroundImage =`url(./images/${solarStatus}-${weatherType}${size}.jpg)`

}



function configCurrentWeather(weather) {
    //loader
    //Date
    const $currentWeatherDate = document.querySelector('#current-weather-date')
    setCurrentDate($currentWeatherDate)
    //City
    const $currentWeatherCity = document.querySelector('#current-weather-city')
    const city = weather.name
    setCurrentCity($currentWeatherCity, city)
    //Temp
    const $currentWeatherTemp = document.querySelector('#current-weather-temp')
    const temp = weather.main.temp
    setCurrentTemp($currentWeatherTemp, temp)
    //Background
    const sunriseTime = new Date(weather.sys.sunrise * 1000)
    const sunsetTime = new Date(weather.sys.sunset * 1000)
    const $app = document.querySelector('#app')
    const conditionCode = String(weather.weather[0].id).charAt(0)
    setBackground($app, conditionCode, solarStatus(sunriseTime, sunsetTime))

}

export default async function currentWeather() {
    // GEO 
        const { lat, lon, isError } = await getLatLon()
        if (isError) return console.log('A ocurrido un error ubicandote')
        console.log(lat, lon)

    

    //  .then((data) => {
    //     console.log('hemos triunfado', data)
    //  })
    //  .catch((message) => {
    //     console.log(message)


    //  })

    // API - weather 
    const { isError: currentWeatherError, data: weather } = await getCurrentWeather()
    if (currentWeatherError) return console.log('oh! a ocurrido un error')
    configCurrentWeather(weather)

}
// }
console.log('hola current')

