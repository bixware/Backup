import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
declare var $: any;
//declare var hideSearchText: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-callout-vehicle-mapping',
  templateUrl: './callout-vehicle-mapping.component.html',
  styleUrls: ['./callout-vehicle-mapping.component.scss']
})
export class CalloutVehicleMappingComponent implements OnDestroy, OnInit {
  apiURL: any;
  redirectSecounds: any;
  form: FormGroup;
  clicked: any;
  apiFlag: any;
  sections: any;
  brands: any;
  parts: any;
  sectionList: string;
  brandList: string;
  partList: string;
  partVehicleUID: any;
  dHeader: string;
  info: boolean;
  successMessage: string;
  calloutSectionUID:any;
  calloutText:any;
  calloutType:any;
  calloutPartUID:any;
  sectionEdit:boolean;
  public dummy = {
    ArchStatus: null
  }
 
 

  data = {
    BrandID: '',
  };
  Callout: any;
  datas = {
    PROC_TYPE: '',
    MAKE: '',
    MODEL: '',
    YEAR: '',
    userUID: null
  };
  partData = {
    headUID: '',
    brandUID: '',
    PartUID: '',
    vehicleUID: []
  };
  vehicleData = {
    make: '',
    model: '',
    year: [],
    option1: [],
    option2: [],
    option3: [],
    option4: [],
    option5: [],
    option6: []
  };
  updateVehicle = {
    searchSectionUID: '',
    vehicleUID: [],
    userUID: null,
    partNotesDescription: '',
    calloutType:'',
    previousCallout:'',
    partUID:null
  };
  selectedYear: any;
  selectedOption2: any;
  selectedOption3: any;
  selectedOption4: any;
  selectedOption5: any;
  selectedOption6: any;
  selectedOption7: any;
  partDetails: any;
  searchSections: any;
  vehicleDetails: any;
  vehicleDetailsFlag: any;
  partDetailsFlag: any;
  updateBtnFlag: any;
  makes: any;
  years: any;
  models: any;
  ones: any;
  twos: any;
  threes: any;
  fours: any;
  fives: any;
  sixes: any;
  submitted = false;
  options1 = {
    make: '',
    model: '',
    year: [],
    userUID: null
  };
  options2 = {
    make: '',
    model: '',
    year: [],
    option1: [],
    userUID: null
  };
  options3 = {
    make: '',
    model: '',
    year: [],
    option1: [],
    option2: [],
    userUID: null
  };
  options4 = {
    make: '',
    model: '',
    year: [],
    option1: [],
    option2: [],
    option3: [],
    userUID: null
  };
  options5 = {
    make: '',
    model: '',
    year: [],
    option1: [],
    option2: [],
    option3: [],
    option4: [],
    userUID: null
  };
  options6 = {
    make: '',
    model: '',
    year: [],
    option1: [],
    option2: [],
    option3: [],
    option4: [],
    option5: [],
    userUID: null
  };

  isSelectedVehicle: any;
  // AG Grid Part
  private gridApi: any;
  private gridColumnApi: any;
  rowSelection: any;
  frameworkComponents: any;
  modules = [ClientSideRowModelModule];
  private gridApi1: any;
  private gridColumnApi1: any;
  rowSelection1: any;
  frameworkComponents1: any;
  modules1 = [ClientSideRowModelModule];
  rowData: any;
  vehicleUID1: any;
  // AG Grid vehicle
  columnDefs1 = [
    { headerName: 'Display Header', field: 'partDisplayHeader', width: 240, editable: true },
    {
      headerName: 'Make', field: 'Make', sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true, checkboxSelection: true, headerCheckboxSelectionFilteredOnly: true, headerCheckboxSelection: true
    },
    {
      headerName: 'Model', field: 'Model', sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true
    },
    {
      headerName: 'Year', field: 'Year', sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true
    },
    {
      headerName: 'Option1', field: 'Option1', sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true
    },
    {
      headerName: 'Option2', field: 'Option2', sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true
    },
    { headerName: 'Option3', field: 'Option3', sortable: true, filter: true },
    { headerName: 'Option4', field: 'Option4', sortable: true, filter: true },
    { headerName: 'Option5', field: 'Option5', sortable: true, filter: true },
    { headerName: 'Option6', field: 'Option6', sortable: true, filter: true },
  ];
  rowData1: any;

  constructor(private http: HttpClient, public fb: FormBuilder,private location: Location,private router: Router) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.form = this.fb.group({
      sectionNameList: ['', Validators.required],
      callOut: ['', Validators.required]
    });
   }

   get f(): any { return this.form.controls; }

  ngOnInit(): void {
    updatePageTitle('Callout Vehicle Mapping');
    //hideSearchText();
    this.rowSelection = '';
    this.rowSelection1 = 'multiple';
    this.vehicleDetailsFlag = false;
    this.partDetailsFlag = false;
    this.getSection();
    this.getMake();
    this.apiFlag = false;
    this.vehicleUID1 = [];
    this.isSelectedVehicle = 0;
    this.updateBtnFlag = false;
    this.sectionEdit=false;
    
  
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


  }

  getSection(): void {
    this.http.get<any>(this.apiURL + '/api/getsections')
      .subscribe(data => {
        this.sections = (data as any).searchSections;
        this.form.patchValue({
          sectionNameList: this.calloutSectionUID
        });
        this.sectionEdit=true;
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

    }

  getMake(): void {
    this.updateVehicle.userUID = localStorage.getItem('user_id');
    this.http.post<any>(this.apiURL + '/api/getmake', this.updateVehicle)
      .subscribe(data => {
        this.makes = (data as any).makeDetails;
      });
  }

  getModel(e): void {
    this.vehicleDetailsFlag = false;
    this.partDetailsFlag = false;
    this.updateBtnFlag = false;
    $("#psearch").prop("disabled", true);
    this.vehicleData.model = '';
    this.vehicleData.year = [];
    this.vehicleData.option1 = [];
    this.vehicleData.option2 = [];
    this.vehicleData.option3 = [];
    this.vehicleData.option4 = [];
    this.vehicleData.option5 = [];
    this.vehicleData.option6 = [];
    this.datas.PROC_TYPE = 'MODEL';
    this.datas.MAKE = e.target.options[e.target.options.selectedIndex].text;
    this.datas.userUID = localStorage.getItem('user_id');
    this.vehicleData.make = e.target.options[e.target.options.selectedIndex].text;
    $("#model_list_hide").css("visibility", "visible").css("display", "");
    $("#year_list_hide").css("visibility", "hidden").css("display", "none");
    $("#options_1_hide").css("visibility", "hidden").css("display", "none");
    $("#options_2_hide").css("visibility", "hidden").css("display", "none");
    $("#options_3_hide").css("visibility", "hidden").css("display", "none");
    $("#options_4_hide").css("visibility", "hidden").css("display", "none");
    $("#options_5_hide").css("visibility", "hidden").css("display", "none");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getmodel', this.datas)
      .subscribe(data => {
        this.models = (data as any).ModelDetails;
      });
  }

  getYear(e): void {
    this.vehicleDetailsFlag = false;
    this.updateBtnFlag = false;
    this.vehicleData.year = [];
    this.vehicleData.option1 = [];
    this.vehicleData.option2 = [];
    this.vehicleData.option3 = [];
    this.vehicleData.option4 = [];
    this.vehicleData.option5 = [];
    this.vehicleData.option6 = [];
    this.datas.PROC_TYPE = 'YEAR';
    this.datas.MODEL = e.target.value;
    this.datas.userUID = localStorage.getItem('user_id');
    this.vehicleData.model = e.target.value;
    $("#year_list_hide").css("visibility", "visible").css("display", "");
    $("#options_1_hide").css("visibility", "hidden").css("display", "none");
    $("#options_2_hide").css("visibility", "hidden").css("display", "none");
    $("#options_3_hide").css("visibility", "hidden").css("display", "none");
    $("#options_4_hide").css("visibility", "hidden").css("display", "none");
    $("#options_5_hide").css("visibility", "hidden").css("display", "none");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getyear', this.datas)
      .subscribe(data => {
        this.years = (data as any).yearDetails;
      });
  }

  getOptionOne(e): void {
    this.vehicleDetailsFlag = false;
    this.updateBtnFlag = false;
    this.vehicleData.option1 = [];
    this.vehicleData.option2 = [];
    this.vehicleData.option3 = [];
    this.vehicleData.option4 = [];
    this.vehicleData.option5 = [];
    this.vehicleData.option6 = [];
    this.options1.make = this.datas.MAKE;
    this.options1.model = this.datas.MODEL;
    this.selectedYear = $('#year_list').val();
    this.vehicleData.year = this.selectedYear;
    this.options1.year = this.selectedYear;
    this.options1.userUID = localStorage.getItem('user_id');
    console.log(JSON.stringify(this.options1));
    $("#options_1_hide").css("visibility", "visible").css("display", "");
    $("#options_2_hide").css("visibility", "hidden").css("display", "none");
    $("#options_3_hide").css("visibility", "hidden").css("display", "none");
    $("#options_4_hide").css("visibility", "hidden").css("display", "none");
    $("#options_5_hide").css("visibility", "hidden").css("display", "none");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getoption1bymyear', this.options1)
      .subscribe(data => {
        this.ones = (data as any).option1Details;
        if (this.ones.length < 1) {
          $("#options_1_hide").css("visibility", "hidden").css("display", "none");
        }
      });
  }

  getOptionTwo(e): void {
    this.vehicleDetailsFlag = false;
    this.updateBtnFlag = false;
    this.vehicleData.option2 = [];
    this.vehicleData.option3 = [];
    this.vehicleData.option4 = [];
    this.vehicleData.option5 = [];
    this.vehicleData.option6 = [];
    this.options2.make = this.datas.MAKE;
    this.options2.model = this.datas.MODEL;
    this.options2.year = this.options1.year;
    this.selectedOption2 = $('#options_1').val();
    this.options2.option1 = this.selectedOption2;
    this.options2.userUID = localStorage.getItem('user_id');
    this.vehicleData.option1 = [];
    this.vehicleData.option1 = this.selectedOption2;
    $("#options_2_hide").css("visibility", "visible").css("display", "");
    $("#options_3_hide").css("visibility", "hidden").css("display", "none");
    $("#options_4_hide").css("visibility", "hidden").css("display", "none");
    $("#options_5_hide").css("visibility", "hidden").css("display", "none");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getoption2bymoption1', this.options2)
      .subscribe(data => {
        this.twos = (data as any).option2Details;
        if (this.twos.length < 1) {
          $("#options_2_hide").css("visibility", "hidden").css("display", "none");
        }
      });
  }

  getOptionThree(e): void {
    this.vehicleDetailsFlag = false;
    this.updateBtnFlag = false;
    this.vehicleData.option3 = [];
    this.vehicleData.option4 = [];
    this.vehicleData.option5 = [];
    this.vehicleData.option6 = [];
    this.options3.make = this.datas.MAKE;
    this.options3.model = this.datas.MODEL;
    this.options3.year = this.options1.year;
    this.options3.option1 = this.options2.option1;
    this.selectedOption3 = $('#options_2').val();
    this.options3.option2 = this.selectedOption3;
    this.options3.userUID = localStorage.getItem('user_id');
    this.vehicleData.option2 = [];
    this.vehicleData.option2 = this.selectedOption3;
    $("#options_3_hide").css("visibility", "visible").css("display", "");
    $("#options_4_hide").css("visibility", "hidden").css("display", "none");
    $("#options_5_hide").css("visibility", "hidden").css("display", "none");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getoption3bymoption2', this.options3)
      .subscribe(data => {
        this.threes = (data as any).option3Details;
        if (this.threes.length < 1) {
          $("#options_3_hide").css("visibility", "hidden").css("display", "none");
        }
      });
  }

  getOptionFour(e): void {
    this.vehicleDetailsFlag = false;
    this.updateBtnFlag = false;
    this.vehicleData.option4 = [];
    this.vehicleData.option5 = [];
    this.vehicleData.option6 = [];
    this.options4.make = this.datas.MAKE;
    this.options4.model = this.datas.MODEL;
    this.options4.year = this.options1.year;
    this.options4.option1 = this.options2.option1;
    this.options4.option2 = this.options3.option2;
    this.selectedOption4 = $('#options_3').val();
    this.options4.option3 = this.selectedOption4;
    this.options4.userUID = localStorage.getItem('user_id');
    this.vehicleData.option3 = [];
    this.vehicleData.option3 = this.selectedOption4;
    $("#options_4_hide").css("visibility", "visible").css("display", "");
    $("#options_5_hide").css("visibility", "hidden").css("display", "none");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getoption4bymoption3', this.options4)
      .subscribe(data => {
        this.fours = (data as any).option4Details;
        if (this.fours.length < 1) {
          $("#options_4_hide").css("visibility", "hidden").css("display", "none");
        }
      });
  }

  getOptionFive(e): void {
    this.vehicleDetailsFlag = false;
    this.updateBtnFlag = false;
    this.vehicleData.option5 = [];
    this.vehicleData.option6 = [];
    this.options5.make = this.datas.MAKE;
    this.options5.model = this.datas.MODEL;
    this.options5.year = this.options1.year;
    this.options5.option1 = this.options2.option1;
    this.options5.option2 = this.options3.option2;
    this.options5.option3 = this.options4.option3;
    this.selectedOption5 = $('#options_4').val();
    this.options5.option4 = this.selectedOption5;
    this.options5.userUID = localStorage.getItem('user_id');
    this.vehicleData.option4 = [];
    this.vehicleData.option4 = this.selectedOption5;
    $("#options_5_hide").css("visibility", "visible").css("display", "");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getoption5bymoption4', this.options5)
      .subscribe(data => {
        this.fives = (data as any).option5Details;
        if (this.fives.length < 1) {
          $("#options_5_hide").css("visibility", "hidden").css("display", "none");
        }
      });
  }

  getOptionSix(e): void {
    this.vehicleDetailsFlag = false;
    this.updateBtnFlag = false;
    this.vehicleData.option6 = [];
    this.options6.make = this.datas.MAKE;
    this.options6.model = this.datas.MODEL;
    this.options6.year = this.options1.year;
    this.options6.option1 = this.options2.option1;
    this.options6.option2 = this.options3.option2;
    this.options6.option3 = this.options4.option3;
    this.selectedOption6 = $('#options_5').val();
    this.options6.option4 = this.selectedOption6;
    this.options6.userUID = localStorage.getItem('user_id');
    this.vehicleData.option5 = [];
    this.vehicleData.option5 = this.selectedOption6;
    $("#options_6_hide").css("visibility", "visible").css("display", "");
    this.http.post<any>(this.apiURL + '/api/getoption6bymoption5', this.options6)
      .subscribe(data => {
        this.sixes = (data as any).option6Details;
        if (this.sixes.length < 1) {
          $("#options_6_hide").css("visibility", "hidden").css("display", "none");
        }
      });
  }

  getOptionSeven(e): void {
    this.vehicleDetailsFlag = false;
    this.updateBtnFlag = false;
    this.selectedOption7 = $('#options_6').val();
    this.vehicleData.option6 = [];
    this.vehicleData.option6 = this.selectedOption7;
  }

  getVehicleDetails(): void {
$("#psearch").prop("disabled", false);
    console.log(this.vehicleData);
    this.http.post<any>(this.apiURL + '/api/getsearchdetailsforvehicles', this.vehicleData)
      .subscribe(data => {
        this.vehicleDetails = (data as any).VehicleSearchDetails;
        if (this.vehicleDetails.length > 0) {
          this.vehicleDetailsFlag = true;
          this.updateBtnFlag = true;
          setTimeout(() => {
            $("#uVehicle").prop("enabled", true);
          }, 1000);
        }
      });
  }

  onGridReady1(params): void {
   this.gridApi1 = params.api;
    this.gridColumnApi1 = params.columnApi;
    this.http.post<any>(this.apiURL + '/api/getsearchdetailsforvehicles', this.vehicleData)
      .subscribe(data => {
        this.rowData1 = (data as any).VehicleSearchDetails;
      });
      
  }
  onSelectionChanged1(): void {
    if (this.gridApi1.getSelectedRows().length != '' ) {
     // this.updateBtnFlag = true;
    $('#grid_error').hide();
    return;
   }
   else{
    $('#grid_error').show();  
   }
  }

  updateVehicleDetails(): void {
    this.submitted = true;
    if (this.sectionList == null) {
      this.form.controls['sectionNameList'].setErrors({'incorrect': true});
      return;
    }
    if (this.form.invalid || this.gridApi1.getSelectedRows().length == '') {
      $('#grid_error').show();
      return;
    }
    else{
      $('#grid_error').hide();
    }
       
  const vehicleId = new Array();
      let vehicleSelectedRow = this.gridApi1.getSelectedRows().length;
      if (vehicleSelectedRow > 0) {
        const selectVehicle = this.gridApi1.getSelectedRows();
        selectVehicle.forEach(element => {
          vehicleId.push(element.vehicleUID);
        });
      }
    this.updateVehicle.userUID = localStorage.getItem('user_id');
    this.updateVehicle.searchSectionUID = this.calloutSectionUID;
    this.updateVehicle.vehicleUID = vehicleId;
    this.updateVehicle.partNotesDescription = this.form.value.callOut;
    this.updateVehicle.previousCallout=this.calloutText;
    this.updateVehicle.calloutType=this.calloutType;
    this.apiFlag = true;
    this.http.post<any>(this.apiURL + '/api/updatecalloutvehicle', this.updateVehicle)
      .subscribe(data => {
        this.rowData = (data as any).VehicleCalloutDetails;
      if (data.return_code == 0) {
        localStorage.setItem('CALLOUT-PARAMETER2',this.updateVehicle.partNotesDescription);
        this.calloutText=this.updateVehicle.partNotesDescription;
        $('#text').css('display', 'none');
        this.successMessage = 'Vehicle Details Updated Successfully!';
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

  close1(): void {
    this.apiFlag = false;
    this.updateBtnFlag = false;
    $("select#sectionList").prop('selectedIndex', 0); 
    /* this.form.patchValue({
      callOut: ''
    }); */
    this.vehicleDetailsFlag = false;
    this.submitted = false;
    /* this.sectionList = null; */
  }

  onBlur()  {
    if (this.form.value.callOut != '') {
      $('#callout_error').hide();
    }

  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }

}

