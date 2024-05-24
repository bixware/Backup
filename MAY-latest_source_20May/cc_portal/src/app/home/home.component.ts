import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare var $: any;
declare var webApp: any;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  firstName: any;
  CustTypeFlag: any;
  roleUID: any;
  apiURL:any;
  public out = {
    userUID: null
  };
  constructor(private router: Router, private http: HttpClient) { 
    this.apiURL = environment.apiURL;
  }

  ngOnInit(): void {
    //this.out.userUID = localStorage.getItem('userUID');
    this.roleUID = localStorage.getItem('roleUID');
    if (this.roleUID == '1') {
      this.firstName = localStorage.getItem('firstName');
    }
    else {
      this.firstName = localStorage.getItem('userName');
      this.CustTypeFlag = localStorage.getItem('CustTypeFlag');
    }
  }

  logout(): void {
    this.http.post<any>(this.apiURL + '/api/logout', this.out)
    .subscribe(data => {
      console.log(data);
      if (data.return_code == 0) {
        if (this.roleUID == '1') {
          localStorage.removeItem('userUID');
          localStorage.removeItem('firstName');
          localStorage.removeItem('roleUID');
          this.router.navigate(['login']);
        } else {
          localStorage.removeItem('userName');
          localStorage.removeItem('roleUID');
          localStorage.removeItem('ShopperCoCode');
          localStorage.removeItem('CustTypeFlag');
          localStorage.removeItem('storeFromDate');
          localStorage.removeItem('storeToDate');
          localStorage.removeItem('qcFromDate');
          localStorage.removeItem('qcToDate');
          localStorage.removeItem('qcClosedFromDate');
          localStorage.removeItem('qcClosedToDate');
          localStorage.removeItem('tagFromDate');
          localStorage.removeItem('tagToDate');
          localStorage.removeItem('whacFromDate');
          localStorage.removeItem('whacToDate');
          localStorage.removeItem('accountsFromDate');
          localStorage.removeItem('accountsToDate');
          localStorage.removeItem('retailFromDate');
          localStorage.removeItem('retailToDate');
          localStorage.removeItem('qcreportFromDate');
          localStorage.removeItem('qcreportToDate');
          this.router.navigate(['login']);
        }
      }
      else {
        if (this.roleUID == '1') {
          localStorage.removeItem('userUID');
          localStorage.removeItem('firstName');
          localStorage.removeItem('roleUID');
          this.router.navigate(['login']);
        } else {
          localStorage.removeItem('userName');
          localStorage.removeItem('roleUID');
          localStorage.removeItem('ShopperCoCode');
          localStorage.removeItem('CustTypeFlag');
          localStorage.removeItem('storeFromDate');
          localStorage.removeItem('storeToDate');
          localStorage.removeItem('qcFromDate');
          localStorage.removeItem('qcToDate');
          localStorage.removeItem('qcClosedFromDate');
          localStorage.removeItem('qcClosedToDate');
          localStorage.removeItem('tagFromDate');
          localStorage.removeItem('tagToDate');
          localStorage.removeItem('whacFromDate');
          localStorage.removeItem('whacToDate');
          localStorage.removeItem('accountsFromDate');
          localStorage.removeItem('accountsToDate');
          localStorage.removeItem('retailFromDate');
          localStorage.removeItem('retailToDate');
          localStorage.removeItem('qcreportFromDate');
          localStorage.removeItem('qcreportToDate');
          this.router.navigate(['login']);
        }
      }
      });
  }
  
  ngAfterViewInit(): void {
    $(document).ready(function() {   
        $('.nav-toggle').click(function() {
          $('#primary-nav').toggle('slow');
          if ($('#page-content').css('margin-left') == '0px') {
            $('#page-content').css('margin-left', '200px');
          }
          else {
            $('#page-content').css('margin-left', '0px');
          }
          $(this).toggleClass('nav-toggle--active');
        });
        $('.nav-toggle').toggleClass('nav-toggle--active');  
        
        if(document.cookie.indexOf('mycookie')==-1) {
        document.cookie = 'mycookie=1';
        webApp.init();
      }
   });
  } 
}
