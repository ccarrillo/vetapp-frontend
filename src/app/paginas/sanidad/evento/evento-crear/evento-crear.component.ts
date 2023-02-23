import { Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';
import { SimpleDialogComponent } from './simpleDialog.component';
import {MatDialog,MatDialogConfig,MatDialogRef} from '@angular/material/dialog';
import { DialogadicionalComponent } from './dialogadicional/dialogadicional.component';
import { DialogrecordatorioComponent } from './dialogrecordatorio/dialogrecordatorio.component';
import {Observable, ReplaySubject, Subject, map, startWith, take, takeUntil } from 'rxjs';
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
  listaTipoEvento: any[] = [];
  listaGrupoAnimal: any[] = [];
  listaGrupoEvento: any[] = [];
  objGrupoAnimal: any;
  objGrupoEvento: any;
  dato: any;
  dato2: any;
  objetoEvento: any;
  displayedColumns: string[] = ['no', 'nombre', 'tipo', 'requerido', 'action'];
  displayedColumns2: string[] = ['no', 'nombre', 'dias', 'action'];
  dataSource = new MatTableDataSource<any>(this.datos);
  dataSource2 = new MatTableDataSource<any>(this.datos2);
  habComboCorral: boolean = true;
  habComboTipoEvento: boolean = true;
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  @ViewChild('paginator2', { static: true }) paginator2: MatPaginator;
  @ViewChild('MatTabla1') tabla1!: MatTable<any>
  @ViewChild('MatTabla2') tabla2!: MatTable<any>
  
  sinData: boolean = false;
  sinData2: boolean = false;

  filteredOptions: Observable<any[]>;
  filteredOptionsAnimal: Observable<any[]>;

  /** control for the selected bank */
  myControl = new FormControl(undefined, [Validators.required, this.requireMatch.bind(this)]);
  myControlAnimal = new FormControl(undefined,);

  @Output() changeListMode = new EventEmitter();
  @Input() sendObj: any;

  isAddMode: boolean = true;
  id!: string;

  // Form
  labelForm: FormGroup;
  fileUploadForm: FormGroup;
  hideRequiredControl = new FormControl(false);
  // Form 1
  register: FormGroup;

  hide = true;


  labelBtn: string = 'Registrar';


  breadscrums = [
    {
      title: 'Registrar Evento',
      items: ['Formulario'],
      active: 'Registro'
    }


  ];

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

    if (this.sendObj) {

      this.id = this.sendObj.id;
      this.isAddMode = !this.sendObj.id;
    }
    else{
      this.cargarFiltroParaRegistrar();
      
    }


    if (!this.isAddMode) {
      console.log('ingreso a actualizar');
      this.labelBtn = "Actualizar"//`animal/detail/${id}`
      this._api.getTypeRequest(`tipoevento/${this.sendObj.id}`).subscribe({
        next: (data: any) => {
          this.objGrupoAnimal = data;
         
              this.cargargrupofiltrosActualizar();

          for (var i = 0; i < this.objGrupoAnimal.listaDetallleTipoEventoDTO.length; i++) {
            this.datos.push(this.objGrupoAnimal.listaDetallleTipoEventoDTO[i]);
  
          }
  
          for (var i = 0; i < this.objGrupoAnimal.listaRecordatorioEventoDTO.length; i++) {
            this.datos2.push(this.objGrupoAnimal.listaRecordatorioEventoDTO[i]);
  
          }
          this.tabla1.renderRows();
          this.tabla2.renderRows();
  
          if (this.objGrupoAnimal.checkgrupoanimal) {
  
            this.habComboCorral = false;
          }
          if (this.objGrupoAnimal.checktipoevento) {
            this.habComboTipoEvento = false;
          }
  
          this.register.patchValue(this.objGrupoAnimal);
  
  
        },
        error: (error) => {
  
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

    this._api.getTypeRequest('tipoevento').subscribe({
      next: (data: any) => {
        console.log("ENTRO CARGAR combo");
        console.log(data);
        //this.dataSource = data; //No pagina
        if (data) {
         
          this.listaTipoEvento = data;
        } else {
          console.log('no cargo combo de lista tipo evento');
        }
      },
      error: (error) => {

        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ocurrio un error inesperado, vuelva a intentar',
          showConfirmButton: false,
          timer: 1500
        });
      }


    });

    this.dataSource.paginator = this.paginator;
    this.dataSource2.paginator = this.paginator2;

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.nombre)),
      map((nombre) => (nombre ? this._filter(nombre) : this.listaGrupoEvento.slice())),
    );

    this.filteredOptionsAnimal = this.myControlAnimal.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.nombre)),
      map((nombre) => (nombre? this._filterAnimal(nombre) : this.listaGrupoAnimal.slice())),
      );


  }
  //inicio de filtros
  private requireMatch(control: FormControl): ValidationErrors | null {
    const selection: any = control.value;
    if (this.listaGrupoEvento && this.listaGrupoEvento.indexOf(selection) < 0) {
      return { requireMatch: true };
    }
    return null;
  } 

 
  displayFnGrupoEvento(evento: any): string {
    return evento && evento.nombre ? evento.nombre: '';
  }
  private _filter(nombre: string): any[] {
    const filterValue = nombre.toLowerCase();

    return this.listaGrupoEvento.filter(
      (option) => option.nombre.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayFnGrupoAnimal(animal: any): string {
    return animal && animal.nombre ? animal.nombre: '';
  }
  private _filterAnimal(nombre: string): any[] {
    const filterValue = nombre.toLowerCase();

    return this.listaGrupoAnimal.filter(
      (option) => option.nombre.toLowerCase().indexOf(filterValue) === 0
    );
  }
  //fin de filtros
  cargargrupofiltrosActualizar() {
    this._api.getTypeRequest('grupoevento/sinhijo').subscribe({
      next: (data: any) => {

        if (data) {

          this.listaGrupoEvento = data;
          if(this.objGrupoAnimal.grupoEventoId!= null && this.objGrupoAnimal.grupoEventoId != undefined){
            var index = this.listaGrupoEvento.findIndex(index => index.id == this.objGrupoAnimal.grupoEventoId);
            this.myControl.setValue(this.listaGrupoEvento[index]);
          }
           
        } else {
          console.log('no cargo combo de lista grupo evento sin hijo 2');
        }
      },
      error: (error) => {

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
          //this.sinData = false;
          this.listaGrupoAnimal = data;
          console.log(this.listaGrupoAnimal);
         
           if(this.objGrupoAnimal.idGrupoMover!= null && this.objGrupoAnimal.idGrupoMover != undefined){
              var index = this.listaGrupoAnimal.findIndex(index => index.id == this.objGrupoAnimal.idGrupoMover);
              this.myControlAnimal.setValue(this.listaGrupoAnimal[index]);
           }
         

        } else {
          //this.sinData = true;
          console.log('no cargo combo de lista grupo animal');
        }
      },
      error: (error) => {
        //console.log(error);
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

  cargarFiltroParaRegistrar(){
    this._api.getTypeRequest('grupoevento/sinhijo').subscribe({
      next: (data: any) => {

        if (data) {

          this.listaGrupoEvento = data;

        } else {
          console.log('no cargo combo de lista grupo evento sin hijo 2');
        }
      },
      error: (error) => {

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
          //this.sinData = false;
          this.listaGrupoAnimal = data;

        } else {
          //this.sinData = true;
          console.log('no cargo combo de lista grupo animal');
        }
      },
      error: (error) => {
        //console.log(error);
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
      nombreEvento: ['', [Validators.required]],
      precio: [''],
      abreviacion: [''],
      grupo: [''],
      idEventoRecordatorio: [''],
      checkgrupoanimal: [''],
      checktipoevento: [''],
      myControl:this.myControl,
      myControlAnimal:this.myControlAnimal,
      is_active: [false, [Validators.requiredTrue]]
    });

  }


  habilitarCorral(event: MatCheckboxChange): void {

    this.register.value.checkgrupoanimal = event.checked;
    this.habComboCorral = !this.habComboCorral;
  }

  habilitarTipoEvento(event: MatCheckboxChange): void {
    this.register.value.checktipoevento = event.checked;
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
    if (this.habComboCorral) {
      pl.idGrupoMover = null;
    }
    else {
      pl.idGrupoMover = this.myControlAnimal.value.id;
    }
    if (this.habComboTipoEvento) {
      pl.idEventoRecordatorio = null;
    }
    pl.grupoEventoId = this.myControl.value.id;

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
    if (this.datosAdicionalesEliminados.length > 0 || this.datosRecordatorioEliminados.length > 0) {
      if (this.datosAdicionalesEliminados.length > 0) {
        this.datosAdicionalesEliminados.forEach(element => {
          this.datos.push(element);
        });
      }
      if (this.datosRecordatorioEliminados.length > 0) {
        this.datosRecordatorioEliminados.forEach(element => {
          this.datos.push(element);
        });
      }
    }
    pl.listaDetallleTipoEventoDTO = this.datos;
    pl.listaRecordatorioEventoDTO = this.datos2;
    if (this.habComboCorral) {
      pl.idGrupoMover = null;
    }
    else {
      pl.idGrupoMover = this.myControlAnimal.value.id;
    }
    if (this.habComboTipoEvento) {
      pl.idEventoRecordatorio = null;
    }
    pl.grupoEventoId = this.myControl.value.id;
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
      console.log(adi);
      if (adi != undefined) {
        if (adi.radioInformacion == "2") {
          adi.tdesde = adi.ndesde
          adi.thasta = adi.nhasta
        }
        if (adi.radioInformacion == "3") {
          adi.tdesde = adi.ddesde
          adi.thasta = adi.dhasta
        }
        this.agregar(adi);
      }

    });
  }

  openDialogRecordatorio(): void {
    const dialogRecordatorio = this.dialogModel.open(DialogrecordatorioComponent);
    dialogRecordatorio.afterClosed().subscribe(recor => {
      if (recor != undefined) {
        this.agregarRecordatorio(recor);
      }

    });
  }

  agregar(adi: any) {
    this.datos.push(adi);
    this.tabla1.renderRows();
  }

  agregarRecordatorio(recor: any) {

    this.datos2.push(recor);
    this.tabla2.renderRows();
  }
  editarAdicional(elem: any, edi: number) {
    const dialogo1 = this.dialogModel.open(DialogadicionalComponent, {
      data: elem
    });
    dialogo1.afterClosed().subscribe(art => {
      console.log(art);
      
      if (art.radioInformacion == "2") {
        art.tdesde = art.ndesde
        art.thasta = art.nhasta
        art.ndesde = ""
        art.nhasta = ""
      }
      if (art.radioInformacion == "3") {
        art.tdesde = art.ddesde
        art.thasta = art.dhasta
        art.ddesde = ""
        art.dhasta = ""
      }
      if (art.id == '') {
        this.datos.splice(edi, 1);
        this.datos.splice(edi, 0, art);
        this.tabla1.renderRows();
      }
      else {
        this.datos.splice(edi, 1);
        art.editado = true;
        this.datos.splice(edi, 0, art);
        this.tabla1.renderRows();
      }


    });

  }

  eliminarAdicional(elem: any, edi: number) {
    if (confirm("Esta seguro de borrar el registro?")) {
      if (elem.id != null) {
        elem.eliminado = true;
        this.datosAdicionalesEliminados.push(elem);
        this.datos.splice(edi, 1);
        this.tabla1.renderRows();
      }
      else {
        this.datos.splice(edi, 1);
        this.tabla1.renderRows();
      }

    }
  }

  editarRecordatorio(elem: any, edi: number) {
    const dialogo1 = this.dialogModel.open(DialogrecordatorioComponent, {
      data: elem
    });
    dialogo1.afterClosed().subscribe(art => {
      if (art.id = '') {
        this.datos2.splice(edi, 1);
        this.datos2.splice(edi, 0, art);
        this.tabla2.renderRows();
      }
      else {
        this.datos2.splice(edi, 1);
        art.editado = true;
        this.datos2.splice(edi, 0, art);
        this.tabla2.renderRows();
      }


    });

  }

  eliminarRecordatorio(elem: any, edi: number) {
    if (confirm("Esta seguro de borrar el registro?")) {
      if (elem.id != null) {
        elem.eliminado = true;
        this.datosRecordatorioEliminados.push(elem);
        this.datos2.splice(edi, 1);
        this.tabla2.renderRows();
      }
      else {

        this.datos2.splice(edi, 1);
        this.tabla2.renderRows();
      }

    }
  }

}
