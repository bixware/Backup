import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-vehicle-edit-cell-renderer',
  templateUrl: './vehicle-edit-cell-renderer.component.html',
  styleUrls: ['./vehicle-edit-cell-renderer.component.css']
})
export class VehicleEditCellRendererComponent implements ICellRendererAngularComp, OnDestroy, OnInit {

  params: any;
   apiURL: any;
  public uActive = {
    userUID: '',
    isActive: null,
    roleUID: '',
    vehicleUID:''
  };
  ArchStatus:any;
  public isComp = {
    userUID: '',
    ArchStatus: null,
    vehicleUID: null
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
    //this.router.navigate(['/home/vehiclemaster/editvehicle/' + this.params.value]);
    $('#modalEdit').css('display', 'block') + this.params.value;
    this.params.context.componentParent.clickEditVehicle(this.params.value);
  }

  view(): void {
    this.router.navigate(['/home/vehiclemaster/viewvehicle/' + this.params.value]);
  }

  duplicate(): void {
    //this.router.navigate(['/home/vehiclemaster/duplicatevehicle/' + this.params.value]);
    $('#modalDuplicate').css('display', 'block') + this.params.value;
    this.params.context.componentParent.clickDuplicateVehicle(this.params.value);
  }

  archiveDelete(): void {
    /* this.router.navigate(['/home/managebanners/updatebanners/' + this.params.value]); */
    $('#modalDeleteArchive').css('display', 'block') + this.params.value;
    this.params.context.componentParent.clickDeleteArchive(this.params);
  }

  updateActive(): void {
    if(this.params.data.ArchStatus == null){
      this.uActive.userUID = localStorage.getItem('user_id');
      this.uActive.roleUID = localStorage.getItem('role_id');
      this.uActive.isActive = $('#c_' + this.params.value).prop('checked') ? 1 : 0;    
      this.uActive.vehicleUID = this.params.value;
      this.http.post<any>(this.apiURL + '/api/vehicleactive', this.uActive)
        .subscribe(data => {
          if (data.return_code == 0) {
             console.log('Vehicle Active is updated successfully !');
          }
        });
    }
    else{
      $('#archive_error').show();
      $('#info_archive').show();
      if($('#c_' + this.params.value).prop('checked')){
        $('#c_' + this.params.value).prop('checked',false)
      }else{
      $('#c_' + this.params.value).prop('checked',true);
    }
    }
  }

  archive(): void{
    this.isComp.userUID = localStorage.getItem('userUID');
    this.isComp.ArchStatus = 1;
    this.isComp.vehicleUID = parseInt(this.params.data.vehicleUID);
    this.http.post<any>(this.apiURL + '/api/parchstatusvehicle', this.isComp)
      .subscribe(data => {
        
        //this.vehiclemaster.clickEvent();
        this.params.context.componentParent.clickEvent();
      });
  }

  restore(): void{
    this.isComp.userUID = localStorage.getItem('userUID');
    this.isComp.ArchStatus = 0;
    this.isComp.vehicleUID = parseInt(this.params.data.vehicleUID);
    this.http.post<any>(this.apiURL + '/api/parchstatusvehicle', this.isComp)
      .subscribe(data => {
       //this.vehiclemaster.clickEvent();
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

