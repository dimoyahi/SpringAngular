import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal  from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente: Cliente = new Cliente()
  public titulo: string = "Crear Cliente"
  public errores: string[];

  constructor(
    private clienteService: ClienteService,
    private router : Router,
    private avtivatedRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarCliente()
  }

  cargarCliente(): void{
    this.avtivatedRouter.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente) => this.cliente = cliente)
      }
    })
  }
  create(): void{
    this.clienteService.create(this.cliente)
      .subscribe(cliente => {
        this.router.navigate(['/clientes'])
          swal.fire('Nuevo Cliente',`Cliente ${cliente.nombre} creado con éxito!`, 'success')
      },
      err =>{
        this.errores = err.error.errors as string[];
        console.log('Codigo del error desdes el Backend: ' + err.status);
        console.log(err.error.errors);
      }
    );
  }
  update():void{
    this.clienteService.update(this.cliente)
    .subscribe(json => {
      this.router.navigate(['/clientes'])
      swal.fire('Cliente Actualizado', `${json.mensaje}: ${json.cliente.nombre}`, 'success')
    },
    err =>{
      this.errores = err.error.errors as string[];
      console.log('Codigo del error desdes el Backend: ' + err.status);
      console.log(err.error.errors);
    }

    )
  }

}
