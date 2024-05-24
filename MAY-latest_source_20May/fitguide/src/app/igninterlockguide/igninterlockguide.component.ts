import { Component, OnInit } from '@angular/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { GridOptions } from "@ag-grid-community/core";
import { IgnCellRenderComponent } from '../ign-cell-render/ign-cell-render.component';
import { CellValueChangedEvent} from '@ag-grid-community/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
declare var $: any;
declare var hideSearchText: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-igninterlockguide',
  templateUrl: './igninterlockguide.component.html',
  styleUrls: ['./igninterlockguide.component.scss']
})
export class IgninterlockguideComponent implements OnInit {

  apiURL: any;
  searchValue: any;
  gridApi: any;
  gridOptions: any;
  public user = {
    userUID: ''
  };
  /* public overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Please wait data is loading</span>'; */
  public dummy = {
    userUID: '',
    ArchStatus: ''
  }
  redirectSecounds: any;
  sections: any;
  sectionList: string;
  form: FormGroup;
  clicked: any;
  apiFlag: any;
  successMessage: any;
  public nonpart = {
    vehicleDetailIGNUID : '',
    userUID: ''
  };
  updateNonPartDetails = {
    userUID: "",
    searchSectionUID: "",
    vehicleDetailIGNUID: "",
    vehicleIGNPartDetails: []
  }
  vehicleDetailIGNUID: any;
  gridColumnApi: any;
  frameworkComponents: any;
  modules = [ClientSideRowModelModule];
  columnDefs = [
    { headerName: 'Actions', field: 'vehicleDetailIGNUID', width: 200, sortable: false, filter: false,
    cellRenderer: 'ignCellRenderComponent',
    },
    /* { headerName: 'Section Name', field: 'searchSectionName', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true }, */
    { headerName: 'Function Name', field: 'functionName', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true,editable: true },
    { headerName: 'Wire Color', field: 'wireColor', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true,editable: true},
    { headerName: 'Wire Location', field: 'wireLocation', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true,editable: true},
    { headerName: 'Additional Note', field: 'additionalNote', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true,editable: true},
    { headerName: 'Make', field: 'Make', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Model', field: 'Model', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Year', field: 'Year', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Option1', field: 'Option1', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Option2', field: 'Option2', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Option3', field: 'Option3', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Option4', field: 'Option4', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Option5', field: 'Option5', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Option6', field: 'Option6', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true}
  ];
  rowData: any;
  constructor(private http: HttpClient,private httpClient: HttpClient,public fb: FormBuilder,  private router: Router, private route: ActivatedRoute, private location: Location) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.form = this.fb.group({
      functionName : [''],
      wireColor : [''],
      wireLocation : [''],
      additionalNote : ['']
     
    });
    this.gridOptions = <GridOptions>{
      context: {
          componentParent: this
      }
      
  };
   }

  ngOnInit(): void {
    /* this.apiFlag=false;
    hideSearchText(); */
    this.frameworkComponents = {
      ignCellRenderComponent: IgnCellRenderComponent
    };
    updatePageTitle('IGN Interlock Guide');
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.user.userUID = localStorage.getItem('user_id');
    this.dummy.ArchStatus = '0';
    this.http.post<any>(this.apiURL + '/api/getvehicledetailsinterlock', this.user)
         .subscribe(data => {
          this.rowData = (data as any).VehicleDetailsIGNPart;
         /*  console.log('rowData',this.rowData); */
    });
  }

  clickEvent(): void {
    if($('#archive').prop('checked')){
      this.dummy.ArchStatus = '1';
    }
    else{
      this.dummy.ArchStatus = '0';
    }
    this.gridApi.showLoadingOverlay();
    this.dummy.userUID = localStorage.getItem('user_id');
    this.httpClient.post<any>(this.apiURL + '/api/getvehicledetailsinterlock', this.dummy)
      .subscribe(data => {
          this.rowData = (data as any).VehicleDetailsIGNPart;
         /*  console.log('rowData',this.rowData); */
          this.gridApi.setRowData(this.rowData);
          /* this.gridApi.hideOverlay(); */
    });
   }

  quickSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  async onCellValueChanged(params: CellValueChangedEvent) {
    var changedData = [params.data];
    const userUID=localStorage.getItem('user_id');
    const vehicleDetailIGNUID=changedData[0].vehicleDetailIGNUID;
    const functionName=changedData[0].functionName;
    const wireColor=changedData[0].wireColor;
    const wireLocation=changedData[0].wireLocation;
    const additionalNote=changedData[0].additionalNote;
    this.apiFlag = true;
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('vehicleDetailIGNUID',vehicleDetailIGNUID);
    myFormData.append('functionName', functionName == null ? '' : functionName);
    myFormData.append('wireColor', wireColor == null ? '' : wireColor);
    myFormData.append('wireLocation', wireLocation == null ? '' : wireLocation);
    myFormData.append('additionalNote', additionalNote == null ? '' : additionalNote);
    console.log("form:", myFormData);
    await this.httpClient.post<any>(this.apiURL + '/api/updatevehicledetailsinterlockpartbyid', myFormData)
    .subscribe(data => {
      $('#text').css('display', 'none');
      if (data.return_code == 0) {
        params.api.applyTransaction({ update: changedData });
        this.successMessage = 'Ign Interlock Guide Details Updated Successfully!';
        $('#info_success').css('display', 'block');
      }
      else{
        this.successMessage =data.errors[0];
        $('#info_alert').css('display', 'block');
    }
  });
  }

  close1(): void{
    this.apiFlag = false;
    if (this.clicked == true) {
      // this.location.back();
      this.clicked = false;
    }
  }

  cancelIgn(): void {
    this.apiFlag = false;
    if (this.clicked == true) {
      this.location.back();
      this.clicked = false;
    }
    $('#modalIGN').css('display', 'none');
  }

  back(): void {
    this.location.back();
  }

  submitForm(): void {  
    this.apiFlag = true;
    this.clicked = true;
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('vehicleDetailIGNUID', this.vehicleDetailIGNUID);
    //console.log("vehicleDetailNonPartUID :", this.vehicleDetailNonPartUID);
   /*  myFormData.append('searchSectionUID', this.form.value.sectionList); */
    myFormData.append('functionName', this.form.value.functionName == null ? '' : this.form.value.functionName);
    myFormData.append('wireColor', this.form.value.wireColor == null ? '' : this.form.value.wireColor);
    myFormData.append('wireLocation', this.form.value.wireLocation == null ? '' : this.form.value.wireLocation);
    myFormData.append('additionalNote', this.form.value.additionalNote == null ? '' : this.form.value.additionalNote);
    console.log("form:", myFormData);
    this.http.post<any>(this.apiURL + '/api/updatevehicledetailsinterlockpartbyid', myFormData)
    .subscribe(data => {
    document.getElementById('text').style.display = 'none';
    if (data.return_code == 0) {
      this.successMessage = 'Ign Interlock Guide Details Updated Successfully!';
      $('#modalIGN').css('display', 'none');
      document.getElementById('info_success').style.display = 'block';
      this.gridApi.refreshCells();
      this.clickEvent();
      setTimeout(() => {
        this.close1();
      }, this.redirectSecounds);
    }
    else {
      this.successMessage = data.errors[0];
      this.clicked = false;
      $('#modalIGN').css('display', 'none');
      document.getElementById('info_alert').style.display = 'block';
    }
  });
  }

  clickEditIGN(value):void{
    this.apiFlag = false;
    this.clicked = false;
     /* this.route.params.subscribe(params => {
     this.nonpart.vehicleDetailIGNUID = params['id'];
    }); */
    this.nonpart.vehicleDetailIGNUID = value;
    this.nonpart.userUID = localStorage.getItem('user_id');
     this.http.post<any>(this.apiURL + '/api/editvehicledetailsinterlockpart', this.nonpart)
     .subscribe(data => {
       console.log(data);
      this.form.patchValue({
        functionName: data.VehicleDetailsIGNPart
        .functionName,
        wireColor: data.VehicleDetailsIGNPart
        .wireColor,
        wireLocation: data.VehicleDetailsIGNPart
        .wireLocation,
        additionalNote: data.VehicleDetailsIGNPart.additionalNote
      });
       this.vehicleDetailIGNUID = data.VehicleDetailsIGNPart.vehicleDetailIGNUID;
    });
  }


}

