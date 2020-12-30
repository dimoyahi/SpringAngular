import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service'
import swal from 'sweetalert2'


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];


  constructor(private ClienteService: ClienteService) { }

  ngOnInit(): void {
    this.ClienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }
  delete(cliente: Cliente): void{
    swal.fire({
      title: 'Está Seguro?',
      text: `Seguro que desea eliminar el Cliente ${cliente.nombre} ${cliente.apellido}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ClienteService.delete(cliente.id).subscribe(
        response => {
          this.clientes = this.clientes.filter(cli => cli != cliente)
          swal.fire(
            'Cliente Eliminado!',
            `Cliente ${cliente.nombre} eliminado con éxito.`,
            'success'
          )
        }
        )

      }
    })
  }
}
