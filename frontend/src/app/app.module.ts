import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {routes} from './app.router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavMainComponent } from './components/nav-main/nav-main.component';
import { HeaderToolboxComponent } from './components/header-toolbox/header-toolbox.component';
import { LoginComponent } from './components/login/login.component';
import {LoginService} from './services/login.service';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomeComponent } from './components/home/home.component';

import { CarouselComponent } from './components/carousel/carousel.component';
import { PetHotelComponent } from './components/pet-hotel/pet-hotel.component';
import { ModalReservationComponent } from './components/modal-reservation/modal-reservation.component';
import { RangeDatePickerComponent } from './components/range-date-picker/range-date-picker.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavMainComponent,
    HeaderToolboxComponent,
    LoginComponent,
    ForgotPasswordComponent,
    HomeComponent,
    CarouselComponent,
    PetHotelComponent,
    ModalReservationComponent,
    RangeDatePickerComponent,
  ],
  imports: [
    BrowserModule,
    routes,
    NgbModule.forRoot()
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
