import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../shared/services/favorites.service';
import { City } from '../shared/models/city.model';
import { Location } from '@angular/common';
import { WeatherService } from '../shared/services/weather.service';
import { Weather } from '../shared/models/weather.model';
import { Router } from '@angular/router';


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

  constructor(private weatherService: WeatherService, private favoritesService: FavoritesService, private location: Location, private router: Router) {
    this.currentWeather = new Array();
    this.isMetricValue = weatherService.isMetricValue;
  }

  public getFavorites() {

    this.favoritesCities = this.favoritesService.getLocal();

    this.favoritesCities.forEach(element => {
      this.weatherService.getCurrentWeather(element.Key).subscribe(res => {
        this.currentWeather.push(res[0]);
      }, err => {
        this.favoritesCities = [];
        alert("Sorry, The service is currently unavailable. \n Please try again later");
      });
    })
    if (this.currentWeather) {
      this.isArrayFilled = true;
    }
  }

  public removeFromFavorites(city: City) {
    this.favoritesService.removeFromFavorites(city);
    this.favoritesCities = this.favoritesService.getLocal();
    this.countOfCities = this.favoritesService.getCountItems();
  }

  public getCuurentCity(city: City) {
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
