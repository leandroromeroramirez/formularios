import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form){
      border:1px solid red;
    }
  `] 
})
export class TemplateComponent implements OnInit {

  usuario:Object = {
    nombre:null,
    apellido:null,
    email:null,
    pais: "",
    sexo: "Masculino",
    acepta:false
  }

  paises = [
    {
      codigo:"COP",
      nombre: "Colombia",
    },{
      codigo:"CLI",
      nombre: "Costa Rica",
    },{
      codigo:"ESP",
      nombre: "España",
    }
  ];
  
  sexos:string[] = [
    "Hombre",
    "Mujer",
    "Sin definir"
  ]

  constructor() { }

  ngOnInit() {
  }

  guardar(forma:NgForm){
   
    console.log(forma);
  }

}
