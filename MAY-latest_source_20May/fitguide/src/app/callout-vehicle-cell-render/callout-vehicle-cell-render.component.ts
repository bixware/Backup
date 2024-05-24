import { Component, OnInit, OnDestroy, Type, Input, Output, EventEmitter } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
/* import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
 */
declare var $: any;
/* @Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Vehicle Callout Deletion</h4>
    <button type="button" class="close" aria-describedby="modal-title" (click)="modal.dismiss('Cross click')">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <p><strong>Are you sure you want to delete?</strong></p>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn btn-outline-secondary" (click)="modal.dismiss('cancel click')">Cancel</button>
    <button type="button" class="btn btn-danger" (click)="modal.close('Ok click'); calloutDelbyVehicleid()">Ok</button>
  </div>
  `
}) */
/* export class NgbdModalConfirm implements OnInit {
  @Input() public userUID;
  @Input() public vehicleDetailUID;
  @Input() public AGgridRowIndex;
  @Output() removedAGgridRowIndex = new EventEmitter<any>();
  apiURL: any;
  rowData: any;
  constructor(public modal: NgbActiveModal, private _modalService: NgbModal, private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  ngOnInit(): void {
  }

  calloutDelbyVehicleid(): void {
    this.http.post<any>(this.apiURL + '/api/deletecalloutbyid',
      {
        userUID: this.userUID,
        vehicleDetailUID: this.vehicleDetailUID
      })
      .subscribe(data => {
        if (data.return_code == 0) {
          console.log('Callout Details Deleted Successfully !');
          this.removedAGgridRowIndex.emit(this.AGgridRowIndex);
        }
      });
  }

} */

/* const MODALS: { [name: string]: Type<any> } = {
  focusFirst: NgbdModalConfirm
}; */

@Component({
  selector: 'app-callout-vehicle-cell-render',
  templateUrl: './callout-vehicle-cell-render.component.html',
  styleUrls: ['./callout-vehicle-cell-render.component.scss']
})
export class CalloutVehicleCellRenderComponent implements ICellRendererAngularComp, OnDestroy, OnInit {
  apiURL: any;
  params: any;
  
 /*  @Output() removedAGgridRowIndex = new EventEmitter<any>(); */
  
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
   }

  ngOnInit(): void {
    
  }

  /* openModal(name: string) {
    const modalRef = this._modalService.open(MODALS[name]);
    modalRef.componentInstance.userUID = localStorage.getItem('user_id');
    modalRef.componentInstance.vehicleDetailUID = this.params.data.vehicleDetailUID;
    modalRef.componentInstance.AGgridRowIndex = this.params.rowIndex;
    modalRef.componentInstance.removedAGgridRowIndex.subscribe((rData) => {
      this.invokeParentMethod();

    })
  } */

  agInit(params: any): void {
    this.params = params;
  }

 /*  public invokeParentMethod() {
  this.params.context.componentParent.receiveAGGridEmit(this.params.node.rowIndex);
    this.params.context.componentParent.clickEvent();
  } */

  remove(): void{
    $('#modalDeletecallout').css('display', 'block'); + this.params.value;
    //this.params.context.componentParent.clickDeleteCalout(this.params.value);
  }

  refresh(): boolean {
    return false;
  }

  ngOnDestroy(): void {
  }

  archive(): void{

    
    this.http.post<any>(this.apiURL + '/api/updatecalloutarchive', {
      userUID: localStorage.getItem('user_id'),
      vehicleDetailUID: this.params.data.vehicleDetailUID,
      ArchStatus:1

    })
      .subscribe(data => {
        this.params.context.componentParent.clickEvent();
      });
      
  }

  restore(): void{

    
    this.http.post<any>(this.apiURL + '/api/updatecalloutarchive', {
      userUID: localStorage.getItem('user_id'),
      vehicleDetailUID: this.params.data.vehicleDetailUID,
      ArchStatus:0

    })
      .subscribe(data => {
        this.params.context.componentParent.clickEvent();
      });
      
  }

}

