import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { GrupoanimalComponent } from './grupoanimal/grupoanimal.component';
import { GrupoAnimalListarComponent } from './grupoanimal/grupo-animal-listar/grupo-animal-listar.component';
import { GrupoAnimalRegistrarComponent } from './grupoanimal/grupo-animal-registrar/grupo-animal-registrar.component';
import { GrupoinventariosemenComponent } from './grupoinventariosemen/grupoinventariosemen.component';
import { GrupoInventarioListarComponent } from './grupoinventariosemen/grupo-inventario-listar/grupo-inventario-listar.component';
import { GrupoInventarioRegistrarComponent } from './grupoinventariosemen/grupo-inventario-registrar/grupo-inventario-registrar.component';
import { GrupoRoutingModule } from './grupo-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatTreeModule} from '@angular/material/tree';
import { AddNodeComponent, NewNodeDialog } from './theme/add-node/add-node.component';
import { EditNodeComponent, EditNodeDialog } from './theme/edit-node/edit-node.component';
import { DeleteNodeComponent } from './theme/delete-node/delete-node.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  entryComponents: [
    NewNodeDialog,
    EditNodeDialog
  ],
    declarations: [
      GrupoanimalComponent,
      GrupoAnimalListarComponent,
      GrupoAnimalRegistrarComponent,
      GrupoinventariosemenComponent,
      GrupoInventarioRegistrarComponent,
      GrupoInventarioListarComponent,
      AddNodeComponent,
      NewNodeDialog,
      EditNodeComponent,
      EditNodeDialog,
      DeleteNodeComponent
     
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