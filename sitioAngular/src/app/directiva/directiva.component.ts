import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
})
export class DirectivaComponent{

  listacurso: string[] = ['JavaScript','PHP','JAVA','SQL'];
  constructor() { }

}
