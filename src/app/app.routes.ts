import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { BookingComponent } from './booking/booking.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageDetailComponent } from './image/image-detail.component';
import { RegisteruserComponent } from './registeruser/registeruser.component';
import { AuthGuard } from './services/auth-guard.service';
import { container } from '@angular/core/src/render3';

const appRoutes: Routes = [
    {
        path: '',
        component: LoginComponent
        // component: DashboardComponent
    },
    {
        path: 'dashboard',
        // canActivate: [AuthGuard],
        component: DashboardComponent
    },
    {
        path: 'navbar',
        // canActivate: [AuthGuard],
        component: NavbarComponent
    },
    {
        path: 'about',
        // canActivate: [AuthGuard],
        component: AboutComponent
    },
    {
        path: 'contact',
        // canActivate: [AuthGuard],
        component: ContactComponent
    },
    {
        path: 'booking',
        // canActivate: [AuthGuard],
        component: BookingComponent
    },
    {
        path: 'gallery',
        // canActivate: [AuthGuard],
        component: GalleryComponent
    },
    {
        path: 'registeruser',
        // canActivate: [AuthGuard],
        component: RegisteruserComponent
    },
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
