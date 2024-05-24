import { Component, OnInit } from '@angular/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { GalleryImageCellRendererComponent } from '../gallery-image-cell-renderer/gallery-image-cell-renderer.component';
import { GalleryNotesCellRenderererComponent } from '../gallery-notes-cell-rendererer/gallery-notes-cell-rendererer.component';
/* import { NotestextComponent } from '../notestext/notestext.component'; */
import { StatictextComponent } from '../statictext/statictext.component';
import { VehicleGalleryEditCellRendererComponent } from '../vehicle-gallery-edit-cell-renderer/vehicle-gallery-edit-cell-renderer.component';
import { Location } from '@angular/common';
import { PostService } from '../post.service';
declare var $: any;
declare var hideSearchText: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-vehiclegallery',
  templateUrl: './vehiclegallery.component.html',
  styleUrls: ['./vehiclegallery.component.css']
})
export class VehiclegalleryComponent implements OnInit {
  apiURL: any;
  imgURL: any;
  submitted = false;
  successMessage: any;
  redirectSecounds: any;
  searchSectionName: any;
  form: FormGroup;
  clicked: any;
  apiFlag: any;
  prevImage: any;
  sections: any;
  filedata: any;
  imageGallery: any;
  previewImg: any;
  galleryImage: any;
  galleryTitle: any;
  galleryName: any;
  vehicleGalleryUID: any;
  finalVehicleGalleryUID: any;
  formatNotes: any;
  public vehicle = {
    vehicleUID: '',
    searchSectionUID: '',
    userUID: '',
    roleUID: '',
    modifiedBy: '',
    vehicleGalleryUID: '',
    imageURL: ''
  };
  notesdata: any;
  params: any;
  public searchSectionUID: '';
  searchValue: any;
  gridApi: any;
  public user = {
    roleUID: '',
    userUID: ''
  }
  public galleryId = {
    vehicleGalleryUID: ''
  };
  gridColumnApi: any;
  frameworkComponents: any;
  context;
  receiveAGGridEmit(rowIndex) {
    console.log(rowIndex);
    var node = this.gridApi.getRowNode(rowIndex)
    this.gridApi.applyTransaction({ remove: [node.data] })
    this.http.post<any>(this.apiURL + '/api/getvehiclegallery', this.user)
      .subscribe(data => {
        this.rowData = (data as any).details;
      });
  }
  modules = [ClientSideRowModelModule];
  columnDefs = [
    {
      headerName: 'Actions', field: 'vehicleUID', width: 80, sortable: false, filter: false,
      cellRenderer: 'vehicleGalleryEditCellRendererComponent', cellStyle: { cursor: 'pointer' }
    },
    {
      headerName: 'User Name ', field: 'userName', sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true, cellStyle: { cursor: 'pointer' }
    },
    {
      headerName: 'Section Name', field: 'searchSectionName', sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true, cellStyle: { cursor: 'pointer' }
    },
    {
      headerName: 'Gallery Name', field: 'galleryName', sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true, cellStyle: { cursor: 'pointer' }
    },
    {
      headerName: 'Picture', field: 'imageName', sortable: true, tooltipField: 'imageName',
      tooltipComponentParams: { color: '#ececec' }, tooltipComponent: 'galleryImageCellRendererComponent',
      cellRenderer: 'statictextComponent', cellStyle: { cursor: 'pointer' }
    },
    {
      headerName: 'Notes', field: 'searchSectionNotes', sortable: true, tooltipField: 'searchSectionNotes',
      tooltipComponentParams: { color: '#ececec' }, tooltipComponent: 'galleryNotesCellRenderererComponent',
      cellRenderer: 'notestextComponent', cellStyle: { cursor: 'pointer' }
    },
    {
      headerName: 'Vehicle Details', field: 'vehicleDetails', width: 250, sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true, cellStyle: { cursor: 'pointer' }
    },
    {
      headerName: 'Make', field: 'Make', sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true, cellStyle: { cursor: 'pointer' }
    },
    {
      headerName: 'Model', field: 'Model', sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true
    },
    {
      headerName: 'Year', field: 'Year', sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true, cellStyle: { cursor: 'pointer' }
    },
    {
      headerName: 'Option1', field: 'Option1', sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true, cellStyle: { cursor: 'pointer' }
    },
    {
      headerName: 'Option2', field: 'Option2', sortable: true, filter: 'agTextColumnFilter',
      floatingFilter: true, cellStyle: { cursor: 'pointer' }
    },
    { headerName: 'Option3', field: 'Option3', sortable: true, filter: true, cellStyle: { cursor: 'pointer' } },
    { headerName: 'Option4', field: 'Option4', sortable: true, filter: true, cellStyle: { cursor: 'pointer' } },
    { headerName: 'Option5', field: 'Option5', sortable: true, filter: true, cellStyle: { cursor: 'pointer' } },
    { headerName: 'Option6', field: 'Option6', sortable: true, filter: true, cellStyle: { cursor: 'pointer' } },
    { headerName: 'vehicleUID', field: 'vehicleUID', width: 10, sortable: true }
  ];
  rowData: any;
  tooltipShowDelay: any;
  constructor(private http: HttpClient, private route: ActivatedRoute, private location: Location, public fb: FormBuilder, private PostService: PostService, private router: Router, private httpClient: HttpClient ) {
    this.apiURL = environment.apiURL;
    this.context = { componentParent: this };
    this.imgURL = environment.imgURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.form = this.fb.group({
      searchSectionUID: [{ value: '', disabled: true }],
      searchSectionNotes: [''],
      images: this.fb.array([])
    });
  }

  get f(): any { return this.form.controls; }

  get images(): FormArray {
    return this.form.get('images') as FormArray;
  }

  clickgalleryEdit(value): void {
    console.log(value);
    this.galleryId.vehicleGalleryUID = value.data.vehicleGalleryUID;
    this.http.post<any>(this.apiURL + '/api/editvehiclegallery', this.galleryId)
      .subscribe(data => {
        if (data.return_code == 0) {
          this.vehicle.imageURL = this.imgURL + value.data.imagePath + '/' + value.data.imageName;
          this.vehicle.roleUID = value.data.roleUID;
          this.vehicle.searchSectionUID = value.data.searchSectionUID;
          this.vehicle.userUID = value.data.userUID;
          this.vehicle.vehicleGalleryUID = value.data.vehicleGalleryUID;
          this.vehicle.vehicleUID = value.data.vehicleUID;
          this.galleryName = value.data.galleryName;
          console.log(this.vehicle);
          if (value.data.galleryName == 'notes') {
            this.galleryTitle = "Vehicle Gallery Notes Edit";
            $('#searchSectionNotes').val(data.details[0].searchSectionNotes);
            $('#openImage').hide();
            $('#testAreaNotes').show();
          }
          else {
            this.galleryTitle = "Vehicle Gallery Image Edit";
            this.galleryImage = this.apiURL + data.details[0].imagePath + '/' + data.details[0].imageName
            $('#testAreaNotes').hide();
            $('#openImage').show();
          }
        }
      });
    
    /* this.route.params.subscribe(params => {
    this.vehicle.vehicleUID = params['id'];
    }); */
    // this.vehicle.vehicleUID = value.value;
    // this.vehicle.imageURL = this.imgURL + value.data.imagePath + '/' + value.data.imageName;
    // this.vehicle.searchSectionUID = this.PostService.searchSectionUID;
    // this.vehicle.userUID = this.PostService.userUID;
    // this.vehicle.roleUID = this.PostService.roleUID;
    // console.log(this.vehicle);
    // this.http.post<any>(this.apiURL + '/api/editvehiclegallery', this.vehicle)
    //   .subscribe(data => {
    //     console.log(data);

    //   });
  }

  ngOnInit(): void {
    //hideSearchText();
    this.getSection();
    this.addImage();
    this.filedata = [];
    this.finalVehicleGalleryUID = [];
    this.apiFlag = false;
    this.clicked = false;
    this.previewImg = [];
    this.vehicleGalleryUID = [];
    this.tooltipShowDelay = 0;
    this.frameworkComponents = {
      vehicleGalleryEditCellRendererComponent: VehicleGalleryEditCellRendererComponent,
      galleryImageCellRendererComponent: GalleryImageCellRendererComponent,
      galleryNotesCellRenderererComponent: GalleryNotesCellRenderererComponent,
      /*notestextComponent: NotestextComponent, */
      statictextComponent: StatictextComponent
    };
    updatePageTitle('Vehicle Gallery');
  }

  onGridReady(params): void {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    const vehicleUIDColumn = this.gridColumnApi
      .getAllColumns()
      .find((x) => x.colDef.headerName == 'vehicleUID');
    this.gridColumnApi.setColumnVisible(vehicleUIDColumn, false);
    this.user.roleUID = localStorage.getItem('role_id');
    this.user.userUID = localStorage.getItem('user_id');
    this.http.post<any>(this.apiURL + '/api/getvehiclegallery', this.user)
      .subscribe(data => {
        this.rowData = (data as any).details;
      });
  }

  onRedirectURL(params): void {
    var focusedCell = this.gridApi.getFocusedCell();
    var columIndex = this.gridColumnApi.getAllDisplayedColumns().indexOf(focusedCell.column);
    if (columIndex != 0) {
      this.router.navigate(['/home/vehiclemaster/viewvehicle/' + params.data.vehicleUID]);
      //this.router.navigate([]).then(result => { window.open(`${environment.domainURL}#/home/vehiclemaster/viewvehicle/${params.data.vehicleUID}`, '_blank'); });
    }
  }

  quickSearch(): void {
    this.gridApi.setQuickFilter(this.searchValue);
  }

  addGallery(): void {
    if (this.imageGallery.length > 0) {
      let imgPath = '';
      for (let i = 0; i < this.imageGallery.length; i++) {
        imgPath = this.imgURL + this.imageGallery[i].imagePath + '/' + this.imageGallery[i].imageName;
        this.previewImg.push(imgPath);
        this.vehicleGalleryUID.push(this.imageGallery[i].vehicleGalleryUID);
      }
    }
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

  getSection(): void {
    this.http.get<any>(this.apiURL + '/api/getsections')
      .subscribe(data => {
        this.sections = (data as any).searchSections;
      });
  }

  back(): void {
    this.location.back();
  }

  fileEvent(e): void {
    this.filedata.push(e.target.files[0]);
  }

  close1(): void {
    this.apiFlag = false;
    if (this.clicked == true) {
      /* this.location.back(); */
      this.clicked = false;
    }
    this.cancelgalleryEdit();
    
  }

  
refreshGrid(){
  this.user.roleUID = localStorage.getItem('role_id');
    this.user.userUID = localStorage.getItem('user_id');
  this.httpClient.post<any>(this.apiURL + '/api/getvehiclegallery', this.user)
  .subscribe(data => {
    if (data.return_code != 1) {
      this.rowData = (data as any).details;
    } else {
      this.rowData = [];
    }
  });
}

  editGallery(): void {

    if (this.galleryName === 'notes') {
      this.notesdata = $('#searchSectionNotes').val();
    }
    const myFormData = new FormData();
    myFormData.append('vehicleGalleryUID', this.vehicle.vehicleGalleryUID);
    myFormData.append('searchSectionNotes', this.notesdata);
    myFormData.append('userUID', this.vehicle.userUID);
    myFormData.append('vehicleImage', this.filedata);
     this.apiFlag = true;
    this.clicked = true;
    this.http.post<any>(this.apiURL + '/api/updatevehiclegallerybyvehiclegalleryuid', myFormData)
      .subscribe(data => {
        if (data.return_code == 0) {
                this.successMessage = 'Vehicle Gallery Added Successfully !';
                $('#modalEditgallery').css('display', 'none');
                document.getElementById('info_success').style.display = 'block';
                this.gridApi.refreshCells();
                this.refreshGrid();
                setTimeout(() => {
                  this.close1();
                }, this.redirectSecounds);
              }
              else {
                if (data.err_message == 'Failed') {
                  this.successMessage = data.err_message;
                } else {
                  this.successMessage = data.errors[0];
                }
                this.clicked = false;
                document.getElementById('info_alert').style.display = 'block';
              }
      });

    // this.submitted = true;
    // if (this.form.invalid) {
    //   return;
    // }
    // for (let i = 0; i < this.previewImg.length; i++) {
    //   if ($('#c_' + i).prop('checked') === true) {
    //     this.finalVehicleGalleryUID.push(this.vehicleGalleryUID[i]);
    //   }
    // }
    // const myFormData = new FormData();
    // this.formatNotes = this.form.value.searchSectionNotes.replace(/(?:\r\n|\r|\n)/g, ' ');
    // this.formatNotes = this.formatNotes.replace(/"/g, "'");
    // myFormData.append('userUID', this.vehicle.userUID);
    // myFormData.append('roleUID', this.vehicle.roleUID);
    // myFormData.append('searchSectionUID', this.vehicle.searchSectionUID);
    // myFormData.append('sectionNotes', this.formatNotes);
    // myFormData.append('vehicleUID', this.vehicle.vehicleUID);
    // myFormData.append('modifiedBy', localStorage.getItem('user_id'));
    // this.finalVehicleGalleryUID.forEach(element => {
    //   myFormData.append('existingVehicleImage[]', element);
    // });
    // this.filedata.forEach(element => {
    //   myFormData.append('vehicleImage[]', element);
    // });
    // this.apiFlag = true;
    // this.clicked = true;
    // this.http.post<any>(this.apiURL + '/api/updatevehiclegallery', myFormData)
    //   .subscribe(data => {
    //     document.getElementById('text').style.display = 'none';
    //     if (data.return_code == 0) {
    //       this.successMessage = 'Vehicle Gallery Added Successfully !';
    //       document.getElementById('info_success').style.display = 'block';
    //       setTimeout(() => {
    //         this.close1();
    //       }, this.redirectSecounds);
    //     }
    //     else {
    //       if (data.err_message == 'Failed') {
    //         this.successMessage = data.err_message;
    //       } else {
    //         this.successMessage = data.errors[0];
    //       }
    //       this.clicked = false;
    //       document.getElementById('info_alert').style.display = 'block';
    //     }
    //   });
  }

  cancelgalleryEdit(): void {
    $('#modalEditgallery').css('display', 'none');
    /* this.apiFlag = false;
    if (this.clicked == true) {
      this.clicked = false;
    } */
  }

}
