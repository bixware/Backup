import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public signin = {
    userName: null,
    password: null
  };

  errorMsg: any;
  errorFlag: any;
  apiURL: any;
  constructor(private router: Router, private http: HttpClient) { 
    this.apiURL = environment.apiURL; 
  }

  ngOnInit(): void {
  }

  login(): void{
    this.errorFlag = false;
    this.errorMsg = '';
    this.signin.userName = $('#login-email').val();
    this.signin.password = $('#login-password').val();
    this.http.post<any>(this.apiURL + '/api/login', this.signin)
    .subscribe(data => {
      console.log(data);
      if (data.return_code == 0) {
        if (data.user[0].roleUID == '1') {
          localStorage.setItem('userName', data.user[0].userName);
          localStorage.setItem('firstName', data.user[0].firstName);
          localStorage.setItem('lastName', data.user[0].lastName);
          localStorage.setItem('userUID', data.user[0].userUID);
          localStorage.setItem('roleUID', data.user[0].roleUID);
        } else {
          localStorage.setItem('userName', data.user[0].UserName);
          localStorage.setItem('roleUID', data.user[0].roleUID);
          localStorage.setItem('ShopperCoCode', data.user[0].ShopperCoCode);
          localStorage.setItem('CustTypeFlag', data.user[0].CustTypeFlag);
        }
        if (data.user[0].roleUID == '3')
        {
          this.router.navigate(['home/customer-complain']);
        }
        else if (data.user[0].roleUID == '4')
        {
          this.router.navigate(['home/GenerateGiftVoucher']);
        }
        else if (data.user[0].roleUID == '5')
        {
          this.router.navigate(['home/barcodetagreqdetails']);
        }
        else if (data.user[0].roleUID == '6')
        {
          this.router.navigate(['home/retailcustomercomplaints']);
        }
        else if (data.user[0].roleUID == '7')
        {
          localStorage.setItem('ShroomNo', data.user[0].ShroomNo);
          this.router.navigate(['home/lpview']);
        }
        else{
          this.router.navigate(['home/qccustomercomplaints']);
        }
      }
      else {
        this.errorFlag = true;
        this.errorMsg = '';
        if (data.err_message == 'Validation Errors')
        {
          for (let i = 0; i < data.errors.length; i++)
          {
            this.errorMsg += data.errors[i];
            if (data.errors.length != i)
            {
              this.errorMsg += '</br>';
            }
          }
        }
        else {
          this.errorMsg = data.err_message;
        }
      }
    });
  }
}
