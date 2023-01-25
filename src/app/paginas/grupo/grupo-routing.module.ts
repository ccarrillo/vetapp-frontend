import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrupoanimalComponent } from './grupoanimal/grupoanimal.component';
import { GrupoinventariosemenComponent } from './grupoinventariosemen/grupoinventariosemen.component';


const routes: Routes = [
  {
    path: 'animal',
    component: GrupoanimalComponent
  },
  {
    path: 'inventory',
    component:  GrupoinventariosemenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoRoutingModule { }
