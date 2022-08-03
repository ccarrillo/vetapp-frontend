import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { Constantes } from 'src/app/shared/constantes/constantes';
import { Observable } from 'rxjs';
import { map, startWith, debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-animal-registrar',
  templateUrl: './animal-registrar.component.html',
  styleUrls: ['./animal-registrar.component.sass']
})
export class AnimalRegistrarComponent implements OnInit {
   
  @Output() changeListMode = new EventEmitter();
  @Input() sendObj: any;
  
  isAddMode: boolean=true;
  id!: string;

     // Form
  labelForm: FormGroup;
  fileUploadForm: FormGroup;
  hideRequiredControl = new FormControl(false);
   // Form 1
   register: FormGroup;
   myControlAnimalHembra=  new FormControl('');
   myControlAnimalMacho= new FormControl('');
   
   hide = true;
   sinData: boolean = false;
   dataSource = new MatTableDataSource<any>();
   @ViewChild(MatPaginator) paginator: MatPaginator;

   listaRaza: any [] =  [];
   listaOrigen: any [] =  [];
   listaEstadoProduccion: any [] =  [];
   listaEstadoReproduccion: any [] =  [];
   listaCorral: any [] =  [];
   listaCategoriaReproduccion: any [] =  [];
   listaCategoriaProduccion: any [] =  [];
   listaAnimalesHembras:any [] =  [];
   listaAnimalesMachos:any [] =  [];
   filteredOptionsAnimalesHembra: Observable<any[]>;
   filteredOptionsAnimalesMacho: Observable<any[]>;
   //filteredOptions: Observable<User[]>;
   labelBtn: string='Registrar';

   
   breadscrums = [
     {
       title: 'Registrar Animal',
       items: ['Formulario'],
       active: 'Registro'
     }


   ];

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

    this._api.getTypeRequest('parvetvalue/'.concat(Constantes.CONSTANTES_COMBO_RAZA)).subscribe({
      next: (data: any) => {
       /* console.log("ENTRO CARGAR combo");
        console.log(data);*/
        //this.dataSource = data; //No pagina
        if (data) {
          this.sinData = false;
           this.listaRaza = data;
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
    this._api.getTypeRequest('parvetvalue/'.concat(Constantes.CONSTANTES_COMBO_ORIGEN)).subscribe({
      next: (data: any) => {
        if (data) {
          this.sinData = false;
           this.listaOrigen = data;
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

    this._api.getTypeRequest('parvetvalue/'.concat(Constantes.CONSTANTES_COMBO_ESTADO_PRODUCTIVO)).subscribe({
      next: (data: any) => {
        if (data) {
          this.sinData = false;
           this.listaEstadoProduccion = data;
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

    this._api.getTypeRequest('parvetvalue/'.concat(Constantes.CONSTANTES_COMBO_ESTADO_REPRODUCTIVO)).subscribe({
      next: (data: any) => {
        if (data) {
          this.sinData = false;
           this.listaEstadoReproduccion = data;
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

    this._api.getTypeRequest('parvetvalue/'.concat(Constantes.CONSTANTES_COMBO_CORRAL)).subscribe({
      next: (data: any) => {
        if (data) {
          this.sinData = false;
           this.listaCorral = data;
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

    this._api.getTypeRequest('parvetvalue/'.concat(Constantes.CONSTANTES_COMBO_CATEGORIA_REPRODUCCION)).subscribe({
      next: (data: any) => {
        if (data) {
          this.sinData = false;
           this.listaCategoriaReproduccion = data;
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


    this._api.getTypeRequest('parvetvalue/'.concat(Constantes.CONSTANTES_COMBO_CATEGORIA_PRODUCCION)).subscribe({
      next: (data: any) => {
        if (data) {
          this.sinData = false;
           this.listaCategoriaProduccion = data;
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

   
    
    
  };
  
  

   // Date Picker
    startDate = new Date(1990, 0, 1);
    /*date = new FormControl(new Date());
    date2 = new FormControl(new Date());*/
    serializedDate = new FormControl(new Date().toISOString());
    minDate: Date;
    maxDate: Date;

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
   initForm() {
     this.register = this.fb.group({
       id: [''],
       arete: ['', [Validators.required]],
       nombre: [''],
       razaId: ['', [Validators.required]],
       origenId: ['', [Validators.required]],
       fechanacimiento: ['', [Validators.required]],
       fechaultimoparto: ['', [Validators.required]],
       sexo: ['', [Validators.required]],
       estadoproductivoId: ['', [Validators.required]],
       estadoreproductivoId: ['', [Validators.required]],
       corralId: ['', [Validators.required]],
       categoriaReproduccionId: ['', [Validators.required]],
       categoriaProduccionId: ['', [Validators.required]],
       numeroparto: ['', [Validators.required]],
       precio: ['', [Validators.required]],
       venta: ['', [Validators.required]],
       is_active: [true, [Validators.requiredTrue]],
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
  

  onSelectionChange(event: any){
    console.log('onSelectionChange called', event.option.value.id);
    this.myControlAnimalHembra.patchValue({
      option_id: event.option.value.id,
    })
  }


  
   guardar() {
    console.log('Form Value', this.register.value);
    let pl = this.register.value;
    pl.madreId = this.myControlAnimalHembra.value.id;
    pl.padreId = this.myControlAnimalMacho.value.id;
    console.log('Animal', pl);
    //console.log('alex',this.myControlAnimalHembra.value.id);
    if (this.register.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.crear(pl);
    } else {
      console.log('Animal ACTUALIZAR', pl);
      this.actualizar(pl);
    }
  }

  private crear(pl: any) {
    pl.madreId = this.myControlAnimalHembra.value.id;
    pl.padreId = this.myControlAnimalMacho.value.id;
    this._api.postTypeRequest('animal', pl).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('animal/maintenance');
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
    this._api.putTypeRequest('animal/' + this.id, pl).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('animal/maintenance');
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
