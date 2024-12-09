import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private apiKey = '1635890035cbba097fd5c26c8ea672a1'; 
  private apiUrl = 'https://api.openweathermap.org/data/2.5/forecast';

  constructor(private http: HttpClient) {}


  getWeatherData(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&units=metric&cnt=40&appid=${this.apiKey}`;
    return this.http.get(url);
  }
}
