import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../services/auth.service.js';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  async logout() {
    await this.authService.logout();
    await this.router.navigate(['/'], { replaceUrl: true });
  }
}