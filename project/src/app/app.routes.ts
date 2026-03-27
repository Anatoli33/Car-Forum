import { Routes } from '@angular/router';
import { Home } from './home/home.js';
import { Feed } from './feed/feed.js';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'feed', component: Feed},
];
