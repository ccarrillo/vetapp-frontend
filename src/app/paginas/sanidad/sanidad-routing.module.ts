import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventoComponent } from './evento/evento.component';
import { ProtocoloComponent } from './protocolo/protocolo.component';


const routes: Routes = [
  {
    path: 'events',
    component: EventoComponent
  },
  {
    path: 'protocol',
    component: ProtocoloComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SanidadRoutingModule { }
