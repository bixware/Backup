import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
declare var $: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-editstore',
  templateUrl: './editstore.component.html',
  styleUrls: ['./editstore.component.css']
})
export class EditstoreComponent implements OnInit {
  apiURL: any;
  imgURL: any;
  redirectSecounds: any;
  public store = {
    storeUID : ''
  };
  public delete = {
    storeUID : '',
    storebranchUID: ''
  };
  form: FormGroup;
  editcountryform: FormGroup;
  submitted = false;
  public State = {
    StateUID: null
  };
  public distID = {
    userUID: null,
    PROC_TYPE: ''  };
  public compID = {
    userUID: null,
    distributorUID: null,
    PROC_TYPE: ''
  };
  public City = {
    StateUID: null,
    cityUID: null
  };
  countries:any;
  regions:any;
  distributors: any;
  company: any;
  states: any;
  cities: any;
  dummy: string;
  stateUID: any;
  branchDetails: any;
  storebranchUID: any;
  storeUID: any;
  bstorebranchUID: any;
  bstoreUID: any;
  storeImage: any;
  branchInfo: any;
  branchDeleteMessage: any;
  clicked: any;
  apiFlag: any;
  apiFlagModal: any;
  successMessage: any;
  prevImage: any;
  filedata: any;
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
  constructor(private http: HttpClient, private location: Location, private route: ActivatedRoute, public fb: FormBuilder) {
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
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
    this.editcountryform = this.fb.group({
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
  get e(): any { return this.editcountryform.controls; }

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
    this.delete.storeUID = this.bstoreUID[id];
    this.delete.storebranchUID = this.bstorebranchUID[id];
    this.http.post<any>(this.apiURL + '/api/deletestore', this.delete)
    .subscribe(data => {
      this.bstoreUID.splice(id, 1);
      this.bstorebranchUID.splice(id, 1);
      this.branches.removeAt(id);
      this.branchInfo = true;
      this.branchDeleteMessage = 'Branch Deleted Successfully';
      setTimeout(() => {
        this.branchInfo = false;
      }, 5000);
    });
  }

  fileEvent(e): void {
    this.filedata = e.target.files[0];
  }

  ngOnInit(): void {
    updatePageTitle('Edit Store');
    this.getCountry();
    this.getRegion();
    this.getState();
    this.getDistributor();
    this.clicked = false;
    this.apiFlag = false;
    this.apiFlagModal = false;
    this.filedata = '';
    this.branchInfo = false;
    this.route.params.subscribe(params => {
      this.store.storeUID = params['id'];
    });
    this.http.post<any>(this.apiURL + '/api/editstore/' + this.store.storeUID, this.store)
    .subscribe(data => {
      console.log(data);
      this.form.patchValue({
        storeName: data.store_details[0].storeName != null ? data.store_details[0].storeName : '',
        storeAddress: data.store_details[0].storeAddress != null ? data.store_details[0].storeAddress : '',
        storePrimaryContact: data.store_details[0].storePrimaryContactName != null ? data.store_details[0].storePrimaryContactName : '',
        storeZipcode: data.store_details[0].storeZipcode != null ? data.store_details[0].storeZipcode : '',
        storeEmail: data.store_details[0].storeEmail != null ? data.store_details[0].storeEmail : '',
        storeContact: data.store_details[0].storeContact != null ? data.store_details[0].storeContact : '',
        storeWebsite: data.store_details[0].storeWebsite != null ? data.store_details[0].storeWebsite : '',
        storeRegion: data.store_details[0].storeRegion != null ? data.store_details[0].storeRegion : ''
      });
      this.storebranchUID = data.store_details[0].storebranchUID != null ? data.store_details[0].storebranchUID : '';
      this.storeUID = data.store_details[0].storeUID != null ? data.store_details[0].storeUID : '';
      this.branchDetails = data.branchDetails;
      this.form.get('storeCountry').patchValue(data.store_details[0].storeCountry != null ? data.store_details[0].storeCountry : '');
      this.form.get('storeState').patchValue(data.store_details[0].storeStateUID != null ? data.store_details[0].storeStateUID : '');
      this.form.get('storeRegion').patchValue(data.store_details[0].storeRegion != null ? data.store_details[0].storeRegion : '');
      //this.getRegionbyState($("#stateStore option:selected").text(),'Store',0);
      
      this.form.get('isBranchAvailable').patchValue(data.store_details[0].isBranchAvailable != null ? data.store_details[0].isBranchAvailable : '');
      if (data.store_details[0].distributorUID != null) {
        this.form.get('distributorName').patchValue(data.store_details[0].distributorUID);
      }
      if (data.store_details[0].storeStateUID != null) {
        this.getCityDynamic(data.store_details[0].storeStateUID);
        this.form.get('storeCity').patchValue(data.store_details[0].storeCityUID != null ? data.store_details[0].storeCityUID : '');
      }
      if (data.store_details[0].distributorUID != null && data.store_details[0].companyUID != null) {
        this.getCompanyDynamic(data.store_details[0].distributorUID);
        this.form.get('companyName').patchValue(data.store_details[0].companyUID);
      }
      if (data.store_details[0].storeImage != null && data.store_details[0].storeImage != '')
      {
        this.prevImage = this.imgURL + 'storage/app/public/uploads/store/' + data.store_details[0].storeImage;
      }
      this.addBranchDetails();
    });
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

  addBranchDetails(): void {
    let temp = '';
    let b1 = [];
    let b2 = [];
    temp = '[';
    for (let i = 0; i < this.branchDetails.length; i++) {
      this.branches.push(this.addBranchFormGroup());
      this.getBranchCityDynamic(this.branchDetails[i].branchStateUID, i);
      b1.push(this.branchDetails[i].storebranchUID);
      b2.push(this.branchDetails[i].storeUID);
     temp += '{ "branchName": "' + this.branchDetails[i].branchName + '", "branchAddress":"' + this.branchDetails[i].branchAddress  + '", "branchState": "' + this.branchDetails[i].branchStateUID + '", "branchCity": "' + this.branchDetails[i].branchCityUID  +  '", "branchRegion": "' + this.branchDetails[i].branchRegion + '", "branchZip":"' +  this.branchDetails[i].branchZipcode  + '", "branchEmail":"' + this.branchDetails[i].branchEmail + '", "branchContact":"' + this.branchDetails[i].branchContact + '"}'; 
     if (i !== (this.branchDetails.length - 1))
      {
        temp += ',';
      }
    }
    temp += ']';
    let new_temp = temp.replace(/null/g, "");
    console.log(new_temp);
    this.branches.setValue(JSON.parse(new_temp));
    this.bstorebranchUID = b1;
    this.bstoreUID = b2;
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

  getDistributor(): void {
    this.distID.userUID = localStorage.getItem('user_id');
    this.distID.PROC_TYPE = 'SELECT_DISTRIBUTOR_EDIT'
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
    this.compID.PROC_TYPE = 'SELECT_COMPANY_ALL';
    this.http.post<any>(this.apiURL + '/api/getcompanybydistributorid', this.compID)
      .subscribe(data => {
        if (data.return_code == 0) {
        this.company = (data as any).companyList;
        this.form.get('companyName').patchValue('');
        }
      });
  }

  getCompanyDynamic(val): void {
    this.compID.distributorUID = val;
    this.compID.userUID = localStorage.getItem('user_id');
    this.compID.PROC_TYPE = 'SELECT_COMPANY_ALL';
    this.http.post<any>(this.apiURL + '/api/getcompanybydistributorid', this.compID)
      .subscribe(data => {
        if (data.return_code == 0) {
        this.company = (data as any).companyList;
        }
      });
  }

  getCity(e): void {
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

  getBranchCity(e, id): void {
    this['StateUID' + id] = e.target.value;
    this.State.StateUID = this['StateUID' + id];
    this.City.StateUID = this['StateUID' + id];
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

  getCityDynamic(val): void {
    this.State.StateUID = val;
    this.http.post<any>(this.apiURL + '/api/getcitybystate', this.State)
      .subscribe(data => {
        if (data.return_code == 0) {
        this.cities = (data as any).countyList;
        }
      });
    }


  getBranchCityDynamic(val, id): void {
    this['StateUID' + id] = val;
    this.State.StateUID = this['StateUID' + id];
    this.http.post<any>(this.apiURL + '/api/getcitybystate', this.State)
      .subscribe(data => {
        if (data.return_code == 0) {
        this['cities' + id] = (data as any).countyList;
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
    this.editcountryform.reset();
    $('#myModal').css('height', document.body.scrollHeight);
  }

  saveCountry(): void{
    this.submitted = true;
      if (this.editcountryform.invalid) {
      return;
    }
    const myFormData = new FormData();
    myFormData.append('countryName', this.editcountryform.value.countryName);
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
        arrayString = arrayString.substring(0, arrayString.length - 1);
        if (this.bstorebranchUID[i] != undefined) {
          arrayString += ', "storebranchUID":' + this.bstorebranchUID[i] + ', "storeUID":' + this.bstoreUID[i]
        } else {
          arrayString += ', "storebranchUID":"", "storeUID":""';
        }
        arrayString += '}';
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
    myFormData.append('storebranchUID', this.storebranchUID);
    myFormData.append('storeUID', this.storeUID);
    myFormData.append('branchArray', arrayString);
    console.log(this.form);
    console.log(this.filedata);
    this.http.post<any>(this.apiURL + '/api/updatestore', myFormData)
     .subscribe(data => {
       document.getElementById('text').style.display = 'none';
       if (data.return_code == 0) {
        this.successMessage = 'Store Edited Successfully !';
        document.getElementById('info_success').style.display = 'block';
        setTimeout(() => {
          this.close1();
        }, this.redirectSecounds);
       }
       else{
        this.successMessage = data.errors[0];
        this.clicked = false;
        document.getElementById('info_alert').style.display = 'block';
       }
     });
  }

}

