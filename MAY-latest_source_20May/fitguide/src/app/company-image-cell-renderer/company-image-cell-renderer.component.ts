import { Component, OnInit } from '@angular/core';
import {ITooltipParams} from "@ag-grid-community/core";
import {ITooltipAngularComp} from "@ag-grid-community/angular";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-company-image-cell-renderer',
  templateUrl: './company-image-cell-renderer.component.html',
  styleUrls: ['./company-image-cell-renderer.component.css']
})
export class CompanyImageCellRendererComponent implements OnInit, ITooltipAngularComp {

  params: {color: string} & ITooltipParams;
  imgURL: any;
  imageURL: any;
  constructor() {
    this.imgURL = environment.imgURL;
  }
  ngOnInit(): void {
  }
  agInit(params: {color: string} & ITooltipParams): void {
    this.params = params;
    this.imageURL = this.imgURL + 'storage/app/public/uploads/company/' + params.value;
  }

}

