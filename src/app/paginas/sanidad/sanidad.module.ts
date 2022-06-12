import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SanidadRoutingModule } from './sanidad-routing.module';
import { TratamientoComponent } from './tratamiento/tratamiento.component';
import { TratamientoListarComponent } from './tratamiento/tratamiento-listar/tratamiento-listar.component';
import { TratamientoRegistrarComponent } from './tratamiento/tratamiento-registrar/tratamiento-registrar.component';
import { LactanciaComponent } from './lactancia/lactancia.component';
import { LactanciaListarComponent } from './lactancia/lactancia-listar/lactancia-listar.component';
import { LactanciaRegistrarComponent } from './lactancia/lactancia-registrar/lactancia-registrar.component';
import { MastitisComponent } from './mastitis/mastitis.component';
import { MastitisRegistrarComponent } from './mastitis/mastitis-registrar/mastitis-registrar.component';
import { MastitisListarComponent } from './mastitis/mastitis-listar/mastitis-listar.component';
import { PodologiaComponent } from './podologia/podologia.component';
import { PodologiaListarComponent } from './podologia/podologia-listar/podologia-listar.component';
import { PodologiaRegistrarComponent } from './podologia/podologia-registrar/podologia-registrar.component';
import { PostPartoComponent } from './post-parto/post-parto.component';
import { PostPartoRegistrarComponent } from './post-parto/post-parto-registrar/post-parto-registrar.component';
import { PostPartoListarComponent } from './post-parto/post-parto-listar/post-parto-listar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';


@NgModule({
  declarations: [
    TratamientoComponent,
    TratamientoListarComponent,
    TratamientoRegistrarComponent,
    LactanciaComponent,
    LactanciaListarComponent,
    LactanciaRegistrarComponent,
    MastitisComponent,
    MastitisRegistrarComponent,
    MastitisListarComponent,
    PodologiaComponent,
    PodologiaListarComponent,
    PodologiaRegistrarComponent,
    PostPartoComponent,
    PostPartoRegistrarComponent,
    PostPartoListarComponent
  ],
  imports: [
    CommonModule,
    SanidadRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class SanidadModule { }
