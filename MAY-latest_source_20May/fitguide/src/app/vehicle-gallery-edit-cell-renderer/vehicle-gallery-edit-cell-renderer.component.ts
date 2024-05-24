import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
//import { PartmasterComponent } from '../partmaster/partmaster.component';
declare var $: any;
@Component({
  selector: 'app-vehicle-gallery-edit-cell-renderer',
  templateUrl: './vehicle-gallery-edit-cell-renderer.component.html',
  styleUrls: ['./vehicle-gallery-edit-cell-renderer.component.css']
})
export class VehicleGalleryEditCellRendererComponent implements OnInit,ICellRendererAngularComp {
  params: any;
  apiURL: any;
  ArchStatus:any;
  imgURL: any;
  constructor() { 
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
  }

  ngOnInit(): void {

  }

  edit(): void {
    $('#modalEditgallery').css('display', 'block'); + this.params.value;
    this.params.context.componentParent.clickgalleryEdit(this.params);
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  ngOnDestroy(): void {
  }


}
