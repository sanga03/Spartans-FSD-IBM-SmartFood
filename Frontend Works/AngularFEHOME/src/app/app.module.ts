import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AnimSliderComponent } from './anim-slider/anim-slider.component';
import { SignComponent } from './sign/sign.component';
import {FormsModule,ReactiveFormsModule} from "@angular/forms";
import { CustomerProfileComponent } from './customer-profile/customer-profile.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RegisterComponent } from './register/register.component';
import { VerifyOtpComponent } from './verify-otp/verify-otp.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatAutocompleteModule,MatInputModule, MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatSelectModule, MatIconModule} from '@angular/material';

import { RestaurantComponent } from './restaurant/restaurant.component';
import { SortCriteriaComponent } from './sort-criteria/sort-criteria.component';
import { SelectAutocompleteModule } from 'mat-select-autocomplete';
 


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,
    AnimSliderComponent,
    SignComponent,
    CustomerProfileComponent,
    AboutUsComponent,
    RegisterComponent,
    VerifyOtpComponent,

    RestaurantComponent,
    SortCriteriaComponent

  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    SelectAutocompleteModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
