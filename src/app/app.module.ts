import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { MainComponent } from './main/main.component';
import { ProfileComponent } from './profile/profile.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import {NavService} from './main/nav.service';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    MainComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
  ],
  providers: [
    CookieService,
    NavService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
