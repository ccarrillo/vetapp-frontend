import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlimentacionRoutingModule } from './alimentacion-routing.module';
import { FormulasComponent } from './formulas/formulas.component';
import { FormulasRegistrarComponent } from './formulas/formulas-registrar/formulas-registrar.component';
import { FormulasListarComponent } from './formulas/formulas-listar/formulas-listar.component';
import { AlimentacionComponent } from './alimentacion/alimentacion.component';
import { CostoComponent } from './costo/costo.component';
import { CostoListarComponent } from './costo/costo-listar/costo-listar.component';
import { CostoRegistrarComponent } from './costo/costo-registrar/costo-registrar.component';
import { GraficosComponent } from './graficos/graficos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/shared/components/components.module';


@NgModule({
  declarations: [
    FormulasComponent,
    FormulasRegistrarComponent,
    FormulasListarComponent,
    AlimentacionComponent,
    CostoComponent,
    CostoListarComponent,
    CostoRegistrarComponent,
    GraficosComponent
  ],
  imports: [
    CommonModule,
    AlimentacionRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentsModule
  ]
})
export class AlimentacionModule { }
