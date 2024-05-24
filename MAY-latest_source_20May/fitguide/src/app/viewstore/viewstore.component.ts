import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
declare var updatePageTitle: any;
@Component({
  selector: 'app-viewstore',
  templateUrl: './viewstore.component.html',
  styleUrls: ['./viewstore.component.css']
})
export class ViewstoreComponent implements OnInit {
  apiURL: any;
  imgURL: any;
  public store = {
    storeUID : ''
  }
  storeDetails: any;
  
  prevImage: any;
  imageFlag: any;
  Region:any;
  Country:any;
  
  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) {
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
    this.Region = '';
    this.Country = '';
    this.storeDetails = '';
  }

  ngOnInit(): void {
    updatePageTitle('View Store');
    this.route.params.subscribe(params => {
      this.store.storeUID = params['id'];
    });
    this.imageFlag = false;
    this.http.post<any>(this.apiURL + '/api/editstore/' + this.store.storeUID, this.store)
      .subscribe(data => {
          this.storeDetails = (data as any).store_details[0];
          switch (this.storeDetails.storeRegion) {
            case 'Midwest':
              this.Region = 'Midwest';
              break;
            case 'Mountain':
              this.Region = 'Mountain';
              break;
            case 'West':
              this.Region = 'West';
              break;
            case 'South':
              this.Region = 'South';
              break;
            case 'Southeast':
              this.Region = 'Southeast';
              break;
            case 'Southwest':
              this.Region = 'Southwest';
              break;
            case 'Northern':
              this.Region = 'Northern';
              break;
            case 'Northwest':
              this.Region = 'Northwest';
              break;
            case 'Northeast':
              this.Region = 'Northeast';
              break;
            case 'East':
                this.Region = 'East';
                break;
            default:
              this.Region = '';
              break;
          }
          switch (this.storeDetails.storeCountry) {
            case 'USA':
              this.Country = 'USA';
              break;
            case 'CANADA':
              this.Country = 'CANADA';
              break;
            default:
              this.Country = '';
              break;
          }
          if (data.store_details[0].storeImage != null  && data.store_details[0].storeImage != '')
          {
            const fileName = data.store_details[0].storeImage;
            const lastDotPos = fileName.lastIndexOf('.');
            if (lastDotPos === -1)
            {
              this.imageFlag = false;
            }
            else
            {
              const fileNameSub = fileName.substr(lastDotPos + 1, fileName.length);
              if (fileNameSub.length > 4)
              {
                this.imageFlag = false;
              }
              else
              {
                this.imageFlag = true;
              }
            }
            this.prevImage = this.imgURL + 'storage/app/public/uploads/store/' + data.store_details[0].storeImage;
          }
    });
  }

  back(): void {
    this.location.back();
  }

}
