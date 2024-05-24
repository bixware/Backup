/**
 * Gallery
 */
import React, { useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
// api
import api from 'Api';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

function Gallery(props) {
   const [galleryImages, setGalleryImages] = useState(null)

   useEffect(() => {
      getGalleryImages();
   },[])
   
	// get gallery images
	const getGalleryImages = () => {
		api.get('galleryImages.js')
			.then((response) => {
            setGalleryImages(response.data);
			})
			.catch(error => {
				// error handling
			})
	}

   return (
      <div className="gallery-wrapper">
         <Helmet>
            <title>Gallery</title>
            <meta name="description" content="Reactify Gallery" />
         </Helmet>
         <PageTitleBar title={<IntlMessages id="widgets.gallery" />} match={props.match} />
         <div className="row">
            {galleryImages && galleryImages.map((image, key) => (
               <div className="col-sm-6 col-md-4 col-lg-4 col-xl-3" key={key}>
                  <figure className="img-wrapper">
                     <img src={image.imageUrl} className="img-fluid" alt="gallery 1" />
                     <figcaption>
                        <h4>{image.caption}</h4>
                        <h2>{image.title}</h2>
                     </figcaption>
                     <a href="!#" onClick={e => e.preventDefault()}>&nbsp;</a>
                  </figure>
               </div>
            ))}
         </div>
      </div>
   );
}

export default Gallery;
