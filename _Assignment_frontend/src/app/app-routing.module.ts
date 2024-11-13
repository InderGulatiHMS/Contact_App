import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponentComponent } from './components/form/form-component/form-component.component';

const routes: Routes = [
  {path : '' , loadChildren : () => import ('./components/form/form.module').then(m=>m.FormModule)},
  {path : '' , loadChildren : () => import('./components/datacard/datacard.module').then(m=>m.DatacardModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
