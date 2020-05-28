import { Component, OnInit } from '@angular/core';
import { Mensaje } from './../../models/mensaje';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-punto1',
  templateUrl: './punto1.component.html',
  styleUrls: ['./punto1.component.css']
})
export class Punto1Component implements OnInit {

  mensaje: Mensaje;
  tamMaxTexto: number = 120;
  tamTexto: number = 120;
  mensajes: Array<Mensaje>;


  constructor(config: NgbModalConfig, private modalService: NgbModal) { 
    this.mensaje = new Mensaje();
    this.mensajes = new Array<Mensaje>();
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  }

  //a medida que se escribe en el textarea va cambiando el tamaño de texto disponible
  public cambiarTamTexto(){
    if(this.mensaje.texto != null){
      this.tamTexto = 120;
      this.tamTexto -= this.mensaje.texto.length;
    }
    
  }

  //guarda el mensaje en el array y creamos un nuevo objeto mensaje
  public enviarMensaje(){
    this.mensaje.fecha = new Date();
    this.mensajes.push(this.mensaje);
    this.mensaje = new Mensaje();
    this.tamTexto = 120;
  }

  public limpiarMensaje(){
    this.tamTexto = 120;
    this.mensaje.texto = "";
  }

  public abrirModal(contenido) {
    this.modalService.open(contenido);
  }
}
