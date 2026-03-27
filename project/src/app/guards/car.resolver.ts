import { inject } from "@angular/core"
import { ResolveFn } from "@angular/router"
import { Car } from "../interfaces/car.interface.js";
import { CarsService } from "../services/cars.service.js";

export const carResolver: ResolveFn<Car | undefined> = (route, state) => {
    const carsService = inject(CarsService);

    const idParam = route.paramMap.get('id');
    const carId = idParam ? parseInt(idParam, 10) : 0;

    return carsService.getCarById(carId);
}