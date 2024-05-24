//Image Cropper

import React, { useState, useRef } from 'react';
import Cropper from 'react-cropper';
import { FormGroup, FormText, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

let imageSrc = 'https://reactify.theironnetwork.org/data/images/nature-poster.jpg';

function ImageCropper(props) {
   const [src, setSrc] = useState(imageSrc);
   const [cropResult, setCropResult] = useState(null);
   const cropper = useRef(null);

   const onChange = (e) => {
      e.preventDefault();
      let files;
      if (e.dataTransfer) {
         files = e.dataTransfer.files;
      } else if (e.target) {
         files = e.target.files;
      }
      const reader = new FileReader();
      reader.onload = () => {
         setSrc(reader.result);
      };
      reader.readAsDataURL(files[0]);
   }

   const cropImage = () => {
      const imageElement = cropper.current;
      setCropResult(imageElement.cropper.getCroppedCanvas().toDataURL());
   }

   const useDefaultImage = () => {
      setSrc(src);
   }

   return (
      <div className="image-cropper-wrap">
         <PageTitleBar title={<IntlMessages id="sidebar.imageCropper" />} match={props.match} />
         <div className="row">
            <RctCollapsibleCard
               colClasses="col-sm-12 col-md-12 col-lg-6"
               heading={<IntlMessages id="button.cropImage" />}
               contentCustomClasses="crop-wrapper"
            >
               <div>
                  <Cropper
                     style={{ height: 400, width: '100%' }}
                     preview=".img-preview"
                     guides={true}
                     src={src}
                     ref={cropper}
                  />
                  <FormGroup className="mt-20 mb-20 d-flex justify-space-between align-items-center">
                     <div className="w-30 mb-10 mb-md-0">
                        <Input type="file" name="file" id="exampleFile" onChange={(e) => onChange(e)} />
                        <FormText color="muted">
                           Choose an image to resize.
                        </FormText>
                     </div>
                     <h3 className="w-40 text-center  mb-10 mb-md-0">OR</h3>
                     <div className="d-sm-flex justify-content-end align-items-center w-30">
                        <Button onClick={useDefaultImage} variant="contained" color="primary" className="text-white">
                           <IntlMessages id="button.useDefaultImage" />
                        </Button>
                     </div>
                  </FormGroup>
                  <div className="d-flex align-items-center justify-content-center mb-10">
                     <Button onClick={cropImage} variant="contained" className="bg-success text-white w-100">
                        <IntlMessages id="button.cropImage" />
                     </Button>
                  </div>
               </div>
            </RctCollapsibleCard>
            <RctCollapsibleCard
               colClasses="col-sm-12 col-md-12 col-lg-6"
               heading={<IntlMessages id="widgets.preview" />}
               contentCustomClasses="d-flex"
            >
               <div className="img-preview" style={{ width: '100%', float: 'left', height: 300 }} />
            </RctCollapsibleCard>
            {cropResult &&
               <RctCollapsibleCard
                  colClasses="col-sm-12 col-md-12 col-lg-6"
                  heading={<IntlMessages id="widgets.croppedImage" />}
               >
                  <img style={{ width: '100%' }} src={cropResult} alt="cropped_img" />
               </RctCollapsibleCard>
            }
         </div>
      </div>
   );
}
export default ImageCropper;