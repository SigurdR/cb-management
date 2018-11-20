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
    MatNativeDateModule
    } from '@angular/material'

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
        MatNativeDateModule
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
        MatNativeDateModule
    ]
})

export class MaterialModule {}