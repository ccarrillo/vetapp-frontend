import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parametrovalue',
  templateUrl: './parametrovalue.component.html',
  styleUrls: ['./parametrovalue.component.sass']
})
export class ParametrovalueComponent implements OnInit {
  isListMode: boolean = true;
  sendObjParametroValue: any;
  
  breadscrums = [
    {
      title: 'ParametroValue',
      items: ['ParametroValue'],
      active: 'ParametroValue'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  listMode() {
    this.sendObjParametroValue = null;
    this.isListMode = !this.isListMode;
  }

  sendParametro(parametroValue: any) {
    this.listMode();
    this.sendObjParametroValue = parametroValue;
    console.log("parametro", parametroValue);
  }
  


}
