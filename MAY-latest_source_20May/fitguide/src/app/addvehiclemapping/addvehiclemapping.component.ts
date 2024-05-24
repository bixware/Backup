import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
declare var $: any;
//declare var hideSearchText: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-addvehiclemapping',
  templateUrl: './addvehiclemapping.component.html',
  styleUrls: ['./addvehiclemapping.component.scss']
})
export class AddvehiclemappingComponent implements OnInit, OnDestroy {
  apiURL: any;
  redirectSecounds: any;
  clicked: any;
  apiFlag: any;
  apiFlagError: any;
  successMessage: string;
  errorMsg: string;
  bundleDetailsFlag: any;
  bundleList: string;
  parts: any;
  bundleparts = [];
  data = {
    bundleUID: ''
  }
  mapdata = {
    userUID : '',
    partUID : [],
    mappingpartUID : []
  }
  checkboxId4 = [];
  
  // AG Grid Part
  private gridApi: any;
  private gridColumnApi: any;
  private gridApi1: any;
  private gridColumnApi1: any;
  /* rowSelection: any; */
  modules = [ClientSideRowModelModule];
  //submitted = false;
  public loadingOverlayComponentParams: any = {
    loadingMessage: 'One moment please...',
  };
  
  columnDefs = [
    {
      headerName: 'Select Part', width: 120, sortable: true, checkboxSelection: true
    },
    { headerName: 'Part Number',  width: 220, field: 'partNumber', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Vehicle Mapping Count', field: 'vehicleCount', width: 320, sortable: true, filter: true }
  ];
  columnDefs1 = [
    {
      headerName: 'Select Part', width: 120, sortable: true, checkboxSelection: true
    },
    { headerName: 'Part Number',  width: 220, field: 'partNumber', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Vehicle Mapping Count', field: 'vehicleCount', width: 320, sortable: true, filter: true }
  ];
  rowData: any;
  rowData1: any;
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public rowSelection1: 'single' | 'multiple' = 'multiple';
  constructor(private http: HttpClient, public fb: FormBuilder, private location: Location,private router: Router) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
   }

  ngOnInit(): void {
    this.clicked = false;
    //hideSearchText();
    this.bundleDetailsFlag = false;
    this.getBundlelist();
    this.apiFlag = false;
    this.apiFlagError = false;
    updatePageTitle('Add Vehicle Mapping');
  }

  getBundlelist(): void {
    this.http.get<any>(this.apiURL + '/api/getbundle')
      .subscribe(data => {
        this.bundleparts = (data as any).partBundle;
      });
      $("#pBundle").prop("disabled", true);
  }

  getBundleUID(e): void {
    this.bundleList = e.target.value;
    $("#bundle_text").css("visibility", "hidden").css("display", "none");
    this.bundleDetailsFlag = false;
    $("#pBundle").prop("disabled", true);
  }

  getBundleDetails(): void {
    if (!this.bundleList) {
      $("#bundle_text").css("visibility", "visible").css("display", "");
      
    }
    else{
      $("#bundle_text").css("visibility", "hidden").css("display", "none");
      this.bundleDetailsFlag = true;
      this.data.bundleUID = this.bundleList;
      if (this.bundleDetailsFlag == true) {
        $("#pBundle").prop("disabled", true);
       }
       else {
        $("#pBundle").prop("disabled", false);
       }
    }
    
  }

  //Get Partdetails AG Grid
  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.http.post<any>(this.apiURL + '/api/getpartsmappedvehicle', this.data)
      .subscribe(data => {
        this.rowData = (data as any).partDetails;
      });
      $("#pBundle").prop("disabled", true);
    }
    
  
  onSelectionChanged(): void {
    if (this.gridApi1.getSelectedRows().length > 0 && this.gridApi.getSelectedRows().length > 0) {
      $("#pBundle").prop("disabled", false);
     }
     else {
      $("#pBundle").prop("disabled", true);
     }
    let vehicleSelectedRow = this.gridApi.getSelectedRows();
    vehicleSelectedRow.forEach(element => {
    this.checkboxId4.push(element.partUID);
    });
    if(this.checkboxId4[0].length != 0){
      //console.log(this.checkboxId4[0]);
      for(let i=0; i<this.checkboxId4.length; i++){
        if(vehicleSelectedRow.length > 1){
          //console.log(vehicleSelectedRow);
          this.apiFlagError = true;
          this.errorMsg = 'Please choose only one part!';
          $("#info_erroralert").css("display", "block");
          //console.log(this.errorMsg); 
          this.checkboxId4 = [];
          /* setTimeout(() => {
            this.close1();
          }, this.redirectSecounds);
         */
        }
      }
    }
  }

  onSelectionChanged1(): void {
    if (this.gridApi1.getSelectedRows().length > 0 && this.gridApi.getSelectedRows().length > 0) {
      $("#pBundle").prop("disabled", false);
     }
     else {
      $("#pBundle").prop("disabled", true);
     }
    //console.log('test');
    let vehicleSelectedRow1 = this.gridApi1.getSelectedRows();
    let checkboxId5 = Array();
    vehicleSelectedRow1.forEach(element => {
    checkboxId5.push(element.partUID);
    });
    if(checkboxId5.length != 0){
      //console.log(this.checkboxId4[0]);
      //console.log(checkboxId5);
      for(let i=0; i< checkboxId5.length; i++){
        if(this.checkboxId4[0] == checkboxId5[i]){
          //console.log(checkboxId5[i]);
          this.apiFlagError = true;
          this.errorMsg = 'Please choose another part!';
          $("#info_erroralert").css("display", "block");
          //console.log(this.errorMsg); 
          this.checkboxId4 = [];
          /* setTimeout(() => {
            this.close1();
          }, this.redirectSecounds);
           */ 
        }
      }
    }
    
  }

  onGridReady1(params): void {
    this.gridApi1 = params.api;
    this.gridColumnApi1 = params.columnApi;
    this.http.post<any>(this.apiURL + '/api/getpartsmappedvehicle', this.data)
      .subscribe(data => {
        this.rowData1 = (data as any).partDetails;
      });
      $("#pBundle").prop("disabled", true);
    }

  

  proceedMapVehicle(): void{
    //this.submitted = true;
    const checkboxId3 = this.gridApi.getSelectedRows();
    const checkboxId4 = Array();
    checkboxId3.forEach(element => {
    //this.rowData.push({'partUID': element.partUID});
    checkboxId4.push(element.partUID);
    });
    const checkboxId1 = this.gridApi1.getSelectedRows();
    const checkboxId2 = Array();
    checkboxId1.forEach(element => {
      checkboxId2.push(element.partUID);
    });
      this.mapdata.userUID = localStorage.getItem('user_id');;
      this.mapdata.partUID = checkboxId4;
      this.mapdata.mappingpartUID = checkboxId1;
      this.apiFlag = true;
      this.clicked = true;
      this.http.post<any>(this.apiURL + '/api/mappingvehicletopart', this.mapdata)
      .subscribe(data => {
      document.getElementById('text').style.display = 'none';
      if (data.return_code == 0) {
        this.successMessage = 'Vehicle Details Updated Successfully!';
        document.getElementById('info_success').style.display = 'block';
        setTimeout(() => {
          this.close1();
        }, this.redirectSecounds);
      }
      else {
        this.successMessage = data.errors[0];     
        this.clicked = false;  
        document.getElementById('info_alert').style.display = 'block';
      }
    });
    
  }

  clickEvent(): void {
    this.gridApi.showLoadingOverlay();
    this.http.post<any>(this.apiURL + '/api/getpartsmappedvehicle', this.data)
    .subscribe(data => {
      this.rowData = (data as any).partDetails;
      this.gridApi.setRowData(this.rowData);
      this.gridApi.hideOverlay();
    });
  }

  clickEvent1(): void {
    this.gridApi1.showLoadingOverlay();
    this.http.post<any>(this.apiURL + '/api/getpartsmappedvehicle', this.data)
    .subscribe(data => {
      this.rowData1 = (data as any).partDetails;
      this.gridApi1.setRowData(this.rowData1);
      this.gridApi1.hideOverlay();
    });
  }

  close1(): void {
    //this.submitted = false;
    this.apiFlag = false; 
    this.apiFlagError = false; 
    this.bundleDetailsFlag = false;
    this.getBundlelist();
     /* if (this.clicked == true) {
      this.clicked = false;
      location.reload();
    } */
    $("#pBundle").prop("disabled", true);
  }

  close2(): void {
    this.apiFlagError = false; 
    this.clickEvent();
    this.clickEvent1();
    $("#pBundle").prop("disabled", true);
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }

}

