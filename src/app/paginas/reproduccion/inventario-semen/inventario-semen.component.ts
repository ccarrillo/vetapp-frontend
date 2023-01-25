import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventario-semen',
  templateUrl: './inventario-semen.component.html',
  styleUrls: ['./inventario-semen.component.sass']
})
export class InventarioSemenComponent implements OnInit {

  isListMode: boolean = true;
  sendObjInventario: any;

  breadscrums = [
    {
      title: 'Recordatorio',
      items: ['Recordatorio'],
      active: 'Recordatorio'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }


  listMode() {
    this.sendObjInventario = null;
    this.isListMode = !this.isListMode;
  }

  sendInventario(inventario: any) {
    this.listMode();
    this.sendObjInventario = inventario;
    console.log("inventario", inventario);
  }

}
