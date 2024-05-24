import { Component, OnInit, OnDestroy,Type, Input, Output, EventEmitter } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare var $: any;
/* import {NgbActiveModal,NgbModal} from '@ng-bootstrap/ng-bootstrap'; */

/* 
@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">User Deletion</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete User?</strong></p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click'); userDeleteByuserID()">Ok</button>
  </div>
  `
})

export class NgbdModalConfirm implements OnInit {
  @Input() public userUID;
  @Input() public AGgridRowIndex;
  @Output() removedAGgridRowIndex = new EventEmitter<any>();
  apiURL: any;
  rowData: any;
  constructor(public modal: NgbActiveModal, private _modalService: NgbModal, private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  ngOnInit(): void {
  }

  userDeleteByuserID(): void {
    this.http.post<any>(this.apiURL + '/api/deleteuserbyuserid',
      {
        userUID: this.userUID
      })
      .subscribe(data => {
        if (data.return_code == 0) {
          console.log('User Details Deleted Successfully !');
          console.log(this.AGgridRowIndex);
          this.removedAGgridRowIndex.emit(this.AGgridRowIndex);
        }
      });
  }

}

const MODALS: { [name: string]: Type<any> } = {
  focusFirst: NgbdModalConfirm
}; */


@Component({
  selector: 'app-user-edit-cell-renderer',
  templateUrl: './user-edit-cell-renderer.component.html',
  styleUrls: ['./user-edit-cell-renderer.component.css']
})
export class UserEditCellRendererComponent implements  ICellRendererAngularComp, OnDestroy, OnInit {
  apiURL: any;
  params: any;
  
  //@Output() removedAGgridRowIndex = new EventEmitter<any>();
 
  public uActive = {
    userUID: '',
    isActive: ''
  };
  public isComp = {
    userUID: '',
    ArchStatus: null,
    puserUID: null
  };

 

  constructor(private router: Router, private http: HttpClient) { 
    this.apiURL = environment.apiURL;
  }
  ngOnInit(): void {
  }
  agInit(params: any): void {
    this.params = params;
  }
  /* resetpwd(): void {
    this.router.navigate(['/home/globaluser/resetpassword/' + this.params.value]);
  } */
  edit(): void {
    this.router.navigate(['/home/globaluser/edituser/' + this.params.value]);
    console.log(this.params);
  }
  openModal() {
     /* console.log(this.params.node.rowIndex);
    const modalRef = this._modalService.open(MODALS[name]);
    modalRef.componentInstance.userUID = this.params.data.userUID;
    modalRef.componentInstance.AGgridRowIndex = this.params.node.rowIndex;
    modalRef.componentInstance.removedAGgridRowIndex.subscribe((rData) => {
      this.invokeParentMethod();

    }) */
    $('#passwordModal').css('display', 'block')+ this.params.value;
    this.params.context.componentParent.clickEditResetpassword(this.params.value);
  }
  /* public invokeParentMethod() {
    console.log(this.params.node.rowIndex);
    this.params.context.componentParent.receiveAGGridEmit(this.params.node.rowIndex);
  } */
  updateActive(): void {
    if(this.params.data.ArchStatus == null){
      this.uActive.userUID = this.params.value;
    this.uActive.isActive = $('#c_' + this.params.value).prop('checked') ? '1' : '0';
    this.http.post<any>(this.apiURL + '/api/useractive', this.uActive)
      .subscribe(data => {
        if (data.return_code == 0) {
          console.log('User Active is updated successfully !');
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
    this.isComp.puserUID = this.params.value;
    this.http.post<any>(this.apiURL + '/api/parchstatususer', this.isComp)
      .subscribe(data => {
        //this.globalusers.clickEvent();
        this.params.context.componentParent.clickEvent();
      });
  }

  restore(): void{
    this.isComp.userUID = localStorage.getItem('userUID');
    this.isComp.ArchStatus = 0;
    this.isComp.puserUID = this.params.value;
    this.http.post<any>(this.apiURL + '/api/parchstatususer', this.isComp)
      .subscribe(data => {
        //this.globalusers.clickEvent();
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

