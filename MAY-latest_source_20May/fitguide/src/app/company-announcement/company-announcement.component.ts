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
  selector: 'app-company-announcement',
  templateUrl: './company-announcement.component.html',
  styleUrls: ['./company-announcement.component.css']
})
export class CompanyAnnouncementComponent implements OnInit {

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
    companyUID:""
  };
  public editAnnouncementData = {
    message: "",
    from_date: "",
    to_date: "",
    companyUID:""
  };
  public companyReqData = {
    userUID: '',
    distributorUID:"5",
    PROC_TYPE:'SELECT_COMPANY_ADD'
  }
  message: string = "";
  editMessage: string = "";
  companyUID:any=null;
  from_date: string;
  to_date: string;
  companyList=[];
  selectedEditData: any;
  selectedDeleteData: any;
  selectedArchiveData: any;
  currentAnnouncementList = [];
  oldAnnouncementList=[];
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
    updatePageTitle('Company Announcement');
    this.getCompanyList();
   
  }

  getAnnouncementList(companyUID:any) {
    let data = {
      userUID: localStorage.getItem('user_id'),
      companyUID:companyUID
    }
    this.http.post<any>(this.apiURL + '/api/getcompanyannouncement', data)
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
    console.log(e.target.value)
    if (e.target.value != '' && e.target.value != null && e.target.value != undefined) {
      $("#message_text").css("visibility", "hidden").css("display", "none");
      $("#edit_message_text").css("visibility", "hidden").css("display", "none");
    }
  }

  companyValidation(e:any)
  {
     if(e.target.value!='' && e.target.value!=null && e.target.value!=undefined)
     {
      this.getAnnouncementList(e.target.value);
         $("#company_text").css("visibility", "hidden").css("display", "");
         $("#edit_company_text").css("visibility", "hidden").css("display", "");
     }
  }

  fromDateValidation() {
    $("#fd_text").css("visibility", "hidden").css("display", "none");
    $("#edit_fd_text").css("visibility", "hidden").css("display", "none");
  }

  toDateValidation() {
    $("#td_text").css("visibility", "hidden").css("display", "none");
    $("#edit_td_text").css("visibility", "hidden").css("display", "none");
  }

  ngAfterViewInit(): void {
    dateInitialize();
  }


  getCompanyList(){
    this.companyReqData.userUID = localStorage.getItem('user_id');
    this.http.post<any>(this.apiURL + '/api/getcompanybydistributorid', this.companyReqData)
    .subscribe(data => {
    if (data.return_code != 1) {
     this.companyList = (data as any).companyList;
    
   } else {
     this.companyList = [];
   }
});
  }

  getAnnouncementDetails(): void {
    var error = 0;
    if (this.message=== "") {
      $("#message_text").css("visibility", "visible").css("display", "");
      error = 1;
    }
    if (this.addAnnouncement.companyUID === "" || this.addAnnouncement.companyUID === null) {
      $("#company_text").css("visibility", "visible").css("display", "");
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
      storeUID:null
    }
    this.http.post<any>(this.apiURL + '/api/addcompanyannouncement', data)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Company announcement added successfully!';
          document.getElementById('info_success').style.display = 'block';
          this.getAnnouncementList(this.addAnnouncement.companyUID);
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
      companyUID: this.selectedEditData.companyUID
    }
    console.log(data)
    this.http.post<any>(this.apiURL + '/api/updatecompanyannouncement', data)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Company Announcement updated successfully!';
          document.getElementById('info_success').style.display = 'block';
          this.getAnnouncementList(this.selectedEditData.companyUID);
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
          this.successMessage = 'Company Announcement deleted successfully!';
          document.getElementById('info_success').style.display = 'block';
          this.getAnnouncementList(this.selectedDeleteData.companyUID);
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
          this.successMessage = 'Company Announcement archieved successfully!';
          document.getElementById('info_success').style.display = 'block';
          this.getAnnouncementList(this.selectedArchiveData.companyUID);
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

