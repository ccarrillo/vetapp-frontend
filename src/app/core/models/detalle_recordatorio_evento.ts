export class DetalleRecordatorioEventoAnimal {
    
    private  id: number;
    private  idanimal: number; 
    private  idtipoevento: number;
    private  fecha: Date;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getIdanimal(): number {
        return this.idanimal;
    }

    public setIdanimal(idanimal: number): void {
        this.idanimal = idanimal;
    }

    public getIdtipoevento(): number {
        return this.idtipoevento;
    }

    public setIdtipoevento(idtipoevento: number): void {
        this.idtipoevento = idtipoevento;
    }

    public getFecha(): Date {
        return this.fecha;
    }

    public setFecha(fecha: Date): void {
        this.fecha = fecha;
    }

    

}