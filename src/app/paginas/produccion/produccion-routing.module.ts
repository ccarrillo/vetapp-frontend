import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformesComponent } from './informes/informes.component';
import { LactanciaComponent } from './lactancia/lactancia.component';
import { LechePesadoComponent } from './leche-pesado/leche-pesado.component';
import { LecheVentaComponent } from './leche-venta/leche-venta.component';

const routes: Routes = [
  {
    path: 'report',
    component: InformesComponent
  },
  {
    path: 'lactation',
    component: LactanciaComponent
  },
  {
    path: 'heavy-milk',
    component: LechePesadoComponent
  },
  {
    path: 'sale-milk',
    component: LecheVentaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduccionRoutingModule { }
