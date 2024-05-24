import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
declare var $: any;
//import { FeedbacklogComponent } from '../feedbacklog/feedbacklog.component';
@Component({
  selector: 'app-feedbacklog-complete-incomplete-cell-renderer',
  templateUrl: './feedbacklog-complete-incomplete-cell-renderer.component.html',
  styleUrls: ['./feedbacklog-complete-incomplete-cell-renderer.component.scss']
})
export class FeedbacklogCompleteIncompleteCellRendererComponent implements ICellRendererAngularComp, OnDestroy,OnInit{
  params: any;
  apiURL: any;
  ArchStatus:any;
  public isComp = {
    userUID: '',
    roleUID: null,
    ArchStatus: null,
    isCompleted: null,
    feedbackLogUID: null
  };
  
  constructor(private router: Router, private http: HttpClient) { 
    this.apiURL = environment.apiURL;
    
  }

  ngOnInit(): void {
  
  }

  agInit(params: any): void {
    this.params = params;
  }

  updateComplete(): void {
    this.isComp.userUID = localStorage.getItem('user_id');
    this.isComp.isCompleted = $('#c_' + this.params.data.feedbackLogUID).prop('checked') ? "complete" : "incomplete";    
    this.isComp.feedbackLogUID = parseInt(this.params.data.feedbackLogUID);   
    this.http.post<any>(this.apiURL + '/api/zfeedbackactive', this.isComp)
      .subscribe(data => {
        if (data.return_code == 0) {
           console.log(' Completed is successfully !');
        }
      });
  }
  archive(): void{
    this.isComp.userUID = localStorage.getItem('userUID');
    this.isComp.roleUID = localStorage.getItem('roleUID');
    this.isComp.ArchStatus = 1;
    this.isComp.feedbackLogUID = parseInt(this.params.data.feedbackLogUID);
    this.http.post<any>(this.apiURL + '/api/parchstatusfeedback', this.isComp)
      .subscribe(data => {
        this.params.context.componentParent.clickEvent();
        //this.feedbacklog.clickEvent();
      });
  }

  restore(): void{
    this.isComp.userUID = localStorage.getItem('userUID');
    this.isComp.roleUID = localStorage.getItem('roleUID');
    this.isComp.ArchStatus = 0;
    this.isComp.feedbackLogUID = parseInt(this.params.data.feedbackLogUID);
    this.http.post<any>(this.apiURL + '/api/parchstatusfeedback', this.isComp)
      .subscribe(data => {
        this.params.context.componentParent.clickEvent();
        //this.feedbacklog.clickEvent();
      });
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  ngOnDestroy(): void {
  }
}

