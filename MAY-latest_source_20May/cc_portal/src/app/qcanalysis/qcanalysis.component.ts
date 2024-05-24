import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-qcanalysis',
  templateUrl: './qcanalysis.component.html',
  styleUrls: ['./qcanalysis.component.css']
})
export class QcanalysisComponent implements OnInit, AfterViewInit { 
  form: FormGroup;
  clicked: any;
  successMessage: any;
  submitted: any;
  vendors: any;
  factory: any;
  defects: any;
  defecttype: any;
  vendorCodeList: any;
  vendorNameList: any;
  factoryNameList: any;
  factoryCodeList: any;
  productList: any;
  defectList: any;
  defectTypeList: any;
  errorFlag: any;
  apiURL:any;
  currentDate: any;
  customFlag1: any;
  customFlag2: any;
  stylecodedata = {
    stylecode : ''
  };
  analysis = {
    SerialNo: ''
    };
  constructor(private router: Router, private http: HttpClient, private location: Location, public fb: FormBuilder, private route: ActivatedRoute) {
    this.apiURL = environment.apiURL;
    this.form = this.fb.group({
      ReceiptDate: ['', Validators.required],
      StyleCode: [''],
      Size: [''],
      ProductCategory: [''],
      Fabric: [''],
      ManufactureMonth: ['', Validators.required],
      ManufactureYear: ['', Validators.required],
      VendorCode: ['Code', Validators.required],
      VendorName: ['Vendor Name', Validators.required],
      FactoryCode: ['Code', Validators.required],
      FactoryName: ['Factory Name', Validators.required],
      GarmentType: ['', Validators.required],
      GarmentCondition: ['', Validators.required],
      SoldUnsold: ['', Validators.required],
      SaleableUnsaleable: ['', Validators.required],
      Quality: ['', Validators.required],
      Justification: ['', Validators.required],
      Defect: ['', Validators.required],
      DefectType: ['', Validators.required],
      Remarks: [''],
      DefectAnalysis: ['', Validators.required]
    });
  }  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.analysis.SerialNo = params['id'];
    });
    this.http.post<any>(this.apiURL + '/api/gettakeinwards', this.analysis)
      .subscribe(data => {
       console.log(data);
       if (data.return_code == 0) {
        this.form.patchValue({
          SerialNo: data.serialNoDetails[0].SerialNo != null ? data.serialNoDetails[0].SerialNo : '',
          ReceiptDate: data.serialNoDetails[0].ReceiptDate != null ? this.formatDate(data.serialNoDetails[0].ReceiptDate.substring(0, 10)) : '',
          StyleCode: data.serialNoDetails[0].Stylecode != null ? data.serialNoDetails[0].Stylecode : '',
          Size: data.serialNoDetails[0].size != null ? data.serialNoDetails[0].size : '',
          Fabric: data.serialNoDetails[0].FabricCode != null ? data.serialNoDetails[0].FabricCode : ''
        });
       }
      });
      this.currentDate = this.formatDate(new Date());
      this.form.patchValue({
        ReceiptDate: this.currentDate
      });
      this.form.get('ReceiptDate').disable();
      this.vendorCodeList = [];
      this.vendorNameList = [];
      this.factoryNameList = [];
      this.factoryCodeList = [];
    this.defectList = [];
    this.defectTypeList = [];
    this.productList = [];
    this.submitted = false;
    this.getvendor();
    this.getproduct();
    this.getfactory();
    this.getdefect();
    this.getdefecttype();
    this.customFlag1 = false;
    this.customFlag2 = false;
  }

  get f(): any { return this.form.controls; }
  
  formatDate(date): any {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  
  back(): void{
    this.router.navigate(['home/qccustomercomplaints']);
  }

 confirm(): void{
  this.submitted = true;
  this.form.get('ReceiptDate').enable();
   //vendorFlag
   if (this.form.value.VendorCode == 'Code' ||  this.form.value.VendorName == 'Vendor Name'){
    this.customFlag1 = true;
  }
  else{
    this.customFlag1 = false;
  }
  //factoryFlag
  if (this.form.value.FactoryCode == 'Code' ||  this.form.value.FactoryName == 'Factory Name'){
    this.customFlag2 = true;
  }
  else{
    this.customFlag2 = false;
  }
  if (this.form.invalid || this.customFlag1 == true || this.customFlag2 == true) {
    return;
  }
  const myFormData = new FormData();
    myFormData.append('userName', localStorage.getItem('userName'));
    myFormData.append('SerialNo', this.analysis.SerialNo);
    myFormData.append('ReceiptDate', this.form.value.ReceiptDate.split('-').reverse().join('-'));
    myFormData.append('StyleCode', this.form.value.StyleCode);
    myFormData.append('Size', this.form.value.Size);
    myFormData.append('ProductCategory', this.form.value.ProductCategory);
    myFormData.append('Fabric', this.form.value.Fabric);
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
    /*myFormData.forEach((value,key) => {
      console.log(key+value)
       });*/
       this.http.post<any>(this.apiURL + '/api/addcomplaintanalysis', myFormData)
       .subscribe(data => {
       if (data.return_code == 0) {
         this.router.navigate(['home/qccustomercomplaints']);
       }
     });
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


getproduct(): void {
  this.http.post<any>(this.apiURL + '/api/getproductcategorylist', {})
    .subscribe(data => {
      this.productList = (data as any).productList;
     // console.log(this.vendorList);
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

// dropdown patch
vendorlist(evt): void{
  if (this.form.value.VendorCode == 'Code'){
    this.customFlag1 = true;
  } else {
    this.customFlag1 = false;
  }
  this.form.patchValue({
    VendorName:this.vendorNameList[evt.target.selectedIndex],
   });
}

vendorname(evt): void {
  if (this.form.value.VendorName == 'Vendor Name'){
    this.customFlag1 = true;
  } else {
    this.customFlag1 = false;
  }
  this.form.patchValue({
      VendorCode:this.vendorCodeList[evt.target.selectedIndex],
  });
}

getfactorycode(evt): void{
  if (this.form.value.FactoryCode == 'Code'){
    this.customFlag2 = true;
  } else {
    this.customFlag2 = false;
  }
  this.form.patchValue({
    FactoryName:this.factoryNameList[evt.target.selectedIndex],
  });
}
getfactoryname(evt): void{
  if (this.form.value.FactoryName == 'Factory Name'){
    this.customFlag2 = true;
  } else {
    this.customFlag2 = false;
  }
  this.form.patchValue({
    FactoryCode:this.factoryCodeList[evt.target.selectedIndex],
  });
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
      $('.input-datepicker').datepicker();
      setTimeout(() => {
        if (!$('.nav-toggle').hasClass('nav-toggle--active')) {
          $('#page-content').css('margin-left', '0px');
        }
      }, 333);
    }); 

}
 
}
