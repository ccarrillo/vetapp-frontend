import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-diario',
  templateUrl: './control-diario.component.html',
  styleUrls: ['./control-diario.component.sass']
})
export class ControlDiarioComponent implements OnInit {
  isListMode: boolean = true;
  sendObjControlDiario: any;

  breadscrums = [
    {
      title: 'ControlDiario',
      items: ['ControlDiario'],
      active: 'ControlDiario'
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

  listMode() {
    this.sendObjControlDiario = null;
    this.isListMode = !this.isListMode;
  }

  sendControlDiario(controlDiario: any) {
    this.listMode();
    this.sendObjControlDiario = controlDiario;
    console.log("control", controlDiario);
  }

}
