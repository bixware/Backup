import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl} from '@angular/forms';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare var bulkViewDetailsPrint: any;
@Component({
  selector: 'app-un-justified',
  templateUrl: './un-justified.component.html',
  styleUrls: ['./un-justified.component.css']
})
export class UnJustifiedComponent implements OnInit {
  form: FormGroup;
  apiURL: any;
  currentDate: any;
  DefectAnalysis: any;
  constructor(private router: Router, private http: HttpClient, private location: Location, public fb: FormBuilder, private route: ActivatedRoute) { 
    this.apiURL = environment.apiURL;
    this.form = this.fb.group({
      complaintId: [''],
      analysisDate: [''],
      customerName: [''],
      storeCode: [''],
      storeName: [''],
      contactNumber: [''],
      brand: [''],
      address: [''],
      recieptDate: [''],
      city: [''],
      pinCode: [''],
      garmentType: [''],
      styleCode: [''],
      fabricCode: [''],
      //color: [''],
      size:[''],
      condition:[''],
      customerComments:[''],
      //RejectionReason:['']
    });
  }
  justified = {
    SerialNo: ''
    };
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.justified.SerialNo = params['id'];
    });
    this.http.post<any>(this.apiURL + '/api/getcomplaintdetailsbyserialno', this.justified)
      .subscribe(data => {
       console.log(data);
       if (data.return_code == 0) {
        this.form.patchValue({
          complaintId: data.details[0].ComplaintID != null ? data.details[0].SerialNo : '',
          //analysisDate: data.details[0].QCAnalysisDate != null ? this.formatDate(data.details[0].QCAnalysisDate.substring(0, 10)) : '',
          analysisDate: data.details[0].QCAnalysisDate != null ? data.details[0].QCAnalysisDate : '',
          customerName: data.details[0].CustomerName != null ? data.details[0].CustomerName : '',
          storeCode: data.details[0].Store != null ? data.details[0].Store : '',
          storeName: data.details[0].StoreName != null ? data.details[0].StoreName : '',
          contactNumber: data.details[0].CustomerMobile != null ? data.details[0].CustomerMobile : '',
          brand: data.details[0].Brand != null ? data.details[0].Brand : '',
          address: data.details[0].CustomerAddress != null ? data.details[0].CustomerAddress : '',
          //recieptDate: data.details[0].ReceiptDate != null ? data.details[0].ReceiptDate : '',
          recieptDate: data.details[0].ReceiptDate != null ? this.formatDate(data.details[0].ReceiptDate.substring(0, 10)) : '',
          city: data.details[0].CustCity != null ? data.details[0].CustCity : '',
          pinCode: data.details[0].CustPin != null ? data.details[0].CustPin : '',
          garmentType: data.details[0].GarmentType != null ? data.details[0].GarmentType : '',
          styleCode: data.details[0].Style != null ? data.details[0].Style : '',
          fabricCode: data.details[0].Fabric != null ? data.details[0].Fabric : '',
          //color: data.details[0].GarmentColor != null ? data.details[0].GarmentColor : '',
          size: data.details[0].Size != null ? data.details[0].Size : '',
          condition: data.details[0].GarmentCondition != null ? data.details[0].GarmentCondition  : '',
          customerComments: data.details[0].UserComments != null ? data.details[0].UserComments  : '',          
        });
        this.DefectAnalysis = data.details[0].DefectAnalysis;
       }
      });
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
  forPrint(blockid: any): void {
    bulkViewDetailsPrint(blockid);
  }


}
