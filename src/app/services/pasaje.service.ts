import { Injectable } from '@angular/core';
import { Pasaje } from '../models/pasaje';

@Injectable({
  providedIn: 'root'
})
export class PasajeService {

  pasajes: Array<Pasaje>;

  constructor() { 
    this.pasajes = new Array<Pasaje>();

  }

  obtenerPasajes(){
    return this.pasajes;
  }

  obtenerIDdisponible(){
    var maxid: number;
    maxid = 0;
    for ( var i = 0; i < this.pasajes.length;i++){
      if(maxid < this.pasajes[i].idPasaje){
      maxid = this.pasajes[i].idPasaje;
      }
    }
    return (maxid + 1);
    }

  agregarPasaje(pasaje: Pasaje){
    pasaje.idPasaje = this.obtenerIDdisponible();
    this.pasajes.push(pasaje);
  }

  modificarPasaje(pasaje: Pasaje){
    var idBorrar = this.pasajes.findIndex((value: Pasaje) => value.idPasaje == pasaje.idPasaje);
    this.pasajes.splice(idBorrar,1,pasaje);
  }

  borrarPasaje(pasaje: Pasaje){
    var idBorrar = this.pasajes.findIndex((value: Pasaje) => value.idPasaje == pasaje.idPasaje);
    this.pasajes.splice(idBorrar,1);
  }

  //obtener las diferentes categorias
  obtenerCategorias(){
    var cat = new Array<any>();
    cat = ["Menor","Adulto","Jubilado"];
    return cat;
  }

}
