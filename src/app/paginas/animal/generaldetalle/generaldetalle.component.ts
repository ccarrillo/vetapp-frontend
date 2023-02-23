import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  FormControl, ValidationErrors } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';
import { Constantes } from 'src/app/shared/constantes/constantes';
import Swal from 'sweetalert2';
import { Observable, map, startWith } from 'rxjs';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  templateUrl: './generaldetalle.component.html',
  selector: 'app-generaldetalle',
  styleUrls: ['./generaldetalle.component.sass']
})
export class GeneraldetalleComponent implements OnInit {

  
  @Input() animal: any;

  listaRaza: any [] =  [];
  listaGrupoAnimal: any[] =  [];

  hide = true;
  sinData: boolean = false;
  // Form
  labelForm: FormGroup;
  fileUploadForm: FormGroup;
  hideRequiredControl = new FormControl(false);
     // Form 1
  register: FormGroup;
  myControlAnimalHembra=  new FormControl(undefined);
  myControlAnimalMacho= new FormControl(undefined);
  myControlGrupo= new FormControl(undefined, [Validators.required, this.requireMatch.bind(this)]);

  hmadrenombre:boolean;
  hpadrenombre:boolean;

  listaEstadoProduccion: any [] =  [];
  listaEstadoReproduccion: any [] =  [];
  listaCategoriaReproduccion: any [] =  [];
  listaCategoriaProduccion: any [] =  [];
  listaOrigen: any [] =  [];

    // checkbox
    //checked = false;

  startDate = new Date(1990, 0, 1);
  /*date = new FormControl(new Date());
  date2 = new FormControl(new Date());*/
  serializedDate = new FormControl(new Date().toISOString());
  minDate: Date;
  maxDate: Date;

  panelOpenState = false;

  step = 0;

  listaAnimalesMachos:any [] =  [];
  listaAnimalesHembras:any [] =  [];
  listaProposito:any [] =  [];
  filteredOptionsAnimalesHembra: Observable<any[]>;
  filteredOptionsAnimalesMacho: Observable<any[]>;
  filteredOptionsGrupo: Observable<any[]>;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }


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
    otraIdentificacion: [''],
    razaId: ['', [Validators.required]],
    sexo: ['', [Validators.required]],
    idGrupoAnimal: [''],
    anotaciones: [''],
    fechanacimiento: ['', [Validators.required]],
    fechadestete: [''],
    fechacastracion: [''],
    propositoId: [''],
    pureza: [''],
    madreId:[''],
    padreId:[''],
    radioMadre:[''],
    radioPadre:[''],
    otraIdentificacionMadre:[''],
    otraIdentificacionPadre:[''],
    marcaizquierda: [''],
    marcaderecha: [''],
    color: [''],
    marcadistintiva: [''],
    foto: [''],
    noservir: [''],
    estadoproductivoId: ['', [Validators.required]],
    estadoreproductivoId: ['', [Validators.required]],
    categoriaReproduccionId: ['', [Validators.required]],
    categoriaProduccionId: ['', [Validators.required]],
    numeroparto: ['', [Validators.required]],
    precio: ['', [Validators.required]],
    origenId: ['', [Validators.required]],
    venta: ['', [Validators.required]],
    myControlAnimalHembra: this.myControlAnimalHembra,
    myControlAnimalMacho: this.myControlAnimalMacho,
    myControlGrupo:this.myControlGrupo,
    
  });
}

  ngOnInit(): void {

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

     
    this._api.getTypeRequest('animal/sexo/'.concat(Constantes.CONSTANTES_FILTRO_ANIMAL_HEMBRA)).subscribe({
      next: (data: any) => {
        if (data) {
          this.sinData = false;
           this.listaAnimalesHembras = data;
           if(this.animal.madreId!= null && this.animal.madreId != undefined && this.animal.madreId != ''){
              var index = this.listaAnimalesHembras.findIndex(index => index.id == this.animal.madreId);
              this.myControlAnimalHembra.setValue(this.listaAnimalesHembras[index]);
            }
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
           if(this.animal.padreId!= null && this.animal.padreId != undefined && this.animal.padreId != ''){
            var index = this.listaAnimalesMachos.findIndex(index => index.id == this.animal.padreId);
            this.myControlAnimalMacho.setValue(this.listaAnimalesMachos[index]);
          }
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

  

    this._api.getTypeRequest('parvetvalue/'.concat(Constantes.CONSTANTES_FILTRO_PROPOSITO)).subscribe({
      next: (data: any) => {

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


    this._api.getTypeRequest('grupoanimal/sinhijo').subscribe({
      next: (data: any) => {
        if (data) {
          this.sinData = false;
           this.listaGrupoAnimal = data;
           if(this.animal.idGrupoAnimal!= null && this.animal.idGrupoAnimal != undefined && this.animal.idGrupoAnimal != ''){
            var index = this.listaGrupoAnimal.findIndex(index => index.id == this.animal.idGrupoAnimal);
            this.myControlGrupo.setValue(this.listaGrupoAnimal[index]);
          }
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

    this.filteredOptionsGrupo = this.myControlGrupo.valueChanges.pipe(
      startWith(''),
      map((value3) => (typeof value3 === 'string' ? value3 : value3.nombre)),
      map((nombre) => (nombre ? this._filterGrupo(nombre) : this.listaGrupoAnimal.slice()))
    );

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



  }


  //inicio filtros

  private requireMatch(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    if (this.listaGrupoAnimal && this.listaGrupoAnimal.indexOf(selection) < 0) {
      return { requireMatch: true };
    }
    return null;
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

  displayFnGrupo(grupo: any): string {
    return grupo && grupo.nombre ? grupo.nombre : '';
  }

  private _filterGrupo(nombre: string): any[] {
    const filterValue = nombre.toLowerCase();

    return this.listaGrupoAnimal.filter(
      (option) => option.nombre.toLowerCase().indexOf(filterValue) === 0
    );
  }
  
  
  
  //fin de filtros
 

  radioChange($event:  MatRadioChange) {
    
    if ($event.value === '1') {
     
       
        this.hmadrenombre = false;
        this.register.get("otraIdentificacionMadre").disable();
    }
    if ($event.value === '2') {
      
      
      this.hmadrenombre = true;
      this.register.get("otraIdentificacionMadre").enable();
  }
 }

 radioChangePadre($event:  MatRadioChange) {
  
 
  if ($event.value === '3') {
      this.hpadrenombre = false;
      this.register.get("otraIdentificacionPadre").disable();
      }
  if ($event.value === '4') {
    // Do whatever you want here
   
    this.hpadrenombre = true;
    this.register.get("otraIdentificacionPadre").enable();
     }
 }

  ngOnChanges(){
    this.animal;
    this.register.controls['id'].setValue(this.animal.id);
    this.register.controls['arete'].setValue(this.animal.arete);
    this.register.controls['otraIdentificacion'].setValue(this.animal.otraIdentificacion);
    this.register.controls['razaId'].setValue(this.animal.razaId);
    this.register.controls['sexo'].setValue(this.animal.sexo);
    this.register.controls['idGrupoAnimal'].setValue(this.animal.idGrupoAnimal);
    this.register.controls['anotaciones'].setValue(this.animal.anotaciones);
    this.register.controls['fechanacimiento'].setValue(this.animal.fechanacimiento);
    this.register.controls['fechadestete'].setValue(this.animal.fechadestete);
    this.register.controls['fechacastracion'].setValue(this.animal.fechacastracion);
    this.register.controls['propositoId'].setValue(this.animal.propositoId);
    this.register.controls['pureza'].setValue(this.animal.pureza);
    
    //this.register.controls['madreId'].setValue(this.animal.madreId);
    //this.register.controls['padreId'].setValue(this.animal.padreId);
    this.register.controls['marcaizquierda'].setValue(this.animal.marcaizquierda);
    this.register.controls['marcaderecha'].setValue(this.animal.marcaderecha);
    this.register.controls['color'].setValue(this.animal.color);
    this.register.controls['marcadistintiva'].setValue(this.animal.marcadistintiva);
    this.register.controls['noservir'].setValue(this.animal.noservir);
    this.register.controls['radioMadre'].setValue(this.animal.radioMadre);
    this.register.controls['radioPadre'].setValue(this.animal.radioPadre);
    this.register.controls['estadoproductivoId'].setValue(this.animal.estadoproductivoId);
    this.register.controls['estadoreproductivoId'].setValue(this.animal.estadoreproductivoId);
    this.register.controls['categoriaReproduccionId'].setValue(this.animal.categoriaReproduccionId);
    this.register.controls['categoriaProduccionId'].setValue(this.animal.categoriaProduccionId);
    this.register.controls['numeroparto'].setValue(this.animal.numeroparto);
    this.register.controls['otraIdentificacionMadre'].setValue(this.animal.otraIdentificacionMadre);
    this.register.controls['otraIdentificacionPadre'].setValue(this.animal.otraIdentificacionPadre);
    this.register.controls['precio'].setValue(this.animal.precio);
    this.register.controls['origenId'].setValue(this.animal.origenId);
    this.register.controls['venta'].setValue(this.animal.venta);
     //valida la habilitacion de radiobuton al cargar la data 
     if (this.animal.radioMadre === '1') {
     
       
      this.hmadrenombre = false;
      this.register.get("otraIdentificacionMadre").disable();
        }
      if (this.animal.radioMadre === '2') {
        
        
        this.hmadrenombre = true;
        this.register.get("otraIdentificacionMadre").enable();
       }

       if (this.animal.radioPadre === '3') {
        this.hpadrenombre = false;
        this.register.get("otraIdentificacionPadre").disable();
        }
       if (this.animal.radioPadre === '4') {
      // Do whatever you want here
     
          this.hpadrenombre = true;
          this.register.get("otraIdentificacionPadre").enable();
       }

  
 }


 actualizar( ) {
  let pl = this.register.value;
  
  if (this.hmadrenombre) {
    pl.madreId = null;
  }
  else{
      if(this.myControlAnimalHembra.value!=null)
      {pl.madreId = this.myControlAnimalHembra.value.id}
      
    pl.otraIdentificacionMadre='';
  }
  if (this.hpadrenombre) {
    pl.padreId = null;
  }
  else{
    if(this.myControlAnimalMacho.value!=null)
    { pl.padreId = this.myControlAnimalMacho.value.id; }
      
   
    pl.otraIdentificacionPadre='';
  }
  pl.idGrupoAnimal  = this.myControlGrupo.value.id;

  this._api.getTypeRequest(`animal/existe/${this.animal.id}/${pl.arete}`).subscribe({
    next: (data) => {
         if(data){
                
          this._api.putTypeRequest('animal/' + this.animal.id, pl).subscribe({
            next: (data) => {
              this.router.navigateByUrl('animal/detail/'+this.animal.id);
              
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Datos actualizados Correctamente',
                showConfirmButton: false,
                timer: 1500
              });
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
         else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Ya existe un animal con ese arete o nombre',
            showConfirmButton: false,
            timer: 3500
          });
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


}
