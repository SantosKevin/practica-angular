import { Component, OnInit } from '@angular/core';
import { Pasaje } from 'src/app/models/pasaje';
import { PasajeService } from 'src/app/services/pasaje.service';
import { ResumenPunto3 } from 'src/app/models/resumen-punto3';

@Component({
  selector: 'app-punto3',
  templateUrl: './punto3.component.html',
  styleUrls: ['./punto3.component.css']
})

export class Punto3Component implements OnInit {

  pasaje: Pasaje;
  pasajes: Array<Pasaje>;
  categorias:string[];
  mostrarPrecio: boolean = false;
  precioFinal: number;
  btnGuardar: boolean = true;
  btnModificar: boolean = false;

  //este objeto es para rellenar la tabla resumen
  resumen: Array<ResumenPunto3>;

  constructor(private pasajeService: PasajeService) { 
    this.resumen = new Array<ResumenPunto3>();
    this.pasaje = new Pasaje();
    this.pasajes = new Array<Pasaje>();
    this.refrescarPasajes();
  }

  ngOnInit(): void {
    this.categorias = this.pasajeService.obtenerCategorias();
    this.establecerValorDefectoSelect();
  }

  establecerValorDefectoSelect(){
    //valor por defecto en el select
    this.pasaje.categoriaPasajero = "Adulto";
  }

  //reestablece el valor de las variables
  limpiar(){
    this.pasaje = new Pasaje();
    this.precioFinal = 0;
    this.mostrarPrecio = false;
    this.btnModificar = false; this.btnGuardar = true;
    this.establecerValorDefectoSelect();
  }

  agregarPasaje(){
    this.pasaje.fechaCompra = new Date();
    this.pasaje.precioPasaje = this.precioFinal;
    this.pasajeService.agregarPasaje(this.pasaje);
    this.refrescarPasajes();
    this.pasaje = new Pasaje();
    this.establecerValorDefectoSelect();
  }

  //obtiene la lista de pasajes desde el service
  refrescarPasajes(){
    this.pasajes = this.pasajeService.obtenerPasajes();
  }

  //se selecciona un pasaje del array y lo carga en el formulario para edicion
  seleccionar(pasaje: Pasaje){
    this.pasaje = pasaje;
    this.btnGuardar = false;
    this.btnModificar = true;
  }

  modificarPasaje(){
    this.pasajeService.modificarPasaje(this.pasaje);
    this.pasaje = new Pasaje();
    this.establecerValorDefectoSelect();
    this.btnGuardar = true; this. btnModificar = false;
    this.refrescarPasajes();
  }


  eliminarPasaje(pasaje: Pasaje){
    this.pasajeService.borrarPasaje(pasaje);
  }

  //se determina si se muestra o no el precio final
  onCambio(val:any){ 
    if(this.pasaje.precioPasaje != null && this.pasaje.categoriaPasajero != null){
        this.mostrarPrecio = true;
        this.actualizarPrecioFinal();
    }
  }

  actualizarPrecioFinal(){
    if(this.pasaje.categoriaPasajero == "Menor")
      this.precioFinal = this.pasaje.precioPasaje * 0.25;
    else{
      if(this.pasaje.categoriaPasajero == "Jubilado")
        this.precioFinal = this.pasaje.precioPasaje * 0.5;
      else
        this.precioFinal = this.pasaje.precioPasaje;
    }
  }

  actualizarResumen(){
    this.resumen = new Array<ResumenPunto3>();
    this.trabajarResumen();
  }

  //se establece los valores para la tabla de seccion resumen
  trabajarResumen(){   
    var res = new ResumenPunto3();
    res.cantidad = 0; res.total = 0;
    for(var i = 0; i < this.categorias.length ; i++){
      res.categoria = this.categorias[i];
      for(var j=0; j < this.pasajes.length; j ++){
        if(res.categoria == this.pasajes[j].categoriaPasajero){
          res.cantidad ++;
          res.total += this.pasajes[j].precioPasaje;
        }
      }
      this.resumen.push(res); 
      res = new ResumenPunto3();
      res.cantidad = 0; res.total = 0;
    }
  }
}
