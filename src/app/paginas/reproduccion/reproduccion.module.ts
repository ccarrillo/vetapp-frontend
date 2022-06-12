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


@NgModule({
  declarations: [
    NacimientoComponent,
    InseminacionComponent,
    ServiciosComponent,
    ServicioAbortoComponent,
    InseminacionListarComponent,
    InseminacionRegistrarComponent,
    NacimientoListarComponent,
    NacimientoRegistrarComponent
  ],
  imports: [
    CommonModule,
    ReproduccionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class ReproduccionModule { }
