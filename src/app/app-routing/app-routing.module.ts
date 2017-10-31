import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from '../main/main.component';
import {ProfileComponent} from '../profile/profile.component';
import {LandingComponent} from '../landing/landing.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/landing', pathMatch: 'full'},
  {path: 'landing', component: LandingComponent},
  {path: 'main', component: MainComponent},
  {path: 'profile', component: ProfileComponent},
];


@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
    ),
    CommonModule
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
