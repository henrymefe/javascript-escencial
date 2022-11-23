import currentWeather from './current-weather.js'
import weeklyWeather from './weekly-weather.js'
import { viewportSize } from './utils/viewport.js'
import './tabs.js'

function geolocationSupport() {
    // if ('geolocation' in navigator){
    //     return true
    // }
    // return false
    return 'geolocation' in navigator

}

const $app = document.querySelector('#app')
const $loading = document.querySelector('#loading')

viewportSize($app)
viewportSize($loading)
currentWeather()
weeklyWeather()