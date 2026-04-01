import { Component, signal } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../services/auth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';


@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {

  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rePassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;

    return password === rePassword ? null : { mismatch: true };
  }

  async onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { username, email, password } = this.registerForm.value;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        Auth,
        email,
        password
      );

      await updateProfile(userCredential.user, {
        displayName: username
      });

      this.router.navigate(['/']);

    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        this.errorMessage.set('This email is already registered.');
      } else if (err.code === 'auth/weak-password') {
        this.errorMessage.set('Password should be at least 6 characters.');
      } else {
        this.errorMessage.set('Something went wrong.');
      }
    } finally {
      this.isLoading.set(false);
    }
  }
}