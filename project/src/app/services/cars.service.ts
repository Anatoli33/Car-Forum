// // car.service.ts
// import { Injectable } from '@angular/core';
// import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
// import { Car } from '../interfaces/car.interface.js';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class CarService {
//   private carsCollection = collection(this.firestore, 'cars');

//   constructor(private firestore: Firestore) {}

//   addCar(car: Car) {
//     return addDoc(this.carsCollection, car);
//   }

//   getCars(): Observable<Car[]> {
//     return collectionData(this.carsCollection, { idField: 'id' }) as Observable<Car[]>;
//   }
// }