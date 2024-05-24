/**
 * Leaflet Map
 */
import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// intl messages
import IntlMessages from 'Util/IntlMessages';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

function LeafletMap(props){
   const lat = 51.505;
   const lng = -0.09;
   const zoom = 13;

   const position = [lat, lng];
   return (
      <div className="map-wrapper">
         <PageTitleBar title={<IntlMessages id="sidebar.leafletMaps" />} match={props.match} />
         <RctCollapsibleCard>
            <Map center={position} zoom={zoom}>
            <TileLayer
               attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
               url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            <Marker position={position}>
               <Popup>
                  <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
               </Popup>
            </Marker>
            </Map>
         </RctCollapsibleCard>
      </div >
   );
}

export default LeafletMap;
