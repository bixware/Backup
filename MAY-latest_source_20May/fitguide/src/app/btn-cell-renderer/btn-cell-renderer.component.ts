import { Component, OnInit, OnDestroy, Type, Input, Output, EventEmitter } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//import { PartmasterComponent } from '../partmaster/partmaster.component';
declare var $: any;


@Component({
  selector: 'app-btn-cell-renderer',
  templateUrl: './btn-cell-renderer.component.html',
  styleUrls: ['./btn-cell-renderer.component.css']
})
export class BtnCellRendererComponent implements ICellRendererAngularComp, OnDestroy, OnInit {
  params: any;
  apiURL: any;
  ArchStatus:any;
  public uActive = {
    userUID: '',
    isActive: null,
    roleUID: '',
    partUID:''
 };
 public isComp = {
   ArchStatus: null,
   partUID: null
   };
  @Output() removedAGgridRowIndex1 = new EventEmitter<any>();
  constructor(private router: Router, private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
   }

  ngOnInit(): void {
  }

 
  agInit(params: any): void {
    this.params = params;
  }

  public invokeParentMethod() {
    this.params.context.componentParent.receiveAGGridEmit(this.params.node.rowIndex);
  }

  edit(): void {
    $('#modalEditpart').css('display', 'block'); + this.params.value;
    this.params.context.componentParent.clickpartEdit(this.params.value);
  }

  view(): void {
    this.router.navigate(['/home/partmaster/viewpart/' + this.params.value]);
  }

  duplicate(): void {
    $('#modalDuplicatepart').css('display', 'block'); + this.params.value;
    this.params.context.componentParent.clickduplicatepart(this.params.value);
  }

  updateActive(): void {
    if(this.params.data.ArchStatus == null){
    this.uActive.userUID = localStorage.getItem('user_id');
    this.uActive.roleUID = localStorage.getItem('role_id');
    this.uActive.isActive = $('#c_' + this.params.value).prop('checked') ? 1 : 0;    
    this.uActive.partUID = this.params.value;
    this.httpClient.post<any>(this.apiURL + '/api/partactive', this.uActive)
      .subscribe(data => {
        if (data.return_code == 0) {
          //this.params.context.componentParent.clickEvent();
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
    this.isComp.ArchStatus = 1;
    this.isComp.partUID = parseInt(this.params.data.partUID);
    this.httpClient.post<any>(this.apiURL + '/api/parchstatuspart', this.isComp)
      .subscribe(data => {
        //this.partmaster.clickEvent();
        this.params.context.componentParent.clickEvent();
      });
  }

  archiveDelete(): void {
    /* this.router.navigate(['/home/managebanners/updatebanners/' + this.params.value]); */
    $('#modalDeleteArchive').css('display', 'block') + this.params.value;
    this.params.context.componentParent.clickDeleteArchive(this.params);
  }

  restore(): void{
    this.isComp.ArchStatus = 0;
    this.isComp.partUID = parseInt(this.params.data.partUID);
    this.httpClient.post<any>(this.apiURL + '/api/parchstatuspart', this.isComp)
      .subscribe(data => {
        //this.partmaster.clickEvent();
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

