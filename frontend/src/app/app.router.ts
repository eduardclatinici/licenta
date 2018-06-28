import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {PetHotelComponent} from './components/pet-hotel/pet-hotel.component';

import {DaycareComponent} from './components/daycare/daycare.component';
import {TasksComponent} from "./components/tasks/tasks.component";


export const router: Routes = [
    {path: 'home',component: HomeComponent },

    {path: 'pet-hotel', component: PetHotelComponent},
    {path: 'daycare', component: DaycareComponent},
    {path: 'tasks', component: TasksComponent},

    {path: '**', redirectTo: 'home'},
    {path: '' , redirectTo: 'home', pathMatch: 'full'},
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
