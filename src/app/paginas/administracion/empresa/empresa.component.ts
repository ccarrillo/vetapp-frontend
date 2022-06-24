import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { EmpresaRegistrarComponent } from './empresa-registrar/empresa-registrar.component';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.sass']
})
export class EmpresaComponent implements OnInit {

  isListMode: boolean = true;
  sendObjEmpresa: any;
  
  breadscrums = [
    {
      title: 'Empresa',
      items: ['Administración'],
      active: 'Empresa'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  listMode() {
    this.sendObjEmpresa = null;
    this.isListMode = !this.isListMode;
  }

  sendEmpresa(empresa: any) {
    this.listMode();
    this.sendObjEmpresa = empresa;
    console.log("empresa", empresa);
  }

}
