import { Component, OnInit } from '@angular/core';
import { Weather } from '../shared/models/weather.model';
import { WeatherService } from '../shared/services/weather.service';
import { City } from '../shared/models/city.model';
import { FavoritesService } from '../shared/services/favorites.service';
import { Router } from '@angular/router';
import { FiveDaysForecasts } from '../shared/models/fiveDaysForecasts.model';
import { handleError } from "../shared/errorsHandler/handleError";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cityName: string;
  city: City;
  currentWeather: Weather;
  fiveDaysForecasts: FiveDaysForecasts;
  isCitySaved: boolean;
  isFiveDays: Boolean;
  unitType: string;
  button: string;
  TemperatureValue: number;

  constructor(private snackBar: MatSnackBar, public weatherService: WeatherService, private favoritesService: FavoritesService, private router: Router) {
    this.cityName = this.weatherService.cityName;
  }

  getCity() {
    this.cityName = this.weatherService.cityName;
    this.weatherService.getCityData(this.cityName).subscribe(
      res => {
        this.city = res[0];
        if (this.city) {
          this.isCitySaved = this.favoritesService.isCitySaved(this.city);
          this.getCurrentWeather();
        } else {
          this.fiveDaysForecasts = null;
          throw new handleError(`The city '${this.cityName}' not found! \n Please try again.`, this.snackBar);
        }
      }, err => {
        throw new handleError(err, this.snackBar);
      });
  }

  getCurrentWeather() {
    this.weatherService.getCurrentWeather(this.city.Key).subscribe(
      res => {
        this.currentWeather = res[0];
        this.changeTemperatureValue();
        this.getFive();
      }, err => {
        this.city = null;
        this.fiveDaysForecasts = null;
        throw new handleError(err, this.snackBar);
      })
  }

  getFive() {
    this.weatherService.getFiveDaysOfDailyForecasts(this.city.Key).subscribe(
      res => {
        this.fiveDaysForecasts = res;
        this.isFiveDays = true;
      }, err => {
        this.currentWeather = null;
        this.city = null;
        this.fiveDaysForecasts = null;
        throw new handleError(err, this.snackBar);
      })
  }

  addToFavorites() {
    this.favoritesService.addToFavorites(this.city);
    this.isCitySaved = this.favoritesService.isCitySaved(this.city);
  }

  goToFavorites() {
    this.router.navigate(["/favorites"]);
  }

  removeFromFavorites() {
    this.favoritesService.removeFromFavorites(this.city);
    this.isCitySaved = this.favoritesService.isCitySaved(this.city);
  }

  changeUnitType() {
    this.weatherService.isMetricValue = !this.weatherService.isMetricValue;
    this.changeTemperatureValue();
  }

  changeTemperatureValue() {
    if (this.weatherService.isMetricValue) {
      this.TemperatureValue = this.currentWeather.Temperature.Metric.Value;
      this.unitType = '℃';
      this.button = 'Fahrenheit';
      sessionStorage.setItem("Metric", "true");
      this.getFive();
    } else {
      this.TemperatureValue = this.currentWeather.Temperature.Imperial.Value;
      this.unitType = '℉';
      this.button = 'Celsius';
      sessionStorage.setItem("Metric", "false");
      this.getFive();
    }
  }

  ngOnInit() {
    this.getCity();
    this.isCitySaved = this.favoritesService.isCitySaved(this.city);
  }

}
