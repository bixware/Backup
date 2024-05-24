import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-callout-cell-render',
  templateUrl: './callout-cell-render.component.html',
  styleUrls: ['./callout-cell-render.component.scss']
})
export class CalloutCellRenderComponent implements OnInit {

  params: any;
  constructor(private router: Router) { }

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
