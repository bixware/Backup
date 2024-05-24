import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-brand-edit-cell-renderer',
  templateUrl: './brand-edit-cell-renderer.component.html',
  styleUrls: ['./brand-edit-cell-renderer.component.css']
})
export class BrandEditCellRendererComponent implements ICellRendererAngularComp, OnDestroy, OnInit {
  apiURL: any;
  ArchStatus:any;
  params: any;
  public isComp = {
    userUID: '',
    ArchStatus: null,
    brandUID: null
    };
  constructor(private router: Router, private http: HttpClient) {this.apiURL = environment.apiURL; }

  ngOnInit(): void {
  }
  agInit(params: any): void {
    this.params = params;
  }
  edit(): void {
    $('#modalEditbrand').css('display', 'block') + this.params.value;
    this.params.context.componentParent.clickEditBrand(this.params.value);
  }
  refresh(params: any): boolean {
    this.params = params;
    return true;
  }
  archive(): void{
    this.isComp.ArchStatus = 1;
    this.isComp.brandUID = parseInt(this.params.data.brandUID);
    this.http.post<any>(this.apiURL + '/api/parchstatusbrand', this.isComp)
      .subscribe(data => {
        //this.brandmaster.clickEvent();
        this.params.context.componentParent.clickEvent();
      });
  }

  restore(): void{
    this.isComp.ArchStatus = 0;
    this.isComp.brandUID = parseInt(this.params.data.brandUID);
    this.http.post<any>(this.apiURL + '/api/parchstatusbrand', this.isComp)
      .subscribe(data => {
        //this.brandmaster.clickEvent();
        this.params.context.componentParent.clickEvent();
      });
  }

  ngOnDestroy(): void {
  }
}

