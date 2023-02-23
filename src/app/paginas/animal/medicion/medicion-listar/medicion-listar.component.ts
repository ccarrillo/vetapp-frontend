import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router} from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicion-listar',
  templateUrl: './medicion-listar.component.html',
  styleUrls: ['./medicion-listar.component.sass']
})
export class MedicionListarComponent implements OnInit {
 // @Input() listaMedi: any;
  @Output() sendMedicion = new EventEmitter();
  listaMedicionesMostrar :any [] =  [];
  idAnimal:number;
  displayedColumns: string[] = ['no', 'fechamedicion', 'peso','estatura', 'condicion', 'action'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;



  sinData: boolean = false;

  constructor(
    private _api: ApiService,
  ) { 
   

   }
   
  
   // Line chert start
   public lineChartOptions = {
    responsive: true,
    tooltips: {
      mode: 'index',
      titleFontSize: 12,
      titleFontColor: '#000',
      bodyFontColor: '#000',
      backgroundColor: '#fff',
      titleFontFamily: 'Poppins',
      bodyFontFamily: 'Poppins',
      cornerRadius: 3,
      intersect: false
    },
    legend: {
      display: false,
      labels: {
        usePointStyle: true,
        fontFamily: 'Poppins'
      }
    },
    scales: {
      xAxes: [
        {
          display: true,
          gridLines: {
            display: false,
            drawBorder: false
          },
          scaleLabel: {
            display: false,
            labelString: 'Month'
          },
          ticks: {
            fontFamily: 'Poppins',
            fontColor: '#9aa0ac' // Font Color
          }
        }
      ],
      yAxes: [
        {
          display: true,
          gridLines: {
            display: false,
            drawBorder: false
          },
          scaleLabel: {
            display: true,
            labelString: 'Value',
            fontFamily: 'Poppins'
          },
          ticks: {
            fontFamily: 'Poppins',
            fontColor: '#9aa0ac' // Font Color
          }
        }
      ]
    },
    title: {
      display: false,
      text: 'Normal Legend'
    }
  };

  lineChartData = [
    {
      label: 'Foods',
      data: [0, 30, 10, 120, 50, 63, 10],
      backgroundColor: 'transparent',
      borderColor: '#222222',
      borderWidth: 2,
      pointStyle: 'circle',
      pointRadius: 3,
      pointBorderColor: 'transparent',
      pointBackgroundColor: '#222222'
    },
    {
      label: 'Electronics',
      data: [0, 50, 40, 80, 40, 79, 120],
      backgroundColor: 'transparent',
      borderColor: '#f96332',
      borderWidth: 2,
      pointStyle: 'circle',
      pointRadius: 3,
      pointBorderColor: 'transparent',
      pointBackgroundColor: '#f96332'
    }
  ];

  lineChartLabels = ['January', 'February', 'Mars', 'April'];

  ngOnInit(): void {
     
    this.idAnimal = Number.parseInt(sessionStorage.getItem('idanimalsession'));
   this._api.getTypeRequest(`medicion/buscar/${this.idAnimal}`).subscribe({
      next: (data: any) => {
        if (data) {
          console.log('listar medicion'+data[0].idanimal);
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

  editar(medicion: any) {
    this.sendMedicion.emit(medicion);
    console.log('Form Value', medicion);
  }

}
