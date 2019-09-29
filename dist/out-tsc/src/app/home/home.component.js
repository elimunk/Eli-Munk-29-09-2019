import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { WeatherService } from '../shared/services/weather.service';
import { HttpClient } from '@angular/common/http';
import { FavoritesService } from '../shared/services/favorites.service';
import { Router } from '@angular/router';
var HomeComponent = /** @class */ (function () {
    function HomeComponent(weatherService, http, favoritesService, router) {
        this.weatherService = weatherService;
        this.http = http;
        this.favoritesService = favoritesService;
        this.router = router;
        this.apiKey = "I9N5uqsitJAfTaCO5egA1bqMQ9oh2QSq";
        this.currentCity = 'tel aviv';
        // this.city = 
        // {
        //   "Version": 1,
        //   "Key": "215854",
        //   "Type": "City",
        //   "Rank": 31,
        //   "LocalizedName": "Tel Aviv",
        //   "Country": {
        //     "ID": "IL",
        //     "LocalizedName": "Israel"
        //   },
        //   "AdministrativeArea": {
        //     "ID": "TA",
        //     "LocalizedName": "Tel Aviv"
        //   }
        // };
        // this.currentWeather = {
        //   "LocalObservationDateTime": new Date(),
        //   "EpochTime": 1568101800,
        //   "WeatherText": "Partly sunny",
        //   "WeatherIcon": 3,
        //   "HasPrecipitation": false,
        //   "PrecipitationType": null,
        //   "IsDayTime": true,
        //   "Temperature": {
        //     "Metric": {
        //       "Value": 28.4,
        //       "Unit": "C",
        //       "UnitType": 17
        //     },
        //     "Imperial": {
        //       "Value": 83,
        //       "Unit": "F",
        //       "UnitType": 18
        //     }
        //   },
        //   "MobileLink": "http://m.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us",
        //   "Link": "http://www.accuweather.com/en/il/tel-aviv/215854/current-weather/215854?lang=en-us"
        // };
    }
    HomeComponent.prototype.getCity = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                this.weatherService.getCityData(this.currentCity);
                this.city = this.weatherService.wrapper.city;
                this.currentWeather = this.weatherService.wrapper.currentWeather;
                return [2 /*return*/];
            });
        });
    };
    HomeComponent.prototype.addToFavorites = function () {
        this.city = this.weatherService.wrapper.city;
        this.favoritesService.addToFavorites(this.city);
        this.router.navigate(["/favorites"]);
    };
    HomeComponent.prototype.goToFavorites = function () {
        this.router.navigate(["/favorites"]);
    };
    HomeComponent.prototype.removeFromFavorites = function () {
        this.favoritesService.removeFromFavorites(this.city);
    };
    HomeComponent.prototype.ngOnInit = function () {
        this.getCity();
    };
    HomeComponent = tslib_1.__decorate([
        Component({
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [WeatherService, HttpClient, FavoritesService, Router])
    ], HomeComponent);
    return HomeComponent;
}());
export { HomeComponent };
//# sourceMappingURL=home.component.js.map