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
import { MaterialModule } from 'src/app/shared/material.module';

import { ParametroComponent } from './parametros/parametro/parametro.component';

import { ParametroListarComponent } from './parametros/parametro/parametro-listar/parametro-listar.component';
import { ParametroRegistrarComponent } from './parametros/parametro/parametro-registrar/parametro-registrar.component';
import { ParametrovalueComponent } from './parametros/parametrovalue/parametrovalue.component';
import { ParametrovalueListarComponent } from './parametros/parametrovalue/parametrovalue-listar/parametrovalue-listar.component';
import { ParametrovalueRegistrarComponent } from './parametros/parametrovalue/parametrovalue-registrar/parametrovalue-registrar.component';
import { DetalleComponent } from './detalle/detalle.component';
import { SanidadModule } from '../sanidad/sanidad.module';
import { GeneralComponent } from './general/general.component';
import { GeneraldetalleComponent } from './generaldetalle/generaldetalle.component';
import { NacimientoComponent } from './nacimiento/nacimiento.component';
import { CaracteristicaComponent } from './caracteristica/caracteristica.component';
import { MedicionComponent } from './medicion/medicion.component';
import { MedicionListarComponent } from './medicion/medicion-listar/medicion-listar.component';
import { MedicionRegistrarComponent } from './medicion/medicion-registrar/medicion-registrar.component';
import { RecordatorioComponent } from './recordatorio/recordatorio.component';
import { RecordatorioListarComponent } from './recordatorio/recordatorio-listar/recordatorio-listar.component';
import { RecordatorioRegistrarComponent } from './recordatorio/recordatorio-registrar/recordatorio-registrar.component';
import { EventoComponent } from './evento/evento.component';
import { EventoListarComponent } from './evento/evento-listar/evento-listar.component';
import { EventoRegistrarComponent } from './evento/evento-registrar/evento-registrar.component';
import { MatExpansionModule } from '@angular/material/expansion';


@NgModule({
  declarations: [
    MantenimientoComponent,
    AnimalRegistrarComponent,
    AnimalListarComponent,
    AnimalVentaComponent,
    AnimalTrasladoComponent,
    ReporteComponent,
   
    ParametroComponent,

    ParametroListarComponent,
    ParametroRegistrarComponent,
    ParametrovalueComponent,
    ParametrovalueListarComponent,
    ParametrovalueRegistrarComponent,
    DetalleComponent,
    GeneralComponent,
    GeneraldetalleComponent,
    NacimientoComponent,
    CaracteristicaComponent,
    MedicionComponent,
    MedicionListarComponent,
    MedicionRegistrarComponent,
    RecordatorioComponent,
    RecordatorioListarComponent,
    RecordatorioRegistrarComponent,
    EventoComponent,
    EventoListarComponent,
    EventoRegistrarComponent
  ],
  imports: [
    CommonModule,
    AnimalRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule,
    SanidadModule,
    MatExpansionModule,
    
    
  ]
})
export class AnimalModule { }
