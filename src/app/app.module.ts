import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';


import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HttpClientModule } from "@angular/common/http";

import {NgxTypedJsModule} from 'ngx-typed-js';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MapComponent } from './map/map.component';
import { MapPopupComponent } from './map-popup/map-popup.component';
import { FeaturesComponent } from './features/features.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    TestimonialComponent,
    RegistrationComponent,
    LoginComponent,
    RegisterComponent,
    MapComponent,
    MapPopupComponent,
    FeaturesComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatToolbarModule,
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    NgxTypedJsModule,
    MatProgressSpinnerModule,
    NgbModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MapPopupComponent]
})
export class AppModule { }
