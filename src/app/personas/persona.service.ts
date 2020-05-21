import { Injectable } from '@angular/core';
import {Persona} from './persona';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Router} from '@angular/router';
import  {map, catchError} from 'rxjs/operators';
import swal from 'sweetalert2';

@Injectable()
export class PersonaService {
  private urlEndPoint:string = 'http://localhost:8080/api/people';
  private httpHeader = new  HttpHeaders({'Content-Type':'application/json'});
  constructor(private http: HttpClient) { }

  getPersonas():Observable<Persona[]>{
    return this.http.get<Persona[]>(this.urlEndPoint)
  }

  create(persona:Persona) : Observable<Persona>{
    return this.http.post(this.urlEndPoint, persona, {headers: this.httpHeader}).pipe(
      map( (response:any) => response.persona as Persona),
      catchError(e => {
        console.error(e.error.mensaje);
        if(e.status==400){
          return throwError(e);
        }
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
