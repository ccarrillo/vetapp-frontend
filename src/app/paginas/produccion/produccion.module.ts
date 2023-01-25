import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProduccionRoutingModule } from './produccion-routing.module';
import { LactanciaComponent } from './lactancia/lactancia.component';
import { LactanciaListarComponent } from './lactancia/lactancia-listar/lactancia-listar.component';
import { LactanciaRegistrarComponent } from './lactancia/lactancia-registrar/lactancia-registrar.component';
import { InformesComponent } from './informes/informes.component';
import { LechePesadoComponent } from './leche-pesado/leche-pesado.component';
import { LechePesadoRegistrarComponent } from './leche-pesado/leche-pesado-registrar/leche-pesado-registrar.component';
import { LechePesadoListarComponent } from './leche-pesado/leche-pesado-listar/leche-pesado-listar.component';
import { LecheVentaComponent } from './leche-venta/leche-venta.component';
import { LecheVentaRegistrarComponent } from './leche-venta/leche-venta-registrar/leche-venta-registrar.component';
import { LecheVentaListarComponent } from './leche-venta/leche-venta-listar/leche-venta-listar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { ControlDiarioComponent } from './control-diario/control-diario.component';
import { ControlRegistrarComponent } from './control-diario/control-registrar/control-registrar.component';
import { ControlListarComponent } from './control-diario/control-listar/control-listar.component';
import { MaterialModule } from 'src/app/shared/material.module';


@NgModule({
  declarations: [
    LactanciaComponent,
    LactanciaListarComponent,
    LactanciaRegistrarComponent,
    InformesComponent,
    LechePesadoComponent,
    LechePesadoRegistrarComponent,
    LechePesadoListarComponent,
    LecheVentaComponent,
    LecheVentaRegistrarComponent,
    LecheVentaListarComponent,
    ControlDiarioComponent,
    ControlRegistrarComponent,
    ControlListarComponent
  ],
  imports: [
    CommonModule,
    ProduccionRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class ProduccionModule { }
