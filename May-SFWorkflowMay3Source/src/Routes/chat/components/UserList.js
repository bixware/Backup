/**
 * User List
 */
import React from 'react';
import { Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { withRouter } from 'react-router-dom';
// app layouts
import { getAppLayout } from 'Helpers/helpers';
// components
import RecentChatUsers from './RecentChatUsers';
// redux actions
import {
   updateUsersSearch,
   onSearchUsers
} from 'Store/Actions';

function UserList(props) {
   const dispatch = useDispatch();
   const chatAppReducer = useSelector(state => state.chatAppReducer);
   /**
    * Swicth Chat With User
    * @param {*object} user
    */
   /**
    * On Search Chat Users
    */
   const updateSearch = (e) =>  {
      dispatch(updateUsersSearch(e.target.value));
      dispatch(onSearchUsers(e.target.value));
   }

   const getScrollHeight = () => {
      const { location } = props;
      const appLayout = getAppLayout(location)
      switch (appLayout) {
         case 'app':
            return 'calc(100vh - 188px)';
         case 'agency':
            return 'calc(100vh - 372px)';
         case 'boxed':
            return 'calc(100vh - 372px)';
         case 'horizontal':
            return 'calc(100vh - 238px)';
         default:
            break;
      }
   }

   const { searchUsers } = chatAppReducer;
   return (
      <div>
         <div className="search-wrapper mb-0 position-relative">
            <Input
               type="text"
               name="search-users"
               id="search"
               className="search-input rounded-0 py-2 px-3"
               placeholder="Search"
               onChange={(e) => updateSearch(e)}
               value={searchUsers}
            />
            <i className="zmdi zmdi-search search-icon"></i>
         </div>
         <div className="chat-list">
            <Scrollbars
               className="rct-scroll"
               autoHide
               style={{ height: getScrollHeight() }}
            >
               <RecentChatUsers />
            </Scrollbars>
         </div>
      </div>
   );
}


export default withRouter(UserList);
