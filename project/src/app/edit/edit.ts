import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { getCarById, updateCar } from '../services/cars';
import { Car } from '../interfaces/car.interface';

@Component({
  selector: 'app-edit-car',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class EditCarComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  carId!: string;
  editForm: FormGroup;
  currentYear = new Date().getFullYear();

  constructor() {
    this.editForm = this.fb.group({
      brand: ['', [Validators.required, Validators.minLength(2)]],
      model: ['', [Validators.required]],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(this.currentYear)]],
      image: ['', [Validators.required, Validators.pattern(/^https?:\/\/.+/)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      tags: [''],
    });
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.router.navigate(['/feed']);
      return;
    }

    this.carId = id;

    try {
      const data = await getCarById(this.carId);

      if (!data) {
        this.router.navigate(['/feed']);
        return;
      }

      this.editForm.patchValue({
        brand: data.brand,
        model: data.model,
        year: data.year,
        image: data.image,
        description: data.description,
        tags: data.tags ? data.tags.join(', ') : ''
      });

      this.cdr.detectChanges(); 
      
    } catch (error) {
      console.error('Error loading car:', error);
      this.router.navigate(['/']);
    }
  }

  async onSubmit() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const formValue = this.editForm.value;
    const updatedCar: Partial<Car> = {
      brand: formValue.brand.trim(),
      model: formValue.model.trim(),
      year: Number(formValue.year),
      image: formValue.image.trim(),
      description: formValue.description.trim(),
      tags: formValue.tags ? formValue.tags.split(',').map((t: string) => t.trim()) : [],
    };

    try {
      await updateCar(this.carId, updatedCar);
      alert('Changes saved successfully!');
      this.router.navigate(['/feed']);
    } catch (error) {
      console.error('Error updating car:', error);
      alert('Failed to save changes. Please try again.');
    }
  }
}