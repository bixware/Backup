import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgxSortableModule } from 'ngx-sortable';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SectionmasterComponent } from './sectionmaster/sectionmaster.component';
import { SearchComponent } from './search/search.component';
import { GlobalusersComponent } from './globalusers/globalusers.component';
import { ManagecontentComponent } from './managecontent/managecontent.component';
import { ManagebannersComponent } from './managebanners/managebanners.component';
import { UserslogComponent } from './userslog/userslog.component';
import { SearchlogComponent } from './searchlog/searchlog.component';
import { FeedbacklogComponent } from './feedbacklog/feedbacklog.component';
import { Top10vehiclesComponent } from './top10vehicles/top10vehicles.component';
import { TermsofuseComponent } from './termsofuse/termsofuse.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AddedituserComponent } from './addedituser/addedituser.component';
import { UpdatecmsComponent } from './updatecms/updatecms.component';
import { UpdatebannersComponent } from './updatebanners/updatebanners.component';
import { AddvehicleComponent } from './addvehicle/addvehicle.component';
import { BrandmasterComponent } from './brandmaster/brandmaster.component';
import { PartmasterComponent } from './partmaster/partmaster.component';
import { VehiclemasterComponent } from './vehiclemaster/vehiclemaster.component';
import { AddvehicledetailsComponent } from './addvehicledetails/addvehicledetails.component';
import { ManageroleComponent } from './managerole/managerole.component';
import { ManagemenuComponent } from './managemenu/managemenu.component';
import { RoleedituserComponent } from './roleedituser/roleedituser.component';
import { ManagestoresComponent } from './managestores/managestores.component';
import { AddstoreComponent } from './addstore/addstore.component';
import { ViewstoreComponent } from './viewstore/viewstore.component';
import { AddmenuComponent } from './addmenu/addmenu.component';
import { EditmenuComponent } from './editmenu/editmenu.component';
import { AddbrandComponent } from './addbrand/addbrand.component';
import { EditstoreComponent } from './editstore/editstore.component';
import { EditbrandComponent } from './editbrand/editbrand.component';
import { AddpartComponent } from './addpart/addpart.component';
import { EditpartComponent } from './editpart/editpart.component';
import { AddsectionComponent } from './addsection/addsection.component';
import { EditsectionComponent } from './editsection/editsection.component';
import { EditvehicleComponent } from './editvehicle/editvehicle.component';
import { EditcontentComponent } from './editcontent/editcontent.component';
import { ViewpartComponent } from './viewpart/viewpart.component';
import { DuplicatevehicleComponent } from './duplicatevehicle/duplicatevehicle.component';
import { UserbulkeditComponent } from './userbulkedit/userbulkedit.component';
import { UserrolemenueditComponent } from './userrolemenuedit/userrolemenuedit.component';
import { VehiclegalleryComponent } from './vehiclegallery/vehiclegallery.component';
import { AddvehiclegalleryComponent } from './addvehiclegallery/addvehiclegallery.component';
import { ManagedistributorComponent } from './managedistributor/managedistributor.component';
import { EditvehiclegalleryComponent } from './editvehiclegallery/editvehiclegallery.component';
import { ManagecompanyComponent } from './managecompany/managecompany.component';
import { AdddistributorComponent } from './adddistributor/adddistributor.component';
import { EditdistributorComponent } from './editdistributor/editdistributor.component';
import { AddcompanyComponent } from './addcompany/addcompany.component';
import { EditcompanyComponent } from './editcompany/editcompany.component';
import { SectionbulkdraganddropComponent } from './sectionbulkdraganddrop/sectionbulkdraganddrop.component';
import { ViewvehicleComponent } from './viewvehicle/viewvehicle.component';
import { UserrolebrandeditComponent } from './userrolebrandedit/userrolebrandedit.component';
import { UserrolesectioneditComponent } from './userrolesectionedit/userrolesectionedit.component';
import { VehiclenonpartComponent } from './vehiclenonpart/vehiclenonpart.component';
import { AddvehiclenonpartComponent } from './addvehiclenonpart/addvehiclenonpart.component';

import { EditnonpartComponent } from './editnonpart/editnonpart.component';
import { DuplicatepartComponent } from './duplicatepart/duplicatepart.component';
import { UniquevisitorsComponent } from './uniquevisitors/uniquevisitors.component';
import { SearchyearComponent } from './searchyear/searchyear.component';
import { SearchquarterComponent } from './searchquarter/searchquarter.component';
import { SearchmonthComponent } from './searchmonth/searchmonth.component';
import { SearchweekComponent } from './searchweek/searchweek.component';
import { FindReplaceComponent } from './find-replace/find-replace.component';
import { AddcalloutdetailsComponent } from './addcalloutdetails/addcalloutdetails.component';
import { PartcalloutconversionComponent } from './partcalloutconversion/partcalloutconversion.component';
import { ViewcalloutComponent } from './viewcallout/viewcallout.component';
import { CalloutVehicleMappingComponent } from './callout-vehicle-mapping/callout-vehicle-mapping.component';
import { UsertermeditComponent } from './usertermedit/usertermedit.component';
import { ManagebundlepartComponent } from './managebundlepart/managebundlepart.component';
import { IgninterlockguideComponent } from './igninterlockguide/igninterlockguide.component';
import { AddinterlockguideComponent } from './addinterlockguide/addinterlockguide.component';
import { EditigninterlockguideComponent } from './editigninterlockguide/editigninterlockguide.component';
import { DulicatecalloutComponent } from './dulicatecallout/dulicatecallout.component';
import { AddvehiclemappingComponent } from './addvehiclemapping/addvehiclemapping.component';
import { MemberbenefitsComponent } from './memberbenefits/memberbenefits.component';
import { AddbannerComponent } from './addbanner/addbanner.component';
import { DuplicatecalloutComponent } from './duplicatecallout/duplicatecallout.component';
import { SectionEditCellRendererComponent } from './section-edit-cell-renderer/section-edit-cell-renderer.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { VehicleEditCellRendererComponent } from './vehicle-edit-cell-renderer/vehicle-edit-cell-renderer.component';
import { BrandEditCellRendererComponent } from './brand-edit-cell-renderer/brand-edit-cell-renderer.component';
import { BrandImageCellRendererComponent } from './brand-image-cell-renderer/brand-image-cell-renderer.component';
import { StatictextComponent } from './statictext/statictext.component';
import { ViewpartEditCellRendererComponent } from './viewpart-edit-cell-renderer/viewpart-edit-cell-renderer.component';
import { VehicleGalleryEditCellRendererComponent } from './vehicle-gallery-edit-cell-renderer/vehicle-gallery-edit-cell-renderer.component';
import { VehicleNonpartActiveCellRendererComponent } from './vehicle-nonpart-active-cell-renderer/vehicle-nonpart-active-cell-renderer.component';
import { ManagecalloutComponent } from './managecallout/managecallout.component';
import { CalloutVehicleCellRenderComponent } from './callout-vehicle-cell-render/callout-vehicle-cell-render.component';
import { IgnCellRenderComponent } from './ign-cell-render/ign-cell-render.component';
import { GalleryImageCellRendererComponent } from './gallery-image-cell-renderer/gallery-image-cell-renderer.component';
import { GalleryNotesCellRenderererComponent } from './gallery-notes-cell-rendererer/gallery-notes-cell-rendererer.component';
import { FeedbacklogCompleteIncompleteCellRendererComponent } from './feedbacklog-complete-incomplete-cell-renderer/feedbacklog-complete-incomplete-cell-renderer.component';
import { ContentEditCellRendererComponent } from './content-edit-cell-renderer/content-edit-cell-renderer.component';
import { CalloutBtnCellRendererComponent } from './callout-btn-cell-renderer/callout-btn-cell-renderer.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MenuEditCellRendererComponent } from './menu-edit-cell-renderer/menu-edit-cell-renderer.component';
import { BannerEditCellRendererComponent } from './banner-edit-cell-renderer/banner-edit-cell-renderer.component';
import { DistributorImageCellRendererComponent } from './distributor-image-cell-renderer/distributor-image-cell-renderer.component';
import { DistributorEditCellRendererComponent } from './distributor-edit-cell-renderer/distributor-edit-cell-renderer.component';
import { CompanyImageCellRendererComponent } from './company-image-cell-renderer/company-image-cell-renderer.component';
import { CompanyEditCellRendererComponent } from './company-edit-cell-renderer/company-edit-cell-renderer.component';
import { StoreEditCellRendererComponent } from './store-edit-cell-renderer/store-edit-cell-renderer.component';
import { StoreYesNoRendererComponent } from './store-yes-no-renderer/store-yes-no-renderer.component';
import { StoreImageCellRendererComponent } from './store-image-cell-renderer/store-image-cell-renderer.component';
import { UserEditCellRendererComponent } from './user-edit-cell-renderer/user-edit-cell-renderer.component';
import { TrialCellRendererComponent } from './trial-cell-renderer/trial-cell-renderer.component';
import { DatePipe } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { YesNoCellRendererComponent } from './yes-no-cell-renderer/yes-no-cell-renderer.component';
import { BtnCellRendererComponent } from './btn-cell-renderer/btn-cell-renderer.component';
import { VehicleadditionalComponent } from './vehicleadditional/vehicleadditional.component';
import { CustomTooltipComponent } from './custom-tooltip/custom-tooltip.component';
import { BanneradsComponent } from './bannerads/bannerads.component';
import { PartImageCellRendererComponent } from './part-image-cell-renderer/part-image-cell-renderer.component';
import { LightingGuideComponent } from './lighting-guide/lighting-guide.component';
import { LightingGuideEditCellRendererComponent } from './lighting-guide-edit-cell-renderer/lighting-guide-edit-cell-renderer.component';
import { RegisterComponent } from './register/register.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { GlobalAnnouncementComponent } from './global-announcement/global-announcement.component';
import { CompanyAnnouncementComponent } from './company-announcement/company-announcement.component';
import { StoreAnnouncementComponent } from './store-announcement/store-announcement.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    SectionmasterComponent,
    SearchComponent,
    GlobalusersComponent,
    ManagecontentComponent,
    ManagebannersComponent,
    UserslogComponent,
    SearchlogComponent,
    FeedbacklogComponent,
    Top10vehiclesComponent,
    TermsofuseComponent,
    ViewprofileComponent,
    ResetpasswordComponent,
    ForgotpasswordComponent,
    ChangepasswordComponent,
    EditprofileComponent,
    AdduserComponent,
    AddedituserComponent,
    UpdatecmsComponent,
    UpdatebannersComponent,
    AddvehicleComponent,
    BrandmasterComponent,
    PartmasterComponent,
    VehiclemasterComponent,
    AddvehicledetailsComponent,
    ManageroleComponent,
    ManagemenuComponent,
    RoleedituserComponent,
    ManagestoresComponent,
    AddstoreComponent,
    ViewstoreComponent,
    AddmenuComponent,
    EditmenuComponent,
    AddbrandComponent,
    EditstoreComponent,
    EditbrandComponent,
    AddpartComponent,
    EditpartComponent,
    AddsectionComponent,
    EditsectionComponent,
    EditvehicleComponent,
    EditcontentComponent,
    ViewpartComponent,
    DuplicatevehicleComponent,
    UserbulkeditComponent,
    UserrolemenueditComponent,
    VehiclegalleryComponent,
    AddvehiclegalleryComponent,
    ManagedistributorComponent,
    EditvehiclegalleryComponent,
    ManagecompanyComponent,
    AdddistributorComponent,
    EditdistributorComponent,
    AddcompanyComponent,
    EditcompanyComponent,
    SectionbulkdraganddropComponent,
    ViewvehicleComponent,
    UserrolebrandeditComponent,
    UserrolesectioneditComponent,
    VehiclenonpartComponent,
    AddvehiclenonpartComponent,
    EditnonpartComponent,
    DuplicatepartComponent,
    UniquevisitorsComponent,
    SearchyearComponent,
    SearchquarterComponent,
    SearchmonthComponent,
    SearchweekComponent,
    FindReplaceComponent,
    AddcalloutdetailsComponent,
    PartcalloutconversionComponent,
    ManagecalloutComponent,
    ViewcalloutComponent,
    CalloutVehicleMappingComponent,
    UsertermeditComponent,
    ManagebundlepartComponent,
    IgninterlockguideComponent,
    AddinterlockguideComponent,
    EditigninterlockguideComponent,
    DulicatecalloutComponent,
    AddvehiclemappingComponent,
    MemberbenefitsComponent,
    AddbannerComponent,
    DuplicatecalloutComponent,
    SectionEditCellRendererComponent,
    VehicleEditCellRendererComponent,
    BrandEditCellRendererComponent,
    BrandImageCellRendererComponent,
    StatictextComponent,
    ViewpartEditCellRendererComponent,
    VehicleGalleryEditCellRendererComponent,
    VehicleNonpartActiveCellRendererComponent,
    CalloutBtnCellRendererComponent,
    CalloutVehicleCellRenderComponent,
    IgnCellRenderComponent,
    GalleryImageCellRendererComponent,
    GalleryNotesCellRenderererComponent,
    FeedbacklogCompleteIncompleteCellRendererComponent,
    ContentEditCellRendererComponent,
    CalloutBtnCellRendererComponent,
    MenuEditCellRendererComponent,
    BannerEditCellRendererComponent,
    DistributorImageCellRendererComponent,
    DistributorEditCellRendererComponent,
    CompanyImageCellRendererComponent,
    CompanyEditCellRendererComponent,
    StoreEditCellRendererComponent,
    StoreYesNoRendererComponent,
    StoreImageCellRendererComponent,
    UserEditCellRendererComponent,
    TrialCellRendererComponent,
    YesNoCellRendererComponent,
    BtnCellRendererComponent,
    VehicleadditionalComponent,
    CustomTooltipComponent,
    BanneradsComponent,
    PartImageCellRendererComponent,
    LightingGuideComponent,
    LightingGuideEditCellRendererComponent,
    RegisterComponent,
    GlobalAnnouncementComponent,
    CompanyAnnouncementComponent,
    StoreAnnouncementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    HttpClientModule,
    NgxSortableModule,
    SortableModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    NgApexchartsModule,
    AgGridModule.withComponents([
      SectionEditCellRendererComponent,
      VehicleEditCellRendererComponent,
      BrandEditCellRendererComponent,
      BrandImageCellRendererComponent,
      PartImageCellRendererComponent,
      VehicleGalleryEditCellRendererComponent,
      CalloutBtnCellRendererComponent,
      CalloutVehicleCellRenderComponent,
      CalloutVehicleMappingComponent,
      IgnCellRenderComponent,
      GalleryImageCellRendererComponent,
      GalleryNotesCellRenderererComponent,
      FeedbacklogCompleteIncompleteCellRendererComponent,
      ContentEditCellRendererComponent,
      MenuEditCellRendererComponent,
      BannerEditCellRendererComponent,
      DistributorImageCellRendererComponent,
      DistributorEditCellRendererComponent,
      CompanyImageCellRendererComponent,
      CompanyEditCellRendererComponent,
      StoreEditCellRendererComponent,
      StoreYesNoRendererComponent,
      StoreImageCellRendererComponent,
      UserEditCellRendererComponent,
      TrialCellRendererComponent,
      YesNoCellRendererComponent,
      BtnCellRendererComponent,
      CustomTooltipComponent,
      LightingGuideEditCellRendererComponent
    ]),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [DatePipe, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
