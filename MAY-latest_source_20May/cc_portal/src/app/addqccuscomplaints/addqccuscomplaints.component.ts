import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-addqccuscomplaints',
  templateUrl: './addqccuscomplaints.component.html',
  styleUrls: ['./addqccuscomplaints.component.css']
})
export class AddqccuscomplaintsComponent implements OnInit, AfterViewInit {

  form: FormGroup;
  submitted: any;
  stylecodedata = {
    stylecode : ''
  };
  fabricDetails: any;
  errorFlag: any;
  apiFlag: any;
  sleeveList: any;
  sizeList: any;
  showRed: any;
  serialNo: any;
  currentDate: any;
  apiURL: any;
  storeCodeList : any;
  storeNameList : any;
  customFlag1: any;
  mandatoryFileFlag: any;
  errorFileFlag: any;
  //filedata: any;
  errorMsg: any;
  //errorInvoiceFlag: any;
  constructor(private router: Router, private http: HttpClient, private location: Location, public fb: FormBuilder, @Inject(DOCUMENT) private doc: Document) {
    this.apiURL = environment.apiURL;
    this.form = this.fb.group({
    StyleCode: ['', Validators.required],
    ReceiptDate: [''],
    Product: [''],
    From: [''],
    Sleeve: [''],
    Size: [''],
   // GarmentColor: [''],
    FabricCode: [''],
    StoreCode:['Code',  Validators.required],
    StoreName:['Store Name',  Validators.required],
    CustomerName: ['', Validators.required],
    Address: ['', Validators.required],
    City: ['', Validators.required],
    Pincode: ['', [Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]],
    Mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[6-9][0-9]{9}$")]],
    Phone: [''],
    Email: ['', [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.com)+$/)]],
    CustomerComments: ['', Validators.required],
    BillNo: [''],
    BillDate: [''],
    GarmentMRP: [''],
    Noofwashes: [''],
    CCAComments: ['', Validators.required],
    StoreContactPersonname: ['', Validators.required],
    StoreContactNo: ['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]]
  });
  }

  ngOnInit(): void {
    this.submitted = false;
    this.errorFileFlag = false;
    //this.errorInvoiceFlag = false;
    this.mandatoryFileFlag = false;
    this.errorFlag = false;
    this.apiFlag = false;
    this.sleeveList = [];
    this.sizeList = [];
    this.showRed = false;
    this.currentDate = this.formatDate(new Date());
    this.form.patchValue({
      ReceiptDate: this.currentDate
    });
    this.form.get('ReceiptDate').disable();
    this.storeCodeList = [];
    this.storeNameList = [];
    this.getstore();
    this.customFlag1 = false;
  }

  get f(): any { return this.form.controls; }

  onBlur() {
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
      } else {
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

  onFromChange(evt: any): any {    
    if(evt.target.value == 'EcommerceMarketPlace' || evt.target.value == 'BrandWebsite')
    {
      this.mandatoryFileFlag = true;
    } else {
      this.mandatoryFileFlag = false;
      this.errorFileFlag = false;
      //this.filedata = '';
    }
  }

  /*onFileChange(evt: any): any {
    this.errorFileFlag = false;
    this.filedata = evt.target.files[0];
    const validExts = new Array('.pdf', '.jpg','.gif','.jpeg','.png');
    let fileExt = evt.target.files[0].name;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
      $('#upload').val('');
      this.errorMsg = 'Please upload image/pdf file only';
      this.errorFileFlag = true;
      this.filedata = '';
    }
  }*/

  formatDate(date): any {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [year, month, day].join('-');
  }

  confirm(): void {
    this.submitted = true;
    if (this.form.value.StoreCode == 'Code' ||  this.form.value.StoreName == 'Store Name'){
      this.customFlag1 = true;
    }
    else{
      this.customFlag1 = false;
    } 
    if (this.form.invalid || this.customFlag1 == true) {
      return;
    }
    /*if(this.form.value.InvoiceValue > this.form.value.GarmentMRP)
    {
      this.errorInvoiceFlag = true;
      this.errorMsg = 'Invoice Value should be equal or less than the Garmet MRP';
    } else {
      this.errorInvoiceFlag = false;
    }
    if(this.errorInvoiceFlag == true) {
      return;
    }
    if(this.mandatoryFileFlag == true) {
      if(this.filedata == '' || this.filedata == undefined) {
        this.errorMsg = 'Please upload/re-upload invoice copy';
        this.errorFileFlag = true;
        return;
      }
    }*/
    $('#confirmpopup').css('display', 'block');
  }

  ok(): void {
    $('#confirmpopup').css('display', 'none');
    this.apiFlag = true;
    this.form.get('ReceiptDate').enable();
    this.form.get('Product').enable();
    this.form.get('FabricCode').enable();
    this.form.get('Sleeve').enable();
    this.form.get('Size').enable();
    this.form.get('GarmentMRP').enable();
    const myFormData = new FormData();
    myFormData.append('userName', localStorage.getItem('userName'));
    myFormData.append('Stylecode', this.form.value.StyleCode==null || this.form.value.StyleCode==undefined?'':this.form.value.StyleCode);
    myFormData.append('ReceiptDate', this.form.value.ReceiptDate.split('-').reverse().join('-'));
    myFormData.append('product', this.form.value.Product==null || this.form.value.Product==undefined?'':this.form.value.Product);
    myFormData.append('from', this.form.value.From==null || this.form.value.From==undefined?'':this.form.value.From);
    myFormData.append('StoreCode', this.form.value.StoreCode);
    myFormData.append('StoreName',  this.form.value.StoreName);
    myFormData.append('Sleeve', this.form.value.Sleeve==null || this.form.value.Sleeve==undefined?'':this.form.value.Sleeve);
    myFormData.append('size', this.form.value.Size==null || this.form.value.Size==undefined?'':this.form.value.Size);
    //myFormData.append('GarmentColor', this.form.value.GarmentColor);
    myFormData.append('FabricCode', this.form.value.FabricCode==null || this.form.value.FabricCode==undefined?'':this.form.value.FabricCode);
    myFormData.append('cusName', this.form.value.CustomerName==null || this.form.value.CustomerName==undefined?'':this.form.value.CustomerName);
    myFormData.append('cusAddress', this.form.value.Address==null || this.form.value.Address==undefined?'':this.form.value.Address);
    myFormData.append('cusCity', this.form.value.City==null || this.form.value.City==undefined?'':this.form.value.City);
    myFormData.append('custPin', this.form.value.Pincode==null || this.form.value.Pincode==undefined?'':this.form.value.Pincode);
    myFormData.append('cusMobile', this.form.value.Mobile==null || this.form.value.Mobile==undefined?'':this.form.value.Mobile);
    myFormData.append('cusPhone', this.form.value.Phone==null || this.form.value.Phone==undefined?'':this.form.value.Phone);
    myFormData.append('cusMail', this.form.value.Email==null || this.form.value.Email==undefined?'':this.form.value.Email);
    myFormData.append('cusComments', this.form.value.CustomerComments==null || this.form.value.CustomerComments==undefined?'':this.form.value.CustomerComments);
    myFormData.append('BillNo', this.form.value.BillNo==null || this.form.value.BillNo==undefined?'':this.form.value.BillNo);
    myFormData.append('BillDate', this.form.value.BillDate.split('-').reverse().join('-'));
    myFormData.append('GarmentMRP', this.form.value.GarmentMRP==null || this.form.value.GarmentMRP==undefined?'':this.form.value.GarmentMRP);
    //myFormData.append('InvoiceValue', this.form.value.InvoiceValue==null || this.form.value.InvoiceValue==undefined?'':this.form.value.InvoiceValue);
    myFormData.append('NoofWashes', this.form.value.Noofwashes==null || this.form.value.Noofwashes==undefined?'':this.form.value.Noofwashes);
    myFormData.append('CCAComments', this.form.value.CCAComments==null || this.form.value.CCAComments==undefined?'':this.form.value.CCAComments);
    myFormData.append('storeContactPerson', this.form.value.StoreContactPersonname==null || this.form.value.StoreContactPersonname==undefined?'':this.form.value.StoreContactPersonname);
    myFormData.append('storePhone', this.form.value.StoreContactNo==null || this.form.value.StoreContactNo==undefined?'':this.form.value.StoreContactNo);
    //myFormData.append('invoiceBillImage', this.filedata==null || this.filedata==undefined?'':this.filedata);
    /*myFormData.forEach((value,key) => {
    console.log(key+value)
    });*/
    this.http.post<any>(this.apiURL + '/api/addcomplaintbyqc', myFormData)
    .subscribe(data => {
      if (data.return_code == 0) {
      /* this.router.navigate(['home/customer-complain']);*/
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

  back(): void{
    this.router.navigate(['home/qccustomercomplaints']);
  }

  getstore(): void {
    this.http.post<any>(this.apiURL + '/api/getstorelist', {})
      .subscribe(data => {
        this.storeCodeList = (data as any).storeCodeList;
        this.storeNameList = (data as any).storeNameList;
        
       // console.log(this.storelist); 
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
