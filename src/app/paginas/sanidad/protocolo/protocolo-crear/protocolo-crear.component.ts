import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-protocolo-crear',
  templateUrl: './protocolo-crear.component.html',
  styleUrls: ['./protocolo-crear.component.sass']
})
export class ProtocoloCrearComponent implements OnInit {

  @Output() changeListMode = new EventEmitter();
  @Input() sendObj: any;

  isAddMode: boolean=true;
  id!: string;

  hide = true;
  labelBtn: string='Registrar';

  listaGrupoProtocolo: any[] =  [];
  sinData: boolean = false;
  register: FormGroup;

  constructor( private dialogModel: MatDialog,
    private fb: FormBuilder,
    private _api: ApiService,
    private router: Router) { 
      this.initForm();
    }

  ngOnInit(): void {

    console.log("ENTRO REGISTRAR protocolo");
    if (this.sendObj){
      console.log("sendObj", this.sendObj.id);
      this.id = this.sendObj.id;
      this.isAddMode = !this.sendObj.id;
    }
    if (!this.isAddMode) {
      this.labelBtn="Actualizar"
      this.register.patchValue(this.sendObj);
    }

    this._api.getTypeRequest('grupoprotocolo/sinhijo').subscribe({
      next: (data: any) => {
       console.log("ENTRO CARGAR combo");
        console.log(data);
        //this.dataSource = data; //No pagina
        if (data) {
          this.sinData = false;
           this.listaGrupoProtocolo = data;
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
      nombre: ['', [Validators.required]],
      grupoProtocoloId: [''],
      is_active: [false, [Validators.requiredTrue]]
    });
    
  }


  guardar() {
    console.log('Form Value', this.register.value);
    let pl = this.register.value;
    console.log('protocolo', pl);
    if (this.register.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.crear(pl);
    } else {
      console.log('protocolo ACTUALIZAR', pl);
      this.actualizar(pl);
    }
  }

  private crear(pl: any) {
    this._api.postTypeRequest('protocolo', pl).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('managment/enterprise');
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
    this._api.putTypeRequest('protocolo/' + this.id, pl).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('managment/enterprise');
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
