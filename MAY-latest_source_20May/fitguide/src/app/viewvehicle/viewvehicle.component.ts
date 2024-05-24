import { Component, OnInit, Input, ElementRef, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { environment } from 'src/environments/environment';
declare var $: any;

declare var processPrintDetails: any;
declare var displaySearchText: any;
declare var AddClass: any;
declare var RemoveClass: any;
declare var hideSearchText: any;
declare var imageGallery: any;
declare var updatePageTitle: any;
declare var vehicleTitle: any;

@Component({
  selector: 'app-viewvehicle',
  templateUrl: './viewvehicle.component.html',
  styleUrls: ['./viewvehicle.component.css'],
})
export class ViewvehicleComponent implements OnInit {

  sectionDeleteFlag: any;
  sectionGalleyDeleteFlag: any;
  sectionDeleteArray: any;
  sectionGalleyDeleteArray: any;
  sectionEditArray: any;
  tempSectionArray: any;
  sortableSectionPartArray: any;
  apiURL: any;
  imgURL: any;
  successMessage: any;
  errorMessage: any;
  apiFlag: any;
  redirectSecounds: any;
  public edit = {
    vehicleUID: '',
    userUID: ''
  };
  ReplaceHeadUnit: any;
  VehicleDetails: any;
  searchText: any;
  info: any;
  failureMessage: any;
  make: any;
  model: any;
  year: any;
  option1: any;
  option2: any;
  option3: any;
  option4: any;
  option5: any;
  option6: any;
  vehicleData = {
    make : '',
    model : '',
    year : '',
    option1 : '',
    option2 : '',
    option3 : '',
    option4 : '',
    option5 : '',
    option6 : '',
    userUID: '',
    roleUID: ''
  };

  AllSectionListDetailsArray: any;

  // dynamic Editable variable
  public sectionUpdateData = {
    userUID: null,
    vehicleUID: null,
    searchSectionUID: null,
    searchSectionName: null,
    updateSectionPartDetails: null,
    updateSectionGalleryDetails: null,
    updateSectionNonPartDetails:''
  }

  constructor(private http: HttpClient, private location: Location, private route: ActivatedRoute) {
    this.apiURL = environment.apiURL;
    this.imgURL = environment.imgURL;
    this.redirectSecounds = environment.redirectSecounds;
  }


  ngOnInit(): void {
    //vehicleTitle();
    
    updatePageTitle('View Vehicle');
    this.searchText = '';
    this.AllSectionListDetailsArray = [];
    this.sectionEditArray = []
    this.tempSectionArray = [];
    this.sortableSectionPartArray = [];
    this.sectionDeleteFlag = [];
    this.sectionGalleyDeleteFlag = [];
    this.sectionDeleteArray = [];
    this.sectionGalleyDeleteArray = [];
    this.apiFlag = false;
    this.errorMessage = [];
    $('#loader').show();
    //hideSearchText();
    this.edit.userUID = localStorage.getItem('user_id');
    this.route.params.subscribe(params => {
      this.edit.vehicleUID = params['id'];
    });
    this.http.post<any>(this.apiURL + '/api/getVehicleDetailsByVehicleID', this.edit)
      .subscribe(data => {
        $('#loader').hide();
        if (data.return_code == 0) {
          this.tempSectionArray = (data as any).searchSectionDetailsArray;
          /*   console.log("sectionIndex",this.tempSectionArray[0]['sectionIndex']); */
          var k = 0;
          var tempData = [];
          var check = 0;
          var check_other = 0;
          for (let i = 0; i < this.tempSectionArray.length; i++) {
            this.sectionEditArray[i] = false;
            this.sectionDeleteFlag[i] = false;
            this.sectionGalleyDeleteFlag[i] = false;
            k = 0;
            tempData = [];
            check = 0;
            for (let j = 0; j < this.tempSectionArray[i]['searchSectionPartDeatails'].length; j++) {
              /*  console.log(this.tempSectionArray[i]['searchSectionPartDeatails'][j]); */
              var DH = this.tempSectionArray[i]['searchSectionPartDeatails'][j]['partDisplayHeader'].toLowerCase();
              var partsno=0;
              if (DH != 'banner notes' && DH != 'notes' && DH != 'image' && DH != undefined) {
                this.tempSectionArray[i]['searchSectionPartDeatails'][j]['editIndex'] = i;
                this.tempSectionArray[i]['searchSectionPartDeatails'][j]['partsno'] =  j ;
                this.tempSectionArray[i]['searchSectionPartDeatails'][j]['previousDisplayHeaderValue'] =  this.tempSectionArray[i]['searchSectionPartDeatails'][j]['partDisplayHeader'] ;
                this.tempSectionArray[i]['searchSectionPartDeatails'][j]['previouspartNumberValue'] =  this.tempSectionArray[i]['searchSectionPartDeatails'][j]['partNumber'] ;

                
               
                tempData.push(this.tempSectionArray[i]['searchSectionPartDeatails'][j]);
                k++;
                check = 1;
              }
            }
            for (let z = 0; z < this.tempSectionArray[i]['searchSectionGallery'].length; z++) {
              this.tempSectionArray[i]['searchSectionGallery'][z]['galleryDetele'] = 0;
              this.tempSectionArray[i]['searchSectionGallery'][z]['fileUpload'] = null;
              this.tempSectionArray[i]['searchSectionGallery'][z]['type'] = 'image';
              this.tempSectionArray[i]['searchSectionGallery'][z]['sno'] = z;
            }
            for (let n = 0; n < this.tempSectionArray[i]['searchSectionNotes'].length; n++) {
              this.tempSectionArray[i]['searchSectionNotes'][n]['galleryDetele'] = 0;
              this.tempSectionArray[i]['searchSectionNotes'][n]['type'] = 'note';
              this.tempSectionArray[i]['searchSectionNotes'][n]['sno'] = n;
              this.tempSectionArray[i]['searchSectionNotes'][n]['previousNote'] = this.tempSectionArray[i]['searchSectionNotes'][n]['notes'];
            }
            if (check == 1) {
              this.sortableSectionPartArray[i] = tempData;
            }
          }
          this.AllSectionListDetailsArray = this.tempSectionArray;
           /* console.log('partSortable',this.sortableSectionPartArray);
            console.log('sectionSortable',this.AllSectionListDetailsArray);*/ 
          this.VehicleDetails = data.VehicleDetails != undefined ? data.VehicleDetails : [];
          this.make = this.VehicleDetails[0].Make != null ? this.VehicleDetails[0].Make : '';
          this.model = this.VehicleDetails[0].Model != null ? this.VehicleDetails[0].Model : '';
          this.year = this.VehicleDetails[0].Year != null ? this.VehicleDetails[0].Year : '';
          this.option1 = this.VehicleDetails[0].Option1 != null ? this.VehicleDetails[0].Option1 : '';
          this.option2 = this.VehicleDetails[0].Option2 != null ? this.VehicleDetails[0].Option2 : '';
          this.option3 = this.VehicleDetails[0].Option3 != null ? this.VehicleDetails[0].Option3 : '';
          this.option4 = this.VehicleDetails[0].Option4 != null ? this.VehicleDetails[0].Option4 : '';
          this.option5 = this.VehicleDetails[0].Option5 != null ? this.VehicleDetails[0].Option5 : '';
          this.option6 = this.VehicleDetails[0].Option6 != null ? this.VehicleDetails[0].Option6 : '';
          //displaySearchText(this.searchText);
          this.loadContent();
          this.searchText = this.year + " " + this.make + " " + this.model + " " + this.option1 + " " + this.option2 + " " + this.option3 + " " + this.option4 + " " + this.option5 + " " + this.option6;
          //vehicleTitle(this.searchText);
          if(Math.max(window.screen.width, window.innerWidth) < 600) {
            vehicleTitle(this.searchText);
          } else {
            vehicleTitle(this.searchText);
          } 
        }
        else {
          this.info = true;
          this.failureMessage = 'No Data Available';
          /* this.searchText = this.vehicleData.year + " " + this.vehicleData.make + " " + this.vehicleData.model + " " + this.vehicleData.option1 + " " + this.vehicleData.option2 + " " + this.vehicleData.option3 + " " + this.vehicleData.option4 + " " + this.vehicleData.option5 + " " + this.vehicleData.option6; */
          //vehicleTitle(this.searchText); 
          /* if(Math.max(window.screen.width, window.innerWidth) < 600) {
            updatePageTitle('');
          } else {
            updatePageTitle('Search Vehicle');
          } */
          this.searchText = '';
          //displaySearchText(this.searchText);
        }
      });
  }

  back(): void {
    this.location.back();
  }

  forPrint(blockid: any): void {
    processPrintDetails(blockid, this.make, this.model, this.year,
      this.option1, this.option2, this.option3, this.option4, this.option5, this.option6);
  }

  loadContent(): void {
    $("#resultbtn").show();
    $("#search_results").show();
    $(".resultbtnlist").css("visibility", "visible");
    $(".btnall").removeClass("active");
    $(".mainbtnall").addClass("active");
    this.loadGallery();
  }

  loadGallery(): void {
    setTimeout(() => {
      imageGallery()
    }, 3000);
  }

  filterSelection(c: any, btn: any): void {
    $(".mainbtnall").removeClass("active");
    $(".btnall").removeClass("active");
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
      RemoveClass(x[i], "show");
      if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
    }
    $("." + c + "").css("display", "block");
    $("#" + btn + "").addClass("active");
  }

  loadAllDetailsAgain(): void {
    $(".btnall").removeClass("active");
    this.loadContent();

    var x, i;
    x = document.getElementsByClassName("filterDiv");
    for (i = 0; i < x.length; i++) {

      AddClass(x[i], "show");
      $(x[i]).show();
    }
  }

  sectionEditFunction(index: any): void {
    this.sectionEditArray[index] = true;
  }

  sectionEditCancelFunction(index: any): void {
    this.sectionEditArray[index] = false;
    if (this.sectionDeleteFlag[index] == true) {
      for (var i=0;i<this.sectionDeleteArray[index].length;i++)
      { 
        
        var deleteArry=this.sectionDeleteArray[index][i];
        if((deleteArry.sourceName=='tbl_xVehicleDetailsNonPart' && deleteArry.searchSectionUID=='2' && deleteArry.vehicleDetailUID!=null) || deleteArry.sourceName!='tbl_xVehicleDetailsNonPart')
        {
          this.sortableSectionPartArray[index].push(this.sectionDeleteArray[index][i]);
        }
        
      }
    }
    for (var i=0;i<this.sortableSectionPartArray[index].length;i++)
    {
      this.sortableSectionPartArray[index][i]['partDisplayHeader']= this.sortableSectionPartArray[index][i]['previousDisplayHeaderValue'];
      this.sortableSectionPartArray[index][i]['partNumber']= this.sortableSectionPartArray[index][i]['previouspartNumberValue'];
    }
    this.sortableSectionPartArray[index] = [...this.sortableSectionPartArray[index]];
    this.sortableSectionPartArray[index].sort((a, b) => {
      return a.partsno - b.partsno;
     });
    this.sortableSectionPartArray[index] = [...this.sortableSectionPartArray[index]];
     this.sectionDeleteArray[index] = [];


    if (this.sectionGalleyDeleteFlag[index] == true) {
      /* console.log("noteAndGalleryDelete",this.sectionGalleyDeleteArray[index]); */
      
      for (var i=0;i<this.sectionGalleyDeleteArray[index].length;i++)
      {
        if(this.sectionGalleyDeleteArray[index][i]['type']=='note')
        {
          this.AllSectionListDetailsArray[index].searchSectionNotes.push(this.sectionGalleyDeleteArray[index][i]);
        }
        else{
          this.AllSectionListDetailsArray[index].searchSectionGallery.push(this.sectionGalleyDeleteArray[index][i]);
        }
       
      }
      
    }
    for (var i=0;i<this.AllSectionListDetailsArray[index].searchSectionNotes.length;i++)
      {
        this.AllSectionListDetailsArray[index].searchSectionNotes[i]['notes']=this.AllSectionListDetailsArray[index].searchSectionNotes[i]['previousNote'];
        this.AllSectionListDetailsArray[index].searchSectionNotes[i]['galleryDetele']=0;
      }
      for (var i=0;i<this.AllSectionListDetailsArray[index].searchSectionGallery.length;i++)
      {
        
        this.AllSectionListDetailsArray[index].searchSectionGallery[i]['galleryDetele']=0;
      }
      this.AllSectionListDetailsArray[index].searchSectionNotes = [...this.AllSectionListDetailsArray[index].searchSectionNotes];
      this.AllSectionListDetailsArray[index].searchSectionNotes.sort((a, b) => {
        return a.sno - b.sno;
       });
       this.AllSectionListDetailsArray[index].searchSectionGallery = [...this.AllSectionListDetailsArray[index].searchSectionGallery];
       this.AllSectionListDetailsArray[index].searchSectionGallery.sort((a, b) => {
        return a.sno - b.sno;
       });
       this.AllSectionListDetailsArray[index].searchSectionNotes = [...this.AllSectionListDetailsArray[index].searchSectionNotes];
       this.AllSectionListDetailsArray[index].searchSectionGallery = [...this.AllSectionListDetailsArray[index].searchSectionGallery];

       this.sectionGalleyDeleteArray[index] = [];
    
    this.sectionDeleteFlag[index] = false;
    this.sectionGalleyDeleteFlag[index] = false;

  }

  sectionRowDelete(i, data, index): void {
    
    if (this.sectionDeleteFlag[index] == false) {
      this.sectionDeleteArray[index] = [];
      this.sectionDeleteArray[index].push(data);
    }
    else {
      this.sectionDeleteArray[index].push(data);
    }
    this.sectionDeleteFlag[index] = true;
    this.sortableSectionPartArray[index].splice(i, 1);
    /*  this.ReplaceHeadUnit.splice(i,1); */
    this.sortableSectionPartArray[index] = [...this.sortableSectionPartArray[index]];
    /*  console.log("deleteSection", this.sectionDeleteArray[index]); */
    
  }

  sectionGalleryRowDelete(i, data, index, type): void {
    if (this.sectionGalleyDeleteFlag[index] == false) {
      this.sectionGalleyDeleteArray[index] = [];
      data['galleryDetele'] = 1;
      this.sectionGalleyDeleteArray[index].push(data);
    }
    else {
      data['galleryDetele'] = 1;
      this.sectionGalleyDeleteArray[index].push(data);
    }
    if (type == 'notes') {
      this.sectionGalleyDeleteFlag[index] = true;
      this.AllSectionListDetailsArray[index].searchSectionNotes.splice(i, 1);
      /*  this.ReplaceHeadUnit.splice(i,1); */
      this.AllSectionListDetailsArray[index].searchSectionNotes = [...this.AllSectionListDetailsArray[index].searchSectionNotes];
    //  console.log("deleteSection", this.sectionGalleyDeleteArray[index]);
    // console.log("remainingArray", this.AllSectionListDetailsArray[index].searchSectionNotes);
    }
    else {
      this.sectionGalleyDeleteFlag[index] = true;
      this.AllSectionListDetailsArray[index].searchSectionGallery.splice(i, 1);
      /*  this.ReplaceHeadUnit.splice(i,1); */
      this.AllSectionListDetailsArray[index].searchSectionGallery = [...this.AllSectionListDetailsArray[index].searchSectionGallery];
     // console.log("deleteSection", this.sectionGalleyDeleteArray[index]);
     // console.log("remainingArray", this.AllSectionListDetailsArray[index].searchSectionGallery);
    }

  }

  searchGalleyEvent(e, i, index): void {


    this.AllSectionListDetailsArray[index].searchSectionGallery[i]['fileUpload'] = e.target.files[0];

  }

  addNonPart(index): void {
    var data={
      "searchSectionUID": "2",
      "searchSectionName": "Speaker Fit Guide",
      "partDisplayHeader": null,
      "shortDescription": null,
      "partNumber":  null,
      "partNumber1": null,
      "partNumber2": null,
      "partValue1": null,
      "partValue2": null,
      "partValue3": null,
      "partValue4": null,
      "partValue5": null,
      "partValue6": null,
      "partValue7": null,
      "partValue8": null,    
      "note": null,
      "web": null,
      "description": null,
      "vehicleDetailUID":  null,
      "partUID": null,
      "vehicleImage": null,
      "BrandName": null,
      "displayOrder": null,
      "partDisplayOrder": null,
      "sourceName": "tbl_xVehicleDetailsNonPart",
      "MSRP": null,
      "LaborHours": null,
      "picture": null,
      "editIndex": index,
      "partsno": 1,
      "previousDisplayHeaderValue":  null,
      "previouspartNumberValue":  null,
  };
 
    this.sortableSectionPartArray[index].push(data);
    this.sortableSectionPartArray[index] = [...this.sortableSectionPartArray[index]];
    
  }

  sectionNonPartDetailsSave(e, index): void {
    //  console.log("nonpartupdate",this.sortableSectionPartArray[index]);
    //  console.log("nonpartDelete",this.sectionDeleteArray[index]);
    this.sectionEditArray[index] = false; 
    this.apiFlag = true;
     var nonPart=[];
     var j=0;
     if(this.sortableSectionPartArray[index]!=undefined)
     {
      this.sortableSectionPartArray[index].forEach((element, index) => {

        nonPart[j]=element;
        nonPart[j]['Delete']=0;
        nonPart[j]['Insert']=element.vehicleDetailUID==null?0:1;
        
        j++;
    });
     }
     if(this.sectionDeleteArray[index]!=undefined)
     {
      this.sectionDeleteArray[index].forEach((element, index) => {
       
        nonPart[j]=element;
        nonPart[j]['Delete']=1;
        nonPart[j]['Insert']=1;
        j++;
    });
     }
    this.http.post<any>(this.apiURL + '/api/updatesectionnonpartdetails', {userUID:localStorage.getItem('user_id'),vehicleUID:this.edit.vehicleUID,NonPart:nonPart})
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.sortableSectionPartArray[index]=data.updatedRecords;
          this.sortableSectionPartArray[index].sort((a, b) => {
            return a.partsno - b.partsno;
           });
          this.sortableSectionPartArray[index] = [...this.sortableSectionPartArray[index]];
          this.sectionDeleteArray[index] = [];
          this.sectionGalleyDeleteArray[index] = [];
          this.sectionDeleteFlag[index] = false;
          this.sectionGalleyDeleteArray[index] = false;
          this.successMessage = 'Edited Successfully !';
          document.getElementById('info_success').style.display = 'block';
          setTimeout(() => {
            this.close1();
          }, this.redirectSecounds);
        }
        else {
          this.successMessage = data.errors[0];
          document.getElementById('info_alert').style.display = 'block';
        }
      });
  }
  
  sectionDetailsSave(e, index, sectionUID, sectionName): void {
    const myFormData = new FormData();
    var galleryImagePostion = 0;
    this.sectionEditArray[index] = false;
    this.apiFlag = true;
    this.sectionUpdateData.userUID = localStorage.getItem('user_id');
    this.sectionUpdateData.searchSectionName = sectionName;
    this.sectionUpdateData.searchSectionUID = sectionUID;
    this.sectionUpdateData.vehicleUID = this.edit.vehicleUID;
    let SectionarrayString = [];
    if (this.sectionDeleteFlag[index] == true) {
      this.sortableSectionPartArray[index].forEach((element, index) => {
        if (element.partDisplayHeader.toLowerCase() != 'warning' && element.partDisplayHeader.toLowerCase() != 'banner img' &&
          element.partDisplayHeader.toLowerCase() != 'banner notes' && element.partDisplayHeader.toLowerCase() != 'picturegallery' && element.searchSectionUID == sectionUID) {

            
            SectionarrayString.push({
              "vehicleDetailUID":element.vehicleDetailUID,
              "partUID":element.partUID,
              "shortDescription":element.shortDescription,
              "displayHeader":element.partDisplayHeader,
              "partNumber":element.partNumber,
              "MSRP":element.MSRP,
              "flowLine":element.flowLine,
              "LaborHours":element.LaborHours,
              "partDisplayOrder":(index + 1),
              "partDelete":0,
              "sourceName":element.sourceName,
              "vehicleImage":element.vehicleImage
            });
        

        }
        if (element.partDisplayHeader.toLowerCase() == 'warning' && element.searchSectionUID == sectionUID) {

          SectionarrayString.push({
            "vehicleDetailUID":element.vehicleDetailUID,
            "partUID":element.partUID,
            "shortDescription":element.shortDescription,
            "displayHeader":element.partDisplayHeader,
            "partNumber":element.partNumber,
            "MSRP":element.MSRP,
            "flowLine":element.flowLine,
            "LaborHours":element.LaborHours,
            "partDisplayOrder":(index + 1),
            "partDelete":0,
            "sourceName":element.sourceName,
            "vehicleImage":element.vehicleImage
          });

      
        }
      });
      // Deleted Array Store
      let SeactionarrayStringDel = '';
      this.sectionDeleteArray[index].forEach((element, index) => {
        if (element.searchSectionUID == sectionUID) {

          SectionarrayString.push({
             "vehicleDetailUID":element.vehicleDetailUID,
             "partUID":element.partUID,
             "shortDescription":element.shortDescription,
             "displayHeader":element.partDisplayHeader,
             "partNumber":element.partNumber,
             "MSRP":element.MSRP,
             "flowLine":element.flowLine,
             "LaborHours":element.LaborHours,
             "partDelete":1,
             "sourceName":element.sourceName,
             "vehicleImage":element.vehicleImage
          });

        }
      });
     
      this.sectionUpdateData.updateSectionPartDetails = SectionarrayString;
    } else {
      var partInsertCount = 0;
      
     // console.log(JSON.stringify(this.sortableSectionPartArray)); 
      this.sortableSectionPartArray[index].forEach((element, index) => {
        if (element.partDisplayHeader.toLowerCase() != 'warning' && element.partDisplayHeader.toLowerCase() != 'banner img' &&
          element.partDisplayHeader.toLowerCase() != 'banner notes' && element.partDisplayHeader.toLowerCase() != 'picturegallery' && element.searchSectionUID == sectionUID) {


            SectionarrayString.push({
              "vehicleDetailUID":element.vehicleDetailUID,
              "partUID":element.partUID,
              "shortDescription":element.shortDescription,
              "displayHeader":element.partDisplayHeader,
              "partNumber":element.partNumber,
              "MSRP":element.MSRP,
              "flowLine":element.flowLine,
              "LaborHours":element.LaborHours,
              "partDisplayOrder":(index + 1),
              "partDelete":0,
              "sourceName":element.sourceName,
              "vehicleImage":element.vehicleImage
            });


          partInsertCount = 1;
        }
        if (element.partDisplayHeader.toLowerCase() == 'warning' && element.searchSectionUID == sectionUID) {

          SectionarrayString.push({
            "vehicleDetailUID":element.vehicleDetailUID,
            "partUID":element.partUID,
            "shortDescription":element.shortDescription,
            "displayHeader":element.partDisplayHeader,
            "partNumber":element.partNumber,
            "MSRP":element.MSRP,
            "flowLine":element.flowLine,
            "LaborHours":element.LaborHours,
            "partDisplayOrder":(index + 1),
            "partDelete":0,
            "sourceName":element.sourceName,
            "vehicleImage":element.vehicleImage
          });

        }
      });
      this.sectionUpdateData.updateSectionPartDetails = SectionarrayString;
    }

    if (this.sectionGalleyDeleteFlag[index] == true) {
      this.sectionUpdateData.updateSectionGalleryDetails = [];
      this.AllSectionListDetailsArray[index]['searchSectionNotes'].forEach((element, index) => {
        this.sectionUpdateData.updateSectionGalleryDetails.push(element);
      });

      this.AllSectionListDetailsArray[index]['searchSectionGallery'].forEach((element, index) => {

        if (element.fileUpload != null) {
          myFormData.append("galleryImage[]", element.fileUpload);
          element.fileUpload = galleryImagePostion;
          galleryImagePostion++;
        }
        this.sectionUpdateData.updateSectionGalleryDetails.push(element);
      });
      this.sectionGalleyDeleteArray[index].forEach((element, index) => {
        this.sectionUpdateData.updateSectionGalleryDetails.push(element);

      });
    }
    else {
      this.sectionUpdateData.updateSectionGalleryDetails = [];
      this.AllSectionListDetailsArray[index]['searchSectionNotes'].forEach((element, index) => {
        this.sectionUpdateData.updateSectionGalleryDetails.push(element);
      });
      this.AllSectionListDetailsArray[index]['searchSectionGallery'].forEach((element, index) => {
        if (element.fileUpload != null) {
          myFormData.append("galleryImage[]", element.fileUpload);
          element.fileUpload = galleryImagePostion;
          galleryImagePostion++;
        }
        this.sectionUpdateData.updateSectionGalleryDetails.push(element);
      });
    }
    this.errorMessage = [];
    this.successMessage = "";
    // console.log("updateSectionPartDetails",this.sectionUpdateData);
    myFormData.append("updateSectionAllDetails", JSON.stringify(this.sectionUpdateData));
    this.http.post<any>(this.apiURL + '/api/updatesectiondetails', myFormData)
      .subscribe(data => {
        document.getElementById('text').style.display = 'none';
        if (data.return_code == 0) {
          this.sectionDeleteArray[index] = [];
          this.sectionGalleyDeleteArray[index] = [];
          this.sectionDeleteFlag[index] = false;
          this.sectionGalleyDeleteArray[index] = false;
          this.sectionUpdateData.userUID = null;
          this.sectionUpdateData.vehicleUID = null;
          this.sectionUpdateData.searchSectionUID = null;
          this.sectionUpdateData.searchSectionName = null;
          this.sectionUpdateData.updateSectionPartDetails = null;
          this.sectionUpdateData.updateSectionGalleryDetails = null;
          this.successMessage = 'Edited Successfully !';
          document.getElementById('info_success').style.display = 'block';
          data.updateDetails.forEach((element, index) => {
            if (element != 1) {
              this.errorMessage[index] = element;
            }
          });
          setTimeout(() => {
            this.close1();
          }, this.redirectSecounds);
        }
        else {
          this.successMessage = data.errors[0];
          document.getElementById('info_alert').style.display = 'block';
        }
      });
  }

  close1(): void {
    this.apiFlag = false;
  }

}

