import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
declare var $: any;
declare var hideSearchText: any;
declare var addOptions: any;
declare var getOptions: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-managebundlepart',
  templateUrl: './managebundlepart.component.html',
  styleUrls: ['./managebundlepart.component.scss']
})
export class ManagebundlepartComponent implements OnInit {
  apiURL: any;
  redirectSecounds: any;
  clicked: any;
  apiFlag: any;
  sections: any;
  brands: any;
  parts: any;
  sectionList: string;
  dHeader: string;
  info: boolean;
  successMessage: string;
  partDetails: any;
  PartsDetailsByBrand: any;
  vehicleDetails: any;
  vehicleDetailsFlag: any;
  partDetailsFlag: any;
  //isSelectedVehicle: any;
  // AG Grid Part
  private gridApi: any;
  private gridColumnApi: any;
  /* rowSelection: any; */
  modules = [ClientSideRowModelModule];
  bundleform: FormGroup;
  updateform: FormGroup;
  copyform: FormGroup;
  submitted = false;
  addparts: any;
  updateparts:any;
  bundleName:any;
  bundleUID:any;
  bundleparts: any;
  data = {
    SectionUID: ''
  };
  dummy={
    userUID: '',
    partUID: [],
    bundleName: ''
  }
  dummytext={
    bundleUID:'',
    bundleName:''
  }
  updatebundle ={
    bundleUID:'',
    bundleName:'',
    userUID:'',
    partUID:[]
  }
  public sectionGroup = {
    section1: null,
    section2: null,
    section3: null,
    section4: null,
    section5: null,
    section6: null
  };
  formErrorSection1: any;
  formErrorSection2: any;
  formErrorSection3: any;
  SelectedParts = [];
  bundleselectparts: any;
  temp1: any;
  temp2: any;
  temp3: any;
  temp4: any;
  count: any;
  finalSelectedParts = [];
  updateSelectedParts: any;
  bundles: any;
  bundlesList: any;
  public loadingOverlayComponentParams: any = {
    loadingMessage: 'One moment please...',
  };
  columnDefs = [
    {
      headerName: 'Select Bundle', width: 120, sortable: true, checkboxSelection: true
    },
    { headerName: 'Part Number', field: 'partNumber', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Part Short Description', field: 'shortDescription', sortable: true, filter: true },
    { headerName: 'Section Name', field: 'sectionName', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Brand Name', field: 'brandName', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true },
    { headerName: 'UPC Code', field: 'UPCCode', sortable: true, filter: true },
    { headerName: 'MSRP', field: 'MSRP', sortable: true, filter: true },
  ];
  rowData: any;
  public rowSelection: 'single' | 'multiple' = 'multiple';
  constructor(private http: HttpClient, public fb: FormBuilder, private location: Location,private router: Router) {
    /* this.bundleName ='';
    this.bundleUID =''; */
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.bundleform = this.fb.group({
      bundleName : ['',Validators.required],
      selectedPart: ['']
    });
    this.updateform = this.fb.group({
      bundleNameList : ['',Validators.required],
      bundleNameSelected : [''],
      
    });
    this.copyform = this.fb.group({
      bundleNameList : ['',Validators.required],
      bundleNameSelected : ['']
    });
   }

   get b(): any { return this.bundleform.controls; }
   get u(): any { return this.updateform.controls; }
   get c(): any { return this.copyform.controls; }

  ngOnInit(): void {
    //hideSearchText();
    this.partDetailsFlag = false;
    this.getSection();
    this.apiFlag = false;
    updatePageTitle('Manage Bundle Part');
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }

  getSection(): void {
    this.http.get<any>(this.apiURL + '/api/getsections')
      .subscribe(data => {
        this.sections = (data as any).searchSections;
      });
  }

  getOptionPart(): void {
    const checkboxId = this.gridApi.getSelectedRows();
    checkboxId.forEach(element => {
    this.SelectedParts.push({'partUID': element.partUID,'partNumber': element.partNumber});
    });
    
  }

  getBundlelist(): void {
    this.http.get<any>(this.apiURL + '/api/getbundle')
      .subscribe(data => {
        this.bundleparts = (data as any).partBundle;
      });
  }

  getcopyBundlelist(): void {
    this.http.get<any>(this.apiURL + '/api/getbundle')
      .subscribe(data => {
        this.bundleparts = (data as any).partBundle;
      });
  }

  bundleOnchange(e):void {
      this.updateSelectedParts = [...this.SelectedParts];
      if(e.target.value == '')
      {
        this.update();
        return;
      }
      this.dummytext.bundleUID = e.target.value;
      this.http.post<any>(this.apiURL + '/api/getbundledetails/'+e.target.value, {} )
      .subscribe(data => {
        this.bundleselectparts = [...data.bundlepart_details];
        this.dummytext.bundleName = data.bundle_details.bundleName;
        this.updateform.get('bundleNameSelected').patchValue(this.dummytext.bundleName);
        // console.log( this.updateform);
        const matchedPart = [];
        const gridSelectedParts = [];
        this.SelectedParts.forEach((element) => {            
            gridSelectedParts.push(element.partUID);
            this.formErrorSection2 = false;
        });
        this.bundleselectparts.forEach((element) => {
          if (gridSelectedParts.includes(element.partUID)) {  
            matchedPart.push(element.partUID);
          }
        });
        matchedPart.forEach((element) => {
          this.updateSelectedParts.forEach((element1, index) => {
          if(element1.partUID == element)
          {
            this.updateSelectedParts.splice(index, 1);
            this.updateSelectedParts = [...this.updateSelectedParts];  
          } 
          });                         
        });
      });
  }

  bundlecopyOnchange(e):void {
    this.updateSelectedParts = [...this.SelectedParts];
    if(e.target.value == '')
    {
      this.copy();
      return;
    }
    this.dummytext.bundleUID = e.target.value;
      this.http.post<any>(this.apiURL + '/api/getbundledetails/'+e.target.value, {} )
      .subscribe(data => {
        this.bundleselectparts = [...data.bundlepart_details];
        this.dummytext.bundleName = data.bundle_details.bundleName;
        this.copyform.get('bundleNameSelected').patchValue(this.dummytext.bundleName);
        const matchedPart = [];
        const gridSelectedParts = [];
        this.SelectedParts.forEach((element) => {            
            gridSelectedParts.push(element.partUID);
            this.formErrorSection3 = false;
        });
        this.bundleselectparts.forEach((element) => {
          if (gridSelectedParts.includes(element.partUID)) {  
            matchedPart.push(element.partUID);
            
          }
        });   
        matchedPart.forEach((element) => {
          this.updateSelectedParts.forEach((element1, index) => {
          if(element1.partUID == element)
          {
            this.updateSelectedParts.splice(index, 1);
            this.updateSelectedParts = [...this.updateSelectedParts];
            
          } 
          });                         
        });
      });
  }
  
  getOptionSection(e): void {
    this.sectionList = e.target.value;
    this.partDetailsFlag = false;
    this.parts = [];
    $("#s_text").css("visibility", "hidden").css("display", "none");
  }

  getPartDetails(): void {  
    if (!this.sectionList) {
      $("#s_text").css("visibility", "visible").css("display", "");
    }
    if (this.sectionList){
      this.partDetailsFlag = true;
      this.data.SectionUID = this.sectionList;
    }
  }

   //Get Partdetails AG Grid
   onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.http.post<any>(this.apiURL + '/api/getpartsbybrand', this.data)
      .subscribe(data => {
        this.rowData = (data as any).PartsDetailsByBrand;
      });
    }

  onSelectionChanged(): void {}

  createBundle(): void {
    $('#myModal').css('display', 'block');
    this.getOptionPart();
  }

  swap(s1, s2): void {
    addOptions(s1, s2);
    if (s2 === 'section2') {
      this.formErrorSection1 = false;
    }
    if (s2 === 'section4') {
      this.formErrorSection2 = false;
    } 
   if (s2 === 'section6') {
      this.formErrorSection3 = false;
    }
  }

  cancel(): void {
    $('#myModal').css('display', 'none');
    this.clickEvent();
    this.bundleform.reset();
    this.submitted = false;
    this.formErrorSection1 = false;
    this.formErrorSection2 = false;
    this.apiFlag = false;
    this.SelectedParts =[];
  }

   cancel1(): void {
    $('#myModal').css('display', 'none');
    this.clickEvent();
    $("#alert-danger").prop("checked", true);
    this.create();
    this.updateform.reset();
    $("select#bundleNamedropdown1").prop('selectedIndex', 0);
    this.updateform.patchValue({
      bundleNameSelected: ''
   });
    this.submitted = false;
    this.formErrorSection1 = false;
    this.formErrorSection2 = false;
    this.formErrorSection3 = false;
    this.apiFlag = false;
    this.bundleselectparts =[];
  }

  cancel2():void{
    $('#myModal').css('display', 'none');
    this.clickEvent();
    $("#alert-danger").prop("checked", true);
    this.create();
    this.copyform.reset();
    $("select#bundleNamedropdown2").prop('selectedIndex', 0);
    this.copyform.patchValue({
      bundleNameSelected: ''
   });
    this.submitted = false;
    this.formErrorSection1 = false;
    this.formErrorSection2 = false;
    this.formErrorSection3 = false;
    this.apiFlag = false;
    this.bundleselectparts =[];
  }

  close1(): void {
    $('#myModal').css('display', 'none');
    this.bundleform.reset();
    this.updateform.reset();
    this.copyform.reset();
    $("select#bundleNamedropdown1").prop('selectedIndex', 0);
    this.updateform.patchValue({
      bundleNameSelected: ''
    });
    $("select#bundleNamedropdown2").prop('selectedIndex', 0);
     this.copyform.patchValue({
      bundleNameSelected: ''
    });      
    $("#alert-danger").prop("checked", true);   
    this.submitted = false;
    this.formErrorSection1 = false;
    this.formErrorSection2 = false;
    this.formErrorSection3 = false;
    this.apiFlag = false;
    this.SelectedParts =[];
    this.bundleselectparts =[];    
    this.clickEvent();
  }

  create(): void{
    $("#bf").show();
    $("#uf").hide();
    $("#cf").hide();
    this.submitted = false;
    this.formErrorSection1 = false;
    this.updateform.reset();
    this.bundleform.patchValue({
      bundleName: ''
   });  
  }

  update():void{
    $("#bf").hide();
    $("#cf").hide();
    $("#uf").show();
    this.updateform.patchValue({
      bundleNameSelected: ''
   });
   this.submitted = false;
   this.formErrorSection2 = false;
   this.updateform.reset();
   this.getBundlelist();
   this.updateform.patchValue({
    bundleNameList: ''
  });
  this.bundleselectparts =[];
   this.updateSelectedParts = [...this.SelectedParts];
  }

  copy():void{
    $("#bf").hide();
    $("#uf").hide();
    $("#cf").show();
    this.copyform.patchValue({
      bundleNameSelected: ''
   });
   this.submitted = false;
   this.formErrorSection3 = false;
   this.copyform.reset(); 
   this.getcopyBundlelist();
   this.copyform.patchValue({
    bundleNameList: ''
  });
  this.bundleselectparts =[];
  this.updateSelectedParts = [...this.SelectedParts];
  }

  addpartbundle(): void {
    this.submitted = true;
    this.dummy.partUID =  getOptions('section2');
    this.dummy.partUID =  this.dummy.partUID.map(function(e) { return e.replace(/'/g, ''); });
    if (this.bundleform.invalid || this.dummy.partUID.length == 0)
    {
      this.formErrorSection1 = true;
      return;
    }
    this.dummy.userUID = localStorage.getItem('user_id');    
    this.dummy.bundleName = this.bundleform.value.bundleName;
    this.apiFlag = true;
    this.http.post<any>(this.apiURL + '/api/addpartbundle', this.dummy)
      .subscribe(data => {       
        this.addparts = (data as any).bundlepartDetails;
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
        this.successMessage = 'Bundle Added Successfully !';
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

  updatePartBundle():void {
    this.submitted = true;
    this.updatebundle.partUID =  getOptions('section4');
    this.updatebundle.partUID =  this.updatebundle.partUID.map(function(e) { return e.replace(/'/g, ''); });
    if (this.updateform.invalid || this.updatebundle.partUID.length == 0)
    {
      this.formErrorSection2 = true;
      return;
    }
    else {
      this.formErrorSection2 = false;
    }
    this.updatebundle.userUID = localStorage.getItem('user_id');
    this.updatebundle.bundleUID =  this.dummytext.bundleUID;
    this.updatebundle.bundleName = this.updateform.value.bundleNameSelected;
    this.apiFlag = true;
    this.http.post<any>(this.apiURL + '/api/updatepartbundle', this.updatebundle)
      .subscribe(data => {
        this.updateparts = (data as any).bundlepartDetails;
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
        this.successMessage = 'Bundle Updated Successfully !';
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

  copyPartBundle():void {
    this.submitted = true;
    this.updatebundle.partUID =  getOptions('section6');
    this.updatebundle.partUID =  this.updatebundle.partUID.map(function(e) { return e.replace(/'/g, ''); });
    if (this.copyform.invalid && this.updatebundle.partUID.length == 0)
    {
      this.formErrorSection3 = true;
      return;
    }
    this.updatebundle.userUID = localStorage.getItem('user_id');
    this.updatebundle.bundleName = this.copyform.value.bundleNameSelected;
    this.apiFlag = true;
    this.http.post<any>(this.apiURL + '/api/copypartbundle', this.updatebundle)
      .subscribe(data => {
        this.updateparts = (data as any).bundlepartDetails;
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
        this.successMessage = 'Bundle Added Successfully !';
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
    this.http.post<any>(this.apiURL + '/api/getpartsbybrand', this.data)
    .subscribe(data => {
      this.parts = (data as any).PartsDetailsByBrand;
      this.gridApi.setRowData(this.parts);
      this.gridApi.hideOverlay();
    });
    this.SelectedParts =[];
  }
}

