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
import {NgbActiveModal, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {IsLoggedInService} from './services/is-logged-in.service';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SharedData } from 'src/app/services/sharedData.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CookieService } from 'angular2-cookie/services/cookies.service';
import { DaycareComponent } from './components/daycare/daycare.component';
import { ModalUserDataComponent } from './components/modal-user-data/modal-user-data.component';



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
    DaycareComponent,
    ModalUserDataComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    routes,
    NgbModule.forRoot(),
    HttpClientModule,
    HttpModule,
  ],
  providers: [LoginService, IsLoggedInService, SharedData, CookieService, NgbActiveModal],
  bootstrap: [AppComponent],
  entryComponents: [ModalReservationComponent, ModalUserDataComponent]
})
export class AppModule { }
