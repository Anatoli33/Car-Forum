import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service.js';

@Component({
  selector: 'app-nav',
  imports: [RouterModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
 constructor(public authService: AuthService) {}

  async logout() {
    await this.authService.logout();
  } 
}
