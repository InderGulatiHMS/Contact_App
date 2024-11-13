import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DatacardRoutingModule } from './datacard-routing.module';
import { DataCardComponent } from './data-card/data-card.component';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from 'src/app/pipes/search.pipe';
import { AlertModule } from '../alert/alert.module';


@NgModule({
  declarations: [
    DataCardComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    DatacardRoutingModule,
    FormsModule,
    AlertModule
  ]
})
export class DatacardModule { }
