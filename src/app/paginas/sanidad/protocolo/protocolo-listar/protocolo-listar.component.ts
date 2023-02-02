import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-protocolo-listar',
  templateUrl: './protocolo-listar.component.html',
  styleUrls: ['./protocolo-listar.component.sass']
})
export class ProtocoloListarComponent implements OnInit {

  @Output() sendEvento = new EventEmitter();

  displayedColumns: string[] = ['no', 'nombre', 'nombreGrupo', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  sinData: boolean = false;

  constructor(
    private _api: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.refrescar();
   
    
  }

  refrescar(){
    this._api.getTypeRequest('protocolo/grupos').subscribe({
      next: (data: any) => {
        console.log("ENTRO LISTAR protocolo");
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

  editar(evento: any) {
    this.sendEvento.emit(evento);
    console.log('Form Value', evento);
  }

  eliminar(id: any){
    if (confirm("Esta seguro de borrar el registro de protocolo? Se eliminaran recordatorios ligados al evento")) {
     this._api.deleteTypeRequest('protocolo/' + id).subscribe({
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
