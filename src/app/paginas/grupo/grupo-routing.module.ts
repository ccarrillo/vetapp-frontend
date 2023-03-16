import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrupoanimalComponent } from './grupoanimal/grupoanimal.component';
import { GrupoinventariosemenComponent } from './grupoinventariosemen/grupoinventariosemen.component';
import { GrupoeventoComponent } from './grupoevento/grupoevento.component';
import { GrupoprotocoloComponent } from './grupoprotocolo/grupoprotocolo.component';


const routes: Routes = [
  {
    path: 'animal',
    component: GrupoanimalComponent
  },{
    path: 'event',
    component:  GrupoeventoComponent
  },
  {
    path: 'inventory',
    component:  GrupoinventariosemenComponent
  },
  {
    path: 'protocol',
    component:  GrupoprotocoloComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoRoutingModule { }
