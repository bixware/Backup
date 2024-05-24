import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-store-yes-no-renderer',
  templateUrl: './store-yes-no-renderer.component.html',
  styleUrls: ['./store-yes-no-renderer.component.css']
})
export class StoreYesNoRendererComponent implements OnInit, OnDestroy {

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

