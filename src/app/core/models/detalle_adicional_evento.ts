export class DetalleAdicionalEventoAnimal {
   
    private id: number;
    private nombre: string;
    private radioInformacion: string;
    private tdesde: string;
    private thasta: string;
    private ndesde: string;
    private nhasta: string;
    private ddesde: string;
    private dhasta: string;
    private combosseleccionables: string;
    private requerido: boolean;
    private padremadre: string;
    private idpadremadre: number;

   


    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getNombre(): string {
        return this.nombre;
    }

    public setNombre(nombre: string): void {
        this.nombre = nombre;
    }

    public getRadioInformacion(): string {
        return this.radioInformacion;
    }

    public setRadioInformacion(radioInformacion: string): void {
        this.radioInformacion = radioInformacion;
    }

    public getTdesde(): string {
        return this.tdesde;
    }

    public setTdesde(tdesde: string): void {
        this.tdesde = tdesde;
    }

    public getThasta(): string {
        return this.thasta;
    }

    public setThasta(thasta: string): void {
        this.thasta = thasta;
    }

    public getNdesde(): string {
        return this.ndesde;
    }

    public setNdesde(ndesde: string): void {
        this.ndesde = ndesde;
    }

    public getNhasta(): string {
        return this.nhasta;
    }

    public setNhasta(nhasta: string): void {
        this.nhasta = nhasta;
    }

    public getDdesde(): string {
        return this.ddesde;
    }

    public setDdesde(ddesde: string): void {
        this.ddesde = ddesde;
    }

    public getDhasta(): string {
        return this.dhasta;
    }

    public setDhasta(dhasta: string): void {
        this.dhasta = dhasta;
    }

    public getCombosseleccionables(): string {
        return this.combosseleccionables;
    }

    public setCombosseleccionables(combosseleccionables: string): void {
        this.combosseleccionables = combosseleccionables;
    }

    public isRequerido(): boolean {
        return this.requerido;
    }

    public setRequerido(requerido: boolean): void {
        this.requerido = requerido;
    }

    public getPadremadre(): string {
        return this.padremadre;
    }

    public setPadremadre(padremadre: string): void {
        this.padremadre = padremadre;
    }
    

    public getIdpadremadre(): number {
        return this.idpadremadre;
    }

    public setIdpadremadre(idpadremadre: number): void {
        this.idpadremadre = idpadremadre;
    }

    
    
 /* constructor(id:number,nombre:string,radioInformacion:string,tdesde:string,thasta:string,ndesde:string,
               nhasta:string,ddesde:string,dhasta:string,combosseleccionables:string,requerido:true,padremadre:string)
     {
      this.id= id;
      this.nombre= nombre;
      this.radioInformacion= radioInformacion;//this.data!=null? '1'=this.data.radioInformacion
      this.tdesde= tdesde;
      this.thasta= thasta;
      this.ndesde= ndesde;
      this.nhasta= nhasta;
      this.ddesde= ddesde;
      this.dhasta= dhasta;
      this.combosseleccionables= combosseleccionables ;
      this.requerido= requerido;
      this.padremadre= padremadre;
        
     }*/

     

  }