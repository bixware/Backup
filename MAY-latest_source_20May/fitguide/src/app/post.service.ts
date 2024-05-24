import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  apiURL: any;
  imgURL: any;
  imgPathLength: any;
  sectionUID: any;
  searchSectionUID: any;
  userUID: any;
  roleUID: any;
  carImage: any;
  partDisplayHeader: any;
  public scrolllist = {
    PROC_TYPE: 'scrolling',
    userUID: '',
    filter:'',
    sort:'',
    limitstart: 0,
    limitend: 100
  };
  constructor(private httpClient: HttpClient) { 
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
    this.imgPathLength = environment.imgPathLength;
    this.carImage = this.imgURL.substring(0, this.imgURL.length - this.imgPathLength) + 'cover-sidebar-user.36299bfce3987306f32d.jpg';
    this.partDisplayHeader = 'test';
  }

  login(data): Observable<any>  {
    return this.httpClient.post(this.apiURL + '/api/login', data);
  }

  getList(startRow, endRow,filterModel,sortModel, userUID): Observable<any> {
    this.scrolllist.limitstart = startRow;
    this.scrolllist.limitend = endRow;
    this.scrolllist.userUID = userUID;
    this.scrolllist.filter = filterModel;
    this.scrolllist.sort = sortModel;
    const token = localStorage.getItem("token");
    const headers = { 'Authorization': 'Bearer ' + token};
    return this.httpClient.post(this.apiURL + '/api/listnonvehiclesscrolling', this.scrolllist, {'headers': headers});
  }

  getNonList(startRow, endRow,filterModel,sortModel, userUID): Observable<any> {
    this.scrolllist.limitstart = startRow;
    this.scrolllist.limitend = endRow;
    this.scrolllist.userUID = userUID;
    this.scrolllist.filter = filterModel;
    this.scrolllist.sort = sortModel;
    const token = localStorage.getItem("token");
    const headers = { 'Authorization': 'Bearer ' + token};
    return this.httpClient.post(this.apiURL + '/api/listingnonvehicles', this.scrolllist, {'headers': headers});
  }

}

