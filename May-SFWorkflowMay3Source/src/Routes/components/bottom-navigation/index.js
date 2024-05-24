/**
 * Bottom Navigation
 */
import React, { useState } from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
// intl messages
import IntlMessages from 'Util/IntlMessages';

function BottomNavigationComponent(props) {
   const [example1, setExample1] = useState('recents');
   const [example2, setExample2] = useState('recents');
   const [example3, setExample3] = useState('recents');

  /**
   * Hanlde Change Tab
   */
   const handleChange = (key, value) => {
      key(value);
   }
   
   return (
      <div className="button-nav-wrapper">
         <PageTitleBar title={<IntlMessages id="sidebar.bottomNavigations" />} match={props.match} />
         <div className="row">
            <RctCollapsibleCard
               heading={<IntlMessages id="widgets.buttonNavigationWithNoLabel" />}
               colClasses="col-sm-12 col-md-4 col-xl-4 b-100"
            >
               <BottomNavigation value={example1} onChange={(e, value) => handleChange(setExample1, value)}>
                  <BottomNavigationAction label="Recents" value="recents" icon={<i className="zmdi zmdi-time-restore zmdi-hc-lg"></i>} />
                  <BottomNavigationAction label="Favorites" value="favorites" icon={<i className="zmdi zmdi-favorite zmdi-hc-lg"></i>} />
                  <BottomNavigationAction label="Nearby" value="nearby" icon={<i className="zmdi zmdi-pin zmdi-hc-lg"></i>} />
                  <BottomNavigationAction label="Folder" value="folder" icon={<i className="zmdi zmdi-folder zmdi-hc-lg"></i>} />
               </BottomNavigation>
            </RctCollapsibleCard>
            <RctCollapsibleCard
               heading="Bottom Navigation With Labels"
               colClasses="col-sm-12 col-md-4 col-xl-4 b-100"
            >
               <BottomNavigation value={example2} onChange={(e, value) => handleChange(setExample2, value)} showLabels>
                  <BottomNavigationAction label="Recents" icon={<i className="zmdi zmdi-time-restore zmdi-hc-lg"></i>} />
                  <BottomNavigationAction label="Favorites" icon={<i className="zmdi zmdi-favorite zmdi-hc-lg"></i>} />
                  <BottomNavigationAction label="Nearby" icon={<i className="zmdi zmdi-pin zmdi-hc-lg"></i>} />
               </BottomNavigation>
            </RctCollapsibleCard>
            <RctCollapsibleCard
               heading={<IntlMessages id="widgets.iconNavigation" />}
               colClasses="col-sm-12 col-md-4 col-xl-4 b-100"
            >
               <BottomNavigation value={example3} onChange={(e, value) => handleChange(setExample3, value)}>
                  <BottomNavigationAction icon={<i className="zmdi zmdi-time-restore zmdi-hc-lg"></i>} />
                  <BottomNavigationAction icon={<i className="zmdi zmdi-favorite zmdi-hc-lg"></i>} />
                  <BottomNavigationAction icon={<i className="zmdi zmdi-pin zmdi-hc-lg"></i>} />
                  <BottomNavigationAction icon={<i className="zmdi zmdi-folder zmdi-hc-lg"></i>} />
               </BottomNavigation>
            </RctCollapsibleCard>
         </div>
      </div>
   );
}

export default BottomNavigationComponent;
