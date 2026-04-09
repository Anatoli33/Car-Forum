import { Injectable, signal, computed } from '@angular/core';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { Auth } from './auth.js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _currentUser = signal<User | null | undefined>(undefined);
  
  currentUser = computed(() => this._currentUser());

  constructor() {
    onAuthStateChanged(Auth, (user) => {
      this._currentUser.set(user);
    });
  }

  logout() {
    return signOut(Auth);
  }
}