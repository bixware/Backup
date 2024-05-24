/**
* Feedback Page
*/
import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Helmet } from "react-helmet";
// components
import FeedbacksListing from './components/FeedbacksListings';
import AddNewFeedback from './components/AddNewFeedback';
import FeedbackDetail from './components/FeedbackDetail';
import SearchIdeas from './components/SearchIdeas';
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// intl messages
import IntlMessages from 'Util/IntlMessages';
// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
// actions
import { onChangeFeedbackPageTabs, getFeedbacks } from 'Store/Actions';
// For Tab Content
function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}

function FeedbackPage(props){
   const dispatch = useDispatch();
   const feedback = useSelector(state => state.feedback)

	useEffect(() => {
      dispatch(getFeedbacks());
      // eslint-disable-next-line react-hooks/exhaustive-deps
   },[]) 

	const handleChange = (event, value) => {
      console.log(value,'value')
		dispatch(onChangeFeedbackPageTabs(value));
	}

   const { selectedTab, selectedFeedback, loading, totalFeedbacksCount, plannedFeedbacksCount, progressFeedbacksCount } = feedback;
   return (
      <div className="feedback-wrapper">
         <Helmet>
            <title>Feedback</title>
            <meta name="description" content="Reactify Feedback Page" />
         </Helmet>
         <PageTitleBar title={<IntlMessages id="sidebar.feedback" />} match={props.match} />
         {selectedFeedback === null ?
            <div>
               <SearchIdeas />
               <RctCollapsibleCard customClasses="rct-tabs">
                  {loading &&
                     <div className="d-flex justify-content-center loader-overlay">
                        <CircularProgress />
                     </div>
                  }
                  <AppBar position="static">
                     <Tabs
                        value={selectedTab}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="off"
                        indicatorColor="primary"
                        textColor="primary"
                     >
                        <Tab label={`All (${totalFeedbacksCount})`} />
                        <Tab label={`Planned (${plannedFeedbacksCount})`} />
                        <Tab label={`In Progress (${progressFeedbacksCount})`} />
                        <Tab label="Add New" />
                     </Tabs>
                  </AppBar>
                  {selectedTab === 0 && <TabContainer><FeedbacksListing /></TabContainer>}
                  {selectedTab === 1 && <TabContainer><FeedbacksListing /></TabContainer>}
                  {selectedTab === 2 && <TabContainer><FeedbacksListing /></TabContainer>}
                  {selectedTab === 3 &&
                     <TabContainer>
                        <AddNewFeedback />
                     </TabContainer>}
               </RctCollapsibleCard>
            </div>
            : <FeedbackDetail />
         }
      </div>
   );
}


export default FeedbackPage;
