import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators,  FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { SimpleDialogComponent } from './simpleDialog.component';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef
} from '@angular/material/dialog';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { DialogadicionalComponent } from './dialogadicional/dialogadicional.component';
import { DialogrecordatorioComponent } from './dialogrecordatorio/dialogrecordatorio.component';
import { ReplaySubject, Subject, take, takeUntil } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-evento-crear',
  templateUrl: './evento-crear.component.html',
  styleUrls: ['./evento-crear.component.css']
})
export class EventoCrearComponent implements OnInit {
  datos: any[] = [];
  datos2: any[] = [];
  datosAdicionalesEliminados: any[] = [];
  datosRecordatorioEliminados: any[] = [];
  listaTipoEvento: any [] =  [];
  listaGrupoAnimal: any[] =  [];
  listaGrupoEvento: any[] =  [];
  objGrupoAnimal: any;
  objGrupoEvento: any;
  dato: any;
  dato2: any;
  objetoEvento: any;
  displayedColumns: string[] = ['no', 'nombre', 'tipo', 'requerido', 'action'];
  displayedColumns2: string[] = ['no', 'nombre', 'dias', 'action'];
  dataSource = new MatTableDataSource<any>(this.datos);
  dataSource2 = new MatTableDataSource<any>(this.datos2);
  habComboCorral: boolean=true;
  habComboTipoEvento: boolean=true;
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChild('paginator2', {static: true}) paginator2: MatPaginator;
  @ViewChild('MatTabla1') tabla1!: MatTable<any>
  @ViewChild('MatTabla2') tabla2!: MatTable<any>
  sinData: boolean = false;
  sinData2: boolean = false;

  /** control for the selected bank */
  grupoCtrl: FormControl = new FormControl();
  eventoCtrl: FormControl = new FormControl();
   /** control for the MatSelect filter keyword */
  grupoFilterCtrl: FormControl = new FormControl();
  eventoFilterCtrl: FormControl = new FormControl();

  filteredGrupos: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  filteredEventos: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
  @ViewChild('singleSelect', { static: true }) singleSelect: MatSelect;
  @ViewChild('singleEventoSelect', { static: true }) singleEventoSelect: MatSelect;
   /** Subject that emits when the component has been destroyed. */
 protected _onDestroy = new Subject<void>();
     

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
      
      hide = true;
      

      labelBtn: string='Registrar';

      
   breadscrums = [
    {
      title: 'Registrar Evento',
      items: ['Formulario'],
      active: 'Registro'
    }


  ];
  //simpleDialog: any;
  //dialogModel: any;
  simpleDialog: MatDialogRef<SimpleDialogComponent>;
  dialogConfig: MatDialogConfig;
  constructor( 
    private dialogModel: MatDialog,
    private fb: FormBuilder,
    private _api: ApiService,
    private router: Router
    ) {
      this.initForm();
      
     }

  ngOnInit(): void {
      this.dataSource.paginator = this.paginator;
      this.dataSource2.paginator = this.paginator2;
      if (this.sendObj){
        console.log("sendObj", this.sendObj.id);
        this.id = this.sendObj.id;
        this.isAddMode = !this.sendObj.id;
      }
    if (!this.isAddMode) {
      console.log('ingreso a actualizar');
      this.labelBtn="Actualizar"//`animal/detail/${id}`

      this._api.getTypeRequest(`tipoevento/${this.sendObj.id}`).subscribe({
        next: (data: any) => {
          console.log("ENTRO a pasar a objeto");
          this.objGrupoAnimal =  data;
          for(var i = 0; i < this.objGrupoAnimal.listaDetallleTipoEventoDTO.length; i++)
          {
                  this.datos.push(this.objGrupoAnimal.listaDetallleTipoEventoDTO[i]);
                 
          }
          
          for(var i = 0; i < this.objGrupoAnimal.listaRecordatorioEventoDTO.length; i++)
          {
                  this.datos2.push(this.objGrupoAnimal.listaRecordatorioEventoDTO[i]);
                 
          }
          this.tabla1.renderRows();
          this.tabla2.renderRows();
         
            if(this.objGrupoAnimal.checkgrupoanimal)
            {
              
              this.habComboCorral=false;
            }
            if(this.objGrupoAnimal.checkgrupoanimal)
            {
              this.habComboTipoEvento=false;
            }

          this.register.patchValue(this.objGrupoAnimal);

          
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

    this._api.getTypeRequest('grupoanimal/sinhijo').subscribe({
      next: (data: any) => {
       /* console.log("ENTRO CARGAR combo");
        console.log(data);*/
        //this.dataSource = data; //No pagina
        if (data) {
          this.sinData = false;
           this.listaGrupoAnimal = data;
           if(!this.isAddMode)
           {  
               var index = this.listaGrupoAnimal.findIndex(index => index.id == this.objGrupoAnimal.idGrupoMover);
              this.grupoCtrl.setValue(this.listaGrupoAnimal[index]);
               // load the initial bank list
            this.filteredGrupos.next(this.listaGrupoAnimal.slice());


            // listen for search field value changes
            this.grupoFilterCtrl.valueChanges
              .pipe(takeUntil(this._onDestroy))
              .subscribe(() => {
                this.filterGrupos();
              });
           }
            else{
                 // set initial selection
           this.grupoCtrl.setValue(this.listaGrupoAnimal[0]);
           this.filteredGrupos.next(this.listaGrupoAnimal.slice());


           // listen for search field value changes
           this.grupoFilterCtrl.valueChanges
             .pipe(takeUntil(this._onDestroy))
             .subscribe(() => {
               this.filterGrupos();
             });

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
    

    this._api.getTypeRequest('tipoevento').subscribe({
      next: (data: any) => {
       console.log("ENTRO CARGAR combo");
        console.log(data);
        //this.dataSource = data; //No pagina
        if (data) {
          this.sinData = false;
           this.listaTipoEvento = data;
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
    

    this._api.getTypeRequest('grupoevento/sinhijo').subscribe({
      next: (data: any) => {
       /* console.log("ENTRO CARGAR combo");
        console.log(data);*/
        //this.dataSource = data; //No pagina
        if (data) {
          this.sinData = false;
           this.listaGrupoEvento = data;
           if(!this.isAddMode)
           {  
               var index = this.listaGrupoEvento.findIndex(index => index.id == this.objGrupoAnimal.grupoEventoId);
              this.eventoCtrl.setValue(this.listaGrupoEvento[index]);

               // load the initial bank list
            this.filteredEventos.next(this.listaGrupoEvento.slice());


            // listen for search field value changes
            this.eventoFilterCtrl.valueChanges
              .pipe(takeUntil(this._onDestroy))
              .subscribe(() => {
                this.filterGruposEventos();
              });
           }
            else{
                 // set initial selection
           this.eventoCtrl.setValue(this.listaGrupoEvento[0]);

               // load the initial bank list
               this.filteredEventos.next(this.listaGrupoEvento.slice());


               // listen for search field value changes
               this.eventoFilterCtrl.valueChanges
                 .pipe(takeUntil(this._onDestroy))
                 .subscribe(() => {
                   this.filterGruposEventos();
                 });

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


  }

  ngAfterViewInit() {
    this.setInitialValue();
    this.setInitialEventoValue();
  }
  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }
   

  protected setInitialValue() {
    this.filteredGrupos
      .pipe(take(this.objGrupoAnimal.id), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
      });
  }

  protected setInitialEventoValue() {
    this.filteredEventos
      .pipe(take(this.objGrupoEvento.id), takeUntil(this._onDestroy))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredBanks are loaded initially
        // and after the mat-option elements are available
        this.singleEventoSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
      });
  }
  protected filterGrupos() {
    if (!this.listaGrupoAnimal) {
      return;
    }
    // get the search keyword
    let search = this.grupoFilterCtrl.value;
    if (!search) {
      this.filteredGrupos.next(this.listaGrupoAnimal.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredGrupos.next(
      this.listaGrupoAnimal.filter(bank => bank.nombre.toLowerCase().indexOf(search) > -1)
    );
  }


  protected filterGruposEventos() {
    if (!this.listaGrupoEvento) {
      return;
    }
    // get the search keyword
    let search = this.eventoFilterCtrl.value;
    if (!search) {
      this.filteredEventos.next(this.listaGrupoEvento.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredEventos.next(
      this.listaGrupoEvento.filter(bank => bank.nombre.toLowerCase().indexOf(search) > -1)
    );
  } 


  initForm() {
    this.register = this.fb.group({
      id: [''],
      nombreEvento: ['', [Validators.required]],
      precio: [''],
      abreviacion: [''],
      grupo: [''],
      idEventoRecordatorio: [''],
      checkgrupoanimal: [''],
      checktipoevento: [''],
      is_active: [false, [Validators.requiredTrue]]
    });
    
  }
  
  habilitarCorral(event:MatCheckboxChange): void {
    
    this.register.value.checkgrupoanimal=event.checked;
    this.habComboCorral = !this.habComboCorral;
  }

  habilitarTipoEvento(event:MatCheckboxChange): void {
    this.register.value.checktipoevento=event.checked;
    this.habComboTipoEvento = !this.habComboTipoEvento;
  }
  
  guardar() {
    //console.log('Form Value', this.register.value);
    let pl = this.register.value;
    console.log('Evento', pl);
    if (this.register.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.crear(pl);
    } else {
      console.log('Evento ACTUALIZAR', pl);
      this.actualizar(pl);
    }
  }

  private crear(pl: any) {
    //console.log('Form Value', pl);
    pl.listaDetallleTipoEventoDTO = this.datos;
    pl.listaRecordatorioEventoDTO = this.datos2;
    if(this.habComboCorral){
      pl.idGrupoMover =null;
    }
    else{
      pl.idGrupoMover = this.grupoCtrl.value?.id;
    }
    if(this.habComboTipoEvento)
    {
      pl.idEventoRecordatorio=null;
    }
    pl.grupoEventoId = this.eventoCtrl.value?.id;
    
    
   
    //console.log('lista evento', pl);
    this._api.postTypeRequest('tipoevento', pl).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('health/events');
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
    pl.listaDetallleTipoEventoDTO = this.datos;
    pl.listaRecordatorioEventoDTO = this.datos2;
    if(this.habComboCorral){
      pl.idGrupoMover =null;
    }
    else{
      pl.idGrupoMover = this.grupoCtrl.value?.id;
    }
    if(this.habComboTipoEvento)
    {
      pl.idEventoRecordatorio=null;
    }
    pl.grupoEventoId = this.eventoCtrl.value?.id;
    this._api.putTypeRequest('tipoevento/' + this.id, pl).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('health/events');
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
  


  openDialog(): void {
    const dialogAdicional = this.dialogModel.open(DialogadicionalComponent);
    dialogAdicional.afterClosed().subscribe(adi => {
      
      if (adi != undefined){
        this.agregar(adi);
      }
      
    });
  }

  openDialogRecordatorio(): void {
    const dialogRecordatorio = this.dialogModel.open(DialogrecordatorioComponent);
    dialogRecordatorio.afterClosed().subscribe(recor => {
      if (recor != undefined)
      {
        this.agregarRecordatorio(recor);
      }
        
    });
  }
  
  agregar(adi: any) {
    this.datos.push(adi);
    this.tabla1.renderRows();
  }

  agregarRecordatorio(recor:any){
     
     this.datos2.push(recor);
     this.tabla2.renderRows();
  }
  editarAdicional(elem:any,edi: number){
    const dialogo1 = this.dialogModel.open(DialogadicionalComponent, {
      data: elem
    });
    dialogo1.afterClosed().subscribe(art => {
        if(art.id=''){
          this.datos.splice(edi, 1);
          this.datos.splice(edi,0,art);
          this.tabla1.renderRows();
        }
        else{
          this.datos.splice(edi, 1);
          art.editado= true;
          this.datos.splice(edi,0,art);
          this.tabla1.renderRows();
        }
        
       
    });

  }

  eliminarAdicional(elem:any,edi: number){
    if (confirm("Esta seguro de borrar el registro?")) {
          if(elem.id!=null)
          {
            elem.eliminado = true;
            this.datosAdicionalesEliminados.push(elem);
            this.datos.splice(edi, 1);
            this.tabla1.renderRows();
          }
          else{
            this.datos.splice(edi, 1);
            this.tabla1.renderRows();
          }
          
    }
  }

  editarRecordatorio(elem:any,edi: number){
    const dialogo1 = this.dialogModel.open(DialogrecordatorioComponent, {
      data: elem
    });
    dialogo1.afterClosed().subscribe(art => {
        if(art.id=''){
          this.datos2.splice(edi, 1);
          this.datos2.splice(edi,0,art);
          this.tabla2.renderRows();
        }
        else{
          this.datos2.splice(edi, 1);
          art.editado= true;
          this.datos2.splice(edi,0,art);
          this.tabla2.renderRows();
        }
        
       
    });

  }

  eliminarRecordatorio(elem:any,edi: number){
    if (confirm("Esta seguro de borrar el registro?")) {
          if(elem.id!=null)
          {
            elem.eliminado = true;
            this.datosRecordatorioEliminados.push(elem);
            this.datos2.splice(edi, 1);
            this.tabla2.renderRows();
          }
          else{
           
            this.datos2.splice(edi, 1);
            this.tabla2.renderRows();
          }
          
    }
  }
  
}
