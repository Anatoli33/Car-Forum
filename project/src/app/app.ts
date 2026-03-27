import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from './home/home.js';
import { Nav } from './nav/nav.js';
import { Feed } from './feed/feed.js';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Nav, Feed],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('project');
}
