import { formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ParameterVal } from 'src/app/models/parameter-val';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulas-registrar',
  templateUrl: './formulas-registrar.component.html',
  styleUrls: ['./formulas-registrar.component.sass']
})
export class FormulasRegistrarComponent implements OnInit {

  @Output() changeListMode = new EventEmitter();
  @Input() sendObj: any;
  currentDate = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  isAddMode: boolean=true;
  idFormula!: string;

  //Para las pestanas
  step = 0;
  setStep(index: number) { this.step = index; }
  nextStep() { this.step++; }
  prevStep() { this.step--; }

  //Formula
  formula: FormGroup;
  labelBtnFormula: string='Registrar';
  
  //Reparto ProgramaciOn
  repartoProgramacion: FormGroup;
  displayedColumnsRepProg: string[] = ['no', 'orden', 'fechaProgramada', 'action'];
  dataSourceRepProg = new MatTableDataSource<any>();
  @ViewChild('paginatorRepProg') paginatorRepProg: MatPaginator;
  sinDataRepProg: boolean = false;
  

  //Ingredientes
  displayedColumnsIngredientes: string[] = ['nombre', 'costo', 'masaSolida', 'consumoFresco', 'relacionForraje', 
                                            'relacionBaseFresca', 'consumoMS', 'relacionBaseMS', 'action'];
  dataSourceIngredientes = new MatTableDataSource<any>();
  @ViewChild('paginatorIngredientes') paginatorIngredientes: MatPaginator;
  sinDataIngredientes: boolean = false;

  actionBtnDisabled: boolean = false;
  parvetvalue: Array<ParameterVal> = [];
  
  constructor(
    private fb: FormBuilder,
    private _api: ApiService,
    private router: Router
  ) { 
    this.initForm();
  }

  //ngOnInit(): void {
  async ngOnInit() {
    this.sinDataIngredientes=true;
    await this.cargarCombo('parvetvalue/1');
    console.log("ENTRO REGISTRAR");
    if (this.sendObj){
      console.log("sendObj", this.sendObj.id);
      this.idFormula = this.sendObj.id;
      this.isAddMode = !this.sendObj.id;
    }
    if (!this.isAddMode) {
      this.labelBtnFormula="Actualizar"
      this.formula.patchValue(this.sendObj);
      let createdAt =formatDate(this.sendObj.createdAt, 'yyyy-MM-dd', 'en')
      if (createdAt < this.currentDate) {
        //(1) Formula
        this.formula.disable();
        //(2) Reparto ProgramaciOn
        this.repartoProgramacion.disable();
        this.actionBtnDisabled=true;
        //(3)
      }
      //Cargar Listados
      if (this.idFormula){
        await this.cargarRepProg();
        await this.cargarIngredientes();
      }
    }
  }

  //ContrucciOn de formularios
  initForm() {
    this.construirFormFomula();
    this.construirFormRepartoProgramacion();
    //this.repartoProgramacion.get('orden').disable()
  }

  construirFormFomula() {
    this.formula = this.fb.group({
      id: [''],
      categoriaProduccionId: [''],
      mezclaTiempoMinimo: ['', Validators.required],
      observacion: [],
      is_active: [true],
    });
  }

  construirFormRepartoProgramacion() {
    this.repartoProgramacion = this.fb.group({
      id: [''],
      orden: [{value: '# de Orden', disabled: true}],
      fechaProgramada: ['', Validators.required],
      is_active: [true],
    });
  }

  //Carga de combos
  cargarCombo(path: string) {
    this._api.getTypeRequest(path).subscribe({
      next: (data: any) => {
        console.log(data);
        data.forEach((element: any)  => {
          let obj = new ParameterVal();
          obj.id = element.id;
          obj.value = element.name;
          this.parvetvalue.push(obj);
        });
        console.log(this.parvetvalue);
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ocurrio un error al cargar la categoría de formulas, vuelva a intentar',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  //Inicio de CRUD's
  //**(1) FOrmula
  guardarFormula() {
    console.log('Form Value', this.formula.value);
    let pl = this.formula.value;
    console.log('FORMULA', pl);
    if (this.formula.invalid) {
      return;
    }

    if (this.isAddMode) {
      this.crearFormula(pl);
    } else {
      console.log('FORMULA ACTUALIZAR', pl);
      this.actualizarFormula(pl);
    }
    
  }

  private crearFormula(pl: any) {
    this._api.postTypeRequest('formula', pl).subscribe({
      next: (data: any) => {
        console.log(data);
        //Como no se redirecciona de formulario se adecua para actualizar de frente
        this.idFormula = data.id;
        this.isAddMode = !data.id;
        this.labelBtnFormula="Actualizar"

        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos registrados Correctamente',
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

  private actualizarFormula(pl: any) {
    this._api.putTypeRequest('formula/' + this.idFormula, pl).subscribe({
      next: (data) => {
        console.log(data);
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

  //**(2) Reparto ProgramaciOn
  guardarRepProg() {
    console.log('Form Value repartoProgramacion', this.repartoProgramacion.value);
    let pl = this.repartoProgramacion.value;
    console.log('REPARTO_PROGRAMACION', pl);
    if (this.repartoProgramacion.invalid) {
      return;
    }
    if (!!this.idFormula) {
      console.log('REPARTO_PROGRAMACION', !!pl.id);
      if (!!pl.id) {
        this.actualizarRepProg(pl);
      } else {
        this.crearRepProg(pl);
      }
      this.repartoProgramacion.reset();
    } else {
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Primero debe registrar la formula.',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  private crearRepProg(pl: any) {
    this._api.postTypeRequest('repartoProgramacion/formula/'+this.idFormula, pl).subscribe({
      next: (data) => {
        console.log(data);
        //this.router.navigateByUrl('feeding/formula');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos registrados Correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        //this.changeListMode.emit();
        this.cargarRepProg();
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Reparto Programacion: Ocurrio un error inesperado, vuelva a intentar',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  private actualizarRepProg(pl: any) {
    this._api.putTypeRequest('repartoProgramacion/'+pl.id+'/formula/'+this.idFormula, pl).subscribe({
      next: (data) => {
        console.log(data);
        //this.router.navigateByUrl('feeding/formula');
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Datos actualizados Correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        //this.changeListMode.emit();
        this.cargarRepProg();
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Reparto Programacion: Ocurrio un error inesperado, vuelva a intentar',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  eliminarRepProg(item: any) {
    this._api.deleteTypeRequest('repartoProgramacion/'+item.id+'/formula/'+this.idFormula).subscribe({
      next: (data) => {
        console.log(data);
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Registro eliminado Correctamente',
          showConfirmButton: false,
          timer: 1500
        });
        this.cargarRepProg();
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Reparto Programacion: Ocurrio un error inesperado, vuelva a intentar',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  cargarRepProg() {
    this._api.getTypeRequest('repartoProgramacion/formula/'+this.idFormula).subscribe({
      next: (data: any) => {
        console.log("LISTAR repartoProgramacion");
        console.log(data);
        if (data) {
          this.sinDataRepProg = false;
          this.dataSourceRepProg = new MatTableDataSource(data);//Es necesario instanciar MatTableDataSource para paginar
          this.dataSourceRepProg.paginator = this.paginatorRepProg;
        } else {
          this.sinDataRepProg = true;
        }
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Reparto Programacion: Ocurrio un error inesperado, vuelva a intentar',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  editarRepProg(item: any) {
    this._api.getTypeRequest('repartoProgramacion/'+item.id).subscribe({
      next: (data: any) => {
        console.log('EDITAR: ',data);
        this.repartoProgramacion.patchValue({
          id: data.id,
          //orden: data.orden,
          fechaProgramada: data.fechaProgramada
        })
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

  //**(3) Ingredientes
  cargarGuardarIngredientes() {
    console.log('categoriaProduccionId', this.formula.get("categoriaProduccionId").value)
    this._api.getTypeRequest('ingredientes/masivo/formula/'+this.idFormula+'/categoriaFormula/'+this.formula.get("categoriaProduccionId").value).subscribe({
      next: (data: any) => {
        console.log('insumo: ',data);
        if (data) {
          this.sinDataIngredientes = false;
          this.dataSourceIngredientes = new MatTableDataSource(data);//Es necesario instanciar MatTableDataSource para paginar
          this.dataSourceIngredientes.paginator = this.paginatorIngredientes;
        } else {
          this.sinDataIngredientes = true;
        }
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ingredientes: Ocurrio un error inesperado, vuelva a intentar',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  cargarIngredientes() {
    this._api.getTypeRequest('ingredientes/formula/'+this.idFormula).subscribe({
      next: (data: any) => {
        console.log("LISTAR ingredientes", data);
        if (data) {
          this.sinDataIngredientes = false;
          this.dataSourceIngredientes = new MatTableDataSource(data);//Es necesario instanciar MatTableDataSource para paginar
          this.dataSourceIngredientes.paginator = this.paginatorIngredientes;
        } else {
          this.sinDataIngredientes = true;
        }
      },
      error: (error) => {
        console.log(error);
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Ingredientes: Ocurrio un error inesperado, vuelva a intentar',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  editarIngredientes(item: any) {
    /*this._api.getTypeRequest('repartoProgramacion/'+item.id).subscribe({
      next: (data: any) => {
        console.log('EDITAR: ',data);
        this.repartoProgramacion.patchValue({
          id: data.id,
          //orden: data.orden,
          fechaProgramada: data.fechaProgramada
        })
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
    });*/
  }

}
