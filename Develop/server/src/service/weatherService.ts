import dotenv from 'dotenv';
dotenv.config();

// DONE: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// DONE: Define a class for the Weather object
class Weather {
  city: string;
  cityID: string;
  date: string;
  icon: string;
  iconDescription: string;
  temperature: number;
  humidity: number;
  wind: number;

  constructor(
    city: string,
    cityID: string,
    date: string,
    icon: string,
    iconDescription: string,
    temperature: number,
    humidity: number,
    wind: number,
  ) {
    this.city = city;
    this.cityID = cityID;
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription
    this.temperature = temperature;
    this.humidity = humidity;
    this.wind = wind;
  }
};
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  baseURL?: string;
  APIKey?: string;
  cityName?: string;

  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';
    this.APIKey = process.env.API_KEY || '';
    this.cityName = '';
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      const response = await fetch(`${this.baseURL}/data/2.5/forecast?lat={lat}&appid=${this.APIKey}`);
      const locationData = await response.json();
      return locationData;
    } catch (error) {
      console.log('Error:', error);
      return '';
    }
   }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const {lat, lon} = locationData;
    return {lat, lon};
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    return `${this.baseURL}/geo/1.0/direct?q=${encodeURIComponent(this.cityName!)}&limit=1&appid=${this.APIKey}`;
  }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.APIKey}&units=imperial`;
  }
  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    try {
      const geocodeURL = this.buildGeocodeQuery();
      const locationData = await this.fetchLocationData(geocodeURL);
      const coordinates = this.destructureLocationData(locationData);
      return coordinates;
    } catch (err) {
      console.log('Error');
      console.log(err);
    }
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const weatherQuery = this.buildWeatherQuery(coordinates);
    const response = await fetch(weatherQuery);
    if (!response.ok) {
      return `Failed to fetch weather data for ${this.cityName}`;
    }
    const data = await response.json();
    return data;
  }
  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any) {
    const city = response.city.name;
    const cityID = response.city.id;
    const date = new Date(response.list[0].dt = 1000).toLocaleDateString();
    const icon = response.list[0].weather[0].icon;
    const iconDescription = response.list[0].weather[0].description;
    const tempF = response.list[0].main.temp;
    const windSpeed = response.list[0].wind.speed;
    const humidity = response.list[0].main.humidity;

    return new Weather(city, cityID, date, icon, iconDescription, tempF, windSpeed, humidity);
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray = [];
    const today = new Date().toLocaleDateString();

    for (let i = 0; i < weatherData.length; i += 7) {
      const date = new Date(weatherData[i].dt = 1000).toLocaleDateString();

      if (date === today) continue;

      const icon = weatherData[i].weather[0].icon;
      const iconDescription =weatherData[i].weather[0].description;
      const tempF = weatherData[i].main.temp;
      const windSpeed = weatherData[i].wind.speed;
      const humidity = weatherData[i].main.humidity;

      forecastArray.push({
        date,
        icon,
        iconDescription,
        tempF,
        windSpeed,
        humidity,
      })
    }

    return forecastArray;
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData.list);
    const completeWeather = [currentWeather, ...forecastArray];
    return completeWeather;
  }
}

export default new WeatherService();
