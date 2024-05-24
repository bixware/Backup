import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-addcustomercomplaints',
  templateUrl: './addcustomercomplaints.component.html',
  styleUrls: ['./addcustomercomplaints.component.css']
})
export class AddcustomercomplaintsComponent implements OnInit, AfterViewInit {

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
  constructor(private router: Router, private http: HttpClient, private location: Location, public fb: FormBuilder, @Inject(DOCUMENT) private doc: Document) {
    this.apiURL = environment.apiURL;
    this.form = this.fb.group({
    StyleCode: ['', Validators.required],
    ReceiptDate: [''],
    Product: [''],
    From: [''],
    Sleeve: [''],
    Size: ['', Validators.required],
   // GarmentColor: [''],
    FabricCode: [''],
    CustomerName: ['', Validators.required],
    Address: ['', Validators.required],
    City: ['', Validators.required],
    Pincode: ['', [Validators.required, Validators.pattern("^[1-9][0-9]{5}$")]],
    Mobile: ['', [Validators.required, Validators.pattern(/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/)]],
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
        this.form.get('GarmentMRP').disable();
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

  confirm(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    $('#confirmpopup').css('display', 'block');
  }

  ok(): void {
    $('#confirmpopup').css('display', 'none');
    this.apiFlag = true;
    this.form.get('ReceiptDate').enable();
    this.form.get('Product').enable();
    this.form.get('FabricCode').enable();
    this.form.get('GarmentMRP').enable();
    const myFormData = new FormData();
    myFormData.append('userName', localStorage.getItem('userName'));
    myFormData.append('Stylecode', this.form.value.StyleCode);
    myFormData.append('ReceiptDate', this.form.value.ReceiptDate.split('-').reverse().join('-'));
    myFormData.append('product', this.form.value.Product);
    myFormData.append('from', this.form.value.From);
    myFormData.append('Sleeve', this.form.value.Sleeve);
    myFormData.append('size', this.form.value.Size);
    //myFormData.append('GarmentColor', this.form.value.GarmentColor);
    myFormData.append('FabricCode', this.form.value.FabricCode);
    myFormData.append('cusName', this.form.value.CustomerName);
    myFormData.append('cusAddress', this.form.value.Address);
    myFormData.append('cusCity', this.form.value.City);
    myFormData.append('custPin', this.form.value.Pincode);
    myFormData.append('cusMobile', this.form.value.Mobile);
    myFormData.append('cusPhone', this.form.value.Phone);
    myFormData.append('cusMail', this.form.value.Email);
    myFormData.append('cusComments', this.form.value.CustomerComments);
    myFormData.append('BillNo', this.form.value.BillNo);
    myFormData.append('BillDate', this.form.value.BillDate.split('-').reverse().join('-'));
    myFormData.append('GarmentMRP', this.form.value.GarmentMRP);
    myFormData.append('NoofWashes', this.form.value.Noofwashes);
    myFormData.append('CCAComments', this.form.value.CCAComments);
    myFormData.append('storeContactPerson', this.form.value.StoreContactPersonname);
    myFormData.append('storePhone', this.form.value.StoreContactNo);
    /*myFormData.forEach((value,key) => {
    console.log(key+value)
    });*/
    this.http.post<any>(this.apiURL + '/api/addcusqccomplaint', myFormData)
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
    this.router.navigate(['home/customer-complain']);
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
