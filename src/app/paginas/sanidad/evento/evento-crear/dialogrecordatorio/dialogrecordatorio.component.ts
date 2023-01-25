import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dialogrecordatorio',
  templateUrl: './dialogrecordatorio.component.html',
  styleUrls: ['./dialogrecordatorio.component.sass']
})
export class DialogrecordatorioComponent implements OnInit {

  listaTipoEvento: any [] =  [];

  public addCusForm: FormGroup;

  sinData: boolean = false;

  constructor(private fb: FormBuilder, public dialog: MatDialogRef<DialogrecordatorioComponent>, 
     private _api: ApiService,@ Inject(MAT_DIALOG_DATA) public data: any)
   {

    this.initForm();
    this._api.getTypeRequest('tipoevento').subscribe({
      next: (dat: any) => {
       console.log("ENTRO CARGAR combo");
        console.log(dat);
        //this.dataSource = data; //No pagina
        if (dat) {
          this.sinData = false;
           this.listaTipoEvento = dat;
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

  ngOnInit(): void {
    
    
   

  }

  initForm() {
      // console.log(this.data.idtipoevento);
    if(this.data!=null)
    {
      this.addCusForm = this.fb.group({
        id: [this.data.id],
        idtipoevento: [this.data.idtipoevento, [Validators.required]],
        numerodias: [this.data.numerodias,[Validators.required]],
        
        //abre: [' ', [Validators.required]]
      });
    }
    else{
      this.addCusForm = this.fb.group({
        id: [''],
        idtipoevento: ['', [Validators.required]],
        numerodias: ['',[Validators.required]],
      });
    }
    
  }

  closeDialog(): void {
    this.dialog.close();
  }

  onSubmitClick() {
    console.log('Form Value', this.addCusForm.value);
  }

  

}
