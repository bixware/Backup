import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-section-edit-cell-renderer',
  templateUrl: './section-edit-cell-renderer.component.html',
  styleUrls: [ './section-edit-cell-renderer.component.css']
})
export class SectionEditCellRendererComponent implements ICellRendererAngularComp, OnDestroy, OnInit {

  private params: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.params = params;
  }

  edit(): void{
    $('#modalEdit').css('display', 'block') + this.params.value;
   this.params.context.componentParent.clickEdit(this.params.value);
  }
  refresh(params: any): boolean {
    this.params = params;
    return true;
  }
  ngOnDestroy(): void {
  }

}

