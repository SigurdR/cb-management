import { NgModule } from "@angular/core";
import { 
    MatButtonModule,
    MatBadgeModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatGridListModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DateAdapter,
    MatInputModule,
    MatInput,
    MatSelectModule,
    MAT_DATE_LOCALE
    } from '@angular/material';
// import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { DateFormat } from './date-format';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    imports: [
        MatBadgeModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatTabsModule,
        MatGridListModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
        // MatMomentDateModule
    ],
    providers: [
        {
            provide: DateAdapter,
            useClass: DateFormat
        }
        // {
        //     provide: MAT_DATE_LOCALE,
        //     useValue: 'zh-TW'
        // }
    ],
    exports: [
        MatBadgeModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatTabsModule,
        MatGridListModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ]
})

export class MaterialModule {}