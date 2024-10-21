import dotenv from 'dotenv';
dotenv.config();

// DONE: Define an interface for the Coordinates object
interface Coordinates {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}
// DONE: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  temperature: number;
  humidity: number;
  wind: number;

  constructor(
    city: string,
    date: string,
    icon: string,
    iconDescription: string,
    temperature: number,
    humidity: number,
    wind: number,
  ) {
    this.city = city;
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
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {}
}

export default new WeatherService();
