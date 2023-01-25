import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InseminacionComponent } from './inseminacion/inseminacion.component';
import { InventarioSemenComponent } from './inventario-semen/inventario-semen.component';
import { NacimientoComponent } from './nacimiento/nacimiento.component';
import { ServiciosComponent } from './servicios/servicios.component';

const routes: Routes = [

  {
    path: 'insemination',
    component: InseminacionComponent
  },
  {
    path: 'inventario',
    component: InventarioSemenComponent
  },
  {
    path: 'birth',
    component: NacimientoComponent
  },
  {
    path: 'services',
    component: ServiciosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReproduccionRoutingModule { }
