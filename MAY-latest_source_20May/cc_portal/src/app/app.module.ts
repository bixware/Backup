import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComplainComponent } from './customer-complain/customer-complain.component';
import { BarcodeGenerationComponent } from './barcode-generation/barcode-generation.component';
import { ButtonModule } from 'smart-webcomponents-angular/button';
import { GridModule } from 'smart-webcomponents-angular/grid';
import { HttpClientModule } from '@angular/common/http';
import { AddcustomercomplaintsComponent } from './addcustomercomplaints/addcustomercomplaints.component';
import { QccustomercomplaintsComponent } from './qccustomercomplaints/qccustomercomplaints.component';
import { RetailcustomercomplaintsComponent } from './retailcustomercomplaints/retailcustomercomplaints.component';
import { GenerategiftvoucherComponent } from './generategiftvoucher/generategiftvoucher.component';
import { QcinwardsComponent } from './qcinwards/qcinwards.component';
import { QcanalysisComponent } from './qcanalysis/qcanalysis.component';
import { SinglecustomercomplaintsComponent } from './singlecustomercomplaints/singlecustomercomplaints.component';
import { PtdownloadComponent } from './ptdownload/ptdownload.component';
import { BulkReturnsComponent } from './bulk-returns/bulk-returns.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarcodetagreqdetailsComponent } from './barcodetagreqdetails/barcodetagreqdetails.component';
import { BarcodetagrequploadComponent } from './barcodetagrequpload/barcodetagrequpload.component';
import { BarcodereqdetailsComponent } from './barcodereqdetails/barcodereqdetails.component';
import { AddcuscomplaintsComponent } from './addcuscomplaints/addcuscomplaints.component';
import { QCReportComponent } from './qcreport/qcreport.component';
import { UnJustifiedComponent } from './un-justified/un-justified.component';
import { ClosedcustomercomplaintsComponent } from './closedcustomercomplaints/closedcustomercomplaints.component';
import { RadioButtonModule } from 'smart-webcomponents-angular/radiobutton';
import { AddqccuscomplaintsComponent } from './addqccuscomplaints/addqccuscomplaints.component';
import { LpviewComponent } from './lpview/lpview.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    //DashboardComponent,
    CustomerComplainComponent,
    BarcodeGenerationComponent,
    AddcustomercomplaintsComponent,
    QccustomercomplaintsComponent,
    RetailcustomercomplaintsComponent,
    GenerategiftvoucherComponent,
    QcinwardsComponent,
    QcanalysisComponent,
    SinglecustomercomplaintsComponent,
    PtdownloadComponent,
    BulkReturnsComponent,
    BarcodetagreqdetailsComponent,
    BarcodetagrequploadComponent,
    BarcodereqdetailsComponent,
    AddcuscomplaintsComponent,
    QCReportComponent,
    UnJustifiedComponent,
    ClosedcustomercomplaintsComponent,
    AddqccuscomplaintsComponent,
    LpviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GridModule,
    ButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RadioButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
