import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FeedbacklogCompleteIncompleteCellRendererComponent } from '../feedbacklog-complete-incomplete-cell-renderer/feedbacklog-complete-incomplete-cell-renderer.component';
import { GridOptions } from "@ag-grid-community/core";
import { CsvExportModule } from '@ag-grid-community/csv-export';
declare var hideSearchText: any;
declare var updatePageTitle: any;
declare var $: any;
@Component({
  selector: 'app-feedbacklog',
  templateUrl: './feedbacklog.component.html',
  styleUrls: ['./feedbacklog.component.css']
})
export class FeedbacklogComponent implements OnInit {
  apiURL: any;
  searchValue: any;
  gridApi: any;
  gridColumnApi: any;
  frameworkComponents: any;
  modules = [ClientSideRowModelModule, CsvExportModule];
  public roleUID: any;
  public dummy = {
    userUID: null,
    roleUID: null,
    ArchStatus: null
   }
  defaultColDef: any;
  sortingOrder: any;
  gridOptions: any;
  columnDefs = [
  { headerName: 'Action', field: 'isCompleted', width: 200, filter: 'agTextColumnFilter', cellRenderer: 'feedbacklogCompleteIncompleteCellRendererComponent'},
  {
    headerName: "Feedback Date",
    field: "feedbackDate",
    valueFormatter: dateFormatter,
    comparator: dateComparator,
    filter: "agDateColumnFilter",
    floatingFilter: true, 
    cellStyle: {cursor: 'pointer'},
    floatingFilterComponentParams: {
      suppressFilterButton: true
    },
    filterParams: {
      debounceMs: 500,
      suppressAndOrCondition: true,
      comparator: function(filterLocalDateAtMidnight, cellValue) {
        if (cellValue == null) {
          return 0;
        }
        var dateParts = cellValue.split("/");
        var year = Number(dateParts[2]);
        var month = Number(dateParts[1]) - 1;
        var day = Number(dateParts[0]);
        var cellDate = new Date(year, month, day);

        if (cellDate < filterLocalDateAtMidnight) {
          return -1;
        } else if (cellDate > filterLocalDateAtMidnight) {
          return 1;
        } else {
          return 0;
        }
      }
    }
  },
    { headerName: 'User Email', field: 'useremail',  width: 244, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, 
    cellStyle: {cursor: 'pointer'}
   },
    { headerName: 'First Name', field: 'firstName',  width: 150, sortable: true, cellStyle: {cursor: 'pointer'}},
    { headerName: 'Last Name', field: 'lastName',  width: 150, sortable: true, cellStyle: {cursor: 'pointer'}},
    { headerName: 'User Store Name', field: 'storeName',  width: 180, sortable: true, cellStyle: {cursor: 'pointer'}},
    { headerName: 'Make', field: 'Make',  width: 150, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellStyle: {cursor: 'pointer'}},
    { headerName: 'Model', field: 'Model',  width: 150, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellStyle: {cursor: 'pointer'}},
    { headerName: 'Year', field: 'Year',  width: 150, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true, cellStyle: {cursor: 'pointer'}},
    { headerName: 'From To', field: 'fromto', width: 150, sortable: true, cellStyle: {cursor: 'pointer'}},
    { headerName: 'Vehicle Version', field: 'VehicleVersion',  width: 300, sortable: true, cellStyle: {cursor: 'pointer'}},
    { headerName: 'Vehicle UID', field: 'vehicleUID',  width: 244, sortable: true, cellStyle: {cursor: 'pointer'} },
    { headerName: 'Feedback Text', field: 'feedbackText',  width: 2000, sortable: true, cellStyle: {cursor: 'pointer'}},
  ];
  rowData: any;
  
  constructor(private httpClient: HttpClient,  private router: Router) {
    this.apiURL = environment.apiURL;
    this.gridOptions = <GridOptions>{
      context: {
          componentParent: this
      }
  };
  }
  ngOnInit(): void {
    updatePageTitle('Feedback Log');
    //hideSearchText();
    this.frameworkComponents = {
      feedbacklogCompleteIncompleteCellRendererComponent: FeedbacklogCompleteIncompleteCellRendererComponent
    };
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
    const sortModel = [
      {
        colId: 'feedbackDate', sort: 'desc'
      }];
      this.gridApi.setSortModel(sortModel);
      this.dummy.roleUID = parseInt(localStorage.getItem('role_id'));
      this.dummy.userUID =  parseInt(localStorage.getItem('user_id'));
      this.dummy.ArchStatus = 0;
      if(this.dummy.roleUID != 4){
       this.dummy.roleUID = null;
       this.dummy.userUID = localStorage.getItem('user_id');
      }
    this.httpClient.post<any>(this.apiURL + '/api/getzfeedbacklogs', this.dummy)
          .subscribe(data => {
          this.rowData = (data as any).feedbackLogsDetails;
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

  clickEvent(): void {

    this.dummy.ArchStatus = $('#archive').prop('checked') === true?1:0;
    this.dummy.userUID = localStorage.getItem('user_id');
    this.dummy.roleUID = localStorage.getItem('roleUID');

     if ($('#hideComp').prop('checked') === true) {
      this.httpClient.post<any>(this.apiURL + '/api/getincompletefeedback', this.dummy)
      .subscribe(data => {
      this.rowData = (data as any).incompleteFeedbackLog;
      this.gridApi.setRowData(this.rowData); 

      });
    }
    else
    {
      this.httpClient.post<any>(this.apiURL + '/api/getzfeedbacklogs', this.dummy)
      .subscribe(data => {
          this.rowData = (data as any).feedbackLogsDetails;
          this.gridApi.setRowData(this.rowData); 
       });

    }
   

  }
 
}

// DATA FORMATTING
function dateFormatter(params) {
  var dateAsString = params.data.feedbackDate;
  var dateParts = dateAsString.split("/");
  return `${dateParts[1]}-${dateParts[0]}-${dateParts[2]}`;
}

function dateComparator(date1, date2) {
  var date1Number = _monthToNum(date1);
  var date2Number = _monthToNum(date2);

  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }

  return date1Number - date2Number;
}

function _monthToNum(date) {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }

  var yearNumber = date.substring(6, 10);
  var monthNumber = date.substring(3, 5);
  var dayNumber = date.substring(0, 2);

  var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
  // 29/08/2004 => 20040829
  return result;
}
