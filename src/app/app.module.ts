import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutes } from './app.routes';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
// import { AngularFireAuthModule } from '@angular/fire/auth';
// import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { ImageFilterPipe } from './image/shared/filter.pipe';
import { ImageService } from './image/shared/image.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth-guard.service';
import { ImageDetailComponent } from './image/image-detail.component';
import { BookingsService } from './services/bookings.service';
import { ProfileService } from './services/profile.service';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';


import { AboutComponent } from './about/about.component';
import { BookingComponent } from './booking/booking.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { EventService } from './services/event.service';



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BookingComponent,
    ContactComponent,
    DashboardComponent,
    GalleryComponent,
    LoginComponent,
    NavbarComponent,
    RegisteruserComponent,
    SchedulerComponent,
    ImageDetailComponent,
    ImageFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebase, 'angular-auth-firebase'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    // AngularFireAuthModule,
    // AngularFirestoreModule,
    ToastrModule.forRoot()
  ],
  providers: [
    ImageService, 
    AuthService, 
    AuthGuard,
    ImageFilterPipe,
    BookingsService,
    ProfileService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
