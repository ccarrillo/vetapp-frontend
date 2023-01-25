import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReproduccionRoutingModule } from './reproduccion-routing.module';
import { NacimientoComponent } from './nacimiento/nacimiento.component';
import { InseminacionComponent } from './inseminacion/inseminacion.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ServicioAbortoComponent } from './servicios/servicio-aborto/servicio-aborto.component';
import { InseminacionListarComponent } from './inseminacion/inseminacion-listar/inseminacion-listar.component';
import { InseminacionRegistrarComponent } from './inseminacion/inseminacion-registrar/inseminacion-registrar.component';
import { NacimientoListarComponent } from './nacimiento/nacimiento-listar/nacimiento-listar.component';
import { NacimientoRegistrarComponent } from './nacimiento/nacimiento-registrar/nacimiento-registrar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { InventarioSemenComponent } from './inventario-semen/inventario-semen.component';
import { InventarioListarComponent } from './inventario-semen/inventario-listar/inventario-listar.component';
import { InventarioRegistrarComponent } from './inventario-semen/inventario-registrar/inventario-registrar.component';
import { MaterialModule } from 'src/app/shared/material.module';
//import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    NacimientoComponent,
    InseminacionComponent,
    ServiciosComponent,
    ServicioAbortoComponent,
    InseminacionListarComponent,
    InseminacionRegistrarComponent,
    NacimientoListarComponent,
    NacimientoRegistrarComponent,
    InventarioSemenComponent,
    InventarioListarComponent,
    InventarioRegistrarComponent
  ],
  imports: [
    CommonModule,
    ReproduccionRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    //NgxMatSelectSearchModule
  ]
})
export class ReproduccionModule { }
