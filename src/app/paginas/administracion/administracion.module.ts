import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministracionRoutingModule } from './administracion-routing.module';
import { EmpresaComponent } from './empresa/empresa.component';
import { EmpresaRegistrarComponent } from './empresa/empresa-registrar/empresa-registrar.component';
import { EmpresaListarComponent } from './empresa/empresa-listar/empresa-listar.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { EmpleadoListarComponent } from './empleado/empleado-listar/empleado-listar.component';
import { EmpleadoRegistrarComponent } from './empleado/empleado-registrar/empleado-registrar.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioListarComponent } from './usuario/usuario-listar/usuario-listar.component';
import { UsuarioRegistrarComponent } from './usuario/usuario-registrar/usuario-registrar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MaterialModule } from 'src/app/shared/material.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EmpresaComponent,
    EmpresaListarComponent,
    EmpresaRegistrarComponent,
    EmpleadoComponent,
    EmpleadoListarComponent,
    EmpleadoRegistrarComponent,
    UsuarioComponent,
    UsuarioListarComponent,
    UsuarioRegistrarComponent
  ],
  imports: [
    CommonModule,
    AdministracionRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    ComponentsModule
  ]
})
export class AdministracionModule { }
