import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare var $: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-partcalloutconversion',
  templateUrl: './partcalloutconversion.component.html',
  styleUrls: ['./partcalloutconversion.component.scss']
})
export class PartcalloutconversionComponent implements OnInit {
  apiFlag: any;
  apiURL: any;
  form: FormGroup;
  brands: any;
  parts: any;
  brandList: string;
  partList: string;
  callout:string;
  successMessage: string;
  redirectSecounds: any;
  //submitted = false;
  data = {
    brandUID: ''
  };
  datas = {
    partUID: ''
  };
  calloutDetails ={
    partUID: '',
    userUID: '',
    callout: '',
  }

  constructor(private http: HttpClient, public fb: FormBuilder) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.form = this.fb.group({
      brandList:['',Validators.required],
      partList: ['',Validators.required],
      callOut: ['',Validators.required]
    });
   }

   get f(): any { return this.form.controls; }

  ngOnInit(): void {
    this.apiFlag = false;
    this.getBrand();
    $('#alert-danger').prop('disabled', true);
    $('#alert-primary').prop('disabled', true);
    $('#alert-success').prop('disabled', true);
    $('#alert-warning').prop('disabled', true);
    $('#alert-dark').prop('disabled', true);
    updatePageTitle('Part Callout Conversion');
  }

  getBrand(): void {
    this.http.post<any>(this.apiURL + '/api/getbrand',{})
      .subscribe(data => {
        this.brands = (data as any).brandDetails;
      });
  }

  getPart(e): void {
    this.brandList = e.target.value;
    this.data.brandUID = e.target.value;
    this.parts = [];
    $("#b_text").css("visibility", "hidden").css("display", "none"); 
    this.http.post<any>(this.apiURL + '/api/getpartslistbybrand', this.data)
      .subscribe(data => {
        this.parts = (data as any).partList;
      });
  }

  getCallout(e): void {
    this.partList = e.target.value;
    this.datas.partUID = e.target.value;
    this.http.post<any>(this.apiURL + '/api/createcallouttextbypart', this.datas)
      .subscribe(data => {
        this.callout = (data as any).calloutText;
        $('#alert-danger').prop('disabled', false);
    $('#alert-primary').prop('disabled', false);
    $('#alert-success').prop('disabled', false);
    $('#alert-warning').prop('disabled', false);
    $('#alert-dark').prop('disabled', false);
        this.form.get('callOut').patchValue(data.calloutText);
      });
      $("#p_text").css("visibility", "hidden").css("display", "none");
    }

  convertparttoCallout(): void {
    //this.submitted = true;
    if (!this.form.value.brandList) {
      $("#b_text").css("visibility", "visible").css("display", "");
    }
    if (!this.form.value.partList) {
      $("#p_text").css("visibility", "visible").css("display", "");
    }
    if (this.form.invalid) {
      return;
    }
    /* const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('partUID', this.form.value.partList);
    myFormData.append('callout', this.form.value.callOut); */
    this.calloutDetails.userUID = localStorage.getItem('user_id');
    this.calloutDetails.callout = this.form.value.callOut;
    this.calloutDetails.partUID = this.form.value.partList;
    this.apiFlag = true;
    this.http.post<any>(this.apiURL + '/api/convertparttocallout', this.calloutDetails)
    .subscribe(data => {
      
      if (data.return_code == 0) {
        $('#text').css('display', 'none');
        this.successMessage = data.success_message == "Insert Failed" ? 'This Part is not linked with any Vehicle, so not able to convert as Callout.' : 'Converted Part to Callout!';
        $('#alert-danger').prop('disabled', true);
        $('#alert-primary').prop('disabled', true);
        $('#alert-success').prop('disabled', true);
        $('#alert-warning').prop('disabled', true);
        $('#alert-dark').prop('disabled', true);
        
        document.getElementById('info_success').style.display = 'block';
        setTimeout(() => {
          this.close1();
        },  this.redirectSecounds);
       }
        else{
        $('#text').css('display', 'none');
        this.apiFlag = false;
        this.successMessage = data.errors[0];
        //$('#info_alert').css('display', 'block');
        document.getElementById('info_alert').style.display = 'block'; 
       } 
    });

  }

  changeColor1(): void {
    var colorclass;
    if ($("#alert-danger").prop("checked")) {
      colorclass = $("#alert-danger").val();
    }
    if ($("#alert-primary").prop("checked")) {
      colorclass = $("#alert-primary").val();
    }
    if ($("#alert-success").prop("checked")) {
      colorclass = $("#alert-success").val();
    }
    if ($("#alert-warning").prop("checked")) {
      colorclass = $("#alert-warning").val();
    }
    if ($("#alert-dark").prop("checked")) {
      colorclass = $("#alert-dark").val();
    }
    var callouttextarea;
    callouttextarea = this.form.value.callOut;
    let result;
    if (callouttextarea.length>0){
      if(callouttextarea.indexOf("alert alert-danger")>0){
       result = callouttextarea.replace('alert alert-danger', colorclass);
      }
      if(callouttextarea.indexOf("alert alert-primary")>0){
        result = callouttextarea.replace('alert alert-primary', colorclass);
      }
      if(callouttextarea.indexOf("alert alert-success")>0){
        result = callouttextarea.replace('alert alert-success', colorclass);
      }
      if(callouttextarea.indexOf("alert alert-warning")>0){
        result = callouttextarea.replace('alert alert-warning', colorclass);
      }
      if(callouttextarea.indexOf("alert alert-dark")>0){
        result = callouttextarea.replace('alert alert-dark', colorclass);
      }
      this.form.get('callOut').patchValue(result);
    }

  }

  close1(): void {
    this.apiFlag = false;
    this.form.patchValue({
      callOut: '',
      brandList:'',
      partList:''
    });
    $("#alert-danger").prop("checked",true);
  }
 
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }


}

