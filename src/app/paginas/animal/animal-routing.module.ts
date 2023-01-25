import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { ReporteComponent } from './reporte/reporte.component';
import { ParametroComponent } from './parametros/parametro/parametro.component';
import { ParametrovalueComponent } from './parametros/parametrovalue/parametrovalue.component';
import { DetalleComponent } from './detalle/detalle.component';
import { GeneralComponent } from './general/general.component';

const routes: Routes = [
  {
    path: 'detail/:id',
    component: DetalleComponent
  },
  {
    path: 'general',
    component: GeneralComponent
  },
  {
    path: 'maintenance',
    component: MantenimientoComponent
  },
  {
    path: 'parametro',
    component: ParametroComponent
  },
  {
    path: 'parametrovalue',
    component: ParametrovalueComponent
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
