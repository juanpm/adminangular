import {Component, OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DisciplinaService } from '../../services/disciplina/disciplina.service';
import { DesafioService } from '../../services/desafio/desafio.service';
@Component({
  'selector': 'reportes-equipo',
  'templateUrl': './reportes.component.html',
  'styleUrls': ['./reportes.component.css']
})

export class ReportesEquipoComponent implements OnInit {
  list: any=[];
  disc: any=[];
  formSearch;
    constructor( private disciplinaService: DisciplinaService,
      private desafioService: DesafioService,
      private formBuilder : FormBuilder) {
        this.formSearch = this.formBuilder.group({
          'disciplina': ''
        });
  
        this.desafioService.indexRepoterGanador(0).subscribe((res) =>{
          this.list = res['objects'];
          
          
          }, (err)=>{
    
          });
  
      this.disciplinaService.index().subscribe((res)=>{
  
        this.disc = res["objects"];
        
      }, (err)=>{
  
      });
  
     }
  
    ngOnInit(): void {
    }
    onSubmit() {
      this.desafioService.indexRepoterGanador(this.formSearch.value.disciplina.id)
      .subscribe((res) =>{
        this.list = res['objects'];
        
        
        }, (err)=>{
  
        });
    }
  

 
}  
