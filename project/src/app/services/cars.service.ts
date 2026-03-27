import { Injectable } from '@angular/core';
import { Car } from '../interfaces/car.interface';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private cars: Car[] = [
 {
      "id": "1",
      "brand": "BMW",
      "model": "330d",
      "year": 2015,
      "description": "Stage 1, 300hp",
      "image": "https://www.mosselmanturbo.com/uploads/cars/detail_default/1200x675/bmw-328i-f30-f31-245hp.jpeg"
    },
    {
      "id": "2",
      "brand": "Volkswagen",
      "model": "Golf 5",
      "year": 2007,
      "description": "Clean daily build",
      "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/2007_Volkswagen_Golf_%281K_MY07%29_Sportline_2.0_TDI_5-door_hatchback_%282010-07-05%29.jpg/1280px-2007_Volkswagen_Golf_%281K_MY07%29_Sportline_2.0_TDI_5-door_hatchback_%282010-07-05%29.jpg"
    },
    {
      "id": "3",
      "brand": "Mercedes-Benz",
      "model": "C63 AMG",
      "year": 2013,
      "description": "V8 power",
      "image": "https://hips.hearstapps.com/hmg-prod/images/2023-mercedes-amg-c63-s-e-performance-118-65d7969b525e3.jpg?crop=0.742xw:0.628xh;0.207xw,0.204xh&resize=2048:*"
    },
    {
      "id": "4",
      "brand": "Audi",
      "model": "A4",
      "year": 2012,
      "description": "S-line, daily driver",
      "image": "https://www.auto-data.net/images/f85/Audi-A4-B8-8K.jpg"

    }
  ];

  getAllCars(): Car[] {
    return this.cars;
  }

}