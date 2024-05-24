import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { GridOptions } from '@ag-grid-community/core';
import { MenuEditCellRendererComponent } from '../menu-edit-cell-renderer/menu-edit-cell-renderer.component';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Location } from '@angular/common';
declare var $: any;
declare var updatePageTitle: any;
//declare var hideSearchText: any;
@Component({
  selector: 'app-managemenu',
  templateUrl: './managemenu.component.html',
  styleUrls: ['./managemenu.component.css']
})
export class ManagemenuComponent implements OnInit {
  public gridOptions: GridOptions;
  apiURL: any;
  roles: any = [];
  searchValue: any;
  gridApi: any;
  gridColumnApi: any;
  frameworkComponents: any;
  modules = [ClientSideRowModelModule];
  redirectSecounds: any;
  form: FormGroup;
  filedata: any;
  submitted = false;
  parents: any;
  //roles: any;
  dummy: any;
  selectedRole: any;
  clicked: any;
  apiFlag: any;
  successMessage: any;
  public role = {
    menuUID: ''
  };
  menuName: any;
  menuURL: any;
  menuIcon: any;
  isExternalLink: any;
  public isActive = '';
  public userUID = '';
  public menuUID = '';

  selectedIndex: any;

  rolesApplicable: any;
  public imageView: any;

  columnDefs = [
    {
      headerName: 'Actions', field: 'menuUID', width: 100, sortable: false, filter: false,
      cellRenderer: 'menuEditCellRendererComponent',
    },
    {
      headerName: 'Menu Name', field: 'menuName', width: 185, sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    {
      headerName: 'Roles Applicable', field: 'roles', width: 550, sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true,
    },
    { headerName: 'Menu URL', field: 'menuURL', width: 200, sortable: true },
    { headerName: 'Parent Menu', field: 'parentMenu', width: 150, sortable: true },
  ];
  rowData: any;
  editFlag : any;
  constructor(private http: HttpClient, private httpClient: HttpClient, private location: Location, public fb: FormBuilder, private router: Router) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.form = this.fb.group({
      menuName: ['', Validators.required],
      menuURL: ['', Validators.required],
      menuIcon: [''],
      isExternalLink: ['', Validators.required],
      parentMenu: ['', Validators.required],
      ParentMenuDetails: [''],
      options: this.fb.array([])
    });
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
  }

  get f(): any { return this.form.controls; }

  get options(): FormArray {
    return this.form.get('options') as FormArray;
  }

  addOptionFormGroup(): FormGroup {
    return this.fb.group({
      option: ['']
    });
  }

  addOptions(): void {
    for (let i = 0; i < this.roles.length; i++) {
      this.options.push(this.addOptionFormGroup());
    }
  }

  back(): void {
    this.location.back();
  }

  fileEvent(e): void {
    this.filedata = e.target.files[0];
  }

  ngOnInit(): void {
    updatePageTitle('Manage Menu');
    //hideSearchText();
    this.editFlag = false;
    this.frameworkComponents = {
      menuEditCellRendererComponent: MenuEditCellRendererComponent
    };

    /*  this.filedata = '';
     this.clicked = false;
     this.apiFlag = false; */
    this.ParentMenuDetails();
    this.roleDetails();
  }

  clickEditmenu(value): void {
    this.editFlag = true;
    this.ParentMenuDetails();
    this.roleDetails();
    this.filedata = '';
    this.role.menuUID = value;
    this.getMenuDetails();
    this.clicked = false;
    this.apiFlag = false;
    this.selectCheckBox();
  }

  AddMenu(): void {
    this.submitted = false;
    this.editFlag = false;
    $('#modalAddmenu').css('display', 'block');
    this.form.patchValue({
      menuName: '',
      menuURL: '',
      menuIcon: '',
      isExternalLink: '',
      parentMenu: '',
      ParentMenuDetails: '',
      options: []
    });
    this.rolesApplicable = [];
    this.selectCheckBox();
  }

  setCustomValidators(value): void {
    if (value == '1')
    {
      this.form.get('menuIcon').setValidators([Validators.required]);
      this.form.get('menuIcon').updateValueAndValidity();
    }
    else {
      this.form.get('menuIcon').clearValidators();
      this.form.get('menuIcon').updateValueAndValidity();
    }
    if (value == '0') {
      this.form.get('ParentMenuDetails').setValidators([Validators.required]);
      this.form.get('ParentMenuDetails').updateValueAndValidity();
    }
    else {
      this.form.get('ParentMenuDetails').clearValidators();
      this.form.get('ParentMenuDetails').updateValueAndValidity();
    }
  }

  /* ParentMenuDetails(): void{
    this.http.post<any>(this.apiURL + '/api/parentmenus', this.dummy)
      .subscribe(data => {
       this.parents = (data as any).ParentMenuDetails;
       //this.form.get('ParentMenuDetails').patchValue(9);
    });
  }

  roleDetails(): void {
    this.http.get<any>(this.apiURL + '/api/getroles')
      .subscribe(data => {
       this.roles = (data as any).partDetails;
       this.addOptions();
    });
  } */

  ParentMenuDetails(): void {
    this.http.post<any>(this.apiURL + '/api/parentmenus', this.dummy)
      .subscribe(data => {
        this.parents = (data as any).ParentMenuDetails;
        setTimeout(() => {
          this.form.get('ParentMenuDetails').patchValue(this.selectedIndex);
        }, 555);
      });
  }

  roleDetails(): void {
    this.http.get<any>(this.apiURL + '/api/getroles')
      .subscribe(data => {
        this.roles = (data as any).partDetails;
        this.roles.forEach(
          (item) => {
            item.checked = false;
          });
        this.addOptions();
        console.log(this.roles);
      });
  }

  getMenuDetails(): void {
    this.http.post<any>(this.apiURL + '/api/editmenus/' + this.role.menuUID, this.role)
      .subscribe(data => {
        console.log(data);
        if (data.return_code == 0) {
          this.form.patchValue({
            menuName: data.edit_details.menuName,
            menuURL: data.edit_details.menuURL,
            menuIcon: data.edit_details.menuIcon,
            isExternalLink: data.edit_details.isExternalLink
          });
          this.rolesApplicable = data.menuRole_details;
          this.isActive = data.edit_details.isActive;
          this.menuUID = data.edit_details.menuUID;
          this.selectParentMenu(data.edit_details.parentMenu);
          this.selectedIndex = data.edit_details.parentMenu;
          this.selectCheckBox();
        }
      });
    this.ParentMenuDetails();
  }

  selectCheckBox(): void {
    if (this.rolesApplicable && this.rolesApplicable.length > 0) {
      for (let i = 0; i < this.roles.length; i++) {
        for (let j = 0; j < this.rolesApplicable.length; j++) {
          if (this.roles[i].roleUID == this.rolesApplicable[j].roleUID) {
            this.roles[i].checked = true;
          }
        }
      }
    }
    else {
      for (let i = 0; i < this.roles.length; i++) {
        this.roles[i].checked = false;
      }
    }

  }

  onCheckboxChange(role, event) {
    for (let i = 0; i < this.roles.length; i++) {
      if (this.roles[i].roleUID == event.target.value) {
        if (event.target.checked === true) {
          this.roles[i].checked = true;
        } else {
          this.roles[i].checked = false;
        }
      }
    }
  }

  selectParentMenu(v): void {
    if (v == '1') {
      this.form.get('parentMenu').patchValue(0);
    }
    else {
      this.form.get('parentMenu').patchValue(1);
    }
  }

  close1(): void {
    this.apiFlag = false;
    if (this.clicked == true) {
      this.clicked = false;
    }
    $('#modalAddmenu').css('display', 'none');
    $('#modalEditmenu').css('display', 'none')
  }

  addMenu(): void {
    this.submitted = true;
    this.selectedRole = '[';
    for (let i = 0; i < this.roles.length; i++) {
      this.selectedRole += '{"roleUID":' + $('#role' + i).val() + ',"checked":';
      if (this.roles[i].checked === true) {
        this.selectedRole += 'true';
      }
      else {
        this.selectedRole += 'false';
      }
      this.selectedRole += '}';
      if (i !== (this.roles.length - 1)) {
        this.selectedRole += ',';
      }
    }
    this.selectedRole += ']';
    if (this.form.invalid) {
      return;
    }
    this.apiFlag = true;
    this.clicked = true;
    const myFormData = new FormData();
    myFormData.append('menuName', this.form.value.menuName);
    myFormData.append('menuURL', this.form.value.menuURL);
    myFormData.append('menuIcon', this.form.value.menuIcon);
    myFormData.append('parentMenu', this.form.value.parentMenu);
    myFormData.append('isExternalLink', this.form.value.isExternalLink);
    myFormData.append('ParentMenuSection', this.form.value.ParentMenuDetails);
    myFormData.append('rolesApplicable', this.selectedRole);
    myFormData.append('userUID', localStorage.getItem('user_id'));
    this.http.post<any>(this.apiURL + '/api/createmenus', myFormData)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Menu Added Successfully !';
          $('#modalAddmenu').css('display', 'none');
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

  editMenu(): void {
    this.submitted = true;
    this.selectedRole = '[';
    for (let i = 0; i < this.roles.length; i++) {
      this.selectedRole += '{"roleUID":' + $('#role' + i).val() + ',"checked":';
      console.log($('#role' + i).prop('checked'));
      if (this.roles[i].checked === true) {
        this.selectedRole += 'true';
      }
      else {
        this.selectedRole += 'false';
      }
      this.selectedRole += '}';
      if (i !== (this.roles.length - 1)) {
        this.selectedRole += ',';
      }
    }
    this.selectedRole += ']';
    if (this.form.invalid) {
      return;
    }
    this.apiFlag = true;
    this.clicked = true;
    const myFormData = new FormData();
    myFormData.append('menuName', this.form.value.menuName);
    myFormData.append('menuURL', this.form.value.menuURL);
    myFormData.append('menuIcon', this.form.value.menuIcon);
    myFormData.append('parentMenu', this.form.value.parentMenu);
    myFormData.append('isExternalLink', this.form.value.isExternalLink);
    myFormData.append('ParentMenuSection', this.form.value.ParentMenuDetails);
    myFormData.append('rolesApplicable', this.selectedRole);
    myFormData.append('menuUID', this.menuUID);
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('isActive', this.isActive);
    myFormData.append('ParentMenuDetails', this.form.value.ParentMenuDetails);
    console.log(this.form);
    this.http.post<any>(this.apiURL + '/api/updatemenus', myFormData)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Menu Updated Successfully !';
          $('#modalAddmenu').css('display', 'none');
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

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.httpClient.get<any>(this.apiURL + '/api/getmenus')
      .subscribe(data => {
        this.rowData = (data as any).MenuDetails;
      });
  }

  refreshGrid(){
    this.httpClient.get<any>(this.apiURL + '/api/getmenus')
    .subscribe(data => {
      this.rowData = (data as any).MenuDetails;
    });
  }
  quickSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  }

}

