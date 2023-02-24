import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-control-listar',
  templateUrl: './control-listar.component.html',
  styleUrls: ['./control-listar.component.sass']
})
export class ControlListarComponent implements OnInit {

  @Output() sendControlDiario = new EventEmitter();

  displayedColumns: string[] = ['no','fecha','racionternero','ventacontado','ventainterna','antibmastitis','ventaexterna','precio','diferencia','totallitros','ordeno','establo','action'];
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
   
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  refrescar(): void {
    this._api.getTypeRequest('produccionleche').subscribe({
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

  editar(evento: any) {
    //this.router.navigateByUrl('animal/detail/'+ id);
    this.sendControlDiario.emit(evento);
  }

  eliminar(id: any){
    if (confirm("Esta seguro de borrar el registro de control? Se eliminaran los datos de esta fechaa")) {
    this._api.deleteTypeRequest('produccionleche/' + id).subscribe({
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
