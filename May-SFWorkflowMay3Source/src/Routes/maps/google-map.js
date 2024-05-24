/**
 * Google Map
 */
import React from 'react';
import GoogleMap from 'google-map-react';
import PropTypes from 'prop-types';
// intl messages
import IntlMessages from 'Util/IntlMessages';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

function GoogleMapComponent(props) {
   const renderMarkers = (map, maps) => {
      new maps.Marker({
         position: { lat: 51.5074, lng: 0.1278 },
         map,
         title: 'London'
      });
   }
   return (
      <div className="map-wrapper">
        <PageTitleBar title={<IntlMessages id="sidebar.googleMaps" />} match={props.match} />
        <RctCollapsibleCard heading="Google Maps">
          <GoogleMap
            bootstrapURLKeys={{ key: "AIzaSyBtdO5k6CRntAMJCF-H5uZjTCoSGX95cdk" }}
            yesIWantToUseGoogleMapApiInternals={true}
            center={props.center}
            zoom={props.zoom} style={{ position: 'relative', width: '100%', height: 400 }}
            onGoogleApiLoaded={({ map, maps }) => renderMarkers(map, maps)}
          />
        </RctCollapsibleCard>
      </div>
   );
}

GoogleMapComponent.propTypes = {
   center: PropTypes.array,
   zoom: PropTypes.number,
   greatPlaceCoords: PropTypes.any
};
GoogleMapComponent.defaultProps = {
   center: [51.5074, 0.1278],
   zoom: 9,
   greatPlaceCoords: { lat: 51.5074, lng: 0.1278 }
};

export default GoogleMapComponent;