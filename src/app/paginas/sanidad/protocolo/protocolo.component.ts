import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-protocolo',
  templateUrl: './protocolo.component.html',
  styleUrls: ['./protocolo.component.sass']
})
export class ProtocoloComponent implements OnInit {

  isListMode: boolean = true;
  sendObjEvento: any;

  breadscrums = [
    {
      title: 'Evento',
      items: ['Sanidad'],
      active: 'Evento'
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

  listMode() {
    this.sendObjEvento = null;
    this.isListMode = !this.isListMode;
  }

  sendEvento(evento: any) {
    this.listMode();
    this.sendObjEvento = evento;
    console.log("evento", evento);
  }

}
