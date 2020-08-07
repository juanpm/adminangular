import { Component, OnInit } from '@angular/core';
import { DesafioService } from '../../services/desafio/desafio.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { EquipoService } from '../../services/equipo/equipo.service';
import { DisciplinaService } from '../../services/disciplina/disciplina.service';

@Component({
  selector: 'app-desafio-edit',
  templateUrl: './desafio.edit.component.html',
  styleUrls: ['./desafio.edit.component.css']
})


export class DesafioEditComponent implements OnInit {
  lista:any=[];
  status='nothing';
  formEdit;
  id : number;
  disciplinas:any=[];
  equipos:any=[];
  equiposr:any=[];
  newDesafioForm;
  disciplinaObject:any = {
    'selected': false,
    'text': '',
  };
  equipoObject:any = {
    'selected': false,
    'text': '',
  };
  equipoObjectr:any = {
    'selected': false,
    'text': '',
  };
  desafioObject:any = {
    'id' : 0,
    'disciplina_id': 0,
    'invitado_id': 0,
    'retador_id' : 0,
    'invitado_puntaje' : 0,
    'retador_puntaje' : 0,
    'fecha': '',
    'fase': ''
  };
  constructor(private formBuilder:FormBuilder,
    private router: Router,
    private desafioService: DesafioService,
    private equipoService: EquipoService,
    private activatedRoute:ActivatedRoute,
    private disciplinaService: DisciplinaService) { 
      this.newDesafioForm = this.formBuilder.group({
        'disciplina_id': '',
        'invitado_id': '',
        'retador_id' : '',
        'invitado_puntaje' : '',
        'retador_puntaje' : '',
        'fecha': '',
        'fase': ''
      });      
      this.loadDisciplina();
      this.loadEquipo();
      this.loadEquipor();
       this.id = parseInt(this.activatedRoute.
         snapshot.paramMap.get("id"));

       this.desafioService.show(this.id)
         .subscribe((res)=>{

      //     //1 Sobre escribo
      //   this.formEdit.setValue({
      //     'id': res["object"]["id"],
      //     'nombre': res["object"]["nombre"],
      //     'participantes': res["object"]["participantes"],
      //   });

       }, (err)=>{
        
      //   //2

       });
    }

    ngOnInit() {
      this.activatedRoute.data.subscribe((data) => {
        //console.log(">>", data);
        this.desafioObject["id"] = data.desafioResolver["desafio"]["id"];
        this.desafioObject["disciplina_id"] = data.desafioResolver["disciplina"]["id"];
        this.desafioObject["invitado_id"] = data.desafioResolver["invitado"]["id"];
        this.desafioObject["retador_id"] = data.desafioResolver["retador"]["id"];
        //console.log(">>>", this.matriculaObject);
        this.newDesafioForm.patchValue({
          'invitado_puntaje' : data.desafioResolver.desafio.invitado_puntaje,
          'retador_puntaje' : data.desafioResolver.desafio.retador_puntaje,
          'fecha' : data.desafioResolver.desafio.fecha,
          'fase' : data.desafioResolver.desafio.fase
          //     'id': res["object"]["id"],
          //     'nombre': res["object"]["nombre"],
          //     'participantes': res["object"]["participantes"],
          //   });
        });
      });
    }
  // Foranea de carrera - inicio
  unselectDisciplina() {
    this.disciplinaObject.selected = false;
    this.disciplinaObject.text = "";
    this.newDesafioForm.patchValue({
      "disciplina_id": undefined
    });    
  }
  selectDisciplina(o:any) {
    this.disciplinaObject.selected = true;
    this.disciplinaObject.text = o.nombre;
    this.newDesafioForm.patchValue({
      "disciplina_id": o.id
    });
  }
  loadDisciplina() {
    this.disciplinaService.index()
    .subscribe((res) => {
      // Aqui el codigo cuando la peticion sea ok.

      this.disciplinas = res["objects"];

      for(let o of this.disciplinas) {
        if ( o.id === this.desafioObject.disciplina_id ) {
          this.selectDisciplina(o);
          break;
        }
      }      

    }, (err)=>{
      // Aqui el codigo cuando la peticion sea fallida.

    });    
  }  
// Fin

// Foranea de Equipo - inicio
unselectEquipo() {
    this.equipoObject.selected = false;
    this.equipoObject.text = "";
    this.newDesafioForm.patchValue({
      "invitado_id": undefined
    });    
  }
  selectEquipo(o:any) {
    this.equipoObject.selected = true;
    this.equipoObject.text = o.nombre;
    this.newDesafioForm.patchValue({
      "invitado_id": o.id
    });
  }
  loadEquipo() {
    this.equipoService.index()
    .subscribe((res) => {
      // Aqui el codigo cuando la peticion sea ok.
  
      this.equipos = res["objects"];
      for(let o of this.equipos) {
        if ( o.id === this.desafioObject.invitado_id ) {
          this.selectEquipo(o);
          break;
        }
      } 
    }, (err)=>{
      // Aqui el codigo cuando la peticion sea fallida.
  
    });    
  }  
  // Fin
  
  // Foranea de Equipo - inicio
  unselectEquipor() {
    this.equipoObjectr.selected = false;
    this.equipoObjectr.text = "";
    this.newDesafioForm.patchValue({
      "retador_id": undefined
    });    
  }
  selectEquipor(o:any) {
    this.equipoObjectr.selected = true;
    this.equipoObjectr.text = o.nombre;
    this.newDesafioForm.patchValue({
      "retador_id": o.id
    });
  }
  loadEquipor() {
    this.equipoService.index()
    .subscribe((res) => {
      // Aqui el codigo cuando la peticion sea ok.
  
      this.equiposr = res["objects"];
      for(let o of this.equiposr) {
        if ( o.id === this.desafioObject.retador_id ) {
          this.selectEquipor(o);
          break;
        }
      } 
    }, (err)=>{
      // Aqui el codigo cuando la peticion sea fallida.
  
    });    
  }  
  // Fin

// loadPersona() {
//   this.personaService.index()
//   .subscribe((res) => {
//     // Aqui el codigo cuando la peticion sea ok.

//     this.personas = res["objects"];
//   }, (err)=>{
//     // Aqui el codigo cuando la peticion sea fallida.

//   });    
// }  
// Fin

onSubmit() {
    this.desafioService
    .put(this.desafioObject.id, {
        'disciplina_id': this.newDesafioForm.value.disciplina_id,
        'invitado_id': this.newDesafioForm.value.invitado_id,
        'retador_id': this.newDesafioForm.value.retador_id,
        'invitado_puntaje': this.newDesafioForm.value.invitado_puntaje,
        'retador_puntaje': this.newDesafioForm.value.retador_puntaje,
        'fecha': this.newDesafioForm.value.fecha,
        'fase': this.newDesafioForm.value.fase,
        'parent_id': this.newDesafioForm.value.parent_id         
             
      })
      .subscribe((res)=>{
        if ( res['status'] ) {
          alert("Datos Actualizados");
          this.router.navigate(["admin/desafio"])
        }
      }, (err) => {
          alert("No se permite empate")
    })
  }

  delete() {
    if ( this.status === "waiting" ) {
      return;
    }

    this.status = "waiting";

    this.desafioService.delete(this.desafioObject.id)
      .subscribe((res)=>{
        this.status = "ready";
        setTimeout(function(){
          this.status = "nothing";
        }, 1000);

        alert("Felicidades");
        this.router.navigate(["admin/desafio"]);
      }, (err)=>{
        this.status = "error";
        setTimeout(function(){
          this.status = "nothing";
        }, 1000);  

        alert("Sigue intentando");
      });
  }
  // new() {
  //   this.loadCarrera();
  //   this.loadSeccion();
  //   this.loadPersona();
  // }
}
