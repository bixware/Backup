import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
declare var updatePageTitle: any;
@Component({
  selector: 'app-memberbenefits',
  templateUrl: './memberbenefits.component.html',
  styleUrls: ['./memberbenefits.component.css']
})
export class MemberbenefitsComponent implements OnInit {
  ImageLink: any;
  blobURL: any;
  apiURL: any;
  UserUID: any;
  imgURL: any;
  apiFlag = false;
  imagelink: any;
  message: string = "";
  addImageForm: FormGroup;
  editImageForm: FormGroup;
  editImage: any;
  fileInput: any;
  filedata: any;
  submitted = false;
  formData = {
    link: '',
    image: null,
    userUID: ''
  };
  imageBlob: Blob;
  successMessage: any;
  showForm: boolean = false;
  updateApi = false;
  errorFlag = false;
  errorMsg = "";
  fixedWidth = 235;
  fixedHeight = 150;
  submitButtonName = "Add"
  imagePreview: string | ArrayBuffer | null;
  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder, private renderer: Renderer2) { this.apiURL = environment.apiURL; this.imgURL = environment.imgURL; this.blobURL = environment.blobURL }

  resetFileInput() {
    const fileInput = document.getElementById('image') as HTMLInputElement;
    fileInput.value = '';
  }

  handleFileInput(event) {
    const file = (event.target as HTMLInputElement).files[0];
    const validImageTypes: string[] = ['image/png', 'image/jpeg', 'image/gif'];

    if (!validImageTypes.includes(file.type)) {
      $('#image').val(''); // Clear the file input value
      this.errorMsg = 'Please upload an image file only (PNG, JPEG, GIF)';
      this.errorFlag = true;
      return;
    }
    console.log(file)
    this.addImageForm.patchValue({
      ImageFile: file
    });
    this.addImageForm.get('ImageFile').updateValueAndValidity();
  }

  handleFileDelete(event) {
    console.log(event.benefitUID)
    let data = {
      "benefitUID": event.benefitUID
    }
    this.apiFlag = true
    this.httpClient.post<any>(this.apiURL + '/api/deletemembenefits', data)
      .subscribe(data => {
        console.log(data)
        if (data.return_code == 0) {
          document.getElementById('text').style.display = 'none';
          this.successMessage = 'Member Benefit Deleted';
          document.getElementById('info_success').style.display = 'block';
          this.getImage();
          setTimeout(() => {
            this.close1();
            this.apiFlag = false;
          }, 5000);
          this.onReset();
          this.resetFileInput();
        } else {
          this.successMessage = data.err_message;
          document.getElementById('info_alert').style.display = 'block';
          this.getImage();
        }
      })

  }
  handleFileEdit(event) {
    this.updateApi = true
    this.submitButtonName = "Edit"
    console.log(event)
    let data = event.benefitUID
    // this.httpClient.post<any>(this.apiURL + '/api/editmembenefit', data)
    this.httpClient.post<any>(this.apiURL + `/api/editmembenefit/${data}`, {})
      .subscribe(data => {
        console.log(data)
        if (data.return_code == 0) {
          this.getImages(this.imgURL + 'storage/app/public/uploads/memberbenefit/' + data.benefit_details[0].imageName, data.benefit_details[0].imageName);
          this.editImage = data.benefit_details
          console.log(this.editImage)
          this.addImageForm.patchValue({
            ImageLink: this.editImage[0].imageLink
          });
        } else {
          alert("else worked")
        }
      })
  }
  getImages(url: any, fileData: any) {
    this.fileInput = document.querySelector('input[type="file"]');
    this.httpClient.get(url, { responseType: 'blob' })
      .subscribe(blob => {
        this.imageBlob = blob;
        const myFile = new File([blob], fileData, {
          type: blob.type,
        });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(myFile);
        this.addImageForm.controls['ImageFile'].setValue(dataTransfer.files[0])
        this.fileInput.files = dataTransfer.files
        this.addImageForm.patchValue({
          ImageFile: dataTransfer.files[0]
        });
        console.log(myFile)
      });
  }
  onReset() {
    this.submitted = false;
    this.addImageForm.reset();
    // this.addImageForm.value.ImageFile.reset()
  }
  close1(): void {
    // document.getElementById('text').style.display = 'none';
    $('#text').css('display', 'none');
    this.apiFlag = false;
  }
  onCancel() {
    this.onReset()
    this.resetFileInput();
    this.submitButtonName = "Add"
  }
  onSubmit() {

    this.submitted = true;
    if (this.addImageForm.invalid) {
      this.errorFlag = false;
      return;
    }

    if (this.updateApi == true) {
      const formData1 = new FormData();
      formData1.append('userUID', localStorage.getItem('user_id'));
      formData1.append('imageLink', this.addImageForm.value.ImageLink);
      formData1.append('Picture', this.addImageForm.value.ImageFile);
      console.log(this.addImageForm.value.ImageFile)
      formData1.append('benefitUID', this.editImage[0].benefitUID)
      this.apiFlag = true;
      console.log(formData1)
      this.httpClient.post<any>(this.apiURL + '/api/updatemembenefit', formData1).subscribe(
        (response) => {
          // console.log('Response:', response);
          if (response.return_code == 0) {
            this.successMessage = 'Member Benefit Updated'
            document.getElementById('info_success').style.display = 'block';
            setTimeout(() => {
              this.close1();
              this.apiFlag = false;
            }, 5000);
            this.onReset();
            this.resetFileInput();
            this.getImage();
            this.updateApi = false
            this.submitButtonName = "Add"

          }
          else {
            this.successMessage = response.err_message;
            document.getElementById('info_alert').style.display = 'block';
            this.updateApi = false
            this.submitButtonName = "Add"
            this.apiFlag = false;
          }
        },
        (error) => {
          console.error('Error:', error);
          this.updateApi = false
          this.submitButtonName = "Add"
        }
      );
    } else {
      this.submitButtonName = "Add"
      const formData = new FormData();
      formData.append('userUID', localStorage.getItem('user_id'));
      formData.append('imageLink', this.addImageForm.value.ImageLink);
      formData.append('Picture', this.addImageForm.value.ImageFile);
      this.apiFlag = true;
      console.log(formData)
      this.httpClient.post<any>(this.apiURL + '/api/addmembenefit', formData).subscribe(
        (response) => {
          if (response.return_code == 0) {
            // console.log('Response:', response);
            this.successMessage = 'Member Benefit Added'
            document.getElementById('info_success').style.display = 'block';
            this.getImage();
            this.onReset();
            this.resetFileInput();
            setTimeout(() => {
              this.close1();
              this.apiFlag = false;
            }, 5000);
            this.submitButtonName = "Add"

          } else {
            this.successMessage = response.err_message;
            document.getElementById('info_alert').style.display = 'block';
            this.submitButtonName = "Add"
            this.apiFlag = false;
          }
        },
        (error) => {
          console.error('Error:', error);
          this.submitButtonName = "Add"
        }
      );
    }
  }

  ngOnInit(): void {
    let roleid = localStorage.getItem('role_id')
    console.log(roleid)
    if (roleid === '1') {
      this.showForm = true; // Show the form for admin users
    } else {
      this.showForm = false; // Hide the form for other users
    }
    updatePageTitle('Member Benefits');
    this.addImageForm = this.formBuilder.group({
      // ImageLink: ['', Validators.required],
      ImageLink: ['', [Validators.required, this.imageUrlValidator()]],
      ImageFile: [null, Validators.required]
    })
    this.getImage()
  }
  imageUrlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const urlPattern = new RegExp('^(https?:\\/\\/)?' +
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' +
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // 
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
        '(\\?[;&a-z\\d%_.~+=-]*)?' +
        '(\\#[-a-z\\d_]*)?$', 'i');
      if (!control.value) {
        return null;
      }
      try {
        const url = new URL(control.value);
        const validProtocols = ['http:', 'https:'];
        const isValidProtocol = validProtocols.includes(url.protocol);
        return isValidProtocol ? null : { invalidUrl: true };
      } catch (_) {
        return { invalidUrl: true };
      }
    };
  }

  get f() { return this.addImageForm.controls; }
  get e() { return this.editImageForm.controls; }

  getImage() {
    this.UserUID = localStorage.getItem('user_id');
    this.httpClient.post<any>(this.apiURL + '/api/membenefitlist', { "userUID": this.UserUID })
      .subscribe(data => {
        if (data.return_code == 0) {
          console.log("bannerimage", data.memberbenefitList)
          this.imagelink = (data as any).memberbenefitList;
          let imagePath = "storage/app/public/uploads/memberbenefit/";
          let jsonString = '['
          for (let i = 0; i < data.memberbenefitList.length; i++) {
            let temp = this.imgURL + imagePath + data.memberbenefitList[i].imageName;
            jsonString += '{"imagePath": "' + temp + '","bannerURL":"' + data.memberbenefitList[i].imageLink + '","benefitUID":"' + data.memberbenefitList[i].benefitUID + '"}';
            if (i !== (data.memberbenefitList.length - 1)) {
              jsonString += ',';
            }
          }
          jsonString += ']';
          this.imagelink = JSON.parse(jsonString);
          console.log("final Value", this.imagelink);
        }
      })

  }
}
