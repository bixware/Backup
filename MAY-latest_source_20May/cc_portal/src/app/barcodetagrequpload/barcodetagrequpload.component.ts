import { Component, OnInit, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment'
declare var $: any;
@Component({
  selector: 'app-barcodetagrequpload',
  templateUrl: './barcodetagrequpload.component.html',
  styleUrls: ['./barcodetagrequpload.component.css']
})
export class BarcodetagrequploadComponent implements OnInit, AfterViewInit {
  filedata: any;
  errorMsg:any;
  successMsg: any;
  successFlag: any;
  errorFlag: any;
  apiURL:any;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
   }

  ngOnInit(): void {
      this.errorFlag = false;
      this.successFlag = false;
  }

  onFileChange(evt: any): any {
    this.successFlag = false;
    this.errorFlag = false;
    this.filedata = evt.target.files[0];
    const validExts = new Array('.xlsx', '.xls');
    let fileExt = evt.target.files[0].name;
    fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
    if (validExts.indexOf(fileExt) < 0) {
      $('#upload').val('');
      this.errorMsg = 'Please upload excel file only';
      this.errorFlag = true;
    }
  }

  dataUpload(): void {
      if (this.errorFlag == false) {
      const myFormData = new FormData();
      myFormData.append('lrExcel', this.filedata);
      this.http.post<any>(this.apiURL + '/api/updatelrnumbertag', myFormData)
      .subscribe(data => {
      if (data.return_code == 0) {
      this.successMsg = 'Data Uploaded Successfully';
      this.successFlag = true;
      }
      });
    }
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
