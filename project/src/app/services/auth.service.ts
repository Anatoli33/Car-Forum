import { Injectable, signal } from '@angular/core';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { Auth } from './auth.js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = signal<User | null>(null);

  constructor() {
    onAuthStateChanged(Auth, (user) => {
      this.currentUser.set(user);
    });
  }

  logout() {
    return signOut(Auth);
  }
}