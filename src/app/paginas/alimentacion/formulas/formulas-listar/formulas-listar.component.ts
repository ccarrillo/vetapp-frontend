import { formatDate } from '@angular/common';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ParameterVal } from 'src/app/models/parameter-val';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulas-listar',
  templateUrl: './formulas-listar.component.html',
  styleUrls: ['./formulas-listar.component.sass']
})
export class FormulasListarComponent implements OnInit {

  @Output() sendFormula = new EventEmitter();
  isModeView: boolean = false;

  displayedColumns: string[] = ['no', 'categoria', 'fecha', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  sinData: boolean = false;
  myDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  parvetvalue: Array<ParameterVal> = [];

  constructor(
    private _api: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.cargarCombo('parvetvalue/1');
    this._api.getTypeRequest('formula').subscribe({
      next: (data: any) => {
        console.log("ENTRO LISTAR CARGAR");
        console.log(data);
        if (data) {
          this.sinData = false;
          this.dataSource = new MatTableDataSource(data);//Es necesario instanciar MatTableDataSource para paginar
          this.dataSource.paginator = this.paginator;
        } else {
          this.sinData = true;
        }
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ocurrio un error inesperado, vuelva a intentar',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editar(formula: any) {
    this.sendFormula.emit(formula);
    this.isModeView=false;
    console.log('sendFormula editar', formula);
    console.log('sendModeView editar', false);
  }

  visualizar(formula: any) {
    this.sendFormula.emit(formula);
    this.isModeView=true;
    console.log('sendFormula visualizar', formula);
    console.log('sendModeView visualizar', true);
  }

  cargarCombo(path: string) {
    this._api.getTypeRequest(path).subscribe({
      next: (data: any) => {
        console.log(data);
        data.forEach((element: any)  => {
          let obj = new ParameterVal();
          obj.id = element.id;
          obj.value = element.name;
          this.parvetvalue.push(obj);
        });
        console.log(this.parvetvalue);
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ocurrio un error al cargar la categoría de formulas, vuelva a intentar',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

}
