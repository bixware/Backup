import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
//declare var $: any;
import { environment } from 'src/environments/environment';
import { PostService } from '../post.service';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { SectionEditCellRendererComponent } from '../section-edit-cell-renderer/section-edit-cell-renderer.component';
import { GridOptions } from "@ag-grid-community/core";
declare var $: any;
declare var watchPages: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-sectionmaster',
  templateUrl: './sectionmaster.component.html',
  styleUrls: ['./sectionmaster.component.css']
})
export class SectionmasterComponent implements OnInit {
  redirectSecounds: any;
  form: FormGroup;
  editform: FormGroup;
  bulkeditform: FormGroup;
  submitted = false;
  submittedEdit = false;
  public userUID: '';
  public user = {
    searchSectionUID: ''
  }
  public searchSectionUID: '';
  public isActive = '';
  clicked: any;
  apiFlag: any;
  successMessage: any;
  apiURL: any;
  params: any;
  searchValue: any;
  gridApi: any;
  gridColumnApi: any;
  rowSelection: any;
  frameworkComponents: any;
  showButton = false;
  sortingOrder: any;
  gridOptions: any;
  searchSectionDetails: any;
  err: any;
  items: any;
  name: string;
  public users = {
    bulkEditSectionUID: ''
  };
  editbulk = {
    sectionUID: null
  };
  listStyle = {
    width: '500px',
    height: '150px',
    dropZoneHeight: '50px'
  };
  modules = [ClientSideRowModelModule];
  columnDefs = [
    { headerName: 'Actions', field: 'searchSectionUID', width: 190, sortable: false, filter: false, cellRenderer: 'sectionEditCellRendererComponent' },
    { headerName: 'Search Section Name', field: 'searchSectionName', width: 400, sortable: true, checkboxSelection: true, headerCheckboxSelection: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Search Section UID', field: 'searchSectionUID', width: 260, sortingOrder: ['asc', 'desc'], sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Search Section Order', field: 'searchsectionOrder', width: 250, sortingOrder: ['asc', 'desc'], sortable: true, filter: 'agTextColumnFilter', floatingFilter: true  }
  ];
  rowData: any;
  constructor(private httpClient: HttpClient, private http: HttpClient, private router: Router, private route: ActivatedRoute, private postService: PostService, private location: Location, public fb: FormBuilder) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
    this.form = this.fb.group({
      searchSectionName: ['', Validators.required],
      searchsectionOrder: ['']
    });
    this.editform = this.fb.group({
      searchSectionName: ['', Validators.required],
      searchsectionOrder: ['']
    });
    this.bulkeditform = this.fb.group({
      sections: this.fb.array([])
    });
  }
  get f(): any { return this.form.controls; }
  get e(): any { return this.editform.controls; }
  get b(): any { return this.bulkeditform.controls; }
  get sections(): FormArray {
    return this.bulkeditform.get('sections') as FormArray;
  }

  addSectionFormGroup(): FormGroup {
    return this.fb.group({
      searchSectionName: ['', Validators.required],
      searchsectionOrder: ['']
    });
  }

  ngOnInit(): void {
    this.clicked = false;
    this.apiFlag = false;
    this.rowSelection = '';
    //watchPages();
    $('#btnFlag').css('display', 'none');
    this.frameworkComponents = {
      sectionEditCellRendererComponent: SectionEditCellRendererComponent
    };
    this.sortingOrder = ['asc', 'desc', null];
    updatePageTitle('Section Master');
  }

  clickEdit(value): void {
    this.clicked = false;
    this.apiFlag = false;
    this.user.searchSectionUID = value;
    this.httpClient.post<any>(this.apiURL + '/api/editsearchsection/' + this.user.searchSectionUID, this.user)
      .subscribe(data => {
        console.log(data);
        if (data.return_code == 0) {
          this.editform.patchValue({
            searchSectionName: data.searchSectionDetails.searchSectionName,
            searchsectionOrder: data.searchSectionDetails.searchsectionOrder,
          });
          this.isActive = data.searchSectionDetails.isActive;
          this.searchSectionUID = data.searchSectionDetails.searchSectionUID;
        }
      });
  }

  onSelectionChanged(): void {
    if (this.gridApi.getSelectedRows().length === this.gridApi.getDisplayedRowCount()) {
      this.showButton = true;
    }
    else {
      this.showButton = false;
    }
  }

  listOrderChanged($event): void {
    //console.log($event);
  }

  bulkEdit(): void {
    
    const sectionUID = this.gridApi.getSelectedRows();
    const sectionUID1 = Array();
    sectionUID.forEach(element => {
      sectionUID1.push(element.searchSectionUID);
    });
    this.editbulk.sectionUID = sectionUID1;
    this.items = [];
    let arrayString = '[';
    let temp = '';
    for (let i = 0; i < this.editbulk.sectionUID.length; i++) {
      arrayString += '{"searchSectionUID":' + this.editbulk.sectionUID[i] + '}';
      if (i !== (this.editbulk.sectionUID.length - 1)) {
        arrayString += ',';
      }
    }
    arrayString += ']';
    this.users.bulkEditSectionUID = arrayString;
    this.http.post<any>(this.apiURL + '/api/bulkeditsearchsection', this.users)
      .subscribe(data => {
        setTimeout(() => {
          this.searchSectionDetails = (data as any).searchSectionDetails;
        temp = '[';
        for (let i = 0; i < this.searchSectionDetails.length; i++) {
          this.items.push(this.searchSectionDetails[i].searchSectionName);
          this['err' + i] = false;
          temp += '{ "searchSectionName": "' + this.searchSectionDetails[i].searchSectionName + '", "searchsectionOrder":"' + this.searchSectionDetails[i].searchsectionOrder + '"}';
          if (i !== (this.searchSectionDetails.length - 1)) {
            temp += ',';
          }
        }
        temp += ']';
        }, 1000);        
        //this.sections.setValue(JSON.parse(temp));
      });
    $('#sectionbulkeditModal').css('display', 'block');
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.params = params;
    const sortModel = [
      {
        colId: 'searchsectionOrder', sort: 'asc'
      }
    ];
    this.httpClient.get<any>(this.apiURL + '/api/getsections')
      .subscribe(data => {
        const sortSectionOrder = (data as any).searchSections;
        sortSectionOrder.sort((a, b) => {
          return a.searchsectionOrder - b.searchsectionOrder;
        });
        this.rowData = sortSectionOrder;
      });
  }

  quickSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  addSectionModal(): void {
    /* if (this.form.invalid) {
      return;
    } */
    //this.form.reset();
    this.submitted = false;
    this.form.patchValue({
      searchSectionName: '',
      searchsectionOrder:''
    })
    $('#myModal').css('display', 'block');
  }

  cancel(): void {
    $('#myModal').css('display', 'none');
  }

  cancelEdit(): void {
    $('#modalEdit').css('display', 'none');
  }

  cancelbulkEdit(): void {
    $('#sectionbulkeditModal').css('display', 'none');
  }

  close1(): void {
    this.apiFlag = false;
    if (this.clicked == true) {
      this.clicked = false;
    }
    $('#myModal').css('display', 'none');
    $('#modalEdit').css('display', 'none');
    $('#sectionbulkeditModal').css('display', 'none');
  }

refreshGrid(){
  this.httpClient.get<any>(this.apiURL + '/api/getsections')
  .subscribe(data => {
    const sortSectionOrder = (data as any).searchSections;
    sortSectionOrder.sort((a, b) => {
      return a.searchsectionOrder - b.searchsectionOrder;
    });
    this.rowData = sortSectionOrder;
  });
}

  addSection(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.apiFlag = true;
    this.clicked = true;
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('searchSectionName', this.form.value.searchSectionName);
    myFormData.append('searchsectionOrder', this.form.value.searchsectionOrder);
    console.log(myFormData);
    this.httpClient.post<any>(this.apiURL + '/api/addsearchsection', myFormData)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        console.log(data);
        if (data.return_code == 0) {
          this.successMessage = 'Section Added Successfully !';
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

  editSection(): void {
    this.submittedEdit = true;
    if (this.editform.invalid) {
      //console.log(this.editform.invalid)
      return;
    }
    this.apiFlag = true;
    this.clicked = true;
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('searchSectionName', this.editform.value.searchSectionName);
    myFormData.append('searchsectionOrder', this.editform.value.searchsectionOrder);
    myFormData.append('searchSectionUID', this.searchSectionUID);
    console.log(myFormData);
    this.http.post<any>(this.apiURL + '/api/updatesearchsection', myFormData)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Section Edited Successfully !';
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

  bulkEditSection(): void {
    this.submitted = true;
    let arrayString = '';
    arrayString = '[';
    this.searchSectionDetails.forEach((element, index) => {
      var searchsectionOrder = this.items.indexOf(element.searchSectionName) + 1;
      arrayString += '{ "searchSectionName": "' + element.searchSectionName + '", "searchsectionOrder":"' + searchsectionOrder + '", "searchSectionUID":' + element.searchSectionUID + '}';
      if (index !== (this.searchSectionDetails.length - 1))
      {
        arrayString += ',';
      }
    });
    arrayString += ']';
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('bulkEditSection', arrayString);
    this.apiFlag = true;
    this.clicked = true;
    this.http.post<any>(this.apiURL + '/api/bulkupdatesearchsection', myFormData)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Bulk Edits are Successfull !';
          document.getElementById('info_success').style.display = 'block';
          this.gridApi.refreshCells();
          this.refreshGrid();
          setTimeout(() => {
            this.close1();
          }, this.redirectSecounds);
        }
        else {
          let err = data.Error;
          err = '[' + err.substring(0, err.length - 1) + ']';
          err = JSON.parse(err);
          for (let i = 0; i < err.length; i++) {
            for (let j = 0; j < this.searchSectionDetails.length; j++) {
              if (this.searchSectionDetails[j].searchSectionUID == err[i]) {
                this['err' + j] = true;
              }
            }
          }
          this.successMessage = 'Not able to save, correct the below errors.';
          this.clicked = false;
          document.getElementById('info_alert').style.display = 'block';
        }
      });
  }

}
