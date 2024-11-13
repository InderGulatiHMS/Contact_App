import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataCardComponent } from './data-card/data-card.component';

const routes: Routes = [
  {path : 'datacard' , component : DataCardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatacardRoutingModule { }
