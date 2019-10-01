import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../shared/services/favorites.service';
import { City } from '../shared/models/city.model';
import { Location } from '@angular/common';
import { WeatherService } from '../shared/services/weather.service';
import { Weather } from '../shared/models/weather.model';
import { Router } from '@angular/router';
import { handleError } from '../shared/errorsHandler/handleError';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favoritesCities: City[];
  countOfCities: number;
  currentWeather: Weather[];
  isArrayFilled: boolean;
  isMetricValue: boolean;

  constructor(private weatherService: WeatherService, private favoritesService: FavoritesService, private snackBar: MatSnackBar, private location: Location, private router: Router) {
    this.currentWeather = new Array();
    this.isMetricValue = weatherService.isMetricValue;
  }

  getFavorites() {
    this.favoritesCities = this.favoritesService.getLocal();
    let isErrThrown: boolean;
    this.favoritesCities.forEach(element => {
      this.weatherService.getCurrentWeather(element.Key).subscribe(
        res => {
          this.currentWeather.push(res[0]);
          if (this.currentWeather.length == this.favoritesCities.length) {
            this.isArrayFilled = true;
          }
        }, err => {
          this.favoritesCities = [];
          // Here we make sure that the error throws only once
          if (!isErrThrown) {
            new handleError(err, this.snackBar);
            isErrThrown = true;
          }
        });
    })
  }

  removeFromFavorites(city: City) {
    this.favoritesService.removeFromFavorites(city);
    this.favoritesCities = this.favoritesService.getLocal();
    this.countOfCities = this.favoritesService.getCountItems();
  }

  getCuurentCity(city: City) {
    this.weatherService.cityName = city.LocalizedName;
    this.router.navigate(["/home"]);
  }

  backClicked() {
    this.location.back();
  }

  ngOnInit() {
    this.getFavorites();
    this.countOfCities = this.favoritesService.getCountItems();
  }

}
