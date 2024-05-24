/**
* Advanced Grid List
*/
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { ImageList, ImageListItem, ImageListItemBar, IconButton} from '@material-ui/core';

// data File
import tileData from './tileData';

function ImageGridList(props) {
	return (
		<div>
			<Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={450}>
				<ImageList gap={3}>
					{tileData.map(tile => (
						<ImageListItem key={tile.img} cols={tile.featured ? 3 : 1} rows={tile.featured ? 2 : 1}>
							<img className="img-fluid" src={tile.img} alt={tile.title} />
							<ImageListItemBar className="gradient-overlay" title={tile.title} position="top"
								actionIcon={<IconButton> <i className="zmdi zmdi-star text-white"></i> </IconButton>} actionPosition="left" />
						</ImageListItem>
					))}
				</ImageList>
			</Scrollbars>
		</div>
	);
}

export default ImageGridList;
