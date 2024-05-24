import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-edit-cell-renderer',
  templateUrl: './menu-edit-cell-renderer.component.html',
  styleUrls: ['./menu-edit-cell-renderer.component.css']
})
export class MenuEditCellRendererComponent implements OnInit, OnDestroy {

  private params: any;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.params = params;
  }
    edit(): void {
      /* this.router.navigate(['/home/managemenu/editmenu/' + this.params.value]); */
      $('#modalAddmenu').css('display', 'block') + this.params.value;
      this.params.context.componentParent.clickEditmenu(this.params.value);
    }
    refresh(params: any): boolean {
      this.params = params;
      return true;
    }
  
    ngOnDestroy(): void {
    }
  
}

