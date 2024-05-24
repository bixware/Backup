import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuard } from './authentication.guard';
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
import { ManagecalloutComponent } from './managecallout/managecallout.component';
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
import { VehicleadditionalComponent } from './vehicleadditional/vehicleadditional.component';
import { BanneradsComponent } from './bannerads/bannerads.component';
import { LightingGuideComponent } from './lighting-guide/lighting-guide.component';
import { RegisterComponent } from './register/register.component';
import { GlobalAnnouncementComponent } from './global-announcement/global-announcement.component';
import { CompanyAnnouncementComponent } from './company-announcement/company-announcement.component';
import { StoreAnnouncementComponent } from './store-announcement/store-announcement.component';
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'The12VDashboard | Login Page' }
  },
  {
    path: 'forgot_password',
    component: ForgotpasswordComponent,
    data: { title: 'The12VDashboard | Forgot Password Page' }
  },
  {
    path: 'change_password/:id',
    component: ChangepasswordComponent,
    data: { title: 'The12VDashboard | Change Password Page' }
  },  
  {
    path: 'home',
    component: HomeComponent,
    canActivateChild: [AuthenticationGuard],
    children: [
       {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
       {
        path : 'search',
        component: SearchComponent,
        data: { title: 'The12VDashboard | Search Page' }
       },
       {
        path : 'dashboard',
        component: DashboardComponent,
        data: { title: 'The12VDashboard | Dashboard Page' }
       },
       {
        path : 'memberbenefits',
        component: MemberbenefitsComponent,
        data: { title: 'The12VDashboard | Member Benefits Page' }
       },
       {
        path : 'brandmaster',
        component: BrandmasterComponent,
        data: { title: 'The12VDashboard | Brand Master' }
       },
       {
        path : 'brandmaster/addbrand',
        component: AddbrandComponent,
        data: { title: 'The12VDashboard | Add Brand Master' }
       },
       {
        path : 'brandmaster/editbrand/:id',
        component: EditbrandComponent,
        data: { title: 'The12VDashboard | Edit Brand Master' }
       },
       {
        path : 'partmaster',
        component: PartmasterComponent,
        data: { title: 'The12VDashboard | Part Master' }
       },
       {
        path : 'partmaster/addpart',
        component: AddpartComponent,
        data: { title: 'The12VDashboard | Add Part Master' }
       },
       {
        path : 'partmaster/viewpart/:id',
        component: ViewpartComponent,
        data: { title: 'The12VDashboard | View Part Master' }
       },
       {
        path : 'partmaster/editpart/:id',
        component: EditpartComponent,
        data: { title: 'The12VDashboard | Edit Part Master' }
       },
       {
        path : 'partmaster/duplicatepart/:id',
        component: DuplicatepartComponent,
        data: { title: 'The12VDashboard | Duplicate Part Master' }
       },
       {
        path : 'sectionmaster',
        component: SectionmasterComponent,
        data: { title: 'The12VDashboard | Section Master' }
       },
       {
        path : 'sectionmaster/addsection',
        component: AddsectionComponent,
        data: { title: 'The12VDashboard | Add Section Master' }
       },
       {
        path : 'sectionmaster/editsection/:id',
        component: EditsectionComponent,
        data: { title: 'The12VDashboard | Edit Section Master' }
       },
       {
        path : 'sectionmaster/sectionbulkedit',
        component: SectionbulkdraganddropComponent,
        data: { title: 'The12VDashboard | Bulk Edit Section Master' }
       },
       {
        path : 'vehiclemaster',
        component: VehiclemasterComponent,
        data: { title: 'The12VDashboard | Vehicle Master' }
       },
       {
        path : 'vehiclegallery',
        component: VehiclegalleryComponent,
        data: { title: 'The12VDashboard | Vehicle Gallery' }
       },
       {
        path : 'vehiclegallery/addvehiclegallery',
        component: AddvehiclegalleryComponent,
        data: { title: 'The12VDashboard | Add Vehicle Gallery Page' }
       },
       {
        path : 'vehiclenonpart',
        component: VehiclenonpartComponent,
        data: { title: 'The12VDashboard | Vehicle Non Part' }
       },
       {
        path : 'vehiclenonpart/addvehiclenonpart',
        component: AddvehiclenonpartComponent,
        data: { title: 'The12VDashboard | Add Vehicle Non Part Page' }
       },
       {
        path : 'vehiclenonpart/editnonpart/:id',
        component: EditnonpartComponent,
        data: { title: 'The12VDashboard | Edit Vehicle Non Part Page' }
       },
       {
        path : 'vehicleadditional',
        component: VehicleadditionalComponent,
        data: { title: 'The12VDashboard | Vehicle Additional Page' }
       },
       {
        path : 'lighting-guide',
        component: LightingGuideComponent,
        data: { title: 'The12VDashboard | Lighting Guide Page' }
       },
       {
        path : 'vehiclegallery/editvehiclegallery/:id',
        component: EditvehiclegalleryComponent,
        data: { title: 'The12VDashboard | Edit Vehicle Gallery Page' }
       },
       {
        path : 'vehiclemaster/addvehicle',
        component: AddvehicleComponent,
        data: { title: 'The12VDashboard | Add Vehicle Page' }
       },
       {
        path : 'vehiclemaster/editvehicle/:id',
        component: EditvehicleComponent,
        data: { title: 'The12VDashboard | Edit Vehicle Page' }
       },
       {
        path : 'vehiclemaster/duplicatevehicle/:id',
        component: DuplicatevehicleComponent,
        data: { title: 'The12VDashboard | Duplicate Vehicle Page' }
       },
       {
        path : 'vehiclemaster/viewvehicle/:id',
        component: ViewvehicleComponent,
        data: { title: 'The12VDashboard | View Vehicle Page' }
       },
       {
        path : 'addvehicledetails',
        component: AddvehicledetailsComponent,
        data: { title: 'The12VDashboard | Add Vehicle Details' }
       },
       {
        path : 'managerole',
        component: ManageroleComponent,
        data: { title: 'The12VDashboard | Manage Role Page' }
       },
       {
        path : 'roleedituser/:roleUID/:roleName',
        component: RoleedituserComponent,
        data: { title: 'The12VDashboard | Role edit User Page' }
       },
       {
         path : 'managemenu',
         component: ManagemenuComponent,
         data: { title: 'The12VDashboard | Manage Menu Page' }
        },
        {
          path : 'managemenu/addmenu',
          component: AddmenuComponent,
          data: { title: 'The12VDashboard | Add User Page' }
         },
         {
          path : 'managemenu/editmenu/:id',
          component: EditmenuComponent,
          data: { title: 'The12VDashboard | Edit Menu Page' }
         },
         {
          path : 'managedistributor',
          component: ManagedistributorComponent,
          data: { title: 'The12VDashboard | Manage Distributor Page' }
         },
         {
          path : 'managedistributor/adddistributor',
          component: AdddistributorComponent,
          data: { title: 'The12VDashboard | Add Distributor Page' }
         },
         {
          path : 'managedistributor/editdistributor/:id',
          component: EditdistributorComponent,
          data: { title: 'The12VDashboard | Edit Distributor Page' }
         },
         {
          path : 'managecompany',
          component: ManagecompanyComponent,
          data: { title: 'The12VDashboard | Manage Company Page' }
         },
         {
          path : 'managecompany/addcompany',
          component: AddcompanyComponent,
          data: { title: 'The12VDashboard | Add Company Page' }
         },
         {
          path : 'managecompany/editcompany/:id',
          component: EditcompanyComponent,
          data: { title: 'The12VDashboard | Edit Company Page' }
         },
        {
          path : 'managestores',
          component: ManagestoresComponent,
          data: { title: 'The12VDashboard | Manage Stores Page' }
         },
         {
          path : 'managestores/addstore',
          component: AddstoreComponent,
          data: { title: 'The12VDashboard | Add Store Page' }
         },
         {
          path : 'managestores/viewstore/:id',
          component: ViewstoreComponent,
          data: { title: 'The12VDashboard | View Store Page' }
         },
         {
          path : 'managestores/editstore/:id',
          component: EditstoreComponent,
          data: { title: 'The12VDashboard | Edit Store Page' }
         },
       {
       path : 'globaluser',
       component: GlobalusersComponent,
       data: { title: 'The12VDashboard | Global User Page' }
      },
       {
        path : 'globaluser/adduser',
        component: AdduserComponent,
        data: { title: 'The12VDashboard | Add User Page' }
       },
       {
        path : 'globaluser/userbulkedit',
        component: UserbulkeditComponent,
        data: { title: 'The12VDashboard | User Bulk Edit Page' }
       },
       {
        path : 'globaluser/userrolemenuedit',
        component: UserrolemenueditComponent,
        data: { title: 'The12VDashboard | Role Based Menu Edit Page' }
       },
       {
        path : 'globaluser/userrolebrandedit',
        component: UserrolebrandeditComponent,
        data: { title: 'The12VDashboard | Role Based Section Edit Page' }
       },
       {
        path : 'globaluser/userrolesectionedit',
        component: UserrolesectioneditComponent,
        data: { title: 'The12VDashboard | Role Based Section Edit Page' }
       },
       {
        path : 'globaluser/usertermedit',
        component: UsertermeditComponent,
        data: { title: 'The12VDashboard | Term Based Section Edit Page' }
       },
       {
        path : 'globaluser/edituser/:id',
        component: AddedituserComponent,
        data: { title: 'The12VDashboard | Edit User Page' }
       },
       {
        path : 'globaluser/resetpassword/:id',
        component: ResetpasswordComponent,
        data: { title: 'The12VDashboard | Reset Password Page' }
       },
       {
        path : 'managecontent',
        component: ManagecontentComponent,
        data: { title: 'The12VDashboard | Manage Content Page' }
       },
       {
        path : 'managecontent/editcontent/:id',
        component: EditcontentComponent,
        data: { title: 'The12VDashboard | Edit Content Page' }
       },
       {
         path : 'updatedcms/:id',
         component : UpdatecmsComponent,
         data: { title: 'The12VDashboard | Update CMS Page' }
       },
       {
        path : 'managebanners',
        component: ManagebannersComponent,
        data: { title: 'The12VDashboard | Manage Banner Page' }
       },
       {
        path : 'find-replace',
        component: FindReplaceComponent,
        data: { title: 'The12VDashboard | FindReplace Page' }
       },
       {
        path : 'managecallout/addcalloutdetails',
        component: AddcalloutdetailsComponent,
        data: { title: 'The12VDashboard | AddCallout Details Page' }
       },
       {
        path : 'partcalloutconversion',
        component: PartcalloutconversionComponent,
        data: { title: 'The12VDashboard | PartCallout Conversion Details Page' }
       },
       {
        path : 'managebanners/addbanner',
        component: AddbannerComponent,
        data: { title: 'The12VDashboard | Add Banner Page' }
       },
       {
        path : 'managebanners/updatebanners/:id',
        component: UpdatebannersComponent,
        data: { title: 'The12VDashboard | Update Banner Page' }
       },
       {
        path : 'userlog',
        component: UserslogComponent,
        data: { title: 'The12VDashboard | User Log Page' }
       },
       {
        path : 'searchlog',
        component: SearchlogComponent,
        data: { title: 'The12VDashboard | Search Log Page' }
       },
       {
        path : 'feedbacklog',
        component: FeedbacklogComponent,
        data: { title: 'The12VDashboard | Feedback Log Page' }
       },
       {
        path : 'top10vehicles',
        component: Top10vehiclesComponent,
        data: { title: 'The12VDashboard | Top 10 Vehicles Page' }
       },
       {
        path : 'globalAnnouncement',
        component: GlobalAnnouncementComponent,
        data: { title: 'The12VDashboard | Global Announcement Page' }
       },
       {
        path : 'companyAnnouncement',
        component: CompanyAnnouncementComponent,
        data: { title: 'The12VDashboard | Company Announcement Page' }
       },
       {
        path : 'storeAnnouncement',
        component: StoreAnnouncementComponent,
        data: { title: 'The12VDashboard | Store Announcement Page' }
       },
       {
        path : 'termsofuse',
        component: TermsofuseComponent,
        data: { title: 'The12VDashboard | Terms of Use Page' }
       },
       {
        path : 'viewprofile',
        component: ViewprofileComponent,
        data: { title: 'The12VDashboard | View Profile Page' }
       },
       {
        path : 'editprofile',
        component: EditprofileComponent,
        data: { title: 'The12VDashboard | Edit Profile Page' }
       },
       {
        path : 'resetpassword',
        component: ResetpasswordComponent,
        data: { title: 'The12VDashboard | Reset Password Page' }
       },
       {
        path : 'searchyear',
        component: SearchyearComponent,
        data: { title: 'The12VDashboard | Searchyear Page' }
       },
       {
        path : 'searchquarter',
        component: SearchquarterComponent,
        data: { title: 'The12VDashboard | Searchquarter Page' }
       },
       {
        path : 'searchmonth',
        component: SearchmonthComponent,
        data: { title: 'The12VDashboard | Searchmonth Page' }
       },
       {
        path : 'searchweek',
        component: SearchweekComponent,
        data: { title: 'The12VDashboard | Searchweek Page' }
       },
       {
        path : 'uniquevisitors/:id',
        component: UniquevisitorsComponent,
        data: { title: 'The12VDashboard | Uniquevisitors Page' }
       },
       {
        path : 'managecallout',
        component: ManagecalloutComponent,
        data: { title: 'The12VDashboard | Callout' }
       },
       {
        path : 'managecallout/viewcallout',
        component: ViewcalloutComponent,
        data: { title: 'The12VDashboard | View Callout Master' }
       },
       {
        path : 'managecallout/vehicle-mapping',
        component: CalloutVehicleMappingComponent,
        data: { title: 'The12VDashboard | Callout Vehicle Mapping' }
       },
       {
        path : 'managecallout/duplicatecallout',
        component: DuplicatecalloutComponent,
        data: { title: 'The12VDashboard | Duplicatecallout Mapping' }
       },
       {
        path : 'managebundlepart',
        component: ManagebundlepartComponent,
        data: { title: 'The12VDashboard | Bundlepart' }
       },
       {
        path : 'igninterlockguide',
        component: IgninterlockguideComponent,
        data: { title: 'The12VDashboard | Igninterlockguide Page' }
       },
       {
        path : 'igninterlockguide/addinterlockguide',
        component: AddinterlockguideComponent,
        data: { title: 'The12VDashboard | Addinterlockguide Page' }
       },
       {
        path : 'igninterlockguide/editigninterlockguide/:id',
        component: EditigninterlockguideComponent,
        data: { title: 'The12VDashboard | Editigninterlockguide Page' }
       },
       {
        path : 'addvehiclemapping',
        component: AddvehiclemappingComponent,
        data: { title: 'The12VDashboard | Add Vehicle Mapping' }
       },
       {
        path : 'bannerads',
        component: BanneradsComponent,
        data: { title: 'The12VDashboard | Banner Ad' }
       },
       {
        path : 'register',
        component: RegisterComponent,
        data: { title: 'The12VDashboard | Register' }
       },
      ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'login'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true
    })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
