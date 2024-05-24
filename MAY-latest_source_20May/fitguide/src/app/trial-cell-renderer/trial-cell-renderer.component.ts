import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
@Component({
  selector: 'app-trial-cell-renderer',
  templateUrl: './trial-cell-renderer.component.html',
  styleUrls: ['./trial-cell-renderer.component.css']
})
export class TrialCellRendererComponent implements ICellRendererAngularComp, OnDestroy, OnInit {

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

