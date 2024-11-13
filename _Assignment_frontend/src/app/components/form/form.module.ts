import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRoutingModule } from './form-routing.module';
import { FormComponentComponent } from './form-component/form-component.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from '../alert/alert.module';


@NgModule({
  declarations: [
    FormComponentComponent
  ],
  imports: [
    CommonModule,
    FormRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AlertModule
  ]
})
export class FormModule { }
