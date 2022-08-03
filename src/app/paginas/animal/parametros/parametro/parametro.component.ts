import { Component,  OnInit } from '@angular/core';


@Component({
  selector: 'app-parametro',
  templateUrl: './parametro.component.html',
  styleUrls: ['./parametro.component.sass']
})
export class ParametroComponent implements OnInit {
  isListMode: boolean = true;
  sendObjParametro: any;
  
  breadscrums = [
    {
      title: 'Parametro',
      items: ['Parametro'],
      active: 'Parametro'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  listMode() {
    this.sendObjParametro = null;
    this.isListMode = !this.isListMode;
  }

  sendParametro(parametro: any) {
    this.listMode();
    this.sendObjParametro = parametro;
    console.log("parametro", parametro);
  }
  

}
