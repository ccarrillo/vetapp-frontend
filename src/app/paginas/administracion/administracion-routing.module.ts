import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './empleado/empleado.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {
    path: 'enterprise',
    component: EmpresaComponent
  },
  {
    path: 'employee',
    component: EmpleadoComponent
  },
  {
    path: 'user',
    component: UsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionRoutingModule { }
