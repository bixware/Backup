import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-ign-cell-render',
  templateUrl: './ign-cell-render.component.html',
  styleUrls: ['./ign-cell-render.component.scss']
})
export class IgnCellRenderComponent implements OnInit,ICellRendererAngularComp, OnDestroy {
  params: any;
  apiURL: any;
  public vActive = {
    userUID: '',
    isActive: null,
    vehicleDetailIGNUID: ''
  };
  ArchStatus:any;
  public isComp = {
    userUID: '',
    ArchStatus: null,
    vehicleDetailIGNUID: null
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
    /* this.router.navigate(['/home/igninterlockguide/editigninterlockguide/' + this.params.value]); */
    $('#modalIGN').css('display', 'block')+ this.params.value;;
    this.params.context.componentParent.clickEditIGN(this.params.value);
  }
  
  updateActive(): void {
    this.vActive.userUID = localStorage.getItem('user_id');
    this.vActive.isActive = $('#v_' + this.params.value).prop('checked') ? 1 : 0;
    this.vActive.vehicleDetailIGNUID = this.params.value;
    this.http.post<any>(this.apiURL + '/api/vehicledetailsinterlockpartactive', this.vActive)
      .subscribe(data => {
        if (data.return_code == 0) {
           console.log('Vehicle Ign Active / Inacive is updated successfully !');
        }
      });
  }

  archive(): void{
    this.isComp.userUID = localStorage.getItem('userUID');
    this.isComp.ArchStatus = 1;
    this.isComp.vehicleDetailIGNUID = parseInt(this.params.data.vehicleDetailIGNUID);
    this.http.post<any>(this.apiURL + '/api/parchstatusignpartvehicle', this.isComp)
      .subscribe(data => {
        
        //this.vehiclenonpart.clickEvent();
        this.params.context.componentParent.clickEvent();
      });
  }

  restore(): void{
    this.isComp.userUID = localStorage.getItem('userUID');
    this.isComp.ArchStatus = 0;
    this.isComp.vehicleDetailIGNUID = parseInt(this.params.data.vehicleDetailIGNUID);
    this.http.post<any>(this.apiURL + '/api/parchstatusignpartvehicle', this.isComp)
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

