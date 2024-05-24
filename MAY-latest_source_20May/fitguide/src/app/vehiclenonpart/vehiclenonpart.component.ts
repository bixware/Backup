import { Component, OnInit } from '@angular/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { environment } from 'src/environments/environment';
import { GridOptions } from "@ag-grid-community/core";
import { CellValueChangedEvent} from '@ag-grid-community/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { VehicleNonpartActiveCellRendererComponent } from '../vehicle-nonpart-active-cell-renderer/vehicle-nonpart-active-cell-renderer.component';
declare var $: any;
declare var hideSearchText: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-vehiclenonpart',
  templateUrl: './vehiclenonpart.component.html',
  styleUrls: ['./vehiclenonpart.component.scss']
})
export class VehiclenonpartComponent implements OnInit {
  apiURL: any;
  searchValue: any;
  gridApi: any;
  gridOptions: any;
  public user = {
    userUID: ''
  };
  redirectSecounds: any;
  sections: any;
  sectionList: string;
  form: FormGroup;
  clicked: any;
  public nonpart = {
    vehicleDetailNonPartUID : '',
    userUID: ''
  };
  updateNonPartDetails = {
    userUID: "",
    searchSectionUID: "",
    vehicleDetailNonPartUID: "",
    vehicleNonPartDetails: []
  }
  vehicleDetailNonPartUID: any;
  public overlayLoadingTemplate = '<span class="ag-overlay-loading-center">Loading</span>';
  public dummy = {
    userUID: '',
    ArchStatus: ''
  }
  gridColumnApi: any;
  frameworkComponents: any;
  apiFlag: any;
  successMessage: any;
  modules = [ClientSideRowModelModule];
  columnDefs = [
    { headerName: 'Actions', field: 'vehicleDetailNonPartUID', width: 200, sortable: false, filter: false,
    cellRenderer: 'vehicleNonpartActiveCellRendererComponent',
    },
    { headerName: 'Section Name', field: 'searchSectionName', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true },
    { headerName: 'Part Display Header', field: 'partDisplayHeader', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true,editable: true },
    { headerName: '1SpeakerSize', field: 'partValue1', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true,editable: true},
    { headerName: '1SpeakerLocation', field: 'partValue2', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true,editable: true},
    { headerName: '2SpeakerSize', field: 'partValue3', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true,editable: true},
    { headerName: '2SpeakerLocation', field: 'partValue4', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true,editable: true},
    { headerName: '3SpeakerSize', field: 'partValue5', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true,editable: true},
    { headerName: '3SpeakerLocation', field: 'partValue6', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true,editable: true},
    { headerName: '1DisplayNote', field: 'partValue7', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true,editable: true},
    { headerName: '2DisplayNote', field: 'partValue8', sortable: true, filter: 'agTextColumnFilter',
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
  constructor(private http: HttpClient,private httpClient: HttpClient, private router: Router, public fb: FormBuilder, private location: Location) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.form = this.fb.group({
      sectionList: [''],
      displayHeader : [''],
      value1 : [''],
      value2 : [''],
      value3 : [''],
      value4 : [''],
      value5 : [''],
      value6 : [''],
      value7 : [''],
      value8 : [''],
     
    });
    this.gridOptions = <GridOptions>{
      context: {
          componentParent: this
      }
  };
  }

  addNonpartModal(): void{
    $('#modalNonpart').css('display', 'block');
  }

  ngOnInit(): void {
    this.getSection();
     /* this.route.params.subscribe(params => {
     this.nonpart.vehicleDetailNonPartUID = params['id'];
    }); */
    //hideSearchText();
    this.frameworkComponents = {
      vehicleNonpartActiveCellRendererComponent: VehicleNonpartActiveCellRendererComponent
    };
    updatePageTitle('Vehicle Nonpart');
  }

  get f(): any { return this.form.controls; }

  clickEditNonpart(value): void {
    console.log(value);
    this.apiFlag = false;
    this.clicked = false;
    this.nonpart.vehicleDetailNonPartUID = value;
    this.nonpart.userUID = localStorage.getItem('user_id');
     this.http.post<any>(this.apiURL + '/api/editvehicledetailsnonpart', this.nonpart)
     .subscribe(data => {
      console.log(data);
      this.form.patchValue({
        sectionList: data.VehicleDetailsNonPart[0].searchSectionUID,
        displayHeader: data.VehicleDetailsNonPart[0].partDisplayHeader,
        value1: data.VehicleDetailsNonPart[0].partValue1,
        value2: data.VehicleDetailsNonPart[0].partValue2,
        value3: data.VehicleDetailsNonPart[0].partValue3,
        value4: data.VehicleDetailsNonPart[0].partValue4,
        value5: data.VehicleDetailsNonPart[0].partValue5,
        value6: data.VehicleDetailsNonPart[0].partValue6,
        value7: data.VehicleDetailsNonPart[0].partValue7,
        value8: data.VehicleDetailsNonPart[0].partValue8
      });
      this.vehicleDetailNonPartUID = this.nonpart.vehicleDetailNonPartUID;
    });
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.user.userUID = localStorage.getItem('user_id');
    this.dummy.ArchStatus = '0';
    this.http.post<any>(this.apiURL + '/api/getvehicledetailsnonpart', this.user)
         .subscribe(data => {
          this.rowData = (data as any).VehicleDetailsNonPart;
    //  console.log('rowData',this.rowData);
    });
  }

  clickEvent(): void {
    if($('#archive').prop('checked')){
      this.dummy.ArchStatus = '1';
    }
    else{
      this.dummy.ArchStatus = '0';
    }
    //this.gridApi.showLoadingOverlay();
    this.dummy.userUID = localStorage.getItem('user_id');
    this.httpClient.post<any>(this.apiURL + '/api/getvehicledetailsnonpart', this.dummy)
      .subscribe(data => {
          this.rowData = (data as any).VehicleDetailsNonPart;
         /*  console.log('rowData',this.rowData); */
          this.gridApi.setRowData(this.rowData);
          this.gridApi.hideOverlay();
    });
   }

  quickSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  async onCellValueChanged(params: CellValueChangedEvent) {
    var changedData = [params.data];
    
    
    const userUID=localStorage.getItem('user_id');
    const vehicleDetailNonPartUID=changedData[0].vehicleDetailNonPartUID;
    const searchSectionUID=changedData[0].searchSectionUID;
    const partDisplayHeader=changedData[0].partDisplayHeader;
    const partValue1=changedData[0].partValue1;
    const partValue2=changedData[0].partValue2;
    const partValue3=changedData[0].partValue3;
    const partValue4=changedData[0].partValue4;
    const partValue5=changedData[0].partValue5;
    const partValue6=changedData[0].partValue6;
    const partValue7=changedData[0].partValue7;
    const partValue8=changedData[0].partValue8;

    this.apiFlag = true;
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('vehicleDetailNonPartUID',vehicleDetailNonPartUID);
    myFormData.append('searchSectionUID',searchSectionUID);
    myFormData.append('partDisplayHeader', partDisplayHeader == null ? '' : partDisplayHeader);
    myFormData.append('value1', partValue1 == null ? '' : partValue1);
    myFormData.append('value2', partValue2 == null ? '' : partValue2);
    myFormData.append('value3', partValue3 == null ? '' : partValue3);
    myFormData.append('value4', partValue4 == null ? '' : partValue4);
    myFormData.append('value5', partValue5 == null ? '' : partValue5);
    myFormData.append('value6', partValue6 == null ? '' : partValue6);
    myFormData.append('value7', partValue7 == null ? '' : partValue7);
    myFormData.append('value8', partValue8 == null ? '' : partValue8);
    /* console.log("form:", myFormData); */
    await this.httpClient.post<any>(this.apiURL + '/api/updatevehicledetailsnonpartbyid', myFormData)
    .subscribe(data => {
      $('#text').css('display', 'none');
      if (data.return_code == 0) {
        params.api.applyTransaction({ update: changedData });
        this.successMessage = 'Vehicle Non Part Details Updated Successfully!';
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
      this.clicked = false;
    } 
    $('#modalNonpart').css('display', 'none');
  }

  

  /*getSection(): void {
    this.http.get<any>(this.apiURL + '/api/getsections')
      .subscribe(data => {
        this.sections = (data as any).searchSections;
      });
  }*/

  getSection(): void {
    this.http.get<any>(this.apiURL + '/api/getsections')
      .subscribe(data => {
        let arrayofsection = []
        const Sectionselect = data.searchSections.find(q => q.searchSectionUID === 2)
        arrayofsection.push(Sectionselect)
        this.sections = arrayofsection
      });
  }

  getOptionSection(e): void {
    this.sectionList = e.target.value;
  }

  back(): void {
    this.location.back();
  }

  submitForm(): void {  
    this.apiFlag = true;
    this.clicked = true;
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('vehicleDetailNonPartUID', this.vehicleDetailNonPartUID);
    console.log("vehicleDetailNonPartUID :", this.vehicleDetailNonPartUID);
    myFormData.append('searchSectionUID', this.form.value.sectionList);
    myFormData.append('partDisplayHeader', this.form.value.displayHeader == null ? '' : this.form.value.displayHeader);
    myFormData.append('value1', this.form.value.value1 == null ? '' : this.form.value.value1);
    myFormData.append('value2', this.form.value.value2 == null ? '' : this.form.value.value2);
    myFormData.append('value3', this.form.value.value3 == null ? '' : this.form.value.value3);
    myFormData.append('value4', this.form.value.value4 == null ? '' : this.form.value.value4);
    myFormData.append('value5', this.form.value.value5 == null ? '' : this.form.value.value5);
    myFormData.append('value6', this.form.value.value6 == null ? '' : this.form.value.value6);
    myFormData.append('value7', this.form.value.value7 == null ? '' : this.form.value.value7);
    myFormData.append('value8', this.form.value.value8 == null ? '' : this.form.value.value8);
    console.log("form:", myFormData);
    this.http.post<any>(this.apiURL + '/api/updatevehicledetailsnonpartbyid', myFormData)
    .subscribe(data => {
      document.getElementById('text').style.display = 'none';
    if (data.return_code == 0) {
      
      //$('#text').css('display', 'none');
      this.successMessage = 'Vehicle Non Part Details Updated Successfully!';
      //document.getElementById('info_success').style.display = 'block';      
      $('#modalNonpart').css('display', 'none');
      $('#info_success').css('display', 'block');
      //this.gridApi.refreshCells();
      this.clickEvent();
      setTimeout(() => {
        this.close1();
      }, this.redirectSecounds);
    }
    else {
      this.successMessage = data.errors[0];
      this.clicked = false;
      //document.getElementById('info_alert').style.display = 'block';
      $('#info_alert').css('display', 'block');
    }
  });
  }

  cancelNonpart(): void{
    this.apiFlag = false;
    if (this.clicked == true) {
      this.clicked = false;
    }
    $('#modalNonpart').css('display', 'none');
  }


}

