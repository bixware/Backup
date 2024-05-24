import { Component, OnInit, Type, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CellValueChangedEvent, GridOptions } from '@ag-grid-community/core'
import { CalloutCellRenderComponent } from '../callout-cell-render/callout-cell-render.component';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any;
import { CalloutBtnCellRendererComponent } from '../callout-btn-cell-renderer/callout-btn-cell-renderer.component';


declare var hideSearchText: any;
declare var updatePageTitle: any;

@Component({
  selector: 'app-managecallout',
  templateUrl: './managecallout.component.html',
  styleUrls: ['./managecallout.component.scss']
})
export class ManagecalloutComponent implements OnInit, OnDestroy {

  apiURL: any;
  roles: any = [];
  searchValue: any;
  gridApi: any;
  gridColumnApi: any;
  frameworkComponents: any;
  apiFlag: any;
  apiFlagModal: any;
  successMessage: any;
  gridOptions: any;
  params: any;
  calloutform: FormGroup;
  patchform: FormGroup;
  showButton = false;
  sections: any;
  redirectSecounds: any;
  submitted = false;
  updateCallout = {
    userUID: '',
    partNotes: '',
    searchSectionUID: null,
    previousCallout: []
  };
  sectionList: string;
  //calloutDetails: any;
  form: FormGroup;
  clicked: any;
  brands: any;
  parts: any;
  brandList: string;
  partList: string;
  partVehicleUID: any;
  dHeader: string;
  info: boolean;
  calloutSectionUID:any;
  calloutText:any;
  calloutType:any;
  calloutPartUID:any;
  public dummy = {
    ArchStatus: null
  }
  //sectionEdit: boolean;
  updateDuplicate = {
    userUID: '',
    searchSectionUID: '',
    partNotes: '',
    prevCalloutType: '',
    prevsearchSectionUID: '',
    previousCallout: ''
  }
  duplicateparts= [];
  calloutDetails=[];
  public loadingOverlayComponentParams: any = {
    loadingMessage: 'One moment please...',
  };
  modules = [ClientSideRowModelModule];

  columnDefs = [
    {
      headerName: 'Select Callout', width: 120, sortable: true, checkboxSelection: true
    },
    {
      headerName: 'Action', field: 'rowNumber', width: 350, sortable: false,filter: false,
       cellRenderer: 'CalloutBtnCellRendererComponent',
    },
    {
      headerName: 'Callout Type', field: 'calloutType', width: 180, sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true, cellStyle: { 'white-space': 'normal' }, autoHeight: true,
    },
    {
      headerName: 'Section Name', field: 'searchSectionName', width: 200, sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true, cellStyle: { 'white-space': 'normal' }, autoHeight: true,
    },
    {
      headerName: 'Callout', field: 'callout', width: 500, sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true, cellRenderer: 'CalloutCellRenderComponent', editable: true, cellStyle: { 'white-space': 'normal' }, autoHeight: true,
    },
  ];
  rowData: any;

  public rowSelection: 'single' | 'multiple' = 'multiple';
  constructor(private httpClient: HttpClient, private router: Router, public fb: FormBuilder, private route: ActivatedRoute, private location: Location,) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
    this.calloutform = this.fb.group({
      sectionNameList: ['', Validators.required],
      callOut: ['', Validators.required]
    });
    this.patchform = this.fb.group({
      calloutType: [''],
      searchSectionName: [''],
      callout: ['']
    });
    this.form = this.fb.group({
      sectionNameList: ['', Validators.required],
      callOut: ['', Validators.required]
    });
  }

  get c(): any { return this.calloutform.controls; }
  get p(): any { return this.patchform.controls; }
  get f(): any { return this.form.controls; }

  ngOnInit(): void {
    /* this.apiFlagModal = false;
    this.apiFlag = false; */
    //hideSearchText();
    this.frameworkComponents = {
      CalloutBtnCellRendererComponent: CalloutBtnCellRendererComponent,
      CalloutCellRenderComponent: CalloutCellRenderComponent,
    };
    //this.getSection();
    updatePageTitle('Manage Callout');
  }

  ClickDuplicateCallout():void{
    this.apiFlagModal = false;
    this.clicked = false;
    this.apiFlag = false;
    this.getSection();
    //this.sectionEdit=false;
    this.calloutText=localStorage.getItem('CALLOUT-PARAMETER2');
    this.calloutType=localStorage.getItem('CALLOUT-PARAMETER5');
    this.calloutSectionUID=localStorage.getItem('CALLOUT-PARAMETER6');
    if(this.calloutText==null ||this.calloutType==null || this.calloutSectionUID==null)
    {
     this.router.navigate(['/home/managecallout']);
    }
    this.form.patchValue({
      callOut: this.calloutText
    });
    if (this.calloutText.length>0){
        if(this.calloutText.indexOf('alert alert-danger')>0){
          setTimeout(() => {
            $("#alert-danger").prop("checked",true);
          },  1000);
        }
        if(this.calloutText.indexOf('alert alert-primary')>0){
          setTimeout(() => {
            $("#alert-primary").prop("checked",true);
          },  1000);
        }
        if(this.calloutText.indexOf('alert alert-success')>0){
          setTimeout(() => {
            $("#alert-success").prop("checked",true);
          },  1000);
        }
        if(this.calloutText.indexOf('alert alert-warning')>0){
          setTimeout(() => {
            $("#alert-warning").prop("checked",true);
          },  1000);
        }
        if(this.calloutText.indexOf('alert alert-dark')>0){
          setTimeout(() => {
            $("#alert-dark").prop("checked",true);
          },  1000);
        }
    }
    /* HTML callout */
    let isHtml = /<[a-z]+\d?(\s+[\w-]+=("[^"]*"|'[^']*'))*\s*\/?>|&#?\w+;/i.test(this.calloutText);
        if(isHtml){
        console.log('This is an HTML');
        this.form.get('callOut').patchValue(this.calloutText);
        }
        else{
        const htmlstring="<div class='alert alert-danger' role='alert'>"+this.calloutText+"</div>"; 
        this.form.get('callOut').patchValue(htmlstring);
        setTimeout(() => {
          $("#alert-danger").prop("checked",true);
        },  1000);
        //return /<[a-z]+\d?(\s+[\w-]+=("[^"]*"|'[^']*'))*\s*\/?>|&#?\w+;/i.test(element.callout);
        }

  }

  onSelectionChanged(): void {
    if (this.gridApi.getSelectedRows().length > 1) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }

  combine(): void {
    this.apiFlagModal = false; 
    const checkboxId = this.gridApi.getSelectedRows(); 
    checkboxId.forEach(element => {
    if (element.isActive == '0') {
        this.apiFlagModal = true;
        setTimeout(() => {
          this.displayError();
        }, 2000)
        return;
      }
    });
    if(this.apiFlagModal != true){
      $('#myModal').css('display', 'block');
      const checkboxId1 = Array();
      checkboxId.forEach(element => {
        checkboxId1.push(element.rowNumber);
        this.calloutDetails = checkboxId;
        console.log(this.calloutDetails);
      });
      $("#arrows").show();
      $("#next").show();
      $("#previous").hide();
      $("#pf").show();
      $("#cf").hide();
    }
  }

  Prev(): void{
    $("#pf").show();
    $("#cf").hide();
    $("#arrows").show();
    $("#previous").hide();
    $("#next").show();
    
  }


  Next():void{
    $("#pf").hide();
    $("#cf").show();
    $("#arrows").show();
    $("#previous").show();
    $("#next").hide();
    this.getSection();
    console.log($("input[name='patchcallout']:checked").val());
    const checkboxId = this.gridApi.getSelectedRows(); 
    checkboxId.forEach(element => {
    if (element.rowNumber == $("input[name='patchcallout']:checked").val() ) {
    let isHtml = /<[a-z]+\d?(\s+[\w-]+=("[^"]*"|'[^']*'))*\s*\/?>|&#?\w+;/i.test(element.callout);
      if(isHtml){
        console.log('This is an HTML');
        this.calloutform.get('callOut').patchValue(element.callout);
      }
      else{
       const htmlstring="<div class='alert alert-danger' role='alert'>"+element.callout+"</div>"; 
        console.log(htmlstring);
        this.calloutform.get('callOut').patchValue(htmlstring);
        //return /<[a-z]+\d?(\s+[\w-]+=("[^"]*"|'[^']*'))*\s*\/?>|&#?\w+;/i.test(element.callout);
      }
      this.calloutform.get('sectionNameList').patchValue(element.searchSectionUID);
      console.log(element.searchSectionUID);
      }
    });
  }

  displayError():void{
    $('#text_modal').css('display', 'none'); 
    this.successMessage = 'Combine Callout Selection has Inactive Record, please Reselect !';
    $('#info_alert').css('display', 'block'); 
  }

  combinecalloutbyid(): void {
    this.submitted = true;
    if (this.calloutform.invalid) {
      return;
    }
    const checkboxId = this.gridApi.getSelectedRows();
    const checkboxId1 = Array();
    checkboxId.forEach(element => {
      checkboxId1.push(element.rowNumber);
    });
    this.updateCallout.userUID = localStorage.getItem('user_id');
    this.updateCallout.searchSectionUID = this.calloutform.value.sectionNameList;
    this.updateCallout.partNotes = this.calloutform.value.callOut;
    this.updateCallout.previousCallout = checkboxId;
    console.log(this.updateCallout);
    this.apiFlagModal = true;
    this.showButton = false;
    $('#myModal').css('display', 'none');
    this.calloutform.reset();

    this.httpClient.post<any>(this.apiURL + '/api/combinecallout', this.updateCallout)
      .subscribe(data => {
        $('#text_modal').css('display', 'none');
        if (data.return_code == 0) {
          this.successMessage = 'Callout Combined Successfully !';
          $('#info_success').css('display', 'block');
          setTimeout(() => {
            this.closeModal();
          }, this.redirectSecounds)
        }
        else {
          this.successMessage = data.err_message;
          $('#info_alert').css('display', 'block');
          setTimeout(() => {
            this.closeModalError();
          }, this.redirectSecounds)
        }
      });
  }

  /* getSection(): void {
    this.httpClient.get<any>(this.apiURL + '/api/getsections')
      .subscribe(data => {
        this.sections = (data as any).searchSections;
      });
  } */
  getSection(): void {
    this.httpClient.get<any>(this.apiURL + '/api/getsections')
      .subscribe(data => {
        this.sections = (data as any).searchSections;
        this.form.patchValue({
          sectionNameList: this.calloutSectionUID
        });
        //this.sectionEdit=true;
        this.sectionList=this.calloutSectionUID;
      });
  }

  
  getOptionSection(e): void {
    this.sectionList = e.target.value;
    //this.partDetailsFlag = false;
    $("#s_text").css("visibility", "hidden").css("display", "none");
    if(this.form.value.sectionNameList != '' ){
      $('#section_error').hide();
    }
    //this.form.get('callOut').patchValue(this.calloutText);
  }

 /*  changeColor2(): void {
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

  } */

back(): void {
  this.location.back();
}

duplicateCallout(): void{
  this.updateDuplicate.userUID = localStorage.getItem('user_id');
  this.updateDuplicate.searchSectionUID = this.form.value.sectionNameList;
  this.updateDuplicate.partNotes = this.form.value.callOut;
  this.updateDuplicate.prevCalloutType = this.calloutType;
  this.updateDuplicate.previousCallout = this.calloutText;
  this.updateDuplicate.prevsearchSectionUID = this.calloutSectionUID;
  this.apiFlag = true;
  this.httpClient.post<any>(this.apiURL + '/api/duplicatecallout', this.updateDuplicate)
    .subscribe(data => {
      this.duplicateparts = (data as any).partList;
      if (data.return_code == 0) {
      /* localStorage.setItem('CALLOUT-PARAMETER2',this.updateDuplicate.partNotes);
      this.calloutText=this.updateDuplicate.partNotes; */
      $('#text').css('display', 'none');
      this.successMessage = 'Duplicate Callout Details Updated Successfully!';
      //document.getElementById('info_success').style.display = 'block';
      $('#info_success').css('display', 'block');
      setTimeout(() => {
        this.close1();
      }, this.redirectSecounds);
    }
    else {
      $('#text').css('display', 'none');
      this.successMessage = data.errors[0];
      $('#info_alert').css('display', 'block');
    }
  });
}

close1(): void{
  this.apiFlag = false;
  /* if (this.clicked == true) {
    this.location.back();
    this.clicked = false;
  } */
  this.router.navigate(['/home/managecallout']);
}

onBlur()  {
  if (this.form.value.callOut != '') {
    $('#callout_error').hide();
  }

}

ngOnDestroy(): void {
  // Do not forget to unsubscribe the event
}

  cancel(): void {
    $('#myModal').css('display', 'none');
    this.clickEvent();
    this.showButton = false;
    this.apiFlagModal = false;
    $("select#sectionList").prop('selectedIndex', 0);
    this.calloutform.patchValue({
      callOut: ''
    });
    this.submitted = false;
  }

  closeModal(): void {
    this.cancel();
    /* this.apiFlagModal = false;
    $("select#sectionList").prop('selectedIndex', 0); 
    this.calloutform.patchValue({
      callOut: ''
    });
    this.submitted = false; */
  }

  closeModalError(): void {
    this.cancel();
    /* this.apiFlagModal = false;
    $("select#sectionList").prop('selectedIndex', 0); 
    this.calloutform.patchValue({
      callOut: ''
    });
    this.submitted = false; */
  }

  /* close1(): void {
    this.apiFlag = false;
  } */

 /*  async refreshGrid(){
    const userUID = localStorage.getItem('user_id');
    var ArchStatus = $('#calloutArchive').prop('checked') === true ? 1 : 0;
    await this.httpClient.post<any>(this.apiURL + '/api/convertedcalloutlist', { userUID: userUID, ArchStatus: ArchStatus })
      .subscribe(data => {
        this.gridApi.refreshCells();
        this.refreshGrid();
        this.rowData = (data as any).calloutDetails;
        console.log(this.rowData)
      });
  } */

  async onGridReady(params): Promise<void> {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    const userUID = localStorage.getItem('user_id');
    var ArchStatus = $('#calloutArchive').prop('checked') === true ? 1 : 0;
    await this.httpClient.post<any>(this.apiURL + '/api/convertedcalloutlist', { userUID: userUID, ArchStatus: ArchStatus })
      .subscribe(data => {
       /*  this.gridApi.refreshCells();
        this.refreshGrid(); */
        this.rowData = (data as any).calloutDetails;
        console.log(this.rowData)
      });
  }
  quickSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  }
  async onCellValueChanged(params: CellValueChangedEvent) {
    var changedData = [params.data];
    console.log('changed value', changedData[0].callout);

    const userUID = localStorage.getItem('user_id');

    const callout = changedData[0].callout;
    const partNotes = changedData[0].partNotes;
    const calloutType = changedData[0].calloutType;
    const searchSectionUID = changedData[0].searchSectionUID;
    this.apiFlag = true;
    await this.httpClient.post<any>(this.apiURL + '/api/updateconvertedcallout', { userUID: userUID, callout: callout, partNotes: partNotes, calloutType: calloutType, searchSectionUID: searchSectionUID })
      .subscribe(data => {

        $('#text').css('display', 'none');
        if (data.return_code == 0) {
          changedData[0].partNotes = changedData[0].callout
          params.api.applyTransaction({ update: changedData });
          this.successMessage = 'Callout Updated Successfully !';
          $('#info_success').css('display', 'block');
        }
        else {
          this.successMessage = 'Callout Update Failed !';
          $('#info_alert').css('display', 'block');
        }
      });
  }


  clickEvent(): void {
    const userUID = localStorage.getItem('user_id');
    var ArchStatus = $('#calloutArchive').prop('checked') === true ? 1 : 0;
    this.gridApi.showLoadingOverlay();
    this.httpClient.post<any>(this.apiURL + '/api/convertedcalloutlist', { userUID: userUID, ArchStatus: ArchStatus })
      .subscribe(data => {
        this.rowData = (data as any).calloutDetails;
        this.gridApi.setRowData(this.rowData);
        this.gridApi.hideOverlay();
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
    callouttextarea = this.calloutform.value.callOut;
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
      this.calloutform.get('callOut').patchValue(result);
    }

  }

  cancelDuplicateCallout(): void{
    this.apiFlag = false;
    if (this.clicked == true) {
      this.location.back();
      this.clicked = false;
    }
    $('#modalDuplicatecallout').css('display', 'none');
  }
  }

  



