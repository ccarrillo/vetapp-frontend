import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReproduccionRoutingModule } from './reproduccion-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { InventarioSemenComponent } from './inventario-semen/inventario-semen.component';
import { InventarioListarComponent } from './inventario-semen/inventario-listar/inventario-listar.component';
import { InventarioRegistrarComponent } from './inventario-semen/inventario-registrar/inventario-registrar.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
//import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
  declarations: [
    
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
    SharedModule,
    //NgxMatSelectSearchModule
  ]
})
export class ReproduccionModule { }
