import { Component, OnInit } from '@angular/core';
import {Persona} from './persona';
import { PersonaService } from './persona.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  public titulo:string = 'Crear Persona'
  public persona:Persona = new Persona();
  public errores:string[];
  constructor(private personaService: PersonaService, private router: Router) { }

  ngOnInit(): void {
  }

  public create():void{
    console.log(this.persona);
    this.personaService.create(this.persona).subscribe(
      persona => {
        this.router.navigate(['/personas'])
        swal.fire('Nueva Persona', `Persona ${persona.name} creado con exito`,'success')
      },
      err => {
        this.errores = err.error.errors as string[];
      }
    );
  }
}
