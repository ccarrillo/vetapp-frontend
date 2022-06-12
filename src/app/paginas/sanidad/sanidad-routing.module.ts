import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LactanciaComponent } from './lactancia/lactancia.component';
import { MastitisComponent } from './mastitis/mastitis.component';
import { PodologiaComponent } from './podologia/podologia.component';
import { PostPartoComponent } from './post-parto/post-parto.component';
import { TratamientoComponent } from './tratamiento/tratamiento.component';

const routes: Routes = [
  {
    path: 'lactation',
    component: LactanciaComponent
  },
  {
    path: 'mastitis',
    component: MastitisComponent
  },
  {
    path: 'chiropody',
    component: PodologiaComponent
  },
  {
    path: 'postpartum',
    component: PostPartoComponent
  },
  {
    path: 'treatment',
    component: TratamientoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SanidadRoutingModule { }
