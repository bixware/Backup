import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { GridOptions } from '@ag-grid-community/core';
import { environment } from 'src/environments/environment';
import { ContentEditCellRendererComponent } from '../content-edit-cell-renderer/content-edit-cell-renderer.component';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { Location } from '@angular/common';
declare var $: any;
/* import { AngularEditorConfig } from '@kolkov/angular-editor'; */

//declare var hideSearchText: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-managecontent',
  templateUrl: './managecontent.component.html',
  styleUrls: ['./managecontent.component.css']
})
export class ManagecontentComponent implements OnInit {
  public gridOptions: GridOptions;
  apiURL: any;
  searchValue: any;
  gridApi: any;
  gridColumnApi: any;
  frameworkComponents: any;
  modules = [ClientSideRowModelModule];
  smallText: any;
  redirectSecounds: any;
  imgURL: any;
  form: FormGroup;
  public getContent = {
    roleUID : '',
    userUID: '',
    contentUID: ''
  };
  clicked: any;
  apiFlag: any;
  successMessage: any;
  filedata: any;
  prevImage: any;
  richText: boolean;
  html: any;
 /*  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  }; */
  public user = {
    roleUID: '',
    userUID: ''
  }
   columnDefs = [
    { headerName: 'Actions', field: 'contentUID', width: 100, sortable: false, filter: false,
    cellRenderer: 'contentEditCellRendererComponent',
    },
    { headerName: 'Page Name', field: 'PageName', width: 244, sortable: true, filter: 'agTextColumnFilter', floatingFilter: true },
    { headerName: 'Section Name', field: 'SectionName', width: 244, sortable: true},
    { headerName: 'Text Data', field: 'TextData', width: 388, sortable: true},
  ];
  rowData: any;
  modifyData: any;
  constructor(private httpClient: HttpClient, private router: Router, private location: Location, private route: ActivatedRoute, public fb: FormBuilder) {
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.form = this.fb.group({
      pageName: [''],
      sectionName: [''],
      textData: [''],
      imageData: [''],
      editorContent: [this.html]
    });
    this.gridOptions = <GridOptions>{
      context: {
          componentParent: this
      }
    };
  }

  get f(): any { return this.form.controls; }

  clickEditContent(value): void{
    this.clicked = false;
    this.apiFlag = false;
    this.richText = false;
    this.filedata = '';
    /* this.route.params.subscribe(params => {
      this.getContent.contentUID = params['id'];
    }); */
    this.getContent.contentUID = value.value;
    if (this.getContent.contentUID == '7') {
      this.richText = true;
    }
    this.getContent.roleUID = localStorage.getItem('role_id');
    this.getContent.userUID = localStorage.getItem('user_id');
    this.httpClient.post<any>(this.apiURL + '/api/editcontent/' + this.getContent.contentUID, this.getContent)
    .subscribe(data => {
      console.log(data);
      this.form.patchValue({
        pageName: data.contentEditDetails.PageName,
        sectionName: data.contentEditDetails.SectionName,
        textData: data.contentEditDetails.TextData
      });
      if (this.richText == true) {
        this.html = data.contentEditDetails.TextData;
      }
      if (data.contentEditDetails.ImageData != null)
      {
        let temp = data.contentEditDetails.imageURL;
        temp = temp.replace(/\\/g, '');
        this.prevImage = this.imgURL + '/' + temp + data.contentEditDetails.ImageData;
      }
    });
  }

  ngOnInit(): void {
    updatePageTitle('Manage Content');
    //hideSearchText();
    this.frameworkComponents = {
      contentEditCellRendererComponent: ContentEditCellRendererComponent
    };
  }
  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
    this.user.roleUID = localStorage.getItem('role_id');
    this.user.userUID = localStorage.getItem('user_id');
    this.httpClient.post<any>(this.apiURL + '/api/getallcontent', this.user)
          .subscribe(data => {
          this.modifyData = (data as any).contentDetails;
          for (let i = 0; i < this.modifyData.length; i++)
          {
            if (this.modifyData[i].contentUID == 16) {
              let passtext: any;
              passtext = '';
              for (let x = 0; x < this.modifyData[i].TextData.length; x++) {
                passtext += '*';
              }
              this.modifyData[i].TextData = passtext;
            }
          }
          this.rowData = this.modifyData;
          this.modifyContent();
    });
  }
  modifyContent(): void {
    for (let i = 0; i < this.rowData.length; i++)
    {
        if (this.rowData[i].contentUID == 10) {
          this.smallText = this.rowData[i].TextData.substring(0, 50);
        }
    }
  }
  quickSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  }

refreshGrid(){
  this.user.roleUID = localStorage.getItem('role_id');
  this.user.userUID = localStorage.getItem('user_id');
  this.httpClient.post<any>(this.apiURL + '/api/getallcontent', this.user)
        .subscribe(data => {
        this.modifyData = (data as any).contentDetails;
        for (let i = 0; i < this.modifyData.length; i++)
        {
          if (this.modifyData[i].contentUID == 16) {
            let passtext: any;
            passtext = '';
            for (let x = 0; x < this.modifyData[i].TextData.length; x++) {
              passtext += '*';
            }
            this.modifyData[i].TextData = passtext;
          }
        }
        this.rowData = this.modifyData;
        this.modifyContent();
  });
}

  close1(): void{
    this.apiFlag = false;
    if (this.clicked == true) {
      // this.location.back();
      this.clicked = false;
    }
  }

  editContent(): void {
    if (this.form.invalid) {
      return;
    }
    this.apiFlag = true;
    this.clicked = true;
    const myFormData = new FormData();
    myFormData.append('roleUID', localStorage.getItem('role_id'));
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('contentUID', this.getContent.contentUID);
    if (this.richText == true) {
      myFormData.append('TextData', this.html);
    }
    else {
      myFormData.append('TextData', this.form.value.textData);
    }    
    myFormData.append('ImageData', this.filedata);
    console.log(this.form);
    this.httpClient.post<any>(this.apiURL + '/api/updatecontent', myFormData)
    .subscribe(data => {
      document.getElementById('text').style.display = 'none';
      if (data.return_code == 0) {
        this.successMessage = 'Content Updated Successfully !';
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
      // this.location.back();
      this.clicked = false;
    }
    $('#modalEditContent').css('display', 'none')
  }

  back(): void {
    this.location.back();
  }

  fileEvent(e): void {
    this.filedata = e.target.files[0];
  }
}

