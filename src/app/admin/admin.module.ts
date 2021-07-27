import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { MaterialModue } from './../material.module'
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    UsersListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModue,
    FlexLayoutModule
  ]
})
export class AdminModule { }
