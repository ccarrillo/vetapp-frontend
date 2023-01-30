export class DetalleProtocolo {
   
    private  id:number;
		
    private  idprotocolo:number;

   private  idtipoevento:number;

   private   numerodias:number;

   private   editado:boolean;
    
   private   eliminado:boolean;

   


    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getIdprotocolo(): number {
        return this.idprotocolo;
    }

    public setIdprotocolo(idprotocolo: number): void {
        this.idprotocolo = idprotocolo;
    }

    public getIdtipoevento(): number {
        return this.idtipoevento;
    }

    public setIdtipoevento(idtipoevento: number): void {
        this.idtipoevento = idtipoevento;
    }

    public getNumerodias(): number {
        return this.numerodias;
    }

    public setNumerodias(numerodias: number): void {
        this.numerodias = numerodias;
    }

    public isEditado(): boolean {
        return this.editado;
    }

    public setEditado(editado: boolean): void {
        this.editado = editado;
    }

    public isEliminado(): boolean {
        return this.eliminado;
    }

    public setEliminado(eliminado: boolean): void {
        this.eliminado = eliminado;
    }



}