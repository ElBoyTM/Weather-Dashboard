import { Router, type Request, type Response } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const city = req.body.city;
  try {
    const weatherData = await WeatherService.getWeatherForCity(city);
    res.json(weatherData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  // TODO: save city to search history
  try {
    await HistoryService.addCity(city);
  } catch (err) {
    console.log(err);
    console.log('City not saved to search history');
  }
});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
