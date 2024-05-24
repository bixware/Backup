import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

declare var hideSearchText: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
  apiURL: any;
  public viewprofile={
    UserUID : ''
  };
  public user = {
      email: null,
      firstName: null,
      isActive: null,
      lastName: null,
      phone: null,
      // storeAddress: null,
      // storeCity: null,
      // storeName: null,
      // storeState: null,
      // storeZip: null,
      userName: null,
  };
  public name = null;
  public id = null;
  

  constructor(private http: HttpClient) { 
    this.apiURL = environment.apiURL;
  }

  ngOnInit(): void {
    updatePageTitle('View Profile');
    this.name = localStorage.getItem('user');
    this.id = localStorage.getItem('user_id');
    this.viewprofile.UserUID=this.id;

    this.http.post<any>(this.apiURL + '/api/viewprofile/'+this.id, this.viewprofile)
    .subscribe(data => {
  //  console.log(data);
      if(data.return_code == 0){
        this.user.firstName = data.user_details.firstName;
        this.user.isActive = data.user_details.isActive;
        this.user.email = data.user_details.email;
        this.user.userName = data.user_details.userName;
        this.user.lastName = data.user_details.lastName;
        this.user.phone = data.user_details.phone;
        // this.user.storeName = data.user_details.storeName;
        // this.user.storeAddress = data.user_details.storeAddress;
        // this.user.storeCity = data.user_details.storeCity;
        // this.user.storeZip = data.user_details.storeZip;

      }

    });
  }

}
