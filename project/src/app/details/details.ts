import { Component, OnInit } from '@angular/core';
import { Car } from '../interfaces/car.interface.js';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details implements OnInit{
  car: Car | undefined;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.car = this.route.snapshot.data['car'];
  }

}
