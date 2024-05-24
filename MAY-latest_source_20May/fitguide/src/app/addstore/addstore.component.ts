import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
declare var $: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-addstore',
  templateUrl: './addstore.component.html',
  styleUrls: ['./addstore.component.css']
})
export class AddstoreComponent implements OnInit {
  apiURL: any;
  redirectSecounds: any;
  form: FormGroup;
  countryform: FormGroup;
  filedata: any;
  submitted = false;
  public State = {
    StateUID: null
  };
  public distID = {
    userUID: null,
    PROC_TYPE: ''
  };
  public compID = {
    userUID: null,
    distributorUID: null,
    PROC_TYPE: ''
  };
  public City = {
    StateUID: null,
    cityUID: null
  };
  distributors: any;
  company: any;
  states: any;
  cities: any;
  countries:any;
  regions:any;
  dummy: string;
  stateUID: any;
  clicked: any;
  apiFlag: any;
  apiFlagModal: any;
  successMessage: any;
  midwestRegionArray:String[];
  mountainRegionArray:String[];
  westRegionArray:String[];
  southRegionArray:String[];
  southeastRegionArray:String[];
  southwestRegionArray:String[];
  northernRegionArray:String[];
  northwestRegionArray:String[];
  northeastRegionArray:String[];
  eastRegionArray:String[];
  countryName:any;
  //StateName:any;
  constructor(private http: HttpClient, private location: Location, public fb: FormBuilder) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.countryName='';
    //this.StateName='';
    this.form = this.fb.group({
      storeName: ['', Validators.required],
      distributorName: ['', Validators.required],
      companyName: ['', Validators.required],
      storeAddress: [''],
      storeCountry: [''],
      storeState: [''],
      storeCity: [''],
      storeRegion: [''],
      storeZipcode: [''],
      storeImage: [''],
      storeEmail: [''],
      storeContact: [''],
      storePrimaryContact: [''],
      storeWebsite: [''],
      isBranchAvailable: [''],
      branches: this.fb.array([])
    });
    this.countryform = this.fb.group({
      countryName: ['', Validators.required]
    });
    this.midwestRegionArray=['Missouri', 'Kansas', 'Nebraska','Iowa', 'Illinois', 'Indiana', 'Ohio']
    this.mountainRegionArray=['Colorado', 'Idaho', 'Montana', 'Utah', 'Wyoming']
    this.westRegionArray=['California', 'Nevada']
    this.southRegionArray=['Louisiana', 'Mississippi', 'Oklahoma', 'Texas', 'Arkansas']
    this.southeastRegionArray=['Alabama', 'Florida', 'Georgia']
    this.southwestRegionArray=['Arizona', 'New Mexico']
    this.northernRegionArray=['Minnesota', 'Michigan', 'North Dakota', 'South Dakota', 'Wisconsin']
    this.northwestRegionArray=['Oregon', 'Washington']
    this.northeastRegionArray=['Connecticut', 'Delaware', 'District of Columbia', 'Maine', 'Maryland', 'Massachusetts', 'New Hampshire', 'New Jersey', 'New York', 'Pennsylvania', 'Rhode Island', 'Vermont']
    this.eastRegionArray=['North Carolina', 'South Carolina', 'Tennessee', 'Kentucky', 'Virginia', 'West Virginia']
  }

  get branches(): FormArray {
    return this.form.get('branches') as FormArray;
  }

  get f(): any { return this.form.controls; }
  get c(): any { return this.countryform.controls; }

  addBranchFormGroup(): FormGroup {
    return this.fb.group({
      branchName: ['', Validators.required],
      branchAddress : [''],
      branchState : [''],
      branchCity : [''],
      branchRegion : [''],
      branchZip : [''],
      branchEmail : [''],
      branchContact : ['']
    });
  }

  addBranch(): void {
    this.submitted = false;
    this.branches.push(this.addBranchFormGroup());
  }

  deleteBranch(id: any): void {
    this.submitted = false;
    this.branches.removeAt(id);
  }

  ngOnInit(): void {
    updatePageTitle('Add Store');
    this.getState();
    this.getDistributor();
    this.filedata = '';
    this.clicked = false;
    this.apiFlag = false;
    this.apiFlagModal = false;
    this.getCountry();
    this.getRegion();
  }

  countryOnchange(e): void {
    this.countryName=e.target.value;
    this.form.get('storeRegion').patchValue(this.countryName=='USA'?'':this.countryName);
    //this.form.get('distributorState').patchValue(this.countryName=='USA'?'':this.StateName);
  }

  getCountry():void{
    this.http.post<any>(this.apiURL + '/api/getallcountrylist', {})
      .subscribe(data => {
        this.countries = data;
      });
    }

 getRegion():void{
  this.http.post<any>(this.apiURL + '/api/getallregionlist', {})
    .subscribe(data => {
      this.regions = data;
    });
} 

  getState(): void {
    this.dummy = '';
    this.http.post<any>(this.apiURL + '/api/getallstates', this.dummy)
      .subscribe(data => {
        //if (data.return_code == 0) {
          this.states = data;
        //}
      });
  }

  getCity(e): void {
    //console.log($("#stateStore option:selected").text());
    this.State.StateUID = e.target.value;
    this.City.StateUID = e.target.value;
    this.http.post<any>(this.apiURL + '/api/getcitybystate', this.State)
      .subscribe(data => {
        if (data.return_code == 0) {
          this.cities = (data as any).countyList;
        }
      });
      this.getRegionbyState($("#stateStore option:selected").text(),'Store',0);
  }

  /* getRegionbyState(State): void {
    if(this.midwestRegionArray.includes(State)){
     this.form.get('storeRegion').patchValue("Midwest");
    }
    else if(this.mountainRegionArray.includes(State)){
     this.form.get('storeRegion').patchValue("Mountain");
    }
    else if(this.westRegionArray.includes(State)){
     this.form.get('storeRegion').patchValue("West");
    }
    else if(this.southRegionArray.includes(State)){
     this.form.get('storeRegion').patchValue("South");
    }
    else if(this.southeastRegionArray.includes(State)){
     this.form.get('storeRegion').patchValue("Southeast");
    }
    else if(this.southwestRegionArray.includes(State)){
     this.form.get('storeRegion').patchValue("Southwest");
    }
    else if(this.northernRegionArray.includes(State)){
     this.form.get('storeRegion').patchValue("Northern");
    }
     else if(this.northwestRegionArray.includes(State)){
     this.form.get('storeRegion').patchValue("Northwest");
    } 
    else if(this.northeastRegionArray.includes(State)){
     this.form.get('storeRegion').patchValue("Northeast");
    } 
     else if(this.eastRegionArray.includes(State)){
     this.form.get('storeRegion').patchValue("East");
    }
    else{
     this.form.get('storeRegion').patchValue("");
    }
   }   */

  getDistributor(): void {
    this.distID.userUID = localStorage.getItem('user_id');
    this.distID.PROC_TYPE = 'SELECT_DISTRIBUTOR_ADD';
    this.http.post<any>(this.apiURL + '/api/getdistributorUID', this.distID)
      .subscribe(data => {
        if (data.return_code == 0) {
          this.distributors = (data as any).distributorList;
        }
      });
  }

  getCompany(e): void {
    this.compID.userUID = localStorage.getItem('user_id');
    this.compID.distributorUID = e.target.value;
    this.compID.PROC_TYPE = 'SELECT_COMPANY_ADD';
    this.http.post<any>(this.apiURL + '/api/getcompanybydistributorid', this.compID)
      .subscribe(data => {
        if (data.return_code == 0) {
          this.company = (data as any).companyList;
          this.form.get('companyName').patchValue('');
        }
      });
  }

  setBranch(e): void {
    if (e.target.value == "1")
    {
      this.addBranch();
    }
    else
    {
      this.branches.clear();
    }
  }

  getBranchCity(e, id): void {
    this['StateUID' + id] = e.target.value;
    this.State.StateUID = this['StateUID' + id];
    this.City.StateUID = e.target.value;
    this.http.post<any>(this.apiURL + '/api/getcitybystate', this.State)
      .subscribe(data => {
        if (data.return_code == 0) {
          this['cities' + id] = (data as any).countyList;
        }
      });
      this.getRegionbyState($("#stateBranch"+id+" option:selected").text(),'Branch',id);
  }

  getRegionbyState(State,type,id): void {
    if(this.countryName=='USA')
    {
    var selectedRegion;
    if(this.midwestRegionArray.includes(State)){
     selectedRegion = "Midwest";
     
    }
    else if(this.mountainRegionArray.includes(State)){
     selectedRegion = "Mountain";
    
    }
    else if(this.westRegionArray.includes(State)){
     selectedRegion = "West";
     
    }
    else if(this.southRegionArray.includes(State)){
     selectedRegion = "South";
     
    }
    else if(this.southeastRegionArray.includes(State)){
     selectedRegion = "Southeast";
     
    }
    else if(this.southwestRegionArray.includes(State)){
     selectedRegion = "Southwest";
     
    }
    else if(this.northernRegionArray.includes(State)){
     selectedRegion = "Northern";
     
    }
     else if(this.northwestRegionArray.includes(State)){
     selectedRegion = "Northwest";
     
    } 
    else if(this.northeastRegionArray.includes(State)){
     selectedRegion = "Northeast";
     
    } 
     else if(this.eastRegionArray.includes(State)){
     selectedRegion = "East";
     
    }
    else{
     selectedRegion = '';
    }
  
    if(type=='Store'){
     this.form.get('storeRegion').patchValue(selectedRegion);
    }
    else{
      var temp=[];
      for (let i = 0; i < this.form.value.branches.length; i++) {
       if(id==i)
       {
         this.form.value.branches[i].branchRegion=selectedRegion
       }
 
       temp[i]=this.form.value.branches[i];
     }
    this.branches.patchValue(temp);
    /*  console.log('branch',this.form.value.branches); */
    /*  this.form.get('storeRegion').patchValue(selectedRegion); */
    }
  }
  }  

  back(): void {
    this.location.back();
  }

  close1(): void{
    this.apiFlag = false;
    if (this.clicked == true) {
      this.location.back();
      this.clicked = false;
    }
  }

  
  closeModal(): void{
    this.apiFlagModal = false;
    this.cancel();
  }

  closeModalError(): void{
    this.apiFlagModal = false;
  }

  cancel():void{
    $('#myModal').css('display', 'none');
  }

  addcountry():void {
    $('#myModal').css('display', 'block');
    this.submitted = false;
    this.countryform.reset();
    $('#myModal').css('height', document.body.scrollHeight);
  }

  saveCountry(): void{
    this.submitted = true;
      if (this.countryform.invalid) {
      return;
    }
    const myFormData = new FormData();
    myFormData.append('countryName', this.countryform.value.countryName);
    this.apiFlagModal = true;
    this.http.post<any>(this.apiURL + '/api/addcountry', myFormData)
     .subscribe(data => {
      if (data.return_code == 0) {
        $('#text_modal').css('display', 'none');
        this.successMessage = 'Country Added Successfully !';
        $('#info_success').css('display', 'block');
        setTimeout(() => {
          this.closeModal();
        },  this.redirectSecounds);
        this.getCountry();
        this.getRegion();
       }
       else{
        $('#text_modal').css('display', 'none');
        this.successMessage = data.err_message;
        $('#info_alert').css('display', 'block');
       }
     });
     
    }

  fileEvent(e): void {
    this.filedata = e.target.files[0];
  }

  submitForm(): void {
    this.submitted = true;
    if (this.form.invalid) {
        return;
    }
    let arrayString = '';
    if (this.form.value.isBranchAvailable == "1")
    {
    arrayString = '[';
    for (let i = 0; i < this.form.value.branches.length; i++) {
        arrayString += JSON.stringify(this.form.value.branches[i]);
        if (i !== (this.form.value.branches.length - 1))
        {
          arrayString += ',';
        }
    }
    arrayString += ']';
    }
    this.apiFlag = true;
    this.clicked = true;
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('storeName', this.form.value.storeName);
    myFormData.append('storePrimaryContactName', this.form.value.storePrimaryContact);
    myFormData.append('distributorUID', this.form.value.distributorName);
    myFormData.append('companyUID', this.form.value.companyName);
    myFormData.append('storeAddress', this.form.value.storeAddress);
    myFormData.append('storeCountry', this.form.value.storeCountry);
    myFormData.append('storeState', this.form.value.storeState);
    myFormData.append('storeCity', this.form.value.storeCity);
    myFormData.append('storeRegion', this.form.value.storeRegion);
    myFormData.append('storeZipcode', this.form.value.storeZipcode);
    myFormData.append('storeImage', this.filedata);
    myFormData.append('storeEmail', this.form.value.storeEmail);
    myFormData.append('storeContact', this.form.value.storeContact);
    myFormData.append('storeWebsite', this.form.value.storeWebsite);
    myFormData.append('isBranchAvailable', this.form.value.isBranchAvailable);
    myFormData.append('branchArray', arrayString);
    console.log(arrayString);
    console.log(this.filedata);
    this.http.post<any>(this.apiURL + '/api/createstore', myFormData)
     .subscribe(data => {
       document.getElementById('text').style.display = 'none';
       if (data.return_code == 0) {
        this.successMessage = 'Store Added Successfully !';
        document.getElementById('info_success').style.display = 'block';
        setTimeout(() => {
          this.close1();
        },  this.redirectSecounds);
       }
       else{
        this.successMessage = data.errors[0];
        this.clicked = false;
        document.getElementById('info_alert').style.display = 'block';
       }
     });
  }

}

