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
    },
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent
    },
    {
        path: 'navbar',
        component: NavbarComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'booking',
        component: BookingComponent
    },
    {
        path: 'gallery',
        component: GalleryComponent
    },
    {
        path: 'registeruser',
        component: RegisteruserComponent
    },
];

export const AppRoutes = RouterModule.forRoot(appRoutes);
