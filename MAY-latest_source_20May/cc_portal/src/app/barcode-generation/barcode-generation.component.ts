import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-barcode-generation',
  templateUrl: './barcode-generation.component.html',
  styleUrls: ['./barcode-generation.component.css']
})
export class BarcodeGenerationComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  reasonDetails:any;
  submitted: any;
  errorFlag: any;
  stylecodedata = {
    stylecode : ''
  };
  sleeveList: any;
  colorList: any;
  sizeList: any;
  apiURL: any;
  showRed: any;
  currentDate: any;
  f2Flag: any;
  f2RedFlag: any;
  constructor(private router: Router, private http: HttpClient, private location: Location, public fb: FormBuilder, private route: ActivatedRoute) {
    this.apiURL = environment.apiURL;
    this.form = this.fb.group({
      StyleCode: ['', Validators.required],
      Date: ['', Validators.required],
      Product: [''],
      Sleeve: [''],
      Color: [''],
      Size: [''],
      Quantity: ['', Validators.required],
      GarmentMRP: [''],
      Reason: ['', Validators.required]
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

  ngOnInit(): void {
    this.submitted = false;
    this.errorFlag = false;
    this.reasonDetails = [];
    this.sleeveList = [];
    this.colorList = [];
    this.sizeList = [];
    this.showRed = false;
    this.f2Flag = false;
    this.f2RedFlag = false;
    this.getreason();
    this.currentDate = this.formatDate(new Date());
    this.form.patchValue({
      Date: this.currentDate
    });
    this.form.get('Date').disable();
  }

  get f(): any { return this.form.controls; }

  onBlur() {
    this.errorFlag = false;
    if (this.form.value.StyleCode == '' ) {
      this.form.patchValue({
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
          this.form.get('Sleeve').disable();
          this.form.get('Sleeve').setValidators([]);          
          this.showRed = false;
          this.f2Flag = true;
          this.f2RedFlag = true;
          this.colorList = data.productDetails.ColorVal;
          this.form.patchValue({
            GarmentMRP: data.productDetails.GarmentMRP,
            Product: data.productDetails.Product,
            Size: ''
          });
          this.form.get('Size').setValidators([]);
          this.form.get('Size').updateValueAndValidity();
          this.form.get('Size').disable();
          this.form.get('Product').disable();
          this.form.get('Color').enable();
          if (this.colorList.length > 0) {
            this.form.get('Color').setValidators([Validators.required]);
            this.f2RedFlag = true;
            this.form.patchValue({
              Color: ''
            });
            this.form.get('Color').updateValueAndValidity();
          }
          else {
            this.form.get('Color').setValidators([]);
            this.form.patchValue({
              Color: ''
            });
            this.f2RedFlag = false;
            this.form.get('Color').updateValueAndValidity();
          }
        } else {
          this.form.get('Color').disable();
          this.form.get('Color').setValidators([]);
          this.f2Flag = false;
          this.showRed = true;
          this.sleeveList = data.fabricDetails.HFInd;
          this.form.get('Sleeve').enable();
          this.form.get('Size').enable();
          this.form.get('Product').enable();
          if (this.sleeveList.length > 0) {
            this.form.get('Sleeve').setValidators([Validators.required]);
            this.showRed = true;
            this.form.patchValue({
              Sleeve: ''
            });
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
          if (this.sizeList.length > 0) {
            this.form.get('Size').setValidators([Validators.required]);
            this.showRed = true;
            this.form.patchValue({
              Size: ''
            });
            this.form.get('Size').updateValueAndValidity();
          }
          else {
            this.form.get('Size').setValidators([]);
            this.form.patchValue({
              Size: ''
            });
            this.showRed = false;
            this.form.get('Size').updateValueAndValidity();
          }
          this.form.patchValue({
            GarmentMRP: data.fabricDetails.GarmentMRP,
            Product: data.fabricDetails.Product
          });
          this.form.get('Product').disable();
        }
      } else {
        this.errorFlag = true;
        this.showRed = false;
        this.f2Flag = false;
        this.f2RedFlag = false;
        this.sleeveList = [];
        this.sizeList = [];
        this.colorList = [];
        this.form.patchValue({
          GarmentMRP: '',
          Product: ''
        });
      }
    });
  }
  
  confirm(): void {
    this.submitted = true;
    this.form.get('Date').enable();
    if (this.form.invalid) {
      console.log(this.form.value);
      this.form.get('Date').disable();
      return;
    }
    this.form.get('Product').enable();
    this.form.get('Sleeve').enable();
    this.form.get('Size').enable();
    this.form.get('Color').enable();
    const myFormData = new FormData();
    myFormData.append('userName', localStorage.getItem('userName'));
    myFormData.append('StyleCode', this.form.value.StyleCode);
    myFormData.append('Date', this.form.value.Date.split('-').reverse().join('-'));
    myFormData.append('Products', this.form.value.Product);
    myFormData.append('Sleeve', this.form.value.Sleeve);
    myFormData.append('Color', this.form.value.Color);
    myFormData.append('Size', this.form.value.Size);
    myFormData.append('Quantity', this.form.value.Quantity);
    myFormData.append('GarmentMRP', this.form.value.GarmentMRP);
    myFormData.append('ReasonCode', this.form.value.Reason);
    /*myFormData.forEach((value,key) => {
      console.log(key+value)
       });*/
      this.http.post<any>(this.apiURL + '/api/insertrequestnewtag', myFormData)
       .subscribe(data => {
       if (data.return_code == 0) {
         this.router.navigate(['home/barcodereqdetails']);
       }
     });
  }

  //API dropdown list
  getreason(): void {
    this.http.post<any>(this.apiURL + '/api/getreason', {})
      .subscribe(data => {
        this.reasonDetails = (data as any).reasonDetails;
        console.log(this.reasonDetails);
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
