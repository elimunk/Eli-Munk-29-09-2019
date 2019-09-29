import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
var CityDataService = /** @class */ (function () {
    function CityDataService(http) {
        this.http = http;
        this.city = null;
        this.apiKey = "I9N5uqsitJAfTaCO5egA1bqMQ9oh2QSq";
    }
    CityDataService.prototype.getCityData = function (cityName) {
        var _this = this;
        var observable = this.http.get("http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=" + this.apiKey + "&q=" + cityName);
        observable.subscribe(function (res) {
            _this.city = res[0];
            alert(_this.city.Key);
        }, function (err) {
            alert("Login failed ! Error: \n" + err.status + "\n Message: " + err.error.message);
        });
        return this.city;
    };
    CityDataService = tslib_1.__decorate([
        Injectable({
            providedIn: 'root'
        }),
        tslib_1.__metadata("design:paramtypes", [HttpClient])
    ], CityDataService);
    return CityDataService;
}());
export { CityDataService };
//# sourceMappingURL=city-data.service.js.map