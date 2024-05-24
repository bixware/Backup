import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-yes-no-cell-renderer',
  templateUrl: './yes-no-cell-renderer.component.html',
  styleUrls: ['./yes-no-cell-renderer.component.css']
})
export class YesNoCellRendererComponent implements OnInit, OnDestroy {
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

