import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
declare var $: any;

//declare var hideSearchText: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-addvehiclenonpart',
  templateUrl: './addvehiclenonpart.component.html',
  styleUrls: ['./addvehiclenonpart.component.scss']
})
export class AddvehiclenonpartComponent implements OnDestroy, OnInit {
  apiURL: any;
  redirectSecounds: any;
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
  data = {
    BrandID: ''
  };
  vehicle = {
    userUID: '',
  }
  datas = {
    PROC_TYPE: '',
    MAKE: '',
    MODEL: '',
    YEAR: '',
    userUID: null
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
    vehicleNonPartDetails: ''
  };
  selectedYear: any;
  selectedOption2: any;
  selectedOption3: any;
  selectedOption4: any;
  selectedOption5: any;
  selectedOption6: any;
  selectedOption7: any;
  partDetails: any;
  vehicleDetails: any;
  vehicleDetailsFlag: any;
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
  private gridApi1: any;
  private gridColumnApi1: any;
  rowSelection1: any;
  frameworkComponents1: any;
  modules1 = [ClientSideRowModelModule];
  vehicleUID1: any;
  // AG Grid vehicle
  columnDefs1 = [
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
    { headerName: 'Option7', field: 'Option7', sortable: true, filter: true },
    { headerName: 'Option8', field: 'Option8', sortable: true, filter: true },
  ];
  rowData1: any;
  form: FormGroup;
  constructor(private http: HttpClient, private location: Location, public fb: FormBuilder, private router: Router) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.form = this.fb.group({
      headers: this.fb.array([])
    });
  }

  ngOnInit(): void {
    updatePageTitle('Add Vehicle Nonpart');
    //hideSearchText();
    this.rowSelection1 = 'multiple';
    this.vehicleDetailsFlag = false;
    this.getSection();
    this.getMake();
    this.apiFlag = false;
    this.vehicleUID1 = [];
    this.isSelectedVehicle = 0;
    this.updateBtnFlag = false;
    $('#psearch').prop('disabled', true);
    for (let i = 0; i < 12; i++) {
      this.addHeader();
    }
  }

  get headers(): FormArray {
    return this.form.get('headers') as FormArray;
  }

  get f(): any { return this.form.controls; }

  addHeaderFormGroup(): FormGroup {
    return this.fb.group({
      displayHeader: [''],
      value1: [''],
      value2: [''],
      value3: [''],
      value4: [''],
      value5: [''],
      value6: [''],
      value7: [''],
      value8: ['']
    });
  }

  addHeader(): void {
    this.headers.push(this.addHeaderFormGroup());
    $("#h_text").css("visibility", "hidden").css("display", "none");
  }

  deleteHeader(id: any): void {
    this.headers.removeAt(id);
  }

  back(): void {
    this.location.back();
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }

  getSection(): void {
    this.http.get<any>(this.apiURL + '/api/getsections')
      .subscribe(data => {
        let arrayofsection = []
        const Sectionselect = data.searchSections.find(q => q.searchSectionUID === 2)
        arrayofsection.push(Sectionselect)
        this.sections = arrayofsection
      });
  }

  getOptionSection(e): void {
    this.sectionList = e.target.value;
    $("#s_text").css("visibility", "hidden").css("display", "none");
  }

  getMake(): void {
    this.vehicle.userUID = localStorage.getItem('user_id');
    this.http.post<any>(this.apiURL + '/api/getmake', this.vehicle)
      .subscribe(data => {
        this.makes = (data as any).makeDetails;
      });
  }

  getModel(e): void {
    this.vehicleDetailsFlag = false;
    this.updateBtnFlag = false;
    $("select#sectionList").prop('selectedIndex', 0);
    $("select#brandList").prop('selectedIndex', 0);
    $("select#partList").prop('selectedIndex', 0);
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
    this.datas.userUID = localStorage.getItem('user_id');
    this.datas.MAKE = e.target.options[e.target.options.selectedIndex].text;
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
    this.http.post<any>(this.apiURL + '/api/getsearchdetailsforvehicles', this.vehicleData)
      .subscribe(data => {
        this.vehicleDetails = (data as any).VehicleSearchDetails;
        if (this.vehicleDetails.length > 0) {
          this.vehicleDetailsFlag = true;
          this.updateBtnFlag = true;
          setTimeout(() => {
            $("#uVehicle").prop("disabled", true);
            $("#uVehicle1").prop("disabled", true);
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
    if (this.gridApi1.getSelectedRows().length > 0) {
      // this.updateBtnFlag = true;
      $("#uVehicle").prop("disabled", false);
      $("#uVehicle1").prop("disabled", false);
      this.isSelectedVehicle = 1;
    }
    else {
      // this.updateBtnFlag = false;
      $("#uVehicle").prop("disabled", true);
      $("#uVehicle1").prop("disabled", true);
      this.isSelectedVehicle = 0;
    }
  }

  updateVehicleDetails(): void {
    let arrayString = '';
    if ($('#sectionList').val() === '') {
      $("#s_text").css("visibility", "visible").css("display", "block");
      return;
    }
    if (this.form.value.headers.length === 0) {
      $("#h_text").css("visibility", "visible").css("display", "block");
      return;
    } else {
      if (this.form.value.headers[0].displayHeader != '') {
        arrayString = '[';
        for (let i = 0; i < this.form.value.headers.length; i++) {
          arrayString += JSON.stringify(this.form.value.headers[i]);
          if (i !== (this.form.value.headers.length - 1)) {
            arrayString += ',';
          }
        }
        arrayString += ']';
      } else {
        $("#h_text").css("visibility", "visible").css("display", "block");
        return;
      }
    }
    const vehicleId = new Array();
    if (this.isSelectedVehicle == 1) {
      const vehicleSelectedRow = this.gridApi1.getSelectedRows().length;
      if (vehicleSelectedRow > 0) {
        const selectVehicle = this.gridApi1.getSelectedRows();
        selectVehicle.forEach(element => {
          vehicleId.push(element.vehicleUID);
        });
      }
    }
    this.apiFlag = true;
    this.updateVehicle.userUID = localStorage.getItem('user_id');
    this.updateVehicle.searchSectionUID = this.sectionList;
    this.updateVehicle.vehicleUID = vehicleId;
    this.updateVehicle.vehicleNonPartDetails = arrayString.replace('null', '');
    console.log(this.updateVehicle);
    this.http.post<any>(this.apiURL + '/api/updatevehicledetailsnonpart', this.updateVehicle)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Vehicle Details Updated Successfully!';
          document.getElementById('info_success').style.display = 'block';
          setTimeout(() => {
            this.close1();
          }, this.redirectSecounds);
        }
        else {
          this.successMessage = data.errors[0];
          document.getElementById('info_alert').style.display = 'block';
        }
      });
  }
  close1(): void {
    this.apiFlag = false;
    this.router.navigate(['/home/vehiclenonpart']);
  }

}


