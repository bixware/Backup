import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-lpview',
  templateUrl: './lpview.component.html',
  styleUrls: ['./lpview.component.css']
})
export class LpviewComponent implements OnInit {
  apiURL:any;
  display: any;
  loader: any;
  nofiles: any;
  LPFiles = {
    fileName: null,
    filePath: null
  }
  lpdetails={
    vendorcode:null,
    tripsheetnumber:null
  }
  form: FormGroup;
  submitted: any;
  constructor( private http: HttpClient, private location: Location, public fb: FormBuilder) { this.apiURL = environment.apiURL;
    this.LPFiles.fileName=[];
    this.LPFiles.filePath=[];
    this.form = this.fb.group({
      tripcode: ['', Validators.required]
    });
  }

  get f(): any { return this.form.controls; }

  ngOnInit(): void {
    this.lpdetails.vendorcode = localStorage.getItem('userName');
    this.display = false;
    this.loader = false;
    this.nofiles = false;
  }

  search(): void {
    this.submitted = false;
    this.display = false;
    this.nofiles = false;
    if (this.form.invalid) {
      this.submitted = true;
      return;
    }
    this.display = true;
    this.loader = true;
    this.lpdetails.tripsheetnumber = this.form.value.tripcode;
    this.http.post<any>(this.apiURL + '/api/getlpfilesbytripsheet',this.lpdetails)
    .subscribe(data => {
      this.loader = false;
      if (data.return_code == 0) {
        this.LPFiles.fileName = data.fileName;
        this.LPFiles.filePath = data.filePath;
        //console.log(data.fileName);
      }
      else {
        this.LPFiles.fileName = [];
        this.LPFiles.filePath = [];
        this.nofiles = true;
      }
    });
  }

  ngAfterViewInit(): void {
    $(document).ready(function () {
      setTimeout(() => {
        if (!$('.nav-toggle').hasClass('nav-toggle--active')) {
          $('#page-content').css('margin-left', '0px');
        }
      }, 333);
    });
  }

}
