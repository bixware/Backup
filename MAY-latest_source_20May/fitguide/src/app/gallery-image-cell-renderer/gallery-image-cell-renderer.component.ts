import { Component, OnInit } from '@angular/core';
import {ITooltipParams} from '@ag-grid-community/core';
import {ITooltipAngularComp} from '@ag-grid-community/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-gallery-image-cell-renderer',
  templateUrl: './gallery-image-cell-renderer.component.html',
  styleUrls: ['./gallery-image-cell-renderer.component.scss']
})
export class GalleryImageCellRendererComponent implements OnInit, ITooltipAngularComp {

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
    this.imageURL = this.imgURL + this.params.data.imagePath + '/' + params.value;
    console.log(this.imageURL);
  }

}

