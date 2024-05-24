import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { UserEditCellRendererComponent } from '../user-edit-cell-renderer/user-edit-cell-renderer.component';
import { TrialCellRendererComponent } from '../trial-cell-renderer/trial-cell-renderer.component';
import { GridOptions } from "@ag-grid-community/core";
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
declare var updatePageTitle: any;
declare var hideSearchText: any;
@Component({
  selector: 'app-globalusers',
  templateUrl: './globalusers.component.html',
  styleUrls: ['./globalusers.component.css']
})
export class GlobalusersComponent implements OnInit {
  apiURL: any;
  redirectSecounds: any;
  searchValue: any;
  gridApi: any;
  gridColumnApi: any;
  frameworkComponents: any;
  modules = [ClientSideRowModelModule,CsvExportModule];
  public role = {
    roleUID: null,
    userUID: null,
    PROC_TYPE:'',
    ArchStatus: '',
    TrialStatus:''
    
  };
  public dummy = {
    userUID: '',
    ArchStatus: '',
    TrialStatus:'',
    PROC_TYPE:''
  }
  roleUID: any;
  defaultColDef: any;
  sortingOrder: any;
  successMessage: any;
  apiFlag: any;
  clicked: boolean;
  gridOptions: any;
  form: FormGroup;
  submitted: any;
 
  Adduser: any;
  
  users: any;
  menuRole: any;
  menus: any;
  roles: any;
  //parameters
/* 
  public role = {
    roleUID: null,
    userUID: null,
  }; */
  terms = {
    roleUID: null,
    termsofuse: null
  }
  rolename: any;
  params: any;
  public error_msg = "";
  public con_error_msg = "";
  public error = false;
  public success_msg = '';
  public error1 = false;
  public success_msg1 = '';
  public resert_pass = {
    userName: '',
      password: '', 
      conformpassword: '',
      hidden_user_id: ''
  }
// Admin global reser password button proccess declare the variable
  public user = {
    userUID : ''
  }
  columnDefs = [
    {
      headerName: 'Actions', field: 'userUID', width: 240, sortable: false, filter: false,
      cellRenderer: 'userEditCellRendererComponent',
    },
    { headerName: 'First Name', field: 'firstName', sortingOrder: ['asc','desc'], filter: 'agTextColumnFilter',
    floatingFilter: true },
    { headerName: 'Last Name', field: 'lastName', width: 195, sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true },
    { headerName: 'User Name', field: 'userName', width: 195, sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true },
    { headerName: 'Role', field: 'roleName', width: 195, sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true },
    { headerName: 'Distributor Name', field: 'distributorName', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true },
    { headerName: 'Company Name', field: 'companyName', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true },
    { headerName: 'Store Name', field: 'storeName', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true },
    { headerName: 'User Since Date', field: 'userSinceDate', sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true },
    { headerName: 'Is Trial', field: 'isUserTrail', width: 195, sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true},
    { headerName: 'Is Active', field: 'isUserActive', width: 195, sortable: true, filter: 'agTextColumnFilter',
    floatingFilter: true}, 
    {  headerName: 'Trial Date', field: 'userTrailDate', width: 195, sortable: true, filter: 'agDateColumnFilter',
    floatingFilter: true,
    comparator: dateComparator,
    floatingFilterComponentParams: {
      suppressFilterButton: true
    },
    filterParams: {
      debounceMs: 500,
      suppressAndOrCondition: true,
      
      comparator: function(filterLocalDateAtMidnight, cellValue) {
        /* console.log(filterLocalDateAtMidnight +'filterLocalDateAtMidnight'); */
        if (cellValue == null) {
          return 0;
        }
        var dateParts = cellValue.split("-");
        var year = Number(dateParts[2]);
        var month = Number(dateParts[1]) - 1;
        var day = Number(dateParts[0]);
       /*  console.log(year+'-'+month+'-'+day); */
        var cellDate = new Date(year, month, day);

        if (cellDate < filterLocalDateAtMidnight) {
          return -1;
        } else if (cellDate > filterLocalDateAtMidnight) {
          return 1;
        } else {
          return 0;
        }
      }
    },cellRenderer: params => (params.value !=null || params.value !='')  ? params.data.TDate : "" },
    { headerName: 'Modified Date', field: 'userLatestModifedDate', width: 195, sortable: true, filter: 'agDateColumnFilter',
    floatingFilter: true,
    comparator: dateComparator,
    floatingFilterComponentParams: {
      suppressFilterButton: true
    },
    filterParams: {
      debounceMs: 500,
      suppressAndOrCondition: true,
      
      comparator: function(filterLocalDateAtMidnight, cellValue) {
        /* console.log(filterLocalDateAtMidnight +'filterLocalDateAtMidnight'); */
        if (cellValue == null) {
          return 0;
        }
        var dateParts = cellValue.split("-");
        var year = Number(dateParts[2]);
        var month = Number(dateParts[1]) - 1;
        var day = Number(dateParts[0]);
       /*  console.log(year+'-'+month+'-'+day); */
        var cellDate = new Date(year, month, day);

        if (cellDate < filterLocalDateAtMidnight) {
          return -1;
        } else if (cellDate > filterLocalDateAtMidnight) {
          return 1;
        } else {
          return 0;
        }
      }
    },cellRenderer: params => (params.value !=null || params.value !='')  ? params.data.modifiedDate : "" }
    // { headerName: 'Status', field: 'isActive', sortable: true },
  ];
  rowData: any;
  context:any;
  receiveAGGridEmit(rowIndex) {
    //alert(rowIndex);
    //var node = this.gridApi.getRowNode(rowIndex);
    //this.gridApi.applyTransaction({ remove: [this.rowData[rowIndex]] });
    //this.rowData.splice(rowIndex, 1);
    //this.gridApi.setRowData(this.rowData);
    this.clickEvent();
  }
  constructor(private httpClient: HttpClient, private router: Router,private location: Location,  public fb: FormBuilder, private route: ActivatedRoute) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.gridOptions = <GridOptions>{
      context: {
          componentParent: this
      }
  };
  this.form = this.fb.group({
    rolename: ['', Validators.required],
  });
  }

  back(): void {
    //this.location.back();
    $('#myModal').css('display', 'none');
    $('#passwordModal').css('display', 'none');
}

close1(): void{
  this.apiFlag = false;
  if (this.clicked == true) {
    this.location.back();
    this.clicked = false;
  }
  $('#info_success').css('display', 'none');
  $('#info_alert').css('display', 'none');
  this.form.reset();
  $('#myModal').css('display', 'none');
  $('#passwordModal').css('display', 'none');
}

/* close1(){
  $('#info_success').css('display', 'none');
  $('#info_alert').css('display', 'none');
  this.apiFlag = false;
} */

addterms():void {
  this.submitted = true;
  if (this.form.invalid) {
    return;
  }
  this.apiFlag = true;
  /* const myFormData = new FormData();
  myFormData.append('roleName', this.form.value.rolename); */
  this.terms.roleUID = this.form.value.rolename;
  if ($('#terms').prop('checked') === true)
    {
      this.terms.termsofuse = 1;
    }
    else
    {
      this.terms.termsofuse = 0;
    }
  this.httpClient.post<any>(this.apiURL + '/api/bulkeditterms', this.terms)
  .subscribe(data => {
    document.getElementById('text').style.display = 'none';
    if (data.return_code == 0) {
      this.successMessage = 'Terms Of Use Updated Successfully !';
      document.getElementById('info_success').style.display = 'block';
      setTimeout(() => {
        this.close1();
      }, this.redirectSecounds);
    }
    else {
      this.successMessage = data.errors[0];
      this.clicked = false;
      document.getElementById('info_alert').style.display = 'block';
    }
  });
}

  ngOnInit(): void {
    updatePageTitle('Users List');
    //hideSearchText();
    this.roleUID = localStorage.getItem('role_id');
    this.defaultColDef = {
      width: 195,
      sortable: true,
    };
    this.sortingOrder = ['asc', 'desc', null];
    this.frameworkComponents = {
      userEditCellRendererComponent: UserEditCellRendererComponent,
      trialCellRendererComponent: TrialCellRendererComponent
    };
    this.role.roleUID = localStorage.getItem('role_id');
    this.role.userUID = localStorage.getItem('user_id');
    this.clicked = false;
    this.submitted = false;
    this.apiFlag = false;
    this.roleDetails();
  }

  get f(): any { return this.form.controls; }
  
  roleDetails(): void {
    this.httpClient.post<any>(this.apiURL + '/api/getrolesbyroleid', this.role)
      .subscribe(data => {
       this.roles = (data as any).partDetails;
    });
  }

  clickEdit(): void{
    $('#myModal').css('display', 'block');
  }

  close2(): void{
    $('#info_archive').hide();
    $('#archive_error').hide();
  }

  clickEditResetpassword(value): void {
   /*  this.route.params.subscribe(params => {
      this.user.userUID = params['id'];
    }); */
    this.user.userUID = value;
    if(this.user.userUID != undefined){
      this.httpClient.post<any>(this.apiURL + '/api/resetuserspassword/'+ this.user.userUID,this.user)
      .subscribe(data => {
         console.log(data);
        this.resert_pass.userName = data.user_details.userName;
        this.resert_pass.hidden_user_id = data.user_details.userUID;
      });
    }
    else{
      this.resert_pass.userName = localStorage.getItem('userName');
      this.resert_pass.hidden_user_id = localStorage.getItem('user_id');
    }

  }
    
    validatePassword(f: NgForm){
       console.log(this.resert_pass);
      if(this.resert_pass.password == this.resert_pass.conformpassword){
        if(this.resert_pass.password.length >= 6){
          this.con_error_msg = '';
          this.apiFlag = true;
          this.httpClient.post<any>(this.apiURL + '/api/updateresetpassword', this.resert_pass)
          .subscribe(data => {
            $('#text').css('display', 'none');
            if(data.return_code != 1){
              $('#info_success').css('display', 'block');
              this.successMessage = data.success_message;
              //console.log(this.successMessage);
              setTimeout(() => {
                this.close1();
              }, this.redirectSecounds);
              this.resert_pass.password = '';
              this.resert_pass.conformpassword = '';
            }
            else{
              $('#info_alert').css('display', 'block');
              this.success_msg1 = data.err_message;              
            }
          });
        }
        else{
          this.error_msg = 'The password must be at least 6 characters';
        }
      }
      else{
        this.con_error_msg = 'Password does not match';
      }
      
    }

    onKey(e){
      this.resert_pass.password = e.target.value;
      if(this.resert_pass.password.length < 6){
        this.error_msg = "The password must be at least 6 characters";
      }
      else{
        this.error_msg = "";
      }
    }
    onKeyup(e){
      this.resert_pass.conformpassword = e.target.value;
      if(this.resert_pass.password != this.resert_pass.conformpassword){
        this.con_error_msg = 'Password does not match';
      }
      else{
        this.con_error_msg = '';
      }
    }
    close(){
      $('#info_success').css('display', 'none');
      $('#info_alert').css('display', 'none');
      this.apiFlag = false;
    }

    

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    
    const sortModel = [
      {
        colId: 'firstName', sort: 'desc'
      }
    ];
    this.gridApi.setSortModel(sortModel);
    this.role.roleUID = localStorage.getItem('role_id');
    this.role.userUID = localStorage.getItem('user_id');
    this.role.PROC_TYPE = 'SELECT_USER_ALL';
    this.role.ArchStatus = '0';
    this.role.TrialStatus = '0';
    
    this.httpClient.post<any>(this.apiURL + '/api/userlist', this.role)
      .subscribe(data => {
        if (data.return_code == 1) {
          this.apiFlag = true;
          this.clicked = true;
          this.successMessage = 'No User Data !';
          document.getElementById('info_success').style.display = 'block';
          setTimeout(() => {
               this.close1();
          }, this.redirectSecounds);
        }
        else {
          this.rowData = (data as any).user_details;
        }
      });
  }

  clickEvent(): void {
    if($('#archive').prop('checked')){
      this.dummy.ArchStatus = '1';
    }
    else{
      this.dummy.ArchStatus = '0';
    }
      this.dummy.TrialStatus = '0';
      this.dummy.userUID = localStorage.getItem('user_id');
      this.dummy.PROC_TYPE = 'SELECT_ARCHIVE_USER';
      this.httpClient.post<any>(this.apiURL + '/api/userlist', this.dummy)
      .subscribe(data => {
          this.rowData = (data as any).user_details;
          this.gridApi.setRowData(this.rowData); 
       });
   }

   clickTrailEvent(): void {
    if($('#isTrial').prop('checked')){
      this.dummy.TrialStatus = '1';
    }
    else{
      this.dummy.TrialStatus = '0';
    }
    this.dummy.ArchStatus = '0';
    this.dummy.userUID = localStorage.getItem('user_id');
    this.dummy.PROC_TYPE = 'SELECT_TRIAL_USER';
      this.httpClient.post<any>(this.apiURL + '/api/userlist', this.dummy)
      .subscribe(data => {
          this.rowData = (data as any).user_details;
          this.gridApi.setRowData(this.rowData); 
       });
   }

   onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

  quickSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  }
  // DATE COMPARATOR FOR SORTING
 
// HELPER FOR DATE COMPARISON

}

function dateComparator(date1, date2) {
  var date1Number = monthToNum(date1);
  var date2Number = monthToNum(date2);

  if (date1Number === null && date2Number === null) {
    return 0;
  }
  if (date1Number === null) {
    return -1;
  }
  if (date2Number === null) {
    return 1;
  }

  return date1Number - date2Number;
}

function monthToNum(date) {
  if (date === undefined || date === null || date.length !== 10) {
    return null;
  }

  var yearNumber = date.substring(6, 10);
  var monthNumber = date.substring(3, 5);
  var dayNumber = date.substring(0, 2);

  var result = yearNumber * 10000 + monthNumber * 100 + dayNumber;
  // 29/08/2004 => 20040829
  return result;
}


