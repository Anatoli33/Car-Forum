import { Component, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { getCarById } from '../services/cars';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-car-details',
  imports:[DatePipe, RouterModule],
  templateUrl: './details.html',
  styleUrl: './details.css',
})

export class CarDetails implements OnInit {
  car = signal<any>(null);

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      const data = await getCarById(id);
      this.car.set(data);
    }
  }
}