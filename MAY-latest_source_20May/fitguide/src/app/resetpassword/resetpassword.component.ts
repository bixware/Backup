import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';

declare var updatePageTitle: any;
declare var hideSearchText: any;

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  apiURL: any;
  apiFlag: any;
  public error_msg = "";
  public con_error_msg = "";
  public error = false;
  public success_msg = '';
  public error1 = false;
  public success_msg1 = '';
  public resert_pass = {
    userName: '',
      password: '', 
      conformpassword: '',
      hidden_user_id: ''
  }
// Admin global reser password button proccess declare the variable
  public user = {
    userUID : ''
  }
    
    validatePassword(f: NgForm){
       console.log(this.resert_pass);
      if(this.resert_pass.password == this.resert_pass.conformpassword){
        if(this.resert_pass.password.length >= 6){
          this.con_error_msg = '';
          this.apiFlag = true;
          this.http.post<any>(this.apiURL + '/api/updateresetpassword', this.resert_pass)
          .subscribe(data => {
            $('#text').css('display', 'none');
            if(data.return_code != 1){
              $('#info_success').css('display', 'block');
              this.success_msg = data.success_message;
              this.resert_pass.password = '';
              this.resert_pass.conformpassword = '';
            }
            else{
              $('#info_alert').css('display', 'block');
              this.success_msg1 = data.err_message;              
            }
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
      this.resert_pass.conformpassword = e.target.value;
      if(this.resert_pass.password != this.resert_pass.conformpassword){
        this.con_error_msg = 'Password does not match';
      }
      else{
        this.con_error_msg = '';
      }
    }
    close(){
      $('#info_success').css('display', 'none');
      $('#info_alert').css('display', 'none');
      this.apiFlag = false;
    }
    close1(){
      $('#info_success').css('display', 'none');
      $('#info_alert').css('display', 'none');
      this.apiFlag = false;
    }
  constructor( private route: ActivatedRoute, private http: HttpClient, private _location: Location) {
    this.apiURL = environment.apiURL;
   }

  ngOnInit(): void {
    updatePageTitle('Reset Password');
    this.apiFlag = false;
    //hideSearchText();

   // Admin global reset password button proccess passing the id in route.module 
      this.route.params.subscribe(params => {
        this.user.userUID = params['id'];
      });
      // console.log(this.user.userUID);
      //create if condition and if it is value not there the msg is undefined and then get a Local values
      //if it is value is there api's running successfully  
      if(this.user.userUID != undefined){
        this.http.post<any>(this.apiURL + '/api/resetuserspassword/'+ this.user.userUID,this.user)
        .subscribe(data => {
           console.log(data);
          this.resert_pass.userName = data.user_details.userName;
          this.resert_pass.hidden_user_id = data.user_details.userUID;
        });
      }
      else{
        this.resert_pass.userName = localStorage.getItem('userName');
        this.resert_pass.hidden_user_id = localStorage.getItem('user_id');
      }

  }

  back(): void {
    this._location.back();
  }

}