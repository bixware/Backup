import { Component, OnInit, OnDestroy, Type, Input, Output, EventEmitter} from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap'; 
declare var $: any;

@Component({
  selector: 'ngbd-modal-confirm',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-title">Callout Deletion</h4>
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
})

export class NgbdModalConfirm implements OnInit {
  @Input() public partNotes;
  @Input() public calloutType;
  @Input() public searchSectionUID;

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
    this.http.post<any>(this.apiURL + '/api/deletecallout',
      {userUID:localStorage.getItem('user_id'),partNotes:this.partNotes,calloutType:this.calloutType,searchSectionUID:this.searchSectionUID})
      .subscribe(data => {
        if (data.return_code == 0) {
          console.log('Callout Details Deleted Successfully !');
          this.removedAGgridRowIndex.emit(this.AGgridRowIndex);
        }
      });
  }

}

const MODALS: { [name: string]: Type<any> } = {
  focusFirst: NgbdModalConfirm
};

@Component({
  selector: 'app-callout-btn-cell-renderer',
  templateUrl: './callout-btn-cell-renderer.component.html',
  styleUrls: ['./callout-btn-cell-renderer.component.scss']
})
export class CalloutBtnCellRendererComponent implements OnInit {

  params: any;
  apiURL: any;
  
  constructor(private httpClient: HttpClient, private _modalService: NgbModal, private router: Router) {
    this.apiURL = environment.apiURL;
  }

  ngOnInit(): void {
  }
  openModal(name: string) {
    const modalRef = this._modalService.open(MODALS[name]);
    modalRef.componentInstance.partNotes = this.params.data.partNotes;
    modalRef.componentInstance.calloutType = this.params.data.calloutType;
    modalRef.componentInstance.searchSectionUID = this.params.data.searchSectionUID;
    modalRef.componentInstance.AGgridRowIndex = this.params.rowIndex;
    modalRef.componentInstance.removedAGgridRowIndex.subscribe((rData) => {
      this.invokeParentMethod();

    })
  } 
   public invokeParentMethod() {
    // this.params.context.componentParent.receiveAGGridEmit(this.params.node.rowIndex);
    this.params.context.componentParent.clickEvent();
  } 
  agInit(params: any): void {
    this.params = params;
  }
    refresh(params: any): boolean {
      this.params = params;
      return true;
    }
  
    ngOnDestroy(): void {
    }
    view(): void {
     /*  console.log(this.params); */
      //localStorage.setItem('CALLOUT-PARAMETER1',this.params.data.PartUID);
      localStorage.setItem('CALLOUT-PARAMETER2',this.params.data.callout);
      localStorage.setItem('CALLOUT-PARAMETER3',this.params.data.brandName);
      //localStorage.setItem('CALLOUT-PARAMETER4',this.params.data.partNumber);
      localStorage.setItem('CALLOUT-PARAMETER5',this.params.data.calloutType);
      localStorage.setItem('CALLOUT-PARAMETER6',this.params.data.searchSectionUID);
      localStorage.setItem('CALLOUT-PARAMETER7',this.params.data.searchSectionName);
      this.router.navigate(['/home/managecallout/viewcallout']);
    }
    edit(): void {
      /*  console.log(this.params); */
       //localStorage.setItem('CALLOUT-PARAMETER1',this.params.data.PartUID);
       localStorage.setItem('CALLOUT-PARAMETER2',this.params.data.callout);
       localStorage.setItem('CALLOUT-PARAMETER3',this.params.data.brandName);
       //localStorage.setItem('CALLOUT-PARAMETER4',this.params.data.partNumber);
       localStorage.setItem('CALLOUT-PARAMETER5',this.params.data.calloutType);
       localStorage.setItem('CALLOUT-PARAMETER6',this.params.data.searchSectionUID);
       localStorage.setItem('CALLOUT-PARAMETER7',this.params.data.searchSectionName);
       this.router.navigate(['/home/managecallout/vehicle-mapping']);
     }

     duplicate(): void{
       localStorage.setItem('CALLOUT-PARAMETER2',this.params.data.callout);
       localStorage.setItem('CALLOUT-PARAMETER3',this.params.data.brandName);
       localStorage.setItem('CALLOUT-PARAMETER5',this.params.data.calloutType);
       localStorage.setItem('CALLOUT-PARAMETER6',this.params.data.searchSectionUID);
       localStorage.setItem('CALLOUT-PARAMETER7',this.params.data.searchSectionName);
       /* this.router.navigate(['/home/managecallout/duplicatecallout']); */
       $('#modalDuplicatecallout').css('display', 'block')+ this.params.value;;
      this.params.context.componentParent.ClickDuplicateCallout(this.params.value);
     }
     
     async archive(val): Promise<void> {
      const userUID=localStorage.getItem('user_id');
      const callout=this.params.data.callout;
      const partNotes=this.params.data.partNotes;
      const calloutType=this.params.data.calloutType;
      const searchSectionUID=this.params.data.searchSectionUID;
      await this.httpClient.post<any>(this.apiURL + '/api/updatecalloutarchstatus',{userUID:userUID,partNotes:partNotes,calloutType:calloutType,searchSectionUID:searchSectionUID,ArchStatus:val})
      .subscribe(data => {
        this.params.context.componentParent.clickEvent();
      });


     }

     async restore(val): Promise<void> {
      const userUID=localStorage.getItem('user_id');
      const callout=this.params.data.callout;
      const partNotes=this.params.data.partNotes;
      const calloutType=this.params.data.calloutType;
      const searchSectionUID=this.params.data.searchSectionUID;
      await this.httpClient.post<any>(this.apiURL + '/api/updatecalloutarchstatus',{userUID:userUID,partNotes:partNotes,calloutType:calloutType,searchSectionUID:searchSectionUID,ArchStatus:val})
      .subscribe(data => {
        this.params.context.componentParent.clickEvent();
      });
    }


     async updateActive(): Promise<void> {
      
      const userUID=localStorage.getItem('user_id');
      const callout=this.params.data.callout;
      const partNotes=this.params.data.partNotes;
      const calloutType=this.params.data.calloutType;
      const searchSectionUID=this.params.data.searchSectionUID;
      const isActive=$('#c_' + this.params.value).prop('checked') ? 1 : 0;
      await this.httpClient.post<any>(this.apiURL + '/api/updatecalloutactive',{userUID:userUID,partNotes:partNotes,calloutType:calloutType,searchSectionUID:searchSectionUID,ArchStatus:isActive})
      .subscribe(data => {
        this.params.context.componentParent.clickEvent();
      });

     }
     

}

