import { Component, OnInit, ViewChild } from '@angular/core';
import { FormulasListarComponent } from './formulas-listar/formulas-listar.component';

@Component({
  selector: 'app-formulas',
  templateUrl: './formulas.component.html',
  styleUrls: ['./formulas.component.sass']
})
export class FormulasComponent implements OnInit {

  @ViewChild(FormulasListarComponent) childFormulasListar;
  isListMode: boolean = true;
  sendObjFormula: any;

  breadscrums = [
    {
      title: 'Formulas',
      items: ['Alimentación'],
      active: 'Formulas'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  listMode() {
    this.sendObjFormula = null;
    this.isListMode = !this.isListMode;
  }

  sendFormula(formula: any) {
    this.listMode();
    this.sendObjFormula = formula;
    //console.log("sendObjFormula", this.sendObjFormula);
    //console.log("parentObjView", this.parentObjView);
  }

}
