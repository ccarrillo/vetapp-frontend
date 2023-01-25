import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grupoanimal',
  templateUrl: './grupoanimal.component.html',
  styleUrls: ['./grupoanimal.component.sass']
})
export class GrupoanimalComponent implements OnInit {

   
  isListMode: boolean = true;
  sendObjGrupo: any;


  
  constructor() { }

  ngOnInit(): void {
  }

  listMode() {
    this.sendObjGrupo = null;
    this.isListMode = !this.isListMode;
  }

  sendGrupo(grupo: any) {
    this.listMode();
    this.sendObjGrupo = grupo;
    console.log("animal", grupo);
  }

}
