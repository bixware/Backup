import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { PostService } from '../post.service';
declare var $: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-addvehiclegallery',
  templateUrl: './addvehiclegallery.component.html',
  styleUrls: ['./addvehiclegallery.component.css']
})
export class AddvehiclegalleryComponent implements OnInit {

  apiURL: any;
  submitted = false;
  successMessage: any;
  redirectSecounds: any;
  searchSectionName: any;
  form: FormGroup;
  clicked: any;
  apiFlag: any;
  sections: any;
  filedata: any;
  vehicleUID1: any;
  vehicleData = {
    make : '',
    model : '',
    year : [],
    option1 : [],
    option2 : [],
    option3 : [],
    option4 : [],
    option5 : [],
    option6 : []
  };
  datas = {
    PROC_TYPE : '',
    MAKE : '',
    MODEL : '',
    YEAR : '',
    userUID: null
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
  makes: any;
  years: any;
  models: any;
  ones: any;
  twos: any;
  threes: any;
  fours: any;
  fives: any;
  sixes: any;
  vehicle = {
    userUID: '',
  }
  options1 = {
    make : '',
    model : '',
    year : [],
    userUID: null
  };
  options2 = {
    make : '',
    model : '',
    year : [],
    option1 : [],
    userUID: null
  };
  options3 = {
    make : '',
    model : '',
    year : [],
    option1 : [],
    option2 : [],
    userUID: null
  };
  options4 = {
    make : '',
    model : '',
    year : [],
    option1 : [],
    option2 : [],
    option3 : [],
    userUID: null
  };
  options5 = {
    make : '',
    model : '',
    year : [],
    option1 : [],
    option2 : [],
    option3 : [],
    option4 : [],
    userUID: null
  };
  options6 = {
    make : '',
    model : '',
    year : [],
    option1 : [],
    option2 : [],
    option3 : [],
    option4 : [],
    option5 : [],
    userUID: null
  };
    searchSectionUID: any;
    searchSectionNotes: any;
    vehicleImage: []; 
    vehicleUID: []; 

    isSelectedVehicle: any;
    formErrorSection1: any;
    formErrorSection2: any;
    formErrorSection3: any;
    formErrorSection4: any;
    formatNotes: any;
  // AG Grid 
  gridApi: any;
  gridColumnApi: any;
  rowSelection: any ;
  frameworkComponents: any;
  modules = [ClientSideRowModelModule];
  columnDefs = [
    { headerName: 'Make', field: 'Make', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true,  checkboxSelection: true, headerCheckboxSelectionFilteredOnly: true, headerCheckboxSelection: true},
    { headerName: 'Model', field: 'Model', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Year', field: 'Year', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true },
    { headerName: 'Option1', field: 'Option1', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true },
    { headerName: 'Option2', field: 'Option2', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true },
    { headerName: 'Option3', field: 'Option3', sortable: true, filter: true },
    { headerName: 'Option4', field: 'Option4', sortable: true, filter: true },
    { headerName: 'Option5', field: 'Option5', sortable: true, filter: true },
    { headerName: 'Option6', field: 'Option6', sortable: true, filter: true },
  ];
  rowData: any;
  notesError: any;
  constructor(private http: HttpClient, private location: Location, public fb: FormBuilder, private postService: PostService) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.form = this.fb.group({
      searchSectionUID: ['', Validators.required],
      notes: this.fb.array([]),
      images: this.fb.array([])
   });
  }
  get f(): any { return this.form.controls; }

  get images(): FormArray {
    return this.form.get('images') as FormArray;
  }

  get notes(): FormArray {
    return this.form.get('notes') as FormArray;
  }

  ngOnInit(): void {
    updatePageTitle('Add Vehicle Gallery');
    this.addImage();
    this.addNote();
    this.getSection();
    this.getMake();
    this.rowSelection = 'multiple';
    this.vehicleDetailsFlag = false;
    this.filedata = [];
    this.vehicleUID = [];
    this.vehicleUID1 = [];
    this.isSelectedVehicle = 0;
    this.isVehicleSelectCheckbox();
    this.apiFlag = false;
    this.clicked = false;
    this.formErrorSection1 = false;
    this.formErrorSection2 = false;
    this.formErrorSection3 = false;
    this.formErrorSection4 = false;
    this.notesError = false;
  }

  addImageFormGroup(): FormGroup {
    return this.fb.group({
      galleryImage: ['']
    });
  }

  addImage(): void {
    this.submitted = false;
    this.images.push(this.addImageFormGroup());
  }

  deleteImage(id: any): void {
    this.submitted = false;
    this.images.removeAt(id);
    this.filedata.splice(id, 1);
  }

  addNotesFormGroup(): FormGroup {
    return this.fb.group({
      searchSectionNotes: ['']
    });
  }

  addNote(): void {
    if (this.notes.length === 4)
    {
      this.notesError = true;
      setTimeout(() => {
        this.notesError = false;
      }, this.redirectSecounds);
      return;
    }
    else {
      this.notesError = false;
    }
    this.submitted = false;
    this.notes.push(this.addNotesFormGroup());
  }

  deleteNote(id: any): void {
    this.submitted = false;
    this.notes.removeAt(id);
  }

  getSection(): void {
    this.http.get<any>(this.apiURL + '/api/getsections')
      .subscribe(data => {
        this.sections = (data as any).searchSections;
      });
  }

  back(): void {
    this.location.back();
  }

  fileEvent(e, i): void {
    this.filedata.splice(i, 1);
    this.filedata.splice(i, 0, e.target.files[0]);
    // this.filedata.push(e.target.files[0]);
  }

  close1(): void{
    this.apiFlag = false;
    if (this.clicked == true) {
      this.location.back();
      this.clicked = false;
    }
  }

  getMake(): void {
    this.vehicle.userUID = localStorage.getItem('user_id');
    this.http.post<any>(this.apiURL + '/api/getmake', this.vehicle)
      .subscribe(data => {
        this.makes = (data as any).makeDetails;
      });
        // get vehicle btn disable
         $("#getvehicledisabled").prop("disabled", true);
  }

  getModel(e): void {
    this.formErrorSection1 = false;
    this.formErrorSection4 = false;
    this.vehicleDetailsFlag = false;
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
      $("#getvehicledisabled").prop("disabled", true);
      
  }
  getYear(e): void {
    this.formErrorSection2 = false;
    this.formErrorSection4 = false;
    this.vehicleDetailsFlag = false;
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
      $("#getvehicledisabled").prop("disabled", true);
      
  }
  getOptionOne(e): void {
    this.formErrorSection3 = false;
    this.formErrorSection4 = false;
    this.vehicleDetailsFlag = false;
    this.vehicleData.option1 = [];
    this.vehicleData.option2 = [];
    this.vehicleData.option3 = [];
    this.vehicleData.option4 = [];
    this.vehicleData.option5 = [];
    this.vehicleData.option6 = [];
    this.options1.make = this.datas.MAKE;
    this.options1.model = this.datas.MODEL;
    this.selectedYear  = $('#year_list').val();
    this.vehicleData.year = this.selectedYear;
    this.options1.year =  this.selectedYear;
    this.options1.userUID = localStorage.getItem('user_id');
    // console.log(JSON.stringify(this.options1));
    $("#options_1_hide").css("visibility", "visible").css("display", "");
    $("#options_2_hide").css("visibility", "hidden").css("display", "none");
    $("#options_3_hide").css("visibility", "hidden").css("display", "none");
    $("#options_4_hide").css("visibility", "hidden").css("display", "none");
    $("#options_5_hide").css("visibility", "hidden").css("display", "none");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getoption1bymyear', this.options1)
      .subscribe(data => {
        this.ones = (data as any).option1Details;
        if(this.ones.length < 1) {
          $("#options_1_hide").css("visibility", "hidden").css("display", "none");
          $("#getvehicledisabled").prop("disabled", true);
        }
        else{
          $("#getvehicledisabled").prop("disabled", false);
        }
      });      
  }
  getOptionTwo(e): void {
    this.vehicleDetailsFlag = false;
    this.formErrorSection4 = false;
    this.vehicleData.option2 = [];
    this.vehicleData.option3 = [];
    this.vehicleData.option4 = [];
    this.vehicleData.option5 = [];
    this.vehicleData.option6 = [];
    this.options2.make = this.datas.MAKE;
    this.options2.model = this.datas.MODEL;
    this.options2.year = this.options1.year;
    this.selectedOption2  = $('#options_1').val();
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
        if(this.twos.length < 1) {
          $("#options_2_hide").css("visibility", "hidden").css("display", "none");
        }
    });
  }

  getOptionThree(e): void {
    this.vehicleDetailsFlag = false;
    this.formErrorSection4 = false;
    this.vehicleData.option3 = [];
    this.vehicleData.option4 = [];
    this.vehicleData.option5 = [];
    this.vehicleData.option6 = [];
    this.options3.make = this.datas.MAKE;
    this.options3.model = this.datas.MODEL;
    this.options3.year = this.options1.year;
    this.options3.option1 = this.options2.option1;
    this.selectedOption3  = $('#options_2').val();
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
        if(this.threes.length < 1) {
          $("#options_3_hide").css("visibility", "hidden").css("display", "none");
        }
    });
  }

  getOptionFour(e): void {
    this.vehicleDetailsFlag = false;
    this.formErrorSection4 = false;
    this.vehicleData.option4 = [];
    this.vehicleData.option5 = [];
    this.vehicleData.option6 = [];
    this.options4.make = this.datas.MAKE;
    this.options4.model = this.datas.MODEL;
    this.options4.year = this.options1.year;
    this.options4.option1 = this.options2.option1;
    this.options4.option2 = this.options3.option2;
    this.selectedOption4  = $('#options_3').val();
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
        if(this.fours.length < 1) {
          $("#options_4_hide").css("visibility", "hidden").css("display", "none");
        }
    });
  }

  getOptionFive(e): void {
    this.vehicleDetailsFlag = false;
    this.formErrorSection4 = false;
    this.vehicleData.option5 = [];
    this.vehicleData.option6 = [];
    this.options5.make = this.datas.MAKE;
    this.options5.model = this.datas.MODEL;
    this.options5.year = this.options1.year;
    this.options5.option1 = this.options2.option1;
    this.options5.option2 = this.options3.option2;
    this.options5.option3 = this.options4.option3;
    this.selectedOption5  = $('#options_4').val();
    this.options5.option4 = this.selectedOption5;
    this.options5.userUID = localStorage.getItem('user_id');
    this.vehicleData.option4 = [];
    this.vehicleData.option4 = this.selectedOption5;
    $("#options_5_hide").css("visibility", "visible").css("display", "");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getoption5bymoption4', this.options5)
      .subscribe(data => {
        this.fives = (data as any).option5Details;
        if(this.fives.length < 1) {
          $("#options_5_hide").css("visibility", "hidden").css("display", "none");
        }
    });
  }

  getOptionSix(e): void {
    this.vehicleDetailsFlag = false;
    this.formErrorSection4 = false;
    this.vehicleData.option6 = [];
    this.options6.make = this.datas.MAKE;
    this.options6.model = this.datas.MODEL;
    this.options6.year = this.options1.year;
    this.options6.option1 = this.options2.option1;
    this.options6.option2 = this.options3.option2;
    this.options6.option3 = this.options4.option3;
    this.selectedOption6  = $('#options_5').val();
    this.options6.option4 = this.selectedOption6;
    this.options6.userUID = localStorage.getItem('user_id');
    this.vehicleData.option5 = [];
    this.vehicleData.option5 = this.selectedOption6;
    $("#options_6_hide").css("visibility", "visible").css("display", "");
    this.http.post<any>(this.apiURL + '/api/getoption6bymoption5', this.options6)
      .subscribe(data => {
        this.sixes = (data as any).option6Details;
        if(this.sixes.length < 1) {
          $("#options_6_hide").css("visibility", "hidden").css("display", "none");
        }
    });
  }

  getOptionSeven(e): void {
    this.vehicleDetailsFlag = false;
    this.formErrorSection4 = false;
    this.selectedOption7  = $('#options_6').val();
    this.vehicleData.option6 = [];
    this.vehicleData.option6 = this.selectedOption7;
  }

  getVehicleDetails(): void {
    this.formErrorSection4 = false;
  //console.log(this.vehicleData);
  this.http.post<any>(this.apiURL + '/api/getsearchdetailsforvehicles', this.vehicleData)
      .subscribe(data => {
        this.vehicleDetails = (data as any).VehicleSearchDetails;
        // console.log(this.vehicleDetails);
        if (this.vehicleDetails)
        {
          this.vehicleDetailsFlag = true;
        }
      });
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.http.post<any>(this.apiURL + '/api/getsearchdetailsforvehicles', this.vehicleData)
    .subscribe(data => {
          this.rowData = (data as any).VehicleSearchDetails;
    });
  }
  onSelectionChanged(): void {
   this.formErrorSection4 = false;
    // if(this.gridApi.getSelectedRows().length === this.gridApi.getDisplayedRowCount()){
    if(this.gridApi.getSelectedRows().length>0)
    {
      this.isSelectedVehicle=1;
    }
    else
    {
      this.isSelectedVehicle=0;
    }
 // }
  }

  isVehicleSelectCheckbox(): void{
    if(parseInt(localStorage.getItem('role_id'))==6||parseInt(localStorage.getItem('role_id'))==7)
    {
        $( "#isVehicleSelectCheckbox").prop('checked', true);
    }
    if ($( "#isVehicleSelectCheckbox").is(':checked')) {
      $("#getvehicledisabled").prop("disabled", true);
   }
      // Once check is checked and make is enabled
      if ($( "#isVehicleSelectCheckbox").is(':checked')) {
        $("#make_list").prop("disabled", false);
      }
      else{
        
        $("#make_list").prop("disabled", true);
      }

      if($( "#isVehicleSelectCheckbox").is(':checked')){
        return;
      }
      else{
      this.formErrorSection4 = false;
      $("#getvehicledisabled").prop("disabled", true);
      $("#model_list_hide").css("visibility", "visible").css("display", "none");
      $("#year_list_hide").css("visibility", "hidden").css("display", "none");
      $("#options_1_hide").css("visibility", "hidden").css("display", "none");
      $("#options_2_hide").css("visibility", "hidden").css("display", "none");
      $("#options_3_hide").css("visibility", "hidden").css("display", "none");
      $("#options_4_hide").css("visibility", "hidden").css("display", "none");
      $("#options_5_hide").css("visibility", "hidden").css("display", "none");
      $("#options_6_hide").css("visibility", "hidden").css("display", "none");
      $('.getvehicledetails').hide();
    }

    if( $( "#isVehicleSelectCheckbox").prop('checked', false)){
      $(function () {
        $("#make_list").find("option:selected").prop('selected',false);
  });

    }
  }
 
  addGallery(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('roleUID', localStorage.getItem('role_id'));
    myFormData.append('searchSectionUID', this.form.value.searchSectionUID);
    this.notes.value.forEach(element => {
      this.formatNotes = element.searchSectionNotes.replace(/(?:\r\n|\r|\n)/g, '');
      this.formatNotes = this.formatNotes.replace(/"/g, "'");
      if(this.formatNotes){
      myFormData.append('searchSectionNotes[]', this.formatNotes);
    }
    });

    this.filedata.forEach(element => {
      myFormData.append('vehicleImage[]', element);
    });

    if (this.isSelectedVehicle == 1)
    {
      var vehicleSelectedRow = this.gridApi.getSelectedRows().length;
      if (vehicleSelectedRow > 0)
      {
        const vehicleUID = this.gridApi.getSelectedRows();
        vehicleUID.forEach(element => {
          myFormData.append('vehicleUID[]', element.vehicleUID);
        });
      }
    }
    //Validation 
    if ($("#isVehicleSelectCheckbox").is(':checked')) {
        if (this.isSelectedVehicle == 0)
        {
          if (this.vehicleData.make.length == 0)
          {
            this.formErrorSection1 = true;
            return;
          } else if (this.vehicleData.model.length == 0)
          {
            this.formErrorSection2 = true;
            return;
          } else if (this.vehicleData.year.length == 0)
          {
            this.formErrorSection3 = true;
            return;
          } else{
            this.formErrorSection4 = true;
            return;
          }
       }
    }
    this.apiFlag = true;
    this.clicked = true;
    this.http.post<any>(this.apiURL + '/api/addVehicleGallery', myFormData)
    .subscribe(data => {
      document.getElementById('text').style.display = 'none';
      if (data.return_code == 0) {
        this.successMessage = 'Vehicle Gallery Added Successfully !';
        document.getElementById('info_success').style.display = 'block';
        setTimeout(() => {
          this.close1();
        }, this.redirectSecounds);
      }
      else{
        this.successMessage = data.errors[0];
        this.clicked = false;
        document.getElementById('info_alert').style.display = 'block';
      }
    });

  }

}

