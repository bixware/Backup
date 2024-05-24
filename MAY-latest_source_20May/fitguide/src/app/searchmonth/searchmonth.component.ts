import { Component, OnInit } from '@angular/core';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CsvExportModule } from '@ag-grid-community/csv-export';
declare var hideSearchText: any;

@Component({
  selector: 'app-searchmonth',
  templateUrl: './searchmonth.component.html',
  styleUrls: ['./searchmonth.component.scss']
})
export class SearchmonthComponent implements OnInit {

  apiURL: any;
  searchValue: any;
  gridApi: any;
  gridColumnApi: any;
  modules = [ClientSideRowModelModule, CsvExportModule];
  public roleUID: any;
   public dummy = {
    userUID: null,
    roleUID: null,
    PROC_TYPE: ''
  }
 defaultColDef: any;
 sortingOrder: any;
 columnDefs = [
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
   { headerName: 'Search Date', field: 'searchDate', sortingOrder: ['desc', 'asc'], filter: 'agTextColumnFilter', floatingFilter: true, cellStyle: {cursor: 'pointer'} },
   { headerName: 'Device', field: 'device',  width: 1000, sortable: true},
   { headerName: 'vehicleUID', field: 'vehicleUID',  width: 10, sortable: true}
 ];
  rowData: any;
  constructor(private httpClient: HttpClient, private router: Router) {
    this.apiURL = environment.apiURL;
   }
  ngOnInit(): void {
    hideSearchText(); 
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
    this.dummy.userUID = localStorage.getItem('user_id');
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
      this.dummy.PROC_TYPE = 'SELECT_MONTH_SEARCH_LOG';
      this.httpClient.post<any>(this.apiURL + '/api/getdashboardvehiclesearch',this.dummy)
          .subscribe(data => {
          this.rowData = (data as any).searchlog;
          console.log(data);
    });
  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

  quickSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  }

}

