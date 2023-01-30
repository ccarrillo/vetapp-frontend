
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DetalleProtocolo } from 'src/app/core/models/detalle_protocolo';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-protocolo-crear',
  templateUrl: './protocolo-crear.component.html',
  styleUrls: ['./protocolo-crear.component.sass']
})
export class ProtocoloCrearComponent implements OnInit {

  @Output() changeListMode = new EventEmitter();
  @Input() sendObj: any;

  isAddMode: boolean=true;
  id!: string;

  hide = true;
  labelBtn: string='Registrar';

  objProtocolo: any;
  listaGrupoProtocolo: any[] =  [];
  listaTipoEvento: any [] =  [];
  listaDetalleProtocolo: any [] =  [];
  listaEliminadosDetalleProtocolo: any [] =  [];
  sinData: boolean = false;
  register: FormGroup;
  x: number;

  constructor( private dialogModel: MatDialog,
    private fb: FormBuilder,
    private _api: ApiService,
    private router: Router,
    private renderer:Renderer2
    ) { 
      
      this.initForm();
          
    }

  @ViewChild('one', { static: false }) d1: ElementRef;


  

  ngOnInit(): void {

    
    this.x = 0;

    let respuesta = async () =>  await this._api.getTypeRequest('tipoevento').subscribe({
      next: (data: any) => {
        if (data) {
          this.sinData = false;
          this.listaTipoEvento = data;
        } else {
          this.sinData = true;
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
   
     respuesta().then(
         res => {
          if (this.sendObj){
            console.log("sendObj", this.sendObj.id);
            this.id = this.sendObj.id;
            this.isAddMode = !this.sendObj.id;
          }
          if (!this.isAddMode) {
            this.labelBtn="Actualizar"
            
            this._api.getTypeRequest(`protocolo/porid/${this.sendObj.id}`).subscribe({
              next: (data: any) => {
                console.log("ENTRO a pasar a objeto");
                this.objProtocolo =  data;
            
                this.objProtocolo.listaDetallleProtocoloDTO.forEach(element =>{
                          this.cargar(element);
                          //this.listaDetalleProtocolo = [];
                });
                
      
                
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
            
            this.register.patchValue(this.sendObj);
      
          }
      
          this._api.getTypeRequest('grupoprotocolo/sinhijo').subscribe({
            next: (data: any) => {
      
              
              //this.dataSource = data; //No pagina
              if (data) {
                this.sinData = false;
                 this.listaGrupoProtocolo = data;
              } else {
                this.sinData = true;
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

         }
     ).catch(err => console.log(err));
    

  }
  
  initForm() {
   
    this.register = this.fb.group({
      id: [''],
      nombre: ['', [Validators.required]],
      grupoProtocoloId: [''],
      is_active: [false, [Validators.requiredTrue]]
    });
    
  }


  guardar() {
    //console.log('Form Value', this.register.value);
    let pl = this.register.value;
    console.log('protocolo', pl);
    if (this.register.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.crear(pl);
    } else {
      console.log('protocolo ACTUALIZAR', pl);
      this.actualizar(pl);
    }
  }
 
   obtenerDatosFormulario(){ 
    let select = document.getElementsByClassName('combo');
    //let input = document.getElementsByClassName('cajatexto');

    if(select.length > 0){
     for ( let i=0; i<select.length; i++) {
     
     let detalle = new DetalleProtocolo();
     let elemento  =  document.getElementsByClassName("combo")[i].id;
     let caja  =  document.getElementsByClassName("cajatexto")[i].id;
     let cajaOculta  =  document.getElementsByClassName("cajaoculto")[i].id;
     let id = (<HTMLSelectElement>document.getElementById(elemento)).options[(<HTMLSelectElement>document.getElementById(elemento)).selectedIndex].value;
     let numero= (<HTMLInputElement>document.getElementById(caja)).value;
     let numoculto= (<HTMLInputElement>document.getElementById(cajaOculta)).value;
     if(id!='selecciona' && numero!=''){
       if(i==0){
         if(parseInt(numero)>0){
          Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: 'En el primer evento los dias tienen que ser igual a cero',
            showConfirmButton: false,
            timer: 3500
          });
          //this.changeListMode.emit();
           return {
            error: true,
            message: "En el primer evento los dias tienen que ser igual a cero"
           };
          }
         }
         if(numoculto!="")
           {
            detalle.setId(parseInt(numoculto));
           }
        else{
             detalle.setId(null);
            }
       detalle.setIdtipoevento(parseInt(id));
       detalle.setNumerodias(parseInt(numero));
       this.listaDetalleProtocolo.push(detalle);
       

     }
     else{
      
       Swal.fire({
         position: 'top-end',
         icon: 'info',
         title: 'Tiene que seleccionar un evento y llenar los dias',
         showConfirmButton: false,
         timer: 3500
       });
       return {
        error: true,
        message: "Tiene que seleccionar un evento y llenar los dias"
       };
     }

     

     }

     //pl.listaDetallleProtocoloDTO = this.listaDetalleProtocolo;

    }
    else{
     Swal.fire({
       position: 'top-end',
       icon: 'info',
       title: 'Tiene que agregar al menos un evento',
       showConfirmButton: false,
       timer: 3500
     });

     return {
      error: false,
      message: "Tiene que agregar al menos un evento"
     };
     
    }
    return {
      error: false,
      message: "Exito"
     };
    //console.log(pl);
  }

  private crear(pl: any) {
      
    let inserta = async () =>  await this.obtenerDatosFormulario();

      inserta().then(  res => {
        if(!res.error){
            if(this.listaDetalleProtocolo.length>0){
              pl.listaDetallleProtocoloDTO = this.listaDetalleProtocolo;
              }

              this._api.postTypeRequest('protocolo', pl).subscribe({
                next: (data) => {
                
                  this.router.navigateByUrl('health/protocol');
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
      ).catch(err => console.log(err));
     
   
  }

  private async actualizar(pl: any) {

    

     let actualiza =   async () =>  await this.obtenerDatosFormulario();

     actualiza().then(  res => {
       
        if(!res.error){

          if(this.listaDetalleProtocolo.length>0){
            pl.listaDetallleProtocoloDTO = this.listaDetalleProtocolo;
            }
          this._api.putTypeRequest('protocolo/' + this.id, pl).subscribe({
            next: (data) => {
             
              this.router.navigateByUrl('health/protocol');
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
     ).catch(err => console.log('error'+err));

   
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

  agregar(){
    
    const d2 = this.renderer.createElement('div');
    const select = this.renderer.createElement('select');
    const input = this.renderer.createElement('input');
    const inputoculto = this.renderer.createElement('input');
    const boton = this.renderer.createElement('input');
    let texto;
    if(this.x==0)
    {
       texto = this.renderer.createText("evento primero");
    }
    else{
       texto = this.renderer.createText("días después");
    }
   
    

    let option = this.renderer.createElement("option");
    option.value = "selecciona";
    option.text = "Selecciona un evento" ;   
    select.appendChild(option);

    for (const val of this.listaTipoEvento)
    {   
        let option = this.renderer.createElement("option");
        //console.log(val);
        option.value = val.id;
        option.text = val.nombreEvento ;   
        select.appendChild(option);
    }

    this.renderer.appendChild(d2, select);
    this.renderer.appendChild(d2, input);
    this.renderer.appendChild(d2, inputoculto);
    this.renderer.appendChild(d2, texto);
    this.renderer.appendChild(d2, boton);
    this.renderer.setAttribute(boton, "type","button");
    this.renderer.setAttribute(boton, "value","eliminar");
    this.renderer.setAttribute(select,"class","combo");
    this.renderer.setAttribute(select, "id",`selectevento${this.x}`);
    this.renderer.setAttribute(input,"class","cajatexto");
    this.renderer.setAttribute(input, "id",`input${this.x}`);
    this.renderer.setAttribute(inputoculto,"type","hidden");
    this.renderer.setAttribute(inputoculto,"class","cajaoculto");
    this.renderer.setAttribute(inputoculto, "id",`inputoculto${this.x}`);
    this.renderer.setAttribute(inputoculto, "value","");
    this.renderer.listen(input, "keypress",event => {
      if (this.filterInteger(event, event.target) === false) {
            event.preventDefault();
         }
    });
    this.renderer.listen(boton, "click",event => {
      this.renderer.removeChild(d2, select);
      this.renderer.removeChild(d2, input);
      this.renderer.removeChild(d2, inputoculto);
      this.renderer.removeChild(d2, texto);
      this.renderer.removeChild(d2, boton);
     
  });
  
      this.renderer.appendChild(this.d1.nativeElement, d2);
      //this.renderer.appendChild(this.segundo.nativeElement, this.d2.nativeElement);
      /*if(idselect>0)
      {
        (<HTMLSelectElement>document.getElementById(`selectevento${idselect}`)).value=element.idtipoevento;
      }*/
    this.x++;
  }

  cargar(element:any){
    const d2 = this.renderer.createElement('div');
    const select = this.renderer.createElement('select');
    const input = this.renderer.createElement('input');
    const inputoculto = this.renderer.createElement('input');
    const boton = this.renderer.createElement('input');
    let texto;
    if(this.x==0)
    {
       texto = this.renderer.createText("evento primero");
    }
    else{
       texto = this.renderer.createText("días después");
    }
   
    

    let option = this.renderer.createElement("option");
    option.value = "selecciona";
    option.text = "Selecciona un evento" ;   
    select.appendChild(option);

    for (const val of this.listaTipoEvento)
    {   
        let option = this.renderer.createElement("option");
        option.value = val.id;
        option.text = val.nombreEvento ;   
        select.appendChild(option);
    }

    this.renderer.appendChild(d2, select);
    this.renderer.appendChild(d2, input);
    this.renderer.appendChild(d2, inputoculto);
    this.renderer.appendChild(d2, texto);
    this.renderer.appendChild(d2, boton);
    this.renderer.setAttribute(boton, "type","button");
    this.renderer.setAttribute(boton, "value","eliminar");
    this.renderer.setAttribute(select,"class","combo");
    this.renderer.setAttribute(select, "id",`selectevento${this.x}`);
    this.renderer.setAttribute(input,"class","cajatexto");
    this.renderer.setAttribute(input, "id",`input${this.x}`);
    this.renderer.setAttribute(inputoculto,"type","hidden");
    this.renderer.setAttribute(inputoculto,"class","cajaoculto");
    this.renderer.setAttribute(inputoculto, "id",`inputoculto${this.x}`);
    this.renderer.setAttribute(inputoculto, "value",`${element.id}`);
    this.renderer.listen(input, "keypress",event => {
      if (this.filterInteger(event, event.target) === false) {
            event.preventDefault();
         }
    });
    this.renderer.listen(boton, "click",event => {
      let detalle = new DetalleProtocolo();
      detalle.setId(element.id);
      detalle .setIdprotocolo(element.idprotocolo);
      detalle.setIdtipoevento(element.idtipoevento);
      detalle.setNumerodias(element.numerodias);
      detalle.setEliminado(true);
      this.listaEliminadosDetalleProtocolo.push(detalle);
      this.listaDetalleProtocolo.push(detalle);
      //console.log(this.listaEliminadosDetalleProtocolo);
      this.renderer.removeChild(d2, select);
      this.renderer.removeChild(d2, input);
      this.renderer.removeChild(d2, inputoculto);
      this.renderer.removeChild(d2, texto);
      this.renderer.removeChild(d2, boton);
      
     
  });
      this.renderer.setAttribute(input, "value",element.numerodias);
      this.renderer.appendChild(this.d1.nativeElement, d2);
      (<HTMLSelectElement>document.getElementById(`selectevento${this.x}`)).value=element.idtipoevento;
      
      //this.renderer.appendChild(this.segundo.nativeElement, this.d2.nativeElement);
      /*if(idselect>0)
      {
        (<HTMLSelectElement>document.getElementById(`selectevento${idselect}`)).value=element.idtipoevento;
      }*/
    this.x++;
  }

  filterInteger(evt,input) {
    // ASCII https://elcodigoascii.com.ar/
    // ‘0′ = 48, ‘9′ = 57, ‘-’ = 45
    // Backspace = 8, Enter = 13, NULL = 0
        var key = window.Event ? evt.which : evt.keyCode;    
        var chark = String.fromCharCode(key);
        var tempValue = input.value+chark;
        if((key >= 48 && key <= 57) /* || key == 45 */) {
            return this.filter(tempValue);
        } else {
            return key == 8 || key == 13 || key == 0;
        }
     }
   
     filter(val:any) {
      // /^-?[0-9]*$/; // positivos y negativos
      // /^[0-9]*$/; // solo positivos
      var preg = /^[0-9]*$/;
      return preg.test(val);
  }

}
