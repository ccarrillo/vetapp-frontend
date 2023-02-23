import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recordatorio-listar',
  templateUrl: './recordatorio-listar.component.html',
  styleUrls: ['./recordatorio-listar.component.sass']
})
export class RecordatorioListarComponent implements OnInit {

  @Output() sendRecordatorio = new EventEmitter();

  displayedColumns: string[] = ['no', 'fecha','ahora', 'evento','anotacion', 'informacion', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  sinData: boolean = false;

  constructor(
    private _api: ApiService,
    private router: Router,
  ) { }
   
  

  ngOnInit(): void {
    console.log("ENTRO LISTAR reordatorio");
  /*  this._api.getTypeRequest('recordatorio').subscribe({
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
    });*/
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editar(recordatorio: any) {
    this.sendRecordatorio.emit(recordatorio);
    console.log('Form Value', recordatorio);
  }


}
