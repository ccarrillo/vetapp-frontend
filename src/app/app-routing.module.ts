import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Page404Component } from './authentication/page404/page404.component';
import { AuthGuard } from './core/guard/auth.guard';
import { AuthLayoutComponent } from './layout/app-layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/app-layout/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/authentication/signin', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      //Inicio Implementacion Veterinaria
      {
        path: 'managment',
        loadChildren: () =>
          import('./paginas/administracion/administracion.module').then(
            (m) => m.AdministracionModule
          )
      },
      {
        path: 'feeding',
        loadChildren: () =>
          import('./paginas/alimentacion/alimentacion.module').then(
            (m) => m.AlimentacionModule
          )
      },
      {
        path: 'group',
        loadChildren: () =>
          import('./paginas/grupo/grupo.module').then(
            (m) => m.GrupoModule
          )
      },
      {
        path: 'animal',
        loadChildren: () =>
          import('./paginas/animal/animal.module').then(
            (m) => m.AnimalModule
          )
      },
      {
        path: 'production',
        loadChildren: () =>
          import('./paginas/produccion/produccion.module').then(
            (m) => m.ProduccionModule
          )
      },
      {
        path: 'reproduction',
        loadChildren: () =>
          import('./paginas/reproduccion/reproduccion.module').then(
            (m) => m.ReproduccionModule
          )
      },
      {
        path: 'health',
        loadChildren: () =>
          import('./paginas/sanidad/sanidad.module').then(
            (m) => m.SanidadModule
          )
      },
      //Fin Implementacion Veterinaria
      {
        path: 'extra-pages',
        loadChildren: () =>
          import('./extra-pages/extra-pages.module').then(
            (m) => m.ExtraPagesModule
          )
      },
      {
        path: 'multilevel',
        loadChildren: () =>
          import('./multilevel/multilevel.module').then(
            (m) => m.MultilevelModule
          )
      }
    ]
  },
  {
    path: 'authentication',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./authentication/authentication.module').then(
        (m) => m.AuthenticationModule
      )
  },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
