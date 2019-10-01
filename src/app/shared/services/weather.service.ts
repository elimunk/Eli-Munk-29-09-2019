import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../models/weather.model';
import { City } from '../models/city.model';
import { FiveDaysForecasts } from '../models/fiveDaysForecasts.model';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  readonly myApiKey: string = "I9N5uqsitJAfTaCO5egA1bqMQ9oh2QSq";
  cityName: string = 'tel aviv';
  isMetricValue: boolean = true;

  constructor(private http: HttpClient) {
    this.isMetricValue = (sessionStorage.getItem("Metric") == 'true');
  }

  public getCityData(cityName: string): Observable<City[]> {
    return this.http.get<City[]>(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${this.myApiKey}&q=${cityName}`);
  }

  public getCurrentWeather(cityKey: string): Observable<Weather[]> {
    return this.http.get<Weather[]>(`https://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${this.myApiKey}`);
  }

  public getFiveDaysOfDailyForecasts(cityKey: string): Observable<FiveDaysForecasts> {
    return this.http.get<FiveDaysForecasts>(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${cityKey}?apikey=${this.myApiKey}&metric=${this.isMetricValue}`);
  }

}
