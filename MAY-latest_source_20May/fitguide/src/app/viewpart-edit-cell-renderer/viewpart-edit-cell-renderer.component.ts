import { Component, OnInit, OnDestroy, Type, Input, Output, EventEmitter } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//import { PartmasterComponent } from '../partmaster/partmaster.component';
declare var $: any;

@Component({
  selector: 'app-viewpart-edit-cell-renderer',
  templateUrl: './viewpart-edit-cell-renderer.component.html',
  styleUrls: ['./viewpart-edit-cell-renderer.component.css']
})
export class ViewpartEditCellRendererComponent implements ICellRendererAngularComp, OnDestroy, OnInit {
  params: any;
  apiURL: any;
  ArchStatus:any;
  constructor(private router: Router, private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
   }

  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.params = params;
  }

  /* remove(): void{
    $('#modaldelete').css('display', 'block'); + this.params.value;
    this.params.context.componentParent.clickpartEdit(this.params.value);
  } */

  remove(): void {
    /* this.router.navigate(['/home/managebanners/updatebanners/' + this.params.value]); */
    $('#modalDeletePart').css('display', 'block') + this.params.value;
    this.params.context.componentParent.clickDeletePart(this.params);
    //console.log(this.params.context.componentParent);
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  ngOnDestroy(): void {
  }
 


}
