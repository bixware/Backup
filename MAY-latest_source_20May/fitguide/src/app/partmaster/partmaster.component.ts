import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BtnCellRendererComponent } from '../btn-cell-renderer/btn-cell-renderer.component';
import { PartImageCellRendererComponent } from '../part-image-cell-renderer/part-image-cell-renderer.component';
import { StatictextComponent } from '../statictext/statictext.component';
import { HttpClient } from '@angular/common/http';
import { GridOptions } from "@ag-grid-community/core";
import { CsvExportModule } from '@ag-grid-community/csv-export';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Location } from '@angular/common';
declare var $: any;
declare var hideSearchText: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-partmaster',
  templateUrl: './partmaster.component.html',
  styleUrls: ['./partmaster.component.css']
})
export class PartmasterComponent implements OnInit {
  @Input() public bannerUID;
  @Input() public AGgridRowIndex;
  @Output() removedAGgridRowIndex = new EventEmitter<any>();
  public roleUID: any;
  public dummy = {
    ArchStatus: ''
  }
  deletedata = {
    partUID: []
  }
  fileInput: any;
  blobURL: any;
  apiURL: any;
  searchValue: any;
  gridApi: any;
  gridColumnApi: any;
  frameworkComponents: any;
  gridOptions: any;
  context;
  imgURL: any;
  redirectSecounds: any;
  form: FormGroup;
  patchform: FormGroup;
  editform: FormGroup
  duplicateform: FormGroup
  addform: FormGroup
  filedata: any;
  fileImageData: any
  submitted = false;
  brands: any;
  sections: any;
  subsections: any;
  subSectionFlag: boolean;
  brandList: string;
  sectionList: string;
  searchSectionUID: any;
  searchSectioName: any;
  caspioPartID: any;
  clicked: any;
  apiFlag: any;
  successMessage: any;
  dropdownFlag: any;
  prevImage: any;
  sUID: any;
  tempUID: any;
  picture1 = "";
  picture2 = "";
  picture3 = "";
  isPicture1 = false;
  isPicture2 = false;
  isPicture3 = false;
  filePicture1: any;
  filePicture2: any;
  filePicture3: any;
  public isActive = '';
  /* public prevImage = ''; */
  public userUID = '';
  public partUID = '';
  public brandName: any;
  public sectionName: any;
  public brand = {
    ArchStatus: null
  }
  public user = {
    partUID: ''
  };
  showButton = false;
  showButton1: any;
  updatePart = {
    userUID: '',
    partNumber: '',
    brandUID: '',
    UPCCode: '',
    MSRP: '',
    LaborHours: '',
    LIST: '',
    COST: '',
    MAP: '',
    Description: '',
    Note: '',
    Web: '',
    Picture: {},
    FlowLine: '',
    sectionUID: '',
    searchsubSectionUID: '',
    shortDescription: '',
    displayHeader: '',
    previouspartUID: [],

  };
  partDetails: any;
  receiveAGGridEmit(rowIndex) {
    var node = this.gridApi.getRowNode(rowIndex);
    this.gridApi.applyTransaction({ remove: [node.data] });
  }
  /* public loadingOverlayComponentParams: any = {
    loadingMessage: 'One moment please...',
  }; */
  modules = [ClientSideRowModelModule, CsvExportModule];
  columnDefs = [
    {
      headerName: 'Select Part', width: 120, sortable: true, checkboxSelection: true
    },
    {
      headerName: 'Actions', field: 'partUID', width: 300, sortable: false, filter: false,
      cellRenderer: 'btnCellRendererComponent',
    },
    {
      headerName: 'Part Number', field: 'partNumber', sortable: true, resizable: true, filter: 'agTextColumnFilter',
      floatingFilter: true
    },
    { headerName: 'Part Short Description', field: 'shortDescription', sortable: true, resizable: true, filter: true },
    {
      headerName: 'Section Name', field: 'sectionName', sortable: true, resizable: true, filter: 'agTextColumnFilter',
      floatingFilter: true
    },
    {
      headerName: 'Brand Name', field: 'brandName', sortable: true, resizable: true, filter: 'agTextColumnFilter',
      floatingFilter: true
    },
    { headerName: 'UPC Code', field: 'UPCCode', sortable: true, filter: true },
    { headerName: 'MSRP', field: 'MSRP', sortable: true, filter: true },
    { headerName: 'LIST', field: 'LIST', sortable: true, filter: true },
    { headerName: 'COST', field: 'COST', sortable: true, filter: true },
    { headerName: 'MAP', field: 'MAP', sortable: true, filter: true },
    { headerName: 'Description', field: 'Description', sortable: true, resizable: true, filter: true },
    { headerName: 'Note', field: 'Note', sortable: true, resizable: true, filter: true },
    { headerName: 'Web', field: 'Web', sortable: true, resizable: true, filter: true },
    {
      headerName: 'Picture', field: 'Picture', sortable: true, tooltipField: 'Picture',
      tooltipComponentParams: { color: '#ececec' }, tooltipComponent: 'partImageCellRendererComponent',
      cellRenderer: 'statictextComponent'
    },
    { headerName: 'Part Display Header', field: 'displayHeader', sortable: true, resizable: true, filter: true }
  ];
  rowData: any;
  public rowSelection: 'single' | 'multiple' = 'multiple';
  tooltipShowDelay: any;
  constructor(private httpClient: HttpClient, private router: Router, public fb: FormBuilder, private location: Location) {
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
    this.blobURL = environment.blobURL;
    this.subsections = [];
    this.subSectionFlag = false;
    this.redirectSecounds = environment.redirectSecounds;
    this.gridOptions = <GridOptions>{
      context: {
        componentParent: this
      }
    };
    this.form = this.fb.group({
      partNumber: ['', Validators.required],
      brandUID: [''],
      UPCCode: [''],
      MSRP: [''],
      labourHour: [''],
      LIST: [''],
      COST: [''],
      MAP: [''],
      Description: [''],
      Note: [''],
      Web: [''],
      sectionUID: ['', Validators.required],
      subSection: [''],
      /*hoverInfoButton: [''],
      singleDin: [''],
      doubleDin: [''],
      includesWiring: [''],*/
      images: this.fb.array([]),
      picture1: [''],
      picture2: [''],
      picture3: [''],
      Flowline: [''],
      partShortDescription: [''],
      partDisplayHeader: ['']
    });
    this.patchform = this.fb.group({
      partNumber: [''],
      sectionUID: ['']
    });
    //this.context = { componentParent: this };
    this.editform = this.fb.group({
      partNumber: ['', Validators.required],
      brandUID: [''],
      UPCCode: [''],
      MSRP: [''],
      labourHour: [''],
      LIST: [''],
      COST: [''],
      MAP: [''],
      Description: [''],
      Note: [''],
      Web: [''],
      addFlowline: [''],
      sectionUID: [''],
      subSection: [''],
      images: this.fb.array([]),
      picture1: [''],
      picture2: [''],
      picture3: [''],
      partShortDescription: [''],
      partDisplayHeader: ['']
    });
    this.duplicateform = this.fb.group({
      partNumber: ['', Validators.required],
      brandUID: [''],
      UPCCode: [''],
      MSRP: [''],
      labourHour: [''],
      LIST: [''],
      COST: [''],
      MAP: [''],
      Description: [''],
      Note: [''],
      Web: [''],
      sectionUID: [''],
      subSection: [''],
      addFlowline: [''],
      images: this.fb.array([]),
      picture1: [''],
      picture2: [''],
      picture3: [''],
      partShortDescription: [''],
      partDisplayHeader: ['']
    });
    this.addform = this.fb.group({
      partNumber: ['', Validators.required],
      brandUID: [''],
      UPCCode: [''],
      MSRP: [''],
      labourHour: [''],
      LIST: [''],
      COST: [''],
      MAP: [''],
      Description: [''],
      Note: [''],
      Web: [''],
      sectionUID: ['', Validators.required],
      subSection: [''],
      /*hoverInfoButton: [''],
      singleDin: [''],
      doubleDin: [''],
      includesWiring: [''],*/
      images: this.fb.array([]),
      addFlowline: [''],
      partShortDescription: [''],
      partDisplayHeader: ['']
    });
  }

  get f(): any { return this.form.controls; }
  get p(): any { return this.patchform.controls; }
  get e(): any { return this.editform.controls; }
  get d(): any { return this.duplicateform.controls; }
  get a(): any { return this.addform.controls; }

  get images(): FormArray {
    return this.addform.get('images') as FormArray;
  }
  get editImages(): FormArray {
    return this.editform.get('images') as FormArray;
  }
  get dupImages(): FormArray {
    return this.duplicateform.get('images') as FormArray;
  }
  get comImages(): FormArray {
    return this.form.get('images') as FormArray;
  }
  /* 
    back(): void {
      this.location.back();
    } */
  /*  
    fileEvent(e): void {
      this.filedata = e.target.files[0];
    } */

  ngOnInit(): void {
    /* hideSearchText(); */
    this.tooltipShowDelay = 0;
    this.frameworkComponents = {
      btnCellRendererComponent: BtnCellRendererComponent,
      partImageCellRendererComponent: PartImageCellRendererComponent,
      statictextComponent: StatictextComponent
    };
    this.roleUID = localStorage.getItem('role_id');
    this.filedata = [];
    this.prevImage = [];
    this.fileImageData = [];
    this.apiFlag = false;
    this.clicked = false;
    this.getSection();
    this.getBrand();
    this.addImage();
    $('#PartNumberEditable').prop('readonly', true);
    this.roleUID = localStorage.getItem('role_id');
    if (this.roleUID == 1) {
      $('#PartNumberEditable').prop('readonly', false);
    }
    else {
      $('#PartNumberEditable').prop('readonly', true);
    }
    updatePageTitle('Part Master');
    this.showButton1 = false;
  }

  addImageFormGroup(): FormGroup {
    return this.fb.group({
      image: ['']
    });
  }

  addImage(): void {
    this.submitted = false;
    if (this.images.length < 3)
      this.images.push(this.addImageFormGroup());
  }
  addEditImage(): void {
    this.submitted = false;
    if (this.editImages.length < 3)
      this.editImages.push(this.addImageFormGroup());
  }
  addDupImage(): void {
    this.submitted = false;
    if (this.dupImages.length < 3)
      this.dupImages.push(this.addImageFormGroup());
  }
  addComImage(): void {
    this.submitted = false;
    if (this.comImages.length < 3)
      this.comImages.push(this.addImageFormGroup());
  }


  deleteImage(id: any): void {
    this.submitted = false;
    if (this.images.length !== 1) {
      this.images.removeAt(id);
      this.fileImageData.splice(id, 1);
    }
  }

  deleteEditImage(id: any): void {
    this.submitted = false;
    if (this.editImages.length !== 1) {
      this.editImages.removeAt(id);
      this.prevImage.splice(id, 1);;
      this.filedata.splice(id, 1);
    }
  }
  deleteDupImage(id: any): void {
    this.submitted = false;
    if (this.dupImages.length !== 1) {
      this.dupImages.removeAt(id);
      this.prevImage.splice(id, 1);;
      this.filedata.splice(id, 1);
    }
  }
  deleteComImage(id: any): void {
    this.submitted = false;
    if (this.comImages.length !== 1) {
      this.comImages.removeAt(id);
      this.prevImage.splice(id, 1);;
      this.filedata.splice(id, 1);
    }
  }

  deletePictureImage(value: any) {
    if ((this.isPicture1 && !this.isPicture2 && !this.isPicture3) || (!this.isPicture1 && this.isPicture2 && !this.isPicture3) || (!this.isPicture1 && !this.isPicture2 && this.isPicture3)) {
      return;
    }
    if (value === 1) {
      this.picture1 = "";
      this.filePicture1 = "";
      this.isPicture1 = false;
    } else if (value === 2) {
      this.picture2 = "";
      this.filePicture2 = "";
      this.isPicture2 = false;
    }
    else if (value === 3) {
      this.picture3 = "";
      this.filePicture3 = "";
      this.isPicture3 = false;
    }
  }

  addPictureImage(): void {
    if (!this.isPicture1) {
      this.isPicture1 = true
    }
    else if (!this.isPicture2) {
      this.isPicture2 = true
    }
    else if (!this.isPicture3) {
      this.isPicture3 = true
    }
  }

  fileImageEvent(e: any, i: any): void {
    this.fileImageData.splice(i, 1);
    this.fileImageData.splice(i, 0, e.target.files[0]);
  }
  fileEditEvent(e: any, i: any): void {
    this.filedata.splice(i, 1);
    this.filedata.splice(i, 0, e.target.files[0]);
    this.prevImage.splice(i, 1);
    let tempurl = URL.createObjectURL(e.target.files[0]);
    this.prevImage.splice(i, 0, tempurl);
  }

  fileEvent(e: any, value: any): void {
    if (value === 1) {
      this.filePicture1 = e.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.picture1 = event.target.result;
      }
    } else if (value === 2) {
      this.filePicture2 = e.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.picture2 = event.target.result;
      }
    } else if (value === 3) {
      this.filePicture3 = e.target.files[0];
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.picture3 = event.target.result;
      }
    }

    reader.readAsDataURL(e.target.files[0]);
  }

  getImages(url: any, fileData: any) {
    this.fileInput = document.querySelector('input[type="file"]');
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.blob())
      .then((myBlob) => {
        // this.filedata = myBlob;
        const myFile = new File([myBlob], fileData, {
          type: myBlob.type,
        });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(myFile);
        this.fileInput.files = dataTransfer.files;
        this.filedata.push(dataTransfer.files[0])
      });
  }

  getSection(): void {
    this.sectionList = '';
    this.httpClient.get<any>(this.apiURL + '/api/getsections')
      .subscribe(data => {
        this.sections = (data as any).searchSections;
      });

  }

  getsubSection(e): void {
    var tempSectionUID = e.target.value;
    if (tempSectionUID.trim() != '') {
      this.httpClient.post<any>(this.apiURL + '/api/getsubsectionsbyid', { sectionUID: tempSectionUID })
        .subscribe(data => {
          this.subsections = (data as any).subsectionList;
          if (this.subsections.length > 0) {
            this.form.addControl('subSection', new FormControl('', Validators.required));
            this.subSectionFlag = true;
            //$("select#dropdown").prop('selectedIndex', '');
          }
          else {
            this.form.removeControl('subSection');
            //this.form.addControl('subSection', new FormControl(''));
            this.subSectionFlag = false;
            this.subsections = [];
            this.form.patchValue({
              subSection: ''
            });
          }
        });
    }
    else {
      this.subSectionFlag = false;
      this.subsections = [];
      //this.form.addControl('subSection', new FormControl('', Validators.required));
      this.form.removeControl('subSection');
      this.form.patchValue({
        subSection: ''
      });
      //this.form.addControl('subSection', new FormControl(''));
    }
  }

  /* patchSubsection(subsectionUID, sectionUID): void {

    this.httpClient.post<any>(this.apiURL + '/api/getsubsectionsbyid', { sectionUID: sectionUID })
      .subscribe(data => {
        this.subsections = (data as any).subsectionList;
        if (this.subsections.length > 0) {
          this.form.addControl('subSection', new FormControl('', Validators.required));
          this.subSectionFlag = true;
          if (subsectionUID != null && subsectionUID != '') {
            this.form.patchValue({
              subSection: subsectionUID
            });
          }
        }
        else {
          this.form.removeControl('subSection');
          //this.form.addControl('subSection', new FormControl(''));
          this.subSectionFlag = false;
          this.subsections = [];
          this.form.patchValue({
            subSection: ''
          });
        }
      });
 
  } */

  patchSubsection(searchsubSectionUID, sectionUID): void {
    this.httpClient.post<any>(this.apiURL + '/api/getsubsectionsbyid', { sectionUID: sectionUID })
      .subscribe(data => {
        this.subsections = (data as any).subsectionList;
        setTimeout(() => {
          if (this.subsections.length > 0) {
            //this.form.removeControl('subSection');
            this.form.addControl('subSection', new FormControl('', Validators.required));
            this.subSectionFlag = true;
            if (searchsubSectionUID != null && searchsubSectionUID != '') {
              this.form.patchValue({
                subSection: searchsubSectionUID
              });
            }
          }
          else {
            this.form.removeControl('subSection');
            //this.form.addControl('subSection', new FormControl(''));
            this.subSectionFlag = false;
            this.subsections = [];
          }
        }, 2000);
      });
  }

  patchEditSubSection(subsectionUID, sectionUID): void {

    this.httpClient.post<any>(this.apiURL + '/api/getsubsectionsbyid', { sectionUID: sectionUID })
      .subscribe(data => {
        this.subsections = (data as any).subsectionList;
        if (this.subsections.length > 0) {
          this.editform.addControl('subSection', new FormControl('', Validators.required));
          this.subSectionFlag = true;
          if (subsectionUID != null && subsectionUID != '') {
            this.editform.patchValue({
              subSection: subsectionUID
            });
          }
        }
        else {
          this.subSectionFlag = false;
          this.editform.removeControl('subSection');
          //this.form.addControl('subSection', new FormControl(''));
          this.subsections = [];
          this.editform.patchValue({
            subSection: ''
          });
        }
      });

  }
  patchDuplicateSubSection(subsectionUID, sectionUID): void {
    //$("select#dropdown").prop('selectedIndex', 0);
    this.httpClient.post<any>(this.apiURL + '/api/getsubsectionsbyid', { sectionUID: sectionUID })
      .subscribe(data => {
        this.subsections = (data as any).subsectionList;
        if (this.subsections.length > 0) {
          this.duplicateform.addControl('subSection', new FormControl('', Validators.required));
          this.subSectionFlag = true;
          if (subsectionUID != null && subsectionUID != '') {
            //$("select#dropdown").prop('selectedIndex', 0);
            this.duplicateform.patchValue({
              subSection: subsectionUID
            });
          }
        }
        else {
          this.subSectionFlag = false;
          this.duplicateform.removeControl('subSection');
          //this.form.addControl('subSection', new FormControl(''));
          this.subsections = [];
          this.duplicateform.patchValue({
            subSection: ''
          });
        }
      });
  }


  getBrand(): void {
    this.brandList = '';
    this.brand.ArchStatus = '0';
    this.httpClient.post<any>(this.apiURL + '/api/getbrand', this.brand)
      .subscribe(data => {
        this.brands = (data as any).brandDetails;
      });
  }

  clickDeleteArchive(value): void {
    this.AGgridRowIndex = value.rowIndex;
    this.partUID = value.value;
    // console.log(this.AGgridRowIndex);
    // console.log(this.bannerUID);
  }

  refreshGrid() {
    this.removedAGgridRowIndex.emit(this.AGgridRowIndex);
  }

  deleteArchive(): void {
    this.apiFlag = true;
    this.clicked = true;
    this.httpClient.post<any>(this.apiURL + '/api/archivepartdelete',
      {
        partUID: this.partUID
      })
      .subscribe(data => {
        if (data.return_code == 0) {
          this.successMessage = 'Archive Part Details Deleted Successfully !';
          this.removedAGgridRowIndex.emit(this.AGgridRowIndex);
          $('#modalDeleteArchive').css('display', 'none');
          document.getElementById('info_success').style.display = 'block';
          this.gridApi.refreshCells();
          this.refreshGrid();
          setTimeout(() => {
            this.apiFlag = false;
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

  bulkarchivedelete(): void {
    //this.delete.partUID = this.partUID;
    const checkboxId = this.gridApi.getSelectedRows();
    const checkboxId1 = Array();
    checkboxId.forEach(element => {
      checkboxId1.push(element.partUID);
    });
    this.deletedata.partUID = checkboxId1;
    this.httpClient.post<any>(this.apiURL + '/api/deletebulkarchivepart', this.deletedata)
      .subscribe(data => {
        /* this.rowData = (data as any).partDetails;
        this.gridApi.setRowData(this.rowData); 
        this.gridApi.hideOverlay(); */
        this.clickEvent();
      });
  }

  onSelectionChanged1(): void {
    if (this.gridApi.getSelectedRows().length > 1 && this.dummy.ArchStatus == '1') {
      this.showButton1 = true;
    } else {
      this.showButton1 = false;
    }
  }

  combine(): void {
    this.apiFlag = false;
    const checkboxId = this.gridApi.getSelectedRows();
    checkboxId.forEach(element => {
      if (element.isActive == '0') {
        this.apiFlag = true;
        setTimeout(() => {
          this.displayError();
        }, 2000)
        return;
      }
    });
    if (this.apiFlag != true) {
      $('#myModal').css('display', 'block');
      const checkboxId1 = Array();
      checkboxId.forEach(element => {
        checkboxId1.push(element.partUID);
        this.partDetails = checkboxId;
      });
      $("#arrows").show();
      $("#next").show();
      $("#previous").hide();
      $("#formpatch").show();
      $("#partform").hide();
    }

  }

  displayError(): void {
    $('#text').css('display', 'none');
    this.successMessage = 'Combine Part Selection has Inactive Record, please unselect !';
    $('#info_alert').css('display', 'block');
  }

  Prev(): void {
    $("#formpatch").show();
    $("#partform").hide();
    $("#arrows").show();
    $("#previous").hide();
    $("#next").show();

  }

  Next(): void {
    $("#formpatch").hide();
    $("#partform").show();
    $("#arrows").show();
    $("#previous").show();
    $("#next").hide();
    // console.log($("input[name='patchpart']:checked").val());
    const checkboxId = this.gridApi.getSelectedRows();
    checkboxId.forEach(element => {
      if (element.partUID == $("input[name='patchpart']:checked").val()) {
        this.form.get('partNumber').patchValue(element.partNumber != null ? element.partNumber : '');
        this.form.get('brandUID').patchValue(element.brandUID != null ? element.brandUID : '');
        this.form.get('UPCCode').patchValue(element.UPCCode != null ? element.UPCCode : '');
        this.form.get('MSRP').patchValue(element.MSRP != null ? element.MSRP : '');
        this.form.get('labourHour').patchValue(element.LaborHours != null ? element.LaborHours : '');
        this.form.get('LIST').patchValue(element.LIST != null ? element.LIST : '');
        this.form.get('MAP').patchValue(element.MAP != null ? element.MAP : '');

        this.form.get('sectionUID').patchValue(element.sectionUID);
        /* this.form.get('subSection').patchValue(element.subSection != null ? element.searchsubSectionUID : '', element.sectionUID != null ? element.sectionUID : ''); */
        this.patchSubsection(element.searchsubSectionUID != null ? element.searchsubSectionUID : '', element.sectionUID != null ? element.sectionUID : '');
        this.form.get('COST').patchValue(element.COST != null ? element.COST : '');
        this.form.get('Description').patchValue(element.Description != null ? element.Description : '');
        this.form.get('Note').patchValue(element.Note != null ? element.Note : '');
        this.form.get('Web').patchValue(element.Web != null ? element.Web : '');
        this.form.get('Flowline').patchValue(element.FlowLine != null ? element.FlowLine : '');
        this.form.get('partShortDescription').patchValue(element.shortDescription != null ? element.shortDescription : '');
        this.form.get('partDisplayHeader').patchValue(element.displayHeader != null ? element.displayHeader : '');
        /* this.form.get('Picture').patchValue(element.Picture); */
        if (element.Picture != null && element.Picture !== "") {
          this.comImages.push(this.addImageFormGroup());
          this.prevImage.push(this.blobURL + 'app/public/uploads/part/' + element.Picture);
          this.getImages(this.blobURL + 'app/public/uploads/part/' + element.Picture, element.Picture);
        }
        if (element.Picture_1 != null && element.Picture_1 !== "") {
          this.comImages.push(this.addImageFormGroup());
          this.prevImage.push(this.blobURL + 'app/public/uploads/part/' + element.Picture_1);
          this.getImages(this.blobURL + 'app/public/uploads/part/' + element.Picture_1, element.Picture_1);
        }
        if (element.Picture_2 != null && element.Picture_2 !== "") {
          this.comImages.push(this.addImageFormGroup());
          this.prevImage.push(this.blobURL + 'app/public/uploads/part/' + element.Picture_2);
          this.getImages(this.blobURL + 'app/public/uploads/part/' + element.Picture_2, element.Picture_2);
        }

      }

    });
  }

  combinePart(): void {
    this.submitted = true;
    if (this.form.invalid) {
      // console.log("form invalid");
      return;
    }
    const checkboxId = this.gridApi.getSelectedRows();
    const checkboxId1 = Array();
    checkboxId.forEach(element => {
      checkboxId1.push(element.partUID);
    });
    /*  this.updatePart.previouspartUID =  checkboxId;
     this.updatePart.userUID =  localStorage.getItem('user_id');
     this.updatePart.partNumber =  this.form.value.partNumber != null ? this.form.value.partNumber : '';
     //console.log(this.updatePart.partNumber);
     this.updatePart.brandUID =  this.form.value.brandUID != null ? this.form.value.brandUID : '';
     this.updatePart.UPCCode =  this.form.value.UPCCode != null ? this.form.value.UPCCode : '';
     this.updatePart.MSRP =  this.form.value.MSRP != null ? this.form.value.MSRP : '';
     this.updatePart.LaborHours =  this.form.value.labourHour != null ? this.form.value.labourHour : '';
     this.updatePart.LIST =  this.form.value.LIST != null ? this.form.value.LIST : '';
     this.updatePart.COST =  this.form.value.COST != null ? this.form.value.COST : '';
     this.updatePart.MAP =  this.form.value.MAP != null ? this.form.value.MAP : '';
     this.updatePart.Description =  this.form.value.Description != null ? this.form.value.Description : '';
     this.updatePart.Note =  this.form.value.Note != null ? this.form.value.Note : '';
     this.updatePart.Web =  this.form.value.Web != null ? this.form.value.Web : '';
     this.updatePart.Picture =  this.filedata;
     this.updatePart.FlowLine =  this.form.value.Flowline != null ? this.form.value.Flowline : '';
     this.updatePart.sectionUID =  this.form.value.sectionUID!= null ? this.form.value.sectionUID : '';
     this.updatePart.searchsubSectionUID =  this.form.value.subSection==undefined?'':this.form.value.subSection;
     this.updatePart.shortDescription =  this.form.value.partShortDescription != null ? this.form.value.partShortDescription : '';
     this.updatePart.displayHeader =  this.form.value.partDisplayHeader != null ? this.form.value.partDisplayHeader : ''; */
    const myFormData = new FormData();
    myFormData.append('previouspartUID', JSON.stringify(checkboxId));
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('partNumber', this.form.value.partNumber != null ? this.form.value.partNumber : '');
    myFormData.append('brandUID', this.form.value.brandUID != null ? this.form.value.brandUID : '');
    myFormData.append('UPCCode', this.form.value.UPCCode != null ? this.form.value.UPCCode : '');
    myFormData.append('MSRP', this.form.value.MSRP != null ? this.form.value.MSRP : '');
    myFormData.append('LaborHours', this.form.value.labourHour != null ? this.form.value.labourHour : '');
    myFormData.append('LIST', this.form.value.LIST != null ? this.form.value.LIST : '');
    myFormData.append('COST', this.form.value.COST != null ? this.form.value.COST : '');
    myFormData.append('MAP', this.form.value.MAP != null ? this.form.value.MAP : '');
    myFormData.append('Description', this.form.value.Description != null ? this.form.value.Description : '');
    myFormData.append('Note', this.form.value.Note != null ? this.form.value.Note : '');
    myFormData.append('Web', this.form.value.Web != null ? this.form.value.Web : '');
    myFormData.append('FlowLine', this.form.value.Flowline != null ? this.form.value.Flowline : '');
    myFormData.append('sectionUID', this.form.value.sectionUID != null ? this.form.value.sectionUID : '');
    myFormData.append('searchsubSectionUID', this.form.value.subSection == undefined ? '' : this.form.value.subSection);
    myFormData.append('shortDescription', this.form.value.partShortDescription != null ? this.form.value.partShortDescription : '');
    myFormData.append('displayHeader', this.form.value.partDisplayHeader != null ? this.form.value.partDisplayHeader : '');
    if (this.filedata.length > 0) {
      this.filedata.forEach((item: any, i: any) => {
        if (i === 0) {
          myFormData.append('Picture', item);

        } else if (i === 1) {
          myFormData.append('Picture_1', item);

        } else if (i === 2) {
          myFormData.append('Picture_2', item);

        }
      })
    }
    if(this.filedata.length===0){
      myFormData.append('Picture', "");
      myFormData.append('Picture_1', "");
      myFormData.append('Picture_2', "");
    }else   if(this.filedata.length===1){
      myFormData.append('Picture_1', "");
      myFormData.append('Picture_2', "");
    } else   if(this.filedata.length===2){
      myFormData.append('Picture_2', "");
    }
     /* const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('partNumber', this.form.value.partNumber);
    myFormData.append('brandUID', this.form.value.brandUID);
    myFormData.append('UPCCode', this.form.value.UPCCode);
    myFormData.append('MSRP', this.form.value.MSRP);
    myFormData.append('LaborHours', this.form.value.labourHour);
    myFormData.append('LIST', this.form.value.LIST);
    myFormData.append('COST', this.form.value.COST);
    myFormData.append('MAP', this.form.value.MAP);
    myFormData.append('Description', this.form.value.Description);
    myFormData.append('Note', this.form.value.Note);
    myFormData.append('Web', this.form.value.Web);
    myFormData.append('Picture', this.filedata);
    myFormData.append('FlowLine', this.form.value.addFlowline);
    myFormData.append('sectionUID', this.form.value.sectionUID);
    myFormData.append('subSection', this.form.value.subSection==undefined?'':this.form.value.subSection);
    myFormData.append('shortDescription', this.form.value.partShortDescription);
    myFormData.append('displayHeader', this.form.value.partDisplayHeader); */
    /*myFormData.append('hoverInfoButton', this.form.value.hoverInfoButton);
   myFormData.append('singleDin', this.form.value.singleDin);
   myFormData.append('doubleDin', this.form.value.doubleDin);
   myFormData.append('includesWiring', this.form.value.includesWiring);*/
    // myFormData.append('sectionUID', this.searchSectionUID);
    // myFormData.append('caspioPartID', this.caspioPartID);
    this.apiFlag = true;
    //this.showButton = false;
    //this.showButton1 = false;
    //$('#myModal').css('display', 'none');
    //this.form.reset();
    this.httpClient.post<any>(this.apiURL + '/api/combinepart', myFormData)
      .subscribe(data => {
        $('#text').css('display', 'none');
        if (data.return_code == 0) {
          this.successMessage = 'Part Combined Successfully !';
          $('#info_success').css('display', 'block');
          setTimeout(() => {
            this.close1();
          }, this.redirectSecounds);
        }
        else {
          this.successMessage = data.errors[0];
          $('#info_alert').css('display', 'block');
          setTimeout(() => {
            this.close1();
          }, this.redirectSecounds)
        }
      });
  }

  cancel(): void {
    $('#modalAddpart').css('display', 'none');
    $('#myModal').css('display', 'none');
    $('#modalDuplicatepart').css('display', 'none');
    $('#modalEditpart').css('display', 'none');
    $('#modalDeleteArchive').css('display', 'none');
    this.showButton = false;
    this.showButton1 = false;
    this.apiFlag = false;
    this.clickEvent();
    this.form.reset();
    (this.editform.controls['images'] as FormArray).clear();
    (this.duplicateform.controls['images'] as FormArray).clear();
    (this.form.controls['images'] as FormArray).clear();
    this.prevImage = [];
    this.filedata = [];
    this.editform.reset();
    this.duplicateform.reset();
    $("select#brandlist").prop('selectedIndex', 0);
    $("select#sectionlist").prop('selectedIndex', 0);
    this.submitted = false;
  }

  close1(): void {
    this.cancel();
  }

  onSelectionChanged(): void {
    if (this.gridApi.getSelectedRows().length > 1) {
      this.showButton = true;
    } else {
      this.showButton = false;
    }
  }

  close2(): void {
    $('#info_archive').hide();
    $('#archive_error').hide();
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.dummy.ArchStatus = '0';
    this.httpClient.post<any>(this.apiURL + '/api/getparts', this.dummy)
      .subscribe(data => {
        this.rowData = (data as any).partDetails;
      });
  }

  clickEvent(): void {
    /* const userUID=localStorage.getItem('user_id');
    var ArchStatus = $('#archive').prop('checked') === true?1:0;
    this.gridApi.showLoadingOverlay();
    this.httpClient.post<any>(this.apiURL + '/api/getparts',{userUID:userUID,ArchStatus:ArchStatus})
      .subscribe(data => {
        this.rowData = (data as any).partDetails;
        this.gridApi.setRowData(this.rowData);
        this.gridApi.hideOverlay();
    }); */
    if ($('#archive').prop('checked')) {
      this.dummy.ArchStatus = '1';
      this.showButton = false;
      this.showButton1 = false;
    }
    else {
      this.dummy.ArchStatus = '0';
      this.showButton = false;
      this.showButton1 = false;
    }
    //this.gridApi.showLoadingOverlay();
    this.httpClient.post<any>(this.apiURL + '/api/getparts', this.dummy)
      .subscribe(data => {
        this.rowData = (data as any).partDetails;
        this.gridApi.setRowData(this.rowData);
        this.gridApi.hideOverlay();
      });
  }

  onBtnExport() {
    this.gridApi.exportDataAsCsv();
  }

  quickSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  //edit part
  cancelpartEdit(): void {
    // this.editform.controls['images'] = [];
    (this.editform.controls['images'] as FormArray).clear();
    this.prevImage = [];
    this.filedata = [];
    this.editform.reset();
    $('#modalEditpart').css('display', 'none');
    /* this.apiFlag = false;
    if (this.clicked == true) {
      this.clicked = false;
    } */
  }

  clickpartEdit(value): void {

    this.user.partUID = value;
    this.prevImage = [];
    this.filedata = [];

    this.httpClient.post<any>(this.apiURL + '/api/editpart/' + this.user.partUID, this.user)
      .subscribe(data => {
        if (data.return_code == 0) {
          this.editform.patchValue({
            partNumber: data.partDetails.partNumber != null ? data.partDetails.partNumber : '',
            brandUID: data.partDetails.brandUID != null ? data.partDetails.brandUID : '',
            UPCCode: data.partDetails.UPCCode != null ? data.partDetails.UPCCode : '',
            MSRP: data.partDetails.MSRP != null ? data.partDetails.MSRP : '',
            labourHour: data.partDetails.LaborHours != null ? data.partDetails.LaborHours : '',
            LIST: data.partDetails.LIST != null ? data.partDetails.LIST : '',
            COST: data.partDetails.COST != null ? data.partDetails.COST : '',
            MAP: data.partDetails.MAP != null ? data.partDetails.MAP : '',
            Description: data.partDetails.Description != null ? data.partDetails.Description : '',
            Note: data.partDetails.Note != null ? data.partDetails.Note : '',
            Web: data.partDetails.Web != null ? data.partDetails.Web : '',
            sectionUID: data.partDetails.sectionUID != null ? data.partDetails.sectionUID : '',
            // subSection: data.partDetails.searchsubSectionUID != null ? data.partDetails.searchsubSectionUID : '',
            partShortDescription: data.partDetails.shortDescription != null ? data.partDetails.shortDescription : '',
            partDisplayHeader: data.partDetails.displayHeader != null ? data.partDetails.displayHeader : '',
            addFlowline: data.partDetails.FlowLine != null ? data.partDetails.FlowLine : '',
          });
          this.isActive = data.partDetails.isActive != null ? data.partDetails.isActive : '';
          this.sUID = data.partDetails.sectionUID != null ? data.partDetails.sectionUID : '';
          this.tempUID = data.partDetails.sectionUID != null ? data.partDetails.sectionUID : '';
          this.partUID = data.partDetails.partUID != null ? data.partDetails.partUID : '';
          this.brandName = data.partDetails.brandName != null ? data.partDetails.brandName : '';
          this.sectionName = data.partDetails.sectionName != null ? data.partDetails.sectionName : '';
          this.patchEditSubSection(data.partDetails.searchsubSectionUID != null ? data.partDetails.searchsubSectionUID : '', data.partDetails.sectionUID != null ? data.partDetails.sectionUID : '');
          if (data.partDetails.Picture != null && data.partDetails.Picture !== "") {
            this.editImages.push(this.addImageFormGroup());
            this.prevImage.push(this.blobURL + 'app/public/uploads/part/' + data.partDetails.Picture);
            this.getImages(this.blobURL + 'app/public/uploads/part/' + data.partDetails.Picture, data.partDetails.Picture);
          }
          if (data.partDetails.Picture_1 != null && data.partDetails.Picture_1 !== "") {
            this.editImages.push(this.addImageFormGroup());
            this.prevImage.push(this.blobURL + 'app/public/uploads/part/' + data.partDetails.Picture_1);
            this.getImages(this.blobURL + 'app/public/uploads/part/' + data.partDetails.Picture_1, data.partDetails.Picture_1);
          }
          if (data.partDetails.Picture_2 != null && data.partDetails.Picture_2 !== "") {
            this.editImages.push(this.addImageFormGroup());
            this.prevImage.push(this.blobURL + 'app/public/uploads/part/' + data.partDetails.Picture_2);
            this.getImages(this.blobURL + 'app/public/uploads/part/' + data.partDetails.Picture_2, data.partDetails.Picture_2);
          }
        }
      });
  }

  editPart(): void {
    this.submitted = true;
    if (this.editform.invalid) {
      return;
    }
    this.apiFlag = true;
    this.clicked = true;
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('roleUID', localStorage.getItem('role_id'));
    myFormData.append('partNumber', this.editform.value.partNumber);
    myFormData.append('brandUID', this.editform.value.brandUID);
    myFormData.append('UPCCode', this.editform.value.UPCCode);
    myFormData.append('MSRP', this.editform.value.MSRP);
    myFormData.append('LaborHours', this.editform.value.labourHour);
    myFormData.append('LIST', this.editform.value.LIST);
    myFormData.append('COST', this.editform.value.COST);
    myFormData.append('MAP', this.editform.value.MAP);
    myFormData.append('Description', this.editform.value.Description);
    myFormData.append('Note', this.editform.value.Note);
    myFormData.append('Web', this.editform.value.Web);
    if (this.filedata.length > 0) {
      this.filedata.forEach((item: any, i: any) => {
        if (i === 0) {
          myFormData.append('Picture', item);

        } else if (i === 1) {
          myFormData.append('Picture_1', item);

        } else if (i === 2) {
          myFormData.append('Picture_2', item);

        }
      })
    }
    if(this.filedata.length===0){
      myFormData.append('Picture', "");
      myFormData.append('Picture_1', "");
      myFormData.append('Picture_2', "");
    }else   if(this.filedata.length===1){
      myFormData.append('Picture_1', "");
      myFormData.append('Picture_2', "");
    } else   if(this.filedata.length===2){
      myFormData.append('Picture_2', "");
    }
    /* myFormData.append('sectionUID', this.sectionUID); */
    myFormData.append('sectionUID', this.editform.value.sectionUID);
    myFormData.append('subSection', this.editform.value.subSection == undefined ? '' : this.editform.value.subSection);
    myFormData.append('FlowLine', this.editform.value.addFlowline);
    myFormData.append('isActive', this.isActive);
    myFormData.append('partUID', this.partUID);
    myFormData.append('brandName', this.brandName);
    myFormData.append('sectionName', this.sectionName);
    myFormData.append('shortDescription', this.editform.value.partShortDescription);
    myFormData.append('displayHeader', this.editform.value.partDisplayHeader);
    this.httpClient.post<any>(this.apiURL + '/api/updatepart', myFormData)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Part Edited Successfully !';
          $('#modalEditpart').css('display', 'none');
          document.getElementById('info_success').style.display = 'block';
          this.gridApi.refreshCells({ force: true });
          this.gridApi.refreshCells();
          this.clickEvent();
          setTimeout(() => {
            this.close1();
          }, this.redirectSecounds);
        }
        else {
          this.successMessage = data.errors[0];
          this.clicked = false;
          $('#modalEditpart').css('display', 'none');
          document.getElementById('info_alert').style.display = 'block';
        }
      });

  }
  //duplicate part

  cancelDupepart(): void {
    (this.duplicateform.controls['images'] as FormArray).clear();
    this.prevImage = [];
    this.filedata = [];
    this.duplicateform.reset();
    $('#modalDuplicatepart').css('display', 'none');
  }

  clickduplicatepart(value): void {
    this.user.partUID = value;
    this.httpClient.post<any>(this.apiURL + '/api/duplicatepart/' + this.user.partUID, this.user)
      .subscribe(data => {
        if (data.return_code == 0) {
          this.duplicateform.patchValue({
            partNumber: data.partDetails.partNumber != null ? data.partDetails.partNumber : '',
            brandUID: data.partDetails.brandUID != null ? data.partDetails.brandUID : '',
            UPCCode: data.partDetails.UPCCode != null ? data.partDetails.UPCCode : '',
            MSRP: data.partDetails.MSRP != null ? data.partDetails.MSRP : '',
            labourHour: data.partDetails.LaborHours != null ? data.partDetails.LaborHours : '',
            LIST: data.partDetails.LIST != null ? data.partDetails.LIST : '',
            COST: data.partDetails.COST != null ? data.partDetails.COST : '',
            MAP: data.partDetails.MAP != null ? data.partDetails.MAP : '',
            Description: data.partDetails.Description != null ? data.partDetails.Description : '',
            Note: data.partDetails.Note != null ? data.partDetails.Note : '',
            Web: data.partDetails.Web != null ? data.partDetails.Web : '',
            sectionUID: data.partDetails.sectionUID != null ? data.partDetails.sectionUID : '',
            subSection: data.partDetails.searchsubSectionUID != null ? data.partDetails.searchsubSectionUID : '',
            partShortDescription: data.partDetails.shortDescription != null ? data.partDetails.shortDescription : '',
            partDisplayHeader: data.partDetails.displayHeader != null ? data.partDetails.displayHeader : '',
            addFlowline: data.partDetails.FlowLine != null ? data.partDetails.FlowLine : '',
          });
          this.isActive = data.partDetails.isActive != null ? data.partDetails.isActive : '';
          this.sUID = data.partDetails.sectionUID != null ? data.partDetails.sectionUID : '';
          this.partUID = data.partDetails.partUID != null ? data.partDetails.partUID : '';
          this.brandName = data.partDetails.brandName != null ? data.partDetails.brandName : '';
          this.sectionName = data.partDetails.sectionName != null ? data.partDetails.sectionName : '';
          this.patchDuplicateSubSection(data.partDetails.searchsubSectionUID != null ? data.partDetails.searchsubSectionUID : '', data.partDetails.sectionUID != null ? data.partDetails.sectionUID : '');
          if (data.partDetails.Picture != null && data.partDetails.Picture !== "") {
            this.dupImages.push(this.addImageFormGroup());
            this.prevImage.push(this.blobURL + 'app/public/uploads/part/' + data.partDetails.Picture);
            this.getImages(this.blobURL + 'app/public/uploads/part/' + data.partDetails.Picture, data.partDetails.Picture);
          }
          if (data.partDetails.Picture_1 != null && data.partDetails.Picture_1 !== "") {
            this.dupImages.push(this.addImageFormGroup());
            this.prevImage.push(this.blobURL + 'app/public/uploads/part/' + data.partDetails.Picture_1);
            this.getImages(this.blobURL + 'app/public/uploads/part/' + data.partDetails.Picture_1, data.partDetails.Picture_1);
          }
          if (data.partDetails.Picture_2 != null && data.partDetails.Picture_2 !== "") {
            this.dupImages.push(this.addImageFormGroup());
            this.prevImage.push(this.blobURL + 'app/public/uploads/part/' + data.partDetails.Picture_2);
            this.getImages(this.blobURL + 'app/public/uploads/part/' + data.partDetails.Picture_2, data.partDetails.Picture_2);
          }
        }
      });
  }



  duplicatePart(): void {
    this.submitted = true;
    if (this.duplicateform.invalid) {
      return;
    }
    this.apiFlag = true;
    this.clicked = true;
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('partNumber', this.duplicateform.value.partNumber);
    myFormData.append('brandUID', this.duplicateform.value.brandUID);
    myFormData.append('UPCCode', this.duplicateform.value.UPCCode);
    myFormData.append('MSRP', this.duplicateform.value.MSRP);
    myFormData.append('LaborHours', this.duplicateform.value.labourHour);
    myFormData.append('LIST', this.duplicateform.value.LIST);
    myFormData.append('COST', this.duplicateform.value.COST);
    myFormData.append('MAP', this.duplicateform.value.MAP);
    myFormData.append('Description', this.duplicateform.value.Description);
    myFormData.append('Note', this.duplicateform.value.Note);
    myFormData.append('Web', this.duplicateform.value.Web);
    /* myFormData.append('Picture', this.filedata); */
    if (this.filedata.length > 0) {
      this.filedata.forEach((item: any, i: any) => {
        if (i === 0) {
          myFormData.append('Picture', item);

        } else if (i === 1) {
          myFormData.append('Picture_1', item);

        } else if (i === 2) {
          myFormData.append('Picture_2', item);

        }
      })
    }
    if(this.filedata.length===0){
      myFormData.append('Picture', "");
      myFormData.append('Picture_1', "");
      myFormData.append('Picture_2', "");
    }else   if(this.filedata.length===1){
      myFormData.append('Picture_1', "");
      myFormData.append('Picture_2', "");
    } else   if(this.filedata.length===2){
      myFormData.append('Picture_2', "");
    }
      myFormData.append('subSection', this.duplicateform.value.subSection == undefined ? '' : this.duplicateform.value.subSection);
    myFormData.append('FlowLine', this.duplicateform.value.addFlowline);
    myFormData.append('sectionUID', this.duplicateform.value.sectionUID);
    //myFormData.append('subSection', this.form.value.subSection);   
    myFormData.append('shortDescription', this.duplicateform.value.partShortDescription);
    myFormData.append('displayHeader', this.duplicateform.value.partDisplayHeader);
    myFormData.append('dublicatePartUID', this.user.partUID);
    // myFormData.append('caspioPartID', this.caspioPartID);

    this.httpClient.post<any>(this.apiURL + '/api/addduplicatepart', myFormData)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Duplicate Part Created and Linked Successfully!';
          $('#modalDuplicatepart').css('display', 'none');
          document.getElementById('info_success').style.display = 'block';
          setTimeout(() => {
            this.close1();
          }, this.redirectSecounds);
        }
        else {
          if (data.message) {
            this.successMessage = data.message;
          }
          else {
            this.successMessage = data.errors[0];
          }
          this.clicked = false;
          $('#modalDuplicatepart').css('display', 'none');
          document.getElementById('info_alert').style.display = 'block';
        }
      });

  }

  //add part
  addpartModal(): void {
    this.addform.reset();
    $('#modalAddpart').css('display', 'block');
  }
  canceladdpart(): void {
    $('#modalAddpart').css('display', 'none');
  }
  addPart(): void {
    this.submitted = true;
    if (this.addform.invalid) {
      return;
    }
    const myFormData = new FormData();
    myFormData.append('userUID', localStorage.getItem('user_id'));
    myFormData.append('partNumber', this.addform.value.partNumber);
    myFormData.append('brandUID', this.addform.value.brandUID == null ? "" : this.addform.value.brandUID);
    myFormData.append('UPCCode', this.addform.value.UPCCode == null ? "" : this.addform.value.UPCCode);
    myFormData.append('MSRP', this.addform.value.MSRP == null ? "" : this.addform.value.MSRP);
    myFormData.append('LaborHours', this.addform.value.labourHour == null ? "" : this.addform.value.labourHour);
    myFormData.append('LIST', this.addform.value.LIST == null ? "" : this.addform.value.LIST);
    myFormData.append('COST', this.addform.value.COST == null ? "" : this.addform.value.COST);
    myFormData.append('MAP', this.addform.value.MAP == null ? "" : this.addform.value.MAP);
    myFormData.append('Description', this.addform.value.Description == null ? "" : this.addform.value.Description);
    myFormData.append('Note', this.addform.value.Note == null ? "" : this.addform.value.Note);
    myFormData.append('Web', this.addform.value.Web == null ? "" : this.addform.value.Web);
    this.fileImageData.forEach((element: any, i: any) => {
      if (i === 0) {
        myFormData.append('Picture', element);
      }
      else if (i === 1) {
        myFormData.append('Picture_1', element);
      }
      else if (i === 2) {
        myFormData.append('Picture_2', element);

      }
    });
    // myFormData.append('Picture', this.filedata == null ? "" : this.filedata);
    myFormData.append('FlowLine', this.addform.value.addFlowline == null ? "" : this.addform.value.addFlowline);
    /*myFormData.append('hoverInfoButton', this.form.value.hoverInfoButton);
    myFormData.append('singleDin', this.form.value.singleDin);
    myFormData.append('doubleDin', this.form.value.doubleDin);
    myFormData.append('includesWiring', this.form.value.includesWiring);*/
    myFormData.append('sectionUID', this.addform.value.sectionUID == null ? "" : this.addform.value.sectionUID);
    myFormData.append('subSection', this.addform.value.subSection == undefined ? '' : this.addform.value.subSection);
    myFormData.append('shortDescription', this.addform.value.partShortDescription == null ? "" : this.addform.value.partShortDescription);
    myFormData.append('displayHeader', this.addform.value.partDisplayHeader == null ? "" : this.addform.value.partDisplayHeader);
    // myFormData.append('sectionUID', this.searchSectionUID);
    // myFormData.append('caspioPartID', this.caspioPartID);
    this.apiFlag = true;
    this.clicked = true;
    this.httpClient.post<any>(this.apiURL + '/api/addpart', myFormData)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code != 1) {
          this.successMessage = 'Part Added Successfully !';
          document.getElementById('info_success').style.display = 'block';
          setTimeout(() => {
            this.close1();
          }, this.redirectSecounds);
        }
        else {
          this.successMessage = data.errors[0];
          this.clicked = false;
        //  console.log(data.errors[0]);
          document.getElementById('info_alert').style.display = 'block';
        }
      });
  }
}

