import { Component, OnInit,  EventEmitter, Input,  Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constantes } from 'src/app/shared/constantes/constantes';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-parametrovalue-registrar',
  templateUrl: './parametrovalue-registrar.component.html',
  styleUrls: ['./parametrovalue-registrar.component.sass']
})
export class ParametrovalueRegistrarComponent implements OnInit {

  
  @Output() changeListMode = new EventEmitter();
  @Input() sendObj: any;

  
  sinData: boolean = false;
  
  isAddMode: boolean=true;
  id!: string;

  register: FormGroup;
  hide = true;
  labelBtn: string='Registrar';

  listaParametro: any [] =  [];

  constructor(
    private fb: FormBuilder,
    private _api: ApiService,
    private router: Router,
  ) {
    this.initForm();
  }

  ngOnInit(): void {
    if (this.sendObj){
      console.log("sendObj", this.sendObj.id);
      this.id = this.sendObj.id;
      this.isAddMode = !this.sendObj.id;
    }
    if (!this.isAddMode) {
      this.labelBtn="Actualizar"
      this.register.patchValue(this.sendObj);
    }
    
    this._api.getTypeRequest('parvetvalue/').subscribe({
      next: (data: any) => {
        if (data) {
          this.sinData = false;
           this.listaParametro = data;
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

  
  initForm() {
    this.register = this.fb.group({
      id: [''],
      parvetId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      is_active: [false, [Validators.requiredTrue]]
    });
  }


  guardar() {
    console.log('Form Value', this.register.value);
    let pl = this.register.value;
    console.log('PARAMETROVALUEVET', pl);
    if (this.register.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.crear(pl);
    } else {
      console.log('PARAMETROVALUE ACTUALIZAR', pl);
      this.actualizar(pl);
    }
  }

  private crear(pl: any) {
    this._api.postTypeRequest('parvetvalue', pl).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('animal/parametrovalue');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos registrados Correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.changeListMode.emit();
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

  private actualizar(pl: any) {
    this._api.putTypeRequest('parvetvalue/' + this.id, pl).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('animal/parametrovalue');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos actualizados Correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.changeListMode.emit();
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

  limpiar() {
    this.register.reset();
    if (this.id) {
      this.isAddMode = false;
      this.labelBtn = "Actualizar";
      this.register.patchValue({
        enterprise_id: this.id,
        is_active: true
      });
    } else {
      this.isAddMode = true;
      this.labelBtn = "Registrar";
      this.register.patchValue({
        is_active: true
      });
    }
    
    
  }

}
