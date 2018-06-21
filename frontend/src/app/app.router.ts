import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PetHotelComponent } from './components/pet-hotel/pet-hotel.component';
import {LoginComponent} from './components/login/login.component'

import {IsLoggedInService} from './services/is-logged-in.service'
import {DaycareComponent} from './components/daycare/daycare.component';


export const router: Routes = [
    {path: 'home',component: HomeComponent },

    {path: 'pet-hotel', component: PetHotelComponent},
    {path: 'daycare', component: DaycareComponent},
    {path: 'login',component: LoginComponent, canActivate: [IsLoggedInService]},

    {path: '**', redirectTo: 'home'},
    {path: '' , redirectTo: 'home', pathMatch: 'full'},
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
