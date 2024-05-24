import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CsvExportModule } from '@ag-grid-community/csv-export';
declare var hideSearchText: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-searchlog',
  templateUrl: './searchlog.component.html',
  styleUrls: ['./searchlog.component.css']
})
export class SearchlogComponent implements OnInit {
  apiURL: any;
  searchValue: any;
  gridApi: any;
  gridColumnApi: any;
  modules = [ClientSideRowModelModule, CsvExportModule];
  public roleUID: any;
   public dummy = {
    userUID: null,
    roleUID: null
   }
  defaultColDef: any;
  sortingOrder: any;
  columnDefs: any;
  rowData: any;
  constructor(private httpClient: HttpClient, private router: Router) {
    this.apiURL = environment.apiURL;
    this.columnDefs = [
      { headerName: 'User Email', field: 'userEmail',  width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellStyle: {cursor: 'pointer'}},   
      { headerName: 'Make', field: 'make',  width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellStyle: {cursor: 'pointer'}},
      { headerName: 'Model', field: 'model',  width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellStyle: {cursor: 'pointer'} },
      { headerName: 'Year', field: 'year',  width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellStyle: {cursor: 'pointer'} },
      { headerName: 'Option1', field: 'option1',  width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellStyle: {cursor: 'pointer'} },
      { headerName: 'Option2', field: 'option2',  width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellStyle: {cursor: 'pointer'} },
      { headerName: 'Option3', field: 'option3',  width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellStyle: {cursor: 'pointer'} },
      { headerName: 'Option4', field: 'option4',  width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellStyle: {cursor: 'pointer'} },
      { headerName: 'Option5', field: 'option5',  width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellStyle: {cursor: 'pointer'} },
      { headerName: 'Option6', field: 'option6',  width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellStyle: {cursor: 'pointer'} },
      { headerName: 'Ip Address', field: 'ipaddress',  width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellStyle: {cursor: 'pointer'} },
      { headerName: 'Search Date', field: 'searchDate', sortingOrder: ['desc', 'asc'], floatingFilter: true, cellStyle: {cursor: 'pointer'}, filter: 'agTextColumnFilter'},
      { headerName: 'Device', field: 'device',  width: 1000, sortable: true},
      { headerName: 'vehicleUID', field: 'vehicleUID',  width: 10, sortable: true}
    ];
   }

  ngOnInit(): void {
    //hideSearchText(); 
    updatePageTitle('Search Log');
    this.defaultColDef = {
      width: 195,
      sortable: true,
    };
    this.sortingOrder = ['desc', 'asc', null];
    this.roleUID = localStorage.getItem('role_id');
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    const vehicleUIDColumn = this.gridColumnApi
    .getAllColumns()
    .find((x) => x.colDef.headerName == 'vehicleUID');
    this.gridColumnApi.setColumnVisible(vehicleUIDColumn, false);
    const sortModel = [
      {
        colId: 'searchDate', sort: 'desc'
      }];
      this.gridApi.setSortModel(sortModel);
      this.dummy.roleUID = parseInt(localStorage.getItem('role_id'));
      this.dummy.userUID =  parseInt(localStorage.getItem('user_id'));
      if(this.dummy.roleUID != 4){
       this.dummy.roleUID = null;
       this.dummy.userUID = localStorage.getItem('user_id');
      }
      this.httpClient.post<any>(this.apiURL + '/api/getzsearchlogs',this.dummy)
        .subscribe(data => {
        this.rowData = (data as any).searchlogdetails;
    });
  }

  onRedirectURL(params): void {
    var focusedCell = this.gridApi.getFocusedCell();
    var columIndex = this.gridColumnApi.getAllDisplayedColumns().indexOf(focusedCell.column);
    if (columIndex != 0)
    {
      this.router.navigate(['/home/vehiclemaster/viewvehicle/' + params.data.vehicleUID]);
      //this.router.navigate([]).then(result => {  window.open( `${environment.domainURL}#/home/vehiclemaster/viewvehicle/${params.data.vehicleUID}`, '_blank'); });
    }
  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

  quickSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  } 
}