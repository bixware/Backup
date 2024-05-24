import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
/* import { EditCellRendererComponent } from '../edit-cell-renderer/edit-cell-renderer.component';
import { StoreYesNoRendererComponent } from '../store-yes-no-renderer/store-yes-no-renderer.component'; */
import { GridOptions } from "@ag-grid-community/core";
import { VehicleEditCellRendererComponent } from '../vehicle-edit-cell-renderer/vehicle-edit-cell-renderer.component';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Location } from '@angular/common';
//declare var hideSearchText: any;
declare var updatePageTitle: any;
declare var $: any;
@Component({
  selector: 'app-vehiclemaster',
  templateUrl: './vehiclemaster.component.html',
  styleUrls: ['./vehiclemaster.component.css']
})
export class VehiclemasterComponent implements OnInit {
  @Input() public bannerUID;
  @Input() public AGgridRowIndex;
  @Output() removedAGgridRowIndex = new EventEmitter<any>();
  mydate: any;
  apiURL: any;
  imgURL: any;
  searchValue: any;
  gridApi: any;
  gridColumnApi: any;
  frameworkComponents: any;
  public dummy = {
    userUID: '',
    ArchStatus: ''
  };
  deletedata ={
    vehicleUID: []
  };
  public vehicleUID = '';
  gridOptions: any;
  modules = [ClientSideRowModelModule];
  redirectSecounds: any;
  form: FormGroup;
  editform: FormGroup;
  duplicateform: FormGroup;
  filedata: any;
  submitted = false;
  // dummy: any;
  // years: any;
  clicked: any;
  apiFlag: any;
  successMessage: any;
  UserStamp: any;
  public edit = {
    vehicleUID: ''
  };
  roleUID: any;
  userUID: any;
  prevImage: any;
  countries: any;
  userCountryChecked: any = [];
  countryDetails: any = [];
  isCountryChecked = false;
  showButton1 : any;
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
  updateString = {
    userUID: '',
    vehicleUID:'',
    Make:'',
    Model:'',
    Year:'',
    Option1:'',
    VehicleVersion:'',
    fromto:'',
    Option2:'',
    Option3:'',
    Option4:'',
    Option5:'',
    Option6:'',
    RSfromto:'',
    Audiofromto:'',
    YearTransition1_2:''
  }
  
  rowData: any;
  public rowSelection: 'single' | 'multiple' = 'multiple';
  // params: any;
  constructor(private httpClient: HttpClient, private router: Router, private location: Location, public fb: FormBuilder) {

    let isSuperAdminOrNot = false;
    isSuperAdminOrNot = localStorage.getItem("role_id") === "1";

    this.columnDefs = [
    {
      headerName: 'Select Vehicle', width: 120, sortable: true, checkboxSelection: true 
    },
    {
      headerName: 'Actions', field: 'vehicleUID', width: 250, sortable: false, filter: false,
      cellRenderer: 'vehicleEditCellRendererComponent',
    },
    {
      headerName: 'Make', field: 'Make', editable: isSuperAdminOrNot, sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true
    },
    {
      headerName: 'Model', field: 'Model', editable: isSuperAdminOrNot, sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true
    },
    {
      headerName: 'Year', field: 'Year', editable: isSuperAdminOrNot, sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true
    },
    {
      headerName: 'Option1', field: 'Option1', editable: isSuperAdminOrNot, sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true
    },
    {
      headerName: 'Option2', field: 'Option2', editable: isSuperAdminOrNot, sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true
    },
    { headerName: 'Option3', field: 'Option3', editable: isSuperAdminOrNot, sortable: true, filter: true },
    { headerName: 'Option4', field: 'Option4', editable: isSuperAdminOrNot, sortable: true, filter: true },
    { headerName: 'Option5', field: 'Option5', editable: isSuperAdminOrNot, sortable: true, filter: true },
    { headerName: 'Option6', field: 'Option6', editable: isSuperAdminOrNot, sortable: true, filter: true },
    { headerName: 'Vehicle Version', field: 'VehicleVersion', editable: isSuperAdminOrNot, sortable: true, filter: true },
    { headerName: 'From To', field: 'fromto', editable: isSuperAdminOrNot, sortable: true, filter: true },
    /* { headerName: 'Transition Year 12year', field: 'TransitionYear12year', sortable: true, filter: true },
    { headerName: 'Transition Year 12year_2', field: 'TransitionYear12year_2', sortable: true, filter: true }, */
    { headerName: 'RS From To', field: 'RSfromto', editable: isSuperAdminOrNot, sortable: true, filter: true },
    { headerName: 'Audio From To', field: 'Audiofromto', editable: isSuperAdminOrNot, sortable: true, filter: true },
    { headerName: '1/2 Year Transition', field: 'YearTransition1_2', editable: isSuperAdminOrNot, sortable: true, filter: true }
    // { headerName: 'Is Active', field: 'isActive', sortable: true, filter: true,  cellRenderer: 'storeYesNoRendererComponent' },
  ];
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
    this.redirectSecounds = environment.redirectSecounds;
    this.form = this.fb.group({
      Make: ['', Validators.required],
      Model: ['', Validators.required],
      Year: ['', [Validators.required, YearValidator]],
      Option1: ['', Validators.required],
      Option2: [''],
      Option3: [''],
      Option4: [''],
      Option5: [''],
      Option6: [''],
      VehicleVersion: ['', Validators.required],
      fromto: ['', Validators.required],
      /* TransitionYear12year: [''],
      TransitionYear12year_2: [''], */
      RSfromto: [''],
      Audiofromto: [''],
      Transitionyear: [''],
      vehicleImage: [''],
      countryUID: this.fb.array([], [Validators.required])
    });
    this.editform = this.fb.group({
      Make: ['', Validators.required],
      Model: ['', Validators.required],
      Year: ['', [Validators.required, YearValidator]],
      Option1: ['', Validators.required],
      Option2: [''],
      Option3: [''],
      Option4: [''],
      Option5: [''],
      Option6: [''],
      VehicleVersion: [''],
      fromto: ['', Validators.required],
      /* TransitionYear12year: [''],
      TransitionYear12year_2: [''], */
      RSfromto: [''],
      Audiofromto: [''],
      Transitionyear: [''],
      vehicleImage: [''],
      isActive: [''],
      countryUID: this.fb.array([], [Validators.required])
    });
    this.duplicateform = this.fb.group({
      Make: ['', Validators.required],
      Model: ['', Validators.required],
      Year: ['', [Validators.required, YearValidator]],
      Option1: ['', Validators.required],
      Option2: [''],
      Option3: [''],
      Option4: [''],
      Option5: [''],
      Option6: [''],
      VehicleVersion: [''],
      fromto: ['', Validators.required],
      /* TransitionYear12year: [''],
      TransitionYear12year_2: [''], */
      RSfromto: [''],
      Audiofromto: [''],
      Transitionyear: [''],
      vehicleImage: [''],
      isActive: [''],
      countryUID: this.fb.array([], [Validators.required])
    });
  }

  get f(): any { return this.form.controls; }
  get e(): any { return this.editform.controls; }
  get d(): any { return this.duplicateform.controls; }

  ngOnInit(): void {
    //hideSearchText();
    this.filedata = '';
    this.frameworkComponents = {
      vehicleEditCellRendererComponent: VehicleEditCellRendererComponent,
    };
    // this.getYear();
    //this.form.get('UserStamp').patchValue(Date.now());
    this.roleUID = localStorage.getItem('role_id');
    this.userUID = localStorage.getItem('user_id');
    updatePageTitle('Vehicle Master');
    this.showButton1 = false;
    this.getOptionCountry();
  }

 

  get countrieseditFormArray(): FormArray {
    return this.editform.get('countryUID') as FormArray;
  }

  get countriesaddFormArray(): FormArray {
    return this.form.get('countryUID') as FormArray;
  }

  get countriesduplicateFormArray(): FormArray {
    return this.duplicateform.get('countryUID') as FormArray;
  }

  addCountryAddGroup(): FormGroup {
    return this.fb.group({
      country: ['']
    });
  }

 /*  selectCheckBox(): void {
    console.log(this.countrieseditFormArray.value)
    if (this.countryDetails && this.countryDetails.length > 0) {
      this.countries.forEach((item) => {item.checked = false;})
      this.countryDetails.forEach((country) => {
        const data =  this.countries.find((c) => c.countryUID === country.countryUID)
        if (data) {
          this.countries.forEach(
            (item, i) => {
              if (item.countryUID === data.countryUID)
                item.checked = true;
            })
        }
      })
      console.log(this.countries);
    }
    else {
      for (let i = 0; i < this.countries.length; i++) {
        this.countries[i].checked = false;
      }
    }

  } */
  clickDeleteArchive(value): void {
    this.AGgridRowIndex = value.rowIndex;
    this.vehicleUID = value.value;
    console.log(this.AGgridRowIndex);
    console.log(this.bannerUID);
  }

  refreshGrid(){
    this.removedAGgridRowIndex.emit(this.AGgridRowIndex);    
  }

  deleteArchive():void{
    this.apiFlag = true;
    this.clicked = true;
    this.httpClient.post<any>(this.apiURL + '/api/archivevehicledelete',
    {
      vehicleUID: this.vehicleUID
    })
    .subscribe(data => {
      if (data.return_code == 0) {
        this.successMessage = 'Archive Part Details Deleted Successfully !';
        this.removedAGgridRowIndex.emit(this.AGgridRowIndex);    
        $('#modalDeleteArchive').css('display', 'none');
        document.getElementById('info_success').style.display = 'block';
        this.gridApi.refreshCells();
        this.refreshGrid();
        setTimeout(() => {
        this.apiFlag = false;
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

  editCountries() {
    this.countrieseditFormArray.controls = [];
    this.countries.forEach(
      (item) => {
        const data = this.countryDetails.find((country) => country.countryUID === item.countryUID)
        if (data)
       {   this.countrieseditFormArray.push(new FormControl(true))
          return;}
        else
          this.countrieseditFormArray.push(new FormControl(false))
      }
    );
  }

  duplicateCountries() {
    this.countriesduplicateFormArray.controls = [];
    this.countries.forEach(
      (item) => {
        const data = this.countryDetails.find((country) => country.countryUID === item.countryUID)
        if (data)
     {     this.countriesduplicateFormArray.push(new FormControl(true))
          return}
        else
          this.countriesduplicateFormArray.push(new FormControl(false))
      }
    );
  }

  addCountries() {
    this.countries.forEach(
      (item) => {
        this.countriesaddFormArray.push(new FormControl(false))
      }
    );
  }

  getOptionCountry(): void {
    this.httpClient.post<any>(this.apiURL + '/api/getvehiclecountrylist', '')
      .subscribe(data => {
        this.countries = (data as any);
        this.addOptions();
      });
  }

  addOptions(): void {
    for (let i = 0; i < this.countries.length; i++) {
      //this.countriesaddFormArray.push(this.addCountryAddGroup());
      this.countriesaddFormArray.push(new FormControl(false));
      this.countrieseditFormArray.push(new FormControl(false));
      this.countriesduplicateFormArray.push(new FormControl(false));
    }
  }

  onCheckboxChange(country, event) {
    const checkedArray = this.countriesaddFormArray.value
          .map((checked, i) => (checked ? this.countries[i].countryUID : null))
          .filter(value => !!value);
        if (checkedArray.length > 0 && this.isCountryChecked === true)
          this.isCountryChecked = false;
        this.getvehicleVersion();
        return
  }
    
  

  onCheckboxduplicateChange(country, event) {
    const checkedArray = this.countriesduplicateFormArray.value
    .map((checked, i) => (checked ? this.countries[i].countryUID : null))
    .filter(value => !!value);
  if (checkedArray.length > 0 && this.isCountryChecked === true)
    this.isCountryChecked = false;
    this.getvehicleVersionduplicate();
    return
  }

  onCheckboxeditChange(country, event) {
    const checkedArray = this.countrieseditFormArray.value
    .map((checked, i) => (checked ? this.countries[i].countryUID : null))
    .filter(value => !!value);
  if (checkedArray.length > 0 && this.isCountryChecked === true)
    this.isCountryChecked = false;
    this.getvehicleVersionedit();
    return
  }

  clickEditVehicle(value): void {
    this.apiFlag = false;
    this.clicked = false;
    /* this.route.params.subscribe(params => {
      this.edit.vehicleUID = params['id'];
    }); */
    this.edit.vehicleUID = value;
    console.log(this.edit);
    this.httpClient.post<any>(this.apiURL + '/api/editvehicle/' + this.edit.vehicleUID, this.edit)
      .subscribe(data => {
        console.log(data);
        this.editform.patchValue({
          Make: data.vehicleDetails.Make,
          Model: data.vehicleDetails.Model,
          Year: data.vehicleDetails.Year,
          Option1: data.vehicleDetails.Option1,
          Option2: data.vehicleDetails.Option2,
          Option3: data.vehicleDetails.Option3,
          Option4: data.vehicleDetails.Option4,
          Option5: data.vehicleDetails.Option5,
          Option6: data.vehicleDetails.Option6,
          VehicleVersion: data.vehicleDetails.VehicleVersion,
          fromto: data.vehicleDetails.fromto,
          /* TransitionYear12year: data.vehicleDetails.TransitionYear12year,
          TransitionYear12year_2: data.vehicleDetails.TransitionYear12year_2, */
          RSfromto: data.vehicleDetails.RSfromto != "null" ? data.vehicleDetails.RSfromto : '',
          Audiofromto: data.vehicleDetails.Audiofromto != "null" ? data.vehicleDetails.Audiofromto : '',
          Transitionyear: data.vehicleDetails.YearTransition1_2 != "null" ? data.vehicleDetails.YearTransition1_2 : '',
          isActive: data.vehicleDetails.isActive
        });
        this.countryDetails = data.countryDetails;
        //this.getOptionCountry();
        this.editCountries();
        this.UserStamp = data.vehicleDetails.UserStamp;
        if (data.vehicleDetails.vehicleImage != null) {
          this.prevImage = this.imgURL + 'storage/app/public/uploads/vehicle/' + data.vehicleDetails.vehicleImage;
        }
      });
  }

  clickDuplicateVehicle(value): void {
    this.apiFlag = false;
    this.clicked = false;
    this.edit.vehicleUID = value;
    this.httpClient.post<any>(this.apiURL + '/api/duplicatevechile/' + this.edit.vehicleUID, this.edit)
      .subscribe(data => {
        console.log(data);
        this.duplicateform.patchValue({
          Make: data.vehicleDetails.Make,
          Model: data.vehicleDetails.Model,
          Year: data.vehicleDetails.Year,
          Option1: data.vehicleDetails.Option1,
          Option2: data.vehicleDetails.Option2,
          Option3: data.vehicleDetails.Option3,
          Option4: data.vehicleDetails.Option4,
          Option5: data.vehicleDetails.Option5,
          Option6: data.vehicleDetails.Option6,
          VehicleVersion: data.vehicleDetails.VehicleVersion,
          fromto: data.vehicleDetails.fromto,
          /*  TransitionYear12year: data.vehicleDetails.TransitionYear12year,
           TransitionYear12year_2: data.vehicleDetails.TransitionYear12year_2 */
          RSfromto: data.vehicleDetails.RSfromto != "null" ? data.vehicleDetails.RSfromto : '',
          Audiofromto: data.vehicleDetails.Audiofromto != "null" ? data.vehicleDetails.Audiofromto : '',
          Transitionyear: data.vehicleDetails.YearTransition1_2 != "null" ? data.vehicleDetails.YearTransition1_2 : '',
        });
        this.countryDetails = data.countryDetails;
      //  this.getOptionCountry();
        this.duplicateCountries();
        this.UserStamp = data.vehicleDetails.UserStamp;
        if (data.vehicleDetails.vehicleImage != null) {
          this.prevImage = this.imgURL + '/storage/app/public/uploads/vehicle/' + data.vehicleDetails.vehicleImage;
        }
      });
  }

  bulkarchivedelete(): void{
    //this.delete.partUID = this.partUID;
    const checkboxId = this.gridApi.getSelectedRows();
      const checkboxId1 = Array();
      checkboxId.forEach(element => {
        checkboxId1.push(element.vehicleUID);
      });
      this.deletedata.vehicleUID = checkboxId1;
      this.httpClient.post<any>(this.apiURL + '/api/deletebulkarchivevehicle', this.deletedata)
      .subscribe(data => {
        /* this.rowData = (data as any).partDetails;
        this.gridApi.setRowData(this.rowData); 
        this.gridApi.hideOverlay(); */
        this.clickEvent();
     });
   }

  onSelectionChanged(): void {
    if(this.gridApi.getSelectedRows().length  > 1 && this.dummy.ArchStatus == '1'){
      this.showButton1 = true;
      //console.log('test');
    } else {
      this.showButton1 = false;
    }
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    //this.dummy.userUID = localStorage.getItem('user_id');
    this.dummy.ArchStatus = '0';
    this.httpClient.post<any>(this.apiURL + '/api/getvehicles', this.dummy)
      .subscribe(data => {
        if (data.return_code == 0) {
          this.rowData = (data as any).vehicleDetails;
          console.log(this.rowData);
          this.submitted = false;
        }
        else{
          this.rowData = [];
        }
      });
  }

  back(): void {
    this.location.back();
  }

  close1(): void {
    this.apiFlag = false;
    if (this.clicked == true) {
      this.clicked = false;
    }
    //this.form.reset();
    this.cancel();
  }

  close2(): void {
    $('#info_archive').hide();
    $('#archive_error').hide();
    this.showButton1 = false;
  }

  cancel():void{
    $('#modalAdd').css('display', 'none');
    $('#modalDeleteArchive').css('display', 'none');
    this.apiFlag = false;
    this.clickEvent();
    this.form.reset();
    this.editform.reset();
    this.duplicateform.reset();
    this.submitted = false;
  }


  fileEvent(e): void {
    this.filedata = e.target.files[0];
  }

  addVehicleModal(): void {
    this.form.reset();
    $('#modalAdd').css('display', 'block');
   // this.getOptionCountry();
  }

  getvehicleVersion(): void {
    let vehicle_version = '';
    vehicle_version = this.form.value.Make != null ? this.form.value.Make : '';
    vehicle_version += this.form.value.Model != null ? ' ' + this.form.value.Model : '';
    vehicle_version += this.form.value.Year != null ? ' ' + this.form.value.Year : '';
    vehicle_version += this.form.value.Option1 != null ? ' ' + this.form.value.Option1 : '';
    vehicle_version += this.form.value.Option2 != null ? ' ' + this.form.value.Option2 : '';
    vehicle_version += this.form.value.Option3 != null ? ' ' + this.form.value.Option3 : '';
    vehicle_version += this.form.value.Option4 != null ? ' ' + this.form.value.Option4 : '';
    vehicle_version += this.form.value.Option5 != null ? ' ' + this.form.value.Option5 : '';
    vehicle_version += this.form.value.Option6 != null ? ' ' + this.form.value.Option6 : '';
    const checkedCountries = this.countriesaddFormArray.value
      .map((checked, i) => (checked ? this.countries[i].countryName : null))
      .filter(value => !!value);
    if (checkedCountries && checkedCountries.length >= 1)
      checkedCountries.map((country) => {
        vehicle_version += country != null ? ' ' + country : '';
      })
    console.log(checkedCountries);
    this.form.get('VehicleVersion').patchValue(vehicle_version);
  }

  getvehicleVersionedit(): void {
    let vehicle_version = '';
    vehicle_version = this.editform.value.Make != null ? this.editform.value.Make : '';
    vehicle_version += this.editform.value.Model != null ? ' ' + this.editform.value.Model : '';
    vehicle_version += this.editform.value.Year != null ? ' ' + this.editform.value.Year : '';
    vehicle_version += this.editform.value.Option1 != null ? ' ' + this.editform.value.Option1 : '';
    vehicle_version += this.editform.value.Option2 != null ? ' ' + this.editform.value.Option2 : '';
    vehicle_version += this.editform.value.Option3 != null ? ' ' + this.editform.value.Option3 : '';
    vehicle_version += this.editform.value.Option4 != null ? ' ' + this.editform.value.Option4 : '';
    vehicle_version += this.editform.value.Option5 != null ? ' ' + this.editform.value.Option5 : '';
    vehicle_version += this.editform.value.Option6 != null ? ' ' + this.editform.value.Option6 : '';
    const checkedCountries = this.countrieseditFormArray.value
    .map((checked, i) => (checked ? this.countries[i].countryName : null))
    .filter(value => !!value);
    if(checkedCountries&& checkedCountries.length>=1)
    checkedCountries.map((country)=>{
      vehicle_version += country != null ? ' ' + country : ''; 
    })
    console.log(checkedCountries);
    this.editform.get('VehicleVersion').patchValue(vehicle_version);
  }

  getvehicleVersionduplicate(): void {
    let vehicle_version = '';
    vehicle_version = this.duplicateform.value.Make != null ? this.duplicateform.value.Make : '';
    vehicle_version += this.duplicateform.value.Model != null ? ' ' + this.duplicateform.value.Model : '';
    vehicle_version += this.duplicateform.value.Year != null ? ' ' + this.duplicateform.value.Year : '';
    vehicle_version += this.duplicateform.value.Option1 != null ? ' ' + this.duplicateform.value.Option1 : '';
    vehicle_version += this.duplicateform.value.Option2 != null ? ' ' + this.duplicateform.value.Option2 : '';
    vehicle_version += this.duplicateform.value.Option3 != null ? ' ' + this.duplicateform.value.Option3 : '';
    vehicle_version += this.duplicateform.value.Option4 != null ? ' ' + this.duplicateform.value.Option4 : '';
    vehicle_version += this.duplicateform.value.Option5 != null ? ' ' + this.duplicateform.value.Option5 : '';
    vehicle_version += this.duplicateform.value.Option6 != null ? ' ' + this.duplicateform.value.Option6 : '';
    const checkedCountries = this.countriesduplicateFormArray.value
    .map((checked, i) => (checked ? this.countries[i].countryName : null))
    .filter(value => !!value);
    if(checkedCountries&& checkedCountries.length>=1)
    checkedCountries.map((country)=>{
      vehicle_version += country != null ? ' ' + country : ''; 
    })
    console.log(checkedCountries);
    this.duplicateform.get('VehicleVersion').patchValue(vehicle_version);
  }


  addVehicle(): void {
    this.submitted = true;
    this.mydate = Date.now();
    this.userCountryChecked = this.countriesaddFormArray.value
      .map((checked, i) => (checked ? this.countries[i].countryUID : null))
      .filter(value => !!value);
    this.userCountryChecked.length ? this.isCountryChecked = false : this.isCountryChecked = true;
    if (this.form.invalid || this.isCountryChecked === true) {
      return;
    }
    this.apiFlag = true;
    this.clicked = true;
    let arrayString = '';
    arrayString = '[';
    for (let i = 0; i < this.userCountryChecked.length; i++) {
      arrayString += this.userCountryChecked[i];
      if (i !== (this.userCountryChecked.length - 1)) {
        arrayString += ',';
      }
    }
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('Make', this.form.value.Make == null?"":this.form.value.Make);
    myFormData.append('Model', this.form.value.Model == null?"":this.form.value.Model);
    myFormData.append('Year', this.form.value.Year == null?"":this.form.value.Year);
    myFormData.append('Option1', this.form.value.Option1 == null?"":this.form.value.Option1);
    myFormData.append('Option2', this.form.value.Option2 == null?"":this.form.value.Option2);
    myFormData.append('Option3', this.form.value.Option3 == null?"":this.form.value.Option3);
    myFormData.append('Option4', this.form.value.Option4 == null?"":this.form.value.Option4);
    myFormData.append('Option5', this.form.value.Option5 == null?"":this.form.value.Option5);
    myFormData.append('Option6', this.form.value.Option6 == null?"":this.form.value.Option6);
    myFormData.append('VehicleVersion', this.form.value.VehicleVersion.trim());
    myFormData.append('UserStamp', this.mydate);
    myFormData.append('fromto', this.form.value.fromto == null?"":this.form.value.fromto);
    /* myFormData.append('TransitionYear12year', this.form.value.TransitionYear12year);
    myFormData.append('TransitionYear12year_2', this.form.value.TransitionYear12year_2); */
    myFormData.append('RSfromto', this.form.value.RSfromto == null?"":this.form.value.RSfromto);
    myFormData.append('Audiofromto', this.form.value.Audiofromto == null?"":this.form.value.Audiofromto);
    myFormData.append('YearTransition1_2', this.form.value.Transitionyear == null?"":this.form.value.Transitionyear);
    myFormData.append('vehicleImage', this.filedata == null?"":this.filedata);
    
    myFormData.append('isDetailsAvailable', '1');
    this.userCountryChecked.forEach((item) => myFormData.append("countryUID[]", item))
    console.log(this.form);
    console.log(this.filedata);
    this.httpClient.post<any>(this.apiURL + '/api/addvehicle', myFormData)
      .subscribe(data => {
        
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Vehicle Added Successfully !';
          $('#modalAdd').css('display', 'none');
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
          $('#modalAdd').css('display', 'none');
          document.getElementById('info_alert').style.display = 'block';
        }
      });
  }

  editVehicle(): void {
    this.submitted = true;
    this.userCountryChecked = this.countrieseditFormArray.value
    .map((checked, i) => (checked ? this.countries[i].countryUID : null))
    .filter(value => !!value);
  this.userCountryChecked.length ? this.isCountryChecked = false : this.isCountryChecked = true;
    if (this.editform.invalid || this.isCountryChecked === true) {
        return;
    }
    this.apiFlag = true;
    this.clicked = true;
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('roleUID', localStorage.getItem('role_id'));
    myFormData.append('vehicleUID', this.edit.vehicleUID);
    myFormData.append('Make', this.editform.value.Make);
    myFormData.append('Model', this.editform.value.Model);
    myFormData.append('Year', this.editform.value.Year);
    myFormData.append('Option1', this.editform.value.Option1);
    myFormData.append('Option2', this.editform.value.Option2 ?? '');
    myFormData.append('Option3', this.editform.value.Option3 ?? '');
    myFormData.append('Option4', this.editform.value.Option4 ?? '');
    myFormData.append('Option5', this.editform.value.Option5 ?? '');
    myFormData.append('Option6', this.editform.value.Option6 == null?"":this.editform.value.Option6);
    myFormData.append('VehicleVersion', this.editform.value.VehicleVersion);
    myFormData.append('UserStamp', this.UserStamp);
    myFormData.append('fromto', this.editform.value.fromto);
    /* myFormData.append('TransitionYear12year', this.form.value.TransitionYear12year);
    myFormData.append('TransitionYear12year_2', this.form.value.TransitionYear12year_2); */
    myFormData.append('RSfromto', this.editform.value.RSfromto);
    myFormData.append('Audiofromto', this.editform.value.Audiofromto);
    myFormData.append('YearTransition1_2', this.editform.value.Transitionyear);
    myFormData.append('vehicleImage', this.filedata);
    myFormData.append('isActive', this.editform.value.isActive);
    this.userCountryChecked.forEach((item) => myFormData.append("countryUID[]", item))
    console.log(this.editform);
    console.log(this.filedata);
    this.httpClient.post<any>(this.apiURL + '/api/updatevehicle', myFormData)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Edit Vehicle is Successfully Updated !';
          $('#modalEdit').css('display', 'none');
          document.getElementById('info_success').style.display = 'block';
          this.gridApi.refreshCells({force : true});
          this.gridApi.refreshCells();
          this.clickEvent();
          setTimeout(() => { 
            this.close1();
          }, this.redirectSecounds);
        }
        else {
          this.successMessage = data.errors[0];
          this.clicked = false;
          $('#modalEdit').css('display', 'none');
          document.getElementById('info_alert').style.display = 'block';
        }
      });
  }
  
  onCellValueChanged(event): void {
  //const myFormData = new FormData();
  this.updateString.userUID =  localStorage.getItem('user_id');
    // myFormData.append('vehicleUID', params.data.VehicleUID);
    // myFormData.append('updateString', JSON.stringify(event.data));
    this.updateString.vehicleUID = event.data.vehicleUID;
    this.updateString.Make = event.data.Make;
    this.updateString.Model = event.data.Model;
    this.updateString.Year = event.data.Year;
    this.updateString.Option1 = event.data.Option1;
    this.updateString.VehicleVersion = event.data.VehicleVersion;
    this.updateString.fromto = event.data.fromto;
    this.updateString.Option2 = event.data.Option2;
    this.updateString.Option3 = event.data.Option3;
    this.updateString.Option4 = event.data.Option4;
    this.updateString.Option5 = event.data.Option5;
    this.updateString.Option6 = event.data.Option6;
    this.updateString.RSfromto = event.data.RSfromto;
    this.updateString.Audiofromto = event.data.Audiofromto;
    this.updateString.YearTransition1_2 = event.data.YearTransition1_2;
    this.apiFlag = true;
    /* myFormData.append('Make', this.form.value.Make);
    myFormData.append('Model', this.form.value.Model);
    myFormData.append('Year', this.form.value.Year);
    myFormData.append('Option1', this.form.value.Option1);
    myFormData.append('Option2', this.form.value.Option2);
    myFormData.append('Option3', this.form.value.Option3);
    myFormData.append('Option4', this.form.value.Option4);
    myFormData.append('Option5', this.form.value.Option5);
    myFormData.append('Option6', this.form.value.Option6);
    myFormData.append('VehicleVersion', this.form.value.VehicleVersion);
    myFormData.append('fromto', this.form.value.fromto);
    myFormData.append('RSfromto', this.form.value.RSfromto);
    myFormData.append('Audiofromto', this.form.value.Audiofromto);
    myFormData.append('YearTransition1_2', this.form.value.YearTransition1_2); */
    this.httpClient.post<any>(this.apiURL + '/api/updatevehiclegrid', this.updateString)
    .subscribe(data => {
      $('#text').css('display', 'none');
      if (data.return_code == 0) {
        this.successMessage = 'Updated Successfully !';
        $('#info_success').css('display', 'block');
        setTimeout(() => {
          this.close1();
        }, this.redirectSecounds);
      }
      else{
        this.successMessage = 'Update Failed !';
        $('#info_alert').css('display', 'block');
    }
});
}

  duplicateVehicle(): void {
    this.submitted = true;
    this.userCountryChecked = this.countriesduplicateFormArray.value
    .map((checked, i) => (checked ? this.countries[i].countryUID : null))
    .filter(value => !!value);
  this.userCountryChecked.length ? this.isCountryChecked = false : this.isCountryChecked = true;
      if (this.duplicateform.invalid || this.isCountryChecked === true) {
          return;
      }
    this.apiFlag = true;
    this.clicked = true;
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('roleID', localStorage.getItem('role_id'));
    myFormData.append('dublicateVehicleUID', this.edit.vehicleUID);
    myFormData.append('Make', this.duplicateform.value.Make);
    myFormData.append('Model', this.duplicateform.value.Model);
    myFormData.append('Year', this.duplicateform.value.Year);
    myFormData.append('Option1', this.duplicateform.value.Option1);
    myFormData.append('Option2', this.duplicateform.value.Option2 ?? '');
    myFormData.append('Option3', this.duplicateform.value.Option3 ?? '');
    myFormData.append('Option4', this.duplicateform.value.Option4 ?? '');
    myFormData.append('Option5', this.duplicateform.value.Option5 ?? '');
    myFormData.append('Option6', this.duplicateform.value.Option6 == null?"":this.duplicateform.value.Option6);
    myFormData.append('VehicleVersion', this.duplicateform.value.VehicleVersion);
    myFormData.append('UserStamp', this.UserStamp);
    myFormData.append('fromto', this.duplicateform.value.fromto);
    /* myFormData.append('TransitionYear12year', this.form.value.TransitionYear12year);
    myFormData.append('TransitionYear12year_2', this.form.value.TransitionYear12year_2); */
    myFormData.append('RSfromto', this.duplicateform.value.RSfromto);
    myFormData.append('Audiofromto', this.duplicateform.value.Audiofromto);
    myFormData.append('YearTransition1_2', this.duplicateform.value.Transitionyear);
    myFormData.append('vehicleImage', this.filedata);
    myFormData.append('isDetailsAvailable', '1');
    this.userCountryChecked.forEach((item) => myFormData.append("countryUID[]", item))
    console.log(this.form);
    console.log(this.filedata);
    this.httpClient.post<any>(this.apiURL + '/api/addduplicatevechile', myFormData)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Duplicate Vehicle Added Successfully !';
          $('#modalDuplicate').css('display', 'none');
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
          $('#modalDuplicate').css('display', 'none');
          document.getElementById('info_alert').style.display = 'block';
        }
      });
  }

  cancelAdd(): void {
    $('#modalAdd').css('display', 'none');
    this.submitted = false;
    this.form.reset();
  }

  cancelEdit(): void {
    $('#modalEdit').css('display', 'none');
    this.submitted = false;
    this.editform.reset();
  }

  cancelDuplicate(): void {
    $('#modalDuplicate').css('display', 'none');
    this.submitted = false;
    this.duplicateform.reset();
  }

  clickEvent(): void {
    if ($('#archive').prop('checked')) {
      this.dummy.ArchStatus = '1';
      this.showButton1 = false;
    }
    else {
      this.dummy.ArchStatus = '0';
      this.showButton1 = false;
    }
    //this.gridApi.showLoadingOverlay();
    //this.dummy.userUID = localStorage.getItem('user_id');
    this.httpClient.post<any>(this.apiURL + '/api/getvehicles', this.dummy)
      .subscribe(data => {
        this.rowData = (data as any).vehicleDetails;
        this.gridApi.setRowData(this.rowData);
        this.gridApi.hideOverlay();
      });
  }

  quickSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  }


}

export function YearValidator(control: AbstractControl): { [key: string]: boolean } | null {

  let value: number = control.value;
  if ((value < 1900) || (value > (new Date().getFullYear() + 1))) {
    return { 'invalid': true };
  }
  else {
    return null;
  }

}


