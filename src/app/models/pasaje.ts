export class Pasaje {
    idPasaje: number;
    dniPasajero: number;
    precioPasaje: number;
    categoriaPasajero: string; 
    fechaCompra: Date;

    Psaje(dniPasajero?: number, precioPasaje?: number, categoriaPasajero?: string, fechaCompra?: Date){
        this.dniPasajero = dniPasajero;
        this.precioPasaje = precioPasaje;
        this.categoriaPasajero = categoriaPasajero;
        this.fechaCompra = fechaCompra;
    }
    
}
