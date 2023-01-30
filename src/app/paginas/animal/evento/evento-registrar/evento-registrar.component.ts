import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material/radio';
import { Router } from '@angular/router';
import { DetalleAdicionalEventoAnimal } from 'src/app/core/models/detalle_adicional_evento';
import { DetalleRecordatorioEventoAnimal } from 'src/app/core/models/detalle_recordatorio_evento';
import { Constantes } from 'src/app/shared/constantes/constantes';
import { ApiService } from 'src/app/shared/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evento-registrar',
  templateUrl: './evento-registrar.component.html',
  styleUrls: ['./evento-registrar.component.sass']
})
export class EventoRegistrarComponent implements OnInit {

  @Output() changeListMode = new EventEmitter();
  @Input() sendObj: any;
  idAnimal: number;
  fecha: Date = new Date(Date.now());
  opcionSeleccionado: string  = '0';
  verSeleccion: string        = '';
  x: number= 0;

  isAddMode: boolean=true;
  id!: string;
  sinData: boolean = false;
  hprotocolo:boolean;

     // checkbox
     checkediniciar = false;
     checkedcontinuar = false;

  register: FormGroup;
  hide = true;
  labelBtn: string='Registrar';
  listaTipoEvento: any [] =  [];
  listaEmpleado: any [] =  [];
  listaAdicional: any [] =  [];
  listaRecordatorio: any [] =  [];
  listaDetalleTipoEvento: any [] =  [];
  listaRecordatorioTipoEvento: any [] =  [];
  elementos: string[] = [];
  combosseleccionables: string[] = [];
  listaDetalleAcciones: any [] =  [];
  listaDetalleRecordatorio: any [] =  [];
  listaAnimalesMachos:any [] =  [];
  listaAnimalesHembras:any [] =  [];

  constructor(
    private fb: FormBuilder,
    private _api: ApiService,
    private router: Router,
    private renderer:Renderer2
  ) {
    this.initForm();
   
  }

  @ViewChild('one', { static: false }) d1: ElementRef;
  @ViewChild('recor', { static: false }) d2: ElementRef;

  crearInput(element: any,idinput: any) {
     
    const d2 = this.renderer.createElement('div');
    const input = this.renderer.createElement('input');
    const texto = this.renderer.createText(`${element.nombre}:`);
    this.renderer.appendChild(d2, texto);
    this.renderer.appendChild(d2, input);
    if(element.requerido)
    {
      this.renderer.setAttribute(input, "required","true");
    }
    if(element.radioInformacion == '1')
    {
      this.renderer.setAttribute( input, "type","text");
      this.renderer.setAttribute( input, "id",`input${idinput}`);
      this.renderer.setAttribute( input, "name","texto");
      this.renderer.setAttribute( input, "class","clasetexto");
      this.renderer.setAttribute( input, "minlength",`${element.tdesde}`);
      this.renderer.setAttribute( input, "maxlength",`${element.thasta}`);
      
    }
    if(element.radioInformacion == '2')
    {
      this.renderer.setAttribute( input, "type","number");
      this.renderer.setAttribute( input, "id",`input${idinput}`);
      this.renderer.setAttribute( input, "name","entero");
      this.renderer.setAttribute( input, "class","clasetexto");
      this.renderer.setAttribute( input, "pattern","[0-9]*");
      this.renderer.setAttribute( input, "onpaste","return false;");
      this.renderer.setAttribute( input, "onDrop","return false;");
      this.renderer.setAttribute( input, "autocomplete","off");
      this.renderer.setAttribute( input, "step","any");
      this.renderer.setAttribute( input, "min",`${element.ndesde}`);
      this.renderer.setAttribute( input, "max",`${element.nhasta}`);
      this.renderer.listen(input, "keypress",event => {
        if (this.filterInteger(event, event.target) === false) {
              event.preventDefault();
           }
      });
      //this.renderer.setAttribute( input, "onkeypress","comprueba(this)");
     
    }
    if(element.radioInformacion == '3')
    {
      this.renderer.setAttribute( input, "type","number");
      this.renderer.setAttribute( input, "id",`input${idinput}`);
      this.renderer.setAttribute( input, "name","decimal");
      this.renderer.setAttribute( input, "class","clasetexto");
      this.renderer.setAttribute( input, "pattern","/^(\d+)$|^(\d+\.{1}\d{2})$/");
      this.renderer.setAttribute( input, "onpaste","return false;");
      this.renderer.setAttribute( input, "onDrop","return false;");
      this.renderer.setAttribute( input, "autocomplete","off");
      this.renderer.setAttribute( input, "step","any");
      this.renderer.setAttribute( input, "min",`${element.ddesde}`);
      this.renderer.setAttribute( input, "max",`${element.dhasta}`);
     
    }
    this.renderer.appendChild(this.d1.nativeElement, d2);
    //this.renderer.appendChild(this.primero.nativeElement,this.d1.nativeElement);
  }
  crearSelect(element: any, idselect: any){
    const d2 = this.renderer.createElement('div');
    const texto = this.renderer.createText("Seleccion de:");
    const select = this.renderer.createElement('select');
    this.elementos= element.combosseleccionables.split(",");
    let option = this.renderer.createElement("option");
    option.value = "selecciona";
    option.text = "Selecciona un elemento" ;   
    select.appendChild(option);
    for (const val of this.elementos)
    {
        let option = this.renderer.createElement("option");
        option.value = val.toString();
        option.text = val ;   
        select.appendChild(option);
    }
    this.renderer.appendChild(d2, texto);
    this.renderer.appendChild(d2, select);
    this.renderer.setAttribute(select, "class","clasecombo");
    this.renderer.setAttribute(select, "id",`select${idselect}`);
    if(element.requerido)
    {
      this.renderer.setAttribute(select, "required","true");
    }
    this.renderer.appendChild(this.d1.nativeElement, d2);
    //this.renderer.appendChild(this.primero.nativeElement,this.d1.nativeElement);
  }


  crearCombo(element: any, idselect: any){

    const d2 = this.renderer.createElement('div');
    
    const select = this.renderer.createElement('select');
    if(element.radioInformacion == '5')
    {   
      const texto = this.renderer.createText("Padre:");
        console.log(element.radioInformacion.length);
      let option = this.renderer.createElement("option");
        option.value = "selecciona";
        option.text = "Selecciona un padre" ;   
        select.appendChild(option);
      for (const val of this.listaAnimalesMachos)
      {
          let option = this.renderer.createElement("option");
          //console.log(val);
          option.value = val.id;
          option.text = val.arete ;   
          select.appendChild(option);
      }
      this.renderer.appendChild(d2, texto);
      this.renderer.appendChild(d2, select);
      this.renderer.setAttribute(select, "class","clasecombopadres");
      this.renderer.setAttribute(select, "name","padre");
      this.renderer.setAttribute(select, "id",`combo${idselect}`);
     /* this.renderer.listen(select, "change",event => {
        //alert(`Captura: ${event.options[event.selectedIndex].text}`)
        alert('alex'+event.target.value);
      });*/

      if(element.requerido)
      {
        this.renderer.setAttribute(select, "required","true");
      }


    }

    if(element.radioInformacion == '6')
    { 
      const texto = this.renderer.createText("Madre:");
      for (const val of this.listaAnimalesHembras)
      {
          let option = this.renderer.createElement("option");
          option.value = val.toString();
          option.text = val ;   
          select.appendChild(option);
      }
      this.renderer.appendChild(d2, texto);
      this.renderer.appendChild(d2, select);
      this.renderer.setAttribute(select, "class","clasecombopadres");
      this.renderer.setAttribute(select, "name","madre");
      this.renderer.setAttribute(select, "id",`combo${idselect}`);
      /*this.renderer.listen(select, "change",event => {
        //alert(`Captura: ${event.options[event.selectedIndex].text}`)
        alert('alex'+event.target.value);
      });*/
      if(element.requerido)
      {
        this.renderer.setAttribute(select, "required","true");
      }

    }
   
   
    this.renderer.appendChild(this.d1.nativeElement, d2);
   // this.renderer.appendChild(this.primero.nativeElement,this.d1.nativeElement);

  }

  crearSelectEvento(element: any, idselect: any){
    let fechacalculada = "";
    let fecharecor = new Date(Date.now());
    if(idselect>0)
    {
      fecharecor.setDate(fecharecor.getDate()+element.numerodias);
    }

    if(idselect==0)
    {
       this.x++;
      this.x=this.x;
    }
  
    
   
   
    let day = fecharecor.getDate();
    let month =  fecharecor.getMonth() + 1;
    let year =  fecharecor.getFullYear();
    if(day < 10 && month>=10){
      fechacalculada=`${year}-${month}-0${day}`;
    }
    if(day>= 10 && month< 10){
      fechacalculada=`${year}-0${month}-${day}`;
    }
    if(day < 10 && month< 10){
      fechacalculada=`${year}-0${month}-0${day}`;
    }

    const d3 = this.renderer.createElement('div');
   // const texto = this.renderer.createText(`${element.nombre}`);
    const select = this.renderer.createElement('select');
    const fecha = this.renderer.createElement('input');
    const boton = this.renderer.createElement('input');
    
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
     // this.renderer.appendChild(d2, texto);
      this.renderer.appendChild(d3, select);
      this.renderer.appendChild(d3, fecha);
      this.renderer.appendChild(d3, boton);
      this.renderer.setAttribute(select, "class","eventorecordatorio");
      this.renderer.setAttribute(select, "name","tipoevento");
      this.renderer.setAttribute(select, "id",`selectevento${this.x}`);
      this.renderer.setAttribute(fecha, "id",`inputevento${this.x}`);
      this.renderer.setAttribute(fecha, "class","fecharecordatorio");
      this.renderer.setAttribute(fecha, "type","date");
      this.renderer.setAttribute(fecha, "value",fechacalculada);
      this.renderer.setAttribute(boton, "id",`boton${this.x}`);
      this.renderer.setAttribute(boton, "type","button");
      this.renderer.setAttribute(boton, "value","eliminar");
      this.renderer.listen(boton, "click",event => {
          this.renderer.removeChild(d3, select);
          this.renderer.removeChild(d3, fecha);
          this.renderer.removeChild(d3, boton);
         
      });
      
    this.renderer.appendChild(this.d2.nativeElement, d3);
    //this.renderer.appendChild(this.segundo.nativeElement, this.d2.nativeElement);
    if(idselect>0)
    {
      (<HTMLSelectElement>document.getElementById(`selectevento${idselect}`)).value=element.idtipoevento;
    }
    
    //(<HTMLInputElement>document.getElementById(`inputevento${idselect}`)).value=fec;
        
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

  ngOnInit(): void {
    
   
   // this.hoy = this.fecha.toLocaleDateString();
      //console.log(this.hoy);
      this.idAnimal = Number.parseInt(sessionStorage.getItem('idanimalsession'));
    if (this.sendObj){
      console.log("sendObj", this.sendObj.id);
      this.id = this.sendObj.id;
      this.isAddMode = !this.sendObj.id;
    }
    if (!this.isAddMode) {
      this.labelBtn="Actualizar"
      this.register.patchValue(this.sendObj);
    }
    
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
    this._api.getTypeRequest('employees/idtipoempleado/'.concat(Constantes.CONSTANTES_FILTRO_TIPO_EMPLEADO)).subscribe({
      next: (data: any) => {
       console.log("ENTRO CARGAR combo");
        console.log(data);
        //this.dataSource = data; //No pagina
        if (data) {
          this.sinData = false;
           this.listaEmpleado = data;
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
  

  capturar() {
        // Pasamos el valor seleccionado a la variable verSeleccio
        const childElements = this.d1.nativeElement.children;
         for (let child of childElements) {
            this.renderer.removeChild(this.d1.nativeElement, child);
         }
         const childElements2 = this.d2.nativeElement.children;
         for (let child of childElements2) {
            this.renderer.removeChild(this.d2.nativeElement, child);
         }
        /*this.renderer.removeChild(this.segundo.nativeElement,this.d2.nativeElement);
        this.renderer.removeChild(this.primero.nativeElement,this.d1.nativeElement);*/
       

        this.verSeleccion = this.opcionSeleccionado;
           if(this.verSeleccion!='' && this.opcionSeleccionado!='0')
           {
            //vacia los datos de la lista de detalle tipo evento
            this.sinData = true;
            this.listaDetalleTipoEvento =  [];
            this.listaRecordatorio =  [];

            this._api.getTypeRequest('detalletipoevento/lista/'.concat(this.verSeleccion)).subscribe({
              next: (data: any) => {
               console.log("ENTRO CARGAR combo detalle");
                console.log(data);
                //this.dataSource = data; //No pagina
                if (data) {
                  this.sinData = false;
                   this.listaDetalleTipoEvento = data;
                   if(this.listaDetalleTipoEvento.length>0)
                   {
                      let idinput:number=0, idselect:number=0, idcombo:number=0;
                      this.listaDetalleTipoEvento.forEach(element => {
                                      
                                   if(element.radioInformacion == '1' || element.radioInformacion == '2' || element.radioInformacion == '3'){
                                            idinput++;
                                            this.crearInput(element,idinput);
                                   }
                                   if(element.radioInformacion == '4'){
                                             idselect++;
                                             this.crearSelect(element,idselect);
                                   }
                                   if(element.radioInformacion == '5'){
                                              idcombo++;
                                              if(this.listaAnimalesMachos.length<=0)
                                              {
                                                this._api.getTypeRequest('animal/sexo/'.concat(Constantes.CONSTANTES_FILTRO_ANIMAL_MACHO)).subscribe({
                                                  next: (data: any) => {
                                                  
                                                    if (data) {
                                                      this.sinData = false;
                                                       this.listaAnimalesMachos = data;
                                                       this.crearCombo(element,idcombo);
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
                                              if(this.listaAnimalesMachos.length>0){
                                                this.crearCombo(element,idcombo);
                                              }
                                              
                                    }


                                    if(element.radioInformacion == '6'){
                                         idcombo++;
                                      if(this.listaAnimalesHembras.length<=0){
                                                     
                                        this._api.getTypeRequest('animal/sexo/'.concat(Constantes.CONSTANTES_FILTRO_ANIMAL_HEMBRA)).subscribe({
                                          next: (data: any) => {
                                            if (data) {
                                              this.sinData = false;
                                               this.listaAnimalesHembras = data;
                                               this.crearCombo(element,idcombo);
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

                                      if(this.listaAnimalesHembras.length>0){
                                        this.crearCombo(element,idcombo);
                                      }
          
                                    }
                                    
                                
                                //this.anadirCajaTexto();
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

            this._api.getTypeRequest('recordatorioevento/lista/'.concat(this.verSeleccion)).subscribe({
              next: (data: any) => {
               console.log("ENTRO CARGAR combo");
                console.log(data);
                //this.dataSource = data; //No pagina
                if (data) {
                  this.sinData = false;
                   this.listaRecordatorio = data;
                   if(this.listaRecordatorio.length>0)
                   {
                     this.x=0;
                    this.listaRecordatorio.forEach(element => {
                      this.x++;       
                      this.crearSelectEvento(element,this.x);
                      
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
      }

  initForm() {
    
    this.register = this.fb.group({
      id: [''],
      fecha: ['',[Validators.required]],
      idtipoevento: ['',[Validators.required]],
      radioProtocolo:[''],
      tecnico: ['',[Validators.required]],
      costo: [''],
      anotacion: [''],
      protocolo: [''],
      is_active: [false, [Validators.requiredTrue]],
 
      combo: this.fb.array([])
    });
  }


  radioChange($event:  MatRadioChange) {
    
    if ($event.value === '1') {
     
       
        this.hprotocolo = false;
        this.register.get("otraIdentificacionMadre").disable();
    }
    if ($event.value === '2') {
      
      
      this.hprotocolo = true;
      this.register.get("otraIdentificacionMadre").enable();
  }
 }

  guardar() {
    console.log('Form Value', this.register.value);
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


     let input = document.getElementsByClassName('clasetexto');
     let select = document.getElementsByClassName('clasecombo');
     let combo = document.getElementsByClassName('clasecombopadres');
     let selectrecordatorio= document.getElementsByClassName('eventorecordatorio');
    
     if(select.length > 0){

      
      for ( let i=1; i<=select.length; i++) {

        let detalle = new DetalleAdicionalEventoAnimal();
        let elemento  =  document.getElementById(`select${i}`);
        let nombre = (<HTMLInputElement>document.getElementById(`select${i}`)).value;
        let opciones = (<HTMLSelectElement>document.getElementById(`select${i}`));
        this.combosseleccionables=[];
  
        for ( i=0; i< opciones.length;i++ ) {
            this.combosseleccionables.push(opciones[i].innerText );
         }
         let req = elemento.getAttribute("required");
         detalle.setNombre(nombre);
         detalle.setCombosseleccionables(this.combosseleccionables.toString());
         detalle.setRadioInformacion("2");

              if(req)
              {
                detalle.setRequerido(true);
              }
              else{
                detalle.setRequerido(false);
              }

      
         this.listaDetalleAcciones.push(detalle);
      }

     }
     if(input.length>0){
      
      
      for ( let i=1; i<=input.length; i++) {
        let detalle = new DetalleAdicionalEventoAnimal();
            let elemento  =  document.getElementById(`input${i}`);
             let nombre = (<HTMLInputElement>document.getElementById(`input${i}`)).value;
             detalle.setNombre(nombre);
              
             let radio =  elemento.getAttribute("name");
             let req = elemento.getAttribute("required");
              if(req)
              {
                detalle.setRequerido(true);
              }
              else{
                detalle.setRequerido(false);
              }

             let radioInformacion;
             let tdesde, thasta, ddesde, dhasta, ndesde, nhasta;
             if(radio == "texto")
             {
                 console.log("ingreso aqui alex texto");
                 radioInformacion= "1";
                 tdesde = elemento.getAttribute("minlength");
                 thasta = elemento.getAttribute("maxlength");
                 detalle.setRadioInformacion(radioInformacion);
                 detalle.setTdesde(tdesde);
                 detalle.setThasta(thasta);
                
             }
            if(radio == "entero")
             {     
              console.log("ingreso aqui alex entero");
                  radioInformacion= "2"
                  ndesde = elemento.getAttribute("min");
                  nhasta = elemento.getAttribute("max");
                  detalle.setRadioInformacion(radioInformacion);
                  detalle.setTdesde(ndesde);
                  detalle.setThasta(nhasta);
                 
             }
            if(radio == "decimal")
             {    
                   console.log("ingreso aqui alex decimal");
                  radioInformacion= "3"
                  ddesde = elemento.getAttribute("min");
                  dhasta = elemento.getAttribute("max");
                  detalle.setRadioInformacion(radioInformacion);
                  detalle.setTdesde(ddesde);
                  detalle.setThasta(dhasta);
             }
             this.listaDetalleAcciones.push(detalle);
               
       }
     }
     
      if(combo.length>0){
       
      
        for ( let i=1; i<=combo.length; i++) {
  
          let detalle = new DetalleAdicionalEventoAnimal();
          let elemento  =  document.getElementById(`combo${i}`);
          let id = (<HTMLSelectElement>document.getElementById(`combo${i}`)).options[(<HTMLSelectElement>document.getElementById(`combo${i}`)).selectedIndex].value;
          //let valor  = (<HTMLInputElement>document.getElementById(`combo${i}`)).id;
          
          /*console.log('combo'+nombre);
          console.log('combo'+valor);*/
            detalle.setIdpadremadre(parseInt(id));
            let radio =  elemento.getAttribute("name");
            let req = elemento.getAttribute("required");
            //detalle.setNombre(nombre);

              if(radio == "padre"){
                 detalle.setRadioInformacion("5");
                }
             if(radio == "madre"){
              detalle.setRadioInformacion("6");
                 }
  
                if(req)
                {
                  detalle.setRequerido(true);
                }
                else{
                  detalle.setRequerido(false);
                }
  
        
           this.listaDetalleAcciones.push(detalle);
        }

      }
      if(selectrecordatorio.length>0){
            console.log('como recordatorio'+selectrecordatorio.length);
        for ( let i=0; i<selectrecordatorio.length; i++) {
  
          let recordatorio = new DetalleRecordatorioEventoAnimal();
          let elemento  =  document.getElementsByClassName("eventorecordatorio")[i].id;
          let fec  =  document.getElementsByClassName("fecharecordatorio")[i].id;
          let id = (<HTMLSelectElement>document.getElementById(elemento)).options[(<HTMLSelectElement>document.getElementById(elemento)).selectedIndex].value;
          let fecha = (<HTMLInputElement>document.getElementById(fec)).value;
             
            recordatorio.setIdanimal(this.idAnimal);
            recordatorio.setIdtipoevento(parseInt(id));
            recordatorio.setFecha(new Date(fecha));

           this.listaDetalleRecordatorio.push(recordatorio);
        }
      }
       
     console.log(this.listaDetalleAcciones);
     console.log(this.listaDetalleRecordatorio);
     pl.listaDetallleTipoEventoDTO = this.listaDetalleAcciones;
     pl.listaDetallleRecordatorioDTO = this.listaDetalleRecordatorio;



    
    /*this._api.postTypeRequest('evento', pl).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('animal/evento');
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
    });*/
  }

  private actualizar(pl: any) {
    this._api.putTypeRequest('evento/' + this.id, pl).subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('managment/enterprise');
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

  ngOnChanges(){
    this.register.controls['fecha'].setValue(this.fecha);
    //console.log('id animal'+this.animal);
    
  }

}
