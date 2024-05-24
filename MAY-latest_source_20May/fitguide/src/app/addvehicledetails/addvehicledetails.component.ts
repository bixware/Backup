import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
declare var $: any;
declare var hideSearchText: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-addvehicledetails',
  templateUrl: './addvehicledetails.component.html',
  styleUrls: ['./addvehicledetails.component.css']
})
export class AddvehicledetailsComponent implements OnDestroy, OnInit {
  apiURL: any;
  redirectSecounds: any;
  clicked: any;
  apiFlag: any;
  sections: any;
  brands: any;
  parts: any;
  sectionList: string;
  brandList: string;
  bundleUID: any;
  partList: string;
  partVehicleUID: any;
  dHeader: string;
  info: boolean;
  successMessage: string;
  public dummy = {
    ArchStatus: null
  }
  make = {
    userUID: ''
  };
  data = {
    BrandID: '',
    SectionUID: ''
  };
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
    brandUID: '',
    partUID: '',
    displayHeader: [],
    vehicleUID: [],
    userUID: null,
    shortDescription: ''
  };
  updateBundleVehicle = {
    bundleUID: '',
    displayHeader: [],
    vehicleUID: []
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
  partDetailsFlag: any;
  partBundleDetailsFlag: any;
  updateBtnFlag: any;
  bundleFlag: any;
  partFlag: any;
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
  bundleparts = [];
  isSelectedVehicle: any;
  // AG Grid Part
  private gridApi: any;
  private gridColumnApi: any;
  rowSelection: any;
  frameworkComponents: any;
  modules = [ClientSideRowModelModule];
  private gridApi1: any;
  private gridColumnApi1: any;
  private gridApi2: any;
  private gridColumnApi2: any;
  rowSelection1: any;
  frameworkComponents1: any;
  modules1 = [ClientSideRowModelModule];
  columnDefs = [
    {
      headerName: 'partNumber', field: 'partNumber', sortable: true, checkboxSelection: true, headerCheckboxSelection: true
    },
    {
      headerName: 'UPCCode', field: 'UPCCode', sortable: true
    },
    {
      headerName: 'COST', field: 'COST', sortable: true
    },
    { headerName: 'Short Description', field: 'shortDescription', width: 360, sortable: true },
    { headerName: 'Display Header', field: 'displayHeader', width: 360, editable: true },
  ];
  columnDefs2 = [
    {
      headerName: 'partNumber', field: 'partNumber', sortable: true
    }, 
    {
      headerName: 'UPCCode', field: 'UPCCode', sortable: true
    },
    {
      headerName: 'COST', field: 'COST', sortable: true
    },
    { headerName: 'Short Description', field: 'shortDescription', width: 360, sortable: true }
  ];
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
    { headerName: 'Option3', field: 'Option3', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Option4', field: 'Option4', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Option5', field: 'Option5', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Option6', field: 'Option6', sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
  ];
  rowData1: any;
  rowData2: any;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
  }

  ngOnInit(): void {
    //hideSearchText();
    this.rowSelection = '';
    this.rowSelection1 = 'multiple';
    this.vehicleDetailsFlag = false;
    this.partDetailsFlag = false;
    this.partBundleDetailsFlag = false;
    this.getSection();
    this.getBrand();
    this.getMake();
    this.apiFlag = false;
    this.vehicleUID1 = [];
    this.isSelectedVehicle = 0;
    this.updateBtnFlag = false;
    this.brandList ='';
    this.sectionList = '';
    this.bundleUID = '';
    this.bundleFlag = false;
    this.partFlag = true;
    updatePageTitle('Add Vehicle Details');
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
  }

  getSection(): void {
    this.http.get<any>(this.apiURL + '/api/getsections')
      .subscribe(data => {
        this.sections = (data as any).searchSections;
      });
  }

  getBrand(): void {
    this.dummy.ArchStatus = '0';
    this.http.post<any>(this.apiURL + '/api/getbrand', this.dummy)
      .subscribe(data => {
        this.brands = (data as any).brandDetails;
      });
  }

  getOptionSection(e): void {
    console.log(e.target.value);
    this.sectionList = e.target.value;
    this.partDetailsFlag = false;
    this.partBundleDetailsFlag = false;
    this.data.SectionUID = e.target.value;
    this.data.BrandID = this.brandList;
    this.parts = [];
    $("#uVehicle").prop("disabled", true);
    this.isSelectedVehicle = 0;
    $("#s_text").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getpartsbybrand', this.data)
    .subscribe(data => {
      this.parts = (data as any).PartsDetailsByBrand;
    });
  }
  getOptionBrand(e): void {
    console.log(e.target.value);
    this.brandList = e.target.value;
    this.partDetailsFlag = false;
    this.partBundleDetailsFlag = false;
    this.data.BrandID = e.target.value;
    this.data.SectionUID = this.sectionList;
    this.parts = [];
    $("#uVehicle").prop("disabled", true);
    this.isSelectedVehicle = 0;
    $("#b_text").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getpartsbybrand', this.data)
      .subscribe(data => {
        this.parts = (data as any).PartsDetailsByBrand;
      });
  }

  getOptionPart(e): void {
    console.log(e.target.value);
    this.partList = e.target.value;
    this.partDetailsFlag = false;
    this.partBundleDetailsFlag = false;
    $("#p_text").css("visibility", "hidden").css("display", "none");
    $("#uVehicle").prop("disabled", true);
    this.isSelectedVehicle = 0;
  }

  getPartDetails(): void {  
    if (!this.sectionList) {
      $("#s_text").css("visibility", "visible").css("display", "");
      return;
    }
    if (!this.brandList) {
      $("#b_text").css("visibility", "visible").css("display", "");
      return;
    }
    if (!this.partList) {
      $("#p_text").css("visibility", "visible").css("display", "");
      return;
    }
    const partVehicleID = new Array();
    if (this.vehicleDetails.length > 0) {
      this.vehicleDetails.forEach(element => {
        console.log("partvehicleUID", element.vehicleUID);
        partVehicleID.push(element.vehicleUID);
      });
    }
    if (this.sectionList && this.brandList && this.partList) {
      this.partData.headUID = this.sectionList;
      this.partData.brandUID = this.brandList;
      this.partData.PartUID = this.partList;
      this.partData.vehicleUID = partVehicleID;
      this.http.post<any>(this.apiURL + '/api/getpartsdetails', this.partData)
        .subscribe(data => {
          this.partDetails = (data as any).partDetails;
          // if (this.partDetails.length > 0) {
          //   this.partDetailsFlag = true;
          // }

          if (this.partDetails.length > 0) {
            this.partDetailsFlag = true;
            var i = 0;
           // console.log(this.partDetails[0].partDisplayHeader); 
            if (this.partDetails[0].displayHeader != '' && this.partDetails[0].displayHeader != null )
            { 

              for(i=0;i<this.vehicleDetails.length;i++)
              {
                this.gridApi1.getRowNode(i).setDataValue('partDisplayHeader',this.partDetails[0].displayHeader);
              }
            }
            else{
              for(i = 0; i < this.vehicleDetails.length; i++)
              {
                this.gridApi1.getRowNode(i).setDataValue('partDisplayHeader',"");
              }
            }

          }
          if (this.gridApi1.getSelectedRows().length > 0 && this.gridApi.getSelectedRows().length > 0) {
            // this.updateBtnFlag = true;
            $("#uVehicle").prop("disabled", false);
             this.isSelectedVehicle = 1;
           }
           else {
            // this.updateBtnFlag = false;
            $("#uVehicle").prop("disabled", true);
             this.isSelectedVehicle = 0;
           }
        });
    }
  }

  getPartBundleDetails(): void {  
    if (!this.bundleUID) {
      $("#bundle_text").css("visibility", "visible").css("display", "");
      return;
    }
    this.partBundleDetailsFlag = true;
    if (this.gridApi1.getSelectedRows().length > 0 && this.partBundleDetailsFlag == true) {
      $("#uVehicle").prop("disabled", false);
      this.isSelectedVehicle = 1;
     }
     else {
      $("#uVehicle").prop("disabled", true);
      this.isSelectedVehicle = 0;
     }
  }

  getBundleUID(e): void {
    this.partBundleDetailsFlag = false;
    this.bundleUID = e.target.value;
    $("#bundle_text").css("visibility", "hidden").css("display", "none");
    $("#uVehicle").prop("disabled", true);
    this.isSelectedVehicle = 0;
  }


  //Get Partdetails AG Grid
  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.http.post<any>(this.apiURL + '/api/getpartsdetails', this.partData)
      .subscribe(data => {
        this.rowData = (data as any).partDetails;
      });
  }

  onSelectionChanged(): void {
    if (this.gridApi1.getSelectedRows().length > 0 && this.gridApi.getSelectedRows().length > 0) {
     // this.updateBtnFlag = true;
     $("#uVehicle").prop("disabled", false);
      this.isSelectedVehicle = 1;
    }
    else {
     // this.updateBtnFlag = false;
     $("#uVehicle").prop("disabled", true);
      this.isSelectedVehicle = 0;
    }
  }

  onSelectionChanged1(): void {
    if(this.partBundleDetailsFlag == false) {
      if (this.gridApi1.getSelectedRows().length > 0 && this.gridApi.getSelectedRows().length > 0) {
        // this.updateBtnFlag = true;
        $("#uVehicle").prop("disabled", false);
        this.isSelectedVehicle = 1;
      }
      else {
        // this.updateBtnFlag = false;
        $("#uVehicle").prop("disabled", true);
        this.isSelectedVehicle = 0;
      }
    } else if (this.gridApi1.getSelectedRows().length > 0 && this.partBundleDetailsFlag == true) {
      $("#uVehicle").prop("disabled", false);
      this.isSelectedVehicle = 1;
     }
     else {
      $("#uVehicle").prop("disabled", true);
      this.isSelectedVehicle = 0;
     }
  }

  onCellValueChanged(e): void {

    var i = 0;
    for (i = 0; i < this.vehicleDetails.length; i++) {
      this.gridApi1.getRowNode(i).setDataValue('partDisplayHeader', e.value);
    }
  }

  getMake(): void {
    this.make.userUID = localStorage.getItem('user_id');
    this.http.post<any>(this.apiURL + '/api/getmake', this.make)
      .subscribe(data => {
        this.makes = (data as any).makeDetails;
      });
  }

  getModel(e): void {
    this.vehicleDetailsFlag = false;
    this.partDetailsFlag = false;
    this.partBundleDetailsFlag = false;
    this.updateBtnFlag = false;
    // $("select#sectionList").prop('selectedIndex', 0);
    // $("select#brandList").prop('selectedIndex', 0);
    // $("select#partList").prop('selectedIndex', 0);
    // $("select#bundleNamedropdown").prop('selectedIndex', 0);
    // $("#psearch").prop("disabled", true);
    // $("#bsearch").prop("disabled", true);
    this.vehicleData.model = '';
    this.vehicleData.year = [];
    this.vehicleData.option1 = [];
    this.vehicleData.option2 = [];
    this.vehicleData.option3 = [];
    this.vehicleData.option4 = [];
    this.vehicleData.option5 = [];
    this.vehicleData.option6 = [];
    this.datas.userUID = localStorage.getItem('user_id');
    this.datas.PROC_TYPE = 'MODEL';
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
    this.vehicleData.model = e.target.value;
    this.datas.userUID = localStorage.getItem('user_id');
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
    console.log( $('#year_list').val());
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
    this.http.post<any>(this.apiURL + '/api/getoption1bymyear-addvehicle', this.options1)
      .subscribe(data => {
        if(data.return_code === 0 ){
          this.ones = (data as any).option1Details;
          if (this.ones.length < 1) {
            $("#options_1_hide").css("visibility", "hidden").css("display", "none");
          }
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
    this.options2.userUID = localStorage.getItem('user_id');
    this.selectedOption2 = $('#options_1').val();
    this.options2.option1 = this.selectedOption2;
    this.vehicleData.option1 = [];
    this.vehicleData.option1 = this.selectedOption2;
    $("#options_2_hide").css("visibility", "visible").css("display", "");
    $("#options_3_hide").css("visibility", "hidden").css("display", "none");
    $("#options_4_hide").css("visibility", "hidden").css("display", "none");
    $("#options_5_hide").css("visibility", "hidden").css("display", "none");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getoption2bymoption1-addvehicle', this.options2)
      .subscribe(data => {
        if(data.return_code === 0 ){
          this.twos = (data as any).option2Details;
          if (this.twos.length < 1) {
            $("#options_2_hide").css("visibility", "hidden").css("display", "none");
          }
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
    this.options3.userUID = localStorage.getItem('user_id');
    this.selectedOption3 = $('#options_2').val();
    this.options3.option2 = this.selectedOption3;
    this.vehicleData.option2 = [];
    this.vehicleData.option2 = this.selectedOption3;
    $("#options_3_hide").css("visibility", "visible").css("display", "none");
    $("#options_4_hide").css("visibility", "hidden").css("display", "none");
    $("#options_5_hide").css("visibility", "hidden").css("display", "none");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getoption3bymoption2-addvehicle', this.options3)
      .subscribe(data => {
        if(data.return_code === 0 ){
          this.threes = (data as any).option3Details;
          if (this.threes.length < 1) {
            $("#options_3_hide").css("visibility", "hidden").css("display", "none");
          }
          else
          $("#options_3_hide").css("visibility", "hidden").css("display", "block");
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
    this.options4.userUID = localStorage.getItem('user_id');
    this.options4.option3 = this.selectedOption4;
    this.vehicleData.option3 = [];
    this.vehicleData.option3 = this.selectedOption4;
    $("#options_4_hide").css("visibility", "visible").css("display", "none");
    $("#options_5_hide").css("visibility", "hidden").css("display", "none");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getoption4bymoption3-addvehicle', this.options4)
      .subscribe(data => {
        if(data.return_code === 0 ){
          this.fours = (data as any).option4Details;
          if (this.fours.length < 1) {
            $("#options_4_hide").css("visibility", "hidden").css("display", "none");
          }
          else
          $("#options_3_hide").css("visibility", "hidden").css("display", "block");
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
    this.options5.userUID = localStorage.getItem('user_id');
    this.selectedOption5 = $('#options_4').val();
    this.options5.option4 = this.selectedOption5;
    this.vehicleData.option4 = [];
    this.vehicleData.option4 = this.selectedOption5;
    $("#options_5_hide").css("visibility", "visible").css("display", "none");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getoption5bymoption4-addvehicle', this.options5)
      .subscribe(data => {
        if(data.return_code === 0 ){
          this.fives = (data as any).option5Details;
          if (this.fives.length < 1) {
            $("#options_5_hide").css("visibility", "hidden").css("display", "none");
          }
          else
          $("#options_3_hide").css("visibility", "hidden").css("display", "block");
        }
      
      });
  }

  getOptionSix(e): void {
    console.log($('#options_5').val());
    this.vehicleDetailsFlag = false;
    this.updateBtnFlag = false;
    this.vehicleData.option6 = [];
    this.options6.make = this.datas.MAKE;
    this.options6.model = this.datas.MODEL;
    this.options6.year = this.options1.year;
    this.options6.option1 = this.options2.option1;
    this.options6.option2 = this.options3.option2;
    this.options6.option3 = this.options4.option3;
    this.options6.userUID = localStorage.getItem('user_id');
    this.selectedOption6 = $('.options_5').val();
    this.options6.option4=[];
    this.options6.option4 =<any>$('#options_4').val();
    this.options6.option5=<any>$('#options_5').val();
    this.vehicleData.option5 = [];
    this.vehicleData.option5 = <any>$('#options_5').val();
    $("#options_6_hide").css("visibility", "visible").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getoption6bymoption5-addvehicle', this.options6)
      .subscribe(data => {
        if(data.return_code === 0 ){
          this.sixes = (data as any).option6Details;
          if (this.sixes.length < 1) {
            $("#options_6_hide").css("visibility", "hidden").css("display", "none");
          }
          else
          $("#options_3_hide").css("visibility", "hidden").css("display", "block");
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

  getbundleform(): void{
    this.getBundlelist();
    this.partFlag = false;
    this.bundleFlag = true;
    this.partDetailsFlag = false;
    this.partBundleDetailsFlag = false;
    $("#uVehicle").prop("disabled", true);
    setTimeout(() => {
      $("#bundleNamedropdown").val(this.bundleUID);
    }, 1000);
  }

  getpartform(): void{
    this.bundleFlag = false;
    this.partFlag = true;
    this.partDetailsFlag = false; 
    this.partBundleDetailsFlag = false;
    $("#uVehicle").prop("disabled", true);
    setTimeout(() => {
      $("#sectionList").val(this.sectionList);
      $("#brandList").val(this.brandList);
      $("#partList").val(this.partList);
    }, 1000);    
  }

  getBundlelist(): void {
    this.http.get<any>(this.apiURL + '/api/getbundle')
      .subscribe(data => {
        this.bundleparts = (data as any).partBundle;
      });
  }

  getVehicleDetails(): void {
    this.http.post<any>(this.apiURL + '/api/getsearchdetailsforvehicles-addvehicle', this.vehicleData)
      .subscribe(data => {
        this.vehicleDetails = (data as any).VehicleSearchDetails;
        if (this.vehicleDetails.length > 0) {
          this.vehicleDetailsFlag = true;
          this.updateBtnFlag = true;
          setTimeout(() => {
            $("#uVehicle").prop("disabled", true);
          }, 1000);
         
        }
      });
  }

  onGridReady1(params): void {
    this.gridApi1 = params.api;
    this.gridColumnApi1 = params.columnApi;
    this.http.post<any>(this.apiURL + '/api/getsearchdetailsforvehicles-addvehicle', this.vehicleData)
      .subscribe(data => {
        this.rowData1 = (data as any).VehicleSearchDetails;
      });
  }

  onGridReady2(params): void {
    this.gridApi2 = params.api;
    this.gridColumnApi2 = params.columnApi;
    this.http.post<any>(this.apiURL + '/api/getbundlepartdetails', {"bundleUID":this.bundleUID})
      .subscribe(data => {
        this.rowData2 = (data as any).partDetails;
      });
  }

  updateVehicleDetails(): void {
    const vehicleId = new Array();
    const dHeaderId = new Array();
    if (this.isSelectedVehicle == 1) {
      let vehicleSelectedRow = this.gridApi1.getSelectedRows().length;
      if (vehicleSelectedRow > 0) {
        const selectVehicle = this.gridApi1.getSelectedRows();
        selectVehicle.forEach(element => {
          vehicleId.push(element.vehicleUID);
          dHeaderId.push(element.partDisplayHeader);
        });
      }
    }
    this.apiFlag = true;
    if(this.partBundleDetailsFlag == true) {
      this.updateBundleVehicle.bundleUID = this.bundleUID;
      this.updateBundleVehicle.vehicleUID = vehicleId;
      this.updateBundleVehicle.displayHeader = dHeaderId;
      console.log(this.updateBundleVehicle)
      this.http.post<any>(this.apiURL + '/api/updatebundlepartvehicledetails', this.updateBundleVehicle)
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
    } else {
      this.updateVehicle.userUID = localStorage.getItem('user_id');
      this.updateVehicle.searchSectionUID = this.sectionList;
      this.updateVehicle.brandUID = this.brandList;
      this.updateVehicle.partUID = this.partList;
      this.updateVehicle.vehicleUID = vehicleId;
      this.updateVehicle.displayHeader = dHeaderId;
      this.updateVehicle.shortDescription = this.partDetails[0].shortDescription;
      console.log(this.updateVehicle)
      this.http.post<any>(this.apiURL + '/api/updatevehicledetails', this.updateVehicle)
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
  }

  close1(): void {
    this.apiFlag = false;
    this.gridApi.deselectAll();
    this.gridApi1.deselectAll();
    // this.vehicleDetailsFlag = false;
    /* this.partDetailsFlag = false;
    this.partBundleDetailsFlag = false;
    $("#uVehicle").prop("disabled", true);
    $("select#sectionList").prop('selectedIndex', 0);
    $("select#brandList").prop('selectedIndex', 0);
    $("select#partList").prop('selectedIndex', 0);
    this.sectionList = "";
    this.brandList = "";
    this.partList = "";
    this.bundleUID = ""; */
    // $("#psearch").prop("disabled", true);
    // $("select#make_list").prop('selectedIndex', 0);
    // $("#model_list_hide").css("visibility", "visible").css("display", "none");
    // $("#year_list_hide").css("visibility", "hidden").css("display", "none");
    // $("#options_1_hide").css("visibility", "hidden").css("display", "none");
    // $("#options_2_hide").css("visibility", "hidden").css("display", "none");
    // $("#options_3_hide").css("visibility", "hidden").css("display", "none");
    // $("#options_4_hide").css("visibility", "hidden").css("display", "none");
    // $("#options_5_hide").css("visibility", "hidden").css("display", "none");
    // $("#options_6_hide").css("visibility", "hidden").css("display", "none");
  }

}


