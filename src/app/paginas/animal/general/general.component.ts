import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.sass'],
  providers: [DatePipe]
})
export class GeneralComponent implements OnInit {
  @Output() sendAnimal = new EventEmitter();

  displayedColumns: string[] = ['no', 'arete','estadoproductivo', 'estadoreproductivo', 'fechadeultimoparto','fechaparir','action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  sinData: boolean = false;

  breadscrums = [
    {
      title: 'General',
      items: ['Animal'],
      active: 'General'
    }
  ];

  constructor(
    private _api: ApiService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this._api.getTypeRequest('animal/todosvo').subscribe({
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  verDetalle (id: number) {
    this.router.navigateByUrl(`animal/detail/${id}`);
  }

}
