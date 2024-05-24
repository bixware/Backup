/**
 * Email Prefrences Page
 */
import React, { useState } from 'react';
import Switch from 'react-toggle-switch';
import Button from '@material-ui/core/Button';
import { FormGroup, Input } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import CircularProgress from '@material-ui/core/CircularProgress';

// intl messages
import IntlMessages from 'Util/IntlMessages';

export default function EmailPrefrences(){
   const [featuresAnnouncements, setFeaturesAnnouncements] = useState(true);
   const [tipsRecommendations, setTipsRecommendations] = useState(true);
   const [inbox,setInbox] = useState(false);
   const [communityActivity, setCommunityActivity] = useState(false);
   const [research, setResearch] = useState(true);
   const [newsletter, setNewsletter] = useState(false);
   const [loading, setLoading] = useState(false);
   
   // toggle switch
   const toggleSwitch = (key) => {
      key(!key);
   }

   // on save changes
   const onSaveChanges = () => {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
         NotificationManager.success('Changes Save Successfully!');
      }, 1500);
   }

   return (
      <div className="prefrences-wrapper">
         <div className="row">
            <div className="col-sm-12 col-md-8">
               <div className="search-filter p-0 mb-50">
                  <form>
                     <h2 className="heading"><IntlMessages id="widgets.updateYourEmailAddress" /></h2>
                     <FormGroup className="mb-0 w-40">
                        <Input type="search" className="input-lg" name="search" placeholder="info@example.com" />
                     </FormGroup>
                     <Button variant="contained" color="primary" className="text-white btn-lg">
                        <IntlMessages id="button.save" />
                     </Button>
                  </form>
               </div>
               <ul className="list-unstyled">
                  <li className="d-flex justify-content-between">
                     <div className="">
                        <h5>Features & Announcements</h5>
                        <p>New products and feature updates, as well as occasional company announcements.</p>
                     </div>
                     <Switch
                        onClick={() => toggleSwitch(setFeaturesAnnouncements)}
                        on={featuresAnnouncements}
                     />
                  </li>
                  <li className="d-flex justify-content-between">
                     <div className="">
                        <h5>Tips & Recommendations</h5>
                        <p>Timely advice to help you make the most of our features.</p>
                     </div>
                     <Switch
                        onClick={() => toggleSwitch(setTipsRecommendations)}
                        on={tipsRecommendations}
                     />
                  </li>
                  <li className="d-flex justify-content-between">
                     <div className="">
                        <h5>Inbox</h5>
                        <p>Answers to your questions, comments, chat notifications and more.</p>
                     </div>
                     <Switch
                        onClick={() => toggleSwitch(setInbox)}
                        on={inbox}
                     />
                  </li>
                  <li className="d-flex justify-content-between">
                     <div className="">
                        <h5>Community Activity</h5>
                        <p>Notifications about upcoming events & community activity.</p>
                     </div>
                     <Switch
                        onClick={() => toggleSwitch(setCommunityActivity)}
                        on={communityActivity}
                     />
                  </li>
                  <li className="d-flex justify-content-between">
                     <div className="">
                        <h5>Research</h5>
                        <p>Invitations to participate in surveys, usability tests and more. Only a few per year.</p>
                     </div>
                     <Switch
                        onClick={() => toggleSwitch(setResearch)}
                        on={research}
                     />
                  </li>
                  <li className="d-flex justify-content-between">
                     <div className="">
                        <h5>Newsletter</h5>
                        <p>Our best community content of the week/month</p>
                     </div>
                     <Switch
                        onClick={() => toggleSwitch(setNewsletter)}
                        on={newsletter}
                     />
                  </li>
               </ul>
               {loading ?
                  <CircularProgress />
                  : 
                  <Button 
                     variant="contained" 
                     color="primary" 
                     className="text-white btn-lg" 
                     onClick={() => onSaveChanges()}
                  >
                     <IntlMessages id="button.saveChanges" />
                  </Button>
               }
            </div>
         </div>
      </div>
   );
}
