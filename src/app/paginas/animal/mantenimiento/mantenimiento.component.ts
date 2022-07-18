import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.sass']
})
export class MantenimientoComponent implements OnInit {
   
  isListMode: boolean = true;
  sendObjAnimal: any;

  breadscrums = [
    {
      title: 'Mantenimiento',
      items: ['Animal'],
      active: 'Mantenimiento'
    }
  ];
  
  constructor() { }

  ngOnInit(): void {
  }

  listMode() {
    this.sendObjAnimal = null;
    this.isListMode = !this.isListMode;
  }

  sendAnimal(animal: any) {
    this.listMode();
    this.sendObjAnimal = animal;
    console.log("animal", animal);
  }

}
