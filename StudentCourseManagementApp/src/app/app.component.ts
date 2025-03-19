import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherforecastService } from './weatherforecast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StudentCourseManagementApp';

  // weatherForecasts:any[]=[];
  // weatherForeCastService= inject(WeatherforecastService);

  // constructor(){
  //  this.weatherForeCastService.get().subscribe(weatherForecasts=>{
  //    this.weatherForecasts=weatherForecasts;
  //  })
  // }

  
}
