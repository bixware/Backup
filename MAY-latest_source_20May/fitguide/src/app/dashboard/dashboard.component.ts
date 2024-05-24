import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
declare var renderMap: any;
declare var google: any;
declare var hideSearchText: any;
declare var hidePageTitle: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  apiURL: any;
  rowData: any;
  sortRowData: any;
  storeData: any;
  cSize: any;
  totalGraph:any;
  barGraphData: any;
  public roleUID: any;
  private static googleLoaded: any;
  public dashboard = {
    roleUID: '',
    userUID: '',
    TotalVehicle: '',
    TotalUsers: '',
    TopUserSearchCount: '',
    TopUserName: '',
    TopUserUID: '',
    TotalStores: '',
    YearSearch: '',
    QuarterSearch: '',
    MonthSearch: '',
    WeekSearch: '',
    TotalCompany:''
  };

  constructor(private http: HttpClient, private router: Router) {
    this.totalGraph=[];
    this.apiURL = environment.apiURL;
  }

  ngOnInit(): void {
    hidePageTitle('');
    updatePageTitle('Dashboard');
    this.dashboard.roleUID = localStorage.getItem('role_id');
    this.dashboard.userUID = localStorage.getItem('user_id');
    this.rowData = [];
    this.http.post<any>(this.apiURL + '/api/getdashboardsearch', this.dashboard)
      .subscribe(data => {
        //  console.log(data); 
        if (data.return_code == 0) {
          this.dashboard.TotalVehicle = data.TotalVehicle;
          this.dashboard.TotalUsers = data.TotalUsers;
          //this.dashboard.TopSearchCount = data.TopSearchCount;
          this.dashboard.TopUserName = data.TopUserName;
          this.dashboard.TopUserUID = data.TopUserUID;
          this.dashboard.TotalStores = data.TotalStores;
          this.dashboard.YearSearch = data.YearSearch;
          this.dashboard.QuarterSearch = data.QuarterSearch;
          this.dashboard.MonthSearch = data.MonthSearch;
          this.dashboard.WeekSearch = data.WeekSearch;
          this.dashboard.TopUserSearchCount = data.TopUserSearchCount;
          this.dashboard.TotalCompany = data.TotalCompany;
        }
      });
      this.http.post<any>(this.apiURL + '/api/getdashboardvehiclechart', this.dashboard)
      .subscribe(data => {
        this.barGraphData = [];
        this.barGraphData.push(['Cars', 'No of Search']);
        for (var i = 0; i < data.vehicleSearchDatalog[0].TotalCount.length; i++) {
          this.barGraphData.push([data.vehicleSearchDatalog[0].VehicleDetails[i], data.vehicleSearchDatalog[0].TotalCount[i]]);
        }
        if (!DashboardComponent.googleLoaded) {
          DashboardComponent.googleLoaded = true;
          google.charts.load("current", { packages: ["bar"] });
        }
        google.charts.setOnLoadCallback(() => this.drawBar());
      });
    /*this.http.post<any>(this.apiURL + '/api/numberofvisit', this.dashboard)
      .subscribe(data => {
        if (screen.width <= 480) {
          this.cSize = 6;
        } else if (screen.width > 480 && screen.width <= 640) {
          this.cSize = 10.5;
        } else if (screen.width > 640 && screen.width <= 720) {
          this.cSize = 12;
        } else if (screen.width > 720 && screen.width <= 750) {
          this.cSize = 12.5;
        } else if (screen.width > 750 && screen.width <= 1080) {
          this.cSize = 13;
        } else {
          this.cSize = 16;
        }
        this.rowData = data.totalVisitors; 
       
        if (!DashboardComponent.googleLoaded) {
          DashboardComponent.googleLoaded = true;
          google.charts.load("current", { packages: ["calendar"] });
        }
        google.charts.setOnLoadCallback(() => this.drawGraph());
      });*/
    //hideSearchText();
    this.roleUID = localStorage.getItem('role_id');
    this.viewMap(false);
  }

  drawGraph() {
    /*  console.log(this.rowData); */
     /* const keys = this.rowData.keys(); */
     var YearTemp = (Object.keys(this.rowData)).map(Number);
     YearTemp.sort((a, b) => (a > b ? -1 : 1));
    /*  console.log(YearTemp); */
     
     for (var i = 0; i < YearTemp.length; i++) {
       var totalVisitorsTemp = [];
       this.totalGraph[i]='';
      /*  console.log(this.totalGraph); */
       this.rowData[YearTemp[i]].forEach((element, index) => {
           totalVisitorsTemp.push([new Date(element.Date), parseInt(element.visitorsCount)]);
          });
       /*   console.log(totalVisitorsTemp); */
       var dataTable = new google.visualization.DataTable();
       dataTable.addColumn({ type: 'date', id: 'Date' });
       dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
       dataTable.addRows(totalVisitorsTemp);
      /*  console.log(document.getElementById('calendar_basic'+ i)); */
       var chart = new google.visualization.Calendar(document.getElementById('calendar_basic'+ i));
       var options;
       if(i==0)
       {
          options = {
           title: 'Number of Visit',
           width: screen.width,
           height: 350,
           calendar: { cellSize: this.cSize },
           
         };
       }
       else{
          options = {
           width: screen.width,
           height: 350,
           calendar: { cellSize: this.cSize },
           
         };
       }
       
       chart.draw(dataTable, options);
     } 
   }

   drawBar() {
    var data = google.visualization.arrayToDataTable(this.barGraphData);
    var options = {
      bars: 'horizontal' // Required for Material Bar Charts.
    };
    var chart = new google.charts.Bar(document.getElementById('barchart_material'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
  }

   RefreshMap() {
    this.viewMap(true);
   }
   
   viewMap(flag:boolean) {
     let markers = [];
     $("#map_loader").css('display', 'block');
     this.http.post<any>(this.apiURL + '/api/getdashboardchart', {})
     .subscribe(data => {
       if(data.return_code == 0){
         this.storeData = (data as any).logindatalog;
         this.storeData.forEach(
         (element, i) => {
           let marker = {
             storeName: element.storeName,
             lattitude: element.lattitude,
             longitude: element.longitude,
             userDetails: [],
             loggedinDetails: 'No'
           }
           let userString = '';
           element.userDetails.forEach(
           (element, j) => {
            if(element.loggedin != 'No')
            {
              marker.loggedinDetails = 'Yes';
            }
            if(element.ipAddress == null)
            {
              userString += element.firstName+''+element.lastName+' - Not Online'+'<br/>';
            } else {
              userString += element.firstName+''+element.lastName+' - '+element.ipAddress+'<br/>';
            }
            
           })
           marker.userDetails.push(userString);
           markers.push(marker);
         });
         renderMap(markers,flag);
       }
     });
  }
}