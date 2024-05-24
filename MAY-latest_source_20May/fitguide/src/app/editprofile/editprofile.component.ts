import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {Location} from '@angular/common';
import { environment } from 'src/environments/environment';

declare var updatePageTitle: any;
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  apiURL: any;
  clicked: any;
  apiFlag: any;
  successMessage: any;
  redirectSecounds: any;
  
  public error1 = false;
  public success_msg1 = '';
  public edit={
    email : ''
  };
  public Edituser = {
      email: null,
      firstName: null,
      isActive: null,
      password: '******',
      lastName: null,
      phone: null,
      storeAddress: null,
      // storeCity: null,
      // storeName: null,
      // storeState: null,
      // storeZip: null,
      userName: null,
      hidden_user_id : null,
  };
  public name = null;
  public id = null;

  constructor(private http: HttpClient, private location: Location) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
   }

/* back() {
      this.location.back();
    } */

validatePassword(f: NgForm){
    // console.log(this.Edituser);
    this.apiFlag = true;
    this.clicked = true;
  this.http.post<any>(this.apiURL + '/api/updateprofile', this.Edituser)
  .subscribe(data => {
    document.getElementById('text').style.display = 'none';
  if (data.return_code == 0) {
  this.successMessage = 'User details has been updated successfully!';
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

   phoneValidator(phone) {
		var mobilePattern = /^[0-9]{8}$/;
		var isvalidPhone = mobilePattern.test(phone.target.value);
		if(phone === '') {
			return false;
		} else if(!isvalidPhone) {
			return false;
		}
		return true;
	}

  close1(): void{
		this.apiFlag = false;
		if (this.clicked == true) {
		  this.location.back();
      this.clicked = false;
		}
	  }

ngOnInit(): void {
    updatePageTitle('Edit Profile');
    this.apiFlag = false;
    this.clicked = false;
    this.name = localStorage.getItem('user');
    this.id = localStorage.getItem('user_id');
    this.edit.email=this.name;

    this.http.post<any>(this.apiURL + '/api/viewprofile/'+this.id, this.edit)
    .subscribe(data => {
  //  console.log(data);
      if(data.return_code == 0){
        this.Edituser.firstName = data.user_details.firstName;
        this.Edituser.isActive = data.user_details.isActive;
        this.Edituser.email = data.user_details.email;
        this.Edituser.userName = data.user_details.userName;
        this.Edituser.lastName = data.user_details.lastName;
        this.Edituser.phone = data.user_details.phone;
        // this.Edituser.storeName = data.user_details.storeName;
        // this.Edituser.storeAddress = data.user_details.storeAddress;
        // this.Edituser.storeCity = data.user_details.storeCity;
        // this.Edituser.storeState = data.user_details.storeState;
        // this.Edituser.storeZip = data.user_details.storeZip;
        this.Edituser.hidden_user_id = data.user_details.userUID;

      }

    });
  }
}
