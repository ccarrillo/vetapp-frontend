import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SanidadRoutingModule } from './sanidad-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { EventoComponent } from './evento/evento.component';
import { EventoListarComponent } from './evento/evento-listar/evento-listar.component';
import { EventoCrearComponent } from './evento/evento-crear/evento-crear.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { DialogadicionalComponent } from './evento/evento-crear/dialogadicional/dialogadicional.component';
import { DialogrecordatorioComponent } from './evento/evento-crear/dialogrecordatorio/dialogrecordatorio.component';
import { EventoAnimalComponent } from './evento-animal/evento-animal.component';
import { ProtocoloComponent } from './protocolo/protocolo.component';
import { ProtocoloCrearComponent } from './protocolo/protocolo-crear/protocolo-crear.component';
import { ProtocoloListarComponent } from './protocolo/protocolo-listar/protocolo-listar.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EventoComponent,
    EventoListarComponent,
    EventoCrearComponent,
    DialogadicionalComponent,
    DialogrecordatorioComponent,
    EventoAnimalComponent,
    ProtocoloComponent,
    ProtocoloCrearComponent,
    ProtocoloListarComponent
  ],
  imports: [
    CommonModule,
    SanidadRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ComponentsModule
  ],
  exports: [
     EventoAnimalComponent
  ]
})
export class SanidadModule { }
