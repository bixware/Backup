import { Component, OnInit } from '@angular/core';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CsvExportModule } from '@ag-grid-community/csv-export';
declare var hideSearchText: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-userslog',
  templateUrl: './userslog.component.html',
  styleUrls: ['./userslog.component.css']
})
export class UserslogComponent implements OnInit {
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
  columnDefs = [
    { headerName: 'User Email', field: 'userEmail', width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'First Name', field: 'firstName', width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Last Name', field: 'lastName', width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Store Name', field: 'storeName', width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Branch Name', field: 'branchName', width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Distributor Name', field: 'distributorName', width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Company Name', field: 'companyName', width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Role Name', field: 'roleName', width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Ip Address', field: 'ipAddress', width: 195, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Login Date', field: 'loginDate', sortingOrder: ['asc','desc'] },
    { headerName: 'Logout Date', field: 'logoutDate', width: 195, sortable: true},
    { headerName: 'Device', field: 'device', width: 1000, sortable: true},
  ];
  rowData: any;
  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
    
   }
  ngOnInit(): void {
    //hideSearchText();
    updatePageTitle('User Log');
    this.defaultColDef = {
      width: 195,
      sortable: true,
    };
    this.sortingOrder = ['asc', 'desc', null];
    this.roleUID = localStorage.getItem('role_id');
  }
  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    const sortModel = [
      {
        colId: 'loginDate', sort: 'desc'
      }
    ];
    this.gridApi.setSortModel(sortModel);
     this.dummy.roleUID = parseInt(localStorage.getItem('role_id'));
     this.dummy.userUID =  parseInt(localStorage.getItem('user_id'));
     if(this.dummy.roleUID != 4){
      this.dummy.roleUID = null;
      this.dummy.userUID = localStorage.getItem('user_id');
     }
    //this.dummy = '';
    this.httpClient.post<any>(this.apiURL + '/api/getzuserlogs', this.dummy)
    .subscribe(data => {
    this.rowData = (data as any).userLogsDetails;
    });
  }
  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }
  quickSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  }
}

