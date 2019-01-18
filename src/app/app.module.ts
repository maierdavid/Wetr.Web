import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

import {AutoCompleteModule} from 'primeng/autocomplete';
import { LocationClient } from '../restclient/restclient';
import { ButtonModule } from 'primeng/button';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { LocationComponent } from './location/location.component';
import { StationComponent } from './station/station.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SuggestionsComponent,
    LocationComponent,
    StationComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    ButtonModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
