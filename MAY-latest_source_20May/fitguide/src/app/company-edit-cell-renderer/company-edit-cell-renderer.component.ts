import { Component, OnInit , OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//import { ManagecompanyComponent } from '../managecompany/managecompany.component';
@Component({
  selector: 'app-company-edit-cell-renderer',
  templateUrl: './company-edit-cell-renderer.component.html',
  styleUrls: ['./company-edit-cell-renderer.component.css']
})
export class CompanyEditCellRendererComponent implements ICellRendererAngularComp, OnDestroy, OnInit {


  apiURL: any;
  ArchStatus:any;
  params: any;
  public isComp = {
    userUID: '',
    ArchStatus: null,
    companyUID: null
    };
  constructor(private router: Router, private http: HttpClient) {
    this.apiURL = environment.apiURL; 
  }
  ngOnInit(): void {
  }
  agInit(params: any): void {
    this.params = params;
  }
  edit(): void {
    // this.router.navigate(['/home/managecompany/editcompany/' + this.params.value]);
    $('#modalEditCompany').css('display', 'block')+ this.params.value;;
    console.log(this.params)
    this.params.context.componentParent.clickEditCompany(this.params);
  }
  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  archive(): void{
    this.isComp.userUID = localStorage.getItem('userUID');
    this.isComp.ArchStatus = 1;
    this.isComp.companyUID = parseInt(this.params.data.companyUID);
    this.http.post<any>(this.apiURL + '/api/parchstatuscompany', this.isComp)
      .subscribe(data => {
        //this.managecompany.clickEvent();
        this.params.context.componentParent.clickEvent();
      });
  }

  restore(): void{
    this.isComp.userUID = localStorage.getItem('userUID');
    this.isComp.ArchStatus = 0;
    this.isComp.companyUID = parseInt(this.params.data.companyUID);
    this.http.post<any>(this.apiURL + '/api/parchstatuscompany', this.isComp)
      .subscribe(data => {
        //this.managecompany.clickEvent();
        this.params.context.componentParent.clickEvent();
      });
  }
  ngOnDestroy(): void {
  }

}

