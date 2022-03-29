import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MapComponent } from './map/map.component';
import { DetailsComponent } from './details/details.component';
const routes: Routes = [{path: 'login',component: LoginComponent},
{path: 'register',component: RegisterComponent},
{path: 'map-ui', component: MapComponent},
{path: 'details', component: DetailsComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
