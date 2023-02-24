import { Component, OnInit,  EventEmitter, Input,  Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constantes } from 'src/app/shared/constantes/constantes';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-control-registrar',
  templateUrl: './control-registrar.component.html',
  styleUrls: ['./control-registrar.component.sass']
})
export class ControlRegistrarComponent implements OnInit {

  @Output() changeListMode = new EventEmitter();
  @Input() sendObj: any;

  
  sinData: boolean = false;
  
  isAddMode: boolean=true;
  id!: string;

  register: FormGroup;
  hide = true;
  labelBtn: string='Registrar';

  constructor(
    private fb: FormBuilder,
    private _api: ApiService,
    private router: Router,
  ) { 
    this.initForm();
  }

  ngOnInit(): void {

    console.log("ENTRO REGISTRAR");
    if (this.sendObj){
      console.log("sendObj", this.sendObj.id);
      this.id = this.sendObj.id;
      this.isAddMode = !this.sendObj.id;
    }
    if (!this.isAddMode) {
      this.labelBtn="Actualizar"
      this.register.patchValue(this.sendObj);
    }
  }

  initForm() {
    this.register = this.fb.group({
      id: [''],
      racionternero: ['', [Validators.required]],
      ventacontado: ['', [Validators.required]],
      ventainterna: ['', [Validators.required]],
      antibmastitis: ['', [Validators.required]],
      ventaexterna: ['', [Validators.required]],
      precio: ['', [Validators.required]],
      ordeno: ['', [Validators.required]],
      establo: ['', [Validators.required]],
      secas: ['', [Validators.required]],
      ufc: ['', [Validators.required]],
      ccss: ['', [Validators.required]],
      grasa: ['', [Validators.required]],
      proteina: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
      is_active: [false, [Validators.requiredTrue]]
    });
  }


  guardar() {
    console.log('Form Value', this.register.value);
    let pl = this.register.value;
    console.log('control', pl);
    if (this.register.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.crear(pl);
    } else {
      console.log('control ACTUALIZAR', pl);
      this.actualizar(pl);
    }
  }

  private crear(pl: any) {
    this._api.postTypeRequest('produccionleche', pl).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('production/daily-check');
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
    this._api.putTypeRequest('produccionleche/' + this.id, pl).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('production/daily-check');
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
