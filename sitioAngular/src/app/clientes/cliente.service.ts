import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { of, Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2'
import { Router } from '@angular/router';
import { formatDate, DatePipe, } from '@angular/common';
import localeEs from '@angular/common/locales/es';

@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  getClientes(page: number): Observable<any> {
    //return of(CLIENTES);
    return this.http.get(this.urlEndPoint+'/page/' + page).pipe(
      map((response: any) => {
        (response.content as Cliente[]).map(cliente =>{
          cliente.nombre = cliente.nombre.toUpperCase();
          let datePipe = new DatePipe('es');
          //cliente.createAt = datePipe.transform(cliente.createAt, 'EEE dd, MMM, yyyy');
          //cliente.createAt = formatDate(cliente.createAt,'EEEE dd, MMMM, yyyy','es');
          return cliente;
        });
        return response;
      }
      )
    );
  }

create(cliente: Cliente) : Observable<Cliente>{
  return this.http.post(this.urlEndPoint,cliente, {headers: this.httpHeaders}).pipe(
    map((json: any) => json.cliente as Cliente),
    catchError(e => {
      if(e.status==400){
        return throwError(e);
      }
      console.log(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.Error, 'error');
      return throwError(e);
    })
  );
}
getCliente(id): Observable<Cliente>{
  return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
    catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al Editar', e.error.mensaje, 'error');
        return throwError(e);
    })
  );
}
update(cliente: Cliente) : Observable<any>{
  return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`,cliente,{headers: this.httpHeaders}).pipe(
    catchError(e => {
      if(e.status==400){
        return throwError(e);
      }
      console.log(e.error.mensaje);
      swal.fire(e.error.mensaje, e.error.Error, 'error');
      return throwError(e);
    })
  );
}
delete(id: number): Observable<Cliente>{
  return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders})
}
}
