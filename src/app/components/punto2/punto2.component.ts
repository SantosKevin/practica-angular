import { Component, OnInit } from '@angular/core';
import { Asistente } from './../../models/asistente';


@Component({
  selector: 'app-punto2',
  templateUrl: './punto2.component.html',
  styleUrls: ['./punto2.component.css']
})
export class Punto2Component implements OnInit {

  asistente: Asistente;
  asistentes: Array<Asistente>;

  constructor() { 
    this.asistente = new Asistente();
    this.asistentes = new Array<Asistente>();
  }

  ngOnInit(): void {
  }


  
  /* public comprobarVacio(){
    if(this.asistente.usuario != "" && this.asistente.nombreOrganizacion != "" && this.asistente.requiereConstancia != null)
      return false;
  }
 */

  //registra las respuestas del asistente
  public registrar(){
    this.asistentes.push(this.asistente);
    this.asistente = new Asistente();
  }
}
