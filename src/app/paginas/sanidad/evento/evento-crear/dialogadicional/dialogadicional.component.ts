import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-dialogadicional',
  templateUrl: './dialogadicional.component.html',
  styleUrls: ['./dialogadicional.component.css'],
  
})
export class DialogadicionalComponent implements OnInit {
  //public fnombre: string = 'John';
  public lname: string = 'Deo';
  public addCusForm: FormGroup;
  boton_deshabilitado: boolean = true;
  // checkbox
    checked = false;
    disabled = true;
    color: ThemePalette = 'accent';

    elementos: string[] = [];

    /*htdesdethasta:boolean;
    hndesdenhasta:boolean;
    hddesdedhasta:boolean;
    hcombosseleccionables:boolean;*/
  // Radio buttions
  favoriteSeason: string;
  seasons: string[] = ['Texto', 'Numero entero', 'Numero decimal', 'Seleccion de','Nombre/numero del padre','Nombre/numero de la madre'];

  constructor(private fb: FormBuilder, public dialog: MatDialogRef<DialogadicionalComponent>,
    @ Inject(MAT_DIALOG_DATA) public data: any) {
    this.initForm();
    
  }

  public ngOnInit(): void {
    if(this.data != null)
    {  
       
      if (this.data.radioInformacion === '1') {
        this.addCusForm.get("tdesde").enable();
        this.addCusForm.get("thasta").enable();
        this.addCusForm.get("ndesde").disable();
        this.addCusForm.get("nhasta").disable();
        this.addCusForm.get("ddesde").disable();
        this.addCusForm.get("dhasta").disable();
        this.addCusForm.get("textoadd").disable();
        this.addCusForm.get("combosseleccionables").disable();
        this.boton_deshabilitado=true;
    }
    if (this.data.radioInformacion === '2') {
      this.addCusForm.get("tdesde").disable();
      this.addCusForm.get("thasta").disable();
      this.addCusForm.get("ndesde").enable();
      this.addCusForm.get("nhasta").enable();
      this.addCusForm.get("ddesde").disable();
      this.addCusForm.get("dhasta").disable();
      this.addCusForm.get("textoadd").disable();
      this.addCusForm.get("combosseleccionables").disable();
      this.boton_deshabilitado=true;
  }
   
      if (this.data.radioInformacion === '3') {
        this.addCusForm.get("tdesde").disable();
        this.addCusForm.get("thasta").disable();
        this.addCusForm.get("ndesde").disable();
        this.addCusForm.get("nhasta").disable();
        this.addCusForm.get("ddesde").enable();
        this.addCusForm.get("dhasta").enable();
        this.addCusForm.get("textoadd").disable();
        this.addCusForm.get("combosseleccionables").disable();
        this.boton_deshabilitado=true;
      }
      if (this.data.radioInformacion === '4') {
        this.addCusForm.get("tdesde").disable();
        this.addCusForm.get("thasta").disable();
        this.addCusForm.get("ndesde").disable();
        this.addCusForm.get("nhasta").disable();
        this.addCusForm.get("ddesde").disable();
        this.addCusForm.get("dhasta").disable();
        this.addCusForm.get("textoadd").enable();
        this.addCusForm.get("combosseleccionables").enable();
        this.boton_deshabilitado=false;
         this.elementos= this.data.combosseleccionables.split(",");
        
      }

      if (this.data.radioInformacion === '5') {
        this.addCusForm.get("tdesde").disable();
        this.addCusForm.get("thasta").disable();
        this.addCusForm.get("ndesde").disable();
        this.addCusForm.get("nhasta").disable();
        this.addCusForm.get("ddesde").disable();
        this.addCusForm.get("dhasta").disable();
        this.addCusForm.get("textoadd").disable();
        this.addCusForm.get("combosseleccionables").disable();
        this.boton_deshabilitado=true;
      }
      if (this.data.radioInformacion === '6') {
        this.addCusForm.get("tdesde").disable();
        this.addCusForm.get("thasta").disable();
        this.addCusForm.get("ndesde").disable();
        this.addCusForm.get("nhasta").disable();
        this.addCusForm.get("ddesde").disable();
        this.addCusForm.get("dhasta").disable();
        this.addCusForm.get("textoadd").disable();
        this.addCusForm.get("combosseleccionables").disable();
        this.boton_deshabilitado=true;
      }

    }
    else{
        this.addCusForm.get("ndesde").disable();
        this.addCusForm.get("nhasta").disable();
        this.addCusForm.get("ddesde").disable();
        this.addCusForm.get("dhasta").disable();
        this.addCusForm.get("textoadd").disable();
        this.addCusForm.get("combosseleccionables").disable();
    }
    
    
  }
   
  radioChange($event:  MatRadioChange) {
         
    

        if ($event.value === '1') {
          this.addCusForm.get("tdesde").enable();
          this.addCusForm.get("thasta").enable();
          this.addCusForm.get("ndesde").disable();
          this.addCusForm.get("nhasta").disable();
          this.addCusForm.get("ddesde").disable();
          this.addCusForm.get("dhasta").disable();
          this.addCusForm.get("textoadd").disable();
          this.addCusForm.get("combosseleccionables").disable();
          this.boton_deshabilitado=true;
      }
      if ($event.value === '2') {
        this.addCusForm.get("tdesde").disable();
        this.addCusForm.get("thasta").disable();
        this.addCusForm.get("ndesde").enable();
        this.addCusForm.get("nhasta").enable();
        this.addCusForm.get("ddesde").disable();
        this.addCusForm.get("dhasta").disable();
        this.addCusForm.get("textoadd").disable();
        this.addCusForm.get("combosseleccionables").disable();
        this.boton_deshabilitado=true;
    }
     
        if ($event.value === '3') {
          this.addCusForm.get("tdesde").disable();
          this.addCusForm.get("thasta").disable();
          this.addCusForm.get("ndesde").disable();
          this.addCusForm.get("nhasta").disable();
          this.addCusForm.get("ddesde").enable();
          this.addCusForm.get("dhasta").enable();
          this.addCusForm.get("textoadd").disable();
          this.addCusForm.get("combosseleccionables").disable();
          this.boton_deshabilitado=true;
        }
        if ($event.value === '4') {
          this.addCusForm.get("tdesde").disable();
          this.addCusForm.get("thasta").disable();
          this.addCusForm.get("ndesde").disable();
          this.addCusForm.get("nhasta").disable();
          this.addCusForm.get("ddesde").disable();
          this.addCusForm.get("dhasta").disable();
          this.addCusForm.get("textoadd").enable();
          this.addCusForm.get("combosseleccionables").enable();
          this.boton_deshabilitado=false;
        }

        if ($event.value === '5') {
          this.addCusForm.get("tdesde").disable();
          this.addCusForm.get("thasta").disable();
          this.addCusForm.get("ndesde").disable();
          this.addCusForm.get("nhasta").disable();
          this.addCusForm.get("ddesde").disable();
          this.addCusForm.get("dhasta").disable();
          this.addCusForm.get("textoadd").disable();
          this.addCusForm.get("combosseleccionables").disable();
          this.boton_deshabilitado=true;
        }
        if ($event.value === '6') {
          this.addCusForm.get("tdesde").disable();
          this.addCusForm.get("thasta").disable();
          this.addCusForm.get("ndesde").disable();
          this.addCusForm.get("nhasta").disable();
          this.addCusForm.get("ddesde").disable();
          this.addCusForm.get("dhasta").disable();
          this.addCusForm.get("textoadd").disable();
          this.addCusForm.get("combosseleccionables").disable();
          this.boton_deshabilitado=true;
        }
        
  }

  initForm() {
      //console.log(this.data);
      if(this.data!=null){
             
        this.addCusForm = this.fb.group({
          id:[this.data.id],
          nombre: [this.data.nombre,[Validators.required]],
          abreviacion:[this.data.abreviacion],
          radioInformacion:[this.data.radioInformacion],//this.data!=null? '1':this.data.radioInformacion
          tdesde:[this.data.tdesde],
          thasta:[this.data.thasta],
          ndesde:[this.data.ndesde],
          nhasta:[this.data.nhasta],
          ddesde:[this.data.ddesde],
          dhasta:[this.data.dhasta],
          combosseleccionables:[this.data.combosseleccionables],
          textoadd:[''],
          requerido:[this.data.requerido]
          
        });
         
      }
      else{

        this.addCusForm = this.fb.group({
          id:[''],
          nombre: ['',[Validators.required]],
          abreviacion:[''],
          radioInformacion:[''],//this.data!=null? '1':this.data.radioInformacion
          tdesde:[''],
          thasta:[''],
          ndesde:[''],
          nhasta:[''],
          ddesde:[''],
          dhasta:[''],
          combosseleccionables:[''],
          textoadd:[''],
          requerido:['']
          
        });

      }
     

  }

  closeDialog(): void {
    this.dialog.close();
  }

  onSubmitClick() {
    //console.log('Form Value', this.addCusForm.value);
  }

  /*aceptar(){
    this.addCusForm.value.combosseleccionables= this.elementos.toString();
    let pl = this.addCusForm.value;
    this.data =pl
    console.log('dialogo llego aqui', this.data);
    this.dialog.close();
  }*/

  agregaCombo(){
    this.addCusForm.value.combosseleccionables="";
    this.elementos.push(this.addCusForm.value.textoadd);
    this.addCusForm.value.combosseleccionables= this.elementos.toString();
  }
  

}
