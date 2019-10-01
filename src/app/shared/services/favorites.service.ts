import { Injectable } from '@angular/core';
import { City } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor() { }

  public addToFavorites(city: City) {
    let citiesArray = this.getLocal();
    if (citiesArray == null) {
      citiesArray = [];
    }
    else {
      for (let c of citiesArray) {
        if (c.Key == city.Key) {
          return;
        }
      }
    }
    citiesArray.push(city);
    let citiesStr = JSON.stringify(citiesArray);
    localStorage.setItem("cities", citiesStr);
  }

  public setLocal(citiesArray: City[]) {
    let citiesStr = JSON.stringify(citiesArray);
    return citiesStr;
  }

  public getLocal() {
    let citiesStr = localStorage.getItem("cities");
    let citiesObj = <City[]>JSON.parse(citiesStr);
    return citiesObj;
  }

  public removeFromFavorites(city: City) {
    let citiesArray = this.getLocal();
    let index = citiesArray.findIndex(item => item.Key === city.Key);
    citiesArray.splice(index, 1);
    localStorage.setItem("cities", this.setLocal(citiesArray));
  }

  public getCountItems(): number {
    let citiesArray = this.getLocal();
    if (citiesArray) {
      return citiesArray.length;
    }
    else return 0;
  }

  public isCitySaved(city: City): boolean {
    let citiesArray = this.getLocal();
    if (citiesArray) {
      for (let c of citiesArray) {
        if (c.Key == city.Key) {
          return true;
        }
      }
    } else return false;
  }

}
