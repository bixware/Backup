import { Component, OnInit } from '@angular/core';
import {ITooltipParams} from '@ag-grid-community/core';
import {ITooltipAngularComp} from '@ag-grid-community/angular';

@Component({
  selector: 'app-gallery-notes-cell-rendererer',
  templateUrl: './gallery-notes-cell-rendererer.component.html',
  styleUrls: ['./gallery-notes-cell-rendererer.component.scss']
})
export class GalleryNotesCellRenderererComponent implements OnInit, ITooltipAngularComp {

  params: {color: string} & ITooltipParams;
  notes: any;
  constructor() {}
  ngOnInit(): void {
  }
  agInit(params: {color: string} & ITooltipParams): void {
    this.params = params;
    this.notes =  params.value;
  }

}

