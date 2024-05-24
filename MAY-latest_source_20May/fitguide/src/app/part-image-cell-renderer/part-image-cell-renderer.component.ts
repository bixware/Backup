import { Component, OnInit } from '@angular/core';
import {ITooltipParams} from "@ag-grid-community/core";
import {ITooltipAngularComp} from "@ag-grid-community/angular";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-part-image-cell-renderer',
  templateUrl: './part-image-cell-renderer.component.html',
  styleUrls: ['./part-image-cell-renderer.component.css']
})
export class PartImageCellRendererComponent implements OnInit, ITooltipAngularComp {

  params: {color: string} & ITooltipParams;
  imgURL: any;
  imageURL: any;
  blobURL: any;
  constructor() { 
    this.imgURL = environment.imgURL;
    this.blobURL=environment.blobURL;
  }
  ngOnInit(): void {
  }
  agInit(params: {color: string} & ITooltipParams): void {
    this.params = params;
    this.imageURL = this.blobURL + 'app/public/uploads/part/' + params.value;
  }
}
