import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { GridOptions } from '@ag-grid-community/core';
import { environment } from 'src/environments/environment';
import { ContentEditCellRendererComponent } from '../content-edit-cell-renderer/content-edit-cell-renderer.component';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { Location } from '@angular/common';
declare var $: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-managerole',
  templateUrl: './managerole.component.html',
  styleUrls: ['./managerole.component.css']
})

export class ManageroleComponent implements OnInit {
  public gridOptions: GridOptions;
  apiURL: any;
  gridApi: any;
  gridColumnApi: any;
  frameworkComponents: any;
  modules = [ClientSideRowModelModule];
  redirectSecounds: any;
  form: FormGroup;
  clicked: any;
  apiFlag: any;
  successMessage: any;
  dtOptions: DataTables.Settings = {};
  roles: any = [];

  public error1 = false;
  public successMsg = '';

  public role = {
    roleUID: null,
    roleName: null,
  };
 
  columnDefs = [
    { headerName: 'Actions', field: 'contentUID', sortable: false, filter: false,
    cellRenderer: 'contentEditCellRendererComponent', width: 120,
    },
    { headerName: 'Role Name', field: 'roleName',sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
     { headerName: 'IsActive', field: 'isActive',  sortable: true},
  ];
  rowData: any;

  constructor(private httpClient: HttpClient, private router: Router, private location: Location, private route: ActivatedRoute, public fb: FormBuilder) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.form = this.fb.group({
      roleName: [''],
      roleUID:['']
    });
    this.gridOptions = <GridOptions>{
      context: {
          componentParent: this
      }
    };
   }

   get f(): any { return this.form.controls; }

   clickEditContent(params): void{
    this.clicked = false;
    this.apiFlag = false;
    this.form.patchValue({
      roleName: params.data.roleName,
      roleUID: params.data.roleUID
    })
  }

  edit(role: any): void{
    role.editFlag = true;
  }

  hideRole(role: any): void{
    role.editFlag = false;
  }

  ngOnInit(): void {
    updatePageTitle('Manage Role');
    this.frameworkComponents = {
      contentEditCellRendererComponent: ContentEditCellRendererComponent
    };
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: [[0, 'asc'] ]
    };
  
    }

    onGridReady(params): void {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.gridApi.sizeColumnsToFit();
      this.httpClient.get<any>(this.apiURL + '/api/getroles')
      .subscribe(data => {
        console.log(data);
        this.roles = (data as any).partDetails;
        this.roles.forEach(element => {
         if(element.isActive)
         element.isActive = "Active";
         else
         element.isActive = "Inactive";
        });
      this.rowData = this.roles;
      });
    }

    close1(): void{
      this.apiFlag = false;
      if (this.clicked == true) {
        this.clicked = false;
      }
    }

refreshGrid(){
  this.httpClient.get<any>(this.apiURL + '/api/getroles')
  .subscribe(data => {
    console.log(data);
    this.roles = (data as any).partDetails;
    this.roles.forEach(element => {
     if(element.isActive)
     element.isActive = "Active";
     else
     element.isActive = "Inactive";
    });
  this.rowData = this.roles;
  });
}

    updateRoleName(e): void {
    //  console.log("name", f);
    this.role.roleUID = e.target.name;
    var dummy = e.target.id;
    this.role.roleName = $("#roleName"+ dummy).val();
    $("#roleName"+ dummy).val("");
    console.log( $("#roleName"+ dummy).val());
    this.httpClient.post<any>(this.apiURL + '/api/roleupdate', this.role)
      .subscribe(data => {
        if (data.return_code == 0) {
          $("#roleMsg"+ dummy).text(this.role.roleName);
          this.error1 = true;
          this.successMsg = 'Role Name Updated Successfully!';
          setTimeout(() => {
            this.close1();
          }, 5000);

        }
        else{
          console.log(data);
        }
      });
  }
  editContent(): void {
    if (this.form.invalid) {
      return;
    }
    this.apiFlag = true;
    this.clicked = true;
    this.role.roleUID = this.form.value.roleUID;
    this.role.roleName = this.form.value.roleName;
    console.log(this.role);
    this.httpClient.post<any>(this.apiURL + '/api/roleupdate', this.role)
    .subscribe(data => {
       document.getElementById('text').style.display = 'none';
      if (data.return_code == 0) {
         this.successMessage = 'Role Updated Successfully !';
         $('#modalEditContent').css('display', 'none');
        document.getElementById('info_success').style.display = 'block';
        this.gridApi.refreshCells();
        this.refreshGrid();
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

  cancelIgn():void{
    this.apiFlag = false;
    if (this.clicked == true) {
      this.clicked = false;
    }
    $('#modalEditContent').css('display', 'none')
  }

  // back(): void {
  //   this.location.back();
  // }

}



