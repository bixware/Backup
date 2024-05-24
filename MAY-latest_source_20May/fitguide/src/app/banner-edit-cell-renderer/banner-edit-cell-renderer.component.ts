import { Component, OnInit, OnDestroy, Type, Input, Output, EventEmitter } from '@angular/core';

import { Router } from '@angular/router';
/* import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'; */
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';


/* @Component({
  selector: 'modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Banner Deletion</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete Banner?</strong></p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click'); bannerDel()">Ok</button>
  </div>
  `
}) */
/* export class NgbdModalConfirm implements OnInit {
  @Input() public bannerUID;
  @Input() public userUID;
  @Input() public roleUID;
  @Input() public AGgridRowIndex;
  @Output() removedAGgridRowIndex = new EventEmitter<any>();
  apiURL: any;
  rowData: any;
  constructor(public modal: NgbActiveModal, private _modalService: NgbModal, private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  ngOnInit(): void {
  }

  bannerDel(): void {
    this.http.post<any>(this.apiURL + '/api/bannerdelete',
      {
        roleUID: localStorage.getItem('role_id'),
        userUID: localStorage.getItem('user_id'),
        bannerUID: this.bannerUID
      })
      .subscribe(data => {
        if (data.return_code == 0) {
          console.log('Banner Details Deleted Successfully !');
          this.removedAGgridRowIndex.emit(this.AGgridRowIndex);
        }
      });
  }

}

const MODALS: { [name: string]: Type<any> } = {
  focusFirst: NgbdModalConfirm
};
 */
@Component({
  selector: 'app-banner-edit-cell-renderer',
  templateUrl: './banner-edit-cell-renderer.component.html',
  styleUrls: ['./banner-edit-cell-renderer.component.css']
})
export class BannerEditCellRendererComponent implements ICellRendererAngularComp, OnDestroy, OnInit {

  private params: any;
  apiURL: any;
  //@Output() removedAGgridRowIndex1 = new EventEmitter<any>();
  constructor(private router: Router, private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }
 

  ngOnInit(): void {
  }

 /*  open(name: string) {
    const modalRef = this._modalService.open(MODALS[name]);
    modalRef.componentInstance.bannerUID = this.params.value;
    modalRef.componentInstance.userUID = localStorage.getItem('user_id');
    modalRef.componentInstance.roleUID = localStorage.getItem('role_id');
    modalRef.componentInstance.AGgridRowIndex = this.params.rowIndex;
    modalRef.componentInstance.removedAGgridRowIndex.subscribe((rData) => {
      this.invokeParentMethod()

    })
  } */

  agInit(params: any): void {
    this.params = params;
  }
  /* public invokeParentMethod() {
    this.params.context.componentParent.receiveAGGridEmit(this.params.node.rowIndex)
  } */

  edit(): void {
    /* this.router.navigate(['/home/managebanners/updatebanners/' + this.params.value]); */
    $('#modalEditBanner').css('display', 'block') + this.params.value;
    this.params.context.componentParent.clickEditBanner(this.params.value);
  }
  delete(): void {
    /* this.router.navigate(['/home/managebanners/updatebanners/' + this.params.value]); */
    $('#modalDeleteBanner').css('display', 'block') + this.params.value;
    this.params.context.componentParent.clickDeleteBanner(this.params);
  }

  refresh(): boolean {
    return false;
  }

  /*  refresh(params: any): boolean {
     this.params = params;
     return true;
   } */
  ngOnDestroy(): void {
  }

}


