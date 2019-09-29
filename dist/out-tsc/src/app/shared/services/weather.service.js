import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var WeatherService = /** @class */ (function () {
    function WeatherService(http) {
        this.http = http;
        this.apiKey = "I9N5uqsitJAfTaCO5egA1bqMQ9oh2QSq";
        this.wrapper = {
            city: null,
            currentWeather: null,
            fiveDaysWeather: null
        };
    }
    WeatherService.prototype.getCityData = function (cityName) {
        var _this = this;
        var observable = this.http.get("http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=" + this.apiKey + "&q=" + cityName);
        observable.subscribe(function (res) {
            _this.wrapper.city = res[0];
            _this.getCurrentWeather(_this.wrapper.city.Key);
            _this.getFiveDaysOfDailyForecasts(_this.wrapper.city.Key);
        }, function (err) {
            alert("Sorry" + err.message);
        });
        return;
    };
    WeatherService.prototype.getCurrentWeather = function (cityKey) {
        var _this = this;
        var observable = this.http.get("http://dataservice.accuweather.com/currentconditions/v1/" + cityKey + "?apikey=" + this.apiKey);
        observable.subscribe(function (res) {
            _this.wrapper.currentWeather = res[0];
        }, function (err) {
            alert("Sorry" + err.message);
        });
        return this.wrapper.currentWeather;
    };
    WeatherService.prototype.getFiveDaysOfDailyForecasts = function (cityKey) {
        var _this = this;
        var observable = this.http.get("http://dataservice.accuweather.com/forecasts/v1/daily/5day/" + cityKey + "?apikey=" + this.apiKey);
        observable.subscribe(function (res) {
            _this.wrapper.fiveDaysWeather = res;
            console.log(_this.wrapper.fiveDaysWeather);
            return res;
        }, function (err) {
            alert(" " + err.message);
        });
        return;
    };
    WeatherService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], WeatherService);
    return WeatherService;
}());
export { WeatherService };
//# sourceMappingURL=weather.service.js.map