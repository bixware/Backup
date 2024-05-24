import { Component, OnInit,Input ,Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { environment } from 'src/environments/environment';
declare var $: any;
import { GridOptions } from "@ag-grid-community/core";
import { ViewpartEditCellRendererComponent } from '../viewpart-edit-cell-renderer/viewpart-edit-cell-renderer.component';
declare var updatePageTitle: any;
@Component({
  selector: 'app-viewpart',
  templateUrl: './viewpart.component.html',
  styleUrls: ['./viewpart.component.css']
})
export class ViewpartComponent implements OnInit {
  @Input() public partUID;
  @Input() public vehicleUID;
  @Input() public AGgridRowIndex;
  @Output() removedAGgridRowIndex = new EventEmitter<any>();
  apiURL: any;
  imgURL: any;
  blobURL:any;
  public user = {
    partUID : '',
    userUID: '',
  };
  prevImage=[];
  imageFlag: any;
  gridApi: any;
  gridColumnApi: any;
  modules = [ClientSideRowModelModule];
  frameworkComponents: any;
  gridOptions: any;
  context;
  apiFlag: any;
  showButton = false;
  successMessage: any;
  clicked: any;
  redirectSecounds: any;
  deleteData = {
    partUID: null,
    vehicleUID: []
  };
  deleteparts: any;
  public loadingOverlayComponentParams: any = {
    loadingMessage: 'One moment please...',
  };
  receiveAGGridEmit(rowIndex) {
    //var node = this.gridApi.getRowNode(rowIndex);
    this.gridApi.applyTransaction({ remove: [this.rowData[rowIndex]] });
    this.rowData.splice(rowIndex, 1);
    //this.gridApi.setRowData(this.rowData);
  }
  columnDefs = [
    { headerName: 'Actions', width: 150, sortable: false, filter: false,
    cellRenderer: 'viewpartEditCellRendererComponent' , checkboxSelection: true, headerCheckboxSelectionFilteredOnly: true, headerCheckboxSelection: true
    },
    { headerName: 'Make', field: 'Make', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true , filterParams: { newRowsAction: 'keep'}},
    { headerName: 'Model', field: 'Model', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true , filterParams: { newRowsAction: 'keep'}},
    { headerName: 'Year', field: 'Year', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true , filterParams: { newRowsAction: 'keep'} },
    { headerName: 'Option1', field: 'Option1', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true , filterParams: { newRowsAction: 'keep'} },
    { headerName: 'Option2', field: 'Option2', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true , filterParams: { newRowsAction: 'keep'} },
    { headerName: 'Option3', field: 'Option3', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true , filterParams: { newRowsAction: 'keep'} },
    { headerName: 'Option4', field: 'Option4', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true , filterParams: { newRowsAction: 'keep'} },
    { headerName: 'Option5', field: 'Option5', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true , filterParams: { newRowsAction: 'keep'} },
    { headerName: 'Option6', field: 'Option6', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true , filterParams: { newRowsAction: 'keep'}},
    { headerName: 'Vehicle Version', field: 'VehicleVersion', sortable: true, filter: true },
    { headerName: 'From To', field: 'fromto', sortable: true, filter: true },
    { headerName: 'Transition Year 12year', field: 'TransitionYear12year', sortable: true, filter: true },
    { headerName: 'Transition Year 12year_2', field: 'TransitionYear12year_2', sortable: true, filter: true }
  ];
  rowData: any;
  parts: any;
  public rowSelection: 'single' | 'multiple' = 'multiple';
  constructor(private route: ActivatedRoute, private httpClient: HttpClient, private location: Location) {
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
    this.blobURL = environment.blobURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.gridOptions = <GridOptions> {
      context: {
          componentParent: this
      }
    };
  }

  ngOnInit(): void {
    updatePageTitle('View Part');
    this.frameworkComponents = {
      viewpartEditCellRendererComponent: ViewpartEditCellRendererComponent
    };
    this.imageFlag = false;
    this.apiFlag = false;
    this.clicked = false;
    this.user.userUID = localStorage.getItem('user_id');
   /*  this.user.roleUID = localStorage.getItem('role_id'); */
    this.parts = {};
    $('#part_details').hide();
    this.route.params.subscribe(params => {
      this.user.partUID = params['id'];
      localStorage.removeItem('partUID');
      localStorage.setItem('partUID', this.user.partUID);
    });
    this.httpClient.post<any>(this.apiURL + '/api/editpart/' + this.user.partUID, this.user)
      .subscribe(data => {
        if (data.return_code != 1) {
          this.parts = (data as any).partDetails;
          $('#part_details').show();
          if (data.partDetails.Picture != null  && data.partDetails.Picture != '')
          {
            const fileName = data.partDetails.Picture;
            const lastDotPos = fileName.lastIndexOf('.');
            if (lastDotPos === -1)
            {
              this.imageFlag = false;
            }
            else
            {
              const fileNameSub = fileName.substr(lastDotPos + 1, fileName.length);
              if (fileNameSub.length > 4)
              {
                this.imageFlag = false;
              }
              else
              {
                this.imageFlag = true;
              }
            }
            if (data.partDetails.Picture != null && data.partDetails.Picture !== "") {
              this.prevImage.push(this.blobURL + 'app/public/uploads/part/' + data.partDetails.Picture);
            }
            if (data.partDetails.Picture_1 != null && data.partDetails.Picture_1 !== "") {
              this.prevImage.push(this.blobURL + 'app/public/uploads/part/' + data.partDetails.Picture_1);
            }
            if (data.partDetails.Picture_2 != null && data.partDetails.Picture_2 !== "") {
              this.prevImage.push(this.blobURL + 'app/public/uploads/part/' + data.partDetails.Picture_2);
            }

          }
        }
    });
  }

  back(): void {
    this.location.back();
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.httpClient.post<any>(this.apiURL + '/api/getvehicledetailsbypartid', this.user)
      .subscribe(data => {
        if (data.return_code != 1) {
          this.rowData = (data as any).VehicleDetails;
        }
        else {
          this.rowData = [];
        }
    });
  }

  clickEvent(): void {
    this.gridApi.showLoadingOverlay();
    //const model = this.gridOptions.api.getFilterModel();
    this.httpClient.post<any>(this.apiURL + '/api/getvehicledetailsbypartid', this.user)
      .subscribe(data => {
        if (data.return_code != 1) {
          this.rowData = (data as any).VehicleDetails;
        }
        else {
          this.rowData = [];
        }
        this.gridApi.setRowData(this.rowData); 
        this.gridApi.hideOverlay();
        //this.gridOptions.api.setFilterModel(model);
    });
  }

  refreshGrid(){
    this.httpClient.post<any>(this.apiURL + '/api/getvehicledetailsbypartid', this.user)
    .subscribe(data => {
      if (data.return_code != 1) {
        this.rowData = (data as any).VehicleDetails;
      } else {
        this.rowData = [];
      }
    });
  }

  onSelectionChanged(): void {
    if (this.gridApi.getSelectedRows().length > 0) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }

  partdelete(): void{
    this.deleteData.partUID = this.user.partUID;
    const partVehicleID = this.gridApi.getSelectedRows();
    const partVehicleID1 = Array();
    partVehicleID.forEach(element => {
      partVehicleID1.push(element.vehicleUID);
    });
    this.deleteData.vehicleUID = partVehicleID1;
    this.apiFlag = true;
    this.clicked = true;
    this.httpClient.post<any>(this.apiURL + '/api/deletebulkpartvehiclebyid', this.deleteData)
      .subscribe(data => {
        
        console.log(data);
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.deleteparts = (data as any).Details;
          this.successMessage = 'Mapped Part Deleted Successfully!';
          document.getElementById('info_success').style.display = 'block';
          setTimeout(() => {
            this.close1();
          }, this.redirectSecounds);
        } 
        else {
          this.successMessage = data.err_message;
          this.clicked = false;
          document.getElementById('info_alert').style.display = 'block';
        }
      });
  }

  partDelbyVehicleid(): void {
    //this.apiFlag = true;
    //this.clicked = true;
    this.httpClient.post<any>(this.apiURL + '/api/deletepartvehiclebyid',{partUID: this.partUID,vehicleUID: this.vehicleUID})
    .subscribe(data => {
      if (data.return_code == 0) {
        console.log('Part Details Deleted Successfully !');
        this.removedAGgridRowIndex.emit(this.AGgridRowIndex);
        //document.getElementById('text').style.display = 'none';
        $('#modalDeletePart').css('display', 'none');
        /* setTimeout(() => {
        }, this.redirectSecounds); */
        this.gridApi.refreshCells();
        this.refreshGrid();
        this.close1();
      }
      });
  }
  

  clickDeletePart(params): void{
    this.AGgridRowIndex = params.rowIndex;
    this.partUID = localStorage.getItem('partUID');
    this.vehicleUID = params.data.vehicleUID;
    console.log(this.AGgridRowIndex);
    console.log(this.partUID);
    console.log(this.vehicleUID);
  }

  close1(): void{
    this.apiFlag = false;
    this.clickEvent();
    this.showButton = false;
    $('#modalDeletePart').css('display', 'none');
  }
 
  close2(): void{
    this.apiFlag = false;
    //this.clickEvent();
    this.showButton = false;
    $('#modalDeletePart').css('display', 'none');
  }

}

