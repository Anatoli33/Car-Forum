import { Routes } from '@angular/router';
import { Home } from './home/home.js';
import { Feed } from './feed/feed.js';
import { Login } from './login/login.js';
import { NotFound } from './not-found/not-found.js';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'feed', component: Feed, canActivate: [authGuard],},
    {path: 'login', component: Login},
    {path: '**', component: NotFound},
];
