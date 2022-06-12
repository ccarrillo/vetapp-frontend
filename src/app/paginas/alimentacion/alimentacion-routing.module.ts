import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlimentacionComponent } from './alimentacion/alimentacion.component';
import { CostoComponent } from './costo/costo.component';
import { FormulasComponent } from './formulas/formulas.component';
import { GraficosComponent } from './graficos/graficos.component';

const routes: Routes = [
  {
    path: 'feeding',
    component: AlimentacionComponent
  },
  {
    path: 'cost',
    component: CostoComponent
  },
  {
    path: 'formula',
    component: FormulasComponent
  },
  {
    path: 'graphics',
    component: GraficosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlimentacionRoutingModule { }
