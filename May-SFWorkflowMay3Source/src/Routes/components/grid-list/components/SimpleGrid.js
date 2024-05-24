/**
* Simple Grid List
*/
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { ImageList, ImageListItem } from '@material-ui/core';

// data File
import tileData from './tileData';

function ImageGridList(props) {
   return (
      <div>
         <Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={450}>
            <ImageList>
               {tileData.map(tile => (
                  <ImageListItem key={tile.img} cols={tile.cols || 1}>
                  <img src={tile.img} alt={tile.title} />
                  </ImageListItem>
               ))}
            </ImageList>
         </Scrollbars>
      </div>
   );
}

export default ImageGridList;
