import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioSemenComponent } from './inventario-semen/inventario-semen.component';


const routes: Routes = [

  {
    path: 'inventario',
    component: InventarioSemenComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReproduccionRoutingModule { }
