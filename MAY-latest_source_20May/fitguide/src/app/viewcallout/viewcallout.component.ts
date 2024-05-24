import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { environment } from 'src/environments/environment';
declare var $: any;
import { GridOptions } from "@ag-grid-community/core";
import { CalloutVehicleCellRenderComponent } from '../callout-vehicle-cell-render/callout-vehicle-cell-render.component';
declare var updatePageTitle: any;
@Component({
  selector: 'app-viewcallout',
  templateUrl: './viewcallout.component.html',
  styleUrls: ['./viewcallout.component.scss']
})
export class ViewcalloutComponent implements OnInit {
  apiURL: any;
  public user = {
    partUID : '',
    userUID: ''
  };
  deleteparts : any;
  gridApi: any;
  gridColumnApi: any;
  modules = [ClientSideRowModelModule];
  frameworkComponents: any;
  gridOptions: any;
  context;
  partNumber:any;
  callout:any;
  brand:any;
  partUID:any;
  calloutType:any;
  searchSectionUID:any;
  searchSectionName:any;
  showButton = false;
  successMessage: string;
  apiFlag: any;
  redirectSecounds: any;
  public loadingOverlayComponentParams: any = {
    loadingMessage: 'One moment please...',
  };
  deleteData = {
    userUID: '',
    vehicleDetailUID: [],
    AGgridRowIndex: []
  };
  params: any;
  clicked: any;
  receiveAGGridEmit(rowIndex) {
    //var node = this.gridApi.getRowNode(rowIndex);
    //const model = this.gridOptions.api.getFilterModel();
    this.gridApi.applyTransaction({ remove: [this.rowData[rowIndex]] });
    //this.gridOptions.api.setFilterModel(model);
    this.rowData.splice(rowIndex, 1);  
    //this.gridApi.setRowData(this.rowData);
  }
  columnDefs = [
    { headerName: 'Actions', width: 150, sortable: false, filter: false,
    cellRenderer: 'CalloutVehicleCellRenderComponent' , checkboxSelection: true, headerCheckboxSelectionFilteredOnly: true, headerCheckboxSelection: true
    },
    { headerName: 'Make', field: 'Make', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true, filterParams: { newRowsAction: 'keep'}},
    { headerName: 'Model', field: 'Model', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true, filterParams: { newRowsAction: 'keep'}},
    { headerName: 'Year', field: 'Year', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true, filterParams: { newRowsAction: 'keep'} },
    { headerName: 'Option1', field: 'Option1', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true, filterParams: { newRowsAction: 'keep'} },
    { headerName: 'Option2', field: 'Option2', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true, filterParams: { newRowsAction: 'keep'}},
    { headerName: 'Option3', field: 'Option3', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true, filterParams: { newRowsAction: 'keep'}},
    { headerName: 'Option4', field: 'Option4', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true, filterParams: { newRowsAction: 'keep'} },
    { headerName: 'Option5', field: 'Option5', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true, filterParams: { newRowsAction: 'keep'} },
    { headerName: 'Option6', field: 'Option6', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true, filterParams: { newRowsAction: 'keep'} },
    { headerName: 'Vehicle Version', field: 'VehicleVersion', sortable: true, filter: true },
    { headerName: 'From To', field: 'fromto', sortable: true, filter: true },
    { headerName: 'Transition Year 12year', field: 'TransitionYear12year', sortable: true, filter: true },
    { headerName: 'Transition Year 12year_2', field: 'TransitionYear12year_2', sortable: true, filter: true }
  ];
  rowData: any;
  parts: any;
  public rowSelection: 'single' | 'multiple' = 'multiple';
  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location,private router: Router) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.gridOptions = <GridOptions> {
      context: {
          componentParent: this
      }
    };
  }

  ngOnInit(): void {
    updatePageTitle('View Callout');
    this.frameworkComponents = {
      CalloutVehicleCellRenderComponent: CalloutVehicleCellRenderComponent
    };

    this.user.userUID = localStorage.getItem('user_id');
    this.parts = {};
  
   this.brand=localStorage.getItem('CALLOUT-PARAMETER3');
   this.callout=localStorage.getItem('CALLOUT-PARAMETER2');
   this.calloutType=localStorage.getItem('CALLOUT-PARAMETER5');
   this.searchSectionUID=localStorage.getItem('CALLOUT-PARAMETER6');
   this.searchSectionName=localStorage.getItem('CALLOUT-PARAMETER7');
   if(this.callout==null ||this.calloutType==null)
   {
    this.router.navigate(['/home/managecallout']);
   }
  }

  
  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
    var ArchStatus = $('#archive').prop('checked') === true?1:0;
    var parameter={userUID: this.user.userUID,callout:this.callout,ArchStatus:ArchStatus,calloutType:this.calloutType,searchSectionUID:this.searchSectionUID}
   
    this.http.post<any>(this.apiURL + '/api/getcalloutvehicle', parameter)
      .subscribe(data => {
        if (data.return_code != 1) {
          this.rowData = (data as any).calloutDetails;
        }
        else {
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

  calloutdelete(): void{
    this.deleteData.userUID = localStorage.getItem('user_id');
    const partVehicleID = this.gridApi.getSelectedRows();
    const partVehicleID1 = Array();
    partVehicleID.forEach(element => {
      partVehicleID1.push(element.vehicleDetailUID);
    });
    this.deleteData.vehicleDetailUID = partVehicleID1;
    this.apiFlag = true;
    this.http.post<any>(this.apiURL + '/api/deletebulkcalloutbyid', this.deleteData)
      .subscribe(data => {
        console.log(data);
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.deleteparts = (data as any).partList;
          this.successMessage = 'Mapped Callout Deleted Successfully!';
          document.getElementById('info_success').style.display = 'block';
          setTimeout(() => {
            this.close1();
          }, this.redirectSecounds);
        }
        else {
          this.successMessage = data.err_message;
          document.getElementById('info_alert').style.display = 'block';
        }
      });
     
  }

  clickEvent(): void {
    var ArchStatus = $('#archive').prop('checked') === true?1:0;
    var parameter={userUID: this.user.userUID,callout:this.callout,ArchStatus:ArchStatus,calloutType:this.calloutType,searchSectionUID:this.searchSectionUID}
    this.gridApi.showLoadingOverlay();
    //const model = this.gridOptions.api.getFilterModel();
    this.http.post<any>(this.apiURL + '/api/getcalloutvehicle', parameter)
      .subscribe(data => {
        if (data.return_code != 1) {
          this.rowData = (data as any).calloutDetails;
        }
        else {
          this.rowData = [];
        }
        this.gridApi.setRowData(this.rowData); 
        this.gridApi.hideOverlay();
        //this.gridOptions.api.setFilterModel(model);
    });
  }

  back(): void {
    this.location.back();
  }

   close1(): void{
    this.apiFlag = false;
    if (this.clicked == true) {
      this.location.back();
      this.clicked = false;
    }
    this.clickEvent();
    this.showButton = false;
  }

  clickDeleteCalout(value): void{
    /* this.clicked = false;
    this.apiFlag = false;
    this.deleteData.userUID = localStorage.getItem('user_id');
    const partVehicleID = this.gridApi.getSelectedRows();
    const partVehicleID1 = Array();
    partVehicleID.forEach(element => {
      partVehicleID1.push(element.vehicleDetailUID);
    });
    this.deleteData.vehicleDetailUID = partVehicleID1;
    this.deleteData.AGgridRowIndex = this.params.rowIndex;
 */
  }

  removeCallout():void{

  }

  cancel():void{

  }

}

