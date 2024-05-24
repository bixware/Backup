import { Component, OnInit,OnDestroy   } from '@angular/core';
import { Router } from '@angular/router';
import { IHeaderAngularComp } from '@ag-grid-community/angular';

@Component({
  selector: 'app-userrole-menu-header-cellrender',
  templateUrl: './userrole-menu-header-cellrender.component.html',
  styleUrls: ['./userrole-menu-header-cellrender.component.scss']
})
export class UserroleMenuHeaderCellrenderComponent implements OnInit {
  params: any;
  constructor(private router: Router) { }
  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.params = params;
    /* console.log(this.params); */
  }

  HeaderHandler(event) {
    let checked = event.target.checked;
    let colId = this.params.column.colId;
   /*  console.log('h name',this.params.column.colId);
    console.log('checked',checked); */
    this.params.context.componentParent.HeaderCheckEvent(this.params.column.colId,checked);

    
    
}

refresh(params: any): boolean {
  this.params = params;
  return true;
}
ngOnDestroy(): void {
}
}

