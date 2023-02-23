import { AfterViewInit,Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {  FormBuilder,  FormControl,  FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Constantes } from 'src/app/shared/constantes/constantes';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';
import { GrupoAnimal } from 'src/app/core/models/grupo_animal';
import {  Observable, ReplaySubject,Subject, map, startWith, take, takeUntil } from 'rxjs';
import { GrupoInseminacion } from 'src/app/core/models/grupo_inseminacion';




@Component({
  selector: 'app-inventario-registrar',
  templateUrl: './inventario-registrar.component.html',
  styleUrls: ['./inventario-registrar.component.sass']
})
export class InventarioRegistrarComponent implements OnInit  {

    idIncremental: number = 0;
    idIncrementalPadre:number;
    listaGrupo: GrupoAnimal [] =  [];
    grupAnimal: GrupoAnimal;
    grupoInseminacion: GrupoInseminacion;

    option:any;

  @Output() changeListMode = new EventEmitter();
  @Input() sendObj: any;
  objInventario: any;
  hmadrenombre:boolean;
  hpadrenombre:boolean; 
  
  
  isAddMode: boolean=true;
  id!: string;

 // Form 1
 register: FormGroup;
 grupoFormGroup: FormGroup;


  myControlAnimalHembra=  new FormControl(undefined);
  myControlAnimalMacho= new FormControl(undefined);
  myControlGrupo= new FormControl(undefined, [Validators.required, this.requireMatch.bind(this)]);

  filteredOptionsAnimalesHembra: Observable<any[]>;
  filteredOptionsAnimalesMacho: Observable<any[]>;
  filteredOptionsGrupo: Observable<any[]>;

 
 listaRaza: any [] =  [];
 listaAnimalesMachos:any [] =  [];
 listaAnimalesHembras:any [] =  [];
 listaGrupoInventario: GrupoInseminacion[] =  [];
  

  hide = true;
  sinData: boolean = false;
  labelBtn: string='Registrar';

  constructor(
    private fb: FormBuilder,
    private _api: ApiService,
    private router: Router,
  ) {
    this.initForm();
  }

  

  ngOnInit(): void {
    this.register.get("otraIdentificacionMadre").disable();
    this.register.get("otraIdentificacionPadre").disable();
    console.log("ENTRO REGISTRAR");
    if (this.sendObj){
      console.log("sendObj", this.sendObj.id);
      this.id = this.sendObj.id;
      this.isAddMode = !this.sendObj.id;
    }
    if (!this.isAddMode) {
      this.labelBtn="Actualizar"//`animal/detail/${id}`
      this._api.getTypeRequest(`inventariosemen/${this.sendObj.id}`).subscribe({
        next: (data: any) => {
          this.objInventario =  data
          if (this.objInventario.radioMadre === '1') {
            this.hmadrenombre = false;
            this.register.get("otraIdentificacionMadre").disable();
        }
      if (this.objInventario.radioMadre === '2') {
            this.hmadrenombre = true;
            this.register.get("otraIdentificacionMadre").enable();
       }

       if (this.objInventario.radioPadre === '3') {
            this.hpadrenombre = false;
            this.register.get("otraIdentificacionPadre").disable();
        }
       if (this.objInventario.radioPadre === '4') {
          this.hpadrenombre = true;
          this.register.get("otraIdentificacionPadre").enable();
       }
          this.register.patchValue(this.objInventario);
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
           if(this.objInventario.idMadre!= null && this.objInventario.idMadre != undefined && this.objInventario.idMadre != ''){
            var index = this.listaAnimalesHembras.findIndex(index => index.id == this.objInventario.idMadre);
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
           if(this.objInventario.idPadre!= null && this.objInventario.idPadre != undefined && this.objInventario.idPadre != ''){
            var index = this.listaAnimalesMachos.findIndex(index => index.id == this.objInventario.idPadre);
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
    
    this._api.getTypeRequest('grupoinventariosemen').subscribe({
      next: (data: any) => {
        if (data) {
          this.sinData = false;
           this.listaGrupoInventario = data;
           if(this.objInventario.idGrupoInventario!= null && this.objInventario.idGrupoInventario != undefined && this.objInventario.idGrupoInventario != ''){
            var index = this.listaGrupoInventario.findIndex(index => index.id == this.objInventario.idGrupoInventario);
            this.myControlGrupo.setValue(this.listaGrupoInventario[index]);
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
    this.filteredOptionsGrupo = this.myControlGrupo.valueChanges.pipe(
      startWith(''),
      map((value3) => (typeof value3 === 'string' ? value3 : value3.nombre)),
      map((nombre) => (nombre ? this._filterGrupo(nombre) : this.listaGrupoInventario.slice()))
    );


    
   
  }

   //inicio filtros

   private requireMatch(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    if (this.listaGrupoInventario && this.listaGrupoInventario.indexOf(selection) < 0) {
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

    return this.listaGrupoInventario.filter(
      (option) => option.nombre.toLowerCase().indexOf(filterValue) === 0
    );
  }
  
  //fin de filtros

  initForm() {
    this.register = this.fb.group({
      id: [''],
      //idGrupoInventario:[''],
      nombre: ['',[Validators.required]],
      reproductorNumero: [''],
      numeroRegistro: [''],
      nombreNum: ['',[Validators.required]],
      udc: [''],
      milkLbs: [''],
      grasa: [''],
      proteina: [''],
      meritoNeto: [''],
      idraza: ['',[Validators.required]],
      otro: [''],
      idMadre: [''],
      idPadre: [''],
      radioMadre:[''],
      radioPadre:[''],
      otraIdentificacionMadre:[''],
      otraIdentificacionPadre:[''],
      numPajuelasDisponibles: ['',[Validators.required]],
      precio: [''],
      observacion: [''],
      myControlAnimalHembra: this.myControlAnimalHembra,
      myControlAnimalMacho: this.myControlAnimalMacho,
      myControlGrupo: this.myControlGrupo,
      is_active: [false, [Validators.requiredTrue]]
    });
    
  }
    

  guardar() {
   
    let pl = this.register.value;
     
    if (this.register.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.crear(pl);
    } else {
      this.actualizar(pl);
    }
  }

  private crear(pl: any) {

    this._api.getTypeRequest(`inventariosemen/existe/${pl.nombreNum}`).subscribe({
      next: (data) => {
           if(data){
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
             
            pl.idGrupoInventario=this.myControlGrupo.value.id;
        
            this._api.postTypeRequest('inventariosemen', pl).subscribe({
              next: (data) => {
            
                this.router.navigateByUrl('reproduction/inventario');
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
           else{
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Ya existe una pajilla con ese nombre/numero',
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

  private actualizar(pl: any) {
     
    this._api.getTypeRequest(`inventariosemen/existe/${pl.id}/${pl.nombreNum}`).subscribe({
      next: (data) => {
           if(data){
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
             
            pl.idGrupoInventario=this.myControlGrupo.value.id;
        
           this._api.putTypeRequest('inventariosemen/' +pl.id, pl).subscribe({
              next: (data) => {
                console.log(data);
                this.router.navigateByUrl('reproduction/inventario');
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
          
           else{
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Ya existe una pajilla con ese nombre/numero',
              showConfirmButton: false,
              timer: 3500
            });
           }
          
          }})

   
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
      this.hpadrenombre = true;
      this.register.get("otraIdentificacionPadre").enable();
     }
 }









}
