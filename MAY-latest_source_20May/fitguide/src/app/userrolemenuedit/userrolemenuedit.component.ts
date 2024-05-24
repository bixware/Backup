import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import {Location} from '@angular/common';
import { environment } from 'src/environments/environment';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
import { CheckboxCellRendererComponent } from '../checkbox-cell-renderer/checkbox-cell-renderer.component';
import { UserroleMenuHeaderCellrenderComponent } from '../userrole-menu-header-cellrender/userrole-menu-header-cellrender.component'

declare var addOptions: any;
declare var getOptions: any;
declare var updatePageTitle: any;
@Component({
  selector: 'app-userrolemenuedit',
  templateUrl: './userrolemenuedit.component.html',
  styleUrls: ['./userrolemenuedit.component.css']
})
export class UserrolemenueditComponent implements OnInit {

  apiURL: any;
  redirectSecounds: any;
  roleFlag: any;
  gridApi: any;
  gridColumnApi: any;
  frameworkComponents: any;
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
  roleUID: "",
  userUID: null,
  distributorUID: null,
  companyUID: null,
  storeUID: null,
  PROC_TYPE :''
};
  public menuRole = {
    roleUID: "",
    userUID: null
  };
  public Adduser = {
    userUID: "",
     roleUID: "",
     menuList: [],
     userList: [],
  };
  public getGrid = {
    userUID: '',
    userList: []
  };
  public gridUpdate = {
    userUID: '',
    menuUpdationList: []
  };
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
    menus: any;
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
      var tempObject={userUID:null,menuListUID:[]};
        tempObject.userUID=rowNode.data.userUID;
      for (const [key, value] of Object.entries(rowNode.data)) {
        if (value == 'YES' && ! key.includes("previous"))
        {
          const headerName = key.replace("s_", "menuUID");
          tempObject.menuListUID.push(rowNode.data[headerName]);
        }  
      }
      this.gridUpdate.menuUpdationList.push(tempObject);
  });
   
    this.http.post<any>(this.apiURL + '/api/updatemenutomultipleuser', this.gridUpdate)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Menu Updated Successfully to the Users !';
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
  this.Adduser.menuList =  getOptions('section4');
  this.Adduser.menuList =  this.Adduser.menuList.map(function(e) {
     return parseInt(e.replace(/'/g, ''));
     });
     this.Adduser.userList =  this.Adduser.userList.map(function(e) {
      return parseInt(e.replace(/'/g, ''));
      });

  if (this.Adduser.userList.length == 0)
  {
    this.formErrorSection1 = true;
    return;
  }
  if (this.Adduser.menuList.length == 0)
  {
    this.formErrorSection2 = true;
    return;
  }
  this.http.post<any>(this.apiURL + '/api/addmenutomultipleuser', this.Adduser)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.successMessage = 'Menu Added Successfully to the User !';
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
  updatePageTitle('Bulk Menu Edit');
  this.roleFlag = false;
  this.viewDetailsFlag = false;
  this.viewDetailsGridFlag = false;
  $("#add").prop("checked", true);
  //this.getOptionMenu();
  this.role.roleUID = localStorage.getItem('role_id');
  this.role.userUID = localStorage.getItem('user_id');
  this.roleDetails();
  this.apiFlag = false;
  this.clicked = false;
  this.formErrorSection1 = false;
  this.formErrorSection2 = false;
  this.frameworkComponents = {
    checkboxCellRendererComponent: CheckboxCellRendererComponent,
    UserroleMenuHeaderCellrenderComponent:UserroleMenuHeaderCellrenderComponent
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

 add(): void {
  this.roleFlag = false;
 /*  $("select#roleUID").prop('selectedIndex', 0);
  $("select#distributorName").prop('selectedIndex', 0);
  $("select#companyName").prop('selectedIndex', 0);
  $("select#storeuser").prop('selectedIndex', 0); */
 }

 edit(): void {
  this.roleFlag = true;
  this.viewDetailsFlag = false;
  this.viewDetailsGridFlag = false;
  /* $("select#roleUID").prop('selectedIndex', 0);
  $("select#distributorName").prop('selectedIndex', 0);
  $("select#companyName").prop('selectedIndex', 0);
  $("select#storeuser").prop('selectedIndex', 0); */
 }

 viewDetails(): void {
  this.getGrid.userList = getOptions('section2');
  if (this.getGrid.userList.length == 0) {
    this.viewDetailsFlag = true;
    return;
  }
  this.viewDetailsFlag = false;
  this.getGrid.userUID = localStorage.getItem('user_id');
  this.http.post<any>(this.apiURL + '/api/editmenutomultipleuser', this.getGrid)
      .subscribe(data => {
        let objString = '';
        if (data.return_code == 0) {
          this.customColumnDefs.push({headerName: 'User Name', field: 'uname', pinned: 'left', lockPinned: true});
          this.customColumnDefs.push({headerName: 'User ID', field: 'userUID', hide: true});
          data.editUserMenu.forEach((element1, index1) => {
            /* console.log('userDetails',element1.userDetails); */
            objString = '{"uname":"' + element1.userDetails.firstName + ' ' +  element1.userDetails.lastName + '", "userUID":' + element1.userDetails.userUID;
            data.editUserMenu[index1].menudetails.forEach((element2, index2) => {
              if (index1 == 0)
              {
                this.customColumnDefs.push({headerName: element2.menuName, field: 's_' + index2, cellRenderer: 'checkboxCellRendererComponent',headerComponent:'UserroleMenuHeaderCellrenderComponent'});
                this.customColumnDefs.push({headerName: 'menuUID', field: 'menuUID' + index2, hide: true});
                this.customColumnDefs.push({headerName: 'previous menu', field: 'previous_' + index2, hide: true});
              }
              objString += ',"menuUID' + index2 + '":' + element2.menuUID;
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
  }*/

  roleDetails(): void {
    //$("select#section1").prop('selectedIndex', 0);
    this.http.post<any>(this.apiURL + '/api/getrolesbyroleid', this.role)
      .subscribe(data => {
       this.roles = (data as any).partDetails;
    });
  }
  
  getOptionMenu(): void{
  this.role.roleUID = this.Adduser.roleUID;
  //this.role.roleUID = localStorage.getItem('role_id');
  this.role.userUID = localStorage.getItem('user_id');
  this.http.post<any>(this.apiURL + '/api/getuserbyroleuid', this.role)
  .subscribe(data => {
  console.log(this.role);
  this.users = (data as any).details;
  });
  
  /* this.menus = this.sectionGroup.section3;
  this.menus = this.sectionGroup.section4; */
  this.menuRole.roleUID = this.Adduser.roleUID;
  this.menuRole.userUID = localStorage.getItem('user_id');
  this.http.post<any>(this.apiURL + '/api/getmenubyroleid', this.menuRole)
  .subscribe(data => {
  this.menus = (data as any).menuDetails;
  });

  //localStorage.setItem('roleUID', e.target.value);
  this.companyList = [];
  this.storeList = [];
  localStorage.setItem('distributorUID', '');
  localStorage.setItem('companyUID', '');
  localStorage.setItem('storeUID', '');
  //this.role.roleUID = localStorage.getItem('roleUID');
  this.role.userUID = localStorage.getItem('user_id');
  /*this.http.post<any>(this.apiURL + '/api/getuserlistbyrole', this.role)
  .subscribe(data => {
  this.users = (data as any).details;
  });*/
  this.http.post<any>(this.apiURL + '/api/getdistributorbyrole', this.role)
  .subscribe(data => {
    this.distributors = (data as any).details;
  });
  }
  

getUserDistributor(e): void{
  //localStorage.setItem('roleUID', e.target.value);
  localStorage.setItem('distributorUID', e.target.value);
  this.storeList = [];
  localStorage.setItem('companyUID', '');
  localStorage.setItem('storeUID', '');
  this.role.roleUID = this.Adduser.roleUID;
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
    //localStorage.setItem('roleUID', e.target.value);
    localStorage.setItem('companyUID', e.target.value);
    localStorage.setItem('storeUID', '');
    this.role.roleUID = this.Adduser.roleUID;
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
    this.role.roleUID = this.Adduser.roleUID;
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
