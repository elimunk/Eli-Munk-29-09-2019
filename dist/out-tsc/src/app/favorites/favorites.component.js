import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { FavoritesService } from '../shared/services/favorites.service';
import { Location } from '@angular/common';
import { WeatherService } from '../shared/services/weather.service';
var FavoritesComponent = /** @class */ (function () {
    function FavoritesComponent(weatherService, favoritesService, location) {
        this.weatherService = weatherService;
        this.favoritesService = favoritesService;
        this.location = location;
        this.currentWeather = new Array();
    }
    FavoritesComponent.prototype.getFavorites = function () {
        this.favoritesCities = this.favoritesService.getLocal();
    };
    FavoritesComponent.prototype.getAllWeathers = function () {
        for (var index = 0; index < this.favoritesCities.length; index++) {
            console.log(this.favoritesCities[index].Key);
            this.currentWeather.push(this.weatherService.getCurrentWeather(this.favoritesCities[index].Key));
            this.isArrayFilled = true;
        }
    };
    FavoritesComponent.prototype.removeFromFavorites = function (city) {
        this.favoritesService.removeFromFavorites(city);
    };
    FavoritesComponent.prototype.backClicked = function () {
        this.location.back();
    };
    FavoritesComponent.prototype.ngOnInit = function () {
        // this.favoritesCities = null;
        this.getFavorites();
        this.getAllWeathers();
        this.countCities = this.favoritesService.getCountItems();
    };
    FavoritesComponent = tslib_1.__decorate([
        Component({
            selector: 'app-favorites',
            templateUrl: './favorites.component.html',
            styleUrls: ['./favorites.component.css']
        }),
        tslib_1.__metadata("design:paramtypes", [WeatherService, FavoritesService, Location])
    ], FavoritesComponent);
    return FavoritesComponent;
}());
export { FavoritesComponent };
//# sourceMappingURL=favorites.component.js.map