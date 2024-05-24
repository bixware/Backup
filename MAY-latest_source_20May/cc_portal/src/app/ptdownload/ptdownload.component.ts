import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare var $: any;
@Component({
  selector: 'app-ptdownload',
  templateUrl: './ptdownload.component.html',
  styleUrls: ['./ptdownload.component.css']
})
export class PtdownloadComponent implements OnInit, AfterViewInit {
  apiURL:any;
  ptFlag:boolean;
  ptdetails = {
    userName: null,
    ShopperCoCode: null
  };
  PTFiles = {
    fileName: null,
    filePath: null,
    msqDetails: null
  }
  constructor( private http: HttpClient, private location: Location) { this.apiURL = environment.apiURL;}

  ngOnInit(): void {
    this.ptFlag = false;
    this.ptdetails.userName = localStorage.getItem('userName');
    this.ptdetails.ShopperCoCode = localStorage.getItem('ShopperCoCode');
    this.http.post<any>(this.apiURL + '/api/getptdetails', this.ptdetails)
    .subscribe(data => {
      this.ptFlag = true;
      if (data.return_code == 0) {
        this.PTFiles.fileName = data.fileName;
        this.PTFiles.filePath = data.filePath;
        this.PTFiles.msqDetails = data.msqDetails;
      }
      else {
        this.PTFiles.fileName = [];
        this.PTFiles.filePath = [];
        this.PTFiles.msqDetails = [];
      }
    });
  }

  public getFile(fileName: string): void {
    const headers = new HttpHeaders();
    this.http.get<any>(this.apiURL + '/api/downloadfile?fileName=' + fileName, {headers, responseType: 'blob' as 'json'})
    .subscribe(data => {
      const file = new File([data], fileName);
      function download() {
        if (file.size == 0) {
          alert("Sorry, file not present to download !");
        } else {
          const link = document.createElement('a');
          const url = window.URL.createObjectURL(file);
          link.href = url;
          link.download = file.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
        }
      }
      download();
    });    
  }

  public removeWhitespaces(input: string): string {
    return input.replace("\u0000", "").trim();
  }

  ngAfterViewInit(): void {
    $(document).ready(function () {
      setTimeout(() => {
        if (!$('.nav-toggle').hasClass('nav-toggle--active')) {
          $('#page-content').css('margin-left', '0px');
        }
      }, 333);
    });
  }

}
