import { Component, OnInit, NgZone, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
declare var $: any;
declare var webGlObject: any;
declare var updatePageTitle: any;
import { environment } from 'src/environments/environment';
import { PostService } from '../post.service';
declare var hideSearchText: any;
declare var postCrossDomainLogoutMessage: any;
declare var handleScrollToTopButton: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('sidebarMainMenu') sidebarMainMenu: ElementRef;
  apiURL: any;
  menuFlag: boolean;
  displayFlag: boolean;
  public name: any;
  public roleUID: any;
  public distributorName: any;
  public companyName: any;
  public storeName: any;
  public storeBranchName: any;
  public userUID: any;
  mobileMenuFlag: boolean;
  public interval;
  public refreshTimeLeft;
  public timeLeft;
  public logout = {
    userUID: null,
  }
  roleName:any
  menuData: any;
  processedMenu: any;
  subsectionmenu : any;
  submenu: [];
  title: any;
  ssoFlag: any;
  copyrightHeader: any;
  copyrightDetail: any;
  pageReloaded: any;
  urllink: any;
  testFlag: boolean;
  //svgIcons: any;
  year = new Date().getFullYear();
  svg:SafeHtml;
  imgURL: any;
  companyprofileImage: any;
  //profImageFlag: boolean;


  constructor(private http: HttpClient, private router: Router, public PostService: PostService, private sanitizer: DomSanitizer, private ngZone: NgZone) {
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
  }

  ngOnInit(): void {
    this.roleName = localStorage.getItem('roleName')
    /* this.svgIcons = [{"<svg viewBox='0 0 76 76' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' baseProfile='full' enable-background='new 0 0 76.00 76.00' xml:space='preserve' fill='#000000'><g id='SVGRepo_bgCarrier' stroke-width='0'></g><g id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round'></g><g id='SVGRepo_iconCarrier'> <path fill='#6f7283' fill-opacity='1' stroke-width='0.2' stroke-linejoin='round' d='M 19,29L 47,29L 47,57L 19,57L 19,29 Z M 43,33L 23,33.0001L 23,53L 43,53L 43,33 Z M 39,41L 39,45L 35,45L 35,49L 31,49L 31,45L 27,45L 27,41L 31,41L 31,37L 35,37L 35,41L 39,41 Z M 24,24L 51.9999,24.0001L 51.9999,52L 48.9999,52.0001L 48.9999,27.0001L 24,27.0001L 24,24 Z M 53.9999,47L 53.9999,22.0001L 29,22L 29,19L 56.9999,19.0001L 57,47L 53.9999,47 Z '></path> </g>
                      </svg>"}]; */
    //console.log(this.svgIcons);
   /*  if (data.companyDetails[0].companyImage != null && data.companyDetails[0].companyImage != '')
    {
      
    }
    else{
      
    } */
    //this.profImageFlag = false;
    updatePageTitle();
    this.testFlag = false;
    this.displayFlag = false;
    this.roleUID = localStorage.getItem('role_id');
    this.userUID = localStorage.getItem('user_id');
    this.name = localStorage.getItem('name');
    this.logout.userUID = localStorage.getItem('user_id');
    this.menuData = localStorage.getItem('menu_data');
    this.menuData = this.menuData.replace(/\\/g, '');
    this.menuData = this.menuData.substring(16, (this.menuData.length - 3));
    this.menuData = '[' + this.menuData + ']';
    console.log(this.menuData);
    this.processedMenu = JSON.parse(this.menuData);
    //this.prevImage = localStorage.getItem('companyLogo');
    this.companyprofileImage = localStorage.getItem('profileImage');
    let result = this.companyprofileImage.substring(this.companyprofileImage.lastIndexOf("/") + 1, this.companyprofileImage.length);
    if (result == 'null') {
      this.companyprofileImage = null;
    } 
   /*  else{
      return '<img src="assets/images/users/avatar-1.jpg">';
      console.log(this.companyprofileImage);
    } */
   /*  this.companyprofileImage.lastIndexOf('/') ? this.companyprofileImage.lastIndexOf('/null') :  this.companyprofileImage.lastIndexOf('/profileImage'); */
    //console.log(this.companyprofileImage);
    /****  Menu Icon Works Start  ****/
    //this.submenu = this.menuData.subMenu;
    //console.log(this.menuData.subMenu[0]);
    /****  Menu Icon Works Start  ****/

    
    /* this.http.get<any>(this.apiURL + '/api/getallcommoncontent')
        .subscribe(data => {
        this.title = data.contentDetails[1].TextData;
        this.copyrightHeader = data.contentDetails[2].TextData;
        this.copyrightDetail = data.contentDetails[3].TextData;
    });
     handleScrollToTopButton();
    if (localStorage.getItem("token") !== null) {
      this.ssoFlag = true;
    }
    this.timeLeft = 43200;
    this.refreshTimeLeft = 590;
    this.distributorName=localStorage.getItem('distributorName');
    this.companyName=localStorage.getItem('companyName');
    this.storeName=localStorage.getItem('storeName');
    this.storeBranchName=localStorage.getItem('branchName');
    this.name = localStorage.getItem('name');
    this.roleUID = localStorage.getItem('role_id');
    this.userUID = localStorage.getItem('user_id');
    this.logout.userUID = localStorage.getItem('user_id');
    this.menuData = localStorage.getItem('menu_data');
    this.menuData = this.menuData.replace(/\\/g, '');
    this.menuData = this.menuData.substring(16, (this.menuData.length - 3));
    this.menuData = '[' + this.menuData + ']';
    console.log(this.menuData);
    this.processedMenu = JSON.parse(this.menuData);
    this.http.get<any>(this.apiURL + '/api/getallcommoncontent')
        .subscribe(data => {
        this.title = data.contentDetails[1].TextData;
        this.copyrightHeader = data.contentDetails[2].TextData;
        this.copyrightDetail = data.contentDetails[3].TextData;
    }); */


  }

//Announcements in Search page



  /* logout(): void {
    this.router.navigate(['login']);
  } */

  Logout(): void {
    //if (this.ssoFlag != true) {
      localStorage.removeItem('userName');
      localStorage.removeItem('user_id');
      localStorage.removeItem('name');
      localStorage.removeItem('role_id');
      localStorage.removeItem('menu_data');
      localStorage.removeItem('login_time');
      localStorage.removeItem('distributorName');
      localStorage.removeItem('companyName');
      localStorage.removeItem('storeName');
      localStorage.removeItem('branchName');
      localStorage.removeItem('maintenance_message');
      localStorage.removeItem('userNameId');
      localStorage.removeItem('userSSOName');
      localStorage.removeItem('email');
      localStorage.removeItem('reference_url');
      localStorage.removeItem('token');
      localStorage.removeItem("logoutFromVehicle");
      localStorage.removeItem("messageFromVehicle");
      localStorage.removeItem("dataFromVehicle");
      localStorage.removeItem("isBannerAds");
      localStorage.removeItem("prevImage");
      sessionStorage.clear();
      this.http.post<any>(this.apiURL + '/api/logout', this.logout)
        .subscribe(data => {
          this.router.navigate(['login']);
        });
    //}
    /*let data = {
      "id": localStorage.getItem('userNameId'),
      "reference_url": localStorage.getItem('reference_url')
    };
    const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
    this.http.post<any>('https://uatlogin.the12vdashboard.com/Master/public/api/logoutsso', data, { 'headers': headers })
      .subscribe(data => {
        if (data.message == 'Logout Success') {
          localStorage.removeItem('userName');
          localStorage.removeItem('user_id');
          localStorage.removeItem('name');
          localStorage.removeItem('role_id');
          localStorage.removeItem('menu_data');
          localStorage.removeItem('login_time');
          localStorage.removeItem('distributorName');
          localStorage.removeItem('companyName');
          localStorage.removeItem('storeName');
          localStorage.removeItem('branchName');
          localStorage.removeItem('maintenance_message');
          localStorage.removeItem('userNameId');
          localStorage.removeItem('userSSOName');
          localStorage.removeItem('email');
          localStorage.removeItem('reference_url');
          localStorage.removeItem('token');
          localStorage.removeItem("logoutFromVehicle");
          this.http.post<any>(this.apiURL + '/api/logout', this.logout)
            .subscribe(data => {
              postCrossDomainLogoutMessage();
              this.router.navigate(['loginsso']);
            });
        }
      });*/

  }

  ngAfterViewInit(): void {
    $('#menu').css('display', 'none');
    /*var myuser=localStorage.getItem('user_id');
    if(!myuser){
      this.router.navigate(['login']);
    }*/
    this.interval = setInterval(() => {
      if (this.timeLeft == 0) {
        this.timeLeft = 43200;
        this.http.post<any>(this.apiURL + '/api/logout', this.logout)
          .subscribe(data => {
            clearInterval(this.interval);
            localStorage.removeItem('userName');
            localStorage.removeItem('user_id');
            localStorage.removeItem('name');
            localStorage.removeItem('role_id');
            localStorage.removeItem('menu_data');
            localStorage.removeItem('login_time');
            localStorage.removeItem('distributorName');
            localStorage.removeItem('companyName');
            localStorage.removeItem('storeName');
            localStorage.removeItem('branchName');
            localStorage.removeItem('maintenance_message');
            localStorage.removeItem('profileImage');
            this.router.navigate(['login']);
          });
      } else {
        this.timeLeft--;
      }
      if (localStorage.getItem("logoutFromVehicle") !== null) {
        clearInterval(this.interval);
        localStorage.removeItem('userName');
        localStorage.removeItem('user_id');
        localStorage.removeItem('name');
        localStorage.removeItem('role_id');
        localStorage.removeItem('menu_data');
        localStorage.removeItem('login_time');
        localStorage.removeItem('distributorName');
        localStorage.removeItem('companyName');
        localStorage.removeItem('storeName');
        localStorage.removeItem('branchName');
        localStorage.removeItem('maintenance_message');
        localStorage.removeItem('userNameId');
        localStorage.removeItem('userSSOName');
        localStorage.removeItem('email');
        localStorage.removeItem('reference_url');
        localStorage.removeItem('token');
        localStorage.removeItem("logoutFromVehicle");
        this.http.post<any>(this.apiURL + '/api/logout', this.logout)
          .subscribe(data => {
            if (this.ssoFlag == true) {
              this.router.navigate(['loginsso']);
            } else {
              this.router.navigate(['login']);
            }
          });
      }
      if ((window.location.href.substring(window.location.href.lastIndexOf('/') + 1) == 'search' || window.location.href.substring(window.location.href.lastIndexOf('/') + 1) == 'dashboard' || window.location.href.substring(window.location.href.lastIndexOf('/') + 1) == 'memberbenefits' || window.location.href.substring(window.location.href.lastIndexOf('/') + 1) == 'termsofuse' || window.location.href.substring(window.location.href.lastIndexOf('/') + 1) == 'register' ) && window.screen.width > 1023) {
        $('.sidebar-main-menu').hide();
        document.body.setAttribute('data-sidebar-size','condensed');
        this.displayFlag = true;
      } else if (this.displayFlag == true) {
        $('.sidebar-main-menu').show();
        document.body.setAttribute('data-sidebar-size','default');
        this.displayFlag = false;
      }
    }, 1000);
    setTimeout(function () {
      webGlObject.init();     
      $('[data-toggle="tooltip"]').tooltip();
      $('.button-menu-mobile').trigger('click');
      var url = window.location.href;
      var link = url.split('/#/home');
      this.urllink = link[1];
      console.log(this.urllink);
      let x = window.location.href.lastIndexOf('/');
      let str = window.location.href.substring(x + 1);
      switch (str) {
        case 'sectionmaster':
        case 'vehiclemaster':
        case 'brandmaster':
        case 'partmaster':
        case 'addvehicledetails':
        case 'addcalloutdetails':
        case 'addvehiclenonpart':
        case 'vehiclegallery':
        case 'vehiclenonpart':
        case 'vehicleadditional':
        case 'find-replace':
        case 'partcalloutconversion':
        case 'managecallout':  
        case 'managebundlepart':
        case 'igninterlockguide':
        case 'addvehiclemapping':
        case 'addinterlockguide':
        case 'vehicle-mapping':
        case 'addvehiclegallery':
        case 'lighting-guide':
        /* case 'viewcallout':
        case 'viewpart':
        case 'viewvehicle': */
          {
            $('[data-e2e="master"]').addClass("style-module-menuItem__button_active-Srrb");
            $('#menu').css('display', 'block');
            $('[data-e2e="MasterMenu"]').show();
            $('[data-e2e="AdminTools"]').hide();
            $('[data-e2e="SettingsMenu"]').hide();
            break;
          }
        case 'userlog':
        case 'searchlog':
        case 'feedbacklog':
        case 'top10vehicles':
        case 'globalAnnouncement':
        case 'companyAnnouncement':
        case 'storeAnnouncement':
          {
            $('[data-e2e="Admin"]').addClass("style-module-menuItem__button_active-Srrb");
            $('#menu').css('display', 'block');
            $('[data-e2e="MasterMenu"]').hide();
            $('[data-e2e="AdminTools"]').show();
            $('[data-e2e="SettingsMenu"]').hide();
            break;
          }
        case 'managecontent':
        case 'managerole':
        case 'managemenu':
        case 'managebanners':
        case 'managedistributor':
        case 'managecompany':
        case 'managestores':
        case 'globaluser':
        case 'adduser':
        case 'addedituser':
        case 'userrolesectionedit':
        case 'userrolebrandedit':
        case 'userrolemenuedit':
          /* case 'viewstore':*/
          {
            $('[data-e2e="settings"]').addClass("style-module-menuItem__button_active-Srrb");
            $('#menu').css('display', 'block');
            $('[data-e2e="MasterMenu"]').hide();
            $('[data-e2e="AdminTools"]').hide();
            $('[data-e2e="SettingsMenu"]').show();            
            break;
          }
        default: {
          $('[data-e2e="MasterMenu"]').hide();
          $('[data-e2e="AdminTools"]').hide();
          $('[data-e2e="SettingsMenu"]').hide();
          break;
        }
      }
      $('[data-e2e="dashboard"]').click(function () {
        if (document.body.getAttribute('data-sidebar-size') !== 'condensed') {
          $('.button-menu-mobile').trigger('click');
        }
        $(".left-side-menu").find('.style-module-menuItem__button_active-Srrb').removeClass("style-module-menuItem__button_active-Srrb");
        $('[data-e2e="dashboard"]').addClass("style-module-menuItem__button_active-Srrb");
        $('#menu').css('display', 'none');
        $('[data-e2e="MasterMenu"]').hide();
        $('[data-e2e="AdminTools"]').hide();
        $('[data-e2e="SettingsMenu"]').hide();
        $('[data-toggle="tooltip"]').tooltip('hide');
        $(".sidebar-main-menu").addClass("fullscreen-sidebar");
        $(".left-side-menu").addClass("fullscreen-left-side-menu");
        $(".content-page").addClass("fullscreen-content-page");
        $(".footer").addClass("fullscreen-footer");
        $(".logo-box").addClass("fullscreen-left-side-menu");
        $(".logo").addClass("fullscreen-sidebar");
        if (window.screen.width > 990) {
          $(".title_top").css("margin-left","10px");
        }
        // });
      });
      $('[data-e2e="search"]').click(function () {
        if (document.body.getAttribute('data-sidebar-size') !== 'condensed') {
          $('.button-menu-mobile').trigger('click');
        }
        $(".left-side-menu").find('.style-module-menuItem__button_active-Srrb').removeClass("style-module-menuItem__button_active-Srrb");
        $('[data-e2e="search"]').addClass("style-module-menuItem__button_active-Srrb");
        $('#menu').css('display', 'none');
        $('[data-e2e="MasterMenu"]').hide();
        $('[data-e2e="AdminTools"]').hide();
        $('[data-e2e="SettingsMenu"]').hide();
        $('[data-toggle="tooltip"]').tooltip('hide');
        $(".sidebar-main-menu").addClass("fullscreen-sidebar");
        $(".left-side-menu").addClass("fullscreen-left-side-menu");
        $(".content-page").addClass("fullscreen-content-page");
        $(".footer").addClass("fullscreen-footer");
        $(".logo-box").addClass("fullscreen-left-side-menu");
        $(".logo").addClass("fullscreen-sidebar");
        if (window.screen.width > 990) {
          $(".title_top").css("margin-left","10px");
        }
        // });
      });

      $('[data-e2e="master"]').click(function () {
        if (document.body.getAttribute('data-sidebar-size') === 'condensed') {
          $('.button-menu-mobile').trigger('click');
        }
        $(".left-side-menu").find('.style-module-menuItem__button_active-Srrb').removeClass("style-module-menuItem__button_active-Srrb");
        $('[data-e2e="master"]').addClass("style-module-menuItem__button_active-Srrb");
        $('#menu').css('display', 'block');
        $('[data-e2e="MasterMenu"]').show();
        $('[data-e2e="AdminTools"]').hide();
        $('[data-e2e="SettingsMenu"]').hide();
        $('[data-toggle="tooltip"]').tooltip('hide');
        $(".sidebar-main-menu").removeClass("fullscreen-sidebar");
        $(".left-side-menu").removeClass("fullscreen-left-side-menu");
        $(".content-page").removeClass("fullscreen-content-page");
        $(".footer").removeClass("fullscreen-footer");
        $(".logo-box").removeClass("fullscreen-left-side-menu");
        $(".logo").removeClass("fullscreen-sidebar");
        if (window.screen.width > 990) {
          $(".title_top").css("margin-left","0px");
        }
        // });
      });
      $('[data-e2e="Admin"]').click(function () {
        if (document.body.getAttribute('data-sidebar-size') === 'condensed') {
          $('.button-menu-mobile').trigger('click');
        }
        $(".left-side-menu").find('.style-module-menuItem__button_active-Srrb').removeClass("style-module-menuItem__button_active-Srrb");
        $('[data-e2e="Admin"]').addClass("style-module-menuItem__button_active-Srrb");
        $('#menu').css('display', 'block');
        $('[data-e2e="AdminTools"]').show();
        $('[data-e2e="MasterMenu"]').hide();
        $('[data-e2e="SettingsMenu"]').hide();
        $('[data-toggle="tooltip"]').tooltip('hide');
        $(".sidebar-main-menu").removeClass("fullscreen-sidebar");
        $(".left-side-menu").removeClass("fullscreen-left-side-menu");
        $(".content-page").removeClass("fullscreen-content-page");
        $(".footer").removeClass("fullscreen-footer");
        $(".logo-box").removeClass("fullscreen-left-side-menu");
        $(".logo").removeClass("fullscreen-sidebar");
        if (window.screen.width > 990) {
          $(".title_top").css("margin-left","0px");
        }
        // });
      });
      $('[data-e2e="links"]').click(function () {
        if (document.body.getAttribute('data-sidebar-size') !== 'condensed') {
          $('.button-menu-mobile').trigger('click');
        }
        $(".left-side-menu").find('.style-module-menuItem__button_active-Srrb').removeClass("style-module-menuItem__button_active-Srrb");
        $('[data-e2e="links"]').addClass("style-module-menuItem__button_active-Srrb");
        $('#menu').css('display', 'none');
        $('[data-e2e="MasterMenu"]').hide();
        $('[data-e2e="AdminTools"]').hide();
        $('[data-e2e="SettingsMenu"]').hide();
        $('[data-toggle="tooltip"]').tooltip('hide');
        $(".sidebar-main-menu").addClass("fullscreen-sidebar");
        $(".left-side-menu").addClass("fullscreen-left-side-menu");
        $(".content-page").addClass("fullscreen-content-page");
        $(".footer").addClass("fullscreen-footer");
        $(".logo-box").addClass("fullscreen-left-side-menu");
        $(".logo").addClass("fullscreen-sidebar");
        if (window.screen.width > 990) {
          $(".title_top").css("margin-left","10px");
        }
        // });
      });
      $('[data-e2e="terms"]').click(function () {
        if (document.body.getAttribute('data-sidebar-size') !== 'condensed') {
          $('.button-menu-mobile').trigger('click');
        }
        $(".left-side-menu").find('.style-module-menuItem__button_active-Srrb').removeClass("style-module-menuItem__button_active-Srrb");
        $('[data-e2e="terms"]').addClass("style-module-menuItem__button_active-Srrb");
        $('#menu').css('display', 'none');
        $('[data-e2e="MasterMenu"]').hide();
        $('[data-e2e="AdminTools"]').hide();
        $('[data-e2e="SettingsMenu"]').hide();
        $('[data-toggle="tooltip"]').tooltip('hide');
        $(".sidebar-main-menu").addClass("fullscreen-sidebar");
        $(".left-side-menu").addClass("fullscreen-left-side-menu");
        $(".content-page").addClass("fullscreen-content-page");
        $(".footer").addClass("fullscreen-footer");
        $(".logo-box").addClass("fullscreen-left-side-menu");
        $(".logo").addClass("fullscreen-sidebar");
        if (window.screen.width > 990) {
          $(".title_top").css("margin-left","10px");
        }
        // });
      });
      $('[data-e2e="settings"]').click(function () {
        if (document.body.getAttribute('data-sidebar-size') === 'condensed') {
          $('.button-menu-mobile').trigger('click');
        }
        $(".left-side-menu").find('.style-module-menuItem__button_active-Srrb').removeClass("style-module-menuItem__button_active-Srrb");
        $('[data-e2e="settings"]').addClass("style-module-menuItem__button_active-Srrb");
        $('#menu').css('display', 'block');
        $('[data-e2e="SettingsMenu"]').show();
        $('[data-e2e="MasterMenu"]').hide();
        $('[data-e2e="AdminTools"]').hide();
        $('[data-toggle="tooltip"]').tooltip('hide');
        $(".sidebar-main-menu").removeClass("fullscreen-sidebar");
        $(".left-side-menu").removeClass("fullscreen-left-side-menu");
        $(".content-page").removeClass("fullscreen-content-page");
        $(".footer").removeClass("fullscreen-footer");
        $(".logo-box").removeClass("fullscreen-left-side-menu");
        $(".logo").removeClass("fullscreen-sidebar");
        if (window.screen.width > 990) {
          $(".title_top").css("margin-left","0px");
        }
      });
      $('[data-trigger="navbar_main"]').click(function(){
        $('#navbar_main').addClass('show');
      });
      $('.btn-close').click(function(){
        $('#navbar_main').removeClass('show');
      });
      $('a.nav-link').click(function(event){
        if(event.target.innerText == "Masters" || event.target.innerText == "Admin Tools" || event.target.innerText == "Configure")
        {          
          $('#navbar_main').addClass('show');
        } else {
          $('#navbar_main').removeClass('show');
        }
      });
      $('a.dropdown-item').click(function(){
        $('#navbar_main').removeClass('show');
      });
    }, 1000);
  }

}