import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  providers: [WeatherService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  weatherForm! : NgForm;
  isLoading: boolean = false;
  title = 'weather-app';
  weatherData: any = [];
  ResponseError: any = null;
  constructor(private weatherService: WeatherService) {}

  getWeatherData(weatherForm: NgForm) {
    if (weatherForm.valid) {
      this.weatherData = [];
      this.ResponseError = null;
      this.isLoading = true;
      this.weatherService
        .getWeatherData(weatherForm.controls['city'].value)
        .subscribe(
          (data) => {
            this.isLoading = false;
            let currentDate = '';
            for (let record of data.list) {
              const date = new Date(record.dt * 1000).toLocaleDateString();
              if (date !== currentDate) {
                this.weatherData.push({...record, dt_txt:record.dt_txt.split(" ")[0]});
                currentDate = date;
              }
              if (this.weatherData.length >= 5) break;
            }
          },
          (error) => {
            this.isLoading = false;
            this.ResponseError = `No Data available for ${weatherForm.controls['city'].value} try other city Name`;
          }
        );
    } else {
      weatherForm.controls['city'].markAsDirty();
      weatherForm.controls['city'].markAsTouched();
    }

    console.log(weatherForm);
  }
}
