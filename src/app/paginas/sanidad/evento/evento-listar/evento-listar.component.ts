import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evento-listar',
  templateUrl: './evento-listar.component.html',
  styleUrls: ['./evento-listar.component.sass']
})
export class EventoListarComponent implements OnInit {

  
  @Output() sendEvento = new EventEmitter();

  displayedColumns: string[] = ['no', 'nombre', 'grupoevento', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  sinData: boolean = false;

  constructor(
    private _api: ApiService,
  ) { }

  ngOnInit(): void {
    this.refrescar();
  
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  editar(evento: any) {
    this.sendEvento.emit(evento);
  }

  refrescar(){
    this._api.getTypeRequest('tipoevento/grupos').subscribe({
      next: (data: any) => {
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

  eliminar(id: any){
    if (confirm("Esta seguro de borrar el registro de evento? Se eliminaran tanto las acciones y recordatorios ligados al evento")) {
    this._api.deleteTypeRequest('tipoevento/' + id).subscribe({
     next: (data: any) => {
      
        this.refrescar();
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
  
 }


}
