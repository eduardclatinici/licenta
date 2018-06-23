import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PetHotelComponent } from './components/pet-hotel/pet-hotel.component';

import {IsLoggedInService} from './services/is-logged-in.service'
import {DaycareComponent} from './components/daycare/daycare.component';
import {ModalUserDataComponent} from './components/modal-user-data/modal-user-data.component';


export const router: Routes = [
    {path: 'home',component: HomeComponent },

    {path: 'pet-hotel', component: PetHotelComponent},
    {path: 'daycare', component: DaycareComponent},

    {path: '**', redirectTo: 'home'},
    {path: '' , redirectTo: 'home', pathMatch: 'full'},
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
