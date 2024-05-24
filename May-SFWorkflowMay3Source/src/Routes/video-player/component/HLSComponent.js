import React, { useEffect } from 'react';
import Hls from 'hls.js';

export default function HLSComponent(props){
   
   let hls = new Hls();

   useEffect(() => {
      const { src, video } = props;
      // `src` is the property get from this component
      // `video` is the property insert from `Video` component
      // `video` is the html5 video element
      // load hls video source base on hls.js
      if (Hls.isSupported()) {
         hls.loadSource(src);
         hls.attachMedia(video);
         hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
         });
      }
      return() =>{
         if (hls) {
            hls.destroy();
         }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])

   return (
      <source
         src={props.src}
         type={props.type || 'application/x-mpegURL'}
      />
   );
}