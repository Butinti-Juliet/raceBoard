import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { MatButtonModule, MatCardModule, MatInputModule, MatRadioModule, MatSelectModule, MatToolbarModule, MatListModule, MatIconModule, MatTableModule, MatPaginatorModule, MatDividerModule, MatDialogModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';




import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { UpdateComponent } from './update/update.component';

import { BookedEventsComponent } from './booked-events/booked-events.component';
import { RegisteredeventsComponent } from './registeredevents/registeredevents.component';
import { RegisteredclubsComponent } from './registeredclubs/registeredclubs.component';


import { SponsorsComponent } from './sponsors/sponsors.component';
import { PreviousEventsComponent } from './previous-events/previous-events.component';
import { UpdateEventComponent } from './pages/update-event/update-event.component';
import { UpdateClubComponent } from './pages/update-club/update-club.component';
import { HttpClientModule } from '@angular/common/http';

// import { DataService } from './services/data.service';
import * as firebase from 'firebase';
// import { ConfirmationDialogComponent } from './pages/confirmation-dialog/confirmation-dialog.component';
import { AlertsModule } from 'angular-alert-module';


firebase.initializeApp(environment.firebase);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    UpdateComponent,
    BookedEventsComponent,
    RegisteredeventsComponent,
    RegisteredclubsComponent,
    SponsorsComponent,
    PreviousEventsComponent,
    UpdateEventComponent,
    UpdateClubComponent,
    
    // ConfirmationDialogComponent,
    // DataService,
  
    
  ],
  imports: [
    
    // NgxMaterialTimepickerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    AngularFireModule.initializeApp(environment.firebase, 'my-app-name'),
    AngularFireAnalyticsModule, 
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    AngularFireStorageModule,


    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatTableModule,
    MatDividerModule,
    MatPaginatorModule,
    MatDialogModule,

   
   

    MatSidenavModule,
    BrowserAnimationsModule,
    AlertsModule.forRoot()
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

  DataService
  // constructor(){         
  //   FirebaseApp.initializeApp(environment.firebase);
  // }
 }
