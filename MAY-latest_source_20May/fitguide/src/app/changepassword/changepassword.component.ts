import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm} from '@angular/forms'
import { HttpClient } from '@angular/common/http';
import { from } from 'rxjs';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';


declare var hideSearchText: any;

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
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
  public con_error_msg = "";
  public success_msg = '';
  public resert_pass = {
    userName: '',
    password: '', 
    changing_from: '',
    hidden_user_id:''

  }

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router)
  {
    this.imgURL = environment.imgURL;
    this.apiURL = environment.apiURL;
  }

  ngOnInit(): void {
    // hideSearchText();
    this.http.get<any>(this.apiURL + '/api/getallcommoncontent')
      .subscribe(data => {
      this.title = data.contentDetails[1].TextData;
      this.subTitle1 = data.contentDetails[5].TextData;
      this.subTitle2 =  data.contentDetails[0].TextData;
      this.copyright = data.contentDetails[2].TextData + ' ' + data.contentDetails[3].TextData;
      let temp = data.contentDetails[4].imageURL;
      temp = temp.replace(/\\/g, '');
      this.loginImage = this.imgURL + temp + data.contentDetails[4].ImageData;
    });
    this.imgFlag = true;
    this.route.params.subscribe(params => {
      this.resert_pass.userName = params['id'];
    });
    //api Email verifications here
    this.http.post<any>(this.apiURL + '/api/getemail', this.resert_pass)
      .subscribe(data => {
        //  console.log(data);
        if(data.return_code == 0){
          this.resert_pass.userName = data.userDetails[0].userName;
          this.resert_pass.hidden_user_id = data.userDetails[0].userUID;
        }
        else{
          this.router.navigate(['login']);
        }    
    });
  } 

  submit(f: NgForm){
    // console.log(this.resert_pass);
    if(this.resert_pass.password == this.resert_pass.changing_from){
      if(this.resert_pass.password.length >= 6){
        this.con_error_msg = '';
        this.http.post<any>(this.apiURL + '/api/changeforgotpassword', this.resert_pass)
        .subscribe(data => {
          // console.log(data);
          if(data.return_code != 0){
            this.error1 = true;
            this.error_msg = data.err_message;
          }
          else{
            this.error = true;
            this.success_msg = data.success_message;
          }
          this.resert_pass.password = '';
          this.resert_pass.changing_from = '';
        });
      }
      else{
        this.error_msg = 'The password must be at least 6 characters';
      }
    }
    else{
      this.con_error_msg = 'Password does not match';
    }
    
  }

  close(){
    this.error = false;
  }

  onKey(e){
    this.resert_pass.password = e.target.value;
    if(this.resert_pass.password.length < 6){
      this.error_msg = "The password must be at least 6 characters";
    }
    else{
      this.error_msg = "";
    }
  }

  onKeyup(e){
    this.resert_pass.changing_from = e.target.value;
    if(this.resert_pass.password != this.resert_pass.changing_from){
      this.con_error_msg = 'Password does not match';
    }
    else{
      this.con_error_msg = '';
    }
  }
}