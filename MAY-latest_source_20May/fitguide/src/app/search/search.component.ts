import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewportScroller } from "@angular/common";
declare var $: any;
import { environment } from 'src/environments/environment';
import { PostService } from '../post.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
declare var popFeedback: any;
declare var displaySearchText: any;
declare var AddClass: any;
declare var RemoveClass: any;
declare var processPrint: any;
declare var hideSearchText: any;
declare var getDate: any;
declare var imageGallery: any;
declare var sectionimageGallery: any;
declare var lboxo: any;
declare var lboxc: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy {
  bmwFlagArray: boolean;
  isShow: boolean;
  public interval;
  isBannerAds: any;
  apiURL: any;
  imgURL: any;
  blobURL: any;
  imgPathLength: any;
  laravelData: any;
  topBanner: any;
  globalannouncelist: any[] = [];
  companyannouncelist: any[] = [];
  storeannouncelist: any[] = [];
  makes: any;
  models: any;
  years: any;
  option1: any;
  option2: any;
  option3: any;
  option4: any;
  option5: any;
  option6: any;
  vehicle: any;
  carTruckHeiseBrackets: any;
  bulbDetails: any;
  selectedYear: any;
  selectedOption2: any;
  selectedOption3: any;
  selectedOption4: any;
  selectedOption5: any;
  selectedOption6: any;
  selectedOption7: any;
  trial = {
    userUID: '',
  };
  public compannounce = {
    userUID: '',
    companyUID: null
  }
  public storeannounce = {
    userUID: '',
    storeUID: null
  }
  datas = {
    userUID: '',
    PROC_TYPE: '',
    MAKE: '',
    MODEL: ''
  };
  options1 = {
    make: '',
    model: '',
    year: '',
    userUID: ''
  };
  options2 = {
    make: '',
    model: '',
    year: '',
    userUID: '',
    option1: ''
  };
  options3 = {
    make: '',
    model: '',
    year: '',
    userUID: '',
    option1: '',
    option2: ''
  };
  options4 = {
    make: '',
    model: '',
    year: '',
    userUID: '',
    option1: '',
    option2: '',
    option3: ''
  };
  options5 = {
    make: '',
    model: '',
    year: '',
    userUID: '',
    option1: '',
    option2: '',
    option3: '',
    option4: ''
  };
  options6 = {
    make: '',
    model: '',
    year: '',
    userUID: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    option5: ''
  };
  vehicleData = {
    make: '',
    model: '',
    year: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    option5: '',
    option6: '',
    userUID: '',
    roleUID: ''
  };
  feedback = {
    userUID: '',
    vehicleUID: '',
    feedbackText: '',
    feedbackDate: ''
  };
  //params: any;
  feedbackText: any;
  searchText: any;
  info: any;
  feedinfo: any;
  ReplaceHeadUnit: any;
  SpeakerFitGuide: any;
  AmplifierIntegrationGuide: any;
  VehicleEnclosureGuide: any;
  OEMIntegrationGuide: any;
  AuxInandBTGuide: any;
  VAISTech: any;
  SystemsThatWork: any;
  DXFLaserFileList: any;
  CommonCarandTruckAccList: any;
  LEDandHIDUpgradeGuide: any;
  TintingandPPFGuide: any;
  CruiseControlGuide: any;
  BackupSafetyGuide: any;
  DEIRemoteStartGuide: any;
  FirstechRemoteStartGuide: any;
  SpecialParts: any;
  IgnInterlockGuide: any;
  ANCGuide: any;
  AUXBTGuide: any;
  DriverSafety: any;
  DXFLaserGuide: any;
  LightingGuide: any;
  SpeakerAdapters: any;
  TailgateAssist: any;
  TruxedoGuide: any;
  WeatherTechGuide: any;
  BMWEuroStart: any;
  failureMessage: any;
  rightBanners: any;
  processedBanners: [];
  ReplaceHeadUnitGallery: any;
  SpeakerFitGuideGallery: any;
  AmplifierIntegrationGuideGallery: any;
  VehicleEnclosureGuideGallery: any;
  OEMIntegrationGuideGallery: any;
  AuxInandBTGuideGallery: any;
  VAISTechGallery: any;
  SystemsThatWorkGallery: any;
  DXFLaserFileListGallery: any;
  CommonCarandTruckAccListGallery: any;
  LEDandHIDUpgradeGuideGallery: any;
  TintingandPPFGuideGallery: any;
  CruiseControlGuideGallery: any;
  BackupSafetyGuideGallery: any;
  DEIRemoteStartGuideGallery: any;
  FirstechRemoteStartGuideGallery: any;
  SpecialPartsGallery: any;
  IgnInterlockGuideGallery: any;
  ANCGuideGallery: any;
  AUXBTGuideGallery: any;
  DriverSafetyGallery: any;
  DXFLaserGuideGallery: any;
  LightingGuideGallery: any;
  SpeakerAdaptersGallery: any;
  TailgateAssistGallery: any;
  TruxedoGuideGallery: any;
  WeatherTechGuideGallery: any;
  BMWEuroStartGallery: any;
  ReplaceHeadUnitNote: any;
  SpeakerFitGuideNote: any;
  AmplifierIntegrationGuideNote: any;
  VehicleEnclosureGuideNote: any;
  OEMIntegrationGuideNote: any;
  AuxInandBTGuideNote: any;
  VAISTechNote: any;
  SystemsThatWorkNote: any;
  DXFLaserFileListNote: any;
  CommonCarandTruckAccListNote: any;
  LEDandHIDUpgradeGuideNote: any;
  TintingandPPFGuideNote: any;
  CruiseControlGuideNote: any;
  BackupSafetyGuideNote: any;
  DEIRemoteStartGuideNote: any;
  FirstechRemoteStartGuideNote: any;
  SpecialPartsNote: any;
  IgnInterlockGuideNote: any;
  ANCGuideNote: any;
  AUXBTGuideNote: any;
  DriverSafetyNote: any;
  DXFLaserGuideNote: any;
  LightingGuideNote: any;
  SpeakerAdaptersNote: any;
  TailgateAssistNote: any;
  TruxedoGuideNote: any;
  WeatherTechGuideNote: any;
  BMWEuroStartNote: any;
  alertFlag: any;
  alertMessage: any;
  dbDate: any;
  currentTrialDate: any;
  currentDate: any;
  feedback_text: any;
  searchSectionStatus: any;
  searchSectionMessage: any;
  AllSectionListDetailsArray: any;
  displaySectionNameList: any;
  dynamicNoteData = {
    PROC_TYPE: null,
    RoleUID: null,
    UserUID: null,
    SearchSectionUID: null,
    searchSectionName: null,
    VehicleUID: null,
    Gallery_Notes: null,
    vehicleGalleryUID: null,

  };
  dynamicWarningData = {
    PROC_TYPE: null,
    UserUID: null,
    SearchSectionUID: null,
    VehicleUID: null,
    WarningText: null,
    vehicleDetailUID: null
  };
  dynamicImageData = {
    PROC_TYPE: null,
    RoleUID: null,
    UserUID: null,
    SearchSectionUID: null,
    searchSectionName: null,
    VehicleUID: null,
    Gallery_Image: null,
    Gallery_Image1: null,
    Gallery_Image2: null,
    vehicleGalleryUID: null
  };
  filedata: any;
  sizeInMB: any;
  contentImage = '';
  contentData: any;
  public user = {
    roleUID: '',
    userUID: ''
  };
  feedLoader: boolean;
  fromTo: any;
  mainForm: FormGroup;
  dynamicForm: FormGroup;
  currentForm: any;
  /* nonpart = {
    vehicleDetailNonPartUID: ''
  } */
  rightbannerImage: any;
  params: any;
  role: any;
  public roleUID: any;
  constructor(private http: HttpClient, private PostService: PostService, private router: Router, private sanitizer: DomSanitizer, private scroller: ViewportScroller, public fb: FormBuilder) {
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
    this.blobURL = environment.blobURL;
    this.imgPathLength = environment.imgPathLength;
    this.mainForm = this.fb.group({
      dynamicForm: this.fb.array([])
    });

  }

  addMainFormGroup(): FormGroup {
    return this.fb.group({
      images: this.fb.array([])
    });
  }

  addImageFormGroup(): FormGroup {
    return this.fb.group({
      addImage: this.fb.array([])
    });
  }

  addFileFormGroup(): FormGroup {
    return this.fb.group({
      addFile: ['']
    });
  }

  get f(): any { return this.mainForm.controls; }

  ngOnInit(): void {
    this.roleUID = localStorage.getItem('role_id');
    this.getbanners();
    this.isShow = false;
    //$("#banners").show();
    this.getMake();
    this.getTopBanner();
    $("#feed").hide();
    this.bmwFlagArray = false;
    $("#scroll_top").hide();
    $("#responsive_scrolltop").hide();
    this.feedLoader = false;
    this.topBanner = [];
    this.info = false;
    this.feedinfo = false;
    this.feedback_text = '';
    //this.processedBanners = [];
    this.ReplaceHeadUnit = [];
    this.SpeakerFitGuide = [];
    this.AmplifierIntegrationGuide = [];
    this.VehicleEnclosureGuide = [];
    this.OEMIntegrationGuide = [];
    this.AuxInandBTGuide = [];
    this.VAISTech = [];
    this.SystemsThatWork = [];
    this.DXFLaserFileList = [];
    this.CommonCarandTruckAccList = [];
    this.LEDandHIDUpgradeGuide = [];
    this.TintingandPPFGuide = [];
    this.CruiseControlGuide = [];
    this.BackupSafetyGuide = [];
    this.DEIRemoteStartGuide = [];
    this.FirstechRemoteStartGuide = [];
    this.IgnInterlockGuide = [];
    this.SpecialParts = [];
    this.AUXBTGuide = [];
    this.DriverSafety = [];
    this.DXFLaserGuide = [];
    this.LightingGuide = [];
    this.SpeakerAdapters = [];
    this.TailgateAssist = [];
    this.TruxedoGuide = [];
    this.WeatherTechGuide = [];
    this.BMWEuroStart = [];
    this.AllSectionListDetailsArray = [];
    this.vehicleData.roleUID = localStorage.getItem('role_id');
    this.vehicleData.userUID = localStorage.getItem('user_id');
    //hideSearchText();
    if (Math.max(window.screen.width, window.innerWidth) < 600) {
      updatePageTitle('');
    } else {
      updatePageTitle('Search Vehicle');
    }
    this.isBannerAds = localStorage.getItem('isBannerAds');
    // console.log(this.isBannerAds);
    // hideSearchText();
    if (this.isBannerAds != 'null' && this.isBannerAds != null && this.isBannerAds != 0) {
      this.getContentImage();
    }

    //this.announcelist = [];
    if(sessionStorage.getItem('globalAnnouncement')==="false"){
      this.getglobalannounce();
    }
    if(sessionStorage.getItem('companyAnnouncement')==="false"){
    this.getcompannounce();
    }
    if(sessionStorage.getItem('storeAnnouncement')==="false"){
    this.getstoreannounce();
    }
    //console.log(this.params.data.companyUID);
    //this.nonpart.vehicleDetailNonPartUID = this.params.value;
  }
  onCloseGlobal():void{
    sessionStorage.setItem('globalAnnouncement', 'true');
    this.globalannouncelist =[]
  }
  onCloseCompany():void{
    sessionStorage.setItem('companyAnnouncement', 'true');
    this.companyannouncelist = []
  }
  onCloseStore():void{
    sessionStorage.setItem('storeAnnouncement', 'true');
    this.storeannouncelist = []
  }

  getglobalannounce():void {
    this.trial.userUID = localStorage.getItem('user_id');
    this.http.post<any>(this.apiURL + '/api/showglobalannouncement', this.trial)
      .subscribe( data => {
        if (data.return_code == 0) {
          let jsonString = '['
          for (let a = 0; a < data.announcementList.length; a++) {
            let temp = data.announcementList[a].announcementContent;
            // console.log(temp);
            jsonString += '{"announcementContent": "' + temp + '" , "announcementType":"' + data.announcementList[a].announcementType + '"}';
            // console.log(jsonString);
            if (a !== (data.announcementList.length - 1)) {
              jsonString += ',';
            }
          }
          jsonString += ']';
          this.globalannouncelist = JSON.parse(jsonString);
          // console.log(this.globalannouncelist);
          $('#loader').hide();
        }
      });
  }

  getcompannounce(): void {
    // localStorage.setItem('companyUID',this.params.data.companyUID);
    //console.log(this.params.data.companyUID);
    this.compannounce.userUID = localStorage.getItem('user_id');
    this.compannounce.companyUID = localStorage.getItem('userCompanyUID');
    this.http.post<any>(this.apiURL + '/api/showcompanyannouncement', this.compannounce)
      .subscribe(data => {
        if (data.return_code == 0) {
          // let companyannouncelist = await (data as any).announcementList;
          console.log(data);
          let jsonString = '['
          for (let c = 0; c < data.announcementList.length; c++) {
            let temp = data.announcementList[c].announcementContent;
            // console.log(temp);
            jsonString += '{"announcementContent": "' + temp + '", "announcementType":"' + data.announcementList[c].announcementType + '"}';
            // console.log(jsonString);
            if (c !== (data.announcementList.length - 1)) {
              jsonString += ',';
            }
          }
          jsonString += ']';
      this.companyannouncelist = JSON.parse(jsonString);
          $('#loader').hide();
        }
      });
  }

  getstoreannounce(): void {
    this.storeannounce.userUID = localStorage.getItem('user_id');
    this.storeannounce.storeUID = localStorage.getItem('userStoreUID');
    this.http.post<any>(this.apiURL + '/api/showstoreannouncement', this.storeannounce)
      .subscribe( data => {
        if (data.return_code == 0) {
          console.log("from storelist", data);
          // let storeannouncelist = await (data as any).announcementList;
          let jsonString = '['
          for (let s = 0; s < data.announcementList.length; s++) {
            let temp = data.announcementList[s].announcementContent;
            // console.log(temp);
            jsonString += '{"announcementContent": "' + temp + '" , "announcementType":"' + data.announcementList[s].announcementType + '"}';
            // console.log(jsonString);
            if (s !== (data.announcementList.length - 1)) {
              jsonString += ',';
            }
          }
          jsonString += ']';
        this.storeannouncelist = JSON.parse(jsonString);

          $('#loader').hide();
        }
      });
  }
  // getglobalannounce(): void {
  //   this.trial.userUID = localStorage.getItem('user_id');
  //   this.http.post<any>(this.apiURL + '/api/showglobalannouncement', this.trial)
  //     .subscribe(data => {
  //       if (data.return_code == 0) {
  //         // console.log(data);
  //         this.globalannouncelist = (data as any).announcementList;
  //         let jsonString = '['
  //         for (let a = 0; a < data.announcementList.length; a++) {
  //           let temp = data.announcementList[a].announcementContent;
  //           // console.log(temp);
  //           jsonString += '{"announcementContent": "' + temp + '" , "announcementType":"' + data.announcementList[a].announcementType + '"}';
  //           // console.log(jsonString);
  //           if (a !== (data.announcementList.length - 1)) {
  //             jsonString += ',';
  //           }
  //         }
  //         jsonString += ']';
  //         // this.globalannouncelist = JSON.parse(jsonString);
  //         sessionStorage.setItem('globalAnnouncement', JSON.parse(jsonString));
  //         // console.log(this.globalannouncelist);
  //         $('#loader').hide();
  //       }
  //     });
  // }

  // getcompannounce(): void {
  //   // localStorage.setItem('companyUID',this.params.data.companyUID);
  //   //console.log(this.params.data.companyUID);
  //   this.compannounce.userUID = localStorage.getItem('user_id');
  //   this.compannounce.companyUID = localStorage.getItem('userCompanyUID');
  //   this.http.post<any>(this.apiURL + '/api/showcompanyannouncement', this.compannounce)
  //     .subscribe(data => {
  //       if (data.return_code == 0) {
  //         this.companyannouncelist = (data as any).announcementList;
  //         console.log(data);
  //         let jsonString = '['
  //         for (let c = 0; c < data.announcementList.length; c++) {
  //           let temp = data.announcementList[c].announcementContent;
  //           // console.log(temp);
  //           jsonString += '{"announcementContent": "' + temp + '", "announcementType":"' + data.announcementList[c].announcementType + '"}';
  //           // console.log(jsonString);
  //           if (c !== (data.announcementList.length - 1)) {
  //             jsonString += ',';
  //           }
  //         }
  //         jsonString += ']';
  //         // this.companyannouncelist = JSON.parse(jsonString);
  //         sessionStorage.setItem('companyAnnouncement', JSON.parse(jsonString));
  //         $('#loader').hide();
  //       }
  //     });
  // }

  // getstoreannounce(): void {
  //   this.storeannounce.userUID = localStorage.getItem('user_id');
  //   this.storeannounce.storeUID = localStorage.getItem('userStoreUID');
  //   this.http.post<any>(this.apiURL + '/api/showstoreannouncement', this.storeannounce)
  //     .subscribe(data => {
  //       if (data.return_code == 0) {
  //         console.log("from storelist", data);
  //         this.storeannouncelist = (data as any).announcementList;
  //         let jsonString = '['
  //         for (let s = 0; s < data.announcementList.length; s++) {
  //           let temp = data.announcementList[s].announcementContent;
  //           // console.log(temp);
  //           jsonString += '{"announcementContent": "' + temp + '" , "announcementType":"' + data.announcementList[s].announcementType + '"}';
  //           // console.log(jsonString);
  //           if (s !== (data.announcementList.length - 1)) {
  //             jsonString += ',';
  //           }
  //         }
  //         jsonString += ']';
  //        // this.storeannouncelist = JSON.parse(jsonString);
  //         sessionStorage.setItem('storeAnnouncement', JSON.parse(jsonString));
  //         $('#loader').hide();
  //       }
  //     });
  // }

  getContentImage() {
    this.user.roleUID = localStorage.getItem('role_id');
    this.user.userUID = localStorage.getItem('user_id');
    this.http.post<any>(this.apiURL + '/api/getallcontent', this.user)
      .subscribe(data => {
        this.contentData = (data as any).contentDetails;
        let bannerContent = this.contentData.find((item) => item.contentUID === 26);
        //let bannerContent = this.contentData.find((item)=>item.contentUID === 29);
        this.contentImage = this.imgURL + 'storage/app/public/uploads/content/' + bannerContent.ImageData;
        $('#adModal').css('display', 'block');
        $('#adModal').css('height', document.body.scrollHeight);
        // console.log(this.contentImage);
      });

  }
  ngAfterViewInit(): void {
    //popFeedback();
    $('#loader').hide();
    this.trial.userUID = localStorage.getItem('user_id');
    this.http.post<any>(this.apiURL + '/api/getusertraildetails', this.trial)
      .subscribe(data => {
        // console.log(data);
        if (data.return_code == 0) {
          if (data.trailDetails[0].istrail == '1') {
            if (data.trailDetails[0].trailDate < data.currentDate) {
              this.alertFlag = true;
              this.alertMessage = 'Please contact Administrator, Your Trial Peroid is Expired !';
              /*setTimeout(() => {
                this.alertFlag = false;
                this.router.navigate(['/home/dashboard']);
              }, 9000);*/
            }
          }
        }
      });
    this.http.post<any>(this.apiURL + '/api/getusertermsdetails', this.trial)
      .subscribe(data => {
        if (data.return_code == 0) {
          if (data.termsDetails[0].terms != '1') {
            this.alertFlag = true;
            this.alertMessage = 'Please accept the terms of use and then search the vehicle details !';
            setTimeout(() => {
              this.alertFlag = false;
              this.router.navigate(['/home/termsofuse']);
            }, 9000);
          }
        }
      });
  }

  close(): void {
    this.info = false;
    this.feedinfo = false;
  }

  loadFeedback(): void {
    popFeedback();
  }

  openEditor(): void {
    //this.router.navigate(['/home/vehiclemaster/viewvehicle/' +  this.feedback.vehicleUID]);
    this.router.navigate([]).then(result => { window.open(`${environment.domainURL}#/home/vehiclemaster/viewvehicle/${this.feedback.vehicleUID}`, '_blank'); });
  }

  getData(): void {
    this.http.get(this.apiURL + '/api/testing').subscribe((data: any) => {
      // console.log(data);
      this.laravelData = data;
    });
  }

  getMake(): void {
    this.trial.userUID = localStorage.getItem('user_id');
    this.http.post<any>(this.apiURL + '/api/getmake', this.trial)
      .subscribe(data => {
        // console.log(data.makeDetails);
        this.makes = (data as any).makeDetails;
        $('#loader').hide();
      });
  }

  getTopBanner(): void {
    this.http.post<any>(this.apiURL + '/api/gettopbanner', {})
      .subscribe(data => {
        //  console.log("Top Banner",data.topBannerDetails);
        this.topBanner = (data as any).topBannerDetails;
        /*   $('#loader').hide(); */
      });
  }

  getModel(e): void {
    //  console.log(e.target.options[e.target.options.selectedIndex].text);
    this.datas.userUID = localStorage.getItem('user_id');
    $("#search_results").hide();
    $("#edit_vehicle").hide();
    $("#resultbtn").hide();
    //$("#banners").show();
    $("#feedback_section").hide();
    $("#feed").hide();
    $("#scroll_top").hide();
    this.isShow = false;
    $("#responsive_scrolltop").hide();
    if (Math.max(window.screen.width, window.innerWidth) < 600) {
      updatePageTitle('');
    } else {
      updatePageTitle('Search Vehicle');
    }
    this.info = false;
    this.vehicleData.year = '';
    this.vehicleData.make = '';
    this.vehicleData.model = '';
    this.vehicleData.option1 = '';
    this.vehicleData.option2 = '';
    this.vehicleData.option3 = '';
    this.vehicleData.option4 = '';
    this.vehicleData.option5 = '';
    this.vehicleData.option6 = '';
    this.datas.PROC_TYPE = 'MODEL';
    this.datas.MAKE = e.target.options[e.target.options.selectedIndex].text;
    this.vehicleData.make = e.target.options[e.target.options.selectedIndex].text;
    $("#model_list_hide").css("visibility", "visible").css("display", "");
    $("#year_list_hide").css("visibility", "hidden").css("display", "none");
    $("#options_1_hide").css("visibility", "hidden").css("display", "none");
    $("#options_2_hide").css("visibility", "hidden").css("display", "none");
    $("#options_3_hide").css("visibility", "hidden").css("display", "none");
    $("#options_4_hide").css("visibility", "hidden").css("display", "none");
    $("#options_5_hide").css("visibility", "hidden").css("display", "none");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getmodel', this.datas)
      .subscribe(data => {
        // console.log(data);
        this.models = (data as any).ModelDetails;
      });
  }

  getYear(e): void {
    this.datas.userUID = localStorage.getItem('user_id');
    $("#search_results").hide();
    $("#edit_vehicle").hide();
    $("#resultbtn").hide();
    //$("#banners").show();
    $("#feedback_section").hide();
    $("#feed").hide();
    $("#scroll_top").hide();
    this.isShow = false;
    $("#responsive_scrolltop").hide();
    if (Math.max(window.screen.width, window.innerWidth) < 600) {
      updatePageTitle('');
    } else {
      updatePageTitle('Search Vehicle');
    }
    this.info = false;
    this.vehicleData.year = '';
    this.vehicleData.model = '';
    this.vehicleData.option1 = '';
    this.vehicleData.option2 = '';
    this.vehicleData.option3 = '';
    this.vehicleData.option4 = '';
    this.vehicleData.option5 = '';
    this.vehicleData.option6 = '';
    this.datas.PROC_TYPE = 'YEAR';
    this.datas.MODEL = e.target.value;
    this.vehicleData.model = e.target.value;
    // console.log(this.data);
    $("#year_list_hide").css("visibility", "visible").css("display", "");
    $("#options_1_hide").css("visibility", "hidden").css("display", "none");
    $("#options_2_hide").css("visibility", "hidden").css("display", "none");
    $("#options_3_hide").css("visibility", "hidden").css("display", "none");
    $("#options_4_hide").css("visibility", "hidden").css("display", "none");
    $("#options_5_hide").css("visibility", "hidden").css("display", "none");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getyear', this.datas)
      .subscribe(data => {
        // console.log(data);
        this.years = (data as any).yearDetails;
      });
  }
  getOption1(): void {
    this.options1.userUID = localStorage.getItem('user_id');
    $("#search_results").hide();
    $("#edit_vehicle").hide();
    $("#resultbtn").hide();
    //$("#banners").show();
    $("#feedback_section").hide();
    $("#feed").hide();
    $("#scroll_top").hide();
    this.isShow = false;
    $("#responsive_scrolltop").hide();
    if (Math.max(window.screen.width, window.innerWidth) < 600) {
      updatePageTitle('');
    } else {
      updatePageTitle('Search Vehicle');
    }
    this.info = false;
    this.vehicleData.year = '';
    this.vehicleData.option1 = '';
    this.vehicleData.option2 = '';
    this.vehicleData.option3 = '';
    this.vehicleData.option4 = '';
    this.vehicleData.option5 = '';
    this.vehicleData.option6 = '';
    this.options1.make = this.datas.MAKE;
    this.options1.model = this.datas.MODEL;
    this.selectedYear = $('#year_list').val();
    this.vehicleData.year = this.selectedYear;
    this.options1.year = this.selectedYear;
    $("#options_2_hide").css("visibility", "hidden").css("display", "none");
    $("#options_3_hide").css("visibility", "hidden").css("display", "none");
    $("#options_4_hide").css("visibility", "hidden").css("display", "none");
    $("#options_5_hide").css("visibility", "hidden").css("display", "none");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getoption1', this.options1)
      .subscribe(data => {
        this.option1 = (data as any).option1Details;
        if (this.option1.length < 1) {
          $("#options_1_hide").css("visibility", "hidden").css("display", "none");
          this.loadVehicle();
        }
        else if (this.option1.length == 1) {
          $("#options_1_hide").css("visibility", "visible").css("display", "");
          setTimeout(() => {
            $('#options_1').val(this.option1[0].Option1);
            this.getOption2();
          }, 1000);
        }
        else {
          $("#options_1_hide").css("visibility", "visible").css("display", "");
        }
      });
  }
  getOption2(): void {
    this.options2.userUID = localStorage.getItem('user_id');
    $("#search_results").hide();
    $("#edit_vehicle").hide();
    $("#resultbtn").hide();
    //$("#banners").show();
    $("#feedback_section").hide();
    $("#feed").hide();
    $("#scroll_top").hide();
    this.isShow = false;
    $("#responsive_scrolltop").hide();
    if (Math.max(window.screen.width, window.innerWidth) < 600) {
      updatePageTitle('');
    } else {
      updatePageTitle('Search Vehicle');
    }
    this.info = false;
    this.vehicleData.option1 = '';
    this.vehicleData.option2 = '';
    this.vehicleData.option3 = '';
    this.vehicleData.option4 = '';
    this.vehicleData.option5 = '';
    this.vehicleData.option6 = '';
    this.options2.make = this.datas.MAKE;
    this.options2.model = this.datas.MODEL;
    this.options2.year = this.options1.year;
    this.selectedOption2 = $('#options_1').val();
    this.options2.userUID = localStorage.getItem('user_id');
    this.options2.option1 = this.selectedOption2;
    this.vehicleData.option1 = '';
    this.vehicleData.option1 = this.selectedOption2;
    $("#options_3_hide").css("visibility", "hidden").css("display", "none");
    $("#options_4_hide").css("visibility", "hidden").css("display", "none");
    $("#options_5_hide").css("visibility", "hidden").css("display", "none");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getoption2', this.options2)
      .subscribe(data => {
        this.option2 = (data as any).option2Details;
        if (this.option2.length < 1) {
          $("#options_2_hide").css("visibility", "hidden").css("display", "none");
          this.loadVehicle();
        }
        else if (this.option2.length == 1) {
          $("#options_2_hide").css("visibility", "visible").css("display", "");
          setTimeout(() => {
            $('#options_2').val(this.option2[0].Option2);
            this.getOption3();
          }, 1000);
        }
        else {
          $("#options_2_hide").css("visibility", "visible").css("display", "");
        }
      });
  }
  getOption3(): void {
    this.options3.userUID = localStorage.getItem('user_id');
    $("#search_results").hide();
    $("#edit_vehicle").hide();
    $("#resultbtn").hide();
    //$("#banners").show();
    $("#feedback_section").hide();
    $("#feed").hide();
    $("#scroll_top").hide();
    this.isShow = false;
    $("#responsive_scrolltop").hide();
    if (Math.max(window.screen.width, window.innerWidth) < 600) {
      updatePageTitle('');
    } else {
      updatePageTitle('Search Vehicle');
    }
    this.info = false;
    this.vehicleData.option2 = '';
    this.vehicleData.option3 = '';
    this.vehicleData.option4 = '';
    this.vehicleData.option5 = '';
    this.vehicleData.option6 = '';
    this.options3.make = this.datas.MAKE;
    this.options3.model = this.datas.MODEL;
    this.options3.year = this.options1.year;
    this.options3.option1 = this.options2.option1;
    this.options3.userUID = localStorage.getItem('user_id');
    this.selectedOption3 = $('#options_2').val();
    this.options3.option2 = this.selectedOption3;
    this.vehicleData.option2 = '';
    this.vehicleData.option2 = this.selectedOption3;
    $("#options_4_hide").css("visibility", "hidden").css("display", "none");
    $("#options_5_hide").css("visibility", "hidden").css("display", "none");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getoption3', this.options3)
      .subscribe(data => {
        this.option3 = (data as any).option3Details;
        if (this.option3.length < 1) {
          $("#options_3_hide").css("visibility", "hidden").css("display", "none");
          this.loadVehicle();
        }
        else if (this.option3.length == 1) {
          $("#options_3_hide").css("visibility", "visible").css("display", "");
          setTimeout(() => {
            $('#options_3').val(this.option3[0].Option3);
            this.getOption4();
          }, 1000);
        }
        else {
          $("#options_3_hide").css("visibility", "visible").css("display", "");
        }
      });
  }
  getOption4(): void {
    this.options4.userUID = localStorage.getItem('user_id');
    $("#search_results").hide();
    $("#edit_vehicle").hide();
    $("#resultbtn").hide();
    //$("#banners").show();
    $("#feedback_section").hide();
    $("#feed").hide();
    $("#scroll_top").hide();
    this.isShow = false;
    $("#responsive_scrolltop").hide();
    if (Math.max(window.screen.width, window.innerWidth) < 600) {
      updatePageTitle('');
    } else {
      updatePageTitle('Search Vehicle');
    }
    this.info = false;
    this.vehicleData.option3 = '';
    this.vehicleData.option4 = '';
    this.vehicleData.option5 = '';
    this.vehicleData.option6 = '';
    this.options4.make = this.datas.MAKE;
    this.options4.model = this.datas.MODEL;
    this.options4.year = this.options1.year;
    this.options4.option1 = this.options2.option1;
    this.options4.option2 = this.options3.option2;
    this.options4.userUID = localStorage.getItem('user_id');
    this.selectedOption4 = $('#options_3').val();
    this.options4.option3 = this.selectedOption4;
    this.vehicleData.option3 = '';
    this.vehicleData.option3 = this.selectedOption4;
    $("#options_5_hide").css("visibility", "hidden").css("display", "none");
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getoption4', this.options4)
      .subscribe(data => {
        this.option4 = (data as any).option4Details;
        if (this.option4.length < 1) {
          $("#options_4_hide").css("visibility", "hidden").css("display", "none");
          this.loadVehicle();
        }
        else if (this.option4.length == 1) {
          $("#options_4_hide").css("visibility", "visible").css("display", "");
          setTimeout(() => {
            $('#options_4').val(this.option4[0].Option4);
            this.getOption5();
          }, 1000);
        }
        else {
          $("#options_4_hide").css("visibility", "visible").css("display", "");
        }
      });
  }
  getOption5(): void {
    this.options5.userUID = localStorage.getItem('user_id');
    $("#search_results").hide();
    $("#edit_vehicle").hide();
    $("#resultbtn").hide();
    //$("#banners").show();
    $("#feedback_section").hide();
    $("#feed").hide();
    $("#scroll_top").hide();
    this.isShow = false;
    $("#responsive_scrolltop").hide();
    if (Math.max(window.screen.width, window.innerWidth) < 600) {
      updatePageTitle('');
    } else {
      updatePageTitle('Search Vehicle');
    }
    this.info = false;
    this.vehicleData.option4 = '';
    this.vehicleData.option5 = '';
    this.vehicleData.option6 = '';
    this.options5.make = this.datas.MAKE;
    this.options5.model = this.datas.MODEL;
    this.options5.year = this.options1.year;
    this.options5.option1 = this.options2.option1;
    this.options5.option2 = this.options3.option2;
    this.options5.option3 = this.options4.option3;
    this.options5.userUID = localStorage.getItem('user_id');
    this.selectedOption5 = $('#options_4').val();
    this.options5.option4 = this.selectedOption5;
    this.vehicleData.option4 = '';
    this.vehicleData.option4 = this.selectedOption5;
    $("#options_6_hide").css("visibility", "hidden").css("display", "none");
    this.http.post<any>(this.apiURL + '/api/getoption5', this.options5)
      .subscribe(data => {
        this.option5 = (data as any).option5Details;
        if (this.option5.length < 1) {
          $("#options_5_hide").css("visibility", "hidden").css("display", "none");
          this.loadVehicle();
        }
        else if (this.option5.length == 1) {
          $("#options_5_hide").css("visibility", "visible").css("display", "");
          setTimeout(() => {
            $('#options_5').val(this.option5[0].Option5);
            this.getOption6();
          }, 1000);
        }
        else {
          $("#options_5_hide").css("visibility", "visible").css("display", "");
        }
      });
  }
  getOption6(): void {
    this.options6.userUID = localStorage.getItem('user_id');
    $("#search_results").hide();
    $("#edit_vehicle").hide();
    $("#resultbtn").hide();
    //$("#banners").show();
    $("#feedback_section").hide();
    $("#feed").hide();
    $("#scroll_top").hide();
    this.isShow = false;
    $("#responsive_scrolltop").hide();
    if (Math.max(window.screen.width, window.innerWidth) < 600) {
      updatePageTitle('');
    } else {
      updatePageTitle('Search Vehicle');
    }
    this.info = false;
    this.vehicleData.option5 = '';
    this.vehicleData.option6 = '';
    this.options6.make = this.datas.MAKE;
    this.options6.model = this.datas.MODEL;
    this.options6.year = this.options1.year;
    this.options6.option1 = this.options2.option1;
    this.options6.option2 = this.options3.option2;
    this.options6.option3 = this.options4.option3;
    this.options6.option4 = this.options5.option4;
    this.options6.userUID = localStorage.getItem('user_id');
    this.selectedOption6 = $('#options_5').val();
    this.options6.option5 = this.selectedOption6;
    this.vehicleData.option5 = '';
    this.vehicleData.option5 = this.selectedOption6;
    this.http.post<any>(this.apiURL + '/api/getoption6', this.options6)
      .subscribe(data => {
        this.option6 = (data as any).option6Details;
        if (this.option6.length < 1) {
          $("#options_6_hide").css("visibility", "hidden").css("display", "none");
          this.loadVehicle();
        }
        else if (this.option6.length == 1) {
          $("#options_6_hide").css("visibility", "visible").css("display", "");
          setTimeout(() => {
            $('#options_6').val(this.option6[0].Option6);
            this.getOption7();
          }, 1000);
        }
        else {
          $("#options_6_hide").css("visibility", "visible").css("display", "");
        }
      });
  }

  getOption7(): void {
    $("#search_results").hide();
    $("#edit_vehicle").hide();
    $("#resultbtn").hide();
    //$("#banners").show();
    $("#feedback_section").hide();
    $("#feed").hide();
    $("#scroll_top").hide();
    this.isShow = false;
    $("#responsive_scrolltop").hide();
    if (Math.max(window.screen.width, window.innerWidth) < 600) {
      updatePageTitle('');
    } else {
      updatePageTitle('Search Vehicle');
    }
    this.info = false;
    this.vehicleData.option6 = '';
    this.selectedOption7 = $('#options_6').val();
    this.vehicleData.option6 = this.selectedOption7;
    this.loadVehicle();
  }

  addFeedbackSave(): void {
    this.feedinfo = false;
    this.feedLoader = true;
    this.feedback.userUID = localStorage.getItem('user_id');
    this.feedbackText = $('#feedback_text').val();
    this.feedback.feedbackText = this.feedbackText;
    this.feedback.feedbackDate = getDate();
    this.http.post<any>(this.apiURL + '/api/addfeedback', this.feedback)
      .subscribe(data => {
        this.feedLoader = false;
        this.feedinfo = true;
        this.feedback_text = '';
      });
  }

  addFeedbackClose(): void {
    this.feedback_text = '';
    this.feedLoader = false;
  }

  imageEdit(gallery, data, k): void {
    data.imageFlag = true;
    data.imageUpdateFlag = true;
    data.imageID = gallery.imageID;
    data.imageIndex = k;
    data.newImage = [];
  }

  fileEvent(e, data, z): void {
    if (!data.imageID) {
      data.newImage[z] = e.target.files[0];
    } else {
      data.newImage[0] = e.target.files[0];
    }
  }

  imageAddUpdate(data: any, i: any): void {
    const myFormData = new FormData();
    myFormData.append('PROC_TYPE', 'add');
    myFormData.append('RoleUID', localStorage.getItem('role_id'));
    myFormData.append('UserUID', localStorage.getItem('user_id'));
    myFormData.append('SearchSectionUID', data.searchSectionUID);
    myFormData.append('searchSectionName', data.Name);
    myFormData.append('Gallery_Image', data.newImage[0]);
    myFormData.append('Gallery_Image1', data.newImage[1]);
    myFormData.append('Gallery_Image2', data.newImage[2]);
    myFormData.append('VehicleUID', this.dynamicImageData.VehicleUID);
    $("#isave_" + i).css("display", "block");
    this.http.post<any>(this.apiURL + '/api/addvehicleimage', myFormData)
      .subscribe(data => {
        if (data.return_code == 0) {
          $("#isave_" + i).css("display", "none");
          data.imageFlag = false;
          this.alertFlag = true;
          this.alertMessage = 'Image Added Successfully !';
          setTimeout(() => {
            this.alertFlag = false;
            this.loadVehicle();
          }, 3000);
        }
      });
  }

  imageEditUpdate(datas: any, i: any): void {
    const myFormData = new FormData();
    myFormData.append('PROC_TYPE', 'update');
    myFormData.append('RoleUID', localStorage.getItem('role_id'));
    myFormData.append('UserUID', localStorage.getItem('user_id'));
    myFormData.append('SearchSectionUID', datas.searchSectionUID);
    myFormData.append('searchSectionName', datas.Name);
    myFormData.append('Gallery_Image', datas.newImage[0]);
    myFormData.append('Gallery_Image1', undefined);
    myFormData.append('Gallery_Image2', undefined);
    myFormData.append('vehicleGalleryUID', datas.imageID);
    myFormData.append('VehicleUID', this.dynamicImageData.VehicleUID);
    $("#isave_" + i).css("display", "block");
    this.http.post<any>(this.apiURL + '/api/addvehicleimage', myFormData)
      .subscribe(data => {
        if (data.return_code == 0) {
          $("#isave_" + i).css("display", "none");
          datas.imageUpdateFlag = false;
          this.alertFlag = true;
          this.alertMessage = 'Image Updated Successfully !';
          setTimeout(() => {
            this.alertFlag = false;
            this.loadVehicle();
          }, 3000);
        }
      });
  }

  imageAddHide(data: any, i: any): void {
    for (var k = this.mainForm.controls['dynamicForm'][i].at(0).controls['images'].at(0).controls['addImage'].length; k >= 1; k--) {
      this.mainForm.controls['dynamicForm'][i].at(0).controls['images'].at(0).controls['addImage'].removeAt(k);
    }
    data.imageFlag = false;
    data.imageUpdateFlag = false;
    data.newImage = [];
  }

  addFileImage(i: any): void {
    if (this.mainForm.controls['dynamicForm'][i].at(0).controls['images'].at(0).controls['addImage'].length < 3) {
      this.mainForm.controls['dynamicForm'][i].at(0).controls['images'].at(0).controls['addImage'].push(this.addFileFormGroup());
    }
  }

  deleteFileImage(data: any, i: any, z: any): void {
    if (this.mainForm.controls['dynamicForm'][i].at(0).controls['images'].at(0).controls['addImage'].length > 1) {
      this.mainForm.controls['dynamicForm'][i].at(0).controls['images'].at(0).controls['addImage'].removeAt(z);
    }
    if (data.newImage[z]) {
      data.newImage.removeAt(z);
    }
  }

  imageFile(data: any, i: any): void {
    data.imageFlag = true;
    data.imageUpdateFlag = false;
    data.newImage = [];
  }

  uploadDocAdd(data: any): void {
    data.dxfSectionInputFlag = true;
    data.dxfbutton = false;
  }
  /*dxfSecfileEvent(event, data) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    this.sizeInMB = (event.target.files[0].size / (1024 * 1024)).toFixed(2);
    if (fileList) {
      if (this.sizeInMB > 1) {
        event.target.value = null;
        data.dxfSectionInputError = true;
      }
      else {
        data.dxfSectionInputError = false;
        data.newDXFdoc = event.target.files[0];
        data.dxfbutton = true;
      }

    }
  }*/

  dxfSecfileEvent(event, data) {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    this.sizeInMB = (event.target.files[0].size / (1024 * 1024)).toFixed(2);

    // Check if a file is selected
    if (fileList && fileList.length > 0) {
      const file = fileList[0];
      const allowedExtensions = ['stl', 'dxf', 'pdf', 'xls', 'svg', 'cdr', 'ai', 'fbx', 'ply', 'amf', '3ds', 'doc'];

      // Extract file extension
      const extension = file.name.split('.').pop()?.toLowerCase();

      // Check if the file extension is allowed
      if (extension && allowedExtensions.includes(extension)) {
        // Check file size
        if (this.sizeInMB > 1) {
          event.target.value = null;
          data.dxfSectionInputError = true;
          data.dxfileTypeError = false
        } else {
          data.dxfSectionInputError = false;
          data.dxfileTypeError = false
          data.newDXFdoc = file;
          data.dxfbutton = true;
        }
      } else {
        // File type not allowed
        event.target.value = null;
        data.dxfSectionInputError = false;
        data.dxfileTypeError = true
        // Optionally, you can provide feedback to the user about the allowed file types
        // alert('Only STL, DXF, PDF, XLS, SVG, CDR, AI, FBX, PLY, AMF, 3DS, DOC files are allowed.');
      }
    }
  }

  docDFXAddHide(data: any): void {
    data.dxfSectionInputFlag = false;
    data.newDXFdoc = null;
    data.dxfSectionInputError = false;
  }

  /*docDFX(datas, i) {
    const myFormData = new FormData();
    myFormData.append('PROC_TYPE', 'add');
    myFormData.append('RoleUID', localStorage.getItem('role_id'));
    myFormData.append('UserUID', localStorage.getItem('user_id'));
    myFormData.append('SearchSectionUID', datas.searchSectionUID);
    myFormData.append('searchSectionName', datas.Name);
    myFormData.append('doc', datas.newDXFdoc);
    myFormData.append('VehicleUID', this.dynamicImageData.VehicleUID);
    $("#isave_" + i).css("display", "block");
    this.http.post<any>(this.apiURL + '/api/uploadsectindocument', myFormData)
      .subscribe(data => {
        if (data.return_code == 0) {
          $("#isave_" + i).css("display", "none");
          datas.dxfSectionInputFlag = false;
          this.alertFlag = true;
          this.alertMessage = 'Document Added Successfully !';
          setTimeout(() => {
            this.alertFlag = false;
            this.loadVehicle();
          }, 3000);
        }
      });
  }*/
  documentUpload(datas, i) {
    // console.log("this is data", datas)
    // console.log("this is i", i)
    const myFormData = new FormData();
    //same parameter
    myFormData.append('PROC_TYPE', 'add');
    myFormData.append('RoleUID', localStorage.getItem('role_id'));
    myFormData.append('UserUID', localStorage.getItem('user_id'));
    myFormData.append('SearchSectionUID', datas.searchSectionUID);
    myFormData.append('searchSectionName', datas.Name);
    myFormData.append('doc', datas.newDXFdoc);
    myFormData.append('VehicleUID', this.dynamicImageData.VehicleUID);
    $("#isave_" + i).css("display", "block");
    this.http.post<any>(this.apiURL + '/api/uploadallsectiondocument', myFormData)
      .subscribe(data => {
        if (data.return_code == 0) {
          $("#isave_" + i).css("display", "none");
          datas.dxfSectionInputFlag = false;
          this.alertFlag = true;
          this.alertMessage = 'Document Added Successfully !';
          setTimeout(() => {
            this.alertFlag = false;
            this.loadVehicle();
          }, 3000);
        }
      });
  }

  warningAdd(data: any): void {
    data.warningFlag = true;
    data.warningUpdateFlag = false;
  }

  warningAddHide(data: any): void {
    data.warningFlag = false;
    data.warningUpdateFlag = false;
  }

  warningAddUpdate(datas: any, i: any): void {
    datas.warningFlag = false;
    this.dynamicWarningData.PROC_TYPE = 'Add';
    this.dynamicWarningData.UserUID = localStorage.getItem('user_id');
    this.dynamicWarningData.SearchSectionUID = datas.searchSectionUID;
    this.dynamicWarningData.WarningText = datas.dynamicWarning;
    $("#isave_" + i).css("display", "block");
    this.http.post<any>(this.apiURL + '/api/addvehiclewarningtext', this.dynamicWarningData)
      .subscribe(data => {
        if (data.return_code == 0) {
          $("#isave_" + i).css("display", "none");
          this.alertFlag = true;
          this.alertMessage = 'Callout Added Successfully !';
          setTimeout(() => {
            this.alertFlag = false;
            this.loadVehicle();
          }, 3000);
        }
      });
    datas.dynamicWarning = '';
  }

  warningEdit(part: any): void {
    part.editFlag = true;
    part.prevMsg = part.partNumber;
  }

  warningEditUpdate(part: any, datas: any, i: any): void {
    part.editFlag = false;
    this.dynamicWarningData.PROC_TYPE = 'Update';
    this.dynamicWarningData.UserUID = localStorage.getItem('user_id');
    this.dynamicWarningData.SearchSectionUID = datas.searchSectionUID;
    this.dynamicWarningData.WarningText = part.partNumber;
    this.dynamicWarningData.vehicleDetailUID = part.partNumber1;
    $("#isave_" + i).css("display", "block");
    this.http.post<any>(this.apiURL + '/api/addvehiclewarningtext', this.dynamicWarningData)
      .subscribe(data => {
        if (data.return_code == 0) {
          $("#isave_" + i).css("display", "none");
          this.alertFlag = true;
          this.alertMessage = 'Callout Updated Successfully !';
          setTimeout(() => {
            this.alertFlag = false;
          }, 3000);
        }
      });
  }

  warningEditHide(part: any): void {
    part.editFlag = false;
    part.partNumber = part.prevMsg;
  }

  noteEdit(notes: any): void {
    notes.editFlag = true;
    notes.prevMsg = notes.title;
  }

  noteEditUpdate(notes: any, datas: any, i: any): void {
    notes.editFlag = false;
    this.dynamicNoteData.PROC_TYPE = 'Update';
    this.dynamicNoteData.RoleUID = localStorage.getItem('role_id');
    this.dynamicNoteData.UserUID = localStorage.getItem('user_id');
    this.dynamicNoteData.SearchSectionUID = datas.searchSectionUID;
    this.dynamicNoteData.searchSectionName = datas.Name;
    this.dynamicNoteData.Gallery_Notes = notes.title;
    this.dynamicNoteData.vehicleGalleryUID = notes.titleID;
    $("#isave_" + i).css("display", "block");
    this.http.post<any>(this.apiURL + '/api/addvehiclenote', this.dynamicNoteData)
      .subscribe(data => {
        if (data.return_code == 0) {
          $("#isave_" + i).css("display", "none");
          this.alertFlag = true;
          this.alertMessage = 'Notes Updated Successfully !';
          setTimeout(() => {
            this.alertFlag = false;
          }, 3000);
        }
      });
  }

  noteEditHide(notes: any): void {
    notes.editFlag = false;
    notes.title = notes.prevMsg;
  }

  noteAdd(data: any): void {
    data.addFlag = true;
  }

  noteAddHide(data: any): void {
    data.addFlag = false;
    data.dynamicNote = '';
  }

  noteAddUpdate(datas: any, i: any): void {
    console.log(datas);
    datas.addFlag = false;
    this.dynamicNoteData.RoleUID = localStorage.getItem('role_id');
    let roleName = '';
    switch (this.dynamicNoteData.RoleUID) {
      case '1':
        roleName = 'Super Admin';
        break;
      case '2':
        roleName = 'Admin';
        break;
      case '3':
        roleName = 'Editor';
        break;
      case '4':
        roleName = 'Distributor';
        break;
      case '5':
        roleName = 'Company';
        break;
      case '6':
        roleName = 'Store Admin';
        break;
      case '7':
        roleName = 'Store User';
        break;
      default:
        roleName = '';
        break;
    }
    this.dynamicNoteData.PROC_TYPE = 'Add';
    this.dynamicNoteData.UserUID = localStorage.getItem('user_id');
    this.dynamicNoteData.SearchSectionUID = datas.searchSectionUID;
    this.dynamicNoteData.searchSectionName = datas.Name;
    this.dynamicNoteData.Gallery_Notes = datas.dynamicNote;
    this.dynamicNoteData.vehicleGalleryUID = null;
    $("#isave_" + i).css("display", "block");
    this.http.post<any>(this.apiURL + '/api/addvehiclenote', this.dynamicNoteData)
      .subscribe(data => {
        if (data.return_code == 0) {
          $("#isave_" + i).css("display", "none");
          datas.searchSectionNotes.push({ 'title header': roleName, 'title': this.dynamicNoteData.Gallery_Notes, "titleID": data.galleryDetails[0].vehicleGalleryUID });
          this.alertFlag = true;
          this.alertMessage = 'Notes Added Successfully !';
          setTimeout(() => {
            this.alertFlag = false;
            this.loadVehicle();
          }, 3000);
        }
      });
    datas.dynamicNote = '';
  }

  getbanners(): void {
    this.http.get<any>(this.apiURL + '/api/getrightbanners', {})
      .subscribe(data => {
        if (data.return_code == 0) {
          this.rightbannerImage = (data as any).rightBanners;
          let jsonString = '['
          for (let i = 0; i < data.rightBanners.length; i++) {
            let temp = this.imgURL + 'storage/' + data.rightBanners[i].imagePath;
            // console.log(temp);
            jsonString += '{"imagePath": "' + temp + '","bannerURL":"' + data.rightBanners[i].bannerURL + '"}';
            // console.log(jsonString);
            if (i !== (data.rightBanners.length - 1)) {
              jsonString += ',';
            }
          }
          jsonString += ']';
          this.rightbannerImage = JSON.parse(jsonString);
          // console.log(this.rightbannerImage);
          /* this.bannerImage = this.imgURL + temp;
          console.log(this.bannerImage); */
        }
      })
  }
  scroll() {

    if (window.innerWidth <= 770) {
      document.querySelector('#target_responsive_top').scrollIntoView({ behavior: 'smooth', block: 'center' });
      $("#responsive_scrolltop").show();
      $("#scroll_top").hide();
    } else {
      document.querySelector('#target').scrollIntoView({ behavior: 'smooth', block: 'center' });
      $("#responsive_scrolltop").hide();
      $("#scroll_top").show();
    }
  }
  loadVehicle() {
    /* for (let a = 0; a < 0; a++) { */
    //this.addImages();
    /* } */
    // $("#accordionExample").hide();
    // $(".accordion-item").hide();
    // $(".accordion-body").hide();
    $("#search_results").hide();
    $("#edit_vehicle").hide();
    $("#resultbtn").hide();
    //$("#banners").show();
    this.info = false;
    $('#loader').show();
    this.http.post<any>(this.apiURL + '/api/getvehiclesearchdetails', this.vehicleData)
      .subscribe(data => {
        console.log("result", data);
        $('#loader').hide();
        if (data.return_code == 0 && (data.searchSectionDetailsArray.length !== 0 && data.displaySectionNameList.length !== 0)) {
          // console.log('Vehicle UID :' + data.vehicleUID);
          this.feedback.vehicleUID = data.vehicleUID;
          this.fromTo = data.fromto;
          $("#feedback_section").show();
          $("#feed").show();
          $("#edit_vehicle").show();
          this.isShow = true;
          this.scroll()
          // $("#accordionExample").show();
          // $(".accordion-item").show();
          // $(".accordion-body").show();
          if (window.innerWidth <= 770) {
            $("#responsive_scrolltop").show();
            $("#scroll_top").hide();
          } else {
            $("#responsive_scrolltop").hide();
            $("#scroll_top").show();
          }

          this.dynamicNoteData.VehicleUID = data.vehicleUID;
          this.dynamicImageData.VehicleUID = data.vehicleUID;
          this.dynamicWarningData.VehicleUID = data.vehicleUID;
          this.rightBanners = data.rightBanners;
          // console.log("rightBannner", data.rightBanners);
          // console.log("BannerURL: ",data.rightBanners[0].bannerURL);
          this.searchSectionStatus = data.searchSectionStatus;
          this.searchSectionMessage = data.searchSectionMessage;
          this.AllSectionListDetailsArray = (data as any).searchSectionDetailsArray;
          this.displaySectionNameList = (data as any).displaySectionNameList;
          for (var i = 0; i <= this.AllSectionListDetailsArray.length; i++) {
            this.mainForm.controls['dynamicForm'][i] = [];
            this.mainForm.controls['dynamicForm'][i].push(this.addMainFormGroup());
            this.mainForm.controls['dynamicForm'][i].at(0).controls['images'].push(this.addImageFormGroup());
            this.mainForm.controls['dynamicForm'][i].at(0).controls['images'].at(0).controls['addImage'].push(this.addFileFormGroup());
          }
          for (var key in this.AllSectionListDetailsArray) {
            if (this.AllSectionListDetailsArray[key].searchSectionUID == '26') {
              if (this.AllSectionListDetailsArray[key].searchSectionPartDeatails.length > 0) {
                this.bmwFlagArray = true;
              }
              else {
                this.bmwFlagArray = false;
              }
            }
          }

          /* let bmwsectionindex = -1;
          const bmwsection = this.AllSectionListDetailsArray.find( (obj, index) => {
            if(obj.searchSectionUID == '26'){
              bmwsectionindex = index;
              return obj;
            }
          })
          if(bmwsection){
            if (bmwsection.searchSectionPartDeatails.length == 0 ){
              bmwsection.searchSectionPartDeatails.slice(bmwsection);
              console.log(bmwsection.searchSectionPartDeatails.slice(bmwsection));
            }
          } */
          // console.log(this.AllSectionListDetailsArray);
          // console.log(this.displaySectionNameList);
          for (var key in this.AllSectionListDetailsArray) {
            if (this.AllSectionListDetailsArray[key].searchSectionPartDeatails.length > 0) {
              // console.log(this.AllSectionListDetailsArray[key].searchSectionPartDeatails);
              for (var part in this.AllSectionListDetailsArray[key].searchSectionPartDeatails) {
                if (this.AllSectionListDetailsArray[key].searchSectionPartDeatails[part].picture != null)
                  if (this.AllSectionListDetailsArray[key].searchSectionPartDeatails[part].picture != '') {
                    var sanitizedUrl = this.blobURL.concat(this.AllSectionListDetailsArray[key].searchSectionPartDeatails[part].picture.toString());
                    this.AllSectionListDetailsArray[key].searchSectionPartDeatails[part].background_image = this.sanitizer.bypassSecurityTrustStyle("'background-image': 'url(" + sanitizedUrl + ")'");
                    //  console.log(this.AllSectionListDetailsArray[key].searchSectionPartDeatails[part].picture);
                  }
              }
            }
          }
          //this.loadBanners();
          this.loadContent(this.searchSectionStatus, this.searchSectionMessage);
          this.searchText = this.vehicleData.year + " " + this.vehicleData.make + " " + this.vehicleData.model + " " + this.vehicleData.option1 + " " + this.vehicleData.option2 + " " + this.vehicleData.option3 + " " + this.vehicleData.option4 + " " + this.vehicleData.option5 + " " + this.vehicleData.option6;
          if (Math.max(window.screen.width, window.innerWidth) < 600) {
            updatePageTitle(this.searchText);
          } else {
            updatePageTitle('Search Vehicle | ' + this.searchText);
          }

          setTimeout(() => {
            for (var key in this.AllSectionListDetailsArray) {
              if (this.AllSectionListDetailsArray[key].searchSectionPartDeatails.length < 1 && this.AllSectionListDetailsArray[key].searchSectionGallery.length < 1 && this.AllSectionListDetailsArray[key].searchSectionNotes.length < 1) {
                if (this.AllSectionListDetailsArray[key].searchSectionDocument.length < 1) {
                  if ((this.AllSectionListDetailsArray[key].searchSectionName == 'ReplaceHeadUnit' || this.AllSectionListDetailsArray[key].searchSectionName == 'FirstechRemoteStart') && this.AllSectionListDetailsArray[key].searchSubSectionPartDeatails.length > 0) {
                    // do nothing
                  } else {
                    document.getElementById('sec_' + key).click();
                  }
                }

              }
            }
          }, 1000);
        } else if (data.return_code == 1) {

          $('#limitmodel').css('display', 'block');

        }
        else {
          this.info = true;

          this.failureMessage = 'No Data Available';
          this.searchText = this.vehicleData.year + " " + this.vehicleData.make + " " + this.vehicleData.model + " " + this.vehicleData.option1 + " " + this.vehicleData.option2 + " " + this.vehicleData.option3 + " " + this.vehicleData.option4 + " " + this.vehicleData.option5 + " " + this.vehicleData.option6;
          //displaySearchText(this.searchText);
          if (Math.max(window.screen.width, window.innerWidth) < 600) {
            updatePageTitle('');
          } else {
            updatePageTitle('Search Vehicle');
          }
        }
      });
  }

  /*  loadBanners(): void {
     let jsonString = '['
     for (let i = 0; i < this.rightBanners.length; i++) {
       let temp = this.rightBanners[i].imagePath;
       temp = temp.replace(/\\/g, '');
       jsonString += '{"imagePath":"' + temp + '","bannerURL":"' + this.rightBanners[i].bannerURL +'"}';
       if (i !== (this.rightBanners.length - 1))
       {
         jsonString += ',';
       }
     }
     jsonString += ']';
     this.processedBanners = JSON.parse(jsonString);
   } */

  loadContent(status, msg) {
    if (status == 1) {
      this.info = true;
      this.failureMessage = msg;
      return;
    }
    $("#search_results").show();
    $("#resultbtn").show();
    //$("#banners").show();
    $(".resultbtnlist").css("visibility", "visible");
    $(".btnall").removeClass("active");
    $(".mainbtnall").addClass("active");

    this.loadGallery();
  }

  loadGallery(): void {
    setTimeout(() => {
      imageGallery();
    }, 3000);
    setTimeout(() => {
      sectionimageGallery();
    }, 3000);
  }

  lightboxopen(id): void {
    lboxo(id);
  }

  lightboxclose(id): void {
    lboxc(id);
  }

  filterSelection(c: any, btn: any): void {
    $(".mainbtnall").removeClass("active");
    $(".btnall").removeClass("active");
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
      RemoveClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
    }

    $("." + c + "").css("display", "block");
    $("#" + btn + "").addClass("active");
  }

  loadAllDetailsAgain(): void {
    $(".btnall").removeClass("active");
    this.loadContent(this.searchSectionStatus, this.searchSectionMessage);
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    for (i = 0; i < x.length; i++) {

      AddClass(x[i], "show");
      $(x[i]).show();
    }
  }

  forPrint(blockid: any): void {
    processPrint(blockid);
  }

  loadDXFFilesLink(exactfilename: any, placename: any): void { }

  cancel(): void {
    $('#adModal').css('display', 'none');
    $('#limitmodel').css('display', 'none');
  }

  customScrollTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  ngOnDestroy(): void {
    this.PostService.carImage = this.imgURL.substring(0, this.imgURL.length - this.imgPathLength) + 'cover-sidebar-user.36299bfce3987306f32d.jpg';
  }

}
