import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
declare var $: any;
declare var updatePageTitle: any;
declare var dateInitialize: any;
declare var from_date: any;
declare var to_date: any;


@Component({
  selector: 'app-store-announcement',
  templateUrl: './store-announcement.component.html',
  styleUrls: ['./store-announcement.component.css']
})
export class StoreAnnouncementComponent implements OnInit {


  apiURL: any;
  imgURL: any;
  blobURL: any;
  apiFlag: any;
  showButton = false;
  successMessage: any;
  clicked: any;
  redirectSecounds: any;
  deleteparts: any;
  public addAnnouncement = {
    message: "",
    from_date: "",
    to_date: "",
    companyUID: "",
    storeUID: ""
  };
  public editAnnouncementData = {
    message: "",
    from_date: "",
    to_date: "",
    companyUID: "",
    storeUID: ""
  };
  public companyReqData = {
    userUID: '',
    distributorUID:"5",
    PROC_TYPE:'SELECT_COMPANY_ADD',
  
  }
  public storeReqData = {
    userUID: '',
    distributorUID: "5",
    companyUID: null,
    ArchStatus: '0',
  }
  message: string = "";
  editMessage: string = "";
  from_date: string;
  to_date: string;
  companyUID: any = null;
  companyList = [];
  storeList = [];
  selectedEditData: any;
  selectedDeleteData: any;
  selectedArchiveData: any;
  currentAnnouncementList = [];
  oldAnnouncementList = [];
  public loadingOverlayComponentParams: any = {
    loadingMessage: 'One moment please...',
  };

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) {
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
    this.blobURL = environment.blobURL;
    this.redirectSecounds = environment.redirectSecounds;

  }

  ngOnInit(): void {
    updatePageTitle('Store Announcement');
    this.getCompanyList();
  //  this.getStoreList();
   // this.getAnnouncementList();
  }

  getAnnouncementList(storeUID:any) {
    let data = {
      userUID: localStorage.getItem('user_id'),
      companyUID:this.addAnnouncement.companyUID,
      storeUID:this.addAnnouncement.storeUID,
    }
    this.http.post<any>(this.apiURL + '/api/getstoreannouncement', data)
      .subscribe(data => {
        if (data.return_code != 1) {
          console.log(data)
          this.currentAnnouncementList = (data as any).announcementList;
          this.oldAnnouncementList = (data as any).inactiveannouncementList;

        } else {
          this.currentAnnouncementList = [];
          this.oldAnnouncementList = [];
        }
      });
  }

  back(): void {
    this.location.back();
  }

  announcementValidation(e: any) {
    if (e.target.value != '' && e.target.value != null && e.target.value != undefined) {
      $("#message_text").css("visibility", "hidden").css("display", "none");
    }
  }

  companyValidation(e: any) {
    if (e.target.value != '' && e.target.value != null && e.target.value != undefined) {
      $("#company_text").css("visibility", "hidden").css("display", "");
    if(localStorage.getItem('userStoreUID')==="null"){
      this.getStoreList(e.target.value)
    }
    }
  }

  storeValidation(e: any) {
    if (e.target.value != '' && e.target.value != null && e.target.value != undefined) {
      this.getAnnouncementList(e.target.value);
      $("#store_text").css("visibility", "hidden").css("display", "");
    }
  }

  fromDateValidation() {
    $("#fd_text").css("visibility", "hidden").css("display", "none");
  }

  toDateValidation() {
    $("#td_text").css("visibility", "hidden").css("display", "none");
  }

  ngAfterViewInit(): void {
    dateInitialize();
  }

  getCompanyList() {
    let data={}
    if(localStorage.getItem('userStoreUID')!=="null"){
       data={
        userUID: localStorage.getItem('user_id'),
        distributorUID:"5",
        PROC_TYPE:'SELECT_COMPANY_ADD',
        companyUID:localStorage.getItem('userCompanyUID'),
        storeUID:localStorage.getItem('userStoreUID')
      }
    }else{
      this.companyReqData.userUID = localStorage.getItem('user_id');
      data = this.companyReqData
    }
    this.http.post<any>(this.apiURL + '/api/getcompanybydistributorid', data)
      .subscribe(data => {
        if (data.return_code != 1) {
          this.companyList = (data as any).companyList;
    if( localStorage.getItem('userStoreUID')!=="null"){
this.storeList = (data as any).storeList;
    }
        } else {
          this.companyList = [];
        }
      });
  }

  getStoreList(value:any){
    this.storeReqData.companyUID = value;
    this.storeReqData.userUID = localStorage.getItem('user_id');
    this.http.post<any>(this.apiURL + '/api/getstorebycomapanyuidanddistributoruid', this.storeReqData)
          .subscribe(data => {
          if (data.return_code != 1) {
           this.storeList = (data as any).StoreDetails;
         } else {
           this.storeList = [];
         }
    });
  }


  getAnnouncementDetails(): void {
    var error = 0;
    if (this.message === "") {
      $("#message_text").css("visibility", "visible").css("display", "");
      error = 1;
    }
    if (this.addAnnouncement.companyUID === "" || this.addAnnouncement.companyUID === null) {
      $("#company_text").css("visibility", "visible").css("display", "");
      error = 1;
    }
    if (this.addAnnouncement.companyUID === "" || this.addAnnouncement.companyUID === null) {
      $("#store_text").css("visibility", "visible").css("display", "");
      error = 1;
    }
    if (!from_date()) {
      $("#fd_text").css("visibility", "visible").css("display", "");
      error = 1;
    }
    if (!to_date()) {
      $("#td_text").css("visibility", "visible").css("display", "");
      error = 1;
    }

    if (error == 1) {
      return;
    }
    
    this.apiFlag = true;
    this.clicked = true;
    this.addAnnouncement.message = this.message;
    this.addAnnouncement.from_date = from_date();
    this.addAnnouncement.to_date = to_date();
    console.log(this.addAnnouncement)
    let data = {
      startDate: this.addAnnouncement.from_date,
      endDate: this.addAnnouncement.to_date,
      announcementContent: this.addAnnouncement.message,
      userUID: localStorage.getItem('user_id'),
      companyUID:this.addAnnouncement.companyUID,
      storeUID:this.addAnnouncement.storeUID,
    }
    this.http.post<any>(this.apiURL + '/api/addstoreannouncement', data)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Store announcement added successfully!';
          document.getElementById('info_success').style.display = 'block';
          this.getAnnouncementList(this.addAnnouncement.storeUID);
          $('#start').datepicker('setDate', null); 
          $('#end').datepicker('setDate', null); 
          this.message = "";
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

  
  close1(): void {
    this.apiFlag = false;
    if (this.clicked == true) {
      // this.location.back();
      this.clicked = false;
    }
  }
  closeDeleteModal():void{
    $('#modalDelete').css('display', 'none')
  }
  closeArchiveModal():void{
    $('#modalArchive').css('display', 'none')
  }


  closeEditModal(): void {
    $('#modalEdit').css('display', 'none')
  }

  edit(selectedData: any) {
    let data = {
      announcementUID: selectedData.announcementUID,
      userUID: localStorage.getItem('user_id')
    }
    this.http.post<any>(this.apiURL + '/api/editglobalannouncement', data)
      .subscribe(data => {
        if (data.return_code != 1) {
          this.selectedEditData = (data as any).announcementDetails[0];
          $('#modalEdit').css('display', 'block')
          editDateInitialize();
          $('#editStart').datepicker('setDate', new Date(this.selectedEditData.startDate)); 
          $('#editEnd').datepicker('setDate', new Date(this.selectedEditData.endDate)); 
           this.editMessage = this.selectedEditData.announcementContent;
          this.editAnnouncementData.companyUID = this.selectedEditData.companyUID;
          this.editAnnouncementData.storeUID = this.selectedEditData.storeUID;
        } else {
          this.selectedEditData = {};
        }
      });

  }
  editAnnouncement(): void {
    var error = 0;
    if (this.editMessage === "") {
      $("#edit_message_text").css("visibility", "visible").css("display", "");
      error = 1;
    }
    if (this.editAnnouncementData.companyUID === "" || this.editAnnouncementData.companyUID === null) {
      $("#edit_company_text").css("visibility", "visible").css("display", "");
      error = 1;
    }
    if (this.editAnnouncementData.storeUID === "" || this.editAnnouncementData.storeUID === null) {
      $("#edit_store_text").css("visibility", "visible").css("display", "");
      error = 1;
    }
    if (!edit_from_date()) {
      $("#edit_fd_text").css("visibility", "visible").css("display", "");
      error = 1;
    }
    if (!edit_to_date()) {
      $("#edit_td_text").css("visibility", "visible").css("display", "");
      error = 1;
    }

    if (error == 1) {
      return;
    }

    this.apiFlag = true;
    this.clicked = true;
    let data = {
      startDate: edit_from_date(),
      endDate: edit_to_date(),
      announcementContent: this.editMessage,
      userUID: localStorage.getItem('user_id'),
      announcementUID: this.selectedEditData.announcementUID,
      companyUID: this.selectedEditData.companyUID,
      storeUID: this.selectedEditData.storeUID
    }
    console.log(data)
    this.http.post<any>(this.apiURL + '/api/updatestoreannouncement', data)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Store Announcement updated successfully!';
          document.getElementById('info_success').style.display = 'block';
          this.getAnnouncementList(this.selectedEditData.storeUID);
          setTimeout(() => {
            this.close1();
            this.closeEditModal();
          }, this.redirectSecounds);
        }
        else {
          this.successMessage = data.errors[0];
          this.clicked = false;
          document.getElementById('info_alert').style.display = 'block';
        }
      });

  }
  delete(selectedData: any) {
    this.selectedDeleteData = selectedData;
    $('#modalDelete').css('display', 'block')

  }

  deleteAnnouncement(): void {
    this.apiFlag = true;
    this.clicked = true;
    let data = {
      announcementUID: this.selectedDeleteData.announcementUID,
    }
    this.http.post<any>(this.apiURL + '/api/deleteannouncement', data)
      .subscribe(data => {
        if (data.return_code != 1) {
          this.successMessage = 'Store Announcement deleted successfully!';
          document.getElementById('info_success').style.display = 'block';
          this.getAnnouncementList(this.selectedDeleteData.storeUID);
          setTimeout(() => {
            this.close1();
            this.closeDeleteModal();
          }, this.redirectSecounds);
        } else {
          this.successMessage = data.errors[0];
          this.clicked = false;
          document.getElementById('info_alert').style.display = 'block';
        }
      });
  }

  archiveAnnouncement(): void {
    this.apiFlag = true;
    this.clicked = true;
    let data = {
      announcementUID: this.selectedArchiveData.announcementUID,
      userUID: localStorage.getItem('user_id'),
      ArchStatus: "1"
    }
    this.http.post<any>(this.apiURL + '/api/parchstatusannouncement', data)
      .subscribe(data => {
        if (data.return_code != 1) {
          this.successMessage = 'Store Announcement archieved successfully!';
          document.getElementById('info_success').style.display = 'block';
          this.getAnnouncementList(this.selectedArchiveData.storeUID);
          setTimeout(() => {
            this.close1();
            this.closeArchiveModal();
          }, this.redirectSecounds);
        } else {
          this.successMessage = data.errors[0];
          this.clicked = false;
          document.getElementById('info_alert').style.display = 'block';
        }
      });
  }
  archive(selectedData: any) {
    this.selectedArchiveData = selectedData;
    $('#modalArchive').css('display', 'block')


  }

}

function editDateInitialize() {
  $('#editStart').datepicker(
    {
      orientation: "bottom"
    }
  );
  $('#editEnd').datepicker(
    {
      orientation: "bottom"
    }
  );
}
function edit_from_date() {
  return $('#editStart').val();
}
function edit_to_date() {
  return $('#editEnd').val();
}
