import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
})
export class DirectivaComponent{

  listacurso: string[] = ['JavaScript','PHP','JAVA','SQL'];
  habilitar: boolean = true;
  constructor() { }
  setHabilitar(): void{
    this.habilitar=(this.habilitar==true)?false:true;
  }

}
