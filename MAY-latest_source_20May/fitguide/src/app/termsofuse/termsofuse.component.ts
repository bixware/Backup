import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare var $: any;
declare var hideSearchText: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-termsofuse',
  templateUrl: './termsofuse.component.html',
  styleUrls: ['./termsofuse.component.css']
})
export class TermsofuseComponent implements OnInit, AfterViewInit {
  public user = {
    roleUID: '',
    userUID: ''
  };
  public term = {
    roleUID: '',
    userUID: '',
    terms: null
  };
  contents: any;
  apiURL: any;
  termsText: any;
  termandcondition: any;
  successMessage: any;
  apiFlag: any;
  clicked: boolean;
  redirectSecounds: any;
  constructor(private httpClient: HttpClient) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
  }

  ngOnInit(): void {
    //hideSearchText();
    updatePageTitle('Terms of use');
    this.apiFlag = false;
    $('#termsandCondition').hide();
    this.user.roleUID = localStorage.getItem('role_id');
    this.user.userUID = localStorage.getItem('user_id');
    this.httpClient.post<any>(this.apiURL + '/api/getallcontent', this.user)
      .subscribe(data => {
        this.contents = (data as any).contentDetails;
        this.getContent();
      });

    this.httpClient.post<any>(this.apiURL + '/api/gettermandcondition', this.user)
      .subscribe(data => {
        this.termandcondition = (data as any).details;
        console.log(this.termandcondition[0].terms);
        if (parseInt(this.termandcondition[0].terms) == 1) {
          $('#termsandCondition').hide();
        }
        else {
          $('#termsandCondition').show();
        }
      });
  }

  close1(): void{
    this.apiFlag = false;
    if (this.clicked == true) {
      // this.location.back();
      this.clicked = false;
    }
  }

  ngAfterViewInit(): void {

  }

  termsUpdate(): void {
    this.apiFlag = true;
    this.term.roleUID = localStorage.getItem('role_id');
    this.term.userUID = localStorage.getItem('user_id');
    if ($('#exampleCheck1').prop('checked') === true)
    {
      this.term.terms = 1;
    }
    else
    {
      this.term.terms = 0;
    }
    this.httpClient.post<any>(this.apiURL + '/api/updatetermandcondition', this.term)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          $('#termsandCondition').hide();
          this.successMessage = 'Terms and Condition Accepted Successfully !';
          document.getElementById('info_success').style.display = 'block';
          setTimeout(() => {
             this.close1();
          }, this.redirectSecounds);

        }
        else{
          this.successMessage = data.errors[0];
          this.clicked = false;
          document.getElementById('info_alert').style.display = 'block';
        }
      });
  }

  getContent(): void {
    for (let i = 0; i < this.contents.length; i++) {
      if (this.contents[i].contentUID == 7) {
        this.termsText = this.contents[i].TextData;
      }
    }
  }


}

