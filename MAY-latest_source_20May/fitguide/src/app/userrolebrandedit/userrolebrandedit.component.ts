import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {Location} from '@angular/common';
import { environment } from 'src/environments/environment';
import { CheckboxCellRendererComponent } from '../checkbox-cell-renderer/checkbox-cell-renderer.component';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { UserroleBrandHeaderCellrenderComponent } from '../userrole-brand-header-cellrender/userrole-brand-header-cellrender.component'
declare var addOptions: any;
declare var getOptions: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-userrolebrandedit',
  templateUrl: './userrolebrandedit.component.html',
  styleUrls: ['./userrolebrandedit.component.scss']
})
export class UserrolebrandeditComponent implements OnInit {
  frameworkComponents: any;
  apiURL: any;
  redirectSecounds: any;
  roleFlag: any;
  gridApi: any;
  gridColumnApi: any;
  rowData: any;
  customRowData = [];
  modules = [ClientSideRowModelModule];
  columnDefs = [];
  customColumnDefs = [];
  public sectionGroup = {
    section1: null,
    section2: null,
    section3: null,
    section4: null,
    };
//Userlist api Paramaters
public role = {
  roleUID: null,
  userUID: null,
  distributorUID: null,
  companyUID: null,
  storeUID: null,
  PROC_TYPE: ''
};

  public Adduser = {
    userUID: "",
    roleUID: null,
    brandList: [],
    userList: [],

  };
  public getGrid = {
    userUID: '',
    userList: []
  };
  public gridUpdate = {
    userUID: '',
    brandUpdationList: []
  };
  storUserList: any;
  public storeUser = {
    distributorUID: null
  };
  distributors: any;
  companyList: any;
  storeList: any;
  public distID = {
    userUID: null
  };
  public distributorUser = {
    DistributorUID: null,
    PROC_TYPE: ''
  };
  public compId = {
    userUID: '',
    distributorUID: null
  };
  public compbystoreId = {
    userUID: '',
    distributorUID: null,
    companyUID: null
  };
  public userbycomp = {
    DistributorUID: null,
    CompanyUID: null,
    PROC_TYPE: ''
  };
  public storeId = {
    StoreUID: null,
    PROC_TYPE: ''
  };
  
  userUID: any;
  users: any;
  brands: any;
  roles: any;
  formErrorSection1: any;
  formErrorSection2: any;
  apiFlag: any;
  successMessage: any;
  clicked: any;
  details: any;
  viewDetailsFlag: any;
  viewDetailsGridFlag: any;
  context;
  constructor(private http: HttpClient, private location: Location) {
    this.apiURL = environment.apiURL;
    this.redirectSecounds = environment.redirectSecounds;
    this.context = { componentParent: this };
   }

   back(): void {
    this.location.back();
}

close1(): void{
  this.apiFlag = false;
  if (this.clicked == true) {
    this.location.back();
    this.clicked = false;
  }
}

 
addUser(f: NgForm): void {
  if (this.roleFlag == true && this.viewDetailsGridFlag == true) {
    this.apiFlag = true;
    this.clicked = true;
    this.gridUpdate.userUID = localStorage.getItem('user_id');
    this.gridApi.forEachNode((rowNode, index) => {
      var tempObject={userUID:null,brandListUID:[]};
        tempObject.userUID=rowNode.data.userUID;
      for (const [key, value] of Object.entries(rowNode.data)) {
        if (value == 'YES' && ! key.includes("previous"))
        {
          const headerName = key.replace("s_", "brandUID");
          tempObject.brandListUID.push(rowNode.data[headerName]);
        }  
      }
      this.gridUpdate.brandUpdationList.push(tempObject);
  });
    
    this.http.post<any>(this.apiURL + '/api/updatebrandtomultipleuser', this.gridUpdate)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Brand Updated Successfully to the Users !';
          document.getElementById('info_success').style.display = 'block';
          setTimeout(() => {
            this.close1();
          }, this.redirectSecounds);
        }
        else{
          this.successMessage = data.errors[0];
          this.clicked = false;
          document.getElementById('info_alert').style.display = 'block';
        }
    });
    return;
  }
  if (f.invalid) {
    return;
  }
  this.apiFlag = true;
  this.clicked = true;
  this.Adduser.userUID = localStorage.getItem('user_id');
  this.Adduser.roleUID = f.value.roleUID;
  this.Adduser.userList = getOptions('section2');
  this.Adduser.brandList = getOptions('section4');

  if (this.Adduser.userList.length == 0)
  {
    this.formErrorSection1 = true;
    return;
  }
  if (this.Adduser.brandList.length == 0)
  {
    this.formErrorSection2 = true;
    return;
  }
  this.http.post<any>(this.apiURL + '/api/addbrandtomultipleuser', this.Adduser)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Brand Added Successfully to the User !';
          document.getElementById('info_success').style.display = 'block';
          setTimeout(() => {
            this.close1();
          }, this.redirectSecounds);
        }
        else{
          this.successMessage = data.errors[0];
          this.clicked = false;
          document.getElementById('info_alert').style.display = 'block';
        }

  });
}

ngOnInit(): void {
  updatePageTitle('Bulk Brand Edit');
  this.roleFlag = false;
  this.viewDetailsFlag = false;
  this.viewDetailsGridFlag = false;
  $("#add").prop("checked", true);
  //this.getOptionUser();
  this.getOptionBrand();
  this.role.roleUID = localStorage.getItem('role_id');
  this.role.userUID = localStorage.getItem('user_id');
  this.roleDetails();
  this.apiFlag = false;
  this.clicked = false;
  this.formErrorSection1 = false;
  this.formErrorSection2 = false;
  this.frameworkComponents = {
    checkboxCellRendererComponent: CheckboxCellRendererComponent,
    UserroleBrandHeaderCellrenderComponent:UserroleBrandHeaderCellrenderComponent
 };
}

onGridReady(params): void {
  this.gridApi = params.api;
  this.gridColumnApi = params.columnApi;
  this.columnDefs = this.customColumnDefs;
  this.rowData = this.customRowData;
 }

swap(s1, s2): void {
  addOptions(s1, s2);
  if (s1 === 'section1') {
    this.formErrorSection1 = false;
  }
  if (s1 === 'section3') {
    this.formErrorSection2 = false;
  }
}

/*getOptionUser(): void{
this.role.roleUID = this.Adduser.roleUID;
this.http.post<any>(this.apiURL + '/api/getuserbyroleuid', this.role)
.subscribe(data => {
console.log(this.role);
this.users = (data as any).details;
console.log(this.users)
});
 }*/

 getOptionBrand(): void {
  this.http.post<any>(this.apiURL + '/api/getbrand',{})
    .subscribe(data => {
      this.brands = (data as any).brandDetails;
    });
}

add(): void {
  this.roleFlag = false;
  }
 
  edit(): void {
   this.roleFlag = true;
   this.viewDetailsFlag = false;
   this.viewDetailsGridFlag = false;
  }

viewDetails(): void {
  this.getGrid.userList = getOptions('section2');
  if (this.getGrid.userList.length == 0) {
    this.viewDetailsFlag = true;
    return;
  }
  this.viewDetailsFlag = false;
  this.getGrid.userUID = localStorage.getItem('user_id');
  this.http.post<any>(this.apiURL + '/api/editbrandtomultipleuser', this.getGrid)
      .subscribe(data => {
        let objString = '';
        if (data.return_code == 0) {
          this.customColumnDefs.push({headerName: 'User Name', field: 'uname', pinned: 'left', lockPinned: true});
          this.customColumnDefs.push({headerName: 'User ID', field: 'userUID', hide: true});
          data.editUserBrand.forEach((element1, index1) => {
            objString = '{"uname":"' + element1.userDetails.firstName + ' ' +  element1.userDetails.lastName + '", "userUID":' + element1.userDetails.userUID;
            data.editUserBrand[index1].branddetails.forEach((element2, index2) => {
              if (index1 == 0)
              {
                this.customColumnDefs.push({headerName: element2.brandName, field: 's_' + index2, cellRenderer: 'checkboxCellRendererComponent',headerComponent:'UserroleBrandHeaderCellrenderComponent'});
                this.customColumnDefs.push({headerName: 'brandUID', field: 'brandUID' + index2, hide: true});
                this.customColumnDefs.push({headerName: 'previous Brand', field: 'previous_' + index2, hide: true});

              }
              objString += ',"brandUID' + index2 + '":' + element2.brandUID;
              objString += ',"s_' + index2 + '":"' + element2.Active + '"';
              objString += ',"previous_' + index2 + '":"' + element2.Previous + '"';
            });
            objString += '}';
            this.customRowData.push(JSON.parse(objString));
          });
          this.viewDetailsGridFlag = true;
        }
        else {
          this.viewDetailsGridFlag = false;
        }
  });
 }

/*roleDetails(): void {
  this.http.post<any>(this.apiURL + '/api/getrolesbyroleid', this.role)
    .subscribe(data => {
     this.roles = (data as any).partDetails;
  });
}*/
roleDetails(): void {
  this.role.userUID = localStorage.getItem('user_id');
  this.http.post<any>(this.apiURL + '/api/getroleslist', this.role)
    .subscribe(data => {
     this.roles = (data as any).details;
  });
 }

getUserRole(e): void{
  localStorage.setItem('roleUID', e.target.value);
  this.companyList = [];
  this.storeList = [];
  localStorage.setItem('distributorUID', '');
  localStorage.setItem('companyUID', '');
  localStorage.setItem('storeUID', '');
  this.role.roleUID = localStorage.getItem('roleUID');
  this.role.userUID = localStorage.getItem('user_id');
  this.http.post<any>(this.apiURL + '/api/getuserlistbyrole', this.role)
  .subscribe(data => {
  this.users = (data as any).details;
  });
  this.http.post<any>(this.apiURL + '/api/getdistributorbyrole', this.role)
  .subscribe(data => {
    this.distributors = (data as any).details;
  });
  }

getUserDistributor(e): void{
  localStorage.setItem('distributorUID', e.target.value);
  this.storeList = [];
  localStorage.setItem('companyUID', '');
  localStorage.setItem('storeUID', '');
  this.role.roleUID = localStorage.getItem('roleUID');
  this.role.userUID = localStorage.getItem('user_id');
  this.role.distributorUID = localStorage.getItem('distributorUID');
  this.role.PROC_TYPE = 'SELECT_COMPANY_ALL';
  this.http.post<any>(this.apiURL + '/api/getuserlistbydistributor', this.role)
  .subscribe(data => {
    this.users = (data as any).details;
  });
  this.http.post<any>(this.apiURL + '/api/getcompanybydistributorid', this.role)
  .subscribe(data => {
    this.companyList = (data as any).companyList;
  });
  }

  getUserCompany(e): void { 
    localStorage.setItem('companyUID', e.target.value);
    localStorage.setItem('storeUID', '');
    this.role.roleUID = localStorage.getItem('roleUID');
    this.role.userUID = localStorage.getItem('user_id');
    this.role.distributorUID = localStorage.getItem('distributorUID');
    this.role.companyUID = localStorage.getItem('companyUID');
    this.http.post<any>(this.apiURL + '/api/getuserlistbycompany', this.role)
    .subscribe(data => {
    this.users = (data as any).details;
    });
    this.http.post<any>(this.apiURL + '/api/getstorelistbycompany', this.role)
    .subscribe(data => {
      this.storeList = (data as any).details;
    });
  }

  getUserStore(e): void {
    localStorage.setItem('storeUID', e.target.value);
    this.role.roleUID = localStorage.getItem('roleUID');
    this.role.userUID = localStorage.getItem('user_id');
    this.role.distributorUID = localStorage.getItem('distributorUID');
    this.role.companyUID = localStorage.getItem('companyUID');
    this.role.storeUID = localStorage.getItem('storeUID');
    this.http.post<any>(this.apiURL + '/api/getuserlistbystore', this.role)
    .subscribe(data => {
    this.users = (data as any).details;
    });
  }

  HeaderCheckEvent(headerName,checked): void {
    
    const previous=headerName.replace('s_', 'previous_');
    this.gridApi.forEachNode((rowNode, index) => {
      rowNode.setDataValue(headerName, checked?'YES':rowNode.data[previous])
     /*  console.log('node ' + rowNode.data[headerName] + ' is in the grid'); */
  });
  

}

}