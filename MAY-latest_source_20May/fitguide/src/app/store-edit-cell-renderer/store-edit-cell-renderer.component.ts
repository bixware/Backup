import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//import { ManagestoresComponent } from '../managestores/managestores.component';
@Component({
  selector: 'app-store-edit-cell-renderer',
  templateUrl: './store-edit-cell-renderer.component.html',
  styleUrls: ['./store-edit-cell-renderer.component.css']
})
export class StoreEditCellRendererComponent implements ICellRendererAngularComp, OnDestroy, OnInit {
  apiURL: any;
  ArchStatus:any;
  params: any;
  public isComp = {
    userUID: '',
    ArchStatus: null,
    storeUID: null
    };
  constructor(private router: Router, private http: HttpClient) {
    this.apiURL = environment.apiURL; 
  }
  ngOnInit(): void {
  }
  agInit(params: any): void {
    this.params = params;
  }
  view(): void {
    this.router.navigate(['/home/managestores/viewstore/' + this.params.value]);
  }
  edit(): void {
   // this.router.navigate(['/home/managestores/editstore/' + this.params.value]);
    $('#modalEditStore').css('display', 'block')+ this.params.value;;
    console.log(this.params)
    this.params.context.componentParent.clickEditStore(this.params);
  }
  refresh(params: any): boolean {
    this.params = params;
    return true;
  }
  archive(): void{
    this.isComp.userUID = localStorage.getItem('userUID');
    this.isComp.ArchStatus = 1;
    this.isComp.storeUID = parseInt(this.params.data.storeUID);
    this.http.post<any>(this.apiURL + '/api/parchstatusstore', this.isComp)
      .subscribe(data => {
        //this.managestore.clickEvent();
        this.params.context.componentParent.clickEvent();
      });
  }

  restore(): void{
    this.isComp.userUID = localStorage.getItem('userUID');
    this.isComp.ArchStatus = 0;
    this.isComp.storeUID = parseInt(this.params.data.storeUID);
    this.http.post<any>(this.apiURL + '/api/parchstatusstore', this.isComp)
      .subscribe(data => {
        //this.managestore.clickEvent();
        this.params.context.componentParent.clickEvent();
      });
  }
  ngOnDestroy(): void {
  }

}

