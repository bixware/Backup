import { Component, OnInit } from '@angular/core';
import { ClientSideRowModelModule} from '@ag-grid-community/client-side-row-model';
import { GridOptions } from "@ag-grid-community/core";
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BrandEditCellRendererComponent } from '../brand-edit-cell-renderer/brand-edit-cell-renderer.component';
import { BrandImageCellRendererComponent } from '../brand-image-cell-renderer/brand-image-cell-renderer.component'; 
import { StatictextComponent } from '../statictext/statictext.component';
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
declare var $: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-brandmaster',
  templateUrl: './brandmaster.component.html',
  styleUrls: ['./brandmaster.component.css']
})
export class BrandmasterComponent implements OnInit {
  apiURL: any;
  imgURL: any;
  redirectSecounds: any;
  public user = {
    brandUID: ''
  }
  public State = {
    StateUID: ''
  }
  public City = {
    StateUID: null,
    cityUID: null
  };
  form: FormGroup;
  addform: FormGroup;
  submitted = false;
  stateUID: any;
  states: any;
  cities: any;
  dummies: string;
  brandName: any;
  phone: any;
  techLine: any;
  webaddress: any;
  abvreation: any;
  brandImage: any;
  address: any;
  state: any;
  zip: any;
  public isActive = '';
  public userUID = '';
  public brandUID = '';
  successMessage: any;
  clicked: any;
  apiFlag: any;
  filedata: any;
  prevImage: any;
  public roleUID: any;
  public dummy = {
    ArchStatus: ''
  }
  searchValue: any;
  gridApi: any;
  gridColumnApi: any;
  gridOptions: any;
  frameworkComponents: any;
  modules = [ClientSideRowModelModule,CsvExportModule];
  columnDefs = [
    { headerName: 'Actions', field: 'brandUID', width: 100, sortable: false, filter: false,
    cellRenderer: 'brandEditCellRendererComponent',
    },
    { headerName: 'Brand Name', field: 'brandName', sortable: true, filter: 'agTextColumnFilter',
     floatingFilter: true},
    { headerName: 'Abbreviation', field: 'abvreation', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},    
    { headerName: 'Zip', field: 'zip', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
     { headerName: 'City', field: 'city', sortable: true, filter: 'agTextColumnFilter',
     floatingFilter: true},
    { headerName: 'State', field: 'state', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Address', field: 'address', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Phone', field: 'phone', sortable: true},
    { headerName: 'Tech Line', field: 'techLine', sortable: true},
    { headerName: 'Web Address', field: 'webaddress', sortable: true},
    { headerName: 'Brand Image', field: 'brandImage', sortable: true, tooltipField: 'brandImage',
    tooltipComponentParams: { color: '#ececec' }, tooltipComponent: 'brandImageCellRendererComponent',
     cellRenderer: 'statictextComponent' },
  ];
  rowData: any;
  tooltipShowDelay: any;
   constructor(private httpClient: HttpClient,private location: Location, private router: Router,private http: HttpClient, private route: ActivatedRoute, public fb: FormBuilder) {
    this.apiURL = environment.apiURL;
    this.gridOptions = <GridOptions>{
      context: {
          componentParent: this
      }
  };
  //editBrand
  this.imgURL = environment.imgURL;
  this.redirectSecounds = environment.redirectSecounds;
  this.form = this.fb.group({
    brandName: ['', Validators.required],
    phone: [''],
    techLine: [''],
    webaddress: ['', [Validators.pattern('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')]],
    abvreation: ['', [Validators.required]],
    address: [''],
    state: [''],
    city: [''],
    zip: [''],
    brandImage: ['']
  });
  //addbrand
  this.addform = this.fb.group({
    brandName: ['', Validators.required],
    phone: [''],
    techLine: [''],
    webaddress: ['', [ Validators.pattern('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')]],
    abvreation: ['', [Validators.required]],
    brandImage: [''],
    address: [''],
    state: [''],
    city: [''],
    zip: ['']

  });
 }
 get f(): any { return this.form.controls; }
 get a(): any { return this.addform.controls; }

  ngOnInit(): void {
    this.getState();
   this.tooltipShowDelay = 0;
    this.frameworkComponents = {
    brandEditCellRendererComponent: BrandEditCellRendererComponent,
    brandImageCellRendererComponent: BrandImageCellRendererComponent,
    statictextComponent: StatictextComponent
  }; 
  this.roleUID = localStorage.getItem('role_id');
  updatePageTitle('Brand Master');
  }
  
  clickEditBrand(value): void{
  //editBrand
  this.getState();
    this.apiFlag = false;
    this.clicked = false;
    this.filedata = '';
    this.user.brandUID = value;
    console.log(this.user);
    this.http.post<any>(this.apiURL + '/api/editbrand/' + this.user.brandUID, this.user)
      .subscribe(data => {
        console.log(data);
        if (data.return_code == 0) {
          this.form.patchValue({
            brandName: data.brandDetails.brandName,
            phone: data.brandDetails.phone,
            techLine: data.brandDetails.techLine,
            webaddress: data.brandDetails.webaddress,
            abvreation: data.brandDetails.abvreation,
            address: data.brandDetails.address,
            zip: data.brandDetails.zip
          });
          this.isActive = data.brandDetails.isActive;
          this.brandUID = data.brandDetails.brandUID;
          this.form.get('state').patchValue(data.brandDetails.StateUID);
          this.getCityDynamic(data.brandDetails.StateUID);
          this.form.get('city').patchValue(data.brandDetails.cityUID);
          if (data.brandDetails.brandImage != null) {
            this.prevImage = this.imgURL + '/storage/app/public/uploads/brand/' + data.brandDetails.brandImage;
          }
        }
      });
} 
onGridReady(params): void {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
  this.dummy.ArchStatus = '0';
  this.httpClient.post<any>(this.apiURL + '/api/getbrand', this.dummy)
        .subscribe(data => {
        this.rowData = (data as any).brandDetails;
        
  });
}
clickEvent(): void {
  if($('#archive').prop('checked')){
    this.dummy.ArchStatus = '1';
  }
  else{
    this.dummy.ArchStatus = '0';
  }
    this.httpClient.post<any>(this.apiURL + '/api/getbrand', this.dummy)
    .subscribe(data => {
        this.rowData = (data as any).brandDetails;
        this.gridApi.setRowData(this.rowData); 
     });
 }
//edit brand
 getState(): void {
  this.dummies = '';
  this.http.post<any>(this.apiURL + '/api/getallstates', this.dummies)
    .subscribe(data => {
      this.states = data;
      console.log(this.states)
    });
}

getCity(e): void {
  this.State.StateUID = e.target.value;
  this.City.StateUID = e.target.value;
  this.http.post<any>(this.apiURL + '/api/getcitybystate', this.State)
    .subscribe(data => {
      if (data.return_code == 0) {
        this.cities = (data as any).countyList;
        console.log(this.cities)
      }
    });
}

getCityDynamic(val): void {
  this.State.StateUID = val;
  this.http.post<any>(this.apiURL + '/api/getcitybystate', this.State)
    .subscribe(data => {
      if (data.return_code == 0) {
      this.cities = (data as any).countyList;
      }
    });
}
 cancelEdit(): void {
  $('#modalEditbrand').css('display', 'none');
  /* this.apiFlag = false;
  if (this.clicked == true) {
    this.clicked = false;
  } */
}

cancel():void{
  this.apiFlag = false;
  this.clickEvent();
  this.form.reset();
  this.submitted = false;
  $('#modalAddbrand').css('display', 'none');

}
 onBtnExport() {
  this.gridApi.exportDataAsCsv(); 
}

fileEvent(e): void {
  this.filedata = e.target.files[0];
}

close1(): void {
  this.apiFlag = false;
  this.cancel();
  this.cancelEdit();
 /*  if (this.clicked == true) {
    this.location.back();
    this.clicked = false;
  } */
}

back(): void {
  this.location.back();
}

EditBrand(): void {
  this.submitted = true;
  if (this.form.invalid) {
    return;
  }
  this.apiFlag = true;
  this.clicked = true;
  const myFormData = new FormData();
  myFormData.append('userUID', localStorage.getItem('user_id'));
  myFormData.append('brandUID', this.brandUID);
  myFormData.append('brandName', this.form.value.brandName);
  myFormData.append('phone', this.form.value.phone);
  myFormData.append('techLine', this.form.value.techLine);
  myFormData.append('webaddress', this.form.value.webaddress);
  myFormData.append('abvreation', this.form.value.abvreation);
  myFormData.append('brandImage', this.filedata);
  myFormData.append('address', this.form.value.address);
  myFormData.append('state', this.form.value.state);
  myFormData.append('city', this.form.value.city);
  myFormData.append('zip', this.form.value.zip);
  console.log(this.form);
  console.log(this.filedata);
  this.httpClient.post<any>(this.apiURL + '/api/updatebrand', myFormData)
    .subscribe(data => {
      document.getElementById('text').style.display = 'none';
      if (data.return_code == 0) {
        this.successMessage = 'Brand Edited Successfully !';
        $('#modalEditbrand').css('display', 'none');
        document.getElementById('info_success').style.display = 'block';
        this.gridApi.refreshCells();
        this.clickEvent();
        setTimeout(() => {
          this.apiFlag = false;
          this.close1();
        }, this.redirectSecounds);
      }
      else {
        this.successMessage = data.errors[0];
        this.clicked = false;
        $('#modalEditbrand').css('display', 'none');
        document.getElementById('info_alert').style.display = 'block';
      }
    });
}

//Add brand
addBrandModal(): void{
  this.addform.reset();
  $('#modalAddbrand').css('display', 'block');
}



addBrand(): void {
  this.submitted = true;
  console.log(this.addform);
  if (this.addform.invalid) {
    return;
  }
  this.apiFlag = true;
  this.clicked = true;
  const myFormData = new FormData();
  myFormData.append('userUID', localStorage.getItem('user_id'));
  myFormData.append('brandName', this.addform.value.brandName);
  myFormData.append('phone', this.addform.value.phone);
  myFormData.append('techLine', this.addform.value.techLine);
  myFormData.append('webaddress', this.addform.value.webaddress);
  myFormData.append('abvreation', this.addform.value.abvreation);
  myFormData.append('brandImage', this.filedata);
  myFormData.append('address', this.addform.value.address);
  myFormData.append('state', this.addform.value.state);
  myFormData.append('city', this.addform.value.city);
  myFormData.append('zip', this.addform.value.zip);
  this.http.post<any>(this.apiURL + '/api/addbrand', myFormData)
    .subscribe(data => {
      document.getElementById('text').style.display = 'none';
      if (data.return_code == 0) {
        this.successMessage = 'Brand Added Successfully !';
        $('#modalAddbrand').css('display', 'none');
        document.getElementById('info_success').style.display = 'block';
        this.clickEvent();
        setTimeout(() => {
          this.close1();
        }, this.redirectSecounds);
      }
      else {
        this.successMessage = data.errors[0];
        this.clicked = false;
        $('#modalAddbrand').css('display', 'none');
        document.getElementById('info_alert').style.display = 'block';
      }
    });
}

quickSearch(): void {
  this.gridApi.setQuickFilter(this.searchValue);
} 
}
