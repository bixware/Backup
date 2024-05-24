//Dropzone

import React from 'react';
import DropzoneComponent from 'react-dropzone-component';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

function Dropzone(props) {
   // For a full list of possible configurations,
   // please consult http://www.dropzonejs.com/#configuration
   const djsConfig = {
      addRemoveLinks: true,
      acceptedFiles: "image/jpeg,image/png,image/gif"
   };

   const componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: '/'
   };

      // If you want to attach multiple callbacks, simply
      // create an array filled with all your callbacks.
   const callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

      // // Simple callbacks work too, of course
   const callback = () => console.log('Hello!');

   const success = file => console.log('uploaded', file);

   const removedfile = file => console.log('removing...', file);

   // let dropzone = null;

   // For a list of all possible events (there are many), see README.md!
   const eventHandlers = {
      init: dz => dz,
      drop: callbackArray,
      addedfile: callback,
      success: success,
      removedfile: removedfile
   }

   return (
      <div className="dropzone-wrapper">
         <PageTitleBar title={<IntlMessages id="sidebar.dropzone" />} match={props.match} />
         <div className="row">
            <RctCollapsibleCard
               colClasses="col-sm-12 col-md-12 col-lg-12"
               heading={<IntlMessages id="sidebar.dropzone" />}
            >
               <DropzoneComponent
                  config={componentConfig}
                  eventHandlers={eventHandlers}
                  djsConfig={djsConfig}
               />
            </RctCollapsibleCard>
         </div>
      </div>
   )
}
export default Dropzone;
