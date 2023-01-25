import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.sass']
})
export class DetalleComponent implements OnInit {
  id: number;
  idstorage: string;
  sinData: boolean = false;
  animalparent:any ;
  tabs = ['Principal', 'Eventos','Recordatorio','Nacimiento','Medicion','Producción','Medición'];

  breadscrums = [
    {
      title: 'Detalle',
      items: ['UI'],
      active: 'Detalle'
    }
  ];
  selected = new FormControl(0);

  constructor(private fb: FormBuilder, 
    private _api: ApiService,
    private router: Router,
    private route: ActivatedRoute) { 
       
    }

  ngOnInit(): void {
        
      this.route.paramMap.subscribe((params: ParamMap) => {
      this.idstorage = params.get('id');
      this.id = Number.parseInt(params.get('id'));
      
      sessionStorage.setItem('idanimalsession', this.idstorage);
    });

    this._api.getTypeRequest(`animal/${this.id}`).subscribe({
      next: (data: any) => {
        if (data) {
          this.sinData = false;     
          this.animalparent = data;
          
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

  addTab(selectAfterAdding: boolean) {
    this.tabs.push('New');

    if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    }
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

}
