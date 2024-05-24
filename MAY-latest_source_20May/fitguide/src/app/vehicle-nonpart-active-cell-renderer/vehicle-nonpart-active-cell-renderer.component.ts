import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
declare var $: any;
//import { VehiclenonpartComponent } from '../vehiclenonpart/vehiclenonpart.component';
@Component({
  selector: 'app-vehicle-nonpart-active-cell-renderer',
  templateUrl: './vehicle-nonpart-active-cell-renderer.component.html',
  styleUrls: ['./vehicle-nonpart-active-cell-renderer.component.scss']
})
export class VehicleNonpartActiveCellRendererComponent implements ICellRendererAngularComp, OnDestroy, OnInit {
  params: any;
  apiURL: any;
  public vActive = {
    userUID: '',
    isActive: null,
    vehicleDetailNonPartUID: ''
  };
  ArchStatus:any;
  public isComp = {
    userUID: '',
    ArchStatus: null,
    vehicleDetailNonPartUID: null
  };
  constructor(private router: Router,private http: HttpClient) {
    this.apiURL = environment.apiURL;
   }

  ngOnInit(): void {
  }

  agInit(params: any): void {
    this.params = params;
  }

  edit(vehicleDetailNonPartUID): void {
    //this.router.navigate(['/home/vehiclenonpart/editnonpart/' + this.params.value]);
    $('#modalNonpart').css('display', 'block');
    this.params.context.componentParent.clickEditNonpart(vehicleDetailNonPartUID);
  }
  
  updateActive(vehicleDetailNonPartUID): void {
    this.vActive.userUID = localStorage.getItem('user_id');
    this.vActive.isActive = $('#v_' + vehicleDetailNonPartUID).prop('checked') ? 1 : 0;
    this.vActive.vehicleDetailNonPartUID = vehicleDetailNonPartUID;
    this.http.post<any>(this.apiURL + '/api/vehicledetailsnonpartactive', this.vActive)
      .subscribe(data => {
        if (data.return_code == 0) {
           console.log('Vehicle Non Part Active / Inacive is updated successfully !');
        }
      });
  }

  archive(vehicleDetailNonPartUID): void{
    this.isComp.userUID = localStorage.getItem('user_id');
    this.isComp.ArchStatus = 1;
    this.isComp.vehicleDetailNonPartUID = parseInt(vehicleDetailNonPartUID);
    this.http.post<any>(this.apiURL + '/api/parchstatusnonpartvehicle', this.isComp)
      .subscribe(data => {
        
        //this.vehiclenonpart.clickEvent();
        this.params.context.componentParent.clickEvent();
      });
  }

  restore(vehicleDetailNonPartUID): void{
    this.isComp.userUID = localStorage.getItem('user_id');
    this.isComp.ArchStatus = 0;
    this.isComp.vehicleDetailNonPartUID = parseInt(vehicleDetailNonPartUID);
    this.http.post<any>(this.apiURL + '/api/parchstatusnonpartvehicle', this.isComp)
      .subscribe(data => {
       //this.vehiclenonpart.clickEvent();
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

