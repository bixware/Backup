import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//import { ManagedistributorComponent } from '../managedistributor/managedistributor.component';
@Component({
  selector: 'app-distributor-edit-cell-renderer',
  templateUrl: './distributor-edit-cell-renderer.component.html',
  styleUrls: ['./distributor-edit-cell-renderer.component.css']
})
export class DistributorEditCellRendererComponent implements ICellRendererAngularComp, OnDestroy, OnInit {
 // params: any;
  apiURL: any;
  ArchStatus:any;
  params: any;
  public isComp = {
    userUID: '',
    ArchStatus: null,
    distributorUID: null
    };
  constructor(private router: Router, private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }
  ngOnInit(): void {
  }
  agInit(params: any): void {
    this.params = params;
  }
  edit(): void {
    // this.router.navigate(['/home/managedistributor/editdistributor/' + this.params.value]);
    $('#modalEditDistributor').css('display', 'block')+ this.params.value;
    this.params.context.componentParent.clickDistributorEdit(this.params);
  }

  archive(): void{
    this.isComp.userUID = localStorage.getItem('userUID');
    this.isComp.ArchStatus = 1;
    this.isComp.distributorUID = parseInt(this.params.data.distributorUID);
    this.http.post<any>(this.apiURL + '/api/parchstatusdistributor', this.isComp)
      .subscribe(data => {
        //this.managedistributor.clickEvent();
        this.params.context.componentParent.clickEvent();
      });
  }

  restore(): void{
    this.isComp.userUID = localStorage.getItem('userUID');
    this.isComp.ArchStatus = 0;
    this.isComp.distributorUID = parseInt(this.params.data.distributorUID);
    this.http.post<any>(this.apiURL + '/api/parchstatusdistributor', this.isComp)
      .subscribe(data => {
        //this.managedistributor.clickEvent();
        this.params.context.componentParent.clickEvent();
      });
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }
  ngOnDestroy(): void {
  }

}

