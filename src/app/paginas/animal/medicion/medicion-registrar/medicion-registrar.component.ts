import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicion-registrar',
  templateUrl: './medicion-registrar.component.html',
  styleUrls: ['./medicion-registrar.component.sass']
})
export class MedicionRegistrarComponent implements OnInit {

  @Output() changeListMode = new EventEmitter();
  @Input() sendObj: any;
  
  isAddMode: boolean=true;
  id!: string;
  idAnimalSession: number;

  register: FormGroup;
  hide = true;
  labelBtn: string='Registrar';

  constructor(
    private fb: FormBuilder,
    private _api: ApiService,
    private router: Router,
  ) {
    this.idAnimalSession = Number.parseInt(sessionStorage.getItem('idanimalsession'));
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
      fechamedicion: ['',[Validators.required]],
      peso: [''],
      estatura: [''],
      concorporal: [''],
      is_active: [false, [Validators.requiredTrue]]
    });
  }

  guardar() {
    console.log('Form Value', this.register.value);
    let pl = this.register.value;
    console.log('Medicion', pl);
    if (this.register.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.crear(pl);
    } else {
      console.log('Medicion ACTUALIZAR', pl);
      this.actualizar(pl);
    }
  }

  private crear(pl: any) {
   
    this._api.postTypeRequest('medicion/animal/'+this.idAnimalSession,pl).subscribe({
      next: (data) => {
        this.router.navigateByUrl('animal/detail/'+ this.idAnimalSession);
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
    this._api.putTypeRequest('medicion/animal/' + this.idAnimalSession+'/medicion/'+this.id, pl).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('animal/detail/'+ this.idAnimalSession);
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
