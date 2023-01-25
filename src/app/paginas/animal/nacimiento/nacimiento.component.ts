import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  FormControl } from '@angular/forms';
import { Constantes } from 'src/app/shared/constantes/constantes';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-nacimiento',
  templateUrl: './nacimiento.component.html',
  styleUrls: ['./nacimiento.component.sass']
})
export class NacimientoComponent implements OnInit {

  @Input() animal: any;
  isAddMode: boolean=true;
  id!: string;
 
  hide = true;
  sinData: boolean = false;
     // Form
  labelForm: FormGroup;
  fileUploadForm: FormGroup;
  hideRequiredControl = new FormControl(false);
   // Form 1
   register: FormGroup;
   myControlAnimalHembra=  new FormControl('');
   myControlAnimalMacho= new FormControl('');

  // Date Picker
  startDate = new Date(1990, 0, 1);
  /*date = new FormControl(new Date());
  date2 = new FormControl(new Date());*/
  serializedDate = new FormControl(new Date().toISOString());
  minDate: Date;
  maxDate: Date;

  listaAnimalesMachos:any [] =  [];
  listaAnimalesHembras:any [] =  [];
  listaProposito:any [] =  [];
  filteredOptionsAnimalesHembra: Observable<any[]>;
  filteredOptionsAnimalesMacho: Observable<any[]>;
  

 constructor(private fb: FormBuilder, 
  private _api: ApiService,
  private router: Router,)
   {
   this.initForm();
   /*this.initSecondForm();
   this.initThirdForm();*/
    // Set the minimum to January 1st 5 years in the past and December 31st a year in the future.
  const currentYear = new Date().getFullYear();
  this.minDate = new Date(currentYear - 5, 0, 1);
  this.maxDate = new Date(currentYear + 1, 11, 31);
  this.labelForm = fb.group({
    hideRequired: this.hideRequiredControl
  });
  this.fileUploadForm = fb.group({
    singleUpload: ['']
  });
 }

 displayFnAnimalesHembra(animal: any): string {
  return animal && animal.arete ? animal.arete : '';
}

private _filterAnimalHembra(arete: string): any[] {
  const filterValue = arete.toLowerCase();

  return this.listaAnimalesHembras.filter(
    (option) => option.arete.toLowerCase().indexOf(filterValue) === 0
  );
}

displayFnAnimalesMacho(animal2: any): string {
  return animal2 && animal2.arete ? animal2.arete : '';
}

private _filterAnimalMacho(arete2: string): any[] {
  const filterValue2 = arete2.toLowerCase();

  return this.listaAnimalesMachos.filter(
    (option2) => option2.arete.toLowerCase().indexOf(filterValue2) === 0
  );
}


 initForm() {
  this.register = this.fb.group({
    id: [''],
    fechanacimiento: ['', [Validators.required]],
    fechadestete: [''],
    fechacastracion: [''],
    proposito: [''],
    pureza: [''],
    otra: [''],
   
  });
}



  ngOnInit(): void {
    this._api.getTypeRequest('animal/sexo/'.concat(Constantes.CONSTANTES_FILTRO_ANIMAL_HEMBRA)).subscribe({
      next: (data: any) => {
        if (data) {
          this.sinData = false;
           this.listaAnimalesHembras = data;
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
    
    this._api.getTypeRequest('animal/sexo/'.concat(Constantes.CONSTANTES_FILTRO_ANIMAL_MACHO)).subscribe({
      next: (data: any) => {
      
        if (data) {
          this.sinData = false;
           this.listaAnimalesMachos = data;
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

    this.filteredOptionsAnimalesHembra = this.myControlAnimalHembra.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.arete)),
      map((arete) => (arete ? this._filterAnimalHembra(arete) : this.listaAnimalesHembras.slice()))
    );
    this.filteredOptionsAnimalesMacho = this.myControlAnimalMacho.valueChanges.pipe(
      startWith(''),
      map((value2) => (typeof value2 === 'string' ? value2 : value2.arete)),
      map((arete2) => (arete2 ? this._filterAnimalMacho(arete2) : this.listaAnimalesMachos.slice()))
    );

    this._api.getTypeRequest('parvetvalue/'.concat(Constantes.CONSTANTES_FILTRO_PROPOSITO)).subscribe({
      next: (data: any) => {
       /* console.log("ENTRO CARGAR combo");
        console.log(data);*/
        //this.dataSource = data; //No pagina
        if (data) {
          this.sinData = false;
           this.listaProposito = data;
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

  ngOnChanges(){
    this.animal;
    this.register.controls['fechanacimiento'].setValue(this.animal.fechanacimiento);
    this.register.controls['fechadestete'].setValue(this.animal.fechadestete);
    this.register.controls['fechacastracion'].setValue(this.animal.fechacastracion);
    this.register.controls['proposito'].setValue(this.animal.propositoId);
    this.register.controls['pureza'].setValue(this.animal.pureza);
    
  
 }

  

}
