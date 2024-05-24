import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  apiURL: any;
  imgURL: any;
  error_msg: string = null;
  values:any;
  error = false;
  title: any;
  imgFlag: any;
  subTitle1: any;
  subTitle2: any;
  copyright: any;
  loginImage: any;
  loginDate: any;
  disableFlag: any;
  error_msg1: string = null;
  error1 = false;
  public signin = {
    userName : ''
  };

  constructor(private router: Router, private http: HttpClient) { 
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
  }
  signIn = new FormGroup(
  {
      userName: new FormControl('', [Validators.required, Validators.email])

  });
  ngOnInit(): void {
    this.disableFlag = false;
    this.http.get<any>(this.apiURL + '/api/getallcommoncontent')
        .subscribe(data => {
          this.title = data.contentDetails[1].TextData;
          this.subTitle1 = data.contentDetails[5].TextData;
          this.subTitle2 =  data.contentDetails[0].TextData;
          this.copyright = data.contentDetails[2].TextData + ' ' + data.contentDetails[3].TextData;
          let temp = data.contentDetails[4].imageURL;
          temp = temp.replace(/\\/g, '');
          this.loginImage = this.imgURL + '/' + temp + data.contentDetails[4].ImageData;
        });
        this.imgFlag = true;
  }
  close(): void{
    this.error1 = false;
  }
  submit(f:NgForm): void {
  // console.log(this.signin);
    if (this.signin.userName != '') {
      this.error = false;
      this.disableFlag = true;
      // console.log(this.signin.email);
      this.http.post<any>(this.apiURL + '/api/forgotpassword', this.signin)
      .subscribe(data => {
      if (data.return_code != 0){
        this.error = true;
        this.disableFlag = false;
        this.error_msg = 'Invalid userName.';
      }
      else {
        this.error1 = true;
        this.disableFlag = false;
        this.error_msg1 = 'Password reset link has been send to your userName!';
        // this.router.navigate(['login']);
      }
      });
    }
    else{
      this.error = true;
      this.disableFlag = false;
      this.error_msg = 'Invalid userName.';
    }
  }
}
