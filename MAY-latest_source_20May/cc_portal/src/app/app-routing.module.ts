import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
//import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComplainComponent } from './customer-complain/customer-complain.component';
import { BarcodeGenerationComponent } from './barcode-generation/barcode-generation.component';
import { AddcustomercomplaintsComponent } from './addcustomercomplaints/addcustomercomplaints.component';
import { QccustomercomplaintsComponent } from './qccustomercomplaints/qccustomercomplaints.component';
import { RetailcustomercomplaintsComponent } from './retailcustomercomplaints/retailcustomercomplaints.component';
import { GenerategiftvoucherComponent } from './generategiftvoucher/generategiftvoucher.component';
import { QcinwardsComponent } from './qcinwards/qcinwards.component';
import { QcanalysisComponent } from './qcanalysis/qcanalysis.component';
import { SinglecustomercomplaintsComponent } from './singlecustomercomplaints/singlecustomercomplaints.component';
import { PtdownloadComponent } from './ptdownload/ptdownload.component';
import { BulkReturnsComponent } from './bulk-returns/bulk-returns.component';
import { BarcodetagreqdetailsComponent } from './barcodetagreqdetails/barcodetagreqdetails.component';
import { BarcodetagrequploadComponent } from './barcodetagrequpload/barcodetagrequpload.component';
import { BarcodereqdetailsComponent } from './barcodereqdetails/barcodereqdetails.component';
import { AddcuscomplaintsComponent } from './addcuscomplaints/addcuscomplaints.component';
import { QCReportComponent } from './qcreport/qcreport.component';
import { UnJustifiedComponent } from './un-justified/un-justified.component';
import { ClosedcustomercomplaintsComponent } from './closedcustomercomplaints/closedcustomercomplaints.component';
import { AddqccuscomplaintsComponent } from './addqccuscomplaints/addqccuscomplaints.component';
import { LpviewComponent } from './lpview/lpview.component';
const routes: Routes = [
  {
  path: 'login',
  component: LoginComponent,
  data: { title: 'Admin template | Login Page' }
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'Customer Complain'},
       /*{
        path : 'dashboard',
        component: DashboardComponent,
        data: { title: 'Admin template | Dashboard Page' }
       },*/
       {
        path : 'customer-complain',
        component: CustomerComplainComponent,
        data: { title: 'Admin template | Customer Complain Page' }
       },
       {
        path : 'addcustomercomplaints',
        component: AddcustomercomplaintsComponent,
        data: { title: 'Admin template | Add Customer Complain Page' }
       },
       {
        path : 'barcode generation',
        component: BarcodeGenerationComponent,
        data: { title: 'Admin template | BarcodeGeneration Page' }
       },
       {
        path : 'barcodereqdetails',
        component: BarcodereqdetailsComponent,
        data: { title: 'Admin template | Barcodereqdetails Page' }
       },
       {
        path : 'ptdownload',
        component: PtdownloadComponent,
        data: { title: 'Admin template | Ptdownload Page' }
       },
       {
        path : 'qccustomercomplaints',
        component: QccustomercomplaintsComponent,
        data: { title: 'Admin template | Qccustomercomplaints Page' }
       },
       {
        path : 'closedcustomercomplaints',
        component: ClosedcustomercomplaintsComponent,
        data: { title: 'Admin template | Closedcustomercomplaints Page' }
       },
       {
        path : 'addqccuscomplaints',
        component: AddqccuscomplaintsComponent,
        data: { title: 'Admin template | Addqccuscomplaints Page' }
       },
       {
        path : 'bulk-returns',
        component: BulkReturnsComponent,
        data: { title: 'Admin template | Bulk Returns Page' }
       },
       {
        path : 'addcuscomplaints',
        component: AddcuscomplaintsComponent,
        data: { title: 'Admin template | Add cuscomplaints Page' }
       },
       {
        path : 'qcreport',
        component: QCReportComponent,
        data: { title: 'Admin template | QCReport Page' }
       },
       {
        path : 'qcinwards/:id',
        component: QcinwardsComponent,
        data: { title: 'Admin template | Qcinwards Page' }
       },
       {
        path : 'qcanalysis/:id',
        component: QcanalysisComponent,
        data: { title: 'Admin template | Qcanalysys Page' }
       },
       {
        path : 'un-justified/:id',
        component: UnJustifiedComponent,
        data: { title: 'Admin template | un-justified Page' }
       },
       {
        path : 'retailcustomercomplaints',
        component: RetailcustomercomplaintsComponent,
        data: { title: 'Admin template | Retailcustomercomplaints Page' }
       },
       {
        path : 'singlecustomercomplaints',
        component: SinglecustomercomplaintsComponent,
        data: { title: 'Admin template | Singlecustomercomplaints Page' }
       },
       {
        path : 'GenerateGiftVoucher',
        component: GenerategiftvoucherComponent,
        data: { title: 'Admin template | Generategiftvoucher Page' }
       },
       {
        path : 'barcodetagreqdetails',
        component: BarcodetagreqdetailsComponent,
        data: { title: 'Admin template | Barcodetagreqdetails Page' }
       },
       {
        path : 'barcodetagrequpload',
        component: BarcodetagrequploadComponent,
        data: { title: 'Admin template | Barcodetagrequpload Page' }
       },
       {
        path : 'lpview',
        component: LpviewComponent,
        data: { title: 'Admin template | LP Page' }
       }
  ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
