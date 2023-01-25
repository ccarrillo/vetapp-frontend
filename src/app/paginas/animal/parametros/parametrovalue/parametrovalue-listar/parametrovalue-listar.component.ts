import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parametrovalue-listar',
  templateUrl: './parametrovalue-listar.component.html',
  styleUrls: ['./parametrovalue-listar.component.sass']
})
export class ParametrovalueListarComponent implements OnInit {

 
  @Output() sendParametroValue = new EventEmitter();

  displayedColumns: string[] = ['no','nombreparvet','name','action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  sinData: boolean = false;

  constructor(
    private _api: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    console.log("ENTRO LISTAR");
    this._api.getTypeRequest('parvetvalue').subscribe({
      next: (data: any) => {
        console.log("ENTRO LISTAR CARGAR");
        console.log(data);
        //this.dataSource = data; //No pagina
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

  editar(parametrovalue: any) {
    this.sendParametroValue.emit(parametrovalue);
    console.log('Form Value', parametrovalue);
  }


}
