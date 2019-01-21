import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/home/home.component'
import { LocationComponent } from '../app/location/location.component'
import { LoginComponent } from './login/login.component';
import { MyStationsComponent } from './my-stations/my-stations.component';
import { IsLoggedInGuard } from '../services/guard/is-logged-in.guard';
import { PersonalPageComponent } from './personal-page/personal-page.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'location/:postCode', component: LocationComponent},
  { path: 'login', component: LoginComponent},
  { path: 'mystations', component: MyStationsComponent, canActivate: [IsLoggedInGuard]},
  { path: 'mypage', component: PersonalPageComponent, canActivate: [IsLoggedInGuard]},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
