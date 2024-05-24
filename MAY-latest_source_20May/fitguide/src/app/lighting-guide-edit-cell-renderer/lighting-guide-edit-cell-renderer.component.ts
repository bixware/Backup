import { Component, OnInit,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
declare var $: any;

@Component({
  selector: 'app-lighting-guide-edit-cell-renderer',
  templateUrl: './lighting-guide-edit-cell-renderer.component.html',
  styleUrls: ['./lighting-guide-edit-cell-renderer.component.css']
})
export class LightingGuideEditCellRendererComponent implements OnInit, ICellRendererAngularComp, OnDestroy{
  params: any;
  apiURL: any;
  public vActive = {
    userUID: '',
    vehicleDetailNonVehUID: ''
  };
  constructor(private router: Router,private http: HttpClient) {
    this.apiURL = environment.apiURL;
   }

  ngOnInit(): void {
  }
  
  agInit(params: any): void {
    this.params = params;
  }
  edit(): void {
    //this.router.navigate(['/home/vehiclenonpart/editnonpart/' + this.params.value]);
    $('#modalGuideEdit').css('display', 'block')+ this.params.value;;
    this.params.context.componentParent.clickEditGuide(this.params.value);
  }
  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  ngOnDestroy(): void {
  }

}
