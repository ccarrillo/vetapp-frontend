import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { ReporteComponent } from './reporte/reporte.component';

const routes: Routes = [
  {
    path: 'maintenance',
    component: MantenimientoComponent
  },
  {
    path: 'report',
    component: ReporteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalRoutingModule { }
