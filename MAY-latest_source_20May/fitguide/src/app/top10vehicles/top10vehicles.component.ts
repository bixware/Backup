import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ChartComponent, ApexAxisChartSeries, ApexChart, ApexResponsive } from 'ng-apexcharts';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare var $: any;

declare var hideSearchText: any;
declare var updatePageTitle: any;
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};
declare var dateInitialize: any;
declare var from_date: any;
declare var to_date: any;

@Component({
  selector: 'app-top10vehicles',
  templateUrl: './top10vehicles.component.html',
  styleUrls: ['./top10vehicles.component.css']
})
export class Top10vehiclesComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<any>;
  apiURL: any;
  public users = {
    userUID: null,
    roleUID: null,
    loginuserid: null
  };
  public topvehicles = {
    PROC_TYPE: '',
    DistributorUID: "",
    CompanyUID: null,
    StoreUID: null,
    Region: null,
    from_date: "",
    to_date: "",
    userid: "",
    loginuserid: null
  };
  series: any;
  labels: any;
  err_message: any;
  success_message: any;
  apiFlag: any;
  apiFlag1: any;
  storUserList: any;
  distributors: any;
  public storeUser = {
    distributorUID: null,
    loginuserid: null
  };
  public distID = {
    PROC_TYPE: '',
    loginuserid: null
  };
  public distributorUser = {
    DistributorUID: null,
    PROC_TYPE: '',
    loginuserid: null
  };
  public compId = {
    userUID: "",
    DistributorUID: null,
    loginuserid: null
  };
  public compbystoreId = {
    DistributorUID: null,
    CompanyUID: null,
    PROC_TYPE: '',
    loginuserid: null
  };
  public userbycomp = {
    DistributorUID: null,
    CompanyUID: null,
    PROC_TYPE: '',
    loginuserid: null
  };
  public storeId = {
    StoreUID: null,
    DistributorUID: null,
    CompanyUID: null,
    PROC_TYPE: '',
    loginuserid: null
  };
  public regionId = {
    Region: null,
    StoreUID: null,
    DistributorUID: null,
    CompanyUID: null,
    PROC_TYPE: '',
    loginuserid: null
  };
  sdistributorUID: any = null;
  scompanyUID: any = null;
  sstoreUID: any = null;
  sregion: string = null;
  suserUID: string = null;
  scompanyList: any;
  sstoreList: any;
  sregionList: any;
  usersList: any;
  tempList: any;
  userid: string;
  DistributorUID: string;
  from_date: string;
  to_date: string;
  constructor(private http: HttpClient) {
    this.apiURL = environment.apiURL;
  }

  chartrender() {
    this.chartOptions = {
      series: this.series,
      labels: this.labels,
      chart: {
        height: 365,
        type: 'pie'
      },
      dataLabels: {
        dropShadow: {
          enabled: false,
          top: 1,
          left: 1,
          blur: 1,
          opacity: 0.45
        }
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ]
    };
  }

  close1(): void {
    this.apiFlag = false;
  }
  close2(): void {
    this.apiFlag1 = false;
  }

  ngOnInit(): void {
    this.apiFlag = false;
    this.apiFlag1 = false;
    this.series = [];
    this.labels = [];
    this.sstoreList = [];
    this.usersList = [];
    updatePageTitle('Top 10 Vehicles');
    //hideSearchText();
    this.users.userUID = localStorage.getItem('user_id');
    this.users.roleUID = localStorage.getItem('role_id');
    this.users.loginuserid = localStorage.getItem('user_id');
    this.distributorUser.loginuserid = localStorage.getItem('user_id');
    this.regionId.loginuserid = localStorage.getItem('user_id');
    this.storeId.loginuserid = localStorage.getItem('user_id');
    this.userbycomp.loginuserid = localStorage.getItem('user_id');
    this.compId.loginuserid = localStorage.getItem('user_id');
    this.storeUser.loginuserid = localStorage.getItem('user_id');
    this.distID.loginuserid = localStorage.getItem('user_id');
    this.compbystoreId.loginuserid = localStorage.getItem('user_id');
    this.topvehicles.loginuserid = localStorage.getItem('user_id');
    this.getDistributor();
    this.http.post<any>(this.apiURL + '/api/userlist', this.users)
      .subscribe(data => {
        if (data.return_code == 0) {
          this.usersList = (data as any).user_details;
        }
      });
  }

  distributorEvent(e): void {
    if (e.target.value != '') {
      this.sregionList = [];
      this.sstoreList =[];
      if(e.target.value == 'all'){
       /* var distributorlist='';
          var u=0;
           this.distributors.forEach((element, index) => {
               if(u==0)
               {
                 distributorlist=element.distributorUID.toString();
               }
               else{
                 distributorlist=distributorlist+','+element.distributorUID.toString();
               }
               u++;
           });
           this.sdistributorUID = distributorlist;
           this.distributorUser.DistributorUID = distributorlist;
           this.compId.DistributorUID = distributorlist;*/
           this.sdistributorUID = 'ALL';
           this.distributorUser.DistributorUID = 'ALL';
           this.compId.DistributorUID = 'ALL';
           this.distributorUser.PROC_TYPE = 'select_userlist';
           this.http.post<any>(this.apiURL + '/api/gettop10vehicles', this.distributorUser)
           .subscribe(data => {
             if (data.return_code == 0) {
               this.usersList = (data as any).details;
             }
           });
           this.distributorUser.PROC_TYPE = 'select_company_by_distributor';
           this.http.post<any>(this.apiURL + '/api/gettop10vehicles', this.distributorUser)
           .subscribe(data => {
             if (data.return_code == 0) {
              this.scompanyList = (data as any).details;
             }
           });
         }
      else{
        this.sdistributorUID = parseInt(e.target.value);
        this.distributorUser.DistributorUID = parseInt(e.target.value);
        this.compId.DistributorUID = parseInt(e.target.value);
        this.compId.userUID = localStorage.getItem('user_id');
        this.distributorUser.PROC_TYPE = 'select_userlist';
        this.http.post<any>(this.apiURL + '/api/gettop10vehicles', this.distributorUser)
        .subscribe(data => {
          if (data.return_code == 0) {
            this.usersList = (data as any).details;
          }
        });
        this.distributorUser.PROC_TYPE = 'select_company_by_distributor';
           this.http.post<any>(this.apiURL + '/api/gettop10vehicles', this.distributorUser)
           .subscribe(data => {
             if (data.return_code == 0) {
              this.scompanyList = (data as any).details;
             }
           });
      }
        }
    else {
      this.distributorUser.DistributorUID = null;
      this.userbycomp.CompanyUID = null;
      this.storeId.StoreUID = null;
      this.regionId.Region = null;
      this.regionId.StoreUID = null;
      this.sdistributorUID = null;
      this.sstoreUID = null;
      this.sregion = null;
      this.scompanyUID = null,
      this.scompanyList = [],
      this.sstoreList = [];
      this.sregionList = [];
      $("#companyName").val('');
      $("#storeuser").val('');
      $("#region").val('');
      $("#userid").val('');
      this.http.post<any>(this.apiURL + '/api/userlist', this.users)
        .subscribe(data => {
          if (data.return_code == 0) {
            this.usersList = (data as any).user_details;
          }
        });
    }
  }

  companyEvent(e): void {
    if(e.target.value != ''){
      this.sstoreList = [];
      if(e.target.value == 'all'){
          /* var companylist=''; 
           var u = 0;
           this.scompanyList.forEach((element, index) => {
               if(u==0)
               {
                companylist=element.companyUID.toString();
               }
               else{
                companylist=companylist + ',' + element.companyUID.toString();
               }
               u++;
           });
        this.userbycomp.CompanyUID = companylist;
        this.scompanyUID = companylist;
        this.compbystoreId.CompanyUID = companylist;*/
        this.userbycomp.CompanyUID = 'ALL';
        this.scompanyUID = 'ALL';
        this.compbystoreId.CompanyUID = 'ALL';
        this.userbycomp.DistributorUID = this.sdistributorUID;
        this.compbystoreId.DistributorUID = this.sdistributorUID;
        this.userbycomp.PROC_TYPE = 'select_userlist';
        this.http.post<any>(this.apiURL + '/api/gettop10vehicles', this.userbycomp)
          .subscribe(data => {
            if (data.return_code == 0) {
              this.usersList = (data as any).details;
            }
          });
        this.compbystoreId.PROC_TYPE = 'select_store_by_distributor_and_company';
        this.http.post<any>(this.apiURL + '/api/gettop10vehicles', this.compbystoreId)
        .subscribe(data => {
          if (data.return_code == 0) {
            this.sstoreList = (data as any).details;
          }
        });
      }
      else{
        this.userbycomp.CompanyUID = parseInt(e.target.value);
        this.scompanyUID =  parseInt(e.target.value);
        this.compbystoreId.CompanyUID = parseInt(e.target.value);
        this.compbystoreId.DistributorUID = this.sdistributorUID;
        this.userbycomp.DistributorUID = this.sdistributorUID;
        this.userbycomp.PROC_TYPE = 'select_userlist';
        this.http.post<any>(this.apiURL + '/api/gettop10vehicles', this.userbycomp)
          .subscribe(data => {
            if (data.return_code == 0) {
              this.usersList = (data as any).details;
            }
          });
        this.compbystoreId.PROC_TYPE = 'select_store_by_distributor_and_company';
        this.http.post<any>(this.apiURL + '/api/gettop10vehicles', this.compbystoreId)
        .subscribe(data => {
          if (data.return_code == 0) {
            this.sstoreList = (data as any).details;
          }
        });
      }
     }
    else {
      this.storeId.StoreUID = null;
      this.sstoreUID = null;
      this.scompanyUID = null;
      this.sregion = null;
      this.sstoreList = [];
      this.sregionList = [];
      $("#storeuser").val('');
      $("#region").val('');
      $("#userid").val('');
      this.distributorUser.DistributorUID = this.sdistributorUID;
      this.distributorUser.PROC_TYPE = 'select_userlist';
      this.http.post<any>(this.apiURL + '/api/gettop10vehicles', this.distributorUser)
        .subscribe(data => {
          if (data.return_code == 0) {
            this.usersList = (data as any).details;
          }
        });

    }
  }

  storeEvent(e): void {
    if (e.target.value != '') {
      if(e.target.value == 'all'){
        /*var storelist = '';
        var u = 0;
        this.sstoreList.forEach((element, index) => {
          if (u == 0)
          {
            storelist = element.companyUID.toString();
          }
          else{
            storelist = storelist + ',' + element.companyUID.toString();
          }
          u++;
        });
        this.sstoreUID = storelist;
        this.storeId.StoreUID = storelist;*/
        this.sstoreUID = 'ALL';
        this.storeId.StoreUID = 'ALL';
      }
      else{
        this.sstoreUID = parseInt(e.target.value);
        this.storeId.StoreUID = parseInt(e.target.value);
      }
      this.storeId.DistributorUID = this.sdistributorUID;
      this.storeId.CompanyUID = this.scompanyUID;
      this.storeId.PROC_TYPE = 'select_userlist';
      this.http.post<any>(this.apiURL + '/api/gettop10vehicles', this.storeId)
        .subscribe(data => {
          if (data.return_code == 0) {
            this.usersList = (data as any).details;
          }
      });
      this.storeId.PROC_TYPE = 'select_region_by_store';
      this.http.post<any>(this.apiURL + '/api/gettop10vehicles', this.storeId)
        .subscribe(data => {
          if (data.return_code == 0) {
            this.sregionList = (data as any).details;
          }
        });
    }
    else {
      this.storeId.StoreUID = null;
      this.sstoreUID = null;
      this.sregion = null;
      this.sregionList = [];
      $("#region").val('');
      $("#userid").val('');
      if (this.scompanyUID != null)
      {
        this.userbycomp.DistributorUID = this.sdistributorUID;
        this.userbycomp.CompanyUID = this.scompanyUID;
        this.userbycomp.PROC_TYPE = 'select_userlist';
        this.http.post<any>(this.apiURL + '/api/gettop10vehicles', this.userbycomp)
        .subscribe(data => {
          if (data.return_code == 0) {
            this.usersList = (data as any).details;
          }
        });
      }
      else if (this.distributorUser.DistributorUID != null) {
        this.distributorUser.PROC_TYPE = 'select_userlist';
        this.http.post<any>(this.apiURL + '/api/gettop10vehicles', this.distributorUser)
          .subscribe(data => {
            if (data.return_code == 0) {
              this.usersList = (data as any).details;
            }
          });
      }
    }
  }

  regionEvent(e): void {
    if (e.target.value != '') {
      if (e.target.value == 'all'){
       /* var regionlist = '';
        var u = 0;
        this.sregionList.forEach((element, index) => {
          if (u == 0)
          {
            regionlist = element.Region.toString();
          }
          else{
            regionlist = regionlist + ',' + element.Region.toString();
          }
          u++;
        });
        this.regionId.Region = regionlist;
        this.sregion = regionlist;*/
        this.regionId.Region = 'ALL';
        this.sregion = 'ALL';
      }
      else{
        this.regionId.Region = e.target.value;
        this.sregion = e.target.value;
      }
      this.regionId.PROC_TYPE = 'select_userlist';
      this.regionId.StoreUID = this.sstoreUID;
      this.regionId.CompanyUID = this.scompanyUID;
      this.regionId.DistributorUID = this.sdistributorUID;
      this.http.post<any>(this.apiURL + '/api/gettop10vehicles', this.regionId)
        .subscribe(data => {
          if (data.return_code == 0) {
            this.usersList = (data as any).details;
          }
        });
    }
    else {
      this.regionId.Region = null;
      this.regionId.StoreUID = null;
      this.sregion = null;
      $("#userid").val('');
      if (this.storeId.StoreUID != null) {
        this.storeId.PROC_TYPE = 'select_userlist';
        this.http.post<any>(this.apiURL + '/api/gettop10vehicles', this.storeId)
          .subscribe(data => {
            if (data.return_code == 0) {
              this.usersList = (data as any).details;
            }
          });
      }
    }
  }

  getDistributor(): void {
    
    this.distID.PROC_TYPE = 'select_distributor';
    this.http.post<any>(this.apiURL + '/api/gettop10vehicles', this.distID)
      .subscribe(data => {
        if (data.return_code == 0) {
          this.distributors = (data as any).details;
        }
      });
  }

  uservalidation(e)
  {
     if(e.target.value!='' && e.target.value!=null && e.target.value!=undefined)
     {
         $("#u_text").css("visibility", "hidden").css("display", "");
     }
  }

  fromDateValidation()
  {
    $("#fd_text").css("visibility", "hidden").css("display", "none");
  }

  toDateValidation()
  {
    $("#td_text").css("visibility", "hidden").css("display", "none");
  }

  getvehicleDetails(): void {
    var error = 0;
    if (!this.topvehicles.userid) {
      $("#u_text").css("visibility", "visible").css("display", "");
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
    if(error == 1){
      return;
    }   
    this.topvehicles.from_date = from_date();
    this.topvehicles.to_date = to_date();
    this.topvehicles.PROC_TYPE = 'select_top_10_vehicle';
    this.topvehicles.DistributorUID = this.sdistributorUID;
    this.topvehicles.CompanyUID = this.scompanyUID;
    this.topvehicles.StoreUID = this.sstoreUID;
    this.topvehicles.Region = this.sregion;
    if(this.usersList.length>0)
    {
      this.apiFlag = true;
     if(this.topvehicles.userid=='all')
     {
     /*  var userlist='';
       this.tempList = 'all';
       var u=0;
        this.usersList.forEach((element, index) => {
            if(u==0)
            {
              userlist=element.userUID.toString();
            }
            else{
              userlist=userlist+','+element.userUID.toString();
            }
            u++;
        });*/
        this.tempList = 'all';
        this.topvehicles.userid = 'ALL';
     }
     else{
      this.topvehicles.userid = this.topvehicles.userid.toString();
      this.tempList = this.topvehicles.userid;
     }
    
      this.http.post<any>(this.apiURL + '/api/gettop10vehicles', this.topvehicles)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        // console.log(data);
        // this.topvehicles = (data as any).vehicleDetails;
        this.series = [];
        this.labels = [];
        if (data.return_code != 1) {
          data.vehicleDetails.make.forEach((element, index) => {
            this.labels[index] = data.vehicleDetails.make[index] + ',' + data.vehicleDetails.model[index] + ',' + data.vehicleDetails.year[index];
          });
          this.series = data.vehicleDetails.total_vehicle;
          this.apiFlag = false;
          this.chartrender();
          //  console.log(this.topvehicles);
        }
        else {
          this.series = [];
          this.labels = [];
          this.chartrender();
          this.err_message = 'No User Data for the Selected Dates';
          document.getElementById('info_alert').style.display = 'block';
        }
        this.topvehicles.userid = this.tempList;
      });
    }
    else{
          this.apiFlag1=true;
          this.series = [];
          this.labels = [];
          this.chartrender();
    }
    
    
  }

  ngAfterViewInit(): void {
    dateInitialize();
  }
}
