import { AfterViewInit,Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {  FormBuilder,  FormControl,  FormGroup, Validators } from '@angular/forms';
import { Constantes } from 'src/app/shared/constantes/constantes';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatRadioChange } from '@angular/material/radio';
import { GrupoAnimal } from 'src/app/core/models/grupo_animal';
import {  ReplaySubject,Subject, take, takeUntil } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { GrupoInseminacion } from 'src/app/core/models/grupo_inseminacion';




@Component({
  selector: 'app-inventario-registrar',
  templateUrl: './inventario-registrar.component.html',
  styleUrls: ['./inventario-registrar.component.sass']
})
export class InventarioRegistrarComponent implements OnInit, AfterViewInit, OnDestroy {

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
  /** control for the selected bank */
  bankCtrl: FormControl = new FormControl();
   /** control for the MatSelect filter keyword */
  bankFilterCtrl: FormControl = new FormControl();

 
 listaRaza: any [] =  [];
 listaAnimalesMachos:any [] =  [];
 listaAnimalesHembras:any [] =  [];
 listaGrupoInventario: GrupoInseminacion[] =  [];
     /** list of banks filtered by search keyword */
 filteredBanks: ReplaySubject<GrupoInseminacion[]> = new ReplaySubject<GrupoInseminacion[]>(1);
 @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;

 /** Subject that emits when the component has been destroyed. */
 protected _onDestroy = new Subject<void>();

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
          console.log("ENTRO a pasar a objeto");
          this.objInventario =  data
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
    
    this._api.getTypeRequest('grupoinventariosemen').subscribe({
      next: (data: any) => {
       /* console.log("ENTRO CARGAR combo");
        console.log(data);*/
        //this.dataSource = data; //No pagina
        if (data) {
          this.sinData = false;
           this.listaGrupoInventario = data;
           if(!this.isAddMode)
           {  
               var index = this.listaGrupoInventario.findIndex(index => index.id == this.objInventario.idGrupoInventario);
              this.bankCtrl.setValue(this.listaGrupoInventario[index]);
           }
            else{
                 // set initial selection
           this.bankCtrl.setValue(this.listaGrupoInventario[0]);

            } 

            // load the initial bank list
            this.filteredBanks.next(this.listaGrupoInventario.slice());


            // listen for search field value changes
            this.bankFilterCtrl.valueChanges
              .pipe(takeUntil(this._onDestroy))
              .subscribe(() => {
                this.filterBanks();
              });
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
  ngAfterViewInit() {
    this.setInitialValue();
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  

  /**
   * Sets the initial value after the filteredBanks are loaded initially
   */
   protected setInitialValue() {
    this.filteredBanks
      .pipe(take(this.objInventario.id), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: GrupoInseminacion, b: GrupoInseminacion) => a && b && a.id === b.id;
      });
  }
  protected filterBanks() {
    if (!this.listaGrupoInventario) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.listaGrupoInventario.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.listaGrupoInventario.filter(bank => bank.nombre.toLowerCase().indexOf(search) > -1)
    );
  } 

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
      is_active: [false, [Validators.requiredTrue]]
    });
    
  }
    

  guardar() {
   
    let pl = this.register.value;
    console.log('inventario', pl);
    if (this.register.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.crear(pl);
    } else {
      console.log('Recordatorio ACTUALIZAR', pl);
      this.actualizar(pl);
    }
  }

  private crear(pl: any) {
    
    if(this.register.value.radioMadre==='1'){
      pl.otraIdentificacionMadre='';
    }
    if(this.register.value.radioMadre==='2'){
      pl.idMadre=null;
    }
   
    if(this.register.value.radioPadre==='3'){
      pl.otraIdentificacionPadre='';
    }
    if(this.register.value.radioPadre==='4'){
      pl.idPadre=null;
    }
    pl.idGrupoInventario=this.bankCtrl.value?.id;

    this._api.postTypeRequest('inventariosemen', pl).subscribe({
      next: (data) => {
        console.log(data);
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

  private actualizar(pl: any) {
      
      if(this.register.value.radioMadre==='1'){
        pl.otraIdentificacionMadre='';
      }
      if(this.register.value.radioMadre==='2'){
        pl.idMadre=null;
      }
      if(this.register.value.radioPadre==='3'){
        pl.otraIdentificacionPadre='';
      }
      if(this.register.value.radioPadre==='4'){
        pl.idPadre=null;
      }
      pl.idGrupoInventario=this.bankCtrl.value?.id;

   this._api.putTypeRequest('inventariosemen/' + this.id, pl).subscribe({
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
    // Do whatever you want here
    console.log('entro');
    this.hpadrenombre = true;
    this.register.get("otraIdentificacionPadre").enable();
     }
 }



agrega(){
  for(let x=0;x<9;x++){
    this.idIncremental++;
    this.grupAnimal = new GrupoAnimal(this.idIncremental, 0, `alex${x+1}`);
    this.listaGrupo.push(this.grupAnimal);
  }
  
   this.idIncremental++;
 
    var values = this.listaGrupo;
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var select   = document.createElement("select");
    select.name = "pets";
    select.id="pets"+this.idIncremental;
 
    for (const val of values)
    {
        var option = document.createElement("option");
        option.id = val.identificador.toString();
        option.value = val.identificador.toString();
        option.text = val.nombre.toUpperCase() ;
       
        select.appendChild(option);
    }
 
    var label = document.createElement("label");
    label.innerHTML = "Choose your pets: "
    label.htmlFor = "pets";
    
    document.getElementById("container").appendChild(tr).appendChild(td).appendChild(label).appendChild(select);
     document.querySelectorAll("select").forEach(ejemplo => {
      ejemplo.addEventListener("change", () => alert(`Captura: ${ejemplo.options[ejemplo.selectedIndex].text}`), true);
      ejemplo.addEventListener("change", () => alert(`Captura: ${ejemplo.options[ejemplo.selectedIndex].id}`), true);
      ejemplo.addEventListener("change", () => {this.selecciona(`${ejemplo.options[ejemplo.selectedIndex].id}`)}, true);
    });;
 
}


  selecciona(id:any) {
    let listaGrup:  GrupoAnimal []= [];
    let gruAnimal: GrupoAnimal;
    let incrementa=0;
    for(let x=0;x<9;x++){
       incrementa++;
       gruAnimal = new GrupoAnimal(incrementa, 0, `alfa${x+1}`);
       listaGrup.push(gruAnimal);
    }
    
     incrementa++;
   
      var values = listaGrup;
   
      var select   = document.createElement("select");
      var tr = document.createElement('tr');
      var td = document.createElement('td');
      select.name = "pets";
      select.id="pets"+this.idIncremental;

   
      for (const val of values)
      {
          var option = document.createElement("option");
          option.id = val.identificador.toString();
          option.value = val.identificador.toString();
          option.text = val.nombre.toUpperCase() ;
         
          select.appendChild(option);
      }
   
      var label = document.createElement("label");
      label.innerHTML = "Choose your pets: "
      label.htmlFor = "pets";
      
      //document.getElementById("container").appendChild(label).appendChild(select);
      document.getElementById("container").appendChild(tr).appendChild(td).appendChild(label).appendChild(select);
       document.querySelectorAll("select").forEach(ejemplo => {
        ejemplo.addEventListener("change", () => alert(`Captura: ${ejemplo.options[ejemplo.selectedIndex].text}`), true);
        ejemplo.addEventListener("change", () => alert(`Captura: ${ejemplo.options[ejemplo.selectedIndex].id}`), true);
        ejemplo.addEventListener("change", () => {this.selecciona(`${ejemplo.options[ejemplo.selectedIndex].id}`)}, true);
      });;

  console.log( 'llego aqui'+id) ;
   
}







}
