import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PostService } from '../post.service';
import { InfiniteRowModelModule } from '@ag-grid-community/infinite-row-model';
import { IDatasource } from '@ag-grid-community/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
declare var $: any;
declare var hideSearchText: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-vehicleadditional',
  templateUrl: './vehicleadditional.component.html',
  styleUrls: ['./vehicleadditional.component.scss']
})
export class VehicleadditionalComponent implements OnInit, OnDestroy {
  apiURL: any;
  searchValue: any;
  public list = {
    PROC_TYPE: 'List',
    userUID: ''
  };
  sData: any;
  apiFlag: any;
  successMessage: any;
  gridApi: any;
  gridColumnApi;
  modules = [InfiniteRowModelModule];
  columnDefs: any;
  defaultColDef: any;
  components: any;
  rowBuffer = 0;
  rowModelType = 'infinite';
  cacheBlockSize = 100;
  cacheOverflowSize = 2;
  maxConcurrentDatasourceRequests = 1;
  infiniteInitialRowCount = 100;
  maxBlocksInCache = 10;
  rowData: [];
  dataSource: IDatasource = {
    rowCount: null,
    getRows: ({startRow, endRow, sortModel, filterModel, successCallback, failCallback}) => this.postService
    .getList(startRow, endRow,filterModel,sortModel,localStorage.getItem('user_id'))
    .pipe(takeUntil(this.destroy))
    .subscribe((data) => {
      console.log((data as any).VehicleScrolling);
      let dataAfterSortingAndFiltering = (data as any).VehicleScrolling;
      
      let lastRow = -1;
      
      if(endRow>=data.totalcount)
      {
        lastRow=data.totalcount;
       
      }

      let rowsThisPage = dataAfterSortingAndFiltering;
      /* console.log(
        'asking for ' + startRow + ' to ' + endRow
      + ' lastrow ' + lastRow); */
      console.log('rowsThisPage',rowsThisPage);
      successCallback(rowsThisPage, lastRow);

      },
    error => failCallback())
  };
  private destroy = new Subject<void>();
  constructor(private http: HttpClient, private router: Router, private postService: PostService) {
    this.columnDefs = [
      { headerName: 'vehicleDetailNonVehUID', field: 'vehicleDetailNonVehUID', hide: true},
      { headerName: 'Make', field: 'make', editable: true, cellRenderer: 'loadingRenderer', filter: 'agTextColumnFilter', floatingFilter: true},
      { headerName: 'Model', field: 'model', editable: true, filter: 'agTextColumnFilter', floatingFilter: true},
      { headerName: 'Year', field: 'year', editable: true, filter: 'agTextColumnFilter', floatingFilter: true},
      { headerName: 'Qualifier', field: 'qualifier', editable: true},
      { headerName: 'Display Header', field: 'partDisplayHeader', editable: true},
      { headerName: 'Display Text', field: 'partValue1', editable: true, filter: 'agTextColumnFilter', floatingFilter: true},
    ];
    this.apiURL = environment.apiURL;
    this.defaultColDef = {
      flex: 1,
      minWidth: 200,
      sortable: true,
      resizable: true
    };
    this.components = {
      loadingRenderer: function (params) {
        if (params.value !== undefined) {
          return params.value;
        } else {
          return "<img src=\"https://www.ag-grid.com/example-assets/loading.gif\">";
        }
      },
    };
  }

  ngOnInit(): void {
    //hideSearchText();
    this.apiFlag = false;
    updatePageTitle('Vehicle Additional');
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.setDatasource(this.dataSource);
  }

  sortAndFilter(allOfTheData, sortModel, filterModel): any {
    return allOfTheData;
  }

  onCellValueChanged(event): void {
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('PROC_TYPE', 'Update');
    myFormData.append('updateString', JSON.stringify(event.data));
    myFormData.append('vehicleDetailNonVehUID', event.data.vehicleDetailNonVehUID);
    this.apiFlag = true;
    this.http.post<any>(this.apiURL + '/api/updatenonvehicles', myFormData)
         .subscribe(data => {
          $('#text').css('display', 'none');
          if (data.return_code == 0) {
            this.successMessage = 'Updated Successfully !';
            $('#info_success').css('display', 'block');
          }
          else{
            this.successMessage = 'Update Failed !';
            $('#info_alert').css('display', 'block');
        }
    });
  }

  close1(): void{
    this.apiFlag = false;
  }

}
