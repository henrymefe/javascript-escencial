import { BASE_API, API_KEY } from '../utils/constants.js'

export async function getCurrentWeather(lat, lon) {
    const response = await fetch(`${BASE_API}weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`) 
    if (!response.ok) return {
        isError: true,
        data: null
    }

    const data = await response.json()

    return {
        isError: false,
        data: data,
    }

}


function geolocationSupport() {
    // if ('geolocation' in navigator){
    //     return true
    // }
    // return false
    return 'geolocation' in navigator

}