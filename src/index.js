import './styles.css'

function createWeatherForm() {
    // Create form, input, and button elements
    const form = document.createElement('form')
    const input = document.createElement('input')
    const button = document.createElement('button')

    // Set attributes and text for input and button elements
    input.type = 'text'
    input.placeholder = 'Enter location'
    button.type = 'submit'
    button.textContent = 'Get Weather'

    // Append input and button to form
    form.appendChild(input)
    form.appendChild(button)

    // Add event listener to form
    form.addEventListener('submit', (event) => {
        // Prevent the form from submitting
        event.preventDefault()

        // Get the input value and call the updateWeather function
        const inputValue = input.value.trim()
        if (inputValue) {
            updateWeather(inputValue)
        }
    })

    return form
}

// Get the content div and append the form to it
const contentDiv = document.querySelector('.content')
contentDiv.appendChild(createWeatherForm())

async function fetchWeather(location) {
    const apiKey = 'a926de9b83ee4630aa4133517232403'
    const url = `https://api.weatherapi.com/v1/current.json?q=${location}&key=${apiKey}`

    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.statusText}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        return null
    }
}

async function updateWeather(input) {
    const weatherData = await fetchWeather(input)
    if (weatherData) {
        console.log(weatherData)
        const weatherInfo = `
            Location: ${weatherData.location.name}, ${weatherData.location.country}
            Temperature: ${weatherData.current.feelslike_c}°C
            Weather: ${weatherData.current.condition.text}
            Weather: ${weatherData.current.condition.icon}
        `
        const weatherDiv = document.createElement('div')
        weatherDiv.textContent = weatherInfo
        contentDiv.appendChild(weatherDiv)
    }
}
