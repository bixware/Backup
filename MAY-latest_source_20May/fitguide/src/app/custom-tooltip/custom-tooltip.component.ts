import { Component, OnInit } from '@angular/core';
import {ITooltipParams} from "@ag-grid-community/core";
import {ITooltipAngularComp} from "@ag-grid-community/angular";
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-custom-tooltip',
  templateUrl: './custom-tooltip.component.html',
  styleUrls: ['./custom-tooltip.component.css']
})
export class CustomTooltipComponent implements OnInit, ITooltipAngularComp {
  params: {color: string} & ITooltipParams;
  data: any[];
  imgURL: any;
  imageURL: any;
  constructor() {
    this.imgURL = environment.imgURL;
   }

  ngOnInit(): void {
  }
  agInit(params: {color: string} & ITooltipParams): void {
    this.params = params;
    // this.data = params.api.getDisplayedRowAtIndex(params.rowIndex).data;
    this.imageURL = this.imgURL + 'storage/app/public/uploads/Banners/' + params.value;
  }

}

