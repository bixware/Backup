import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
declare var $: any;

@Component({
  selector: 'app-bulk-returns',
  templateUrl: './bulk-returns.component.html',
  styleUrls: ['./bulk-returns.component.css']
})
export class BulkReturnsComponent implements OnInit, AfterViewInit {
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
  currentDate: any;
  serialNo:any;
  apiURL:any;
  customFlag1: any;
  customFlag2: any;
  customFlag3: any;
  constructor(private router: Router, private http: HttpClient, private location: Location, public fb: FormBuilder, @Inject(DOCUMENT) private doc: Document) {
    this.apiURL = environment.apiURL;
    this.form = this.fb.group({
      Product: [''],
      LRNo: ['', Validators.required],
      ReceiptDate: [''],
      Frm:['Bulk'],
      StoreCode:['Code',  Validators.required],
      StoreName:['Store Name',  Validators.required],
      StyleCode:['', Validators.required],
      Size:[''],
      Sleeve:[''],
      FabricCode:[''],
      ProductCategory: ['',  Validators.required],
      //GarmentColor:[''],
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
      GarmentMRP: [''],
      Justification: ['', Validators.required],
      Defect: ['', Validators.required],
      DefectType: ['', Validators.required],
      Remarks: [''], 
      DefectAnalysis: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.submitted = false;
    this.errorFlag = false;
    this.apiFlag = false;
    this.customFlag1 = false;
    this.customFlag2 = false;
    this.customFlag3 = false;
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
  get f(): any { return this.form.controls; }

  onBlur()  {
    this.errorFlag = false;
    if (this.form.value.StyleCode == '' ) {
      this.form.patchValue({
        FabricCode: '',
        GarmentMRP: '',
        Product: ''
      });
    return;
    }
    this.stylecodedata.stylecode = this.form.value.StyleCode;
    this.http.post<any>(this.apiURL + '/api/getfabriccodebystyleCode', this.stylecodedata)
    .subscribe(data => {
      if (data.return_code == 0) {
        if(data.F2 == '1') {          
          this.showRed = false;
          this.form.patchValue({
            GarmentMRP: data.productDetails.GarmentMRP,
            FabricCode: '',
            Product: data.productDetails.Product,
            Sleeve: '',
            Size: ''
          });
          this.form.get('Sleeve').setValidators([]);
          this.form.get('Size').setValidators([]);
          this.form.get('Sleeve').updateValueAndValidity();
          this.form.get('Size').updateValueAndValidity();
          this.form.get('Sleeve').disable();
          this.form.get('Size').disable();
          this.form.get('Product').disable();
          this.form.get('FabricCode').disable();
          this.form.get('GarmentMRP').disable();
        } else {
          this.sleeveList = data.fabricDetails.HFInd;
          this.form.get('Sleeve').enable();
          this.form.get('Size').enable();
          this.form.get('Product').enable();
          this.form.get('FabricCode').enable();
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
          this.form.get('Size').setValidators([Validators.required]);
          this.form.get('Size').updateValueAndValidity();
          this.form.patchValue({
            FabricCode: data.fabricDetails.FabricCode,
            GarmentMRP: data.fabricDetails.GarmentMRP,
            Product: data.fabricDetails.Product
          });
          this.form.get('Product').disable();
          this.form.get('FabricCode').disable();
          this.form.get('GarmentMRP').disable();
        }
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
  formatDate(date): any {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }
  confirm(): void{
    this.submitted = true;
    //storeFlag
    if (this.form.value.StoreCode == 'Code' ||  this.form.value.StoreName == 'Store Name'){
      this.customFlag1 = true;
    }
    else{
      this.customFlag1 = false;
    }
    //vendorFlag
    if (this.form.value.VendorCode == 'Code' ||  this.form.value.VendorName == 'Vendor Name'){
      this.customFlag2 = true;
    }
    else{
      this.customFlag2 = false;
    }
    //factoryFlag
    if (this.form.value.FactoryCode == 'Code' ||  this.form.value.FactoryName == 'Factory Name'){
      this.customFlag3 = true;
    }
    else{
      this.customFlag3 = false;
    }
    if (this.form.invalid || this.customFlag1 == true || this.customFlag2 == true || this.customFlag3 == true) {
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
    this.form.get('GarmentMRP').enable();
    this.form.get('Sleeve').enable();
    this.form.get('Size').enable();
    const myFormData = new FormData();
    myFormData.append('userName', localStorage.getItem('userName'));
    myFormData.append('Products', this.form.value.Product);
    myFormData.append('LRNo', this.form.value.LRNo);
    myFormData.append('ReceiptDate', this.form.value.ReceiptDate.split('-').reverse().join('-'));
    myFormData.append('From', this.form.value.Frm);
    myFormData.append('StoreCode', this.form.value.StoreCode);
    myFormData.append('StoreName',  this.form.value.StoreName);
    myFormData.append('StyleCode', this.form.value.StyleCode);
    myFormData.append('Size', this.form.value.Size);
    myFormData.append('Sleeve', this.form.value.Sleeve);
    myFormData.append('FabricCode', this.form.value.FabricCode);
    myFormData.append('ProductCategory', this.form.value.ProductCategory);
   // myFormData.append('GarmentColor', this.form.value.GarmentColor);
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
    myFormData.append('GarmentMRP', this.form.value.GarmentMRP);
    myFormData.append('Justification', this.form.value.Justification);
    myFormData.append('Defect', this.form.value.Defect);
    myFormData.append('DefectType', this.form.value.DefectType);
    myFormData.append('Remarks', this.form.value.Remarks);
    myFormData.append('DefectAnalysis', this.form.value.DefectAnalysis);
    /*console.log(this.form);
    myFormData.forEach((value,key) => {
      console.log(key+value)
       });*/
    this.http.post<any>(this.apiURL + '/api/addbulkcomplaint', myFormData)
     .subscribe(data => {
      if (data.return_code == 0) {
       /* this.router.navigate(['home/qccustomercomplaints']);*/
       $('#myModal').css('display', 'block');
       this.serialNo = data.serialNo;
      }
    });
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
      if (this.form.value.VendorCode == 'Code'){
        this.customFlag2 = true;
      } else {
        this.customFlag2 = false;
      }
      this.form.patchValue({
        VendorName:this.vendorNameList[evt.target.selectedIndex],
       });
   }

   vendorname(evt): void {
    if (this.form.value.VendorName == 'Vendor Name'){
      this.customFlag2 = true;
    } else {
      this.customFlag2 = false;
    }
    this.form.patchValue({
        VendorCode:this.vendorCodeList[evt.target.selectedIndex],
    });
  }

  getfactorycode(evt): void {
    if (this.form.value.FactoryCode == 'Code'){
      this.customFlag3 = true;
    } else {
      this.customFlag3 = false;
    }
    this.form.patchValue({
      FactoryName:this.factoryNameList[evt.target.selectedIndex],
    });
  }
  getfactoryname(evt): void{
    if (this.form.value.FactoryName == 'Factory Name'){
      this.customFlag3 = true;
    } else {
      this.customFlag3 = false;
    }
      this.form.patchValue({
      FactoryCode:this.factoryCodeList[evt.target.selectedIndex],
      });
  }
    
  getstorecode(evt): void{
    if (this.form.value.StoreCode == 'Code'){
      this.customFlag1 = true;
    } else {
      this.customFlag1 = false;
    }
       this.form.patchValue({
          StoreName:this.storeNameList[evt.target.selectedIndex],
          });      
    }
  
    getstorename(evt): void{
      if (this.form.value.StoreName == 'Store Name'){
        this.customFlag1 = true;
      }
      else {
        this.customFlag1 = false;
      }
        this.form.patchValue({
          StoreCode:this.storeCodeList[evt.target.selectedIndex],
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
      setTimeout(() => {
        if (!$('.nav-toggle').hasClass('nav-toggle--active')) {
          $('#page-content').css('margin-left', '0px');
        }
      }, 333);
    });
  }

}



