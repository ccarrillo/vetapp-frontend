import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ControlDiarioComponent } from './control-diario/control-diario.component';
import { LechePesadoComponent } from './leche-pesado/leche-pesado.component';


const routes: Routes = [
 
  {
    path: 'heavy-milk',
    component: LechePesadoComponent
  },

  {
    path: 'daily-check',
    component: ControlDiarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProduccionRoutingModule { }
