import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
    imports: [
        MatButtonModule, 
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatListModule,
        MatSelectModule,
        MatSidenavModule,
        MatTabsModule,
        MatToolbarModule
    ],
    exports: [
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatListModule,
        MatSelectModule,
        MatSidenavModule,
        MatTabsModule,
        MatToolbarModule
    ]
})

export class MaterialModue{

}