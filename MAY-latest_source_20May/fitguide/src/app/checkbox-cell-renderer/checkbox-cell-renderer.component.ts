import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkbox-cell-renderer',
  templateUrl: './checkbox-cell-renderer.component.html',
  styleUrls: ['./checkbox-cell-renderer.component.scss']
})
export class CheckboxCellRendererComponent implements OnInit, ICellRendererAngularComp, OnDestroy {
  params: any;
  constructor(private router: Router) { }
  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.params = params;
    console.log(this.params);
  }

 checkedHandler(event) {
    let checked = event.target.checked;
    let colId = this.params.column.colId;
    if (checked)
    {
      this.params.node.setDataValue(colId, 'YES');
    }
    else {
      this.params.node.setDataValue(colId, 'NO');
    }
}

refresh(params: any): boolean {
  this.params = params;
  return true;
}
ngOnDestroy(): void {
}

}

