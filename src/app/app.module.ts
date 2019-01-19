import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {AutoCompleteModule} from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {PasswordModule} from 'primeng/password';
import {MessageModule} from 'primeng/message';
import {MessagesModule} from 'primeng/messages';
import { TableModule } from 'primeng/table';
import {DialogModule} from 'primeng/dialog';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SuggestionsComponent } from './suggestions/suggestions.component';
import { LocationComponent } from './location/location.component';
import { StationComponent } from './station/station.component';
import { LoginComponent } from './login/login.component';
import { MyStationsComponent } from './my-stations/my-stations.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SuggestionsComponent,
    LocationComponent,
    StationComponent,
    LoginComponent,
    MyStationsComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AutoCompleteModule,
    ButtonModule,
    InputTextModule,
    PasswordModule,
    MessageModule,
    MessagesModule,
    TableModule,
    DialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
