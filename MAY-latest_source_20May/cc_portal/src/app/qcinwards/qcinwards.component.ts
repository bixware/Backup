import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-qcinwards',
  templateUrl: './qcinwards.component.html',
  styleUrls: ['./qcinwards.component.css']
})
export class QcinwardsComponent implements OnInit, AfterViewInit {
  apiURL:any;
  form: FormGroup;
  currentDate: any;
  constructor(private router: Router,  private http: HttpClient, private location: Location, public fb: FormBuilder, private route: ActivatedRoute) { 
    this.apiURL = environment.apiURL;
    this.form = this.fb.group({
      ReceiptDate: [''],
      SerialNo: [''],
      StoreNo: [''],
      StoreName: [''],
      Stylecode: [''],
      Sleeve: [''],
      Size: [''],
      CustomerName: [''],
      CustomerMobile: [''],
      Address: [''],
      CustomerComments: [''],
      BillNo: [''],
      BillDate: [''],
      GarmentMRP: [''],
      Noofwashes: [''],
      CCAComments: [''],
      Couriername:[''],
      AirwayBillNo:[''],
      LRDate:[''],
      RejectionReason:['']
    });
  }
  inward = {
  SerialNo: ''
  };

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.inward.SerialNo = params['id'];
    });
    this.http.post<any>(this.apiURL + '/api/gettakeinwards', this.inward)
      .subscribe(data => {
       console.log(data);
       if (data.return_code == 0) {
        this.form.patchValue({
          ReceiptDate: data.serialNoDetails[0].ReceiptDate != null ? this.formatDate(data.serialNoDetails[0].ReceiptDate.substring(0, 10)) : '',
          SerialNo: data.serialNoDetails[0].SerialNo != null ? data.serialNoDetails[0].SerialNo : '',
          StoreNo: data.serialNoDetails[0].ShroomNo != null ? data.serialNoDetails[0].ShroomNo : '',
          StoreName: data.serialNoDetails[0].ShroomName != null ? data.serialNoDetails[0].ShroomName : '',
          Stylecode: data.serialNoDetails[0].Stylecode != null ? data.serialNoDetails[0].Stylecode : '',
          Sleeve: data.serialNoDetails[0].Sleeve != null ? data.serialNoDetails[0].Sleeve : '',
          Size: data.serialNoDetails[0].size != null ? data.serialNoDetails[0].size : '',
          CustomerName: data.serialNoDetails[0].cusName != null ? data.serialNoDetails[0].cusName : '',
          CustomerMobile: data.serialNoDetails[0].CustomerMobile != null ? data.serialNoDetails[0].CustomerMobile : '',
          Address: data.serialNoDetails[0].cusAddress != null ? data.serialNoDetails[0].cusAddress : '',
          CustomerComments: data.serialNoDetails[0].cusComments != null ? data.serialNoDetails[0].cusComments : '',
          BillNo: data.serialNoDetails[0].BillNo != null ? data.serialNoDetails[0].BillNo : '',
          BillDate: data.serialNoDetails[0].BillDate != null ? this.formatDate(data.serialNoDetails[0].BillDate.substring(0, 10)) : '',
          GarmentMRP: data.serialNoDetails[0].GarmentMRP != null ? data.serialNoDetails[0].GarmentMRP : '',
          Noofwashes: data.serialNoDetails[0].NoofWashes != null ? data.serialNoDetails[0].NoofWashes : '',
          CCAComments: data.serialNoDetails[0].CCAComments != null ? data.serialNoDetails[0].CCAComments : '',
          Couriername: data.serialNoDetails[0].CourierName != null ? data.serialNoDetails[0].CourierName : '',
          AirwayBillNo: data.serialNoDetails[0].AirwayBillNo != null ? data.serialNoDetails[0].AirwayBillNo  : '',
          LRDate: data.serialNoDetails[0].lrdate != null ? this.formatDate(data.serialNoDetails[0].lrdate.substring(0, 10)) : '',
          RejectionReason: data.serialNoDetails[0].RejectReason != null ? data.serialNoDetails[0].RejectionReason : ''
        });
       }
      });
      this.currentDate = this.formatDate(new Date());
      this.form.patchValue({
        ReceiptDate: this.currentDate
      });
      this.form.get('ReceiptDate').disable();
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

  confirminwards(): void{
    this.form.get('ReceiptDate').enable();
   const myFormData = new FormData();
    myFormData.append('userName', localStorage.getItem('userName'));
    myFormData.append('ReceiptDate', this.form.value.ReceiptDate.split('-').reverse().join('-'));
    myFormData.append('SerialNo', this.form.value.SerialNo);
    myFormData.append('StoreNo', this.form.value.StoreNo);
    myFormData.append('StoreName', this.form.value.StoreName);
    myFormData.append('Stylecode', this.form.value.Stylecode);
    myFormData.append('Sleeve', this.form.value.Sleeve);
    myFormData.append('Size', this.form.value.Size);
    myFormData.append('CustomerName', this.form.value.CustomerName);
    myFormData.append('Address', this.form.value.Address);
    myFormData.append('CustomerComments', this.form.value.CustomerComments);
    myFormData.append('BillNo', this.form.value.BillNo);
    myFormData.append('BillDate', this.form.value.BillDate.split('-').reverse().join('-'));
    myFormData.append('GarmentMRP', this.form.value.GarmentMRP);
    myFormData.append('Noofwashes', this.form.value.Noofwashes);
    myFormData.append('CCAComments', this.form.value.CCAComments);
    myFormData.append('Couriername', this.form.value.Couriername);
    myFormData.append('AirwayBillNo', this.form.value.AirwayBillNo);
    myFormData.append('LRDate', this.form.value.LRDate.split('-').reverse().join('-'));
    myFormData.append('RejectionReason', this.form.value.RejectionReason);
    /*myFormData.forEach((value,key) => {
      console.log(key+value)
       });*/
       this.http.post<any>(this.apiURL + '/api/addconforminwards', myFormData)
       .subscribe(data => {
       if (data.return_code == 0) {
         this.router.navigate(['home/qccustomercomplaints']);
       }
     });
  }

  returntostore(): void{
    if(this.form.value.RejectionReason == ''){
      $('#reject').show();
      return;
     }
     $('#reject').hide();
    this.form.get('ReceiptDate').enable();
   const myFormData = new FormData();
   myFormData.append('userName', localStorage.getItem('userName'));
   myFormData.append('ReceiptDate', this.form.value.ReceiptDate.split('-').reverse().join('-'));
   myFormData.append('SerialNo', this.form.value.SerialNo);
   myFormData.append('StoreNo', this.form.value.StoreNo);
   myFormData.append('StoreName', this.form.value.StoreName);
   myFormData.append('Stylecode', this.form.value.Stylecode);
   myFormData.append('Sleeve', this.form.value.Sleeve);
   myFormData.append('Size', this.form.value.Size);
   myFormData.append('CustomerName', this.form.value.CustomerName);
   myFormData.append('Address', this.form.value.Address);
   myFormData.append('CustomerComments', this.form.value.CustomerComments);
   myFormData.append('BillNo', this.form.value.BillNo);
   myFormData.append('BillDate', this.form.value.BillDate.split('-').reverse().join('-'));
   myFormData.append('GarmentMRP', this.form.value.GarmentMRP);
   myFormData.append('Noofwashes', this.form.value.Noofwashes);
   myFormData.append('CCAComments', this.form.value.CCAComments);
   myFormData.append('Couriername', this.form.value.Couriername);
   myFormData.append('AirwayBillNo', this.form.value.AirwayBillNo);
   myFormData.append('LRDate', this.form.value.LRDate.split('-').reverse().join('-'));
   myFormData.append('RejectionReason', this.form.value.RejectionReason);
    /*myFormData.forEach((value,key) => {
      console.log(key+value)
       });*/
       this.http.post<any>(this.apiURL + '/api/addreturntostore', myFormData)
      .subscribe(data => {
      if (data.return_code == 0) {
        this.router.navigate(['home/qccustomercomplaints']);
      }
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
