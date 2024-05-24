import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-addcuscomplaints',
  templateUrl: './addcuscomplaints.component.html',
  styleUrls: ['./addcuscomplaints.component.css']
})
export class AddcuscomplaintsComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  submitted: any;
  vendors: any;
  factory: any;
  defects: any;
  defecttype: any;
  vendorCodeList: any;
  vendorNameList: any;
  factoryNameList: any;
  factoryCodeList: any;
  storeCodeList : any;
  storeNameList : any;
  productList: any;
  defectList: any; 
  defectTypeList: any;
  stylecodedata = {
    stylecode : ''
  };
  apiFlag: any;
  errorFlag: any;
  sleeveList: any;
  sizeList: any;
  showRed: any;
  serialNo: any;
  currentDate: any;
  apiURL: any;
  customFlag: any;
  constructor(private router: Router, private http: HttpClient, public fb: FormBuilder, @Inject(DOCUMENT) private doc: Document) {
    this.apiURL = environment.apiURL;
    this.form = this.fb.group({
      Product: [''],
      LRNo: ['', Validators.required],
      ReceiptDate: [''],
      Frm:[''],
      StoreCode:['0'],
      StoreName:['0'],
      StyleCode:['', Validators.required],
      Size:['', Validators.required],
      Sleeve:[''],
      FabricCode:[''],
      ProductCategory: [''],
      GarmentColor:[''],
      ManufactureMonth: ['', Validators.required],
      ManufactureYear: ['', Validators.required],
      VendorCode: ['0', Validators.required],
      VendorName: ['0', Validators.required],
      FactoryCode: ['0', Validators.required],
      FactoryName: ['0', Validators.required],
      GarmentType: ['', Validators.required],
      GarmentCondition: ['', Validators.required],
      SoldUnsold: ['', Validators.required],
      SaleableUnsaleable: ['', Validators.required],
      Quality: ['', Validators.required],
      Justification: ['', Validators.required],
      Defect: ['', Validators.required],
      DefectType: ['', Validators.required],
      Remarks: [''],
      DefectAnalysis: ['', Validators.required],
      CustomerName: ['', Validators.required],
      Address: ['', Validators.required],
      City: ['', Validators.required],
      Pincode: ['', [Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]],
      Mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[6-9][0-9]{9}$")]],
      Email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.com)+$/)]],
      CustomerComments: ['', Validators.required],
      BillNo: [''],
      BillDate: [''],
      GarmentMRP: [''],
      Noofwashes: [''],
      CCAComments: ['', Validators.required],
    });
   }

   get f(): any { return this.form.controls; }

   onBlur()  {
    this.errorFlag = false;
    if (this.form.value.StyleCode == '' ) {
    return;
    }
    this.stylecodedata.stylecode = this.form.value.StyleCode;
    this.http.post<any>(this.apiURL + '/api/getfabriccodebystyleCode', this.stylecodedata)
    .subscribe(data => {
      if (data.return_code == 0) {
        this.sleeveList = data.fabricDetails.HFInd;
        if (this.sleeveList.length > 0) {
          this.form.get('Sleeve').setValidators([Validators.required]);
          this.showRed = true;
          this.form.get('Sleeve').updateValueAndValidity();
        }
        else {
          this.form.get('Sleeve').setValidators([]);
          this.form.patchValue({
            Sleeve: ''
          });
          this.showRed = false;
          this.form.get('Sleeve').updateValueAndValidity();
        }
        this.sizeList = data.fabricDetails.Size;
        this.form.patchValue({
          FabricCode: data.fabricDetails.FabricCode,
          GarmentMRP: data.fabricDetails.GarmentMRP,
          Product: data.fabricDetails.Product
        });
        this.form.get('Product').disable();
        this.form.get('FabricCode').disable();
      }
      else {
        this.errorFlag = true;
        this.showRed = false;
        this.sleeveList = [];
        this.sizeList = [];
        this.form.patchValue({
          FabricCode: '',
          GarmentMRP: '',
          Product: ''
        });
      }
    });
  }

  ngOnInit(): void {
    this.submitted = false;
    this.errorFlag = false;
    this.apiFlag = false;
    this.customFlag = false;
    this.sleeveList = [];
    this.sizeList = [];
    this.showRed = false;
    this.vendorCodeList = [];
    this.vendorNameList = [];
    this.factoryNameList = [];
    this.factoryCodeList = [];
    this.storeCodeList = [];
    this.storeNameList = [];
    this.defectList = [];
    this.defectTypeList = [];
    this.productList = [];
    this.getvendor();
    this.getfactory();
    this.getdefect();
    this.getdefecttype();
    this.getstore();
    this.getproduct();
    this.currentDate = this.formatDate(new Date());
    this.form.patchValue({
      ReceiptDate: this.currentDate
    });
    this.form.get('ReceiptDate').disable();
  }

  confirm(): void{
    this.submitted = true;
//vendorFlag
if (this.form.value.VendorCode == 0 ||  this.form.value.VendorName == 0){
  this.customFlag = true;
  return;
}
else{
  this.customFlag = false;
}
//factoryFlag
if (this.form.value.FactoryCode == 0 ||  this.form.value.FactoryName == 0){
  this.customFlag = true;
  return;
}
else{
  this.customFlag = false;
}

    if (this.form.invalid) {
      return;
    }
    $('#confirmpopup').css('display', 'block');
  }

  ok(): void{
    $('#confirmpopup').css('display', 'none');
    this.apiFlag = true;
    this.form.get('ReceiptDate').enable();
    this.form.get('Product').enable();
    this.form.get('FabricCode').enable();
    const myFormData = new FormData();
    myFormData.append('userName', localStorage.getItem('userName'));
    myFormData.append('Products', this.form.value.Product);
    myFormData.append('LRNo', this.form.value.LRNo);
    myFormData.append('ReceiptDate', this.form.value.ReceiptDate);
    myFormData.append('From', this.form.value.Frm);
    myFormData.append('StoreCode', this.form.value.StoreCode);
    myFormData.append('Storecode', this.form.value.StoreName);
    myFormData.append('Stylecode', this.form.value.StyleCode);
    myFormData.append('size', this.form.value.Size);
    myFormData.append('Sleeve', this.form.value.Sleeve);
    myFormData.append('FabricCode', this.form.value.FabricCode);
    myFormData.append('cusName', this.form.value.CustomerName);
    myFormData.append('cusAddress', this.form.value.Address);
    myFormData.append('cusCity', this.form.value.City);
    myFormData.append('custPin', this.form.value.Pincode);
    myFormData.append('cusMobile', this.form.value.Mobile);
    myFormData.append('BillNo', this.form.value.BillNo);
    myFormData.append('BillDate', this.form.value.BillDate);
    myFormData.append('GarmentMRP', this.form.value.GarmentMRP);
    myFormData.append('NoofWashes', this.form.value.Noofwashes);
    myFormData.append('CCAComments', this.form.value.CCAComments);
    myFormData.append('cusMail', this.form.value.Email);
    myFormData.append('cusComments', this.form.value.CustomerComments);
    myFormData.append('ProductCategory', this.form.value.ProductCategory);
    myFormData.append('GarmentColor', this.form.value.GarmentColor);
    myFormData.append('ManufactureMonth', this.form.value.ManufactureMonth);
    myFormData.append('ManufactureYear', this.form.value.ManufactureYear);
    myFormData.append('VendorCode', this.form.value.VendorCode);
    myFormData.append('VendorName', this.form.value.VendorName);
    myFormData.append('FactoryCode', this.form.value.FactoryCode);
    myFormData.append('FactoryName', this.form.value.FactoryName);
    myFormData.append('GarmentType', this.form.value.GarmentType);
    myFormData.append('GarmentCondition', this.form.value.GarmentCondition);
    myFormData.append('SoldUnsold', this.form.value.SoldUnsold);
    myFormData.append('SaleableUnsaleable', this.form.value.SaleableUnsaleable);
    myFormData.append('Quality', this.form.value.Quality);
    myFormData.append('Justification', this.form.value.Justification);
    myFormData.append('Defect', this.form.value.Defect);
    myFormData.append('DefectType', this.form.value.DefectType);
    myFormData.append('Remarks', this.form.value.Remarks);
    myFormData.append('DefectAnalysis', this.form.value.DefectAnalysis);
    console.log(this.form);
  /*  myFormData.forEach((value,key) => {
      console.log(key+value)
       });*/
    this.http.post<any>(this.apiURL + '/api/addqccomplaint', myFormData)
     .subscribe(data => {
      if (data.return_code == 0) {
      /* this.router.navigate(['home/qccustomercomplaints']);*/
      $('#myModal').css('display', 'block');
      this.serialNo = data.serialNo;
      }
    });
  }

  formatDate(date): any {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  closeModals(): void {
    $('#confirmpopup').css('display', 'none');
  }

 closeModal(): void {
    $('#myModal').css('display', 'none');
    this.doc.defaultView.location.reload();
  }


  //API dropdown list
  getvendor(): void {
    this.http.post<any>(this.apiURL + '/api/getvendorlist', {})
      .subscribe(data => {
        this.vendorCodeList = (data as any).vendorCodeList;
        this.vendorNameList = (data as any).vendorNameList;
       // console.log(this.vendorList);
      });
  }

  getfactory(): void {
    this.http.post<any>(this.apiURL + '/api/getfactorylist', {})
      .subscribe(data => {
        this.factoryCodeList = (data as any).factoryCodeList;
        this.factoryNameList = (data as any).factoryNameList;

        // console.log(this.factoryList);
      });
  }
  
  getstore(): void {
    this.http.post<any>(this.apiURL + '/api/getstorelist', {})
      .subscribe(data => {
        this.storeCodeList = (data as any).storeCodeList;
        this.storeNameList = (data as any).storeNameList;
        
       // console.log(this.storelist); 
        });
    }

  getdefect(): void {
    this.http.post<any>(this.apiURL + '/api/getdefectlist', {})
      .subscribe(data => {
        this.defectList = (data as any).defectList;
        // console.log(this.defectList);
      });
  }
  getdefecttype(): void {
    this.http.post<any>(this.apiURL + '/api/getdefecttypelist', {})
      .subscribe(data => {
        this.defectTypeList = (data as any).defectTypeList;
        // console.log(this.defectTypeList); 
        });
    }

  getproduct(): void {
        this.http.post<any>(this.apiURL + '/api/getproductcategorylist', {})
          .subscribe(data => {
            this.productList = (data as any).productList;
           // console.log(this.vendorList);
          });
      }

// dropdown patch
vendorlist(evt): void{
  if(evt.target.value == 0){
    this.form.patchValue({
      VendorName:'0',
      });
  }
  this.form.patchValue({
    VendorName:this.vendorNameList[evt.target.value-1],
   });
//console.log(evt.target.value)
// $('#val_vendorname').val(evt.target.value) // they all change
}

vendorname(evt): void{

if(evt.target.value == 0){
  this.form.patchValue({
    VendorCode:'0',
    });
}
else{
  this.form.patchValue({
    VendorCode:evt.target.selectedIndex,
  });
}
//console.log(evt.target.value)
//$('#val_vendorcode').val(evt.target.value) // they all change
}

getfactorycode(evt): void{
if(evt.target.value == 0){
  this.form.patchValue({
    FactoryName:'0',
    });
}
else{
this.form.patchValue({
  FactoryName:this.factoryNameList[evt.target.value-1],
  });
}
//console.log(evt.target.value)
//$('#val_factoryname').val(evt.target.value) // they all change
}
getfactoryname(evt): void{
if(evt.target.value == 0){
  this.form.patchValue({
    FactoryCode:'0',
    });
}
else{
  this.form.patchValue({
  FactoryCode:evt.target.selectedIndex,
  });
}
//console.log(evt.target.selectedIndex)
//$('#val_factorycode').val(evt.target.value) // they all change
}
    
getstorecode(evt): void{
  if(evt.target.value == 0){
    this.form.patchValue({
      StoreName:'0',
      });
  }
  else{
    this.form.patchValue({
      StoreName:this.storeNameList [evt.target.selectedIndex-1],
      });
  }
  
}

getstorename(evt): void{
  if(evt.target.value == 0){
    this.form.patchValue({
      StoreCode:'0',
      });
    }
  else{
    this.form.patchValue({
      StoreCode:this.storeCodeList [evt.target.selectedIndex-1],
      });
    }
  }
  
  getdropdownlist(): void{
    if (this.form.value.GarmentCondition == 'Used'){
      this.form.patchValue({
        SoldUnsold: 'Sold',
        SaleableUnsaleable: 'Unsaleable',
        Quality: 'Third'
      });}
    else{
    this.form.value.GarmentCondition != 'Used';
    this.form.patchValue({
      SoldUnsold: 'Unsold',
      SaleableUnsaleable: 'Saleable',
      Quality: 'Second'
    });}
  
  }

  ngAfterViewInit(): void {
    $(document).ready(function() {
      setTimeout(() => {
        if (!$('.nav-toggle').hasClass('nav-toggle--active')) {
          $('#page-content').css('margin-left', '0px');
        }
      }, 333);
    });
  }
}