import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
var FavoritesService = /** @class */ (function () {
    function FavoritesService() {
    }
    FavoritesService.prototype.addToFavorites = function (city) {
        var citiesArray = this.getLocal();
        if (citiesArray == null) {
            citiesArray = [];
        }
        else {
            for (var _i = 0, citiesArray_1 = citiesArray; _i < citiesArray_1.length; _i++) {
                var c = citiesArray_1[_i];
                if (c.Key == city.Key) {
                    return;
                }
            }
        }
        citiesArray.push(city);
        var citiesStr = JSON.stringify(citiesArray);
        localStorage.setItem("cities", citiesStr);
    };
    FavoritesService.prototype.setLocal = function (citiesArray) {
        var citiesStr = JSON.stringify(citiesArray);
        return citiesStr;
    };
    FavoritesService.prototype.getLocal = function () {
        var citiesStr = localStorage.getItem("cities");
        var citiesObj = JSON.parse(citiesStr);
        return citiesObj;
    };
    FavoritesService.prototype.removeFromFavorites = function (city) {
        var citiesArray = this.getLocal();
        var index = citiesArray.indexOf(city);
        citiesArray.splice(index, 1);
        localStorage.setItem("cities", this.setLocal(citiesArray));
    };
    FavoritesService.prototype.isSaved = function (city) {
        var citiesArray = this.getLocal();
        for (var _i = 0, citiesArray_2 = citiesArray; _i < citiesArray_2.length; _i++) {
            var c = citiesArray_2[_i];
            if (c.Key == city.Key) {
                return true;
                ;
            }
            return false;
        }
    };
    FavoritesService.prototype.getCountItems = function () {
        // if null+++
        var citiesArray = this.getLocal();
        return citiesArray.length;
    };
    FavoritesService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [])
    ], FavoritesService);
    return FavoritesService;
}());
export { FavoritesService };
//# sourceMappingURL=favorites.service.js.map