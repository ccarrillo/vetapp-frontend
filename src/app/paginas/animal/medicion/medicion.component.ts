import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-medicion',
  templateUrl: './medicion.component.html',
  styleUrls: ['./medicion.component.sass']
})
export class MedicionComponent implements OnInit {

  isListMode: boolean = true;
  sendObjMedicion: any;

  listaMediciones :any [] =  [];
 
  breadscrums = [
    {
      title: 'Medicion',
      items: ['Medicion'],
      active: 'Medicion'
    }
  ];

  constructor() { 
   
  }

  ngOnInit(): void {
    
  }
  /*ngOnChanges(): void {
    this.listaMediciones =  this.listaMedi;
  }*/


  listMode() {
    this.sendObjMedicion = null;
    this.isListMode = !this.isListMode;
  }

  sendMedicion(medicion: any) {
    this.listMode();
    this.sendObjMedicion = medicion;
    //console.log("medicion", medicion);
  }

}
