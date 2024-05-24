import { Component, OnInit,Input ,Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { BannerEditCellRendererComponent } from '../banner-edit-cell-renderer/banner-edit-cell-renderer.component';
/* import { CustomTooltipComponent } from '../custom-tooltip/custom-tooltip.component'; */
import { StatictextComponent } from '../statictext/statictext.component';
//declare var hideSearchText: any;
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { YesNoCellRendererComponent } from '../yes-no-cell-renderer/yes-no-cell-renderer.component';
import { CustomTooltipComponent } from '../custom-tooltip/custom-tooltip.component';
declare var updatePageTitle: any;
@Component({
  selector: 'app-managebanners',
  templateUrl: './managebanners.component.html',
  styleUrls: ['./managebanners.component.css']
})
export class ManagebannersComponent implements OnInit {
  @Input() public bannerUID;
  @Input() public AGgridRowIndex;
  @Output() removedAGgridRowIndex = new EventEmitter<any>();
  apiURL: any;
  searchValue: any;
  gridApi: any;
  gridColumnApi: any;
  frameworkComponents: any;
  context;
  redirectSecounds: any;
  form: FormGroup;
  clicked: any;
  apiFlag: any;
  successMessage: any;
  submitted = false;
  filedata: any;
  filesectiondata: any;
  sections: any;
  bannerPanel: any;
  sectionPanel: any;
  sName: any;
  banners: any;
  imgURL: any;
  prevImage: any;
  secImage: any;
  isChecked: boolean = false;

  public getSection = {
    roleUID: '',
    userUID: ''
  };
  public getBanner = {
    bannerUID: '',
    searchSectionName: '',
    searchSectionUID: ''
  };
  receiveAGGridEmit(rowIndex) {
    console.log(rowIndex);
    var node = this.gridApi.getRowNode(rowIndex)
    this.gridApi.applyTransaction({ remove: [node.data] })
  }
  modules = [ClientSideRowModelModule];
  columnDefs = [

    {
      headerName: 'Actions', field: 'bannerUID', width: 300, sortable: false, filter: false,
      cellRenderer: 'bannerEditCellRendererComponent',
    },
    {
      headerName: 'Section Name', field: 'searchSectionName', sortable: true,
      filter: 'agTextColumnFilter', floatingFilter: true
    },
    { headerName: 'Is Right Banner', field: 'isRightBanner', sortable: true, cellRenderer: 'yesNoCellRendererComponent' },
    { headerName: 'Is Top Banner', field: 'isTopBanner',  sortable: true, cellRenderer: 'yesNoCellRendererComponent' },
    {
      headerName: 'Image Name', field: 'imageName', sortable: true, tooltipField: 'imageName',
      tooltipComponentParams: { color: '#ececec' }, tooltipComponent: 'customTooltipComponent',
      cellRenderer: 'statictextComponent'
    }];
  rowData: any;
  tooltipShowDelay: any;
  constructor(private httpClient: HttpClient, private router: Router, private route: ActivatedRoute, private location: Location, public fb: FormBuilder) {
    this.apiURL = environment.apiURL;
    this.context = { componentParent: this };
    this.redirectSecounds = environment.redirectSecounds;
    this.form = this.fb.group({
      rbform: this.fb.group({
        bannerImage: ['', Validators.required],
        Web: ['']
      }),
      norbform: this.fb.group({
        sectionName: ['', Validators.required],
        sectionNotes: ['', Validators.required],
        sectionImage: ['', Validators.required]
      })
    });
  }

  get f(): any { return this.form.controls; }

  ngOnInit(): void {
    updatePageTitle('Manage Banner');
    //hideSearchText();
    this.tooltipShowDelay = 0;
    this.frameworkComponents = {
      bannerEditCellRendererComponent: BannerEditCellRendererComponent,
      yesNoCellRendererComponent: YesNoCellRendererComponent,
      customTooltipComponent: CustomTooltipComponent,
      statictextComponent: StatictextComponent
    };
    this.clicked = false;
    this.apiFlag = false;
    this.submitted = false;
    $('#isRightBanner').prop('checked', true);
    this.bannerPanel = true;
    this.sectionPanel = false;
    this.filedata = '';
    this.filesectiondata = '';
    this.getSection.roleUID = localStorage.getItem('role_id');
    this.getSection.userUID = localStorage.getItem('user_id');
    this.httpClient.post<any>(this.apiURL + '/api/bannersectionlist', this.getSection)
      .subscribe(data => {
        console.log(data);
        this.sections = (data as any).sectionDetails;
      });
      this.getSections();
  }
  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.gridApi.sizeColumnsToFit();
    window.onresize = () => {
      this.gridApi.sizeColumnsToFit();
    }
    this.httpClient.get<any>(this.apiURL + '/api/getbanners')
      .subscribe(data => {
        if (data.return_code != 1) {
          this.rowData = (data as any).bannerDetails;
        } else {
          this.rowData = [];
        }
      });
  }

refreshGrid(){
  this.httpClient.get<any>(this.apiURL + '/api/getbanners')
  .subscribe(data => {
    if (data.return_code != 1) {
      this.rowData = (data as any).bannerDetails;
    } else {
      this.rowData = [];
    }
  });
}

  clickEditBanner(value): void {
    
    //console.log(params);
    //(this.form.controls['rbform'] as FormGroup).reset();
    //(this.form.controls['norbform'] as FormGroup).reset();
    /* this.clicked = false;
    this.apiFlag = false;
    this.filedata = '';
    this.filesectiondata = '';
    this.getSection.roleUID = localStorage.getItem('role_id');
    this.getSection.userUID = localStorage.getItem('user_id'); */
    /* this.route.params.subscribe(params => {
      this.getBanner.bannerUID = params['id'];
    }); */
    /* this.banners = params.data;
    if (params.data.isRightBanner == '1') {
      this.isChecked = true;
      this.bannerPanel = true;
      this.sectionPanel = false;
      this.form.get('rbform').get('Web').patchValue(params.data.bannerURL);
      let temp = params.data.imagePath;
      temp = temp.replace(/\\/g, '');
      this.prevImage = this.imgURL + 'storage/' + temp;
      $('#TopBannnerDiv').hide();
    }
    else if (params.data.isTopBanner == '1') {
      this.isChecked = true;
      this.bannerPanel = true;
      this.sectionPanel = false;
      this.form.get('rbform').get('Web').patchValue(params.data.bannerURL);
      let temp = params.data.imagePath;
      temp = temp.replace(/\\/g, '');
      this.prevImage = this.imgURL + 'storage/' + temp;
      $('#RightBannnerDiv').hide();
    }
    else {
      this.isChecked = false;
      $('#TopBannnerDiv').hide();
      $('#RightBannnerDiv').hide();
      this.bannerPanel = false;
      this.sectionPanel = true;
      this.form.get('norbform').get('sectionName').patchValue(params.data.searchSectionUID);
      this.form.get('norbform').get('sectionNotes').patchValue(params.data.SectionNotes);
      let temp = params.data.imagePath;
      temp = temp.replace(/\\/g, '');
      this.secImage = this.imgURL + 'storage/' + temp;
    } */
    
    this.getBanner.bannerUID = value;
    this.httpClient.post<any>(this.apiURL + '/api/editbanners/' + this.getBanner.bannerUID ,  this.getBanner)
    .subscribe(data => {
      console.log(data);
      this.banners = (data as any).bannerDetails;
      if (data.bannerDetails.isRightBanner == '1') {
        console.log(data.bannerDetails.isRightBanner)
        $('#isRightBanner').prop('checked', true);
        this.bannerPanel = true;
        this.sectionPanel = false;
        this.form.get('rbform').get('Web').patchValue(data.bannerDetails.bannerURL);      
        let temp = data.bannerDetails.imagePath;
        temp = temp.replace(/\\/g, '');
        this.prevImage = this.imgURL + 'storage/' + temp;
        $('#TopBannnerDiv').hide();
      } 
      else  if (data.bannerDetails.isTopBanner == '1') {
        $('#isTopBanner').prop('checked', true);       
        this.bannerPanel = true;
        this.sectionPanel = false;
        this.form.get('rbform').get('Web').patchValue(data.bannerDetails.bannerURL);
        let temp = data.bannerDetails.imagePath;
        temp = temp.replace(/\\/g, '');
        this.prevImage = this.imgURL + 'storage/' + temp;
        $('#RightBannnerDiv').hide();
      }
      else {
        $('#isRightBanner').prop('checked', false);
        $('#isTopBanner').prop('checked', false);
        $('#TopBannnerDiv').hide();
        $('#RightBannnerDiv').hide();
         this.bannerPanel = false;
        this.sectionPanel = true;
        /*this.getBanner.bannerUID = value;
        this.getBanner.searchSectionName = value;
        console.log(this.getBanner.bannerUID);
        console.log(this.getBanner.searchSectionName); */
        /* setTimeout(() => { */
         this.form.get('norbform').get('sectionName').patchValue(data.bannerDetails.searchSectionUID.toString());
         console.log(data.bannerDetails.searchSectionUID.toString());
         this.form.get('norbform').get('sectionNotes').patchValue(data.bannerDetails.SectionNotes);
        let temp = data.bannerDetails.imagePath;
        temp = temp.replace(/\\/g, '');
        this.secImage = this.imgURL + 'storage/' + temp;
       /*  }, 1000); */
      }
    });
  }

  clickDeleteBanner(value): void {
    this.AGgridRowIndex = value.rowIndex;
    this.bannerUID = value.value;
    console.log(this.AGgridRowIndex);
    console.log(this.bannerUID);
  }
  getSections(): void {
    this.httpClient.get<any>(this.apiURL + '/api/getsections')
      .subscribe(data => {
        this.sections = (data as any).searchSections;
        //this.clickEditBanner();
      });
  }

 /*  getBannerDetails(): void {
    this.httpClient.post<any>(this.apiURL + '/api/editbanners/' + this.getBanner.bannerUID, this.getBanner)
      .subscribe(data => {
        console.log(data);
        this.banners = (data as any).bannerDetails;
        if (data.bannerDetails.isRightBanner == '1') {
          $('#isRightBanner').prop('checked', true);
          this.bannerPanel = true;
          this.sectionPanel = false;
          this.form.get('rbform').get('Web').patchValue(data.bannerDetails.bannerURL);
          let temp = data.bannerDetails.imagePath;
          temp = temp.replace(/\\/g, '');
          this.prevImage = this.imgURL + 'storage/' + temp;
          $('#TopBannnerDiv').hide();
        }
        else if (data.bannerDetails.isTopBanner == '1') {
          $('#isTopBanner').prop('checked', true);
          this.bannerPanel = true;
          this.sectionPanel = false;
          this.form.get('rbform').get('Web').patchValue(data.bannerDetails.bannerURL);
          let temp = data.bannerDetails.imagePath;
          temp = temp.replace(/\\/g, '');
          this.prevImage = this.imgURL + 'storage/' + temp;
          $('#RightBannnerDiv').hide();
        }
        else {
          $('#isRightBanner').prop('checked', false);
          $('#isTopBanner').prop('checked', false);
          $('#TopBannnerDiv').hide();
          $('#RightBannnerDiv').hide();
          this.bannerPanel = false;
          this.sectionPanel = true;
          this.form.get('norbform').get('sectionName').patchValue(data.bannerDetails.searchSectionUID);
          this.form.get('norbform').get('sectionNotes').patchValue(data.bannerDetails.SectionNotes);
          let temp = data.bannerDetails.imagePath;
          temp = temp.replace(/\\/g, '');
          this.secImage = this.imgURL + 'storage/' + temp;
        }
      });
  } */

  AddBanner(): void {
    this.submitted = false;
    $('#isRightBanner').prop('checked', true);
    this.bannerPanel = true;
    this.sectionPanel = false;
    //(this.form.controls['rbform'] as FormGroup).reset();
    //(this.form.controls['norbform'] as FormGroup).reset();
    $('#modalAddBanner').css('display', 'block');
  }

  showPanel(val, val1): void {
    console.log('test')
    if ($('#' + val).prop('checked') === true) {
      $('#' + val1).prop('checked', false)
      this.bannerPanel = true;
      this.sectionPanel = false;
    }
    if ($('#' + val).prop('checked') === false && $('#' + val1).prop('checked') === false) {
      this.sectionPanel = true;
      this.bannerPanel = false;
    }
  }

  back(): void {
    this.location.back();
  }

  close1(): void {
    (this.form.controls['rbform'] as FormGroup).reset();
    (this.form.controls['norbform'] as FormGroup).reset();
    this.apiFlag = false;
    if (this.clicked == true) {
      //this.location.back();
      this.clicked = false;
    }
    $('#modalAddBanner').css('display', 'none');
    $('#modalEditBanner').css('display', 'none');
    $('#modalDeleteBanner').css('display', 'none');
  }

  fileEvent(e): void {
    this.filedata = e.target.files[0];
  }

  fileSectionEvent(e): void {
    this.filesectiondata = e.target.files[0];
  }

  addBanner(): void {
    this.submitted = true;
    if ($('#isRightBanner').prop('checked') === true) {
      if (this.form.get('rbform').invalid) {
        return;
      }
    }
    else if ($('#isTopBanner').prop('checked') === true) {
      if (this.form.get('rbform').invalid) {
        return;
      }
    }
    else {
      if (this.form.get('norbform').invalid) {
        return;
      }
    }
    this.apiFlag = true;
    this.clicked = true;
    for (let i = 0; i < this.sections.length; i++) {
      if (this.form.get('norbform').get('sectionName').value == this.sections[i].searchSectionUID) {
        this.sName = this.sections[i].searchSectionName;
      }
    }
    const myFormData = new FormData();
    if ($('#isRightBanner').prop('checked') === true) {
      myFormData.append('userUID', localStorage.getItem('user_id'));
      myFormData.append('roleUID', localStorage.getItem('role_id'));
      myFormData.append('imageName', this.filedata);
      myFormData.append('bannerURL', this.form.get('rbform').get('Web').value);
      myFormData.append('isRightBanner', '1');
      myFormData.append('isTopBanner', '0');
    }
    else if ($('#isTopBanner').prop('checked') === true) {
      myFormData.append('userUID', localStorage.getItem('user_id'));
      myFormData.append('roleUID', localStorage.getItem('role_id'));
      myFormData.append('imageName', this.filedata);
      myFormData.append('bannerURL', this.form.get('rbform').get('Web').value);
      myFormData.append('isTopBanner', '1');
      myFormData.append('isRightBanner', '0');
    }
    else {
      myFormData.append('userUID', localStorage.getItem('user_id'));
      myFormData.append('roleUID', localStorage.getItem('role_id'));
      myFormData.append('imageName', this.filesectiondata);
      myFormData.append('searchSectionUID', this.form.get('norbform').get('sectionName').value);
      myFormData.append('searchSectionName', this.sName);
      myFormData.append('SectionNotes', this.form.get('norbform').get('sectionNotes').value);
      myFormData.append('isRightBanner', '0');
      myFormData.append('isTopBanner', '0');
    }
    this.httpClient.post<any>(this.apiURL + '/api/addbanner', myFormData)
      .subscribe(data => {
        /* document.getElementById('text').style.display = 'none'; */
        $('#text').css('display', 'none');
        if (data.return_code == 0) {
          $('#modalAddBanner').css('display', 'none');
          $('#info_success').css('display', 'block');
          this.successMessage = 'Banner Added Successfully !';
          this.gridApi.refreshCells();
          this.refreshGrid();

          /* document.getElementById('info_success').style.display = 'block'; */
          setTimeout(() => {
            this.close1();
          }, this.redirectSecounds);
        }
        else {
          this.successMessage = data.errors[0];
          this.clicked = false;
          $('#modalAddBanner').css('display', 'none');
          document.getElementById('info_alert').style.display = 'block';
        }
      });
  }

  updateBanner(): void {
    console.log('test');
    this.submitted = true;
    const myFormData = new FormData();
    if ($('#isRightBanner').prop('checked') === true) {
      myFormData.append('userUID', localStorage.getItem('user_id'));
      myFormData.append('roleUID', localStorage.getItem('role_id'));
      myFormData.append('bannerUID', this.banners.bannerUID);
      myFormData.append('imageName', this.filedata);
      myFormData.append('bannerURL', this.form.get('rbform').get('Web').value);
      myFormData.append('isRightBanner', '1');
      myFormData.append('isTopBanner', '0');
    }
    else if ($('#isTopBanner').prop('checked') === true) {
      myFormData.append('userUID', localStorage.getItem('user_id'));
      myFormData.append('roleUID', localStorage.getItem('role_id'));
      myFormData.append('bannerUID', this.banners.bannerUID);
      myFormData.append('imageName', this.filedata);
      myFormData.append('bannerURL', this.form.get('rbform').get('Web').value);
      myFormData.append('isTopBanner', '1');
      myFormData.append('isRightBanner', '0');
    }
    else {
      myFormData.append('userUID', localStorage.getItem('user_id'));
      myFormData.append('roleUID', localStorage.getItem('role_id'));
      myFormData.append('imageName', this.filesectiondata);
      myFormData.append('bannerUID', this.banners.bannerUID);
      myFormData.append('searchSectionUID', this.banners.searchSectionUID);
      myFormData.append('searchSectionName', this.banners.searchSectionName);
      myFormData.append('SectionNotes', this.form.get('norbform').get('sectionNotes').value);
      myFormData.append('isRightBanner', '0');
      myFormData.append('isTopBanner', '0');
      console.log(this.form);
    }
    this.apiFlag = true;
    this.clicked = true;
     /* if ($('#isRightBanner').prop('checked') === true) 
    {
      if (this.form.get('rbform').invalid) {
        return;
      }
    }
    else if ($('#isTopBanner').prop('checked') === true) 
    {
      if (this.form.get('rbform').invalid) {
        return;
      }
    }
    else {
      if (this.form.get('norbform').invalid) {
        return;
      }
    } */
    this.httpClient.post<any>(this.apiURL + '/api/updatebanners', myFormData)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Banner Updated Successfully !';
          $('#modalEditBanner').css('display', 'none');
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
          $('#modalEditBanner').css('display', 'none');
          document.getElementById('info_alert').style.display = 'block';
        }
      });
  }


  deleteBanner():void{
    this.apiFlag = true;
    this.clicked = true;
    this.httpClient.post<any>(this.apiURL + '/api/bannerdelete',
    {
      roleUID: localStorage.getItem('role_id'),
      userUID: localStorage.getItem('user_id'),
       bannerUID: this.bannerUID
    })
    .subscribe(data => {
      if (data.return_code == 0) {
        this.successMessage = 'Banner Details Deleted Successfully !';
        this.removedAGgridRowIndex.emit(this.AGgridRowIndex);    
        $('#modalDeleteBanner').css('display', 'none');
        document.getElementById('info_success').style.display = 'block';
        this.gridApi.refreshCells();
        this.refreshGrid();
        setTimeout(() => {
          this.apiFlag = false;
        if (this.clicked == true) {
          //this.location.back();
          this.clicked = false;
        }
        }, this.redirectSecounds);
      }
      else {
        this.successMessage = data.errors[0];
        this.clicked = false;
        document.getElementById('info_alert').style.display = 'block';
      }
    });
  }
  quickSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  }
}

