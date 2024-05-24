import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-statictext',
  templateUrl: './statictext.component.html',
  styleUrls: ['./statictext.component.css']
})
export class StatictextComponent implements OnInit, OnDestroy {
  params: any;
  constructor() { }

  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  ngOnDestroy(): void {
  }

}

