import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recordatorio',
  templateUrl: './recordatorio.component.html',
  styleUrls: ['./recordatorio.component.sass']
})
export class RecordatorioComponent implements OnInit {

  isListMode: boolean = true;
  sendObjRecordatorio: any;

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
    this.sendObjRecordatorio = null;
    this.isListMode = !this.isListMode;
  }

  sendRecordatorio(recordatorio: any) {
    this.listMode();
    this.sendObjRecordatorio = recordatorio;
    console.log("medicion", recordatorio);
  }

}
