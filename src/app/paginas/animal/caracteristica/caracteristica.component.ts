import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  FormControl } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-caracteristica',
  templateUrl: './caracteristica.component.html',
  styleUrls: ['./caracteristica.component.sass']
})
export class CaracteristicaComponent implements OnInit {

  @Input() animal: any;

 

  // Form
  labelForm: FormGroup;
  fileUploadForm: FormGroup;
  hideRequiredControl = new FormControl(false);

      // Form 1
      register: FormGroup;

  constructor(private fb: FormBuilder, 
    private _api: ApiService,
    private router: Router,)
     {
     this.initForm();
     /*this.initSecondForm();
     this.initThirdForm();*/
      // Set the minimum to January 1st 5 years in the past and December 31st a year in the future.
   
    this.labelForm = fb.group({
      hideRequired: this.hideRequiredControl
    });
    this.fileUploadForm = fb.group({
      singleUpload: ['']
    });
   }
  
   initForm() {
    this.register = this.fb.group({
      id: [''],
      izquierda: [''],
      derecha: [''],
      color: [''],
      marcas: [''],
      foto: [''],
    
      
    });
  }

  ngOnInit(): void {
  }

  ngOnChanges(){
     this.animal;
     this.register.controls['izquierda'].setValue(this.animal.marcaizquierda);
     this.register.controls['derecha'].setValue(this.animal.marcaderecha);
     this.register.controls['color'].setValue(this.animal.color);
     this.register.controls['marcas'].setValue(this.animal.marcadistintiva);
  }

}
