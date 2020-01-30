import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { BookedEventsComponent } from './booked-events/booked-events.component';
import { RegisteredeventsComponent } from './registeredevents/registeredevents.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'menu', component : MenuComponent, children:[
  
    {path: 'home', component: HomeComponent},
    {path: 'BookedEvents', component: BookedEventsComponent},
    {path: 'Registeredevents', component: RegisteredeventsComponent}
 
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
