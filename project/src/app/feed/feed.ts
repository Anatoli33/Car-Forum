import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarsService } from '../services/cars.service';
import { Car } from '../interfaces/car.interface';

@Component({
  selector: 'app-feed',
  imports: [],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed {
    cars: Car[] = [];

    constructor(private carsService: CarsService){
      this.cars = this.carsService.getAllCars();
    }
}
