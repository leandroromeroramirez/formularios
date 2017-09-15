import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from "@angular/forms";
import { Observable } from "rxjs/Rx";


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
      'apellido': new FormControl('', [Validators.required, this.noRomero]),
      'email': new FormControl('', [
                                Validators.required, 
                                Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      'username': new FormControl('', Validators.required, this.existeUsuario),                                
      'password1': new FormControl('', Validators.required),
      'password2': new FormControl(),                                
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

    //Otra forma de agregar validaciones personalizadas
    //El bind es utilizado para asignar la forma ya que en javascript esto es otro contesto 
    //noIgual donde this se convierte en la forma para agregarlo al contesto de la funcion

    this.forma.controls['password2'].setValidators([
  
      Validators.required, this.noIgual.bind(this.forma)
    ])

    //esto escucha TODOS los cambios relizados en el form
    // this.forma.valueChanges.subscribe(
    //   data=>{
    //     console.log(data);
    //   });

    //Esto escucha solo un objeto del form, ejemplo username
    this.forma.controls['username'].valueChanges.subscribe(
      data=>{
        console.log(data);
      });

    //Esto escucha el status del objeto del form, ejemplo username
    this.forma.controls['username'].statusChanges.subscribe(
      data=>{
        console.log(data);
      });

   }

   guardarCambios(){
    //  this.forma.reset(this.usuarioVacio);
     console.log(this.forma);

   }

   agregarPasatiempo(){
     ( <FormArray>this.forma.controls['pasatiempos']).push(
       new FormControl("", Validators.required)
     )
   }

   
   //Validaciones de Controles
   noRomero(control:FormControl): {[s:string]:boolean}{
    if(control.value === "romero"){
      return {
        noRomero:true
      }
    }
    return null;
   }

   noIgual(control:FormControl): {[s:string]:boolean}{
     let forma:any = this;
    if(control.value !== forma.controls['password1'].value){
      return {
        noigual:true
      }
    }
    return null;
   }

   //Validacion asincrona

   existeUsuario(control:FormControl): Promise<any> | Observable<any>{

    let promesa = new Promise(
      (resolve,reject) =>{
        setTimeout(function() {
          if(control.value === 'lromero'){
            resolve({existe:true})
          }else{
            resolve(null);
          }
        }, 3000);
      }
    )
    return promesa;
   }



}
