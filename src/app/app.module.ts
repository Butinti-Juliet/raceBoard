import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { MatButtonModule, MatCardModule, MatInputModule, MatRadioModule, MatSelectModule, MatToolbarModule, MatListModule, MatIconModule, MatTableModule, MatPaginatorModule, MatDividerModule} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';


// import "~@angular/material/prebuilt-themes/indigo-pink.css";

import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { UpdateComponent } from './update/update.component';
import { MatDivider } from '@angular/material';
import { BookedEventsComponent } from './booked-events/booked-events.component';
import { RegisteredeventsComponent } from './registeredevents/registeredevents.component';
import { RegisteredclubsComponent } from './registeredclubs/registeredclubs.component';

// import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { PreviousEventsComponent } from './previous-events/previous-events.component';
import { UpdateEventComponent } from './pages/update-event/update-event.component';
import { UpdateClubComponent } from './pages/update-club/update-club.component';
import { HttpClientModule } from '@angular/common/http';
import * as firebase from 'firebase';
 
// import { FlexLayoutModule } from '@angular/flex-layout';

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
    UpdateClubComponent
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

    // FlexLayoutModule,
   

    MatSidenavModule,
    BrowserAnimationsModule,
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){         
    firebase.initializeApp(environment.firebase);
  }
 }
