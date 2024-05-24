import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-content-edit-cell-renderer',
  templateUrl: './content-edit-cell-renderer.component.html',
  styleUrls: ['./content-edit-cell-renderer.component.css']
})
export class ContentEditCellRendererComponent implements ICellRendererAngularComp, OnDestroy, OnInit {

  private params: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.params = params;
  }
    edit(): void {
      /* this.router.navigate(['/home/managecontent/editcontent/' + this.params.value]); */
      $('#modalEditContent').css('display', 'block')+ this.params.value;;
      console.log(this.params)
      this.params.context.componentParent.clickEditContent(this.params);
    }
    refresh(params: any): boolean {
      this.params = params;
      return true;
    }
  
    ngOnDestroy(): void {
    }
  

}

