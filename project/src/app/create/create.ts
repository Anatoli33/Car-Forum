import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { addCar } from '../services/cars.js';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class Create {
  createForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.createForm = this.fb.group({
      brand: ['', [Validators.required, Validators.minLength(2)]],
      model: ['', [Validators.required, Validators.minLength(1)]],
      year: [
        '',
        [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())],
      ],
      image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  async onCreate() {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      return;
    }

    const carData = this.createForm.value;

    try {
      await addCar(carData);
      console.log('Car added to Firebase:', carData);
      this.createForm.reset();
      alert('Car successfully added!');
    } catch (err) {
      console.error('Error adding car:', err);
      alert('Failed to add car. Check console for details.');
    }
  }
}
