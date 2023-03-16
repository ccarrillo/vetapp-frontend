import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { GrupoanimalComponent } from './grupoanimal/grupoanimal.component';
import { GrupoinventariosemenComponent } from './grupoinventariosemen/grupoinventariosemen.component';
import { GrupoRoutingModule } from './grupo-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatTreeModule} from '@angular/material/tree';

import { MatExpansionModule } from '@angular/material/expansion';
import { GrupoeventoComponent } from './grupoevento/grupoevento.component';
import { GrupoprotocoloComponent } from './grupoprotocolo/grupoprotocolo.component';

@NgModule({
  entryComponents: [
  ],
    declarations: [
    GrupoanimalComponent,
    GrupoinventariosemenComponent,
    GrupoeventoComponent,
    GrupoprotocoloComponent
    ],
    imports: [
      CommonModule,
      GrupoRoutingModule,
      FormsModule,
      ReactiveFormsModule,
      ComponentsModule,
      SharedModule,
      ComponentsModule,
      MaterialModule,
      
      
    ]
  })
  export class GrupoModule { }