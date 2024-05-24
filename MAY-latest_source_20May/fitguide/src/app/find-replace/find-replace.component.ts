import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
declare var updatePageTitle: any;
@Component({
  selector: 'app-find-replace',
  templateUrl: './find-replace.component.html',
  styleUrls: ['./find-replace.component.scss']
})
export class FindReplaceComponent implements OnInit {
  apiURL: any;
  params: any;
  sectionList: string;
  sections: any;
  form: FormGroup;
  searchSectionUID: any;
  submitted : any;
  redirectSecounds: any;
  clicked: any;
  isComp = {
    sectionName: null,
    findpartDisplayHeader: null,
    ReplacepartDisplayHeader: null
  }
  partDetails:any;
  successMessage: any;
  apiFlag: any;
  constructor(private http: HttpClient, private location: Location, public fb: FormBuilder) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.form = this.fb.group({
      sectionName: ['', Validators.required],
      findpartDisplayHeader: [''],
      ReplacepartDisplayHeader: ['']
    });
   }

  get f(): any { return this.form.controls; }

  ngOnInit(): void {
    this.getSection();
    this.clicked = false;
    this.partDetails = {};
    updatePageTitle('Find and Replace');
  }

  getSection(): void {
    this.sectionList = '';
    this.http.get<any>(this.apiURL + '/api/getsections')
      .subscribe(data => {
        this.sections = (data as any).searchSections;
      });
  }
  close1(): void{
    this.apiFlag = false;
    if (this.clicked == true) {
      // this.location.back();
      this.clicked = false;
    }
  }
  replace(e): void{
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    this.apiFlag = true;
    this.isComp.sectionName = this.form.value.sectionName;
    this.isComp.findpartDisplayHeader = this.form.value.findpartDisplayHeader;
    this.isComp.ReplacepartDisplayHeader = this.form.value.ReplacepartDisplayHeader;
    this.http.post<any>(this.apiURL + '/api/updatepartdisplayheader', this.isComp)
      .subscribe(data => {
        if (data.return_code == 0) {
          document.getElementById('text').style.display = 'none';
          this.clicked = true;
          this.successMessage = 'Total records affected :'+ data.partDetails[0].UpdateRecCount;
          document.getElementById('info_success').style.display = 'block';
      }
      else {
        document.getElementById('text').style.display = 'none';
        this.successMessage = data.errors[0];
        this.clicked = false;
        document.getElementById('info_alert').style.display = 'block';
      }
    });
  }
}

