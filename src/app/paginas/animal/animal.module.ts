import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalRoutingModule } from './animal-routing.module';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { AnimalRegistrarComponent } from './mantenimiento/animal-registrar/animal-registrar.component';
import { AnimalListarComponent } from './mantenimiento/animal-listar/animal-listar.component';
import { AnimalVentaComponent } from './mantenimiento/animal-venta/animal-venta.component';
import { AnimalTrasladoComponent } from './mantenimiento/animal-traslado/animal-traslado.component';
import { ReporteComponent } from './reporte/reporte.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';


@NgModule({
  declarations: [
    MantenimientoComponent,
    AnimalRegistrarComponent,
    AnimalListarComponent,
    AnimalVentaComponent,
    AnimalTrasladoComponent,
    ReporteComponent
  ],
  imports: [
    CommonModule,
    AnimalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class AnimalModule { }
