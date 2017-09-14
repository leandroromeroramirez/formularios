import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent {

  forma:FormGroup;

  usuario:Object = {
    nombre:"Leandro",
    apellido:"Romero",
    email:"lromero@gmail.com",
    direccion:{
      calle:"4b",
      carrera:"63",
      numeroCasa:"16",
      localidad:"Puente Aranda",
      barrio:"Pradera"
    },
     pasatiempos: []
  }

  usuarioVacio:Object = {
    nombre:"",
    apellido:"",
    email:"",
    direccion:{
      calle:"",
      carrera:"",
      numeroCasa:"",
      localidad:"",
      barrio:""
    },
    pasatiempos: [ ]
  }

  constructor() {


    this.forma = new FormGroup({
      'nombre': new FormControl('', [Validators.required,
                                     Validators.minLength(3)]),
      'apellido': new FormControl('', Validators.required),
      'email': new FormControl('', [
                                Validators.required, 
                                Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'direccion': new FormGroup({
        'calle': new FormControl('', Validators.required),
        'carrera': new FormControl('',Validators.required),
        'numeroCasa': new FormControl('',Validators.required),
        'localidad': new FormControl('',Validators.required),
        'barrio': new FormControl('',Validators.required),
      }),
      'pasatiempos': new FormArray([
        new FormControl('Correr', Validators.required)
      ])
    });

    //Carga los valores que tengan una misma estructura del objeto
    // this.forma.setValue(this.usuario);
   }

   guardarCambios(){
     this.forma.reset(this.usuarioVacio);

   }



}
